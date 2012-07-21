from django.db import models
from django.contrib.auth.models import User

class UserProperty(models.Model):
    KEYS = (
            ('nong', 'No Angular interface'),
            ('badger', 'Badger username')
            )
    user = models.ForeignKey(User)
    key = models.CharField(max_length = 10, choices = KEYS)
    value = models.CharField(max_length = 120)
