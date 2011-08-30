from django.contrib.auth.models import User
from charref.characters.models import *

def front(request):
    pass

def show_user(request, username):
    pass

def edit_user(request):
    pass

def register(request):
    pass #should use builtin

##

def show_character(request, character_id):
    pass

def edit_character(request, character_id):
    pass

def delete_character(request, character_id):
    pass

def create_character(request, character_id):
    pass

##

def show_morph(request, morph_id):
    pass

def edit_morph(request, morph_id):
    pass

def delete_morph(request, morph_id):
    pass

def create_morph(request, morph_id):
    pass

##

def show_description(request, character_id):
    pass

def edit_description(request, character_id):
    pass

def delete_description(request, character_id):
    pass

def create_description(request, character_id):
    pass

##

def show_location(request, location_id):
    pass

def edit_location(request, location_id):
    pass

def delete_location(request, location_id):
    pass

def create_location(request, location_id):
    pass

##

def ajax_list_species(request):
    pass
