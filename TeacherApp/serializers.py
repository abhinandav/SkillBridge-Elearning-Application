from rest_framework import serializers
from .models import Course,Videos

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        exclude = ('is_accepted', 'is_blocked', 'is_rejected')

class VideosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Videos
        exclude = ('is_accepted', 'is_blocked', 'is_rejected')
