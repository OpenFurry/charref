from django import forms
from django.contrib.auth.models import User
from charref.characters.models import *

class UserForm(forms.ModelForm):
    class Meta:
        model = User
        #exclude = ('username', 'password', 'last_login', 'date_joined', 'is_active', 'is_staff', 'is_superuser')
        fields = ('first_name', 'last_name', 'email')

class CharacterForm(forms.ModelForm):
    class Meta:
        model = Character
        exclude = ('user',)

class MorphForm(forms.ModelForm):
    class Meta:
        model = Morph
        exclude = ('user',)

class DescriptionForm(forms.ModelForm):
    class Meta:
        model = Description
        exclude = ('user',)

class LocationForm(forms.ModelForm):
    class Meta:
        model = Location
        exclude = ('owner',)
