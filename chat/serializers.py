
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



class ChatSenderSerializer(serializers.ModelSerializer):
    sender_username = serializers.CharField(source='sender.username', read_only=True)
    class Meta:
        model = ChatMessage
        fields = ['sender_username']


from rest_framework import serializers

class OrderSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()

    class Meta:
        model = Orders
        fields = ['id', 'user','username', 'course', 'price', 'date_purchased'] 

    def get_username(self, obj):
        print('username',obj.user.username)
        return obj.user.username