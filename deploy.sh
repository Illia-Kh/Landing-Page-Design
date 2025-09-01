#!/bin/bash

# Автоматический деплой скрипт для IKH Systems
# Этот скрипт будет запускаться на сервере для обновления сайта

echo "🚀 Начинаем автоматический деплой..."

# Переходим в директорию проекта
cd /var/www/ikhsystems.com

# Сохраняем текущую ветку
CURRENT_BRANCH=$(git branch --show-current)

# Подтягиваем изменения с GitHub
echo "📥 Подтягиваем изменения с GitHub..."
git fetch origin main

# Проверяем, есть ли новые изменения
if [ "$(git rev-list HEAD..origin/main --count)" -gt 0 ]; then
    echo "🔄 Обнаружены новые изменения! Обновляем..."
    
    # Переключаемся на main ветку
    git checkout main
    
    # Подтягиваем изменения
    git pull origin main
    
    # Устанавливаем зависимости
    echo "📦 Устанавливаем зависимости..."
    npm install --legacy-peer-deps
    
    # Собираем проект
    echo "🔨 Собираем проект..."
    npm run build
    
    # Копируем собранные файлы в веб-директорию
    echo "📁 Копируем файлы..."
    cp -r dist/* /var/www/ikhsystems.com/
    
    # Обновляем права доступа
    chown -R www-data:www-data /var/www/ikhsystems.com/
    chmod -R 755 /var/www/ikhsystems.com/
    
    # Перезапускаем Nginx
    echo "🔄 Перезапускаем Nginx..."
    systemctl reload nginx
    
    echo "✅ Деплой завершен успешно!"
    echo "🌐 Сайт обновлен: https://ikhsystems.com"
else
    echo "✅ Изменений не обнаружено. Сайт актуален."
fi

echo "🏁 Автоматический деплой завершен."
