from django.shortcuts import get_object_or_404, render_to_response
from django.template import RequestContext
from django.http import HttpResponse, HttpResponseRedirect
from django.core import serializers
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from django.core.paginator import Paginator
from django.views.decorators.csrf import csrf_protect
from charref.usermgmt.models import *

@login_required
def set_property(request):
    if (request.POST.get('key', None) is not None and request.POST.get('value', None) is not None):
        p = UserProperty()
        if (UserProperty.objects.filter(user = request.user, key = request.POST['key']).count() > 0):
            p = UserProperty.objects.get(user = request.user, key = request.POST['key'])
        else:
            p = UserProperty(user = request.user, key = request.POST['key'])
        p.value = request.POST['value']
        p.save()
    else:
        messages.add_message(request, messages.ERROR, '<div class="error">There appears to have been a malformed request, there...</div>')
    return HttpResponseRedirect(request.META['HTTP_REFERER'])

@login_required
def remove_property(request, property_id):
    p = get_object_or_404(UserProperty, pk = property_id)
    if (p.user != request.user):
        messages.add_message(request, messages.ERROR, '<div class="error">You may only remove your own properties!</div>')
        return render_to_response('permission_denied.html', context_instance = RequestContext(request, {}))
    p.delete()
    return HttpResponseRedirect(request.META['HTTP_REFERER'])
