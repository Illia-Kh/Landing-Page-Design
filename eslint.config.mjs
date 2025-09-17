// eslint.config.mjs
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import nextPlugin from '@next/eslint-plugin-next';
import unusedImports from 'eslint-plugin-unused-imports';

// Import Next.js config
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  // Игнорируем ненужные файлы и папки
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      '*.config.js',
      '*.config.mjs',
      'next-env.d.ts',
      'public/**',
      'coverage/**',
      '*.min.js',
      'sw.js',
      'registerSW.js',
      'workbox-*.js'
    ],
  },

  // Базовые JS-правила
  js.configs.recommended,

  // Next.js config через compat
  ...compat.extends('next/core-web-vitals'),

  // TypeScript рекомендации (parser настраивает typescript-eslint из коробки)
  ...tseslint.configs.recommended,

  // Наши правила и плагины
  {
    name: 'project/custom',
    plugins: { 'unused-imports': unusedImports },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn', // Изменим на предупреждение вместо ошибки
      'unused-imports/no-unused-imports': 'error',
    },
    languageOptions: {
      // Если позже понадобятся правила с типовой инфой — добавь project: './tsconfig.json'
      parserOptions: { 
        project: false,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        // Добавляем глобальные переменные для браузера и Node.js
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
      },
    },
  },

  // Область применения — только TS/TSX файлы в src и app папках
  {
    files: ['app/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}', 'lib/**/*.{ts,tsx}', 'types/**/*.{ts,tsx}'],
  },
];
