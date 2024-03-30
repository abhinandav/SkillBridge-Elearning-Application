from django.db import models
from User.models import *
from TeacherApp.models import *




class Comment(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    course=models.ForeignKey(Course, on_delete=models.CASCADE)
    video=models.ForeignKey(Videos,on_delete=models.CASCADE)
    comment=models.CharField(max_length=255)
    date_added=models.DateField(auto_now_add=True)

    def __str__(self):
         return f" comment of '{self.user.username}' -  on - {self.video.video_name} - {self.course.course_name}"




class eg(models.Model):
    order_product = models.CharField(max_length=100)
    order_amount = models.CharField(max_length=25)
    order_payment_id = models.CharField(max_length=100)
    isPaid = models.BooleanField(default=False)
    order_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.order_product




class Orders(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    date_purchased = models.DateField(auto_now_add=True, blank=True, null=True)
    price = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"order by {self.user.username} - course {self.course.course_name}"





