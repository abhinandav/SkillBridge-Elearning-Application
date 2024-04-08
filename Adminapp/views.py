import datetime
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets, status
from User.models import *
from StudentApp.models import *
from TeacherApp.models import *
from User.api.serializers import *
from .serializers import *
from TeacherApp.serializers import *
# from StudentApp.serializers import *
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
class AdminTeacherListView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer  

    def retrieve(self, request, *args, **kwargs):
        user_instance = self.get_object()
        print(user_instance)
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
    
class TeacherDocumentStatusChangeView(APIView):
    def patch(self, request, id, *args, **kwargs):
        document = get_object_or_404(TeacherDocument, id=id)

        if 'id_verify' in request.data:
            document.id_verify = True
        if 'photo_verify' in request.data:
            document.photo_verify = True
        if 'tenth_verify' in request.data:
            document.tenth_verify = True
        if 'plustwo_verify' in request.data:
            document.plustwo_verify = True
        if 'graduation_verify' in request.data:
            document.graduation_verify = True
        if 'experience_verify' in request.data:
            document.experience_verify = True
       
        
        document.save()

        serializer = TeacherDocumentSerializer(document)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class AdminOrderList(ListCreateAPIView):
    queryset = Orders.objects.all().order_by('-date_purchased')  
    serializer_class = OrderListSerializer
    filter_backends = [SearchFilter]
    search_fields = ['course_name']




from django.http import JsonResponse
from django.views.generic import View
from StudentApp.models import Orders
from django.db.models import Count
from django.utils.timezone import now
from datetime import timedelta
from django.db.models.functions import TruncMonth,TruncYear
from django.db.models import Sum
from django.db.models import Sum
from datetime import datetime, timedelta

from django.db.models import Sum
from django.http import JsonResponse
from django.views import View
from datetime import datetime, timedelta




class AdminDashboardCount(APIView):
    def get(self,request):
        user_count=User.objects.filter(is_staff=False,is_superuser=False).count()
        teacher_count=User.objects.filter(is_staff=True,is_superuser=False).count()
        course_count=Course.objects.filter(is_accepted=True).count()
        orders=Orders.objects.all().count()
        bolcked_users=User.objects.filter(is_staff=False,is_superuser=False,is_active=False).count()
        blocked_teachers=User.objects.filter(is_staff=True,is_active=False).count()
        blocked_courses=Course.objects.filter(is_accepted=True,is_blocked=True).count()
        videos=Videos.objects.filter().count()
        data={
            'user':user_count,
            'teacher':teacher_count,
            'course':course_count,
            'orders':orders,
            'videos':videos,

            'buser':bolcked_users,
            'bteacher':blocked_teachers,
            'bcourse':blocked_courses
        }
        print(data)
        return Response(data,status=status.HTTP_200_OK)

class OrdersGraphView(View):
    def get(self, request):
        # Get orders for the past 6 months
        six_months_ago = now() - timedelta(days=30*6)
        orders = Orders.objects.filter(date_purchased__gte=six_months_ago)

        # Group orders by month and count them
        monthly_orders = orders.annotate(
            year_month=TruncMonth('date_purchased')
        ).values('year_month').annotate(
            total_orders=Count('id')
        ).order_by('year_month')

        # Convert queryset to dictionary
        orders_data = [
            {
                'year_month': order['year_month'].strftime('%Y-%m'),
                'total_orders': order['total_orders']
            }
            for order in monthly_orders
        ]
 

        return JsonResponse(orders_data, safe=False)
    
class OrderGraphYearView(View):
    def get(self, request):
        # Fetch yearly order data
        yearly_data = Orders.objects.annotate(
            year=TruncYear('date_purchased')
        ).values('year').annotate(
            total_orders=Count('id')
        ).order_by('year')

        formatted_yearly_data = [{'year_month': item['year'].strftime('%Y'), 'total_orders': item['total_orders']} for item in yearly_data]

        return JsonResponse(formatted_yearly_data, safe=False)
    
class OrdersByWeekView(View):
    def get(self, request, *args, **kwargs):
        # Get the first and last day of the current month
        today = datetime.today()
        first_day_of_month = today.replace(day=1)
        last_day_of_month = today.replace(day=1, month=today.month+1) - timedelta(days=1)

        # Fetch orders made within the current month
        orders = Orders.objects.filter(date_purchased__range=[first_day_of_month, last_day_of_month])

        # Determine the number of weeks in the current month
        num_weeks = (last_day_of_month - first_day_of_month).days // 7 + 1

        # Count orders by week
        orders_by_week = {}
        for week_number in range(num_weeks):
            start_of_week = first_day_of_month + timedelta(weeks=week_number)
            end_of_week = min(start_of_week + timedelta(days=6), last_day_of_month)
            week_name = f"Week {week_number + 1}"
            orders_in_week = orders.filter(date_purchased__range=[start_of_week, end_of_week])
            orders_by_week[week_name] = orders_in_week.count()

        return JsonResponse(orders_by_week)

