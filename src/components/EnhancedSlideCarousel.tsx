import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ChevronLeft, ChevronRight, Play, Pause, Info } from "lucide-react";

interface SlideData {
  id: number;
  image: string;
  alt: string;
  title: {
    ru: string;
    en: string;
    de: string;
    cs: string;
  };
  description: {
    ru: string;
    en: string;
    de: string;
    cs: string;
  };
  overlayElements: {
    type: 'circle' | 'rectangle' | 'triangle';
    className: string;
    animationDelay: number;
    animation: 'float' | 'pulse' | 'rotate' | 'scale';
  }[];
}

const slidesData: SlideData[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1573375405312-013f34bc0b69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRpZ2l0YWwlMjBwYXR0ZXJuJTIwdGVjaG5vbG9neSUyMHZlcnRpY2FsfGVufDF8fHx8MTc1NjU0MDI2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Abstract digital pattern technology vertical",
    title: {
      ru: "Цифровые решения",
      en: "Digital Solutions",
      de: "Digitale Lösungen",
      cs: "Digitální řešení"
    },
    description: {
      ru: "Современные алгоритмы и технологии для вашего бизнеса",
      en: "Modern algorithms and technologies for your business",
      de: "Moderne Algorithmen und Technologien für Ihr Unternehmen",
      cs: "Moderní algoritmy a technologie pro váš byznys"
    },
    overlayElements: [
      { type: 'circle', className: 'absolute top-4 right-4 w-16 h-16 bg-white/20 rounded-full backdrop-blur-md', animationDelay: 0, animation: 'float' },
      { type: 'rectangle', className: 'absolute bottom-8 left-4 w-12 h-12 bg-primary/30 rounded-lg backdrop-blur-md', animationDelay: 1, animation: 'pulse' },
      { type: 'circle', className: 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-accent/40 rounded-full backdrop-blur-md', animationDelay: 2, animation: 'scale' }
    ]
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1641194970289-581735abc760?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW9tZXRyaWMlMjBsaWdodCUyMHRlY2hub2xvZ3klMjBhYnN0cmFjdCUyMHZlcnRpY2FsfGVufDF8fHx8MTc1NjU0MDI3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Geometric light technology abstract vertical",
    title: {
      ru: "Инновационный дизайн",
      en: "Innovative Design",
      de: "Innovatives Design",
      cs: "Inovativní design"
    },
    description: {
      ru: "Геометрическая точность и световые эффекты в каждом проекте",
      en: "Geometric precision and light effects in every project",
      de: "Geometrische Präzision und Lichteffekte in jedem Projekt",
      cs: "Geometrická přesnost a světelné efekty v každém projektu"
    },
    overlayElements: [
      { type: 'rectangle', className: 'absolute top-6 left-6 w-10 h-10 bg-blue-400/30 rounded-md backdrop-blur-md', animationDelay: 0, animation: 'rotate' },
      { type: 'circle', className: 'absolute bottom-12 right-6 w-14 h-14 bg-purple-400/25 rounded-full backdrop-blur-md', animationDelay: 0.5, animation: 'float' },
      { type: 'rectangle', className: 'absolute top-1/3 right-8 w-6 h-16 bg-green-400/35 rounded-full backdrop-blur-md', animationDelay: 1.5, animation: 'pulse' }
    ]
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1627694743581-f31765d5c631?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwdGVjaCUyMGNpcmN1aXQlMjBib2FyZCUyMHBhdHRlcm58ZW58MXx8fHwxNzU2NTQwMjc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Minimal tech circuit board pattern",
    title: {
      ru: "Архитектура систем",
      en: "System Architecture",
      de: "Systemarchitektur",
      cs: "Architektura systémů"
    },
    description: {
      ru: "Минималистичная элегантность сложных технических решений",
      en: "Minimalist elegance of complex technical solutions",
      de: "Minimalistische Eleganz komplexer technischer Lösungen",
      cs: "Minimalistická elegance složitých technických řešení"
    },
    overlayElements: [
      { type: 'circle', className: 'absolute top-8 left-8 w-12 h-12 bg-orange-400/30 rounded-full backdrop-blur-md', animationDelay: 0, animation: 'scale' },
      { type: 'rectangle', className: 'absolute bottom-6 right-4 w-20 h-8 bg-pink-400/25 rounded-xl backdrop-blur-md', animationDelay: 1, animation: 'float' },
      { type: 'circle', className: 'absolute top-2/3 left-1/4 w-6 h-6 bg-yellow-400/40 rounded-full backdrop-blur-md', animationDelay: 2, animation: 'pulse' }
    ]
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1664526937033-fe2c11f1be25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMG5ldHdvcmslMjBjb25uZWN0aW9uJTIwZGF0YSUyMGZsb3d8ZW58MXx8fHwxNzU2NTQwMjc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Abstract network connection data flow",
    title: {
      ru: "Сетевые технологии",
      en: "Network Technologies",
      de: "Netzwerktechnologien",
      cs: "Síťové technologie"
    },
    description: {
      ru: "Абстрактные потоки данных и бесконечные возможности подключений",
      en: "Abstract data flows and endless connection possibilities",
      de: "Abstrakte Datenflüsse und endlose Verbindungsmöglichkeiten",
      cs: "Abstraktní toky dat a nekonečné možnosti připojení"
    },
    overlayElements: [
      { type: 'rectangle', className: 'absolute top-4 right-8 w-8 h-20 bg-cyan-400/30 rounded-lg backdrop-blur-md', animationDelay: 0, animation: 'float' },
      { type: 'circle', className: 'absolute bottom-10 left-6 w-18 h-18 bg-indigo-400/25 rounded-full backdrop-blur-md', animationDelay: 0.8, animation: 'rotate' },
      { type: 'rectangle', className: 'absolute top-1/4 left-1/2 w-12 h-6 bg-teal-400/35 rounded-full backdrop-blur-md', animationDelay: 1.6, animation: 'scale' }
    ]
  }
];

