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

def list_characters(request):
    query = Character.objects.all()
    paginator = Paginator(query, 10)

    try:
        page = int(request.GET.get('page', '1'))
    except ValueError:
        page = 1

    try:
        characters = paginator.page(page)
    except (EmptyPage, InvalidPage):
        logs = paginator.page(paginator.num_pages)

    return render_to_response('characters/character/list.html', context_instance = RequestContext(request, {'characters': characters}))

def show_character(request, character_id):
    character = get_object_or_404(Character, id = character_id)
    return render_to_response('characters/character/show.html', context_instance = RequestContext(request, {'character': character}))

@login_required
def edit_character(request, character_id):
    if (request.method == "GET"):
        return render_to_response('characters/character/edit.html', context_instance = RequestContext(request, {}))
    if (request.POST.get('name', None) is not None):
        c = get_object_or_404(Character, id = character_id)
        c.name = request.POST['name']
        c.save()
        return HttpResponseRedirect(c.get_aboslute_url())
    else:
        request.user.message_set.create(message = '<div class="error">You must enter a name!</div>')
        return render_to_response('characters/character/edit.html', context_instance = RequestContext(request, {}))

@login_required
def delete_character(request, character_id):
    if (request.POST.get('confirm', None) == "yes"):
        character = get_object_or_404(Character, id = character_id)
        if (request.user != character.user):
            request.user.message_set.create(message = '<div class="error">You may only delete your own characters!</div>')
            return render_to_response('permission_denied.html', context_instance = RequestContext(request, {}))
        character.delete()
        return HttpResponseRedirect('/~' + request.user.username)
    else:
        character = get_object_or_404(Character, id = character_id)
        if (request.user != character.user):
            request.user.message_set.create(message = '<div class="error">You may only delete your own characters!</div>')
            return render_to_response('permission_denied.html', context_instance = RequestContext(request, {}))
        return render_to_response('characters/character/delete.html', context_instance = RequestContext(request, {'character': character}))

@login_required
def create_character(request, character_id):
    if (request.method == "GET"):
        return render_to_response('characters/character/edit.html', context_instance = RequestContext(request, {}))
    if (request.POST.get('name', None) is not None):
        c = Character(name = request.POST['name'])
        c.save()
        return HttpResponseRedirect(c.get_aboslute_url())
    else:
        request.user.message_set.create(message = '<div class="error">You must enter a name!</div>')
        return render_to_response('characters/character/edit.html', context_instance = RequestContext(request, {}))

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

def list_locations(request):
    query = Location.objects.all()
    paginator = Paginator(query, 10)

    try:
        page = int(request.GET.get('page', '1'))
    except ValueError:
        page = 1

    try:
        locations = paginator.page(page)
    except (EmptyPage, InvalidPage):
        logs = paginator.page(paginator.num_pages)

    return render_to_response('characters/location/list.html', context_instance = RequestContext(request, {'locations': locations}))

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
