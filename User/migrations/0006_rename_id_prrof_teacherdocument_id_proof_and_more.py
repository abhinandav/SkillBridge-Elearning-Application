# Generated by Django 5.0.3 on 2024-03-14 06:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('User', '0005_rename_document_teacherdocument'),
    ]

    operations = [
        migrations.RenameField(
            model_name='teacherdocument',
            old_name='id_prrof',
            new_name='id_proof',
        ),
        migrations.AddField(
            model_name='teacherdocument',
            name='graduation_verify',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='teacherdocument',
            name='graduation_proof',
            field=models.FileField(upload_to='teacher_documents/graduation_proof'),
        ),
    ]
