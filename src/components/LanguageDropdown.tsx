import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LanguageDropdownProps {
  language: string;
  onLanguageChange: (language: string) => void;
  className?: string;
}

const languages = [
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "cs", name: "Čeština", flag: "🇨🇿" }
];

export const LanguageDropdown: React.FC<LanguageDropdownProps> = ({ 
  language, 
  onLanguageChange,
  className = "" 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  const handleLanguageSelect = (langCode: string) => {
    onLanguageChange(langCode);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Кнопка для открытия выпадающего меню */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative cursor-pointer focus:outline-none overflow-hidden rounded-full bg-background border border-border hover:bg-accent/50 hover:border-primary/50 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Current language: ${currentLanguage.name}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {/* Уменьшаем размер кнопки */}
        <div className="w-10 h-10 flex items-center justify-center relative">
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-sm font-medium text-foreground leading-none">{currentLanguage.code.toUpperCase()}</span>
          </div>
        </div>
      </motion.button>

      {/* Выпадающее меню */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop для закрытия при клике вне */}
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Выпадающее меню */}
            <motion.div
              className="z-50 min-w-[180px] bg-popover border border-border rounded-lg shadow-lg overflow-hidden fixed right-0 top-16 md:absolute md:top-full md:left-auto md:right-0 md:translate-x-0 md:translate-y-0 md:mt-2"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="py-2">
                {languages.map((lang, index) => (
                  <React.Fragment key={lang.code}>
                    <motion.button
                      onClick={() => handleLanguageSelect(lang.code)}
                      className={`w-full px-4 py-2.5 text-center hover:bg-accent focus:bg-accent focus:outline-none transition-all duration-200 ${
                        language === lang.code 
                          ? 'bg-primary/10 text-primary border-r-2 border-r-primary' 
                          : 'text-popover-foreground hover:text-foreground'
                      }`}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.1 }}
                    >
                      <div className="flex items-center justify-center gap-3">
                        <span className={`text-sm font-semibold ${language === lang.code ? 'text-primary' : ''}`}>
                          {lang.code.toUpperCase()}
                        </span>
                        <span className="text-sm text-muted-foreground">{lang.name}</span>
                      </div>
                    </motion.button>
                    {index < languages.length - 1 && (
                      <div className="h-px bg-border mx-2" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
