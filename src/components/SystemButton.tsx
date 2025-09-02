import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";

interface SystemButtonProps {
  type: "theme" | "language";
  language?: string;
  onLanguageChange?: (language: string) => void;
  className?: string;
}

export const SystemButton: React.FC<SystemButtonProps> = ({ 
  type, 
  language = "ru", 
  onLanguageChange,
  className = "" 
}) => {
  const { isDark, toggleTheme } = useTheme();

  const handleClick = () => {
    if (type === "theme") {
      toggleTheme();
    }
    // Для языка логика будет в родительском компоненте
  };

  const getLanguageText = (lang: string) => {
    const languageMap = {
      ru: "RU",
      en: "EN", 
      de: "DE",
      cs: "CS"
    };
    return languageMap[lang as keyof typeof languageMap] || "RU";
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`relative cursor-pointer focus:outline-none overflow-hidden rounded-full bg-background border border-border hover:bg-accent/50 hover:border-primary/50 transition-all duration-300 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      role={type === "theme" ? "switch" : "button"}
      aria-label={type === "theme" ? `Switch to ${isDark ? "light" : "dark"} theme` : `Current language: ${getLanguageText(language)}`}
      aria-checked={type === "theme" ? isDark : undefined}
    >
      {/* Уменьшаем размер кнопки */}
      <div className="w-10 h-10 flex items-center justify-center relative">
        {type === "theme" ? (
          /* Для темы - показываем солнце/луну */
          <>
            {/* Солнце (светлая тема) */}
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 m-auto flex items-center justify-center"
              style={{
                opacity: !isDark ? 1 : 0,
                scale: !isDark ? 1 : 0.8,
                color: "#F39C12"
              }}
              animate={{
                opacity: !isDark ? 1 : 0,
                scale: !isDark ? 1 : 0.8,
                rotate: !isDark ? 0 : 180
              }}
              transition={{ duration: 0.3 }}
            >
              <path
                d="M12 2V4M12 20V22M4 12H2M6.31412 6.31412L4.8999 4.8999M19.1001 4.8999L17.6859 6.31412M6.31412 17.6859L4.8999 19.1001M19.1001 19.1001L17.6859 17.6859M22 12H20M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>

            {/* Луна (темная тема) */}
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 m-auto flex items-center justify-center"
              style={{
                opacity: isDark ? 1 : 0,
                scale: isDark ? 1 : 0.8,
                color: "#3B82F6"
              }}
              animate={{
                opacity: isDark ? 1 : 0,
                scale: isDark ? 1 : 0.8,
                rotate: isDark ? 0 : -180
              }}
              transition={{ duration: 0.3 }}
            >
              <path
                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </>
        ) : (
          /* Для языка - показываем только аббревиатуру */
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-sm font-medium text-foreground leading-none">{getLanguageText(language)}</span>
          </div>
        )}
      </div>


    </motion.button>
  );
};
