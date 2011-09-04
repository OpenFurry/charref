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

def show_image(request, image_id):
    image = get_object_or_404(Image, image_id)
    if (request.is_ajax()):
        return HttpResponse(serializers.serialize("json", image), mimetype = "application/json")
    else:
        return render_to_response('gallery/image/show.html', context_instance = RequestContext(request, {'image': image}))

def list_images_for_user(request, username):
    images = Image.objects.filter(user__username__exact = username)
    if (request.is_ajax()):
        return HttpResponse(serializers.serialize("json", images), mimetype = "application/json")
    else:
        return render_to_response('gallery/image/list.html', context_instance = RequestContext(Request, {'images': image}))

def list_images_attached_to_object(request, app_name, model, object_id):
    ias = ContentType.objects.get_by_natural_key(app_name, model).model_class().get(id = object_id).images.all()
    images = [i.image for i in ias]
    if (request.is_ajax()):
        return HttpResponse(serializers.serialize("json", images), mimetype = "application/json")
    else:
        return render_to_response('gallery/image/list.html', context_instance = RequestContext(Request, {'images': image}))

@login_required
def edit_image(request, image_id):
    image = get_object_or_404(Image, image_id)
    form = ImageForm(instance = image)
    if (request.user != image.owner):
        request.user.message_set.create(message = '<div class="error">You may only edit images that belong to you!</div>')
        return render_to_response('permission_denied.html', context_instnace = RequestContext(request, {}))
    if (request.method == "POST"):
        form = ImageForm(request.POST, instance = image)
        if (form.is_valid()):
            form.save()
            si = StreamItem(
                    action_type = 'U',
                    user = request.user,
                    content_type = ContentType.objects.get_for_model(Image),
                    object_id = image_id)
            si.save()
            request.user.message_set.create(message = '<div class="success">Image update</div>')
            return HttpResponseRedirect(image.get_absolute_url())
    return render_to_response('gallery/image/edit.html', context_instance = RequestContext(request, {'form': form}))

@login_required
def create_image(request):
    form = ImageForm()
    if (request.method == "POST"):
        form = ImageForm(request.POST)
        if (form.is_valid()):
            image = form.save(commit = False)
            image.owner = request.user
            image.save()
            form.save_m2m()
            si = StreamItem(
                    action_type = 'C',
                    user = request.user,
                    content_type = ContentType.objects.get_for_model(Image),
                    object_id = image.id)
            si.save()
            request.user.message_set.create(message = '<div class="success">Image created</div>')
            return HttpResponseRedirect(image.get_absolute_url())
    return render_to_response('gallery/image/edit.html', context_instance = RequestContext(request, {'form': form}))
    
@login_required
def delete_image(request, image_id):
    image = get_object_or_404(Image, image_id)
    if (request.user != image.owner):
        request.user.message_set.create(message = '<div class="error">You may only delete images that belong to you!</div>')
        return render_to_response('permission_denied.html', context_instance = RequestContext(request, {}))
    if (request.method == "POST" and request.POST.get('confirm', None) == 'yes'):
        image.delete()
        si = StreamItem(
                action_type = 'D',
                user = request.user,
                content_type = ContentType.objects.get_for_model(Image),
                object_id = image_id)
        si.save()
        request.user.message_set.create('<div class="success">Image deleted</div>')
        return HttpResponseRedirect('/')
    return render_to_response('gallery/image/delete.html', context_instance = RequestContext(request, {}))

def attach_image(request, image_id):
    image = get_image_or_404(Image, image_id)
    if (request.user != image.owner):
        request.user.message_set.create(message = '<div class="error">You may only attach your images to artifacts!</div>')
        return render_to_response('permission_denied.html', context_instance = RequestContext(request, {}))
    if (request.GET.get('app_label', None) is None or request.GET.get('model', None) is None):
        request.user.message_set.create(message = '<div class="error">There seems to have been a problem - app_label or model was None!  Try again.</div>')
        return HttpResponseRedirect(request.META['HTTP_REFERER'])
    ctype = ContentType.objects.get_by_natural_key(request.GET['app_label'], request.GET['model'])
    form = ImageAttachmentForm(request.GET)
    if (!form.is_valid()):
        request.user.message_set.create(message = '<div class="error">Something seems to have gone wrong with the attachment process.  Try again!</div>')
        return HttpResponseRedirect(request.META['HTTP_REFERER'])
    if (request.user != ctype.get_object_for_this_type(id = form.cleaned_data['object_id']).user):
        request.user.message_set.create(messages = '<div class="error">You may only attach images to your own artifacts!</div>')
        return render_to_response('permission_denied.html', context_instance = RequestContext(request, {}))
    ia = form.save(commit = False)
    ia.content_type = ctype
    ia.save()
    form.save_m2m()
    request.user.message_set.create(message = '<div class="success">Image attached</div>')
    return HttpResponseRedirect(request.META['HTTP_REFERER'])

def detach_image(request, image_attachment_id):
    ia = get_object_or_404(ImageAttachment, image_attachment_id)
    if (request.user != image.owner):
        request.user.message_set.create(message = '<div class="error">You may only detach your images!</div>')
        return render_to_response('permission_denied.html', context_instance = RequestContext(request, {}))
    if (request.user != ia.content_object.user):
        request.user.message_set.create(message = '<div class="error">You may only detach images from your own artifacts!</div>')
        return render_to_response('permission_denied.html', context_instance = RequestContext(request, {}))
    ia.delete()
    request.user.message_set.create(message = '<div class="success">Image detached</div>')
    return HttpResponseRedirect(request.META['HTTP_REFERER'])
