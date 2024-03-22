from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer,TokenRefreshSerializer
from User.api import serializers,views
from User.models import *
from Adminapp.views import *
from TeacherApp.models import *
from .models import *


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



class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model =Videos
        fields= '__all__'



class CourseSerializer(serializers.ModelSerializer):
    videos = VideoSerializer(many=True, read_only=True)
    user = serializers.SerializerMethodField()
    class Meta:
        model = Course
        fields = '__all__'

    def get_user(self, obj):
        return obj.added_by.username
    


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['user', 'course', 'price', 'date_purchased'] 



class OrderMycourseSerializer(serializers.ModelSerializer):
    course = CourseSerializer()
    class Meta:
        model = Order
        fields = ['user', 'course', 'price', 'date_purchased'] 



class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields ='__all__'
