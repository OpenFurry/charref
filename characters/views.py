from django.shortcuts import get_object_or_404, render_to_response
from django.template import RequestContext
from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.auth.models import User
from django.contrib.flatpages.models import FlatPage
from charref.characters.models import *

def front(request):
    pass

def show_user(request, username):
    user = get_object_or_404(User, username = username)
    return render_to_response('characters/user/show.html', context_instance = RequestContext(request, {'user': user}))

@login_required
def edit_user(request):
    pass

def register(request):
    pass #should use builtin

##

def show_character(request, character_id):
    character = get_object_or_404(Character, id = character_id)
    return render_to_response('characters/character/show.html', context_instance = RequestContext(request, {'character': character}))

@login_required
def edit_character(request, character_id):
    pass

@login_required
def delete_character(request, character_id):
    pass

@login_required
def create_character(request, character_id):
    pass

##

def show_morph(request, morph_id):
    morph = get_object_or_404(Morph, id = morph_id)
    return render_to_response('characters/morph/show.html', context_instance = RequestContext(request,  {'morph': morph}))

@login_required
def edit_morph(request, morph_id):
    pass

@login_required
def delete_morph(request, morph_id):
    pass

@login_required
def create_morph(request, morph_id):
    pass

##

def show_description(request, description_id):
    description = get_object_or_404(Description, id = description_id)
    return render_to_response('characters/description/show.html', context_instance = RequestContext(request, {'description': description}))

@login_required
def edit_description(request, description_id):
    pass

@login_required
def delete_description(request, description_id):
    pass

@login_required
def create_description(request, description_id):
    pass

##

def show_location(request, location_id):
    location = get_object_or_404(Location, id = location_id)
    return render_to_response('characters/location/show.html', context_instance = RequestContext(request, {'location': location}))

@login_required
def edit_location(request, location_id):
    pass

@login_required
def delete_location(request, location_id):
    pass

@login_required
def create_location(request, location_id):
    pass

##

def ajax_list_species(request):
    pass
