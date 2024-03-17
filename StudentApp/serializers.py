from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer,TokenRefreshSerializer
from User.api import serializers,views
from User.models import *
from Adminapp.views import *


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = [ 'profile_pic', 'phone', 'social_link1', 'social_link2', 'about']


class UserSerializer(serializers.ModelSerializer):
    user_profile = UserProfileSerializer(many=False, read_only=True)  
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'date_joined', 'last_login', 'is_superuser', 'is_email_verified', 'is_staff', 'is_active', 'otp', 'user_profile']



class UserProfileUpdateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=False)  

    class Meta:
        model = UserProfile
        fields = ['profile_pic', 'phone', 'social_link1', 'social_link2', 'about', 'username']

    def update(self, instance, validated_data):
        instance.profile_pic = validated_data.get('profile_pic', instance.profile_pic)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.social_link1 = validated_data.get('social_link1', instance.social_link1)
        instance.social_link2 = validated_data.get('social_link2', instance.social_link2)
        instance.about = validated_data.get('about', instance.about)
        instance.save()

        # If username is provided, update User's username
        username = validated_data.get('username')
        if username:
            user = instance.user
            user.username = username
            user.save()

        return instance








# class UserProfileSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserProfile
#         fields = ['profile_pic', 'phone', 'social_link1', 'social_link2', 'about', 'current_role']



# class StudentUserSerializer(serializers.ModelSerializer):
#     User_Profile = UserProfileSerializer(required=False)

#     class Meta:
#         model = User
#         fields = ['id', 'username', 'User_Profile']

#     def update(self, instance, validated_data):
#         # Update username if present in validated data
#         username = validated_data.pop('username', None)
#         if username:
#             instance.username = username
#             instance.save()

#         # Update UserProfile if present in validated data
#         profile_data = validated_data.pop('User_Profile', None)
#         if profile_data:
#             user_profile = instance.User_Profile
#             for key, value in profile_data.items():
#                 setattr(user_profile, key, value)
#             user_profile.save()

#         return instance

