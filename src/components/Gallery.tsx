import { useState } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { X } from "lucide-react";

interface GalleryProps {
  language: string;
  onPageChange?: (page: "services") => void;
}

const content = {
  ru: {
    title: "Галерея",
    subtitle: "Наши проекты и достижения",
    closeButton: "Закрыть"
  },
  en: {
    title: "Gallery",
    subtitle: "Our projects and achievements",
    closeButton: "Close"
  },
  de: {
    title: "Galerie",
    subtitle: "Unsere Projekte und Erfolge",
    closeButton: "Schließen"
  },
  cs: {
    title: "Galerie",
    subtitle: "Naše projekty a úspěchy",
    closeButton: "Zavřít"
  }
};

const galleryImages = [
  {
    id: 0,
    src: "https://images.unsplash.com/photo-1695067440629-b5e513976100?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTY0NTkzMzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Modern architecture building",
    gridClass: "md:col-span-2 md:row-span-2",
    title: {
      ru: "Веб-разработка",
      en: "Web Development",
      de: "Web-Entwicklung",
      cs: "Vývoj webu"
    },
    serviceIndex: 0
  },
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1709715357520-5e1047a2b691?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlYW0lMjBtZWV0aW5nfGVufDF8fHx8MTc1NjQ0NjkzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Business team meeting",
    gridClass: "",
    title: {
      ru: "Мобильные приложения",
      en: "Mobile Applications",
      de: "Mobile Anwendungen",
      cs: "Mobilní aplikace"
    },
    serviceIndex: 1
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB3b3Jrc3BhY2UlMjBtb2Rlcm58ZW58MXx8fHwxNzU2NDkzMTEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Office workspace modern",
    gridClass: "",
    title: {
      ru: "Облачные решения",
      en: "Cloud Solutions",
      de: "Cloud-Lösungen",
      cs: "Cloudová řešení"
    },
    serviceIndex: 2
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1568952433726-3896e3881c65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbnxlbnwxfHx8fDE3NTY0NzM4Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Technology innovation",
    gridClass: "md:col-span-2",
    title: {
      ru: "Аналитика данных",
      en: "Data Analytics",
      de: "Datenanalyse",
      cs: "Analytika dat"
    },
    serviceIndex: 3
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1644325349124-d1756b79dd42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwdHJhbnNmb3JtYXRpb258ZW58MXx8fHwxNzU2NDA5OTUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Digital transformation",
    gridClass: "",
    title: {
      ru: "Автоматизация процессов",
      en: "Process Automation",
      de: "Prozessautomatisierung",
      cs: "Automatizace procesů"
    },
    serviceIndex: 5
  }
];

export function Gallery({ language, onPageChange }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const text = content[language as keyof typeof content] || content.ru;

  const handleImageClick = (index: number) => {
    setSelectedImage(selectedImage === index ? null : index);
  };

  const handleTitleClick = (index: number) => {
    if (onPageChange) {
      const image = galleryImages[index];
      onPageChange("services");
      // Ждем навигации, затем прокручиваем к соответствующему разделу услуги
      setTimeout(() => {
        const serviceId = `service-${image.serviceIndex}`;
        const targetSection = document.getElementById(serviceId);
        if (targetSection) {
          targetSection.scrollIntoView({ 
            behavior: "smooth", 
            block: "start" 
          });
        }
      }, 500);
    }
  };

  const closeSelection = () => {
    setSelectedImage(null);
  };

  // Calculate dynamic styles for each image based on selection
  const getImageStyles = (index: number) => {
    if (selectedImage === null) {
      return {
        scale: 1,
        opacity: 1,
        zIndex: 1,
        filter: "brightness(1) blur(0px)"
      };
    }

    if (selectedImage === index) {
      return {
        scale: 1.15,
        opacity: 1,
        zIndex: 10,
        filter: "brightness(1.1) blur(0px)"
      };
    }

    return {
      scale: 0.85,
      opacity: 0.6,
      zIndex: 1,
      filter: "brightness(0.7) blur(1px)"
    };
  };

  return (
    <section id="gallery" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">{text.title}</h2>
          <p className="text-lg text-muted-foreground">
            {text.subtitle}
          </p>
        </motion.div>

        {/* Gallery Grid Container - Fixed size */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
            {galleryImages.map((image, index) => {
              const styles = getImageStyles(index);
              const isSelected = selectedImage === index;
              const imageTitle = image.title[language as keyof typeof image.title] || image.title.ru;

              return (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  animate={{
                    scale: styles.scale,
                    opacity: styles.opacity,
                    filter: styles.filter
                  }}
                  whileHover={selectedImage === null ? { scale: 1.05 } : {}}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut"
                  }}
                  className={`relative overflow-hidden rounded-xl cursor-pointer ${image.gridClass}`}
                  style={{ zIndex: styles.zIndex }}
                  onClick={() => handleImageClick(index)}
                >
                  <ImageWithFallback
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Base overlay for visual feedback */}
                  <motion.div 
                    className="absolute inset-0 bg-black/0 transition-colors duration-300"
                    animate={{
                      backgroundColor: isSelected 
                        ? "rgba(0,0,0,0.1)" 
                        : selectedImage !== null 
                          ? "rgba(0,0,0,0.3)" 
                          : "rgba(0,0,0,0)"
                    }}
                  />
                  
                  {/* Hover overlay with title */}
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    animate={{ 
                      opacity: isSelected ? 1 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div 
                      className="bg-white/20 backdrop-blur-md rounded-lg px-4 py-2 text-center cursor-pointer hover:bg-white/30 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTitleClick(index);
                      }}
                    >
                      <span className="text-white font-medium block">
                        {imageTitle}
                      </span>
                      {isSelected && (
                        <span className="text-white/80 text-sm block mt-1">
                          {text.closeButton}
                        </span>
                      )}
                      {!isSelected && (
                        <span className="text-white/80 text-xs block mt-1">
                          {language === 'ru' ? 'Нажмите для перехода к услуге' : 
                           language === 'en' ? 'Click to go to service' : 
                           language === 'de' ? 'Klicken Sie, um zum Service zu gelangen' :
                           'Klikněte pro přechod ke službě'}
                        </span>
                      )}
                    </div>
                  </motion.div>

                  {/* Selection indicator */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute top-4 right-4 bg-primary text-primary-foreground rounded-full p-2 shadow-lg"
                    >
                      <X className="h-4 w-4" />
                    </motion.div>
                  )}

                  {/* Glowing border effect for selected image */}
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 rounded-xl border-2 border-primary shadow-lg shadow-primary/20"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Background overlay when image is selected */}
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-xl pointer-events-none"
              onClick={closeSelection}
            />
          )}
        </div>

        {/* Selected image info panel */}
        {selectedImage !== null && (() => {
          const selectedImageData = galleryImages[selectedImage];
          const imageTitle = selectedImageData.title[language as keyof typeof selectedImageData.title] || selectedImageData.title.ru;
          
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 bg-card border rounded-xl p-6 text-center shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2">
                {imageTitle}
              </h3>
              <p className="text-muted-foreground mb-4">
                {selectedImageData.alt}
              </p>
              <button
                onClick={closeSelection}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <X className="h-4 w-4" />
                {text.closeButton}
              </button>
            </motion.div>
          );
        })()}
      </div>
    </section>
  );
}