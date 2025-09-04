# 🚀 IKH Systems — Landing Page (React + Vite + Tailwind)

Современная, высокопроизводительная лендинг‑страница для IKH Systems с упором на SEO, мультиязычность, PWA и качественный UI. Репозиторий оптимизирован для разработки, сборки и продакшен‑развертывания через Docker/Nginx и поддерживает авто‑деплой с сервера.

---

## 📌 Ключевые возможности
- **Современный стек**: React 18 + TypeScript + Vite 5
- **UI/UX**: Tailwind CSS 3, Radix UI, Lucide Icons, анимации Framer Motion
- **Карусели и медиа**: Embla Carousel
- **SEO‑компоненты**: `SEO.tsx`, `StructuredData.tsx`, `Hreflang.tsx`
- **PWA**: `vite-plugin-pwa` (service worker, manifest, авто‑обновление)
- **Мультиязычность**: RU / EN / DE / CS, авто‑детект языка браузера
- **Производительность**: ручное разбиение чанков, gzip, кэш статики в Nginx
- **Деплой**: Dockerfile, docker-compose, Nginx, скрипты авто‑деплоя

---

## 🧱 Технологии и версии
- React: 18.3.x
- TypeScript: 5.3.x
- Vite: 5.x
- Tailwind CSS: 3.3.x
- vite-plugin-pwa: 0.17.x
- UI: Radix UI, Lucide React, Embla Carousel, Framer Motion

См. точные версии в `package.json`.

---

## ⚙️ Требования
- Node.js >= 18
- npm >= 9
- Git (для работы с репозиторием)

---

## ▶️ Быстрый старт (локально)
```bash
# Установка зависимостей
npm install

# Запуск в dev-режиме (порт 3000)
npm run dev

# Сборка продакшен‑бандла в папку dist
npm run build

# Предпросмотр собранной версии
npm run preview
```

Если порт 3000 занят, настройте `server.port` в `vite.config.ts` или освободите порт.

---

## 📜 Скрипты
```bash
npm run dev          # Dev сервер Vite
npm run build        # Продакшен сборка в dist/
npm run preview      # Предпросмотр dist/
npm run lint         # ESLint (ошибки = 0 предупреждений)
npm run lint:fix     # ESLint c авто‑исправлением
npm run format       # Prettier для src/**/*.{ts,tsx,css,md}
npm run type-check   # Проверка типов (tsc --noEmit)
npm run analyze      # Сборка + анализ бандла (vite-bundle-analyzer)
npm run test         # Запуск тестов (Vitest)
npm run test:ui      # UI‑режим Vitest
npm run test:coverage# Покрытие тестов
```
Примечание: для `analyze` используется `npx vite-bundle-analyzer`. Для тестов требуется Vitest (см. `scripts`).

---

## 📂 Структура проекта
```
src/
├── components/
│   ├── ui/                 # Набор UI-компонентов (Radix/shadcn-style)
│   ├── Header.tsx          # Шапка сайта
│   ├── Footer.tsx          # Подвал
│   ├── Hero.tsx            # Герой‑секция
│   ├── (removed)           # Gallery.tsx — removed
│   ├── Router.tsx          # Кастомный роутер (см. ниже)
│   ├── SEO.tsx             # Управление мета‑тегами
│   ├── StructuredData.tsx  # Schema.org разметка
│   └── Hreflang.tsx        # hreflang ссылки
├── pages/                  # Страницы: Home, About, Services, Contact, др.
├── hooks/                  # Хуки (напр. useTheme)
├── styles/                 # Стили (globals.css, variables.css)
├── utils/                  # Утилиты (напр. language.ts)
├── types/                  # Типы TS
├── main.tsx                # Точка входа
└── App.tsx                 # Корневой компонент

public/                     # Статика (favicon, robots.txt, sitemap.xml)
dist/                       # Результат сборки (продакшен)
```

---

## 🧭 Роутинг
Кастомный роутер без внешних зависимостей, с анимациями переходов:
- `src/components/Router.tsx` экспортирует `Router` и `Route`
- `Page` тип: "home" | "about" | "services" | "contact"
- Анимации на базе Framer Motion (`AnimatePresence`, `motion.div`)

---

## 🌓 Темизация и UI
- Tailwind CSS с кастомными переменными в `src/styles/variables.css`
- Компоненты на базе Radix UI (в `src/components/ui`)
- Иконки: Lucide
- Готовые элементы: аккордеон, диалоги, дровер, формы, таблицы и др.

---

