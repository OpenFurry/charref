from django.shortcuts import get_object_or_404, render_to_response
from django.template import RequestContext
from django.http import HttpResponse, HttpResponseRedirect
from django.core import serializers
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from django.core.paginator import Paginator
from charref.characters.models import *
from charref.gallery.models import Image
from charref.characters.forms import *
from charref.activitystream.models import *

def front(request):
    counts = {
            'users': User.objects.count(),
            'locations': Location.objects.count(),
            'characters': Character.objects.count(),
            'morphs': Morph.objects.count(),
            'descriptions': Description.objects.count(),
            'images': Image.objects.count()
            }
    return render_to_response('front.html', context_instance = RequestContext(request, {'counts': counts}))

def ng(request):
    return render_to_response('front-ng.html', context_instance = RequestContext(request, {}))

def redirect_after_login(request):
    return HttpResponseRedirect('/~%s' % request.user.username)

def list_users(request):
    query = User.objects.all()
    paginator = Paginator(query, 10)

    try:
        page = int(request.GET.get('page', '1'))
    except ValueError:
        page = 1

    try:
        users = paginator.page(page)
    except (EmptyPage, InvalidPage):
        logs = paginator.page(paginator.num_pages)

    if (request.is_ajax() or request.GET.get('ajax', None) == 'true'):
        return HttpResponse(serializers.serialize("json", users), mimetype = "application/json")
    else:
        return render_to_response('characters/user/list.html', context_instance = RequestContext(request, {'users': users}))

def show_user(request, username):
    user = get_object_or_404(User, username = username)
    if (request.is_ajax() or request.GET.get('ajax', None) == 'true'):
        return HttpResponse(serializers.serialize("json", (user,)), mimetype = "application/json")
    else:
        return render_to_response('characters/user/show.html', context_instance = RequestContext(request, {'user_object': user}))

@login_required
def edit_user(request, username):
    if (request.user.username != username):
        request.user.message_set.create(message = '<div class="error">You may only edit yourself!</div>')
        return render_to_response('permission_denied.html', context_instance = RequestContext(request, {}))
    form = UserForm(instance = request.user)
    if (request.method == 'POST'):
        form = UserForm(request.POST, instance = request.user)
        if (form.is_valid()):
            form.save()
            si = StreamItem(
                    action_type = 'U',
                    user = request.user,
                    content_type = ContentType.objects.get_for_model(User),
                    object_id = request.user.id)
            si.save()
            return HttpResponseRedirect("/~%s" % request.user.username)
    return render_to_response("characters/user/show.html", context_instance = RequestContext(request, {'form': form, 'user_object': request.user}))

def register(request):
    if request.method == 'POST': 
        if request.POST.get('username', None) and request.POST.get('password', None) and request.POST.get('email', None):
            user = User.objects.create_user(request.POST['username'], request.POST['email'], None)
            user.set_password(request.POST['password'])
            user.save()
            user = User.objects.get(username = request.POST['username'])
            si = StreamItem(
                    action_type = 'C',
                    user = user,
                    content_type = ContentType.objects.get_for_model(User),
                    object_id = user.id)
            si.save()
            return HttpResponseRedirect("/~%s" % user.username)
        else:
            request.user.message_set.create(message = '<div class="failure">Oops!  All fields required!</div>')
    return render_to_response("registration/create_user.html", context_instance = RequestContext(request, {}))

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
        return render_to_response('characters/character/show.html', context_instance = RequestContext(request, {'character': character, 'species_select': _species_select_dropdown()}))

@login_required
def edit_character(request, character_id):
    c = get_object_or_404(Character, id = character_id)
    if (request.method == "POST"):
        if (request.POST.get('name', None) is not None):
            c.name = request.POST['name']
            c.save()
            si = StreamItem(
                    action_type = 'U',
                    user = request.user,
                    content_type = ContentType.objects.get_for_model(Character),
                    object_id = character_id)
            si.save()
            return HttpResponseRedirect(c.get_absolute_url())
        else:
            request.user.message_set.create(message = '<div class="error">You must enter a name!</div>')
    return render_to_response('characters/character/edit.html', context_instance = RequestContext(request, {'character': c}))

