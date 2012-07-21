from django.db import models
from django.contrib.auth.models import User

class TextObject(models.Model):
    TYPES = (
            ('L', 'Log'),
            ('B', 'Backstory'),
            )

    name = models.CharField(max_length = 120)
    content = models.TextField()
    type = models.CharField(max_length = 1, choices = TYPES)
