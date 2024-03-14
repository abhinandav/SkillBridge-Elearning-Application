from rest_framework import serializers
from User.models import User,TeacherDetails
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer,TokenRefreshSerializer
from User.models import *



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        # ...
        return token
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('password',)


class OTPVerificationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6)



class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)
            instance.save()
            return instance
        else:
            raise serializers.ValidationError({"password": "Password is required."})





class TeacherRegisterSerializer(UserRegisterSerializer):
    class Meta(UserRegisterSerializer.Meta):
        fields = UserRegisterSerializer.Meta.fields

    def create(self, validated_data):
        user_instance = super().create(validated_data)
        user_instance.is_staff = True
        user_instance.save()
        return user_instance


class TeacherDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherDetails
        fields = ['number', 'age', 'experience', 'address']


class TeacherDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherDocument
        fields = ['id_proof', 'photo_proof','tenth_proof', 'plustwo_proof', 'graduation_proof', 'experience_proof' ]

    def create(self, validated_data):
        return TeacherDocument.objects.create(**validated_data)





# class TeacherDetailsSerializer(serializers.ModelSerializer):
#     documents = DocumentSerializer(many=True, required=False)

#     class Meta:
#         model = TeacherDetails
#         fields = ['number', 'age', 'experience', 'address', 'documents']

#     def create(self, validated_data):
#         documents_data = validated_data.pop('documents', [])
#         teacher_details = TeacherDetails.objects.create(**validated_data)

#         for document_data in documents_data:
#             Document.objects.create(teacher=teacher_details, **document_data)

#         return teacher_details












# -------------------------------13-03---------------------------------------------------------------

# class UserRegisterSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'email', 'password']
#         extra_kwargs = {
#             'password': {'write_only': True}
#         }
        
#     def create(self, validated_data):
#         password = validated_data.pop('password', None)
#         instance = self.Meta.model(**validated_data)
        
#         if password is not None:
#             instance.set_password(password)
#             instance.save()
#             return instance
#         else:
#             raise serializers.ValidationError({"password": "Password is required."})

# class TeacherRegisterSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'email', 'password']
#         extra_kwargs = {'password': {'write_only': True}}

#     def create(self, validated_data):
#         user_instance = super().create(validated_data)
#         user_instance.is_staff = True
#         user_instance.save()
#         return user_instance
# --------------------------------------------------------------



# class UserRegisterSerializer(serializers.ModelSerializer):
#     teacher_details = TeacherDetailsSerializer(required=False)

#     class Meta:
#         model = User
#         fields = ['id', 'username', 'email', 'password', 'teacher_details']
#         extra_kwargs = {'password': {'write_only': True}}

#     def create(self, validated_data):
#         teacher_details_data = validated_data.pop('teacher_details', None)
#         password = validated_data.pop('password', None)

#         user_instance = User.objects.create(**validated_data)

#         if password is not None:
#             user_instance.set_password(password)
#             user_instance.save()

#             # Create TeacherDetails instance associated with the User, if provided
#             if teacher_details_data:
#                 TeacherDetails.objects.create(user=user_instance, **teacher_details_data)

#             return user_instance
#         else:
#             raise serializers.ValidationError({"password": "Password is required."})









# -------------------------------------------------------------------

        
# class TeacherDetailsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = TeacherDetails
#         fields = ['number', 'age', 'experience', 'address', 'documents']







# class UserRegisterSerializer(serializers.ModelSerializer):
#     teacher_details = TeacherDetailsSerializer(required=False)

#     class Meta:
#         model = User
#         fields = ['id', 'username', 'email', 'password', 'teacher_details']
#         extra_kwargs = {
#             'password': {'write_only': True}
#         }

#     def create(self, validated_data):
#         teacher_details_data = validated_data.pop('teacher_details', None)
#         password = validated_data.pop('password', None)

#         user_instance = User.objects.create(**validated_data)

#         if password is not None:
#             user_instance.set_password(password)
#             user_instance.save()

#             # Create TeacherDetails instance associated with the User, if provided
#             if teacher_details_data:
#                 user_instance.teacherdetails_set.create(**teacher_details_data)

#             return user_instance
#         else:
#             raise serializers.ValidationError({"password": "Password is required."})












# class UserRegisterSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'email', 'password']
#         extra_kwargs = {
#             'password': {'write_only': True}
#         }
        
#     def create(self, validated_data):
#         password = validated_data.pop('password', None)
#         instance = self.Meta.model(**validated_data)
        
#         if password is not None:
#             instance.set_password(password)
#             instance.save()
#             return instance
#         else:
#             raise serializers.ValidationError({"password": "Password is required."})
