from django.conf.urls import url

from .views import *

urlpatterns = [
    url('^$', front),
    url('^ng/', ng),
    url('^app/', app),

    url('^accounts/profile/$', redirect_after_login),
    url('^accounts/create/$', register),

    url('^~(?P<username>[a-zA-Z0-9\-_ ]+)/?$', show_user),
    url('^~(?P<username>[a-zA-Z0-9\-_ ]+)/edit/$', edit_user),
    url('^register/$', register),
    url('^users/$', list_users),
    url('^users/(?P<username>[a-zA-Z0-9\-_ ]+)/?$', show_user),

    url('^characters/$', list_characters),
    url('^~(?P<username>[a-zA-Z0-9\-_ ]+)/characters/$', list_characters_for_user),
    url('^c(haracter)?/(?P<character_id>\d+)/morphs/$', list_morphs_for_character),
    url('^m(orph)?/(?P<morph_id>\d+)/descriptions/$', list_descriptions_for_morph),
    url('^locations/$', list_locations),

    url('^character/create/$', create_character),
    url('^morph/create/$', create_morph),
    url('^description/create/$', create_description),
    url('^location/create/$', create_location),

    url('^c(haracter)?/(?P<character_id>\d+)/$', show_character),
    url('^m(orph)?/(?P<morph_id>\d+)/$', show_morph),
    url('^d(escription)?/(?P<description_id>\d+)/$', show_description),
    url('^l(ocation)?/(?P<location_id>\d+)/$', show_location),

    url('^c(haracter)?/(?P<character_id>\d+)/edit/$', edit_character),
    url('^m(orph)?/(?P<morph_id>\d+)/edit/$', edit_morph),
    url('^d(escription)?/(?P<description_id>\d+)/edit/$', edit_description),
    url('^l(ocation)?/(?P<location_id>\d+)/edit/$', edit_location),

    url('^c(haracter)?/(?P<character_id>\d+)/delete/$', delete_character),
    url('^m(orph)?/(?P<morph_id>\d+)/delete/$', delete_morph),
    url('^d(escription)?/(?P<description_id>\d+)/delete/$', delete_description),
    url('^l(ocation)?/(?P<location_id>\d+)/delete/$', delete_location),

    url('^l(ocation)?/(?P<location_id>\d+)/attach/$', attach_character_to_location),
    url('^location/(?P<characterlocation_id>\d+)/detach/$', detach_character_from_location),

    url('^species/$', list_species),
    url('^species/(?P<species_id>\d+)/$', show_species),

    url('^_species/$', species_dropdown),
    url('^ajax/list_species/$', ajax_list_species),
    url('^ajax/list_genders/$', ajax_list_genders),
]
