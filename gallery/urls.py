from django.conf.urls import url

from . import views


urlpatterns = [
    url('^image/create/$', views.create_image),
    url('^i(mage)?/(?P<image_id>\d+)/$', views.show_image),
    url('^i(mage)?/(?P<image_id>\d+)/edit/$', views.edit_image),
    url('^i(mage)?/(?P<image_id>\d+)/delete/$', views.delete_image),
    url('^i(mage)?/(?P<image_id>\d+)/attach/$', views.attach_image),
    url('^i(mage)?/(?P<image_attachment_id>\d+)/detach/$', views.detach_image),
    url('^~(?P<username>[a-zA-Z0-9\-_]+)/images/$',
        views.list_images_for_user),
    url('^currentUser/images/$', views.list_images_for_current_user),
    url('^(?P<app_name>[a-zA-Z0-9]+)/(?P<model>[a-zA-Z0-9]+)/'
        '(?P<object_id>\d+)/images/$',
        views.list_images_attached_to_object), ]
