# Generated by Django 5.2 on 2025-04-15 21:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('horarios', '0004_diasemana_orden'),
    ]

    operations = [
        migrations.AddField(
            model_name='horariotutoria',
            name='url_curso',
            field=models.CharField(blank=True, max_length=300, null=True, verbose_name='URL del Curso'),
        ),
    ]
