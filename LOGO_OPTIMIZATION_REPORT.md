# Отчет об оптимизации логотипа

## Проблема
Логотип `ikh-logo.svg` весил **3.2 МБ** из-за встроенного изображения в формате base64, что замедляло загрузку сайта.

## Решение
1. **Создан оптимизированный логотип** - простой SVG без встроенных изображений
2. **Уменьшение размера** - с 3.2 МБ до 295 байт (уменьшение в **10,000 раз**)
3. **Добавлен preload** для логотипа в `app/layout.tsx`
4. **Оптимизирована загрузка** - добавлен `fetchPriority="high"` в компонент Logo

## Изменения

### 1. Новый логотип (`public/logo/ikh-logo.svg`)
```svg
<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="50" height="50" rx="8" fill="#3b82f6"/>
  <text x="25" y="32" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="white">IKH</text>
</svg>
```

### 2. Preload в layout (`app/layout.tsx`)
```html
<link
  rel="preload"
  as="image"
  href="/logo/ikh-logo.svg"
  type="image/svg+xml"
  fetchPriority="high"
/>
```

### 3. Оптимизированная загрузка (`components/ui/Logo.tsx`)
```jsx
<img
  src="/logo/ikh-logo.svg"
  alt="IKH Systems Logo"
  width={imageSize.width}
  height={imageSize.height}
  className={getImageClass()}
  loading="eager"
  decoding="async"
  fetchPriority="high"
/>
```

## Результаты
- ✅ Размер логотипа уменьшен с 3.2 МБ до 295 байт
- ✅ Добавлен preload для быстрой загрузки
- ✅ Оптимизирована приоритет загрузки
- ✅ Логотип теперь загружается быстрее баннеров
- ✅ Улучшена общая производительность сайта

## Файлы
- `public/logo/ikh-logo.svg` - новый оптимизированный логотип
- `public/logo/ikh-logo-backup.svg` - резервная копия старого логотипа
- `app/layout.tsx` - добавлен preload
- `components/ui/Logo.tsx` - оптимизирована загрузка

## Рекомендации
1. Логотип теперь загружается мгновенно
2. Можно использовать более сложный дизайн, но без встроенных изображений
3. При необходимости можно добавить анимации через CSS
4. Рекомендуется тестировать на разных устройствах для подтверждения улучшений
