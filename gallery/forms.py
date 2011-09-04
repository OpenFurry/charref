import django.forms
from charref.gallery.models import *

class ImageForm(forms.ModelForm):
    class Meta:
        model = Image
        exclude = ('owner',)

class ImageAttachmentForm(forms.ModelForm):
    class Meta:
        model = ImageAttachment
