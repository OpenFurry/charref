from django.shortcuts import get_object_or_404, render_to_response
from django.template import RequestContext
from django.http import HttpResponse, HttpResponseRedirect
from django.core import serializers
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from charref.characters.models import *
from charref.activitystream.models import *

def front(request):
    return render_to_response('front.html', context_instance = RequestContext(request, {}))

def ng(request):
    return render_to_response('front-ng.html', context_instance = RequestContext(request, {}))

def show_user(request, username):
    user = get_object_or_404(User, username = username)
    if (request.is_ajax() or request.GET.get('ajax', None) == 'true'):
        return HttpResponse(serializers.serialize("json", (user,)), mimetype = "application/json")
    else:
        return render_to_response('characters/user/show.html', context_instance = RequestContext(request, {'user_object': user}))

@login_required
def edit_user(request):
    form = UserForm(instance = request.user)
    if (request.method == 'POST'):
        form = UserForm(request.POST, instance = request.user)
        if (form.is_valid()):
            form.save()
            si = StreamItem(
                    action_type = 'U',
                    user = request.user,
                    content_type = ContentType.objects.get_for_model(User),
                    object_id = user.id)
            si.save()
            return HttpResponseRedirect("/~%s" % request.user.username)
    return render_to_response("characters/user/show.html", context_instance = RequestContext(request, {'form': form}))

def register(request):
    if request.method == 'POST': 
        if request.POST.get('username', None) and request.POST.get('password', None) and request.POST.get('email', None):
            user = User.objects.create_user(request.POST['username'], request.POST['email'], None)
            user.set_password(request.POST['password'])
            user.save()
            si = StreamItem(
                    action_type = 'C',
                    user = request.user,
                    content_type = ContentType.objects.get_for_model(User),
                    object_id = user.id)
            si.save()
            return HttpResponseRedirect("/~%s" % request.user.username)
        else:
            request.user.message_set.create(message = '<div class="failure">Oops!  All fields required!</div>')
    return render_to_response("characters/user/create.html", context_instance = RequestContext(request, {}))

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

    if (request.is_ajax() or request.GET.get('ajax', None) == 'true'):
        return HttpResponse(serializers.serialize("json", characters), mimetype = "application/json")
    else:
        return render_to_response('characters/character/list.html', context_instance = RequestContext(request, {'characters': characters}))

def list_characters_for_user(request, username):
    characters = Character.objects.filter(user__username__exact = username)
    if (request.is_ajax() or request.GET.get('ajax', None) == 'true'):
        return HttpResponse(serializers.serialize("json", characters), mimetype = "application/json")
    else:
        # Shouldn't ever really happen, this is mostly here for AJAX requests
        return render_to_response('characters/character/list.html', context_instance = RequestContext(request, {'characters': characters})) 

def show_character(request, character_id):
    character = get_object_or_404(Character, id = character_id)
    if (request.is_ajax() or request.GET.get('ajax', None) == 'true'):
        return HttpResponse(serializers.serialize("json", (character,)), mimetype = "application/json")
    else:
        return render_to_response('characters/character/show.html', context_instance = RequestContext(request, {'character': character}))

@login_required
def edit_character(request, character_id):
    if (request.method == "GET"):
        return render_to_response('characters/character/edit.html', context_instance = RequestContext(request, {}))
    if (request.POST.get('name', None) is not None):
        c = get_object_or_404(Character, id = character_id)
        c.name = request.POST['name']
        c.save()
        si = StreamItem(
                action_type = 'U',
                user = request.user,
                content_type = ContentType.get_for_model(Character),
                object_id = character_id)
        si.save()
        return HttpResponseRedirect(c.get_aboslute_url())
    else:
        request.user.message_set.create(message = '<div class="error">You must enter a name!</div>')
        return render_to_response('characters/character/edit.html', context_instance = RequestContext(request, {}))

@login_required
def delete_character(request, character_id):
    character = get_object_or_404(Character, id = character_id)
    if (request.user != character.user):
        #TODO StreamItem flagging user for attempting to delete a character not theirs
        request.user.message_set.create(message = '<div class="error">You may only delete your own characters!</div>')
        return render_to_response('permission_denied.html', context_instance = RequestContext(request, {}))
    if (request.POST.get('confirm', None) == "yes"):
        character.delete()
        si = StreamItem(
                action_type = 'D',
                user = request.user,
                content_type = ContentType.get_for_model(Character),
                object_id = character_id)
        si.save()
        return HttpResponseRedirect("/~%s" % request.user.username)
    else:
        return render_to_response('characters/character/delete.html', context_instance = RequestContext(request, {'character': character}))

