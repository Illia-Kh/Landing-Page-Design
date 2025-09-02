import React, { useState, useEffect } from 'react';
import { Theme } from '../types/theme';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Проверяем системную тему
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateSystemTheme = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
      
      // Если пользователь не выбрал тему вручную, автоматически переключаемся на системную
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
        applyTheme(e.matches ? 'dark' : 'light');
      }
    };

    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', updateSystemTheme);

    // Проверяем сохраненную тему при загрузке
    const savedTheme = localStorage.getItem('theme') as Theme;
    
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Используем системную тему по умолчанию
      const defaultTheme = mediaQuery.matches ? 'dark' : 'light';
      setTheme(defaultTheme);
      applyTheme(defaultTheme);
    }

    return () => mediaQuery.removeEventListener('change', updateSystemTheme);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    // Применяем тему только через CSS классы - никаких инлайн стилей!
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    
    // Убираем все принудительно установленные стили
    document.body.style.removeProperty('backgroundColor');
    document.body.style.removeProperty('color');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const setThemeExplicitly = (newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const resetToSystemTheme = () => {
    localStorage.removeItem('theme');
    setTheme(systemTheme);
    applyTheme(systemTheme);
  };

  return {
    theme,
    isDark: theme === 'dark',
    systemTheme,
    toggleTheme,
    setTheme: setThemeExplicitly,
    resetToSystemTheme
  };
};
