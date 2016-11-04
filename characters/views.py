from django.shortcuts import get_object_or_404, render
from django.template import RequestContext
from django.http import HttpResponse, HttpResponseRedirect
from django.core import serializers
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from django.contrib import messages
from django.core.paginator import Paginator
from django.views.decorators.csrf import csrf_protect
from characters.models import *
from gallery.models import Image
from characters.forms import *
from activitystream.models import *
from usermgmt.models import *

def front(request):
    import random
    counts = {
            'users': User.objects.count(),
            'locations': Location.objects.count(),
            'characters': Character.objects.count(),
            'morphs': Morph.objects.count(),
            'descriptions': Description.objects.count(),
            'images': Image.objects.count()
            }
    new_user = User.objects.order_by('-date_joined')[0]
    random_morph = Morph.objects.all()[random.randint(0, Morph.objects.count() - 1)]
    if (request.GET.get('ajax', None) is not None or request.is_ajax()):
        import json
        return HttpResponse(json.dumps({
            'counts': counts,
            'new_user': new_user.username,
            'random_morph': {
                'user': random_morph.user.username,
                'character': { 'id': random_morph.character.id, 'name': random_morph.character.name },
                'morph': { 'id': random_morph.id, 'display': "%s %s" % (random_morph.gender, random_morph.species_text) }
            }
        }), mimetype = "application/json")
    else:
        return render(request, 'front.html', {'counts': counts, 'new_user': new_user, 'random_morph': random_morph})

def redirect_after_login(request):
    return HttpResponseRedirect('/~%s' % request.user.username)

def list_users(request):
    query = User.objects.order_by('username')
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
        return HttpResponse(serializers.serialize("json", [users]), mimetype = "application/json")
    else:
        return render(request, 'characters/user/list.html', {'users': users})

def show_user(request, username):
    user = get_object_or_404(User, username = username)
    if (request.is_ajax() or request.GET.get('ajax', None) == 'true'):
        import json
        return HttpResponse(json.dumps({
            'fields': { 'username': user.username, 'name': user.get_full_name(), 'date_joined': user.date_joined.strftime("%m/%d/%Y"), 'is_active': user.is_active, 'is_staff': user.is_staff, 'is_superuser': user.is_superuser, 'email': user.email },
            'characters': [ {'name': i.name, 'id': i.id} for i in user.character_set.all() ],
            'morphs': user.morph_set.count(),
            'descriptions': user.description_set.count(),
            'images': user.image_set.count(),
            'locations': user.location_set.count(),
            'is_owner': request.user == user
        }), mimetype = "application/json")
    else:
        return render(request, 'characters/user/show.html', {'user_object': user})

@login_required
def edit_user(request, username):
    if (request.user.username != username):
        messages.add_message(request, messages.ERROR, '<div class="error">You may only edit yourself!</div>')
        return render(request, 'permission_denied.html', {})
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
    return render(request, "characters/user/edit.html", {'form': form, 'user_object': request.user})

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
            messages.add_message(request, messages.WARNING, '<div class="failure">Oops!  All fields required!</div>')
    return render(request, "registration/create_user.html", {})

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
        return render(request, 'characters/character/list.html', {'characters': characters})

def list_characters_for_user(request, username):
    characters = Character.objects.filter(user__username__exact = username)
    if (request.is_ajax() or request.GET.get('ajax', None) == 'true'):
        return HttpResponse(serializers.serialize("json", characters), mimetype = "application/json")
    else:
        # Shouldn't ever really happen, this is mostly here for AJAX requests
        return render(request, 'characters/character/list.html', {'characters': characters})

def show_character(request, character_id):
    character = get_object_or_404(Character, id = character_id)
    if (request.is_ajax() or request.GET.get('ajax', None) == 'true'):
        import json
        return HttpResponse(json.dumps({
            'fields': {'id': character.id, 'name': character.name, 'user': character.user.username},
            'morphs': [ {'id': i.id, 'name': "%s %s" % (i.gender, i.species_text)} for i in character.morph_set.all() ],
            'images': [ {'id': i.id, 'image_id': i.image.id, 'thumbnail': i.image.thumbnail.url, 'attribution': i.image.attribution, 'rating': i.image.rating, 'caption': i.caption} for i in character.images.all() ],
            'is_owner': request.user == character.user,
            'content_type_id': character.get_content_type().id
        }), mimetype = "application/json")
    else:
        return render(request, 'characters/character/show.html', {'character': character, 'species_select': _species_select_dropdown()})

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
            messages.add_message(request, messages.ERROR, '<div class="error">You must enter a name!</div>')
    return render(request, 'characters/character/edit.html', {'character': c})

