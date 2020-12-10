from django.contrib import admin
from django.contrib.gis.db import models
from leaflet.admin import LeafletGeoAdmin
from django.contrib.gis import admin
from django.contrib.auth.admin import UserAdmin


from .models import LocalArea, Post, Profile

class LocalAreaAdmin(LeafletGeoAdmin):
    list_display = ('english', 'county', 'fid')
    list_filter = ['county']


class PostAdmin(LeafletGeoAdmin):
    list_display = ('profile', 'comment', 'rating', 'location')

class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user']


admin.site.register(LocalArea, LocalAreaAdmin)
admin.site.register(Post, PostAdmin)
admin.site.register(Profile, ProfileAdmin)