@login_required
def delete_character(request, character_id):
    character = get_object_or_404(Character, id = character_id)
    if (request.user != character.user):
        #TODO StreamItem flagging user for attempting to delete a character not theirs
        request.user.message_set.create(message = '<div class="error">You may only delete your own characters!</div>')
        return render_to_response('permission_denied.html', context_instance = RequestContext(request, {}))
    if (request.POST.get('confirm', None) is not None):
        for morph in character.morph_set.all():
            for description in morph.description_set.all():
                description.delete()
            morph.delete()
        character.delete()
        si = StreamItem(
                action_type = 'D',
                user = request.user,
                content_type = ContentType.objects.get_for_model(Character),
                object_id = character_id)
        si.save()
        return HttpResponseRedirect("/~%s" % request.user.username)
    else:
        return render_to_response('characters/character/delete.html', context_instance = RequestContext(request, {'character': character}))

@login_required
def create_character(request):
    if (request.method == "GET"):
        return render_to_response('characters/character/edit.html', context_instance = RequestContext(request, {}))
    if (request.POST.get('name', None) is not None):
        c = Character(name = request.POST['name'])
        c.user = request.user
        c.save()
        si = StreamItem(
                action_type = 'C',
                user = request.user,
                content_type = ContentType.objects.get_for_model(Character),
                object_id = c.id)
        si.save()
        return HttpResponseRedirect(c.get_absolute_url())
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
                    content_type = ContentType.objects.get_for_model(Morph),
                    object_id = morph_id)
            si.save()
            return HttpResponseRedirect(morph.get_absolute_url())
    return render_to_response('characters/morph/edit.html', context_instance = RequestContext(request, {'form': form, 'species_category': _species_select_dropdown(morph.species_category.id)}))

@login_required
def delete_morph(request, morph_id):
    morph = Morph.objects.get(id = morph_id)
    if (request.user != morph.user):
        #TODO flag user
        request.user.message_set.create(message = '<div class="error">You may only delete a morph that belongs to you!</div>')
        return render_to_response("permission_denied.html", context_instance = RequestContext(request))
    if (request.method == "POST" and request.POST.get("confirm", None) is not None):
        character = morph.character
        for description in morph.description_set.all():
            description.delete()
        morph.delete()
        si = StreamItem(
                action_type = 'D',
                user = request.user,
                content_type = ContentType.objects.get_for_model(Morph),
                object_id = morph_id)
        si.save()
        si = StreamItem(
                action_type = 'MD',
                user = request.user,
                content_type = ContentType.objects.get_for_model(Character),
                object_id = character.id)
        si.save()
        return HttpResponseRedirect(character.get_absolute_url())
    else:
        return render_to_response('characters/morph/delete.html', context_instance = RequestContext(request, {'morph': morph}))

@login_required
def create_morph(request):
    form = MorphForm()
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
                    content_type = ContentType.objects.get_for_model(Morph),
                    object_id = morph.id)
            si.save()
            si = StreamItem(
                    action_type = 'MA',
                    user = request.user,
                    content_type = ContentType.objects.get_for_model(Character),
                    object_id = morph.character.id)
            si.save()
            return HttpResponseRedirect(morph.get_absolute_url())
    return render_to_response('characters/morph/edit.html', context_instance = RequestContext(request, {'form': form, 'species_category':  _species_select_dropdown()}))

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
                    content_type = ContentType.objects.get_for_model(Description),
                    object_id = description_id)
            si.save()
            return HttpResponseRedirect(description.get_absolute_url())
    return render_to_response('characters/description/edit.html', context_instance = RequestContext(request, {'form': form}))

@login_required
def delete_description(request, description_id):
    description = get_object_or_404(Description, id = description_id)
    if (request.user != description.user):
        request.user.message_set.create(message = '<div class="error">You may only delete descriptions that belong to you!</div>')
        return render_to_response("permission_denied.html", context_instance = RequestContext(request, {}))
    if (request.method == "POST" and request.POST.get("confirm", None) is not None):
        morph = description.morph
        description.delete()
        si = StreamItem(
                action_type = 'D',
                user = request.user,
                content_type = ContentType.objects.get_for_model(Description),
                object_id = description_id)
        si.save()
        si = StreamItem(
                action_type = 'DD',
                user = request.user,
                content_type = ContentType.objects.get_for_model(Morph),
                object_id = morph.id)
        si.save()
        return HttpResponseRedirect(morph.get_absolute_url())
    return render_to_response("characters/description/delete.html", context_instance = RequestContext(request, {'description': description}))

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
                    content_type = ContentType.objects.get_for_model(Description),
                    object_id = description.id)
            si.save()
            si = StreamItem(
                    action_type = 'DA',
                    user = request.user,
                    content_type = ContentType.objects.get_for_model(Morph),
                    object_id = description.morph.id)
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
                    content_type = ContentType.objects.get_for_model(Location),
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
                content_type = ContentType.objects.get_for_model(Location),
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
                    content_type = ContentType.objects.get_for_model(Location),
                    object_id = location.id)
            si.save()
            return HttpResponseRedirect(location.get_absolute_url())
    return render_to_response("characters/location/edit.html", context_instance = RequestContext(request, {'form': form}))

