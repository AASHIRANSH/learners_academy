# Generated by Django 4.2.1 on 2024-01-08 10:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('coding', '0006_pythonquestion'),
    ]

    operations = [
        migrations.AddField(
            model_name='pythonquestion',
            name='mcq',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]