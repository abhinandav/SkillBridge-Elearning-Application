from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import AnonymousUser
from User.models import *
from .serializers import *
from .models import *



class UserDetails(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        user_serializer = UserSerializer(user)
        
        try:
            user_profile = UserProfile.objects.get(user=user)
            user_profile_serializer = UserProfileSerializer(user_profile)
            data = {
                "user": user_serializer.data,
                "user_profile": user_profile_serializer.data
            }
            return Response(data)
        except UserProfile.DoesNotExist:
            data = {
                "user": user_serializer.data,
                "user_profile": None
            }
            return Response(data)





class UserDetailsUpdate(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    print('before post')
    def post(self, request, *args, **kwargs):

        print('post')
        user_profile, _ = UserProfile.objects.get_or_create(user=request.user)
        print(user_profile)
        serializer = UserProfileUpdateSerializer(user_profile, data=request.data, partial=True)
        print(serializer)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            print('error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

      