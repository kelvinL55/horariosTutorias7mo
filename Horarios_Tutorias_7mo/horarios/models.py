from django.db import models

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
    
    def __str__(self):
        return f"{self.materia} - {self.dia} ({self.hora_inicio.strftime('%H:%M')} - {self.hora_fin.strftime('%H:%M')})"

    class Meta:
        verbose_name = "Horario de Tutoría"
        verbose_name_plural = "Horarios de Tutorías"
        ordering = ['dia', 'hora_inicio']
