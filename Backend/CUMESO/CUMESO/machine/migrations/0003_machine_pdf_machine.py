# Generated by Django 5.0.2 on 2024-03-11 13:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('machine', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='machine',
            name='pdf_machine',
            field=models.FileField(blank=True, null=True, upload_to='machine_pdf'),
        ),
    ]
