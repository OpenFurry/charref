from django import forms
from gallery.models import (
    Image,
    ImageAttachment,
)


class ImageForm(forms.ModelForm):

    class Meta:
        model = Image
        exclude = ('user', 'thumbnail')


class ImageAttachmentForm(forms.ModelForm):

    class Meta:
        model = ImageAttachment
        exclude = ('image',)
