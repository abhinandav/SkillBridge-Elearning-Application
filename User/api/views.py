from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import * 
from User.api.serializers import MyTokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from rest_framework import status, permissions

from .email import *
from .otp_email import *
from django.contrib.auth.hashers import make_password




class getAccountsRoutes(APIView):
     def get(self, request, format=None):
        routes = [
        'api/accounts/login',
        'api/accounts/register',
                    ]
        return Response(routes)
 


class UserDetails(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = User.objects.get(id=request.user.id)
        print(user.is_superuser)
        data = UserSerializer(user).data
        content = data
        return Response(content)



class UserRegisterView(APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        
        if serializer.is_valid():
            try:
                user = serializer.save(is_active=False)  
                send_otp_via_mail(user.email, user.otp)
                response_data = {
                    'message': 'OTP sent successfully.',
                    'email': user.email  # Include the user's email
                }
                return Response(response_data, status=status.HTTP_200_OK)
            
            except Exception as e:
                print(f"Error during user registration: {e}")
                return Response({'error': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self,request):
        email=request.data['email']
        password=request.data['password']

        user=authenticate(username=email,password=password)

        if user is not None and not user.is_staff  and  user.is_active:
            refresh = RefreshToken.for_user(user)
            refresh['username'] = str(user.username)

            access_token = refresh.access_token
            refresh_token = str(refresh)

            content = {
                'access_token': str(access_token),
                'refresh_token': refresh_token,
                'isAdmin': user.is_superuser,
            }
        elif user.is_staff:
            return Response({'This account is not a user account'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(content, status=status.HTTP_200_OK)



class AdminLoginView(APIView):
    def post(self,request):
        email=request.data['email']
        password=request.data['password']

        user=authenticate(username=email,password=password)

        if user.is_superuser:
            refresh = RefreshToken.for_user(user)
            refresh['username'] = str(user.username)

            access_token = refresh.access_token
            refresh_token = str(refresh)

            content = {
                'access_token': str(access_token),
                'refresh_token': refresh_token,
                'isAdmin': user.is_superuser,
            }
        elif user.is_staff:
            return Response({'This account is not a Superuser account'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(content, status=status.HTTP_200_OK)


class OTPVerificationView(APIView):
    def post(self, request):
        serializer = OTPVerificationSerializer(data=request.data)
        print('valid serializer')
        
        if serializer.is_valid():
            try:
                email = serializer.validated_data.get('email')
                entered_otp = serializer.validated_data.get('otp')
                
                user = User.objects.get(email=email, is_staff=False)
                
                if user.otp == entered_otp:
                    user.is_active = True
                    user.save()
                    return Response({'message': 'User registered and verified successfully'}, status=status.HTTP_200_OK)
                else:
                    return Response({'error': 'Invalid OTP,Please Check your email and Verify'}, status=status.HTTP_400_BAD_REQUEST)
                
            except User.DoesNotExist:
                return Response({'error': 'User not found or already verified'}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                print(f"Error during OTP verification: {e}")
                return Response({'error': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TeacherRegisterView(APIView):
    def post(self, request):
        serializer = TeacherRegisterSerializer(data=request.data)

        if serializer.is_valid():
            try:
                user = serializer.save()
                response_data = {
                    'message': 'Teacher registration successful.',
                    'user_id': user.id,
                }
                print('TeacherRegisterView',response_data)
                return Response(response_data, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class TeacherLoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        user=authenticate(username=email,password=password)

        if user is not None and user.is_staff and not user.is_superuser and user.is_active and user.is_email_verified :
            refresh = RefreshToken.for_user(user)
            refresh['username'] = str(user.username)

            access_token = refresh.access_token
            refresh_token = str(refresh)

            content = {
                'access_token': str(access_token),
                'refresh_token': refresh_token,
                'isAdmin': user.is_superuser,
                'isTeacher': user.is_staff,
            }

            return Response(content, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid credentials or user is not a teacher'}, status=status.HTTP_401_UNAUTHORIZED)


class TeacherDetailsView(APIView):
    def post(self, request):
        user_id = request.data.get('user_id')

        if user_id:
            try:
                user = User.objects.get(id=user_id)
                serializer = TeacherDetailsSerializer(data=request.data)

                if serializer.is_valid():
                    teacher_details = serializer.save(user=user)
                    response_data = {
                        'message': 'Teacher details saved successfully.',
                        'teacher_details_id': teacher_details.id,
                    }
                    return Response(response_data, status=status.HTTP_200_OK)
                else:
                    return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
            except User.DoesNotExist:
                return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({'error': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({'error': 'User ID not provided.'}, status=status.HTTP_400_BAD_REQUEST)



# class TeacherDetailsView(APIView):
#     def post(self, request):
#         user_id = request.data.get('user_id')

#         if user_id:
#             user = User.objects.get(id=user_id)
#             serializer = TeacherDetailsSerializer(data=request.data)

#             if serializer.is_valid():
#                 try:
#                     teacher_details = serializer.save(user=user)
#                     response_data = {
#                         'message': 'Teacher details saved successfully.',
#                         'teacher_details_id': teacher_details.id,
#                     }
#                     return Response(response_data, status=status.HTTP_200_OK)
#                 except Exception as e:
#                     return Response({'error': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
#             else:
#                 return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
#         else:
#             return Response({'error': 'User ID not provided.'}, status=status.HTTP_400_BAD_REQUEST)
        

        

# for forgot password
class ForgotPassword(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        try:
            user = User.objects.get(email=email)

            # Generate OTP
            otp = generate_otp()

            link=f"http://localhost:3000/change_password/{user.id}/"

            send_password_reset_email(user,link)

            print(link)


            return Response({'exists': True,'email':email , 'user_id': user.id, 'message': 'Please Check your Email'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'exists': False, 'message': 'Invalid Email.'}, status=status.HTTP_404_NOT_FOUND)

class ChangePasswordAPIView(APIView):
    def post(self, request, *args, **kwargs):
        user_id = self.kwargs.get('id')
        new_password = request.data.get('password')

        try:
            user = User.objects.get(id=user_id)
            user.password = make_password(new_password)
            user.save()

            return Response({'success':True,'message': 'Password changed successfully.'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)




























# class TeacherRegisterView(APIView):
#     def post(self, request):
#         serializer = TeacherRegisterSerializer(data=request.data)

#         if serializer.is_valid():
#             try:
#                 user = serializer.save()
#                 print(f"User created: {user}")

#                 teacher_details = TeacherDetails.objects.create(
#                     user=user,
#                     number=request.data.get('teacher_details', {}).get('number', ''),
#                     age=request.data.get('teacher_details', {}).get('age', 0),
#                     experience=request.data.get('teacher_details', {}).get('experience', 0),
#                     address=request.data.get('teacher_details', {}).get('address', ''),
#                 )
#                 print(f"TeacherDetails created: {teacher_details}")

#                 response_data = {
#                     'message': 'Teacher registration successful.',
#                     'email': user.email
#                 }
#                 return Response(response_data, status=status.HTTP_200_OK)
#             except Exception as e:
#                 print(f"Error during teacher registration: {e}")
#                 return Response({'error': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
#         else:
#             print(f"Validation errors: {serializer.errors}")
#             return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)










# --------------8-----------
# class RegisterView(APIView):
#     def post(self, request):
#         serializer = UserRegisterSerializer(data=request.data)
        
#         if serializer.is_valid():
#             try:
#                 user = serializer.save(is_active=False)  
#                 send_otp_via_mail(user.email, user.otp)
#                 response_data = {
#                     'message': 'OTP sent successfully.',
#                     'email': user.email  # Include the user's email
#                 }
#                 return Response(response_data, status=status.HTTP_200_OK)
            
#             except Exception as e:
#                 print(f"Error during user registration: {e}")
#                 return Response({'error': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
     
# -----------------------------------------------------------------------------

# class TeacherRegisterView(APIView):
#     def post(self, request):
#         # Serialize user and teacher details data
        
#         print("Received data:", request.data)
#         user_serializer = UserRegisterSerializer(data=request.data)
#         teacher_serializer = TeacherDetailsSerializer(data=request.data.get('teacher_details', {}))
#         print('tttt',teacher_serializer)

#         if user_serializer.is_valid() and teacher_serializer.is_valid():
#             try:
#                 user = user_serializer.save(is_active=False)

#                 # Associate teacher details with the user
#                 teacher_data = request.data.get('teacher_details', {})
#                 print("Teacher details data:", teacher_data)
#                 teacher_data['user'] = user.id
#                 teacher_serializer = TeacherDetailsSerializer(data=teacher_data)

#                 if teacher_serializer.is_valid():
#                     teacher_serializer.save()
#                 else:
#                     # Rollback user creation if teacher details saving fails
#                     user.delete()
#                     return Response(teacher_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#                 # Set is_staff to True for teacher registrations
#                 user.is_staff = True
#                 user.save()

#                 response_data = {
#                     'message': 'Teacher registration successful.',
#                     'email': user.email
#                 }
#                 return Response(response_data, status=status.HTTP_200_OK)

#             except Exception as e:
#                 print(f"Error during teacher registration: {e}")
#                 return Response({'error': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
#         else:
#             print(user_serializer.errors)
#             print(teacher_serializer.errors)
#             return Response({
#                 'user_errors': user_serializer.errors,
#                 'teacher_errors': teacher_serializer.errors
#             }, status=status.HTTP_400_BAD_REQUEST)



# class TeacherRegisterView(APIView):
#     def post(self, request):
#         user_serializer = UserRegisterSerializer(data=request.data)

#         if user_serializer.is_valid():
#             try:
#                 user = user_serializer.save(is_active=False)
#                 user.is_staff = True
#                 user.save()

#                 response_data = {
#                     'message': 'Teacher registration successful.',
#                     'email': user.email
#                 }
#                 return Response(response_data, status=status.HTTP_200_OK)

#             except Exception as e:
#                 print(f"Error during teacher registration: {e}")
#                 return Response({'error': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
#         else:
#             return Response({'error': user_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)












# class RegisterView(APIView):
#     def post(self, request):
#         serializer = UserRegisterSerializer(data=request.data)
#         if serializer.is_valid():
#             try:
#                 user = serializer.save(is_active=False)

#                 is_teacher = 'teacher_details' in request.data
#                 print(is_teacher)
#                 if is_teacher:
#                     teacher_data = request.data.get('teacher_details', {})
#                     teacher_data['user'] = user.id  
#                     serializer_teacher = TeacherDetailsSerializer(data=teacher_data)
                    
#                     if serializer_teacher.is_valid():
#                         serializer_teacher.save()
#                     else:
#                         return Response(serializer_teacher.errors, status=status.HTTP_400_BAD_REQUEST)
#                     user.is_staff = True
#                     print( user.is_staff)
#                     user.save()
#                 else:
#                     send_otp_via_mail(user.email, user.otp)
#                 response_data = {
#                     'message': 'OTP sent successfully.',
#                     'email': user.email 
#                 }
#                 return Response(response_data, status=status.HTTP_200_OK)
            
#             except Exception as e:
#                 print(f"Error during user registration: {e}")
#                 return Response({'error': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)






# -----------------------7---------------------------

# class RegisterView(APIView):
#     def post(self, request):
#         serializer = UserRegisterSerializer(data=request.data)
        
#         if serializer.is_valid():
#             user = serializer.save()
#             send_otp_via_mail(user.email)
#             return Response({'message': 'OTP sent successfully.'}, status=status.HTTP_200_OK)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    













# class RegisterView(APIView):
#     permission_classes = [AllowAny]
#     def post(self, request, format=None):
#         serializer = UserRegisterSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             user = serializer.save()
#             send_otp_via_mail(serializer.data['email'])
#             return Response({ 'msg': 'Registration Successful'}, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


    
# class VerifyOTP(APIView):
#     permission_classes = [AllowAny]
#     def post(self, request):
#         try:
#             data = request.data
#             serializer = VerifyAccountSerializer(data=data)
            
#             if serializer.is_valid(raise_exception=True):
#                 email = serializer.data['email']
#                 otp = serializer.data['otp']
                
#                 user_queryset = User.objects.filter(email=email)
                
#                 if not user_queryset.exists():
#                     return Response({
#                         'status': 400,
#                         'message': 'Invalid Email',
#                         'data': 'Invalid Email'
#                     })

#                 user = user_queryset.first()

#                 if user is None:
#                     return Response({
#                         'status': 400,
#                         'message': 'Invalid Email',
#                         'data': 'Invalid Email'
#                     })

#                 serializer = UserLoginSerializer(user, data={'is_active': True}, partial=True)
#                 if serializer.is_valid():
#                     serializer.save()

#                 return Response({'msg': 'Account Verified'}, status=status.HTTP_201_CREATED)

#         except Exception as e:
#             print(e)
#             return Response({'status': status.HTTP_500_INTERNAL_SERVER_ERROR, 'message': 'Something went wrong'},
#                             status=status.HTTP_500_INTERNAL_SERVER_ERROR)

