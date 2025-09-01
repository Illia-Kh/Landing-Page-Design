import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Menu, Sun, Moon, Globe, X } from "lucide-react";
import { Page } from "./Router";
import { CodeLogoCompact } from "./CodeLogo";
import { useMobileDevice } from "./ui/use-mobile-device";
import { ThemeSwitch } from "./ui/theme-switch";

interface HeaderProps {
  isDark: boolean;
  onThemeToggle: () => void;
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
    language: "Язык",
    theme: "Тема",
    light: "Светлая",
    dark: "Тёмная"
  },
  en: {
    menu: "Menu",
    home: "Home",
    about: "About",
    services: "Services",
    contact: "Contact",
    language: "Language",
    theme: "Theme",
    light: "Light",
    dark: "Dark"
  },
  de: {
    menu: "Menü",
    home: "Startseite",
    about: "Über uns",
    services: "Dienstleistungen",
    contact: "Kontakt",
    language: "Sprache",
    theme: "Thema",
    light: "Hell",
    dark: "Dunkel"
  },
  cs: {
    menu: "Nabídka",
    home: "Domů",
    about: "O nás",
    services: "Služby",
    contact: "Kontakt",
    language: "Jazyk",
    theme: "Motiv",
    light: "Světlý",
    dark: "Tmavý"
  }
};

export function Header({ isDark, onThemeToggle, language, onLanguageChange, currentPage, onPageChange }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoMenuOpen, setIsLogoMenuOpen] = useState(false);
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
    setIsLogoMenuOpen(false);
  };
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        {isMobileDevice ? (
          /* На мобильных устройствах - logo с выпадающим меню */
          <DropdownMenu open={isLogoMenuOpen} onOpenChange={setIsLogoMenuOpen}>
            <DropdownMenuTrigger asChild>
              <motion.button 
                className="hover:opacity-80 transition-opacity cursor-pointer z-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CodeLogoCompact animated={false} />
              </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {/* Навигация домой при нажатии на логотип */}
              <DropdownMenuItem
                onClick={() => {
                  handleNavClick({ page: "home" });
                  setTimeout(() => {
                    window.scrollTo({ 
                      top: 0, 
                      behavior: "smooth" 
                    });
                  }, 100);
                  setIsLogoMenuOpen(false);
                }}
                className="cursor-pointer"
              >
                🏠 {text.home}
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              {/* Выбор языка */}
              <div className="px-2 py-1.5">
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4" />
                  <span>{text.language}:</span>
                  <Select value={language} onValueChange={onLanguageChange}>
                    <SelectTrigger className="w-16 h-6 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ru">RU</SelectItem>
                      <SelectItem value="en">EN</SelectItem>
                      <SelectItem value="de">DE</SelectItem>
                      <SelectItem value="cs">CS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Переключатель темы */}
              <DropdownMenuItem 
                className="flex items-center justify-between cursor-pointer" 
                onClick={(e) => {
                  e.preventDefault();
                  onThemeToggle();
                }}
              >
                <div className="flex items-center gap-2">
                  {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  <span className="text-sm">{text.theme}: {isDark ? text.dark : text.light}</span>
                </div>
                <Switch
                  checked={isDark}
                  onCheckedChange={onThemeToggle}
                  className="ml-auto"
                  onClick={(e) => e.stopPropagation()}
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          /* На десктопе - обычная кнопка логотипа */
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
        )}

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navigationItems.map((item) => (
            <motion.button
              key={item.page}
              onClick={() => handleNavClick(item)}
              className={`relative px-3 py-2 rounded-lg transition-colors ${
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
          {/* Language selector - показываем всегда на десктопе */}
          <div className="hidden md:flex items-center gap-2">
            <Globe className={`h-4 w-4 ${isDark ? 'text-blue-400' : 'text-gray-600'}`} />
            <Select value={language} onValueChange={onLanguageChange}>
              <SelectTrigger className="w-20 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ru">RU</SelectItem>
                <SelectItem value="en">EN</SelectItem>
                <SelectItem value="de">DE</SelectItem>
                <SelectItem value="cs">CS</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Theme toggle - показываем всегда на десктопе */}
          <div className="hidden md:flex items-center gap-2">
            <Sun className={`h-4 w-4 ${!isDark ? 'text-yellow-500' : 'text-gray-400'}`} />
            <ThemeSwitch
              isDark={isDark}
              onToggle={onThemeToggle}
            />
            <Moon className={`h-4 w-4 ${isDark ? 'text-blue-400' : 'text-gray-400'}`} />
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isMobileMenuOpen ? 'close' : 'menu'}
                initial={{ rotate: 0 }}
                animate={{ rotate: 0 }}
                exit={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </motion.div>
            </AnimatePresence>
          </Button>
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
            <nav className="container mx-auto px-4 py-4 space-y-2">
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
