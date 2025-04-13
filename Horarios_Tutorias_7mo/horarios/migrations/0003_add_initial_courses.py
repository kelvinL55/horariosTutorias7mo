from django.db import migrations
from django.utils import timezone

def add_initial_courses(apps, schema_editor):
    DiaSemana = apps.get_model('horarios', 'DiaSemana')
    HorarioTutoria = apps.get_model('horarios', 'HorarioTutoria')
    
    # Crear días de la semana si no existen
    dias = {
        'Lunes': DiaSemana.objects.get_or_create(nombre='Lunes')[0],
        'Martes': DiaSemana.objects.get_or_create(nombre='Martes')[0],
        'Miércoles': DiaSemana.objects.get_or_create(nombre='Miércoles')[0],
        'Jueves': DiaSemana.objects.get_or_create(nombre='Jueves')[0],
        'Viernes': DiaSemana.objects.get_or_create(nombre='Viernes')[0]
    }
    
    # Lista de cursos a agregar
    cursos = [
        {
            'materia': 'ARQUITECTURA DE REDES',
            'paralelo': '100-ECTS-RED',
            'dia': dias['Lunes'],
            'hora_inicio': '07:00',
            'hora_fin': '09:00',
            'periodo': 'ABR/2025 - AGO/2025'
        },
        {
            'materia': 'ARQUITECTURA DE SOFTWARE',
            'paralelo': '100-ECTS-RED',
            'dia': dias['Martes'],
            'hora_inicio': '09:00',
            'hora_fin': '11:00',
            'periodo': 'ABR/2025 - AGO/2025'
        },
        {
            'materia': 'ARQUITECTURA EMPRESARIAL',
            'paralelo': '100-ECTS-RED',
            'dia': dias['Miércoles'],
            'hora_inicio': '11:00',
            'hora_fin': '13:00',
            'periodo': 'ABR/2025 - AGO/2025'
        },
        {
            'materia': 'CONSEJERO ESTUDIANTIL TECNOLOGIAS DE LA INFORMACION (EN LINEA)',
            'paralelo': '100-ECTS-RED',
            'dia': dias['Jueves'],
            'hora_inicio': '14:00',
            'hora_fin': '16:00',
            'periodo': 'ABR/2025 - AGO/2025'
        },
        {
            'materia': 'DESARROLLO BASADO EN PLATAF MO',
            'paralelo': '100-ECTS-RED',
            'dia': dias['Viernes'],
            'hora_inicio': '16:00',
            'hora_fin': '18:00',
            'periodo': 'ABR/2025 - AGO/2025'
        },
        {
            'materia': 'GESTION DE PROYECTOS',
            'paralelo': '100-ECTS-RED',
            'dia': dias['Lunes'],
            'hora_inicio': '18:00',
            'hora_fin': '20:00',
            'periodo': 'ABR/2025 - AGO/2025'
        }
    ]
    
    # Crear los horarios
    for curso in cursos:
        HorarioTutoria.objects.get_or_create(
            materia=curso['materia'],
            paralelo=curso['paralelo'],
            dia=curso['dia'],
            hora_inicio=curso['hora_inicio'],
            hora_fin=curso['hora_fin'],
            notas=f"Periodo: {curso['periodo']}"
        )

def remove_initial_courses(apps, schema_editor):
    HorarioTutoria = apps.get_model('horarios', 'HorarioTutoria')
    HorarioTutoria.objects.all().delete()

class Migration(migrations.Migration):
    dependencies = [
        ('horarios', '0002_alter_diasemana_options_alter_horariotutoria_options_and_more'),
    ]

    operations = [
        migrations.RunPython(add_initial_courses, remove_initial_courses),
    ] 