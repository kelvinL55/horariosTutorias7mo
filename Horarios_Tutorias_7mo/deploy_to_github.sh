#!/bin/bash

# Script automático para subir cambios a GitHub
# Proyecto: Horarios de Tutorías 7mo

echo "🚀 Iniciando despliegue automático a GitHub..."

# Verificar si estamos en un repositorio Git
if [ ! -d ".git" ]; then
    echo "❌ Error: No se encontró un repositorio Git. Inicializando..."
    git init
    echo "✅ Repositorio Git inicializado"
fi

# Configurar Git si es necesario
echo "📝 Configurando Git..."
git config user.name "Kelvin" 2>/dev/null || true
git config user.email "kelvin@example.com" 2>/dev/null || true

# Agregar todos los archivos
echo "📁 Agregando archivos al staging area..."
git add .

# Verificar si hay cambios para commitear
if git diff --staged --quiet; then
    echo "ℹ️  No hay cambios nuevos para commitear"
else
    # Hacer commit con mensaje descriptivo
    echo "💾 Haciendo commit de los cambios..."
    git commit -m "🚀 Configuración para despliegue en producción

- Configuradas variables de entorno para producción
- Agregado soporte para PostgreSQL en Render
- Optimizada configuración de archivos estáticos
- Actualizado requirements.txt con dependencias de producción
- Mejorada configuración de render.yaml
- Agregada documentación de despliegue

Listo para desplegar en Render.com"

    echo "✅ Commit realizado exitosamente"
    
    # Verificar si hay un remote origin configurado
    if git remote get-url origin >/dev/null 2>&1; then
        echo "🌐 Subiendo cambios a GitHub..."
        git push origin main 2>/dev/null || git push origin master 2>/dev/null || {
            echo "⚠️  No se pudo hacer push automático. Verificando rama actual..."
            CURRENT_BRANCH=$(git branch --show-current)
            echo "📋 Rama actual: $CURRENT_BRANCH"
            echo "🔧 Intenta ejecutar manualmente: git push origin $CURRENT_BRANCH"
        }
    else
        echo "⚠️  No se encontró remote 'origin' configurado"
        echo "🔧 Para configurar el remote, ejecuta:"
        echo "   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git"
        echo "   git push -u origin main"
    fi
fi

echo "✅ Proceso completado!"
echo ""
echo "📋 Resumen de cambios:"
echo "   - settings.py: Configuración de producción"
echo "   - requirements.txt: Dependencias actualizadas"
echo "   - render.yaml: Configuración de Render mejorada"
echo "   - README_DEPLOYMENT.md: Documentación de despliegue"
echo "   - env.example: Variables de entorno de ejemplo"
echo ""
echo "🌐 Próximo paso: Desplegar en Render.com siguiendo las instrucciones del README_DEPLOYMENT.md"
