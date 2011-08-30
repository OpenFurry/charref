from django.db import models
from django.contrib.auth.models import User

class Character(models.Model):
    name = models.CharField(max_length = 60)
    user = models.ForeignKey(User)

class Morph(models.Model):
    character = models.ForeignKey('Character')
    gender = models.CharField(max_length = 20)
    species_text = models.CharField(max_length = 60)
    species_category = models.ForeignKey('SpeciesCategory')
    
class Description(models.Model):
    morph = models.ForeignKey('Morph')
    name = models.CharField(max_length = 30)
    description = models.TextField()

class Location(models.Model):
    name = models.CharField(max_length = 120)
    description = models.TextField()
    owner = models.ForeignKey(User)

class SpeciesCategory(models.Model):
    name = models.CharField(max_length = 50)
    parent = models.ForeignKey('SpeciesCategory')
