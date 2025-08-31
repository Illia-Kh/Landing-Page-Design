import { useState, useEffect } from 'react';

export function useMobileDevice() {
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const checkMobileDevice = () => {
      // Очищаем предыдущий таймаут для дебаунса
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        const userAgent = navigator.userAgent.toLowerCase();
        
        // Проверяем на Android устройства
        const isAndroid = /android/.test(userAgent);
        
        // Проверяем на iOS устройства (iPhone, iPad, iPod)
        const isIOS = /iphone|ipad|ipod/.test(userAgent);
        
        // Дополнительная проверка на touch устройства
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        // Проверяем размер экрана - основное условие для скрытия CodeLogo
        const isSmallScreen = window.innerWidth < 768; // md breakpoint в Tailwind
        
        // Устройство считается мобильным если:
        // 1. Ширина экрана меньше 768px (принудительно, независимо от устройства)
        // 2. ИЛИ это Android/iOS устройство (даже на широких экранах)
        // 3. ИЛИ это touch устройство с маленьким экраном
        const isMobile = isSmallScreen || isAndroid || isIOS;
        
        setIsMobileDevice(isMobile);
      }, 100); // Дебаунс 100мс для производительности
    };

    // Проверяем при загрузке
    checkMobileDevice();

    // Слушаем изменения размера окна для реактивного поведения
    window.addEventListener('resize', checkMobileDevice);

    return () => {
      window.removeEventListener('resize', checkMobileDevice);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return isMobileDevice;
}