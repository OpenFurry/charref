from django.conf.urls.defaults import *
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('charref.characters.views',
    (r'^$', 'front'),
    (r'^ng/', 'ng'),

    (r'^~(?P<username>[a-zA-Z0-9\-_]+)/$', 'show_user'),
    (r'^~(?P<username>[a-zA-Z0-9\-_]+)/edit/$', 'edit_user'),
    (r'^register/$', 'register'),
    (r'^users/$', 'list_users'),

    (r'^characters/$', 'list_characters'),
    (r'^~(?P<username>[a-zA-Z0-9\-_]+)/characters/$', 'list_characters_for_user'),
    (r'^c(haracter)?/(?P<character_id>\d+)/morphs/$', 'list_morphs_for_character'),
    (r'^m(orph)?/(?P<morph_id>\d+)/descriptions/$', 'list_descriptions_for_morph'),
    (r'^locations/$', 'list_locations'),

    (r'^character/create/$', 'create_character'),
    (r'^morph/create/$', 'create_morph'),
    (r'^description/create/$', 'create_description'),
    (r'^location/create/$', 'create_location'),

    (r'^c(haracter)?/(?P<character_id>\d+)/$', 'show_character'),
    (r'^m(orph)?/(?P<morph_id>\d+)/$', 'show_morph'),
    (r'^d(escription)?/(?P<description_id>\d+)/$', 'show_description'),
    (r'^l(ocation)?/(?P<location_id>\d+)/$', 'show_location'),

    (r'^c(haracter)?/(?P<character_id>\d+)/edit/$', 'edit_character'),
    (r'^m(orph)?/(?P<morph_id>\d+)/edit/$', 'edit_morph'),
    (r'^d(escription)?/(?P<description_id>\d+)/edit/$', 'edit_description'),
    (r'^l(ocation)?/(?P<location_id>\d+)/edit/$', 'edit_location'),

    (r'^c(haracter)?/(?P<character_id>\d+)/delete/$', 'delete_character'),
    (r'^m(orph)?/(?P<morph_id>\d+)/delete/$', 'delete_morph'),
    (r'^d(escription)?/(?P<description_id>\d+)/delete/$', 'delete_description'),
    (r'^l(ocation)?/(?P<location_id>\d+)/delete$', 'delete_location'),

    (r'^_species/$', 'ajax_list_species')
)

urlpatterns += patterns('charref.gallery.views',
    (r'^image/create/$', 'create_image'),
    (r'^image/(?P<image_id>\d+)/$', 'show_image'),
    (r'^image/(?P<image_id>\d+)/edit/$', 'edit_image'),
    (r'^image/(?P<image_id>\d+)/delete/$', 'edit_image'),
    (r'^image/(?P<image_id>\d+)/attach/$', 'attach_image'),
    (r'^image/(?P<image_attachment_id>\d+)/detach/$', 'detach_image'),
    (r'^~(?P<username>[a-zA-Z0-9\-_]+)/images/$', 'list_images_for_user'),
    (r'^(?P<app_name>[a-zA-Z0-9]+)/(?P<model>[a-zA-Z0-9]+)/(?P<object_id>\d+)/images/$', 'list_images_attached_to_object')
)

urlpatterns += patterns('',
    (r'^_security/', include('charref.permissions.urls')),
    (r'^admin/', include(admin.site.urls))
)

