#!/bin/bash

# Script completo para desplegar a GitHub automáticamente
# Proyecto: Horarios de Tutorías 7mo

echo "🚀 DESPLIEGUE COMPLETO A GITHUB - HORARIOS DE TUTORÍAS"
echo "=================================================="

# Función para mostrar ayuda
show_help() {
    echo ""
    echo "📖 USO:"
    echo "   ./deploy_completo.sh [URL_DEL_REPOSITORIO]"
    echo ""
    echo "📝 EJEMPLOS:"
    echo "   ./deploy_completo.sh"
    echo "   ./deploy_completo.sh https://github.com/tu-usuario/horarios-tutorias.git"
    echo ""
    echo "🔧 OPCIONES:"
    echo "   Sin argumentos: Solo hace commit y muestra instrucciones"
    echo "   Con URL: Configura GitHub y sube automáticamente"
    echo ""
}

# Verificar si estamos en un repositorio Git
if [ ! -d ".git" ]; then
    echo "❌ Error: No se encontró un repositorio Git. Inicializando..."
    git init
    echo "✅ Repositorio Git inicializado"
fi

# Configurar Git
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
    # Hacer commit
    echo "💾 Haciendo commit de los cambios..."
    git commit -m "🚀 Configuración completa para despliegue en producción

- ✅ Configuradas variables de entorno para producción
- ✅ Agregado soporte para PostgreSQL en Render
- ✅ Optimizada configuración de archivos estáticos
- ✅ Actualizado requirements.txt con dependencias de producción
- ✅ Mejorada configuración de render.yaml
- ✅ Agregada documentación completa de despliegue
- ✅ Creados scripts de automatización

🎯 Listo para desplegar en Render.com"

    echo "✅ Commit realizado exitosamente"
fi

# Verificar si se proporcionó una URL de GitHub
if [ ! -z "$1" ]; then
    echo ""
    echo "🔧 Configurando repositorio de GitHub con URL: $1"
    
    # Configurar remote origin
    git remote add origin "$1" 2>/dev/null || {
        echo "⚠️  Remote 'origin' ya existe. Actualizando URL..."
        git remote set-url origin "$1"
    }
    
    # Configurar rama main
    git branch -M main
    
    # Subir a GitHub
    echo "🚀 Subiendo cambios a GitHub..."
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo "✅ ¡Repositorio subido exitosamente a GitHub!"
        echo ""
        echo "🌐 Tu repositorio está disponible en: $1"
        echo ""
        echo "🎯 PRÓXIMOS PASOS PARA DESPLEGAR EN RENDER:"
        echo "   1. Ve a https://render.com"
        echo "   2. Conecta tu cuenta de GitHub"
        echo "   3. Selecciona este repositorio"
        echo "   4. Render detectará automáticamente el archivo render.yaml"
        echo "   5. Crea una base de datos PostgreSQL"
        echo "   6. ¡Despliega!"
        echo ""
        echo "📖 Lee README_DEPLOYMENT.md para instrucciones detalladas"
    else
        echo "❌ Error al subir a GitHub. Verifica la URL y tu conexión."
    fi
else
    echo ""
    echo "📋 ESTADO ACTUAL:"
    echo "   ✅ Repositorio Git configurado"
    echo "   ✅ Cambios commiteados"
    echo "   ⚠️  Falta configurar GitHub"
    echo ""
    echo "🔧 PARA COMPLETAR EL DESPLIEGUE:"
    echo "   1. Crea un repositorio en GitHub.com"
    echo "   2. Copia la URL del repositorio"
    echo "   3. Ejecuta: ./deploy_completo.sh [URL_DEL_REPOSITORIO]"
    echo ""
    echo "📖 O sigue las instrucciones del README_DEPLOYMENT.md"
fi

echo ""
echo "📊 RESUMEN DE ARCHIVOS CONFIGURADOS:"
echo "   📄 settings.py - Configuración de producción"
echo "   📄 requirements.txt - Dependencias actualizadas"
echo "   📄 render.yaml - Configuración de Render"
echo "   📄 README_DEPLOYMENT.md - Documentación completa"
echo "   📄 env.example - Variables de entorno"
echo "   📄 deploy_completo.sh - Script de automatización"
echo ""
echo "🎉 ¡Proyecto listo para desplegar!"
