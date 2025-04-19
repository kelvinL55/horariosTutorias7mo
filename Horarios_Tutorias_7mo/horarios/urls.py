from django.urls import path
from . import views

app_name = 'horarios'

urlpatterns = [
    path('', views.HorariosListView.as_view(), name='lista_horarios'),
    path('agregar/', views.agregar_horario, name='agregar_horario'),
    path('editar/<int:horario_id>/', views.editar_horario, name='editar_horario'),
    path('eliminar/<int:horario_id>/', views.eliminar_horario, name='eliminar_horario'),
    path('dia/agregar/', views.agregar_dia, name='agregar_dia'),
    path('dia/editar/<int:dia_id>/', views.editar_dia, name='editar_dia'),
    path('dia/eliminar/<int:dia_id>/', views.eliminar_dia, name='eliminar_dia'),
    path('actualizar_datos_horario/', views.actualizar_datos_horario, name='actualizar_datos_horario'),
    path('comentarios/<int:horario_id>/', views.obtener_comentarios, name='obtener_comentarios'),
    path('comentarios/guardar/', views.guardar_comentario, name='guardar_comentario'),
    path('comentarios/eliminar/', views.eliminar_comentario, name='eliminar_comentario'),
] 