from django.db import models
from django.contrib.auth.models import User

class Image(models.Model):
    image
    thumbnail
    attribution = models.CharField(max_length = 200)
    owner = models.ForeignKey(User)

class ImageAttachment(models.Model):
    image = models.ForeignKey('Image')
    model = models.CharField(max_length = 50)
    object_id = models.IntegerField()
    caption = models.CharField(max_length = 200)
