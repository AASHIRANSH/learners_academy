# Generated by Django 4.2.1 on 2023-11-21 04:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('languages', '0054_word_context_alter_word_pic_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='word',
            name='context',
            field=models.CharField(blank=True, default='', max_length=200, null=True),
        ),
    ]
