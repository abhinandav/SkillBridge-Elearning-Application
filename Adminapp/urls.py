from . import views
from django.urls import path


urlpatterns = [
    path('users/', views.AdminUserListCreateView.as_view(), name='users'),
    path('users/status/<int:pk>/', views.AcceptUserView.as_view(), name='accept_teachers_view'),

    path('teachers/', views.AdminUserListCreateView.as_view(), name='teachers'),
    path('teachers/accept/<int:pk>/', views.AcceptUserView.as_view(), name='accept_teachers_view'),
    path('teacher_detail/<int:pk>/', views.AdminUserRetrieveView.as_view(), name='teacher_detail'),

]