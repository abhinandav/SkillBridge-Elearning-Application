from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets, status
from User.models import User
from TeacherApp.models import *
from User.api.serializers import *
from .serializers import *
from TeacherApp.serializers import *
from rest_framework.generics import ListCreateAPIView

from rest_framework.exceptions import AuthenticationFailed,ParseError
from django.contrib.auth import authenticate

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers
from rest_framework.parsers import MultiPartParser, FormParser

from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import SearchFilter

from rest_framework.generics import RetrieveAPIView
from rest_framework.generics import UpdateAPIView

from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404


from rest_framework import status, permissions




#list users
class AdminUserListCreateView(ListCreateAPIView):
    queryset = User.objects.all().order_by('-date_joined')  
   
    serializer_class = UserSerializer
    filter_backends = [SearchFilter]
    search_fields = ['username',  'email']




#accept teachers and block / unblock
class AcceptUserView(APIView):
    def patch(self, request, pk, *args, **kwargs):
        user = get_object_or_404(User, pk=pk)

        if 'is_email_verified' in request.data:
            user.is_email_verified = True
        elif 'is_active' in request.data:
            user.is_active = request.data['is_active']

        user.save()

        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

# teacher details and document view
class AdminUserRetrieveView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer  

    def retrieve(self, request, *args, **kwargs):
        user_instance = self.get_object()
        teacher_details_instance = TeacherDetails.objects.get(user=user_instance)
        teacher_documents_instance = TeacherDocument.objects.get(user=user_instance)
        
        user_serializer = self.get_serializer(user_instance)
        teacher_details_serializer = TeacherDetailsSerializer(teacher_details_instance)
        teacher_documents_serializer = TeacherDocumentSerializer(teacher_documents_instance)

        data = {
            'user': user_serializer.data,
            'teacher_details': teacher_details_serializer.data,
            'teacher_documents': teacher_documents_serializer.data

        }

        return Response(data, status=status.HTTP_200_OK)
    




# update documents of teacher
class UpdateTeacherDocuments(APIView):
    def put(self, request, id, format=None):
        print(id)
        try:
            teacher_document = TeacherDocument.objects.get(pk=id)
            print(teacher_document)
        except TeacherDocument.DoesNotExist:
            print('404...........')
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = TeacherDocumentSerializer(teacher_document, data=request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# course list
    
class AdminCourseListCreateView(ListCreateAPIView):
    queryset = Course.objects.all().order_by('-date_added')  
    serializer_class = CourseSerializer
    filter_backends = [SearchFilter]
    search_fields = ['course_name']



 

class CourseStatusChangeView(APIView):
    def patch(self, request, id, *args, **kwargs):
        course = get_object_or_404(Course, id=id)

        if 'is_accepted' in request.data:
            course.is_accepted = True
        elif 'is_blocked' in request.data:
            course.is_blocked = request.data['is_blocked']

        course.save()

        serializer = CourseSerializer(course)
        return Response(serializer.data, status=status.HTTP_200_OK)


class VideoStatusChangeView(APIView):
    def patch(self, request, id, *args, **kwargs):
        video = get_object_or_404(Videos, id=id)

        if 'is_accepted' in request.data:
            video.is_accepted = True

        video.save()

        serializer = VideosSerializer(video)
        return Response(serializer.data, status=status.HTTP_200_OK)