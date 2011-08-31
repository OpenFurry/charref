from django.conf.urls.defaults import *

admin.autodiscover()

urlpatterns = patterns('charref.characters.views',
    (r'^$', 'front'),

    (r'^~(?P<username>[a-zA-Z0-9\-_])/$', 'show_user'),
    (r'^profile/edit/$', 'edit_user'),
    (r'^register/$', 'register'),

    (r'^c(haracter)?/(?P<character_id>\d+)/$', 'show_character'),
    (r'^m(orph)?/(?P<morph_id>\d+)/$', 'show_morph'),
    (r'^d(escription)?/(?P<desc_id>\d+)/$', 'show_description'),
    (r'^l(ocation)?/(?P<location_id>\d+)/$', 'show_location'),

    (r'^c(haracter)?/(?P<character_id>\d+)/edit/$', 'edit_character'),
    (r'^m(orph)?/(?P<morph_id>\d+)/edit/$', 'edit_morph'),
    (r'^d(escription)?/(?P<desc_id>\d+)/edit/$', 'edit_description'),
    (r'^l(ocation)?/(?P<location_id>\d+)/edit/$', 'edit_location'),

    (r'^c(haracter)?/(?P<character_id>\d+)/delete/$', 'delete_character'),
    (r'^m(orph)?/(?P<morph_id>\d+)/delete/$', 'delete_morph'),
    (r'^d(escription)?/(?P<desc_id>\d+)/delete/$', 'delete_description'),
    (r'^l(ocation)?/(?P<location_id>\d+)/delete$', 'delete_location'),

    (r'^c(haracter)?/create/$', 'create_character'),
    (r'^m(orph)?/create/$', 'create_morph'),
    (r'^d(escription)?/create/$', 'create_description'),
    (r'^l(ocation)?/create/$', 'create_location'),

    (r'^_species/$', 'ajax_list_species')
)

urlpatterns += patterns('charref.gallery.views',
    (r'^image/(?P<image_id>\d+)/$', 'show_image'),
    (r'^image/(?P<image_id>\d+)/edit/$', 'edit_image'),
    (r'^image/(?P<image_id>\d+)/delete/$', 'edit_image'),
    (r'^image/(?P<image_id>\d+)/attach/$', 'attach_image'),
    (r'^image/(?P<image_id>\d+)/detach/$', 'detach_image')
)

urlpatterns += patterns('',
    (r'^_security/', include('charref.permissions.urls'),
    (r'^admin/', include(admin.site.urls))
)
