# Generated by Django 4.2.1 on 2023-07-26 06:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0029_profile_is_verified_alter_profile_profession'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='is_verified',
            field=models.BooleanField(blank=True, default=False),
        ),
    ]