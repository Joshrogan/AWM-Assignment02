from django.contrib.gis.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

class Profile(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.user}"

## Signal
@receiver(post_save, sender=get_user_model())
def manage_user_profile(sender, instance, created, **kwargs):
    try:
        my_profile = instance.profile 
        my_profile.save()
    except Profile.DoesNotExist:
        Profile.objects.create(user=instance)


# Create your models here.
class LocalArea(models.Model):
    fid = models.IntegerField()
    le_id = models.CharField(max_length=8)
    english = models.CharField(max_length=36)
    county = models.CharField(max_length=9)
    guid = models.CharField(max_length=36)
    pop2016 = models.IntegerField()
    c19_p14_t = models.CharField(max_length=17)
    p14_100k = models.FloatField()
    p14_100k_t = models.CharField(max_length=17)
    ire_incp14 = models.IntegerField()
    eventdate = models.DateField()
    geom = models.MultiPolygonField(srid=3857)

    def __str__(self):
        return self.english

class Post(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    comment = models.CharField(max_length=255)
    rating = models.IntegerField()
    location = models.PointField(srid=4326)

    def __str__(self):
        return f"{self.location.x},{self.location.y},{self.profile},{self.comment},{self.rating}"