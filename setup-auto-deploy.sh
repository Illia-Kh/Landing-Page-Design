#!/bin/bash

# Скрипт настройки автоматического деплоя на сервере
# Запускать на сервере как root

echo "🔧 Настраиваем автоматический деплой..."

# Делаем скрипт исполняемым
chmod +x /var/www/ikhsystems.com/deploy.sh

# Создаем cron job для проверки каждые 5 минут
echo "⏰ Настраиваем cron job..."
(crontab -l 2>/dev/null; echo "*/5 * * * * /var/www/ikhsystems.com/deploy.sh >> /var/log/auto-deploy.log 2>&1") | crontab -

# Создаем лог файл
touch /var/log/auto-deploy.log
chmod 644 /var/log/auto-deploy.log

# Настраиваем логирование
echo "📝 Настраиваем логирование..."

# Создаем systemd service для более надежного деплоя
cat > /etc/systemd/system/auto-deploy.service << EOF
[Unit]
Description=Auto Deploy Service for IKH Systems
After=network.target

[Service]
Type=oneshot
ExecStart=/var/www/ikhsystems.com/deploy.sh
User=root
WorkingDirectory=/var/www/ikhsystems.com

[Install]
WantedBy=multi-user.target
EOF

# Создаем timer для запуска каждые 5 минут
cat > /etc/systemd/system/auto-deploy.timer << EOF
[Unit]
Description=Auto Deploy Timer for IKH Systems
Requires=auto-deploy.service

[Timer]
OnCalendar=*:0/5
Persistent=true

[Install]
WantedBy=timers.target
EOF

# Включаем и запускаем сервис
systemctl daemon-reload
systemctl enable auto-deploy.timer
systemctl start auto-deploy.timer

echo "✅ Автоматический деплой настроен!"
echo "📊 Проверка каждые 5 минут"
echo "📝 Логи: /var/log/auto-deploy.log"
echo "🔧 Управление: systemctl status auto-deploy.timer"
