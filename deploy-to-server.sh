#!/bin/bash

# Скрипт для деплоя на сервер
# Выполните эти команды на вашем сервере

echo "🚀 Начинаем деплой на сервер..."

# 1. Подключитесь к серверу через SSH
echo "📡 Подключитесь к серверу:"
echo "ssh your-username@your-server-ip"

# 2. Перейдите в директорию проекта на сервере
echo "📁 Перейдите в директорию проекта:"
echo "cd /path/to/your/project"

# 3. Обновите код из GitHub
echo "📥 Обновите код из GitHub:"
echo "git fetch origin main"
echo "git pull origin main"

# 4. Остановите текущий Docker контейнер
echo "⏹️ Остановите текущий контейнер:"
echo "docker-compose down"

# 5. Пересоберите Docker образ
echo "🔨 Пересоберите Docker образ:"
echo "docker-compose build --no-cache"

# 6. Запустите новый контейнер
echo "▶️ Запустите новый контейнер:"
echo "docker-compose up -d"

# 7. Проверьте статус контейнера
echo "✅ Проверьте статус:"
echo "docker-compose ps"
echo "docker-compose logs -f"

# 8. Проверьте доступность сайта
echo "🌐 Проверьте сайт:"
echo "curl -I http://localhost"
echo "curl -I https://ikhsystems.com"

echo "🎉 Деплой завершен!"
echo "📊 Проверьте сайт: https://ikhsystems.com"
