from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('profile/', views.profile, name='profile'),
    path('local_area', views.local_area, name='local_area'),
    path('create_post/', views.create_post, name="create_post"),
    path('delete/<pk>/', views.delete_post, name="delete_post"),
    path('signup/', views.signup, name='signup'),
]