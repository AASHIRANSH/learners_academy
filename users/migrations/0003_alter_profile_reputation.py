# Generated by Django 4.2.1 on 2023-06-30 08:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_profile_reputation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='reputation',
            field=models.IntegerField(default=0),
        ),
    ]
