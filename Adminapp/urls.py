from . import views
from django.urls import path


urlpatterns = [
    path('users/', views.AdminUserListCreateView.as_view(), name='users'),
    path('users/status/<int:pk>/', views.AcceptUserView.as_view(), name='accept_teachers_view'),

    path('teachers/', views.AdminUserListCreateView.as_view(), name='teachers'),
    path('teachers/accept/<int:pk>/', views.AcceptUserView.as_view(), name='accept_teachers_view'),
    path('teacher_detail/<int:pk>/', views.AdminUserRetrieveView.as_view(), name='teacher_detail'),
    path('update_documents/<int:id>/', views.UpdateTeacherDocuments.as_view(), name='update_documents'),


    path('courses/', views.AdminCourseListCreateView.as_view(), name='courses'),
    path('course_status/<int:id>/', views.CourseStatusChangeView.as_view(), name='course_status'),
    path('video_status/<int:id>/', views.VideoStatusChangeView.as_view(), name='video_status'),
]

