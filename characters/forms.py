from django import forms
from django.contrib.auth.models import User
from characters.models import *

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
        widgets = {
                'character': forms.HiddenInput()
                }

class DescriptionForm(forms.ModelForm):
    class Meta:
        model = Description
        exclude = ('user',)
        widgets = {
                'morph': forms.HiddenInput(),
                'description': forms.Textarea(attrs = { 'rows': 10, 'cols': 60 })
                }

class LocationForm(forms.ModelForm):
    class Meta:
        model = Location
        exclude = ('owner',)
