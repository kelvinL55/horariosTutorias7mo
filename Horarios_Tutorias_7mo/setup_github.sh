#!/bin/bash

# Script para configurar el repositorio de GitHub
# Proyecto: Horarios de Tutorías 7mo

echo "🔧 Configurando repositorio de GitHub..."

# Verificar si ya existe un remote origin
if git remote get-url origin >/dev/null 2>&1; then
    echo "✅ Remote 'origin' ya está configurado:"
    git remote get-url origin
    echo ""
    echo "🚀 Subiendo cambios a GitHub..."
    git push origin main 2>/dev/null || git push origin master 2>/dev/null || {
        echo "⚠️  No se pudo hacer push. Verificando rama actual..."
        CURRENT_BRANCH=$(git branch --show-current)
        echo "📋 Rama actual: $CURRENT_BRANCH"
        echo "🔧 Intenta ejecutar: git push origin $CURRENT_BRANCH"
    }
else
    echo "⚠️  No se encontró remote 'origin' configurado"
    echo ""
    echo "📝 Para configurar GitHub, necesitas:"
    echo "   1. Crear un repositorio en GitHub.com"
    echo "   2. Copiar la URL del repositorio"
    echo "   3. Ejecutar los siguientes comandos:"
    echo ""
    echo "   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    echo ""
    echo "🔗 O ejecuta este script con la URL del repositorio:"
    echo "   ./setup_github.sh https://github.com/TU_USUARIO/TU_REPOSITORIO.git"
    
    # Si se proporciona una URL como argumento
    if [ ! -z "$1" ]; then
        echo ""
        echo "🔧 Configurando con la URL proporcionada: $1"
        git remote add origin "$1"
        git branch -M main
        echo "🚀 Subiendo cambios a GitHub..."
        git push -u origin main
        echo "✅ ¡Repositorio configurado y subido exitosamente!"
    fi
fi

echo ""
echo "📋 Estado actual del repositorio:"
git status --short
echo ""
echo "🌐 Remotes configurados:"
git remote -v
