from django.db import models
from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes import generic

class StreamItem(models.Model):
    TYPES = (
            ('C', 'created'),
            ('R', 'viewed'),
            ('U', 'edited'),
            ('D', 'deletead'),
            ('IA', 'image attached'),
            ('ID', 'image detached')
            )

    action_time = models.DateTimeField(auto_now_add = True)
    action_type = models.CharField(max_length = 2, choices = TYPES)
    user = models.ForeignKey(User)
    notes = models.TextField(blank = True)
    content_type = models.ForeignKey(ContentType)
    object_id = models.PositiveIntegerField()
    content_object = generic.GenericForeignKey('content_type', 'object_id')
