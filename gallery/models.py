import os
import time
from django.conf import settings
from django.db import models
from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import (
    GenericForeignKey,
    GenericRelation,
)
from activitystream.models import StreamItem

def image_path(instance, filename):
    # Whyyyy is this applied twice.  ?.?
    return filename if filename.startswith('gallery/') else os.path.join(
    'gallery',
    str(int(time.time())) + '-' + filename)

class Image(models.Model):
    RATINGS  = (
            ('G', "General"),
            ('M', "Mature"),
            ('R', "Adult")
            )

    image = models.ImageField(upload_to = image_path)
    thumbnail = models.ImageField(upload_to = 'gallery/thumbs', blank = True)
    attribution = models.CharField(max_length = 200)
    rating = models.CharField(max_length = 1, choices = RATINGS)
    user = models.ForeignKey(User)
    stream_items = GenericRelation(StreamItem)
    attachments = GenericRelation('ImageAttachment', related_name = "generic_image")

    def get_absolute_url(self):
        return "/image/%d" % self.id

    def save(self):
        from PIL import Image as img
        from django.core.files.base import ContentFile
        from StringIO import StringIO

        super(Image, self).save()
        try:
            i = img.open(self.image.path)

            if i.mode not in ('L', 'RGB'):
                i = i.convert('RGB')

            t = i.copy()
            t.thumbnail((128, 128), img.ANTIALIAS)
            fp = StringIO()
            t.save(fp, "JPEG", quality = 95)

            self.thumbnail.save(name = self.image.name, content = ContentFile(fp.getvalue()), save = False)

            size = i.size
            if (size[0] > 800 or size[1] > 800):
                r = i.copy()
                r.thumbnail((800, 800), img.ANTIALIAS)
                fp = StringIO()
                r.save(fp, "JPEG", quality = 95)

                self.image.save(name = self.image.name, content = ContentFile(fp.getvalue()), save = False)
        except IOError:
            pass

        super(Image, self).save()

class ImageAttachment(models.Model):
    image = models.ForeignKey('Image')
    caption = models.CharField(max_length = 200, blank = True)
    content_type = models.ForeignKey(ContentType)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
