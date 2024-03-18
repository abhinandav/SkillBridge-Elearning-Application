# Generated by Django 5.0.3 on 2024-03-18 18:55

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('TeacherApp', '0003_alter_videos_video'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_purchased', models.DateField(auto_now_add=True, null=True)),
                ('price', models.CharField(blank=True, max_length=100, null=True)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='TeacherApp.course')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
