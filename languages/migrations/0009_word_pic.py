# Generated by Django 4.2.1 on 2023-06-28 17:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('languages', '0008_alter_word_word_root'),
    ]

    operations = [
        migrations.AddField(
            model_name='word',
            name='pic',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
