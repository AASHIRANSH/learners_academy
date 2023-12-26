# Generated by Django 4.2.1 on 2023-12-26 10:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('languages', '0061_revise_revise_word_collocation'),
    ]

    operations = [
        migrations.CreateModel(
            name='Collocation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('word', models.CharField(max_length=50)),
                ('pos', models.CharField(max_length=50)),
                ('entry_pos', models.CharField(max_length=50)),
                ('entry', models.TextField()),
                ('examples', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='word',
            name='collocation',
        ),
    ]