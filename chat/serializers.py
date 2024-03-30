
from rest_framework import serializers
from .models import User
from StudentApp.models import *
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email'] 

class OrderWithUserSerializer(serializers.ModelSerializer):
    user = UserSerializer(source='course.added_by', read_only=True)

    class Meta:
        model = Orders
        fields = ['id', 'user', 'date_purchased', 'price']


class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = '__all__'
