from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager


class MyAccountManager(BaseUserManager):
    def create_user(self,username,email,password=None):
        if not email:
            raise ValueError('User Must Have An Email Adress')
            
        user = self.model(
            email = self.normalize_email(email),
            username = username,
        )
        user.set_password(password)
        user.save(using=self._db)
        
        return user
    
    def create_superuser(self,username,email,password):
        user = self.create_user(email=self.normalize_email(email),
                                username=username,
                                password=password,
                                )
        user.is_active = True
        user.is_superuser = True
        user.is_email_verified = True
        user.is_staff = False
        
        user.save(using=self._db)
        return user
            

class User(AbstractBaseUser):
    username = models.CharField(max_length=50)
    email = models.EmailField(max_length=100,unique=True)
    
    
    #required field
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now_add=True)
    is_superuser = models.BooleanField(default=False)
    is_email_verified = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    # is_rejected=models.BooleanField(default=True)
    otp = models.CharField(max_length=6, blank=True, null=True)
    
    USERNAME_FIELD  = 'email'
    REQUIRED_FIELDS = ['username']
    
    objects = MyAccountManager()
    
    def __str__(self):
        return self.username
    
    def has_perm(self,perm,obj=None):
        return self.is_superuser
    
    def has_module_perms(self,add_label):
        return True
        

class TeacherDetails(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    number = models.CharField(max_length=15)
    age = models.PositiveIntegerField()
    experience = models.PositiveIntegerField()
    address = models.TextField()
    # documents = models.FileField(upload_to='teacher_documents/', blank=True, null=True)

    def __str__(self):
        return self.user.username if self.user else 'TeacherDetails'
    

class Document(models.Model):
    teacher = models.ForeignKey(TeacherDetails, on_delete=models.CASCADE)
    file = models.FileField(upload_to='teacher_documents/')
    is_verified=models.BooleanField(default=False)
    is_blocked=models.BooleanField(default=False)
    def __str__(self):
            return self.TeacherDetails.user.username if self.user else 'Document'