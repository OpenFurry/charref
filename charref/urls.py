from django.conf.urls import (
    include,
    url,
)
from django.contrib import admin

admin.autodiscover()

urlpatterns = [
    url('^', include('characters.urls')),
    url('^', include('gallery.urls')),
    url('^', include('django.contrib.auth.urls')),
    url('^admin/', include(admin.site.urls)),
]
