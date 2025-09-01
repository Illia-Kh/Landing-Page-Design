import React from 'react';
import { motion } from 'framer-motion';

interface ThemeSwitchProps {
  isDark: boolean;
  onToggle: () => void;
}

export function ThemeSwitch({ isDark, onToggle }: ThemeSwitchProps) {
  return (
    <button
      onClick={onToggle}
      className={`
        relative w-11 h-6 rounded-full
        ${isDark ? 'bg-blue-600' : 'bg-gray-300'}
        border-2 border-gray-400
      `}
      style={{ minWidth: '44px', minHeight: '24px' }}
    >
      <motion.div
        className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md"
        animate={{
          x: isDark ? 20 : 0,
        }}
        transition={{
          duration: 0.8,
          ease: [0.4, 0, 0.2, 1]
        }}
      />
    </button>
  );
}
