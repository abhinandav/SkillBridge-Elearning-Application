from .views import *
from django.urls import path


urlpatterns = [
   path('add_course/', AddCourseView.as_view(), name='add_course'),
   path('add_video/', AddVideoView.as_view(), name='add_video'),
]