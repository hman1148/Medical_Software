# Generated by Django 4.2.8 on 2023-12-21 02:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_alter_log_date'),
    ]

    operations = [
        migrations.RenameField(
            model_name='patient',
            old_name='cost_of_reimbursement',
            new_name='cost_of_hearing_aid',
        ),
    ]
