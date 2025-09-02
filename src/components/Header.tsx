import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { CodeLogoCompact } from "./CodeLogo";
import { useMobileDevice } from "./ui/use-mobile-device";
import { SystemButton } from "./SystemButton";
import { LanguageDropdown } from "./LanguageDropdown";
import { Page } from "../types";

interface HeaderProps {
  language: string;
  onLanguageChange: (language: string) => void;
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

const content = {
  ru: {
    menu: "Меню",
    home: "Главная",
    about: "О нас",
    services: "Услуги",
    contact: "Контакты",
    language: "Язык"
  },
  en: {
    menu: "Menu",
    home: "Home",
    about: "About",
    services: "Services",
    contact: "Contact",
    language: "Language"
  },
  de: {
    menu: "Menü",
    home: "Startseite",
    about: "Über uns",
    services: "Dienstleistungen",
    contact: "Kontakt",
    language: "Sprache"
  },
  cs: {
    menu: "Nabídka",
    home: "Domů",
    about: "O nás",
    services: "Služby",
    contact: "Kontakt",
    language: "Jazyk"
  }
};

export function Header({ language, onLanguageChange, currentPage, onPageChange }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobileDevice = useMobileDevice();
  const text = content[language as keyof typeof content] || content.ru;

  const navigationItems = [
    { page: "home" as Page, label: text.home },
    { page: "about" as Page, label: text.about },
    { page: "services" as Page, label: text.services },
    { page: "contact" as Page, label: text.contact }
  ];

  const handleNavClick = (item: { page: Page }) => {
    onPageChange(item.page);
    
    // Scroll to top when navigating to home page
    if (item.page === "home") {
      setTimeout(() => {
        window.scrollTo({ 
          top: 0, 
          behavior: "smooth" 
        });
      }, 100);
    }
    
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo - всегда обычная кнопка */}
        <motion.button 
          onClick={() => {
            handleNavClick({ page: "home" });
            // Always scroll to top when clicking logo
            setTimeout(() => {
              window.scrollTo({ 
                top: 0, 
                behavior: "smooth" 
              });
            }, 100);
          }}
          className="hover:opacity-80 transition-opacity cursor-pointer z-10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <CodeLogoCompact animated={false} />
        </motion.button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navigationItems.map((item) => (
            <motion.button
              key={item.page}
              onClick={() => handleNavClick(item)}
              className={`relative px-4 py-2 rounded-lg transition-colors ${
                currentPage === item.page
                  ? 'text-primary bg-accent' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
              {currentPage === item.page && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                  layoutId="activeTab"
                  initial={false}
                />
              )}
            </motion.button>
          ))}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-4">
          {/* Desktop: System buttons */}
          <div className="hidden md:flex items-center gap-4">
            <SystemButton type="theme" />
            <LanguageDropdown 
              language={language} 
              onLanguageChange={onLanguageChange} 
            />
          </div>

          {/* Mobile: System buttons + кнопка меню */}
          <div className="md:hidden flex items-center justify-end flex-1">
            {/* Системные кнопки - появляются при открытом меню */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <div className="flex items-center gap-3 mr-3">
                  <SystemButton type="theme" />
                  <LanguageDropdown 
                    language={language} 
                    onLanguageChange={onLanguageChange} 
                  />
                </div>
              )}
            </AnimatePresence>
            
            {/* Кнопка меню */}
            <Button
              variant="ghost"
              size="sm"
              className="w-10 h-10 p-0 rounded-full border border-border bg-background hover:bg-accent/50 flex-shrink-0"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="w-full h-full flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isMobileMenuOpen ? 'close' : 'menu'}
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                    className="w-5 h-5 flex items-center justify-center"
                  >
                    {isMobileMenuOpen ? (
                      <X className="w-5 h-5" />
                    ) : (
                      <Menu className="w-5 h-5" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-background/95 backdrop-blur-md border-b border-border"
          >
            <div className="container mx-auto px-4 py-4">
              {/* Только навигация */}
              <nav className="space-y-2">
                {navigationItems.map((item, index) => (
                  <motion.button
                    key={item.page}
                    onClick={() => handleNavClick(item)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      currentPage === item.page
                        ? 'text-primary bg-accent font-medium' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
