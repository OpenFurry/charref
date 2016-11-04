from django.conf.urls import url

from . import views

urlpatterns = [
    url('^property/set/$', views.set_property),
    url('^property/remove/(?P<property_id>\d+)/$', views.remove_property),
]