@login_required
def attach_character_to_location(request, location_id):
    location = get_object_or_404(Location, id = location_id)
    if (request.GET.get('character_id', None) is None):
        request.user.message_set.create(message = '<div class="error">Must attach a character to a location!</div>')
        return HttpResponseRedirect(request.META['HTTP_REFERER'])
    character = get_object_or_404(Character, id = request.GET['character_id'])
    if (request.user != character.user):
        request.user.message_set.create(message = '<div class="error">You may only attach your own characters!</div>')
        #TODO flag user
        return render_to_response('permission_denied.html', context_instance = RequestContext(request, {}))
    if (CharacterLocation.objects.filter(character = character, location = location).count() > 0):
        request.user.message_set.create(message = '<div class="warning">That character is already attached to this location!</div>')
        return HttpResponseRedirect(location.get_absolute_url())
    cl = CharacterLocation(
            character = character,
            location = location,
            name_at_location = request.GET.get('as', ''))
    cl.save()
    si = StreamItem(
            action_type = 'LA',
            user = request.user,
            content_type = ContentType.objects.get_for_model(Location),
            object_id = location.id)
    si.save()
    return HttpResponseRedirect(location.get_absolute_url())

@login_required
def detach_character_from_location(request, characterlocation_id):
    cl = get_object_or_404(CharacterLocation, id = characterlocation_id)
    if (request.user != cl.character.user):
        request.user.message_set.create(message = '<div class="error">You may only detach your own characters!</div>')
        #TODO flag user
        return render_to_response('permission_denied.html', context_instance = RequestContext(request, {}))
    location = cl.location
    cl.delete()
    si = StreamItem(
            action_type = 'LD',
            user = request.user,
            content_type = ContentType.objects.get_for_model(Location),
            object_id = location.id)
    si.save()
    return HttpResponseRedirect(location.get_absolute_url())

##

def ajax_list_species(request):
    import json
    categories = {}
    species = {}
    to_return = {'name': 'species', 'children': []}
    for morph in Morph.objects.all():
        if (morph.species_category.parent.name not in categories):
            categories.update({morph.species_category.parent.name: {'name': morph.species_category.parent.name, 'children': []}})
        if (morph.species_category.__unicode__() not in species):
            species.update({morph.species_category.__unicode__(): {'count': 1, 'parent': morph.species_category.parent.name}})
        else:
            species.update({morph.species_category.__unicode__(): {'count': species[morph.species_category.__unicode__()]['count'] + 1, 'parent': morph.species_category.parent.name }})
    for k, v in species.iteritems():
        categories[v['parent']]['children'].append({'name': k, 'count': v['count']})
    for v in categories.values():
        to_return['children'].append(v)
    return HttpResponse(json.dumps(to_return), mimetype = "application/json")

def ajax_list_genders(request):
    import json
    to_return = {}
    for morph in Morph.objects.all():
        if (morph.gender not in to_return):
            to_return.update({morph.gender: 1})
        else:
            to_return.update({morph.gender: to_return[morph.gender] + 1})
    return HttpResponse(json.dumps(to_return), mimetype = "application/json")

##

def _species_select_dropdown(selected = None):
    to_return = '<select name="species_category"><option>-- Select --</option>'
    species = SpeciesCategory.objects.filter(parent__isnull = True)
    for s in species:
        to_return += '<optgroup label="%s">' % s.name
        species2 = SpeciesCategory.objects.filter(parent = s)
        for s2 in species2:
            to_return += '<option value="%d"%s>%s</option>' % (s2.id, (s2.id == selected and ' selected="selected"' or ''), s2.name)
        to_return += '</optgroup>'
    to_return += '</select>'
    return to_return
