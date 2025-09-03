import { motion, AnimatePresence } from "framer-motion";
import { EnhancedSlideCarousel } from "./EnhancedSlideCarousel";
import { CodeLogo } from "./CodeLogo";
import { Page } from "./Router";
import { useMobileDevice } from "./ui/use-mobile-device";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

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
  
  // Rotating benefit phrases (RU) — exact copy per requirements
  const benefits = [
    "Автоматизация процессов —  Существенное сокращение издержек",
    "Маркетинг и аналитика — Эффективное привлечение клиентов",
    "Разработка ПО — запуск продукта в кратчайшие сроки"
  ];
  const [benefitIndex, setBenefitIndex] = useState(0);
  const syncingRef = useRef(false);

  // Rotation timer (setTimeout chain to avoid interval drift)
  const rotationTimeoutRef = useRef<number | null>(null);
  const ROTATION_MS = 5800; // ~5.8s visible time per phrase

  const scheduleNextRotation = () => {
    if (rotationTimeoutRef.current) {
      clearTimeout(rotationTimeoutRef.current);
    }
    rotationTimeoutRef.current = window.setTimeout(() => {
      syncingRef.current = true;
      setBenefitIndex((prev) => (prev + 1) % benefits.length);
    }, ROTATION_MS);
  };

  useEffect(() => {
    scheduleNextRotation();
    return () => {
      if (rotationTimeoutRef.current) {
        clearTimeout(rotationTimeoutRef.current);
      }
    };
  }, [benefitIndex]);

  // Stable height measurement to avoid layout shift (CLS≈0)
  const phraseContainerRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const [minHeightPx, setMinHeightPx] = useState<number>(0);

  const measureHeights = () => {
    if (!measureRef.current) return;
    const children = Array.from(measureRef.current.children) as HTMLElement[];
    let maxH = 0;
    children.forEach((el) => {
      const rect = el.getBoundingClientRect();
      maxH = Math.max(maxH, rect.height);
    });
    setMinHeightPx(Math.ceil(maxH));
  };

  // Measure on mount and on resize
  useLayoutEffect(() => {
    measureHeights();
  }, []);

  useEffect(() => {
    const ro = new ResizeObserver(() => {
      measureHeights();
    });
    if (phraseContainerRef.current) {
      ro.observe(phraseContainerRef.current);
    }
    return () => ro.disconnect();
  }, []);

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
                {"Технологии, которые работают на результат"}
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
                className="text-xl lg:text-3xl text-muted-foreground hero-rotating-subheadline"
              >
                {/* Fixed-height crossfade container */}
                <div
                  ref={phraseContainerRef}
                  className="relative"
                  style={{ minHeight: minHeightPx ? `${minHeightPx}px` : undefined }}
                  aria-live="polite"
                  aria-atomic="true"
                  role="status"
                >
                  <AnimatePresence initial={false} mode="wait">
                    {benefits.map((phrase, idx) => (
                      idx === benefitIndex ? (
                        <motion.span
                          key={phrase}
                          className="absolute inset-0"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.65, ease: [0.4, 0.0, 0.2, 1] }}
                          style={{ pointerEvents: "none" }}
                        >
                          {phrase}
                        </motion.span>
                      ) : null
                    ))}
                  </AnimatePresence>

                  {/* Offscreen measurer to compute max height without affecting layout */}
                  <div
                    ref={measureRef}
                    className="absolute left-0 right-0"
                    style={{
                      visibility: "hidden",
                      pointerEvents: "none",
                      top: 0,
                    }}
                  >
                    {benefits.map((phrase) => (
                      <div key={`measure-${phrase}`} className="whitespace-normal">
                        {phrase}
                      </div>
                    ))}
                  </div>
                </div>
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
                autoplay={false}
                interval={3500}
                language={language}
                showInfo={true}
                activeIndex={benefitIndex % 4}
                onActiveIndexChange={(idx) => {
                  // Map slides to phrases by modulo if counts differ
                  const mapped = idx % benefits.length;
                  if (syncingRef.current) {
                    // Ignore immediate feedback from our own programmatic change
                    syncingRef.current = false;
                    return;
                  }
                  setBenefitIndex(mapped);
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
