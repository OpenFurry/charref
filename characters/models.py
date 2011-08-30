from django.db import models
from django.contrib.auth.models import User

class Character(models.Model):
    name = models.CharField(max_length = 60)
    user = models.ForeignKey(User)

class Morph(models.Model):
    character = models.ForeignKey('Character')
    gender = models.CharField(max_length = 20)
    species = models.CharField(max_length = 60)
    
class Description(models.Model):
    morph = models.ForeignKey('Morph')
    name = models.CharField(max_length = 30)
    description = models.TextField()

class Location(models.Model):
    name = models.CharField(max_length = 120)
    description = models.TextField()
    owner = models.ForeignKey(User)
