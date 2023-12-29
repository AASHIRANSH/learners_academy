# Generated by Django 4.2.1 on 2023-07-18 18:08

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('languages', '0030_word_def_inf_word_root_pos'),
    ]

    operations = [
        migrations.AddField(
            model_name='word',
            name='official',
            field=models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL),
        ),
    ]
