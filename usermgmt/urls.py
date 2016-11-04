from django.conf.urls import url

from .views import *

urlpatterns = [
    url('^property/set/$', set_property),
    url('^property/remove/(?P<property_id>\d+)/$', remove_property),
]
