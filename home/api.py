from django.urls import path, re_path
from django.http import JsonResponse, HttpResponse


def msg(request):
    return JsonResponse({'foo':'bar'})

urlpatterns = [
    path('msg', msg)
]