## 🌍 Мультиязычность
- Поддерживаемые языки: `ru`, `en`, `de`, `cs`
- Авто‑детект языка браузера: `getNavigatorLanguage()` из `src/utils/language.ts`
- Хранение выбранного языка может осуществляться через URL/LocalStorage (см. реализацию приложения)
- Компонент `Hreflang.tsx` добавляет `<link rel="alternate" hreflang>` для SEO

---

## 🔍 SEO
- `SEO.tsx`: мета‑теги (title, description, keywords, Open Graph, Twitter, canonical)
- `StructuredData.tsx`: JSON‑LD (Organization, LocalBusiness, Service, ContactPage, BreadcrumbList)
- `Hreflang.tsx`: корректные hreflang ссылки, включая `x-default`
- `sitemap.xml`, `robots.txt` в `public/`

Совет: заполняйте реальные значения (URL, изображения, контакты) для корректной индексации.

---

## ⚡ Производительность
- Разделение чанков в `vite.config.ts` (`manualChunks`: vendor/ui)
- Минификация `terser`, отключены sourcemaps в продакшене
- Gzip и агрессивное кэширование статики в `nginx.conf`
- Оптимизация изображений и шрифтов на уровне проекта (см. компоненты/стили)

---

## 📱 PWA
- Подключен `vite-plugin-pwa` (авто‑обновление service worker)
- В продакшене генерируются `dist/manifest.webmanifest`, `dist/sw.js` и пр.
- Регистрация SW — автоматически, см. конфиг в `vite.config.ts`

---

## 🔧 Качество кода
- ESLint (`npm run lint`, zero‑warnings policy)
- Prettier (`npm run format`)
- TypeScript строгий (`npm run type-check`)
- Тесты (Vitest) — см. `npm run test*`

---

## 🐳 Продакшен через Docker
### Вариант 1: Docker build/run
```bash
# Сборка образа
docker build -t ikh-landing .

# Запуск контейнера (Nginx на 80 порту)
docker run --name ikh-landing -p 80:80 --restart unless-stopped -d ikh-landing
```
Образ собирается многоступенчато: билд на Node 18, затем статика обслуживается Nginx с конфигом `nginx.conf`.

### Вариант 2: docker-compose
```bash
docker-compose up -d
```
- Сервис: `ikh-website`
- Порт: `80:80`
- Логи Nginx: маунт `./logs:/var/log/nginx`

---

## 🌐 Nginx (коротко)
Конфиг `nginx.conf`:
- SPA‑роутинг: `try_files $uri $uri/ /index.html;`
- Gzip: включён для основных типов
- Кэширование статики: 1 год, `Cache-Control: public, immutable`
- Базовые security‑заголовки: X-Frame-Options, X-Content-Type-Options и др.

---

## 🤖 Авто‑деплой с сервера (main ветка)
Проекты на продакшене обновляются из ветки `main`.

- Скрипт деплоя: `deploy.sh`
  - `git fetch origin main` → `git pull`
  - `npm install` → `npm run build`
  - Копирование `dist/*` в веб‑директорию
  - `systemctl reload nginx`

- Настройка таймера/cron: `setup-auto-deploy.sh`
  - Создаёт `auto-deploy.service` и `auto-deploy.timer` (каждые 5 минут)
  - Ведёт логи в `/var/log/auto-deploy.log`

- Пошаговое руководство: см. `AUTO-DEPLOY-SETUP.md`

Быстрые команды на сервере:
```bash
# Ручной запуск деплоя
./deploy.sh

# Проверка таймера
systemctl status auto-deploy.timer

# Просмотр логов
tail -f /var/log/auto-deploy.log
```

---

## 🚀 Деплой без Docker (статический хостинг)
1) Соберите проект: `npm run build`
2) Загрузите содержимое `dist/` на ваш статический хостинг (Netlify, Vercel, S3+CloudFront, и т.п.)
3) Убедитесь, что для SPA настроен редирект всех путей на `index.html`

---

## 🧩 Полезные заметки
- Обновите доменные параметры (base URL, контакты, соцсети) в SEO/Schema файлах перед релизом
- Для корректной локализации добавьте переводы контента на все поддерживаемые языки
- Если порт 80 занят в Docker/compose — остановите конфликтующие сервисы или измените маппинг

---

## 🤝 Вклад
- Вносите изменения в отдельной ветке, пишите понятные коммиты
- Проверяйте линт/типы/тесты перед PR
- Следуйте существующему стилю кода и архитектуре компонентов

---

## 📄 Лицензия
MIT. При необходимости добавьте файл `LICENSE` с текстом лицензии.

---

## 📬 Контакты
- Веб‑сайт: https://ikhsystems.com
- Поддержка: укажите корпоративный e‑mail/telegram при необходимости
  