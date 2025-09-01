# 🚀 Автоматический деплой для IKH Systems

## 📋 Что нужно сделать на сервере:

### 1. Подключиться к серверу
```bash
ssh root@ikhsystems.com
```

### 2. Перейти в директорию проекта
```bash
cd /var/www/ikhsystems.com
```

### 3. Скопировать скрипты (если их нет)
```bash
# Скопировать deploy.sh и setup-auto-deploy.sh на сервер
# Или создать их вручную
```

### 4. Настроить автоматический деплой
```bash
# Сделать скрипт исполняемым
chmod +x deploy.sh

# Запустить настройку
./setup-auto-deploy.sh
```

### 5. Проверить статус
```bash
# Проверить timer
systemctl status auto-deploy.timer

# Посмотреть логи
tail -f /var/log/auto-deploy.log

# Проверить cron jobs
crontab -l
```

## 🔧 Ручной запуск деплоя:
```bash
# Запустить деплой вручную
./deploy.sh

# Или через systemd
systemctl start auto-deploy.service
```

## 📊 Мониторинг:
- **Логи:** `/var/log/auto-deploy.log`
- **Статус:** `systemctl status auto-deploy.timer`
- **Cron:** `crontab -l`

## ⚙️ Настройки:
- **Частота проверки:** каждые 5 минут
- **Ветка:** main
- **Автоматическая сборка:** да
- **Перезапуск Nginx:** да

## 🛠️ Управление:
```bash
# Остановить автоматический деплой
systemctl stop auto-deploy.timer
systemctl disable auto-deploy.timer

# Запустить автоматический деплой
systemctl start auto-deploy.timer
systemctl enable auto-deploy.timer

# Посмотреть последние логи
tail -20 /var/log/auto-deploy.log
```

## ✅ Результат:
После настройки сервер будет автоматически:
1. Проверять изменения в GitHub каждые 5 минут
2. Подтягивать новые коммиты из main ветки
3. Собирать проект
4. Обновлять файлы на сайте
5. Перезапускать Nginx

**Сайт будет всегда актуальным!** 🎉
