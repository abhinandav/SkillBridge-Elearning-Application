from django.contrib import admin

from .models import User,TeacherDetails,Document

admin.site.register(User)
admin.site.register(TeacherDetails)
admin.site.register(Document)