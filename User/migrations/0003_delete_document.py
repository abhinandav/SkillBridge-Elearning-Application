# Generated by Django 5.0.3 on 2024-03-14 05:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('User', '0002_remove_teacherdetails_documents_document'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Document',
        ),
    ]
