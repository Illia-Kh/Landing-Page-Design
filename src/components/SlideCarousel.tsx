import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

interface Slide {
  id: number;
  image: string;
  alt: string;
  overlayElements: {
    type: 'circle' | 'rectangle' | 'triangle';
    className: string;
    animationDelay: number;
  }[];
}

const slides: Slide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1742942965475-25d3b7bf2bfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMHBhdHRlcm58ZW58MXx8fHwxNzU2NDkzMTExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Abstract geometric pattern",
    overlayElements: [
      { type: 'circle', className: 'absolute top-4 right-4 w-16 h-16 bg-white/20 rounded-full backdrop-blur-md', animationDelay: 0 },
      { type: 'rectangle', className: 'absolute bottom-8 left-4 w-12 h-12 bg-primary/30 rounded-lg backdrop-blur-md', animationDelay: 1 },
      { type: 'circle', className: 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-accent/40 rounded-full backdrop-blur-md', animationDelay: 2 }
    ]
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1672581437674-3186b17b405a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTY0NjIzMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Futuristic technology",
    overlayElements: [
      { type: 'rectangle', className: 'absolute top-6 left-6 w-10 h-10 bg-blue-400/30 rounded-md backdrop-blur-md', animationDelay: 0 },
      { type: 'circle', className: 'absolute bottom-12 right-6 w-14 h-14 bg-purple-400/25 rounded-full backdrop-blur-md', animationDelay: 0.5 },
      { type: 'rectangle', className: 'absolute top-1/3 right-8 w-6 h-16 bg-green-400/35 rounded-full backdrop-blur-md', animationDelay: 1.5 }
    ]
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1742440711276-679934f5b988?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdvcmtzcGFjZSUyMGRlc2lnbnxlbnwxfHx8fDE3NTY0MTMyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Creative workspace design",
    overlayElements: [
      { type: 'circle', className: 'absolute top-8 left-8 w-12 h-12 bg-orange-400/30 rounded-full backdrop-blur-md', animationDelay: 0 },
      { type: 'rectangle', className: 'absolute bottom-6 right-4 w-20 h-8 bg-pink-400/25 rounded-xl backdrop-blur-md', animationDelay: 1 },
      { type: 'circle', className: 'absolute top-2/3 left-1/4 w-6 h-6 bg-yellow-400/40 rounded-full backdrop-blur-md', animationDelay: 2 }
    ]
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1647082550285-119acfd169f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkYXRhJTIwdmlzdWFsaXphdGlvbnxlbnwxfHx8fDE3NTY0OTM3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Modern data visualization",
    overlayElements: [
      { type: 'rectangle', className: 'absolute top-4 right-8 w-8 h-20 bg-cyan-400/30 rounded-lg backdrop-blur-md', animationDelay: 0 },
      { type: 'circle', className: 'absolute bottom-10 left-6 w-18 h-18 bg-indigo-400/25 rounded-full backdrop-blur-md', animationDelay: 0.8 },
      { type: 'rectangle', className: 'absolute top-1/4 left-1/2 w-12 h-6 bg-teal-400/35 rounded-full backdrop-blur-md', animationDelay: 1.6 }
    ]
  }
];

interface SlideCarouselProps {
  autoplay?: boolean;
  interval?: number;
}

export function SlideCarousel({ autoplay = true, interval = 4000 }: SlideCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, interval]);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9
    })
  };

  return (
    <div className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-muted/20 to-accent/20">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 },
            scale: { duration: 0.4 }
          }}
          className="absolute inset-0"
        >
          <ImageWithFallback
            src={slides[currentSlide].image}
            alt={slides[currentSlide].alt}
            className="w-full h-full object-cover"
          />
          
          {/* Animated overlay elements */}
          {slides[currentSlide].overlayElements.map((element, index) => (
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
                y: 0
              }}
              transition={{
                duration: 0.6,
                delay: element.animationDelay,
                type: "spring",
                stiffness: 200
              }}
              className={element.className}
            />
          ))}

          {/* Gradient overlay for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        <button
          onClick={togglePlayPause}
          className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors"
        >
          {isPlaying ? <Pause className="h-4 w-4 text-white" /> : <Play className="h-4 w-4 text-white" />}
        </button>

        <button
          onClick={goToPrevious}
          className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 text-white" />
        </button>

        <button
          onClick={goToNext}
          className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors"
        >
          <ChevronRight className="h-4 w-4 text-white" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-4 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/70'
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
    </div>
  );
}
