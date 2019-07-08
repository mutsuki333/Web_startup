from django.urls import path, re_path, include

urlpatterns = []

from .test import urlpatterns as testUrl
urlpatterns.append(path('test/',include(testUrl)))