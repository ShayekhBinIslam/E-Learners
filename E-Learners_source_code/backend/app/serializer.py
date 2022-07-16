from rest_framework import serializers
from .models import *


class ReactSerializer(serializers.ModelSerializer):
  class Meta:
    model = React
    fields = ["employee", "department"]

class CareerTrackSerializer(serializers.ModelSerializer):
  class Meta:
    model = CareerTrack
