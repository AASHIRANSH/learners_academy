# Generated by Django 4.2.1 on 2023-07-06 16:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('languages', '0023_exercise_fill_values'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='fill_values',
            field=models.CharField(default='', max_length=50),
            preserve_default=False,
        ),
    ]
