import React from 'react';

interface ToggleThemeProps {
  isDark: boolean;
  onToggle: () => void;
}

export function ToggleTheme({ isDark, onToggle }: ToggleThemeProps) {
  return (
    <button
      onClick={onToggle}
      className={`
        relative w-11 h-6 rounded-full transition-all duration-300 ease-in-out
        ${isDark ? 'bg-blue-600' : 'bg-gray-300'}
        border-2 border-gray-400
      `}
      style={{ minWidth: '44px', minHeight: '24px' }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div
        className={`
          absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md
          transition-transform duration-300 ease-in-out
          ${isDark ? 'translate-x-5' : 'translate-x-0'}
        `}
      />
    </button>
  );
}