@login_required
def delete_character(request, character_id):
    character = get_object_or_404(Character, id = character_id)
    if (request.user != character.user):
        #TODO StreamItem flagging user for attempting to delete a character not theirs
        messages.add_message(request, messages.ERROR, '<div class="error">You may only delete your own characters!</div>')
        return render(request, 'permission_denied.html', {})
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
        return render(request, 'characters/character/delete.html', {'character': character})

@login_required
def create_character(request):
    if (request.method == "GET"):
        return render(request, 'characters/character/edit.html', {})
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
        messages.add_message(request, messages.ERROR, '<div class="error">You must enter a name!</div>')
        return render(request, 'characters/character/edit.html', {})

##

def list_morphs_for_character(request, character_id):
    morphs = Morph.objects.filter(character__id__exact = character_id)
    if (request.is_ajax() or request.GET.get('ajax', None) == 'true'):
        return HttpResponse(serializers.serialize("json", morphs), mimetype = "application/json")
    else:
        return render(request, 'morphs/morph/list.html', {})

def show_morph(request, morph_id):
    morph = get_object_or_404(Morph, id = morph_id)
    if (request.is_ajax() or request.GET.get('ajax', None) == 'true'):
        import json
        return HttpResponse(json.dumps({
            'fields': {
                'id': morph.id,
                'name': morph.get_name(),
                'species_category': morph.species_category.__unicode__(),
                'species_text': morph.species_text,
                'gender': morph.gender,
                'user': morph.user.username,
                'character': {
                    'id': morph.character.id,
                    'name': morph.character.name
                }
            },
            'descriptions': [ {'id': d.id, 'name': d.name, 'rating': d.get_rating_display()} for d in morph.description_set.all() ],
            'images': [ {'id': i.id, 'image_id': i.image.id, 'thumbnail': i.image.thumbnail.url, 'attribution': i.image.attribution, 'rating': i.image.rating, 'caption': i.caption} for i in morph.images.all() ],
            'is_owner': request.user == morph.user,
            'content_type_id': morph.get_content_type().id
        }), mimetype = "application/json")
    else:
        return render(request, 'characters/morph/show.html', {'morph': morph})

@login_required
def edit_morph(request, morph_id):
    morph = get_object_or_404(Morph, id = morph_id)
    form = MorphForm(instance = morph)
    if (request.user != morph.user):
        #TODO flag user
        messages.add_message(request, messages.ERROR, '<div class="error">You may only edit a morph that you own!</div>')
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
            ajax_list_species(request)
            ajax_list_genders(request)
            return HttpResponseRedirect(morph.get_absolute_url())
    return render(request, 'characters/morph/edit.html', {'form': form, 'species_category': _species_select_dropdown(morph.species_category.id)})

@login_required
def delete_morph(request, morph_id):
    morph = Morph.objects.get(id = morph_id)
    if (request.user != morph.user):
        #TODO flag user
        messages.add_message(request, messages.ERROR, '<div class="error">You may only delete a morph that belongs to you!</div>')
        return render(request, "permission_denied.html", {})
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
        ajax_list_species(request)
        ajax_list_genders(request)
        return HttpResponseRedirect(character.get_absolute_url())
    else:
        return render(request, 'characters/morph/delete.html', {'morph': morph})

@login_required
def create_morph(request):
    form = MorphForm()
    if (request.method == "POST"):
        form = MorphForm(request.POST)
        if (form.is_valid()):
            morph = form.save(commit = False)
            if (request.user != morph.character.user):
                #TODO flag user
                messages.add_message(request, messages.ERROR, '<div class="error">You may only create morphs for your characters!</div>')
                return render(request, "permission_denied.html", {})
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
            ajax_list_species(request)
            ajax_list_genders(request)
            return HttpResponseRedirect(morph.get_absolute_url())
    return render(request, 'characters/morph/edit.html', {'form': form, 'species_category':  _species_select_dropdown()})

##

def list_descriptions_for_morph(request, morph_id):
    descriptions = Description.objects.filter(morph__id__exact = morph_id)
    if (request.is_ajax() or request.GET.get('ajax', None) == 'true'):
        return HttpResponse(serializers.serialize("json", description), mimetype = "application/json")
    else:
        return render(request, "characters/descriptions/list.html", {"description": description})

def show_description(request, description_id):
    description = get_object_or_404(Description, id = description_id)
    if (request.is_ajax() or request.GET.get('ajax', None) == 'true'):
        import json
        return HttpResponse(json.dumps({
            'fields': {
                'id': description.id,
                'name': description.name,
                'rating': description.rating,
                'rating_display': description.get_rating_display(),
                'description': description.description,
                'user': description.user.username
            },
            'morph': { 'id': description.morph.id, 'name': description.morph.get_name() },
            'character': { 'id': description.morph.character.id, 'name': description.morph.character.name },
            'images': [ {'id': i.id, 'image_id': i.image.id, 'thumbnail': i.image.thumbnail.url, 'attribution': i.image.attribution, 'rating': i.image.rating, 'caption': i.caption} for i in description.images.all() ],
            'is_owner': request.user == description.user,
            'content_type_id': description.get_content_type().id
        }), mimetype = "application/json")
    else:
        return render(request, 'characters/description/show.html', {'description': description})

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
    return render(request, 'characters/description/edit.html', {'form': form})

