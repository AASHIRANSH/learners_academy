# Generated by Django 4.2.1 on 2023-07-06 13:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('languages', '0019_question_exercise'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Question',
        ),
        migrations.AddField(
            model_name='exercise',
            name='answer',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='exercise',
            name='post',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='languages.post'),
        ),
    ]
