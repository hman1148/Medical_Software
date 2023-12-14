# Generated by Django 4.2.8 on 2023-12-14 05:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='log',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='patient',
            name='primary_insurance',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='patient',
            name='secondary_insurance',
            field=models.TextField(),
        ),
        migrations.DeleteModel(
            name='Insurance',
        ),
        migrations.DeleteModel(
            name='User',
        ),
    ]