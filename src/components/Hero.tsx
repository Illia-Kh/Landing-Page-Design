import { motion } from "framer-motion";
import { EnhancedSlideCarousel } from "./EnhancedSlideCarousel";
import { CodeLogo } from "./CodeLogo";
import { Page } from "./Router";
import { useMobileDevice } from "./ui/use-mobile-device";

interface HeroProps {
  language: string;
  onPageChange: (page: Page) => void;
}

const content = {
  ru: {
    title: "Инновационные решения",
    subtitle: "для вашего бизнеса",
    description: "Мы создаем современные технологические решения, которые помогают компаниям достигать новых высот в цифровой эпохе.",
    cta: "Связаться с нами"
  },
  en: {
    title: "Innovative solutions",
    subtitle: "for your business",
    description: "We create modern technological solutions that help companies reach new heights in the digital age.",
    cta: "Contact us"
  },
  de: {
    title: "Innovative Lösungen",
    subtitle: "für Ihr Unternehmen",
    description: "Wir schaffen moderne technologische Lösungen, die Unternehmen dabei helfen, im digitalen Zeitalter neue Höhen zu erreichen.",
    cta: "Kontaktieren Sie uns"
  },
  cs: {
    title: "Inovativní řešení",
    subtitle: "pro váš byznys",
    description: "Vytváříme moderní technologická řešení, která pomáhají společnostem dosáhnout nových výšin v digitální éře.",
    cta: "Kontaktujte nás"
  }
};

export function Hero({ language, onPageChange }: HeroProps) {
  const text = content[language as keyof typeof content] || content.ru;
  const isMobileDevice = useMobileDevice();

  return (
    <section className="min-h-[60vh] pt-8 pb-12 flex items-center bg-gradient-to-br from-background to-accent/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Text content - 60% width on desktop */}
          <div className="lg:col-span-7 space-y-6">
            {/* Animated Logo - скрываем на мобильных устройствах и при ширине экрана < 768px */}
            {!isMobileDevice && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-6"
              >
                <CodeLogo size="lg" animated={true} />
              </motion.div>
            )}
            
            <div className="space-y-3">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-3xl lg:text-5xl font-bold"
              >
                {text.title}
              </motion.h1>
              
              {/* Animated divider block */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.8 }}
                className="h-1 bg-gradient-to-r from-primary to-accent rounded-full"
              />
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl lg:text-3xl text-muted-foreground"
              >
                {text.subtitle}
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-base text-muted-foreground max-w-2xl"
            >
              {text.description}
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPageChange("contact")}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg text-base font-semibold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
            >
              {text.cta}
            </motion.button>
          </div>

          {/* Animated multi-slide banner - 9:16 aspect ratio */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <EnhancedSlideCarousel 
                autoplay={true} 
                interval={6000}
                language={language}
                showInfo={true}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
