from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets, status
from User.models import User
from User.api.serializers import *
from .serializers import *
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





class AdminUserListCreateView(ListCreateAPIView):
    queryset = User.objects.all().order_by('-date_joined')  
   
    serializer_class = AdminUserSerializer
    filter_backends = [SearchFilter]
    search_fields = ['username',  'email']



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
    

# class AdminUserRetrieveView(RetrieveAPIView):
#     queryset = User.objects.all()
#     serializer_class = AdminUserSerializer
#     lookup_field = 'id'


class AdminUserRetrieveView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = AdminUserSerializer  

    def retrieve(self, request, *args, **kwargs):
        user_instance = self.get_object()
        teacher_details_instance = TeacherDetails.objects.get(user=user_instance)
        
        user_serializer = self.get_serializer(user_instance)
        teacher_details_serializer = TeacherDetailsSerializer(teacher_details_instance)

        data = {
            'user': user_serializer.data,
            'teacher_details': teacher_details_serializer.data
        }

        return Response(data, status=status.HTTP_200_OK)
    