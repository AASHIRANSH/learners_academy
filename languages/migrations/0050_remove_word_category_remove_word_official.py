# Generated by Django 4.2.1 on 2023-08-01 09:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('languages', '0049_exercise_answer'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='word',
            name='category',
        ),
        migrations.RemoveField(
            model_name='word',
            name='official',
        ),
    ]