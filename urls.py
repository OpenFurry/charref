from django.conf.urls.defaults import *
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('charref.characters.views',
    (r'^$', 'front'),
    (r'^ng/', 'ng'),
    (r'^app/', 'app'),

    (r'^~(?P<username>[a-zA-Z0-9\-_ ]+)/$', 'show_user'),
    (r'^~(?P<username>[a-zA-Z0-9\-_ ]+)/edit/$', 'edit_user'),
    (r'^register/$', 'register'),
    (r'^users/$', 'list_users'),
    (r'^users/(?P<username>[a-zA-Z0-9\-_ ]+)/?$', 'show_user'),

    (r'^characters/$', 'list_characters'),
    (r'^~(?P<username>[a-zA-Z0-9\-_ ]+)/characters/$', 'list_characters_for_user'),
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
    (r'^l(ocation)?/(?P<location_id>\d+)/delete/$', 'delete_location'),

    (r'^l(ocation)?/(?P<location_id>\d+)/attach/$', 'attach_character_to_location'),
    (r'^location/(?P<characterlocation_id>\d+)/detach/$', 'detach_character_from_location'),

    (r'^species/$', 'list_species'),
    (r'^species/(?P<species_id>\d+)/$', 'show_species'),

    (r'^_species/$', 'species_dropdown'),
    (r'^ajax/list_species/$', 'ajax_list_species'),
    (r'^ajax/list_genders/$', 'ajax_list_genders'),
)

urlpatterns += patterns('charref.gallery.views',
    (r'^image/create/$', 'create_image'),
    (r'^i(mage)?/(?P<image_id>\d+)/$', 'show_image'),
    (r'^i(mage)?/(?P<image_id>\d+)/edit/$', 'edit_image'),
    (r'^i(mage)?/(?P<image_id>\d+)/delete/$', 'delete_image'),
    (r'^i(mage)?/(?P<image_id>\d+)/attach/$', 'attach_image'),
    (r'^i(mage)?/(?P<image_attachment_id>\d+)/detach/$', 'detach_image'),
    (r'^~(?P<username>[a-zA-Z0-9\-_]+)/images/$', 'list_images_for_user'),
    (r'^currentUser/images/$', 'list_images_for_current_user'),
    (r'^(?P<app_name>[a-zA-Z0-9]+)/(?P<model>[a-zA-Z0-9]+)/(?P<object_id>\d+)/images/$', 'list_images_attached_to_object')
)

urlpatterns += patterns('',
    (r'^login/$', 'django.contrib.auth.views.login'),
    (r'^logout/$', 'django.contrib.auth.views.logout_then_login'),
    (r'^accounts/profile/$', 'charref.characters.views.redirect_after_login'),
    (r'^accounts/create/$', 'charref.characters.views.register'),
    (r'^accounts/password/change/$', 'django.contrib.auth.views.password_change'),
    (r'^accounts/password/change/done/$', 'django.contrib.auth.views.password_change_done'),
    (r'^accounts/password/reset/$', 'django.contrib.auth.views.password_reset'),
    (r'^accounts/password/reset/confirm/(?P<uidb36>[0-9A-Za-z]+)-(?P<token>.+)/$', 'django.contrib.auth.views.password_reset_confirm'),
    (r'^accounts/password/reset/complete', 'django.contrib.auth.views.password_reset_complete'),
    (r'^accounts/password/reset/done/$', 'django.contrib.auth.views.password_reset_done'),
    (r'^property/set/$', 'charref.usermgmt.views.set_property'),
    (r'^property/remove/(?P<property_id>\d+)/$', 'charref.usermgmt.views.remove_property'),
    #(r'^_security/', include('charref.permissions.urls')),
    (r'^admin/', include(admin.site.urls)),
    (r'^admin/docs/', include('django.contrib.admindocs.urls'))
)
