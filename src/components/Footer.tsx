import { motion } from "framer-motion";
import { Separator } from "./ui/separator";
import { X, Facebook, Instagram, Send, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { Page } from "./Router";
import { CodeLogo } from "./CodeLogo";
import { useIsMobile } from "./ui/use-mobile";

interface FooterProps {
  language: string;
  onPageChange: (page: Page) => void;
  currentPage?: Page;
}

const content = {
  ru: {
    company: "Компания",
    description: "Мы создаем инновационные решения для цифрового будущего вашего бизнеса.",
    quickLinks: "Быстрые ссылки",
    contact: "Контакты",
    rights: "Все права защищены.",
    newsletter: "Подпишитесь на наши новости и обновления",
    links: [
      { name: "О нас", page: "about" as Page },
      { name: "Услуги", page: "services" as Page },
      { name: "Галерея", page: "gallery" as const, isGallery: true },
      { name: "Контакты", page: "contact" as Page }
    ]
  },
  en: {
    company: "Company",
    description: "We create innovative solutions for the digital future of your business.",
    quickLinks: "Quick Links",
    contact: "Contact",
    rights: "All rights reserved.",
    newsletter: "Subscribe to our news and updates",
    links: [
      { name: "About", page: "about" as Page },
      { name: "Services", page: "services" as Page },
      { name: "Gallery", page: "gallery" as const, isGallery: true },
      { name: "Contact", page: "contact" as Page }
    ]
  },
  de: {
    company: "Unternehmen",
    description: "Wir schaffen innovative Lösungen für die digitale Zukunft Ihres Unternehmens.",
    quickLinks: "Schnelle Links",
    contact: "Kontakt",
    rights: "Alle Rechte vorbehalten.",
    newsletter: "Abonnieren Sie unsere Nachrichten und Updates",
    links: [
      { name: "Über uns", page: "about" as Page },
      { name: "Dienstleistungen", page: "services" as Page },
      { name: "Galerie", page: "gallery" as const, isGallery: true },
      { name: "Kontakt", page: "contact" as Page }
    ]
  },
  cs: {
    company: "Společnost",
    description: "Vytváříme inovativní řešení pro digitální budoucnost vašeho byznysu.",
    quickLinks: "Rychlé odkazy",
    contact: "Kontakt",
    rights: "Všechna práva vyhrazena.",
    newsletter: "Přihlaste se k odběru našich novinek a aktualizací",
    links: [
      { name: "O nás", page: "about" as Page },
      { name: "Služby", page: "services" as Page },
      { name: "Galerie", page: "gallery" as const, isGallery: true },
      { name: "Kontakt", page: "contact" as Page }
    ]
  }
};

export function Footer({ language, onPageChange, currentPage }: FooterProps) {
  const text = content[language as keyof typeof content] || content.ru;
  const isMobileDevice = useIsMobile();

  const handleLinkClick = (link: { page: Page | "gallery"; isGallery?: boolean }) => {
    if (link.isGallery) {
      // Navigate to home first if not already there
      if (currentPage !== "home") {
        onPageChange("home");
      }
      // Wait a bit for navigation, then scroll to gallery
      setTimeout(() => {
        const galleryElement = document.getElementById("gallery");
        if (galleryElement) {
          galleryElement.scrollIntoView({ 
            behavior: "smooth", 
            block: "start" 
          });
        }
      }, currentPage !== "home" ? 500 : 100);
    } else {
      onPageChange(link.page as Page);
    }
  };

  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {!isMobileDevice && <CodeLogo size="md" animated={false} />}
            <p className="text-muted-foreground">{text.description}</p>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
                title="X (Twitter)"
              >
                <X className="h-5 w-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
                title="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
                title="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
                title="Telegram"
              >
                <Send className="h-5 w-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
                title="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="font-semibold">{text.quickLinks}</h4>
            <ul className="space-y-2">
              {text.links.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleLinkClick(link)}
                    className="text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="font-semibold">{text.contact}</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>hello@company.com</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+420 485 101 234</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Либерец, Чешская Республика</span>
              </div>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="font-semibold">Newsletter</h4>
            <p className="text-muted-foreground text-sm">
              {text.newsletter}
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 px-3 py-2 bg-input-background border border-border rounded-md text-sm"
              />
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm">
                OK
              </button>
            </div>
          </motion.div>
        </div>

        <Separator className="my-8" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground text-sm"
        >
          © 2025 IKH-TechSystems. {text.rights}
        </motion.div>
      </div>
    </footer>
  );
}
