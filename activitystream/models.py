from django.db import models
from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes import generic

class StreamItem(models.Model):
    TYPES = (
            ('C', 'created'),
            ('R', 'viewed'),
            ('U', 'edited'),
            ('D', 'deletead')
            )

    action_time = models.DateTimeField(auto_now_add = True)
    action_type = models.CharField(max_length = 1, choices = TYPES)
    user = models.ForeignKey(User)
    content_type = models.ForeignKey(ContentType)
    object_id = models.PositiveIntegerField()
    content_object = generic.GenericForeignKey('content_type', 'object_id')