@login_required
def create_character(request, character_id):
    if (request.method == "GET"):
        return render_to_response('characters/character/edit.html', context_instance = RequestContext(request, {}))
    if (request.POST.get('name', None) is not None):
        c = Character(name = request.POST['name'])
        c.save()
        si = StreamItem(
                action_type = 'C',
                user = request.user,
                content_type = ContentType.get_for_model(Character),
                object_id = character_id)
        si.save()
        return HttpResponseRedirect(c.get_aboslute_url())
    else:
        request.user.message_set.create(message = '<div class="error">You must enter a name!</div>')
        return render_to_response('characters/character/edit.html', context_instance = RequestContext(request, {}))

##

def list_morphs_for_character(request, character_id):
    morphs = Morph.objects.filter(character__id__exact = character_id)
    if (request.is_ajax() or request.GET.get('ajax', None) == 'true'):
        return HttpResponse(serializers.serialize("json", morphs), mimetype = "application/json")
    else:
        return render_to_response('morphs/morph/list.html', context_instance = RequestContext(request, {}))

def show_morph(request, morph_id):
    morph = get_object_or_404(Morph, id = morph_id)
    if (request.is_ajax() or request.GET.get('ajax', None) == 'true'):
        return HttpResponse(serializers.serialize("json", (morph,)), mimetype = "application/json")
    else:
        return render_to_response('characters/morph/show.html', context_instance = RequestContext(request,  {'morph': morph}))

@login_required
def edit_morph(request, morph_id):
    morph = get_object_or_404(Morph, id = morph_id)
    form = MorphForm(instance = morph)
    if (request.user != morph.user):
        #TODO flag user
        request.user.message_set.create(message = '<div class="error">You may only edit a morph that you own!</div>')
        return HttpResponseRedirect(morph.get_absolute_url())
    if (request.method == "POST"):
        form = MorphForm(request.POST, instance = morph)
        if (form.is_valid()):
            form.save()
            si = StreamItem(
                    action_type = 'U',
                    user = request.user,
                    content_type = ContentType.get_for_model(Morph),
                    object_id = morph_id)
            si.save()
            return HttpResponseRedirect(morph.get_absolute_url())
    return render_to_response('characters/morph/edit.html', context_instance = RequestContext(request, {'form': form}))

@login_required
def delete_morph(request, morph_id):
    morph = Morph.objects.get(id = morph_id)
    if (request.user != morph.user):
        #TODO flag user
        request.user.message_set.create(message = '<div class="error">You may only delete a morph that belongs to you!</div>')
        return render_to_response("permission_denied.html", context_instance = RequestContext(request))
    if (request.method == "POST" and request.POST.get("confirm", None) == "yes"):
        character = morph.character
        morph.delete()
        si = StreamItem(
                action_type = 'D',
                user = request.user,
                content_type = ContentType.get_for_model(Morph),
                object_id = morph_id)
        si.save()
        return HttpResponseRedirect(character.get_absolute_url())
    else:
        return render_to_response('characters/morph/delete.html', context_instance = RequestContext(request, {'morph': morph}))

@login_required
def create_morph(request):
    if (request.method == "POST"):
        form = MorphForm(request.POST)
        if (form.is_valid()):
            morph = form.save(commit = False)
            if (request.user != morph.character.user):
                #TODO flag user
                request.user.message_set.create(message = '<div class="error">You may only create morphs for your characters!</div>')
                return render_to_response("permission_denied.html", context_instance = RequestContext(request, {}))
            morph.user = request.user
            morph.save()
            form.save_m2m()
            si = StreamItem(
                    action_type = 'C',
                    user = request.user,
                    content_type = ContentType.get_for_model(Morph),
                    object_id = morph.id)
            si.save()
            return HttpResponseRedirect(morph.get_absolute_url())
    return render_to_response('characters/morph/edit.html', context_instance = RequestContext(request, {'form': MorphForm(instance = morph)}))

##

def list_descriptions_for_morph(request, morph_id):
    descriptions = Description.objects.filter(morph__id__exact = morph_id)
    if (request.is_ajax() or request.GET.get('ajax', None) == 'true'):
        return HttpResponse(serializers.serialize("json", description), mimetype = "application/json")
    else:
        return render_to_response("characters/descriptions/list.html", context_instance = RequestContext(request, {"description": description}))

def show_description(request, description_id):
    description = get_object_or_404(Description, id = description_id)
    if (request.is_ajax() or request.GET.get('ajax', None) == 'true'):
        return HttpResponse(serializers.serialize("json", (description,)), mimetype = "application/json")
    else:
        return render_to_response('characters/description/show.html', context_instance = RequestContext(request, {'description': description}))

