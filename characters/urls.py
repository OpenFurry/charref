from django.conf.urls import url

from . import views

urlpatterns = [
    url('^$', views.front),

    url('^accounts/profile/$', views.redirect_after_login),
    url('^accounts/create/$', views.register),

    url('^~(?P<username>[a-zA-Z0-9\-_ ]+)/?$', views.show_user),
    url('^~(?P<username>[a-zA-Z0-9\-_ ]+)/edit/$', views.edit_user),
    url('^register/$', views.register),
    url('^users/$', views.list_users),
    url('^users/(?P<username>[a-zA-Z0-9\-_ ]+)/?$', views.show_user),

    url('^characters/$', views.list_characters),
    url('^~(?P<username>[a-zA-Z0-9\-_ ]+)/characters/$',
        views.list_characters_for_user),
    url('^c(haracter)?/(?P<character_id>\d+)/morphs/$',
        views.list_morphs_for_character),
    url('^m(orph)?/(?P<morph_id>\d+)/descriptions/$',
        views.list_descriptions_for_morph),
    url('^locations/$', views.list_locations),

    url('^character/create/$', views.create_character),
    url('^morph/create/$', views.create_morph),
    url('^description/create/$', views.create_description),
    url('^location/create/$', views.create_location),

    url('^c(haracter)?/(?P<character_id>\d+)/$', views.show_character),
    url('^m(orph)?/(?P<morph_id>\d+)/$', views.show_morph),
    url('^d(escription)?/(?P<description_id>\d+)/$', views.show_description),
    url('^l(ocation)?/(?P<location_id>\d+)/$', views.show_location),

    url('^c(haracter)?/(?P<character_id>\d+)/edit/$', views.edit_character),
    url('^m(orph)?/(?P<morph_id>\d+)/edit/$', views.edit_morph),
    url('^d(escription)?/(?P<description_id>\d+)/edit/$',
        views.edit_description),
    url('^l(ocation)?/(?P<location_id>\d+)/edit/$', views.edit_location),

    url('^c(haracter)?/(?P<character_id>\d+)/delete/$',
        views.delete_character),
    url('^m(orph)?/(?P<morph_id>\d+)/delete/$', views.delete_morph),
    url('^d(escription)?/(?P<description_id>\d+)/delete/$',
        views.delete_description),
    url('^l(ocation)?/(?P<location_id>\d+)/delete/$', views.delete_location),

    url('^l(ocation)?/(?P<location_id>\d+)/attach/$',
        views.attach_character_to_location),
    url('^location/(?P<characterlocation_id>\d+)/detach/$',
        views.detach_character_from_location),

    url('^species/$', views.list_species),
    url('^species/(?P<species_id>\d+)/$', views.show_species),

    url('^_species/$', views.species_dropdown),
    url('^ajax/list_species/$', views.ajax_list_species),
    url('^ajax/list_genders/$', views.ajax_list_genders),
]
