#!/bin/bash

# Автоматический деплой скрипт для IKH Systems
# Этот скрипт будет запускаться на сервере для обновления сайта

set -e  # Остановить выполнение при ошибке

echo "🚀 Начинаем автоматический деплой IKH Systems..."

# Проверяем, что мы в правильной директории
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ Ошибка: docker-compose.yml не найден. Убедитесь, что вы в правильной директории."
    exit 1
fi

# Сохраняем текущую ветку
CURRENT_BRANCH=$(git branch --show-current 2>/dev/null || echo "main")

echo "📋 Текущая ветка: $CURRENT_BRANCH"

# Подтягиваем изменения с GitHub
echo "📥 Подтягиваем изменения с GitHub..."
git fetch origin main

# Проверяем, есть ли новые изменения
if [ "$(git rev-list HEAD..origin/main --count 2>/dev/null)" -gt 0 ]; then
    echo "🔄 Обнаружены новые изменения! Обновляем..."
    
    # Переключаемся на main ветку
    git checkout main
    
    # Подтягиваем изменения
    git pull origin main
    
    echo "📦 Останавливаем текущий контейнер..."
    docker-compose down || true
    
    echo "🔨 Пересобираем Docker образ..."
    docker-compose build --no-cache
    
    echo "▶️ Запускаем новый контейнер..."
    docker-compose up -d
    
    echo "⏳ Ждем запуска контейнера..."
    sleep 10
    
    echo "✅ Проверяем статус контейнера..."
    docker-compose ps
    
    echo "📊 Проверяем логи..."
    docker-compose logs --tail=20
    
    echo "🌐 Проверяем доступность сайта..."
    if curl -f -s http://localhost/health > /dev/null; then
        echo "✅ Сайт доступен и работает!"
    else
        echo "⚠️ Предупреждение: Сайт может быть недоступен. Проверьте логи."
    fi
    
    echo "🎉 Деплой завершен успешно!"
    echo "📊 Сайт обновлен: https://ikhsystems.com"
    
else
    echo "✅ Изменений не обнаружено. Сайт актуален."
fi

echo "🏁 Автоматический деплой завершен."
