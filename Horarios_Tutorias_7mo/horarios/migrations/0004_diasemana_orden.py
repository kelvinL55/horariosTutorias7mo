# Generated by Django 5.2 on 2025-04-15 03:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('horarios', '0003_add_initial_courses'),
    ]

    operations = [
        migrations.AddField(
            model_name='diasemana',
            name='orden',
            field=models.PositiveSmallIntegerField(default=1, verbose_name='Orden'),
        ),
    ]
