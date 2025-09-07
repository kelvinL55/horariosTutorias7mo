# Despliegue del Proyecto de Horarios de Tutorías

Este proyecto está configurado para desplegarse en Render.com.

## Configuración del Proyecto

### Archivos de Configuración

- `render.yaml`: Configuración de despliegue para Render
- `requirements.txt`: Dependencias de Python
- `Procfile`: Comando de inicio para Heroku (alternativo)
- `env.example`: Variables de entorno de ejemplo

### Variables de Entorno Configuradas

- `SECRET_KEY`: Clave secreta de Django (generada automáticamente)
- `DEBUG`: Modo debug (False en producción)
- `DATABASE_URL`: URL de la base de datos PostgreSQL (proporcionada por Render)
- `DJANGO_ALLOWED_HOSTS`: Hosts permitidos

## Instrucciones de Despliegue en Render

### 1. Preparar el Repositorio

1. Asegúrate de que todos los cambios estén committeados y pusheados a tu repositorio de GitHub
2. Verifica que el archivo `render.yaml` esté en la raíz del proyecto

### 2. Crear el Servicio en Render

1. Ve a [render.com](https://render.com) y crea una cuenta
2. Conecta tu cuenta de GitHub
3. Selecciona "New" → "Web Service"
4. Conecta tu repositorio de GitHub
5. Render detectará automáticamente el archivo `render.yaml`

### 3. Configurar la Base de Datos

1. En el dashboard de Render, crea una nueva base de datos PostgreSQL
2. Render proporcionará automáticamente la variable `DATABASE_URL`
3. No necesitas configurar nada adicional

### 4. Configurar Variables de Entorno

Render configurará automáticamente:

- `SECRET_KEY`: Generada automáticamente
- `DEBUG`: Configurado como False
- `DATABASE_URL`: Proporcionada por la base de datos PostgreSQL

### 5. Desplegar

1. Render comenzará el despliegue automáticamente
2. El proceso incluirá:
   - Instalación de dependencias
   - Recolección de archivos estáticos
   - Migración de la base de datos
   - Inicio del servidor

## Verificación Post-Despliegue

### 1. Verificar la Aplicación

- Visita la URL proporcionada por Render
- Verifica que la aplicación cargue correctamente
- Prueba las funcionalidades principales

### 2. Verificar la Base de Datos

- Accede al panel de administración de Django
- Verifica que las migraciones se aplicaron correctamente
- Crea algunos datos de prueba

### 3. Verificar Archivos Estáticos

- Verifica que los CSS y JavaScript se carguen correctamente
- Verifica que las imágenes se muestren

## Solución de Problemas Comunes

### Error de Archivos Estáticos

Si los archivos estáticos no se cargan:

1. Verifica que `collectstatic` se ejecutó correctamente
2. Revisa la configuración de `STATICFILES_DIRS`
3. Verifica que WhiteNoise esté configurado correctamente

### Error de Base de Datos

Si hay problemas con la base de datos:

1. Verifica que `DATABASE_URL` esté configurada
2. Revisa que las migraciones se ejecutaron
3. Verifica la conexión a PostgreSQL

### Error de Secret Key

Si hay problemas con la clave secreta:

1. Verifica que `SECRET_KEY` esté configurada
2. Asegúrate de que no esté vacía

## Comandos Útiles para Desarrollo Local

```bash
# Instalar dependencias
pip install -r requirements.txt

# Ejecutar migraciones
python manage.py migrate

# Crear superusuario
python manage.py createsuperuser

# Recolectar archivos estáticos
python manage.py collectstatic

# Ejecutar servidor de desarrollo
python manage.py runserver
```

## Estructura del Proyecto

```
Horarios_Tutorias_7mo/
├── horarios/                 # App principal
│   ├── models.py            # Modelos de datos
│   ├── views.py             # Vistas
│   ├── urls.py              # URLs
│   ├── templates/           # Plantillas HTML
│   └── static/              # Archivos estáticos
├── tutorias_project/        # Configuración del proyecto
│   ├── settings.py          # Configuración
│   ├── urls.py              # URLs principales
│   └── wsgi.py              # WSGI
├── requirements.txt         # Dependencias
├── render.yaml             # Configuración de Render
└── Procfile                # Comando de inicio
```

## Soporte

Si encuentras problemas durante el despliegue:

1. Revisa los logs de Render en el dashboard
2. Verifica la configuración de variables de entorno
3. Asegúrate de que todas las dependencias estén instaladas
4. Verifica que la base de datos esté configurada correctamente
