from django.db import models
from django.conf import settings

# Create your models here.

class DiaSemana(models.Model):
    nombre = models.CharField(max_length=10, unique=True)  # Lunes, Martes, etc.
    orden = models.PositiveSmallIntegerField(default=1, verbose_name="Orden")

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name = "Día de la Semana"
        verbose_name_plural = "Días de la Semana"

class HorarioTutoria(models.Model):
    materia = models.CharField(max_length=100, default='Sin materia')
    paralelo = models.CharField(max_length=50, blank=True, null=True, verbose_name="Paralelo")
    dia = models.ForeignKey(DiaSemana, on_delete=models.CASCADE)
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()
    notas = models.TextField(blank=True, null=True, verbose_name="Notas (Opcional)")
    url_curso = models.CharField(max_length=300, blank=True, null=True, verbose_name="URL del Curso")
    ruta_local = models.CharField(max_length=500, blank=True, null=True, verbose_name="Ruta Local")
    
    def __str__(self):
        return f"{self.materia} - {self.dia} ({self.hora_inicio.strftime('%H:%M')} - {self.hora_fin.strftime('%H:%M')})"

    class Meta:
        verbose_name = "Horario de Tutoría"
        verbose_name_plural = "Horarios de Tutorías"
        ordering = ['dia', 'hora_inicio']

class ComentarioHorario(models.Model):
    horario = models.ForeignKey('HorarioTutoria', on_delete=models.CASCADE, related_name='comentarios')
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    texto = models.TextField()
    creado = models.DateTimeField(auto_now_add=True)
    actualizado = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Comentario de {self.usuario} en {self.horario}"
