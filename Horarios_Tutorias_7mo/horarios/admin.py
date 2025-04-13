from django.contrib import admin
from .models import DiaSemana, HorarioTutoria

@admin.register(DiaSemana)
class DiaSemanaAdmin(admin.ModelAdmin):
    list_display = ('nombre',)

@admin.register(HorarioTutoria)
class HorarioTutoriaAdmin(admin.ModelAdmin):
    list_display = ('dia', 'hora_inicio', 'hora_fin')
    list_filter = ('dia',)
