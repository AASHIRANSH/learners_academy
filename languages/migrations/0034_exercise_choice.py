# Generated by Django 4.2.1 on 2023-07-20 18:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('languages', '0033_remove_exercise_answer'),
    ]

    operations = [
        migrations.AddField(
            model_name='exercise',
            name='choice',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='languages.exchoice'),
        ),
    ]
