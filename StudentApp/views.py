import json
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
from TeacherApp . models import *



from django.db.models import Subquery,OuterRef,Q

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


class CourseListCreateAPIView(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer



class CourseDetailView(generics.RetrieveAPIView):
    serializer_class = CourseSerializer
    lookup_url_kwarg = 'id'

    def get_queryset(self):
        queryset = Course.objects.filter(id=self.kwargs.get(self.lookup_url_kwarg))
        return queryset

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    

class CourseDetailView(RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    lookup_field = 'id'

    def retrieve(self, request, *args, **kwargs):
        course_instance = self.get_object()
        video_instances = Videos.objects.filter(course=course_instance)

        course_serializer = self.get_serializer(course_instance)
        video_serializer = VideoSerializer(video_instances, many=True)

       

        data = {
            'course': course_serializer.data,
            'videos': video_serializer.data
        }
        
        return Response(data, status=status.HTTP_200_OK)


class VideoDetailView(APIView):
    def get(self, request, course_id, video_id):
        try:
            video = Videos.objects.get(course_id=course_id, id=video_id)
            serializer = VideoSerializer(video)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Videos.DoesNotExist:
            return Response({"message": "Video not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class OrderCreateAPIView(APIView):
    def post(self, request, format=None):
        mutable_data = request.data.copy()
        mutable_data['user'] = request.user.id
        print(request.user.id)
        
        serializer = OrderSerializer(data=mutable_data)
        
        if serializer.is_valid():
            serializer.save() 
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class CheckCoursePurchaseAPIView(APIView):
    def get(self, request, course_id, format=None):
        print(request.user)
        if not request.user:
            return Response({"message": "Authentication credentials were not provided"}, status=status.HTTP_401_UNAUTHORIZED)
        
        order_exists = Orders.objects.filter(user=request.user, course_id=course_id).exists()
        print(order_exists)
        
        if order_exists:
            return Response({"purchased": True}, status=status.HTTP_200_OK)
        else:
            return Response({"purchased": False}, status=status.HTTP_200_OK)
        

class PurchasedCoursesListAPIView(generics.ListAPIView):
    serializer_class = OrderMycourseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        order=Orders.objects.filter(user=user)
        return order
    


class CommentCreateView(APIView):
    def post(self, request, *args, **kwargs):
        request.data['user'] = request.user.id
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class VideoCommentsView(generics.ListAPIView):
    serializer_class = CommentSerializer
    def get_queryset(self):
        video_id = self.kwargs['video_id']
        comments=Comment.objects.filter(video=video_id).order_by('date_added')
        return comments 
    








import environ
import razorpay
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import eg
from .serializers import OrderSerializer

env = environ.Env()

environ.Env.read_env()






@api_view(['POST'])
def start_payment(request):
    price = request.data['amount']
    course_id = request.data['course']

    course = Course.objects.get(pk=course_id)
    user = User.objects.get(pk=2)

    client = razorpay.Client(auth=(env('PUBLIC_KEY'), env('SECRET_KEY')))

    payment = client.order.create({"amount": int(price) * 100, 
                                   "currency": "INR", 
                                   "payment_capture": "1"})

    order = Orders.objects.create(user=user,course=course, 
                                 price=price
                               )

    serializer = OrderSerializer(order)


    data = {
        "payment": payment,
        "order": serializer.data
    }
    return Response(data)





















# class MyInbox(generics.ListAPIView):
    
#     serializer_class=MessageSerializer

#     def get_queryset(self):
#         user_id=self.kwargs['user_id']
#         messages=ChatMessage.objects.filter(
#             id__in=Subquery(
#                 User.objects.filter(
#                     Q(sender__reciever=user_id)|
#                     Q(reciever__sender=user_id)
#                 ).distinct().annotate(
#                     Last_msg=Subquery(
#                         ChatMessage.objects.filter(
#                             Q(sender=OuterRef('id'),reciever=user_id)|
#                             Q(reciever=OuterRef('id'),sender=user_id)
#                         ).order_by('-id')[:1].values_list("id",flat=True)
#                     )
#                 ).values_list("Last_msg",flat=True).order_by('-id')
#             )
#         ).order_by("-id")

#         return messages
    


# class GetMessages(generics.ListAPIView):
#     serializer_class=ChatMessage

#     def get_queryset(self):
#         sender_id=self.kwargs['sender_id']
#         reciever_id=self.kwargs['reciever_id']

#         messages=ChatMessage.objects.filter(
#             sender__in=[sender_id,reciever_id],
#             reciever__in=[sender_id,reciever_id]
#         )

#         return messages

  

# class SendMessage(generics.CreateAPIView):
#     serializer_class=MessageSerializer



# class ProfileDetail(generics.RetrieveAPIView):
#     serializer_class=UserProfileSerializer
#     queryset=UserProfile.objects.all()
#     permission_classes=[IsAuthenticated]


# class SearchUser(generics.ListAPIView):
#     serializer_class=UserProfileSerializer
#     queryset=UserProfile.objects.all()
#     # permission_classes=[IsAuthenticated]

#     def List(self,req,*args,**kwargs):
#         username=self.kwargs['username']
#         logged_in_user=self.request.user
#         users=UserProfile.objects.filter(
#             Q(user__username__icontains=username)|
#             Q(user__email__icontains=username)&
#             -Q(user=logged_in_user)
#         )

#         if not user.exists():
#             return Response(
#                 {'detail':"no user founds"},
#                 status=status.HTTP_404_NOT_FOUND
#             )
#         serializer=self.get_serializer(users,many=True)
#         return Response(serializer.data)








