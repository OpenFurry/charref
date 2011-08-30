from django.db import models
from charref.characters.models import *

class Log(models.Model):
    title = models.CharField(max_length = 120)
    body = models.TextField()
    date = models.DateTimeField(blank = True)
    encrypted = models.BooleanField(default = False)
    participants = models.ManyToManyField(Morph)
    other_participants = models.CharField(max_length = 500)
