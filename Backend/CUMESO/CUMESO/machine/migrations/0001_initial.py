# Generated by Django 5.0.2 on 2024-03-11 07:54

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Machine',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', models.SlugField(blank=True, max_length=200, unique=True)),
                ('name', models.CharField(max_length=150, unique=True)),
                ('description', models.CharField(max_length=300, null=True)),
                ('characteristics', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=100), blank=True, null=True, size=None)),
                ('price', models.DecimalField(decimal_places=2, max_digits=15, null=True)),
                ('visibility', models.BooleanField(default=False)),
                ('img', models.ImageField(blank=True, null=True, upload_to='machine_image')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('deleted_at', models.DateTimeField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='MachineUserRelation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
    ]
