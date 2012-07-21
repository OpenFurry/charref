from django.shortcuts import get_object_or_404, render_to_response
from django.template import RequestContext
from django.http import HttpResponse, HttpResponseRedirect
from django.core import serializers
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from charref.gallery.models import *
from charref.gallery.forms import *
from charref.activitystream.models import *
from charref.usermgmt.models import *

def show_image(request, image_id):
    image = get_object_or_404(Image, id = image_id)
    if (request.is_ajax() or request.GET.get('ajax', None) == 'true'):
        import json
        return HttpResponse(json.dumps({
            'fields': {
                'id': image.id,
                'thumbnail': image.thumbnail.url,
                'image': image.image.url,
                'attribution': image.attribution,
                'rating': image.rating,
                'rating_display': image.get_rating_display(),
                'user': image.user.username
            },
            'is_owner': request.user == image.user
        }), mimetype = "application/json")
    else:
        return render_to_response('gallery/image/show.html', context_instance = RequestContext(request, {'image': image}))

def list_images_for_user(request, username):
    user = get_object_or_404(User, username = username)
    if (request.is_ajax() or request.GET.get('ajax', None) == 'true'):
        return HttpResponse(serializers.serialize("json", user.image_set.all()), mimetype = "application/json")
    else:
        return render_to_response('gallery/image/list.html', context_instance = RequestContext(request, {'user_object': user}))

def list_images_for_current_user(request):
    user = request.user
    if (user.is_authenticated()):
        if (request.is_ajax() or request.GET.get('ajax', None) == 'true'):
            return HttpResponse(serializers.serialize("json", user.image_set.all()), mimetype = "application/json")
        else:
            return render_to_response('gallery/image/list.html', context_instance = RequestContext(request, {'user_object': user}))
    else:
        return HttpResponse('[]', mimetype = "application/json")

def list_images_attached_to_object(request, app_name, model, object_id):
    ias = ContentType.objects.get_by_natural_key(app_name, model).model_class().get(id = object_id).images.all()
    images = [i.image for i in ias]
    if (request.is_ajax() or request.GET.get('ajax', None) == 'true'):
        return HttpResponse(serializers.serialize("json", images), mimetype = "application/json")
    else:
        return render_to_response('gallery/image/list.html', context_instance = RequestContext(Request, {'images': image}))

@login_required
def edit_image(request, image_id):
    image = get_object_or_404(Image, id = image_id)
    form = ImageForm(instance = image)
    if (request.user != image.user):
        request.user.message_set.create(message = '<div class="error">You may only edit images that belong to you!</div>')
        return render_to_response('permission_denied.html', context_instnace = RequestContext(request, {}))
    if (request.method == "POST"):
        form = ImageForm(request.POST, request.FILES, instance = image)
        if (form.is_valid()):
            form.save()
            si = StreamItem(
                    action_type = 'U',
                    user = request.user,
                    content_type = ContentType.objects.get_for_model(Image),
                    object_id = image_id)
            si.save()
            request.user.message_set.create(message = '<div class="success">Image updated</div>')
            return HttpResponseRedirect(image.get_absolute_url())
    return render_to_response('gallery/image/edit.html', context_instance = RequestContext(request, {'form': form}))

@login_required
def create_image(request):
    form = ImageForm()
    if (request.method == "POST"):
        form = ImageForm(request.POST, request.FILES)
        if (form.is_valid()):
            image = form.save(commit = False)
            image.user = request.user
            image.save()
            form.save_m2m()
            si = StreamItem(
                    action_type = 'C',
                    user = request.user,
                    content_type = ContentType.objects.get_for_model(Image),
                    object_id = image.id)
            si.save()
            request.user.message_set.create(message = '<div class="success">Image created - <a href="/image/create/">Add another!</a></div>')
            return HttpResponseRedirect(image.get_absolute_url())
    return render_to_response('gallery/image/edit.html', context_instance = RequestContext(request, {'form': form}))
    
@login_required
def delete_image(request, image_id):
    image = get_object_or_404(Image, id = image_id)
    if (request.user != image.user):
        request.user.message_set.create(message = '<div class="error">You may only delete images that belong to you!</div>')
        return render_to_response('permission_denied.html', context_instance = RequestContext(request, {}))
    if (request.method == "POST" and request.POST.get('confirm', None) is not None):
        for ia in image.attachments.all():
            ia.delete()
        image.delete()
        si = StreamItem(
                action_type = 'D',
                user = request.user,
                content_type = ContentType.objects.get_for_model(Image),
                object_id = image_id)
        si.save()
        request.user.message_set.create(message = '<div class="success">Image deleted</div>')
        return HttpResponseRedirect('/~%s' % request.user.username)
    return render_to_response('gallery/image/delete.html', context_instance = RequestContext(request, {'image': image}))

@login_required
def attach_image(request, image_id):
    image = get_object_or_404(Image, id = image_id)
    if (request.user != image.user):
        request.user.message_set.create(message = '<div class="error">You may only attach your images to artifacts!</div>')
        return render_to_response('permission_denied.html', context_instance = RequestContext(request, {}))
    form = ImageAttachmentForm(request.POST)
    if (not form.is_valid()):
        request.user.message_set.create(message = '<div class="error">Something seems to have gone wrong with the attachment process.  Try again! %s</div>' % form.errors)
        return HttpResponseRedirect(request.META['HTTP_REFERER'])
    ia = form.save(commit = False)
    ia.image = image
    ia.save()
    form.save_m2m()
    if (request.user != ia.content_object.user):
        request.user.message_set.create(message = '<div class="error">You may only attach your images to your own artifacts!</div>')
        return render_to_response('permission_denied.html', context_instance = RequestContext(request, {}))
    request.user.message_set.create(message = '<div class="success">Image attached</div>')
    return HttpResponseRedirect(request.META['HTTP_REFERER'])

@login_required
def detach_image(request, image_attachment_id):
    ia = get_object_or_404(ImageAttachment, id = image_attachment_id)
    if (request.user != ia.image.user):
        request.user.message_set.create(message = '<div class="error">You may only detach your images!</div>')
        return render_to_response('permission_denied.html', context_instance = RequestContext(request, {}))
    if (request.user != ia.content_object.user):
        request.user.message_set.create(message = '<div class="error">You may only detach images from your own artifacts!</div>')
        return render_to_response('permission_denied.html', context_instance = RequestContext(request, {}))
    ia.delete()
    request.user.message_set.create(message = '<div class="success">Image detached</div>')
    return HttpResponseRedirect(request.META['HTTP_REFERER'])