const getAnimationProps = (animation: string) => {
  const animations = {
    float: {
      y: [0, -20, 0],
      opacity: [0.5, 1, 0.5],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    },
    pulse: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.8, 0.3],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    },
    rotate: {
      rotate: [0, 360],
      transition: { duration: 8, repeat: Infinity, ease: "linear" }
    },
    scale: {
      scale: [1, 1.1, 1],
      rotate: [0, 5, 0],
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut" }
    }
  };
  return animations[animation as keyof typeof animations] || animations.float;
};

interface EnhancedSlideCarouselProps {
  autoplay?: boolean;
  interval?: number;
  language: string;
  showInfo?: boolean;
  activeIndex?: number; // controlled index from parent (sync with text rotator)
  onActiveIndexChange?: (index: number) => void; // notify parent on user-driven change
}

export function EnhancedSlideCarousel({ 
  autoplay = true, 
  interval = 6000, 
  language = "ru",
  showInfo = true,
  activeIndex,
  onActiveIndexChange
}: EnhancedSlideCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [direction, setDirection] = useState(1);
  const [showSlideInfo, setShowSlideInfo] = useState(false);
  const isControlled = typeof activeIndex === 'number';

  // Controlled sync: when parent provides activeIndex, mirror it locally without emitting callback
  useEffect(() => {
    if (isControlled) {
      const target = (activeIndex as number) % slidesData.length;
      if (target !== currentSlide) {
        setDirection(target > currentSlide ? 1 : -1);
        setCurrentSlide(target);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  // Uncontrolled autoplay only when not controlled
  useEffect(() => {
    if (isControlled) return; 
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setDirection(1);
      const next = (currentSlide + 1) % slidesData.length;
      setCurrentSlide(next);
      onActiveIndexChange?.(next);
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, interval, isControlled, currentSlide, onActiveIndexChange]);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
    onActiveIndexChange?.(index);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slidesData.length) % slidesData.length);
    const next = (currentSlide - 1 + slidesData.length) % slidesData.length;
    onActiveIndexChange?.(next);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slidesData.length);
    const next = (currentSlide + 1) % slidesData.length;
    onActiveIndexChange?.(next);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleSlideInfo = () => {
    setShowSlideInfo(!showSlideInfo);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: 0,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: 0,
      opacity: 0,
      scale: 0.98
    })
  };

  const currentSlideData = slidesData[currentSlide];
  const currentTitle = currentSlideData.title[language as keyof typeof currentSlideData.title] || currentSlideData.title.ru;
  const currentDescription = currentSlideData.description[language as keyof typeof currentSlideData.description] || currentSlideData.description.ru;

  return (
    <div className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[color-mix(in_oklab,var(--bg),white_4%)] to-[color-mix(in_oklab,var(--bg),white_10%)]">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 0.65, ease: [0.4, 0.0, 0.2, 1] },
            scale: { duration: 0.65, ease: [0.4, 0.0, 0.2, 1] }
          }}
          className="absolute inset-0"
        >
          <ImageWithFallback
            src={currentSlideData.image}
            alt={currentSlideData.alt}
            className="w-full h-full object-cover"
          />
          
          {/* Animated overlay elements */}
          {currentSlideData.overlayElements.map((element, index) => (
            <motion.div
              key={`${currentSlide}-${index}`}
              initial={{ 
                opacity: 0, 
                scale: 0,
                y: element.type === 'circle' ? -20 : 20
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: 0,
                ...getAnimationProps(element.animation)
              }}
              transition={{
                opacity: { duration: 0.6, delay: element.animationDelay },
                scale: { duration: 0.6, delay: element.animationDelay },
                y: { duration: 0.6, delay: element.animationDelay },
              }}
              className={element.className}
            />
          ))}

          {/* Gradient overlay for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--backdrop))]/40 via-transparent to-[hsl(var(--backdrop))]/20" />
        </motion.div>
      </AnimatePresence>

      {/* Slide Information */}
      <AnimatePresence>
        {showInfo && showSlideInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute top-4 left-4 right-16 bg-[hsl(var(--backdrop))]/60 backdrop-blur-md rounded-lg p-4 text-[var(--text)]"
          >
            <h3 className="font-semibold mb-1">{currentTitle}</h3>
            <p className="text-sm text-[color-mix(in_oklab,var(--text),transparent_20%)]">{currentDescription}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        {showInfo && (
          <button
            onClick={toggleSlideInfo}
            className={`p-2 backdrop-blur-md rounded-full transition-colors ${
              showSlideInfo ? 'bg-[var(--card-bg)]/30' : 'bg-[var(--card-bg)]/20 hover:bg-[var(--card-bg)]/30'
            }`}
          >
            <Info className="h-4 w-4 text-[var(--text)]" />
          </button>
        )}

        <button
          onClick={togglePlayPause}
          className="p-2 bg-[var(--card-bg)]/20 backdrop-blur-md rounded-full hover:bg-[var(--card-bg)]/30 transition-colors"
        >
          {isPlaying ? <Pause className="h-4 w-4 text-[var(--text)]" /> : <Play className="h-4 w-4 text-[var(--text)]" />}
        </button>

        <button
          onClick={goToPrevious}
          className="p-2 bg-[var(--card-bg)]/20 backdrop-blur-md rounded-full hover:bg-[var(--card-bg)]/30 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 text-[var(--text)]" />
        </button>

        <button
          onClick={goToNext}
          className="p-2 bg-[var(--card-bg)]/20 backdrop-blur-md rounded-full hover:bg-[var(--card-bg)]/30 transition-colors"
        >
          <ChevronRight className="h-4 w-4 text-[var(--text)]" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-4 flex gap-2">
        {slidesData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-[var(--text)] scale-125' 
                : 'bg-[var(--text)]/50 hover:bg-[var(--text)]/70'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      {isPlaying && (
        <motion.div
          key={currentSlide}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: interval / 1000, ease: "linear" }}
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-primary to-accent origin-left"
        />
      )}

      {/* Slide Counter */}
      <div className="absolute top-4 right-4 bg-[hsl(var(--backdrop))]/40 backdrop-blur-md rounded-full px-3 py-1 text-[var(--text)] text-sm">
        {currentSlide + 1} / {slidesData.length}
      </div>
    </div>
  );
}
