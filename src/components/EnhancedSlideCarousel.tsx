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

// Helper to build slide objects from filenames
const mapFilesToSlides = (files: string[]): SlideData[] => {
  return files.map((file, idx) => ({
    id: idx + 1,
    image: `/media/banner/${file}`,
    alt: `Banner slide ${idx + 1}`,
    title: { ru: "", en: "", de: "", cs: "" },
    description: { ru: "", en: "", de: "", cs: "" },
    overlayElements: []
  }))
}

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
  minimal?: boolean; // render clean banner without UI/effects
  fit?: 'cover' | 'contain'; // object-fit behavior for images (default: cover)
  onSlidesReady?: (count: number) => void; // report total slides for sync when counts differ
}

export function EnhancedSlideCarousel({ 
  autoplay = true, 
  interval = 6000, 
  language = "ru",
  showInfo = true,
  activeIndex,
  onActiveIndexChange,
  minimal = false,
  fit = 'cover',
  onSlidesReady
}: EnhancedSlideCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [direction, setDirection] = useState(1);
  const [showSlideInfo, setShowSlideInfo] = useState(false);
  const [slidesData, setSlidesData] = useState<SlideData[]>([]);
  const isControlled = typeof activeIndex === 'number';

  // Fetch manifest on mount and populate slides from public/media/banner
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch('/media/banner/manifest.json', { cache: 'no-store' });
        if (!res.ok) throw new Error('manifest');
        const data = await res.json();
        const files: string[] = Array.isArray(data.files) ? data.files : [];
        const slides = mapFilesToSlides(files);
        if (!cancelled) {
          setSlidesData(slides);
          onSlidesReady?.(slides.length);
          // Reset index if out of bounds
          setCurrentSlide((idx) => (slides.length > 0 ? idx % slides.length : 0));
        }
      } catch {
        if (!cancelled) {
          setSlidesData([]);
          onSlidesReady?.(0);
          setCurrentSlide(0);
        }
      }
    };
    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Controlled sync: when parent provides activeIndex, mirror it locally without emitting callback
  useEffect(() => {
    if (isControlled) {
      const total = slidesData.length || 1;
      const target = (activeIndex as number) % total;
      if (target !== currentSlide) {
        setDirection(target > currentSlide ? 1 : -1);
        setCurrentSlide(target);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, slidesData.length]);

  // Uncontrolled autoplay only when not controlled
  useEffect(() => {
    if (isControlled) return; 
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setDirection(1);
      const total = slidesData.length || 1;
      const next = (currentSlide + 1) % total;
      setCurrentSlide(next);
      onActiveIndexChange?.(next);
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, interval, isControlled, currentSlide, onActiveIndexChange, slidesData.length]);

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

  const currentSlideData = slidesData.length > 0 ? slidesData[currentSlide] : undefined;
  const lang = (language === 'ru' || language === 'en' || language === 'de' || language === 'cs') ? language : 'ru';
  const currentTitle = currentSlideData?.title ? (currentSlideData.title as any)[lang] || "" : "";
  const currentDescription = currentSlideData?.description ? (currentSlideData.description as any)[lang] || "" : "";
  const objectFitClass = fit === 'contain' ? 'object-contain' : 'object-cover';

  // Inform parent about slide count (for sync when text/card counts differ)
  useEffect(() => {
    onSlidesReady?.(slidesData.length || 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[color-mix(in_oklab,var(--bg),white_4%)] to-[color-mix(in_oklab,var(--bg),white_10%)]">
      {/* Placeholder while slides are loading */}
      {(!currentSlideData) && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}

      <AnimatePresence initial={false} custom={direction}>
        {currentSlideData && (
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
          {/* Images guideline: Prefer WebP 1080x1920 (9:16). Fallback chain WebP → JPEG is handled by server/CDN or ImageWithFallback on error. */}
          {(() => {
            const priority = currentSlide === 0 ? { fetchpriority: 'high' as any } : {};
            return (
              <ImageWithFallback
                src={currentSlideData.image}
                alt={currentSlideData.alt || `Banner slide ${currentSlide + 1}`}
                className={`w-full h-full ${objectFitClass}`}
                width={1080}
                height={1920}
                decoding="async"
                {...priority}
                loading={currentSlide === 0 ? undefined : 'lazy'}
              />
            );
          })()}
          
          {/* Optional overlays and gradient are disabled in minimal mode */}
          {!minimal && currentSlideData.overlayElements.map((element, index) => (
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

          {!minimal && (
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--backdrop))]/40 via-transparent to-[hsl(var(--backdrop))]/20" />
          )}
        </motion.div>
        )}
      </AnimatePresence>

      {/* Slide Information */}
      {!minimal && (
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
      )}

      {/* Navigation Controls */}
      {!minimal && (
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
      )}

      {/* Slide Indicators */}
      {!minimal && (
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
      )}

      {/* Progress Bar */}
      {!minimal && isPlaying && (
        <motion.div
          key={currentSlide}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: interval / 1000, ease: "linear" }}
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-primary to-accent origin-left"
        />
      )}

      {/* Slide Counter */}
      {(!minimal) && (
        <div className="absolute top-4 right-4 bg-[hsl(var(--backdrop))]/40 backdrop-blur-md rounded-full px-3 py-1 text-[var(--text)] text-sm">
          {currentSlide + 1} / {slidesData.length}
        </div>
      )}
    </div>
  );
}
