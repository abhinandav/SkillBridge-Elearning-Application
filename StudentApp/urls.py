from .views import *
from django.urls import path

urlpatterns=[
    path("user_details/", UserDetails.as_view(), name="user_details"),
    path('profile_update/', UserDetailsUpdate.as_view(), name='profile_update'),
    path('courses/',CourseListCreateAPIView.as_view(),name='courses'),
    path('course_view/<int:id>/', CourseDetailView.as_view(), name='course-detail'),
]