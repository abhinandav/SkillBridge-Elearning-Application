from django.db import models
from User.models import *
from TeacherApp.models import *


class Order(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    course=models.ForeignKey(Course, on_delete=models.CASCADE)
    date_purchased=models.DateField(auto_now_add=True,blank=True,null=True)
    price=models.CharField(max_length=100,blank=True,null=True)
