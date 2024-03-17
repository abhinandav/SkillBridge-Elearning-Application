from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Course
from .serializers import *
from rest_framework.permissions import IsAuthenticated 



class AddCourseView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        mutable_data = request.data.copy()
        mutable_data['added_by'] = request.user.id
        
        serializer = CourseSerializer(data=mutable_data)
        
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class AddVideoView(APIView):
    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = VideosSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    



# class AddCourseView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request, *args, **kwargs):
#         mutable_data = request.data.copy()
#         mutable_data['added_by'] = request.user.id
        
#         serializer = CourseSerializer(data=mutable_data)
        
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    