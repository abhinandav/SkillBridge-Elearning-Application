# Generated by Django 5.0.3 on 2024-03-16 10:44

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('course_name', models.CharField(max_length=250)),
                ('description', models.TextField()),
                ('category', models.CharField(max_length=250)),
                ('level', models.CharField(max_length=250)),
                ('demo_video', models.FileField(upload_to='video/demo_video')),
                ('benefit1', models.CharField(blank=True, max_length=250, null=True)),
                ('benefit2', models.CharField(blank=True, max_length=250, null=True)),
                ('benefit3', models.CharField(blank=True, max_length=250, null=True)),
                ('original_price', models.CharField(max_length=250)),
                ('offer_price', models.CharField(max_length=250)),
                ('is_accepted', models.BooleanField(default=False)),
                ('is_blocked', models.BooleanField(default=False)),
                ('is_rejected', models.BooleanField(default=False)),
                ('added_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='User', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Videos',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('video_name', models.CharField(max_length=250)),
                ('description', models.TextField()),
                ('video', models.FileField(upload_to='video/videos')),
                ('is_accepted', models.BooleanField(default=False)),
                ('is_blocked', models.BooleanField(default=False)),
                ('is_rejected', models.BooleanField(default=False)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Course', to='TeacherApp.course')),
            ],
        ),
    ]
