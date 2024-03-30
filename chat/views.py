from User.models import *
from TeacherApp.models import *
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Orders
from .serializers import *
from rest_framework import status


from TeacherApp.serializers import CourseSerializer
from StudentApp.serializers import OrderSerializer

from rest_framework.response import Response
from rest_framework.views import APIView



class OrderWithUserView(APIView):
    def get(self, request):
        orders = Orders.objects.filter(user=request.user)
        serializer = OrderWithUserSerializer(orders, many=True)
        return Response(serializer.data)





class RecieverView(APIView):
    def get(self, request,oid):
        orders = Orders.objects.filter(pk=oid)  
        course_id = orders.values_list('course_id', flat=True).distinct()
        courses = Course.objects.filter(id__in=course_id)
        added_user = [course.added_by for course in courses]
        print('added_user', added_user)

        serializer = UserSerializer(added_user, many=True)
        serialized_data = serializer.data

        return Response(serialized_data)



class OrderChatMessagesAPIView(APIView):
    def get(self, request, oid, *args, **kwargs):
        try:
            order = Orders.objects.get(pk=oid)
        except Orders.DoesNotExist:
            return Response({'error': 'order not found'}, status=status.HTTP_404_NOT_FOUND)

        chat_messages = order.chat_messages.all()
        print(chat_messages)
        serializer = ChatMessageSerializer(chat_messages, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

