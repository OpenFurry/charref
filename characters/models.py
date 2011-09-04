from django.db import models
from django.contrib.auth.models import User
from django.contrib.contenttypes import generic
from charref.gallery.models import ImageAttachment

class Character(models.Model):
    name = models.CharField(max_length = 60)
    user = models.ForeignKey(User)
    images = generic.GenericRelation(ImageAttachment)

    def get_absolute_url(self):
        return "/character/%d" % self.id

class Morph(models.Model):
    user = models.ForeignKey(User)
    character = models.ForeignKey('Character')
    gender = models.CharField(max_length = 20)
    species_text = models.CharField(max_length = 60)
    species_category = models.ForeignKey('SpeciesCategory')
    images = generic.GenericRelation(ImageAttachment)

    def get_absolute_url(self):
        return "/morph/%d" % self.id
    
class Description(models.Model):
    RATINGS  = (
            ('G', "General"),
            ('M', "Mature"),
            ('R', "Adult")
            )

    user = models.ForeignKey(User) # Keeps us from having to say description.morph.character.user
    morph = models.ForeignKey('Morph')
    name = models.CharField(max_length = 30)
    description = models.TextField()
    rating = models.CharField(max_length = 1, choices = RATINGS)
    images = generic.GenericRelation(ImageAttachment)

    def get_absolute_url(self):
        return "/description/%d" % self.id

class Location(models.Model):
    name = models.CharField(max_length = 120)
    description = models.TextField()
    user = models.ForeignKey(User)
    images = generic.GenericRelation(ImageAttachment)

    def get_absolute_url(self):
        return "/location/%d" % self.id

class CharacterLocation(models.Model):
    character = models.ForeignKey(Character)
    location = models.ForeignKey(Location)

class SpeciesCategory(models.Model):
    name = models.CharField(max_length = 50)
    parent = models.ForeignKey('SpeciesCategory')
