# Generated by Django 4.2.1 on 2023-06-25 07:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('languages', '0003_alter_words_forms'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Words',
            new_name='Word',
        ),
        migrations.CreateModel(
            name='Revise',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('word', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='languages.word')),
            ],
        ),
    ]
