# Generated by Django 5.0.3 on 2024-04-15 11:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TeacherApp', '0010_alter_course_demo_video_alter_course_thumbnail'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='reject_reason',
            field=models.TextField(blank=True, null=True),
        ),
    ]