@login_required
def edit_description(request, description_id):
    description = get_object_or_404(Description, id = description_id)
    form = DescriptionForm(instance = description)
    if (request.method == "POST"):
        form = DescriptionForm(request.POST, instance = description)
        if (form.is_valid()):
            form.save()
            si = StreamItem(
                    action_type = 'U',
                    user = request.user,
                    content_type = ContentType.get_for_model(Description),
                    object_id = description_id)
            si.save()
            return HttpResponseRedirect(description.get_absolute_url())
        else:
            return
    return render_to_response('characters/description/edit.html', context_instance = RequestContext(request, {'form': form}))

@login_required
def delete_description(request, description_id):
    description = get_object_or_404(Description, id = description_id)
    if (request.user != description.user):
        request.user.message_set.create(message = '<div class="error">You may only delete descriptions that belong to you!</div>')
        return render_to_response("permission_denied.html", context_instance = RequestContext(request, {}))
    if (request.method == "POST" and request.POST.get("confirm", None) == "yes"):
        morph = description.morph
        description.delete()
        si = StreamItem(
                action_type = 'D',
                user = request.user,
                content_type = ContentType.get_for_model(Description),
                object_id = description_id)
        si.save()
        return HttpResponseRedirect(morph.get_absolute_url())
    return render_to_response("characters/description/delete.html", context_instance = RequestContext(request, {}))

@login_required
def create_description(request):
    form = DescriptionForm()
    if (request.method == "POST"):
        form = DescriptionForm(request.POST)
        if (form.is_valid()):
            description = form.save(commit = False)
            if (request.user != description.morph.user):
                #TODO flag user
                request.user.message_set.create(message = '<div class="error">You may only create descriptions for your morphs!</div>')
                return render_to_response("permission_denied.html", context_instance = RequestContext(request, {}))
            description.user = request.user
            description.save()
            form.save_m2m()
            si = StreamItem(
                    action_type = 'C',
                    user = request.user,
                    content_type = ContentType.get_for_model(Description),
                    object_id = description.id)
            si.save()
            return HttpResponseRedirect(description.get_absolute_url())
    return render_to_response("characters/description/edit.html", context_instance = RequestContext(request, {'form': form}))

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

    if (request.is_ajax() or request.GET.get('ajax', None) == 'true'):
        return HttpResponse(serializers.serialize("json", locations), mimetype = "application/json")
    else:
        return render_to_response('characters/location/list.html', context_instance = RequestContext(request, {'locations': locations}))

def show_location(request, location_id):
    location = get_object_or_404(Location, id = location_id)
    if (request.is_ajax() or request.GET.get('ajax', None) == 'true'):
        return HttpResponse(serializers.serialize("json", (location,)), mimetype = "application/json")
    else:
        return render_to_response('characters/location/show.html', context_instance = RequestContext(request, {'location': location}))

@login_required
def edit_location(request, location_id):
    location = get_object_or_404(Location, id = location_id)
    if (request.user != location.user):
        #TODO flag user
        request.user.message_set.create(message = '<div class="error">You may only edit locations that you are the owner of!</div>')
        return render_to_response("permission_denied.html", context_instance = RequestContext(request, {}))
    form = LocationForm(instance = location)
    if (request.method == "POST"):
        form = LocationForm(request.POST, instance = location)
        if (form.is_valid()):
            form.save()
            si = StreamItem(
                    action_type = 'U',
                    user = request.user,
                    content_type = ContentType.get_for_model(Location),
                    object_id = character_id)
            si.save()
            return HttpResponseRedirect(location.get_absolute_url())
    return render_to_response('characters/location/edit.html', context_instance = RequestContext(request, {'form': form}))

@login_required
def delete_location(request, location_id):
    location = get_object_or_404(Location, id = location_id)
    if (request.user != location.user):
        #TODO flag user
        request.user.message_set.create(message = '<div class="error">You may only delete locations that you are the owner of!</div>')
        return render_to_response("permission_denied.html", context_instance = RequestContext(request, {}))
    if (request.method == "POST"):
        location.delete()
        si = StreamItem(
                action_type = 'D',
                user = request.user,
                content_type = ContentType.get_for_model(Location),
                object_id = location_id)
        si.save()
        return HttpResponseRedirect('/')
    return render_to_response("characters/location/delete,html", context_instance = RequestContext(request, {}))

@login_required
def create_location(request):
    form = LocationForm()
    if (request.method == "POST"):
        form = LocationForm(request.POST, instance = location)
        if (form.is_valid()):
            location = form.save(commit = False)
            location.user = request.user
            location.save()
            form.save_m2m()
            si = StreamItem(
                    action_type = 'C',
                    user = request.user,
                    content_type = ContentType.get_for_model(Location),
                    object_id = location.id)
            si.save()
            return HttpResponseRedirect(location.get_absolute_url())
    return render_to_response("characters/location/edit.html", context_instance = RequestContext(request, {'form': form}))

##

def ajax_list_species(request):
    pass
