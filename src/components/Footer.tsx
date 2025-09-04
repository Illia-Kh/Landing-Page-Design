import { motion } from "framer-motion";
import { Separator } from "./ui/separator";
import { X, Facebook, Instagram, Send, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { Page } from "./Router";
import { CodeLogo } from "./CodeLogo";
import { useMobileDevice } from "./ui/use-mobile-device";

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
      { name: "Kontakt", page: "contact" as Page }
    ]
  }
};

export function Footer({ language, onPageChange, currentPage }: FooterProps) {
  const text = content[language as keyof typeof content] || content.ru;
  const isMobileDevice = useMobileDevice();

  const handleLinkClick = (link: { page: Page }) => {
    onPageChange(link.page as Page);
  };

  return (
    <footer className="bg-secondary/30">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {!isMobileDevice && <CodeLogo size="md" animated={false} />}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
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

          {/* Social links moved here */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex items-center justify-center md:justify-end gap-3"
          >
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              aria-label="X (Twitter)"
              className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
              title="X (Twitter)"
            >
              <X className="h-5 w-5" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              aria-label="Facebook"
              className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
              title="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              aria-label="Instagram"
              className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
              title="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              aria-label="Telegram"
              className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
              title="Telegram"
            >
              <Send className="h-5 w-5" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              aria-label="WhatsApp"
              className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
              title="WhatsApp"
            >
              <MessageCircle className="h-5 w-5" />
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-8 text-center text-muted-foreground text-sm"
        >
          © 2025 IKH-TechSystems. {text.rights}
        </motion.div>
      </div>
    </footer>
  );
}
