# Generated by Django 4.2.1 on 2023-07-23 18:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('languages', '0043_alter_word_tipp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exercise',
            name='choice',
            field=models.CharField(blank=True, default='', max_length=100, null=True),
        ),
        migrations.DeleteModel(
            name='Exchoice',
        ),
    ]