@login_required
def delete_description(request, description_id):
    description = get_object_or_404(Description, id = description_id)
    if (request.user != description.user):
        # TODO flag user
        messages.add_message(request, messages.ERROR, '<div class="error">You may only delete descriptions that belong to you!</div>')
        return render(request, "permission_denied.html", {})
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
    return render(request, "characters/description/delete.html", {'description': description})

@login_required
def create_description(request):
    form = DescriptionForm()
    if (request.method == "POST"):
        form = DescriptionForm(request.POST)
        if (form.is_valid()):
            description = form.save(commit = False)
            if (request.user != description.morph.user):
                #TODO flag user
                messages.add_message(request, messages.ERROR, '<div class="error">You may only create descriptions for your morphs!</div>')
                return render(request, "permission_denied.html", {})
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
    return render(request, "characters/description/edit.html", {'form': form})

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
        return render(request, 'characters/location/list.html', {'locations': locations})

def show_location(request, location_id):
    location = get_object_or_404(Location, id = location_id)
    if (request.is_ajax() or request.GET.get('ajax', None) == 'true'):
        return HttpResponse(serializers.serialize("json", (location,)), mimetype = "application/json")
    else:
        return render(request, 'characters/location/show.html', {'location': location})

@login_required
def edit_location(request, location_id):
    location = get_object_or_404(Location, id = location_id)
    if (request.user != location.user):
        #TODO flag user
        messages.add_message(request, messages.ERROR, '<div class="error">You may only edit locations that you are the owner of!</div>')
        return render(request, "permission_denied.html", {})
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
    return render(request, 'characters/location/edit.html', {'form': form})

@login_required
def delete_location(request, location_id):
    location = get_object_or_404(Location, id = location_id)
    if (request.user != location.user):
        #TODO flag user
        messages.add_message(request, messages.ERROR, '<div class="error">You may only delete locations that you are the owner of!</div>')
        return render(request, "permission_denied.html", {})
    if (request.method == "POST"):
        location.delete()
        si = StreamItem(
                action_type = 'D',
                user = request.user,
                content_type = ContentType.objects.get_for_model(Location),
                object_id = location_id)
        si.save()
        return HttpResponseRedirect('/')
    return render(request, "characters/location/delete,html", {})

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
    return render(request, "characters/location/edit.html", {'form': form})

@login_required
def attach_character_to_location(request, location_id):
    location = get_object_or_404(Location, id = location_id)
    if (request.GET.get('character_id', None) is None):
        messages.add_message(request, messages.ERROR, '<div class="error">Must attach a character to a location!</div>')
        return HttpResponseRedirect(request.META['HTTP_REFERER'])
    character = get_object_or_404(Character, id = request.GET['character_id'])
    if (request.user != character.user):
        messages.add_message(request, messages.ERROR, '<div class="error">You may only attach your own characters!</div>')
        #TODO flag user
        return render(request, 'permission_denied.html', {})
    if (CharacterLocation.objects.filter(character = character, location = location).count() > 0):
        messages.add_message(request, messages.ERROR, '<div class="warning">That character is already attached to this location!</div>')
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
        messages.add_message(request, messages.ERROR, '<div class="error">You may only detach your own characters!</div>')
        #TODO flag user
        return render(request, 'permission_denied.html', {})
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

def list_species(request):
    species = SpeciesCategory.objects.filter(parent__isnull = True)
    return render(request, "characters/species/list.html", {'species': species})

def show_species(request, species_id):
    species = get_object_or_404(SpeciesCategory, id = species_id)
    return render(request, "characters/species/show.html", {'species': species})

##

def ajax_list_species(request):
    import json
    from django.conf import settings
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
    with open(settings.MEDIA_ROOT + "species.json", "w") as f:
        f.write(json.dumps(to_return))
    return HttpResponse(json.dumps(to_return), mimetype = "application/json")

def ajax_list_genders(request):
    import json
    from django.conf import settings
    to_return = {}
    for morph in Morph.objects.all():
        if (morph.gender not in to_return):
            to_return.update({morph.gender: 1})
        else:
            to_return.update({morph.gender: to_return[morph.gender] + 1})
    with open(settings.MEDIA_ROOT + "genders.json", "w") as f:
        f.write(json.dumps(to_return))
    return HttpResponse(json.dumps(to_return), mimetype = "application/json")

##

def species_dropdown(request):
    return HttpResponse(_species_select_dropdown())

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
