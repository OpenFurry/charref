from django.db import models
from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes import generic
from charref.activitystream.models import StreamItem

class Image(models.Model):
    RATINGS  = (
            ('G', "General"),
            ('M', "Mature"),
            ('R', "Adult")
            )

    image = models.ImageField(upload_to = 'gallery')
    thumbnail = models.ImageField(upload_to = 'gallery/thumbs', blank = True)
    attribution = models.CharField(max_length = 200)
    rating = models.CharField(max_length = 1, choices = RATINGS)
    user = models.ForeignKey(User)
    stream_items = generic.GenericRelation(StreamItem)
    attachments = generic.GenericRelation('ImageAttachment')

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
        except IOError:
            pass

        super(Image, self).save()

class ImageAttachment(models.Model):
    image = models.ForeignKey('Image')
    caption = models.CharField(max_length = 200, blank = True)
    content_type = models.ForeignKey(ContentType)
    object_id = models.PositiveIntegerField()
    content_object = generic.GenericForeignKey('content_type', 'object_id')
