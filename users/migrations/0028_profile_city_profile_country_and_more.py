# Generated by Django 4.2.1 on 2023-07-25 18:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0027_profile_ex_err'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='city',
            field=models.CharField(blank=True, default='', max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='country',
            field=models.CharField(blank=True, default='', max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='profession',
            field=models.CharField(choices=[('studend', 'student'), ('teacher', 'teacher'), ('employed', 'employed')], max_length=50),
        ),
    ]
