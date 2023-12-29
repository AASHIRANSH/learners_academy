# Generated by Django 4.2.1 on 2023-12-29 14:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('languages', '0002_delete_collocation'),
    ]

    operations = [
        migrations.CreateModel(
            name='Collocation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('word', models.CharField(max_length=50)),
                ('pos', models.CharField(max_length=50)),
                ('usage', models.CharField(blank=True, max_length=50, null=True, verbose_name='Usage')),
                ('entry_pos', models.CharField(max_length=50)),
                ('context', models.TextField()),
                ('examples', models.TextField(blank=True, null=True)),
            ],
        ),
    ]