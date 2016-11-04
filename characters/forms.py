from django import forms
from django.contrib.auth.models import User
from characters.models import (
    Character,
    Description,
    Location,
    Morph,
)


class UserForm(forms.ModelForm):
    class Meta:
        model = User
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
            'description': forms.Textarea(attrs={'rows': 10, 'cols': 60})
        }


class LocationForm(forms.ModelForm):
    class Meta:
        model = Location
        exclude = ('owner',)
