
from django.urls import path
from .views import *


urlpatterns = [
 path('ordercourse_teachers/',OrderWithUserView.as_view()),
 path('created_teacher/<int:oid>/', RecieverView.as_view()),
 path('chat-messages/<int:oid>/', OrderChatMessagesAPIView.as_view()),
] 