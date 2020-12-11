from django.shortcuts import render, get_object_or_404
from .models import LocalArea, Profile, Post
from django.core.serializers import serialize
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.contrib.gis.geos import Point
from django.http import JsonResponse
from django.contrib.auth import get_user_model


import logging

# Get an instance of a logger
logger = logging.getLogger(__name__)

# Create your views here.
def index(request):
    User = get_user_model()
    users = User.objects.all()
    return render(request, 'index.html')

def profile(request):
    post_data = Post.objects.all()
    json_data = serialize("json",post_data)
    logger.error(json_data)

    return render(request, 'profile.html', {'posts': post_data, "json": json_data})


def local_area(request):
    local_area_data = serialize('geojson', LocalArea.objects.all())
    return HttpResponse(local_area_data, content_type='geojson')

@login_required
def create_post(request):
    try:
        user_profile = Profile.objects.get(user=request.user)
        if not user_profile:
            raise ValueError("Can't get User details")


        point = request.POST["point"].split(",")
        point = [float(part) for part in point]
        point = Point(point, srid=4326)

        rating = request.POST["rating"]
        rating = int(rating)

        comment = request.POST["comment"]
        new_post = Post(location=point, rating=rating, comment=comment, profile=user_profile)
        new_post.save()
        return HttpResponseRedirect('/')
    except:
        return JsonResponse({"message": str(e)}, status=400)

@login_required
def delete_post(request, pk):
    obj = get_object_or_404(Post, id=pk)

    if request.user.id == obj.profile.id:
        if request.method == 'POST':
            obj.delete()

  
    return HttpResponseRedirect('/')

def signup(request):
    form = UserCreationForm(request.POST)
    if form.is_valid():
        form.save()
        username = form.cleaned_data.get('username')
        password = form.cleaned_data.get('password1')
        user = authenticate(username=username, password=password)
        login(request, user)
        return redirect('map')
    return render(request, 'signup.html', {'form': form})