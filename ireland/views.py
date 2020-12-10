from django.shortcuts import render, redirect
from .models import LocalArea
from django.core.serializers import serialize
from django.http import HttpResponse, HttpResponseRedirect

# Create your views here.
def index(request):
    return render(request, 'index.html')

def map(request):
    return render(request, 'map.html')


def local_area(request):
    local_area_data = serialize('geojson', LocalArea.objects.all())
    return HttpResponse(local_area_data, content_type='geojson')