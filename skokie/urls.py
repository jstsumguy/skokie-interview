from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from django.contrib.auth.views import *

urlpatterns = patterns('',
    url(r'^$', 'books.views.index', name='index'),
    url(r'^book/(?P<book_id>\d+)/$', 'books.views.book', name='book'),
    url(r'^edit_review/$', 'books.views.edit_review'),
    url(r'^new_review/$', 'books.views.new_review'),
    url(r'^check_login/$', 'books.views.check_login'),


    url(r'^admin/', include(admin.site.urls)),
    url(r'^accounts/login/$', 'django.contrib.auth.views.login', {'template_name': 'login.html'}),
    url(r'^logout/$', 'books.views.logout'),
    url(r'^signup/$', 'books.views.signup'),
) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
