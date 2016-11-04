from django.db import models
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericRelation
from django.contrib.contenttypes.models import ContentType
from gallery.models import ImageAttachment
from activitystream.models import StreamItem


class Character(models.Model):
    name = models.CharField(max_length=60)
    user = models.ForeignKey(User)
    stream_items = GenericRelation(StreamItem)
    images = GenericRelation(ImageAttachment)

    def __unicode__(self):
        return self.name

    def get_absolute_url(self):
        return "/character/%d" % self.id

    def get_content_type(self):
        return ContentType.objects.get_for_model(self)


class Morph(models.Model):
    user = models.ForeignKey(User)
    character = models.ForeignKey('Character')
    gender = models.CharField(max_length=20)
    species_text = models.CharField(max_length=60)
    species_category = models.ForeignKey(
        'SpeciesCategory', null=True, blank=True)
    stream_items = GenericRelation(StreamItem)
    images = GenericRelation(ImageAttachment)

    def __unicode__(self):
        return "%s %s (~%s)" % (
            self.gender, self.species_text, self.user.username)

    def get_name(self):
        return "%s %s" % (self.gender, self.species_text)

    def get_absolute_url(self):
        return "/morph/%d" % self.id

    def get_content_type(self):
        return ContentType.objects.get_for_model(self)


class Description(models.Model):
    RATINGS = (
        ('G', "General"),
        ('M', "Mature"),
        ('R', "Adult")
    )

    # Keeps us from having to say description.morph.character.user
    user = models.ForeignKey(User)
    morph = models.ForeignKey('Morph')
    name = models.CharField(max_length=30)
    description = models.TextField()
    rating = models.CharField(max_length=1, choices=RATINGS)
    stream_items = GenericRelation(StreamItem)
    images = GenericRelation(ImageAttachment)

    def __unicode__(self):
        return "%s (~%s)" % (self.name, self.user.username)

    def get_absolute_url(self):
        return "/description/%d" % self.id

    def get_content_type(self):
        return ContentType.objects.get_for_model(self)


class Location(models.Model):
    name = models.CharField(max_length=120)
    description = models.TextField()
    user = models.ForeignKey(User)
    stream_items = GenericRelation(StreamItem)
    images = GenericRelation(ImageAttachment)

    def __unicode__(self):
        return self.name

    def get_absolute_url(self):
        return "/location/%d" % self.id

    def get_content_type(self):
        return ContentType.objects.get_for_model(self)


class CharacterLocation(models.Model):
    character = models.ForeignKey(Character)
    location = models.ForeignKey(Location)
    name_at_location = models.CharField(max_length=50, blank=True)


class SpeciesCategory(models.Model):
    name = models.CharField(max_length=50)
    parent = models.ForeignKey('SpeciesCategory', blank=True, null=True)

    def __unicode__(self):
        if self.parent is None:
            return self.name
        else:
            return "%s (%s)" % (self.name, self.parent.name)

    class Meta:
        ordering = ['id']
        verbose_name_plural = "Species categories"
