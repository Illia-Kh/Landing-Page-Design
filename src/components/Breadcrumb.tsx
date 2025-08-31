import { motion } from "motion/react";
import { ChevronRight, Home } from "lucide-react";
import { Page } from "./Router";

interface BreadcrumbProps {
  currentPage: Page;
  language: string;
  onPageChange: (page: Page) => void;
}

const content = {
  ru: {
    home: "Главная",
    about: "О нас",
    services: "Услуги",
    contact: "Контакты"
  },
  en: {
    home: "Home",
    about: "About",
    services: "Services",
    contact: "Contact"
  },
  de: {
    home: "Startseite",
    about: "Über uns",
    services: "Dienstleistungen",
    contact: "Kontakt"
  },
  cs: {
    home: "Domů",
    about: "O nás",
    services: "Služby",
    contact: "Kontakt"
  }
};

export function Breadcrumb({ currentPage, language, onPageChange }: BreadcrumbProps) {
  const text = content[language as keyof typeof content] || content.ru;
  
  if (currentPage === "home") return null;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto px-4 py-4"
    >
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <button
          onClick={() => onPageChange("home")}
          className="flex items-center hover:text-foreground transition-colors"
        >
          <Home className="h-4 w-4 mr-1" />
          {text.home}
        </button>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium">
          {text[currentPage]}
        </span>
      </div>
    </motion.nav>
  );
}