from django.conf.urls import url

from .views import *


urlpatterns = [
    url('^image/create/$', create_image),
    url('^i(mage)?/(?P<image_id>\d+)/$', show_image),
    url('^i(mage)?/(?P<image_id>\d+)/edit/$', edit_image),
    url('^i(mage)?/(?P<image_id>\d+)/delete/$', delete_image),
    url('^i(mage)?/(?P<image_id>\d+)/attach/$', attach_image),
    url('^i(mage)?/(?P<image_attachment_id>\d+)/detach/$', detach_image),
    url('^~(?P<username>[a-zA-Z0-9\-_]+)/images/$', list_images_for_user),
    url('^currentUser/images/$', list_images_for_current_user),
    url('^(?P<app_name>[a-zA-Z0-9]+)/(?P<model>[a-zA-Z0-9]+)/(?P<object_id>\d+)/images/$', list_images_attached_to_object),
]
