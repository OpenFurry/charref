from django.conf import settings
from django.conf.urls import (
    include,
    url,
)
from django.conf.urls.static import static
from django.contrib import admin

admin.autodiscover()

urlpatterns = [
    url('^', include('characters.urls')),
    url('^', include('gallery.urls')),
    url('^', include('django.contrib.auth.urls')),
    url('^admin/', include(admin.site.urls)),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
