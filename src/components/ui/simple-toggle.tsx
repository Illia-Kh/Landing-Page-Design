import React from 'react';

interface SimpleToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export function SimpleToggle({ isDark, onToggle }: SimpleToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`
        relative w-11 h-6 rounded-full transition-all duration-300
        ${isDark ? 'bg-blue-600' : 'bg-gray-300'}
        border-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500
      `}
      style={{ minWidth: '44px', minHeight: '24px' }}
      aria-label={isDark ? 'Toggle to light mode' : 'Toggle to dark mode'}
    >
      <div
        className={`
          absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-lg
          transition-transform duration-300 ease-in-out
          ${isDark ? 'transform translate-x-5' : 'transform translate-x-0'}
        `}
      />
    </button>
  );
}
