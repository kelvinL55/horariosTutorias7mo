from django.shortcuts import render, redirect, get_object_or_404
from django.views.generic import ListView
from .models import DiaSemana, HorarioTutoria
from django.contrib import messages

# Create your views here.

class HorariosListView(ListView):
    model = DiaSemana
    template_name = 'horarios/horarios_list.html'
    context_object_name = 'dias_semana'
    ordering = ['id']  # Asumiendo que los IDs están en orden: 1=Lunes, 2=Martes, etc.

def editar_dia(request, dia_id):
    dia = get_object_or_404(DiaSemana, id=dia_id)
    
    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        if nombre:
            try:
                dia.nombre = nombre
                dia.save()
                messages.success(request, 'Día actualizado exitosamente.')
                return redirect('horarios:lista_horarios')
            except Exception as e:
                messages.error(request, f'Error al actualizar el día: {str(e)}')
    
    context = {
        'dia': dia
    }
    return render(request, 'horarios/editar_dia.html', context)

def eliminar_dia(request, dia_id):
    dia = get_object_or_404(DiaSemana, id=dia_id)
    
    if request.method == 'POST':
        if dia.horariotutoria_set.exists():
            messages.error(request, 'No se puede eliminar el día porque tiene horarios asociados.')
        else:
            try:
                dia.delete()
                messages.success(request, 'Día eliminado exitosamente.')
            except Exception as e:
                messages.error(request, f'Error al eliminar el día: {str(e)}')
    
    return redirect('horarios:lista_horarios')

def agregar_dia(request):
    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        if nombre:
            try:
                DiaSemana.objects.create(nombre=nombre)
                messages.success(request, 'Día agregado exitosamente.')
                return redirect('horarios:lista_horarios')
            except Exception as e:
                messages.error(request, f'Error al agregar el día: {str(e)}')
    
    return render(request, 'horarios/agregar_dia.html')

def agregar_horario(request):
    if request.method == 'POST':
        # Obtener datos del formulario
        materia = request.POST.get('materia')
        paralelo = request.POST.get('paralelo')
        dia_id = request.POST.get('dia')
        hora_inicio = request.POST.get('hora_inicio')
        hora_fin = request.POST.get('hora_fin')
        notas = request.POST.get('notas')
        
        try:
            dia = DiaSemana.objects.get(id=dia_id)
            HorarioTutoria.objects.create(
                materia=materia,
                paralelo=paralelo,
                dia=dia,
                hora_inicio=hora_inicio,
                hora_fin=hora_fin,
                notas=notas
            )
            messages.success(request, 'Horario agregado exitosamente.')
            return redirect('horarios:lista_horarios')
        except Exception as e:
            messages.error(request, f'Error al agregar el horario: {str(e)}')
    
    # Si es GET o hubo un error, mostrar el formulario
    context = {
        'dias_semana': DiaSemana.objects.all().order_by('id')
    }
    return render(request, 'horarios/agregar_horario.html', context)

def editar_horario(request, horario_id):
    horario = get_object_or_404(HorarioTutoria, id=horario_id)
    
    if request.method == 'POST':
        horario.materia = request.POST.get('materia')
        horario.paralelo = request.POST.get('paralelo')
        horario.dia = DiaSemana.objects.get(id=request.POST.get('dia'))
        horario.hora_inicio = request.POST.get('hora_inicio')
        horario.hora_fin = request.POST.get('hora_fin')
        horario.notas = request.POST.get('notas')
        
        try:
            horario.save()
            messages.success(request, 'Horario actualizado exitosamente.')
            return redirect('horarios:lista_horarios')
        except Exception as e:
            messages.error(request, f'Error al actualizar el horario: {str(e)}')
    
    context = {
        'horario': horario,
        'dias_semana': DiaSemana.objects.all().order_by('id')
    }
    return render(request, 'horarios/editar_horario.html', context)

def eliminar_horario(request, horario_id):
    horario = get_object_or_404(HorarioTutoria, id=horario_id)
    
    if request.method == 'POST':
        try:
            horario.delete()
            messages.success(request, 'Horario eliminado exitosamente.')
        except Exception as e:
            messages.error(request, f'Error al eliminar el horario: {str(e)}')
    
    return redirect('horarios:lista_horarios')
