import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { PreliminaryPrices } from "../components/PreliminaryPrices";
import { JsonLd, schemas } from "../components/JsonLd";
import { Language } from "../types";
import { 
  Code, 
  Smartphone, 
  Cloud, 
  BarChart, 
  CheckCircle
} from "lucide-react";

interface ServicesPageProps {
  language?: Language;
  onPageChange?: (page: "home" | "about" | "services" | "contact") => void;
}

const content = {
  ru: {
    title: "Наши услуги",
    subtitle: "Комплексные решения для вашего бизнеса",
    description: "Мы предлагаем полный спектр цифровых услуг для развития вашего бизнеса в современном мире технологий.",
    services: [
      {
        icon: Code,
        title: "Веб-разработка",
        description: "Создание современных веб-приложений и сайтов с использованием передовых технологий",
        features: ["React и Next.js", "Responsive дизайн", "SEO оптимизация", "Высокая производительность"],
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NTY0OTM3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        icon: Smartphone,
        title: "Мобильные приложения",
        description: "Разработка нативных и кроссплатформенных мобильных приложений",
        features: ["iOS и Android", "React Native", "UI/UX дизайн", "App Store оптимизация"],
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NTY0OTM3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        icon: Cloud,
        title: "Облачные решения",
        description: "Миграция и разработка облачных решений для масштабируемости бизнеса",
        features: ["AWS, Azure, GCP", "Микросервисы", "DevOps автоматизация", "Мониторинг и логирование"],
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGNvbXB1dGluZ3xlbnwxfHx8fDE3NTY0OTM3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        icon: BarChart,
        title: "Аналитика данных",
        description: "Анализ больших данных и создание интеллектуальных отчетов",
        features: ["Business Intelligence", "Machine Learning", "Визуализация данных", "Прогнозная аналитика"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhkYXRhJTIwYW5hbHl0aWNzfGVufDF8fHx8MTc1NjQ5Mzc2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
    ],
    cta: {
      title: "Готовы начать проект?",
      description: "Свяжитесь с нами для обсуждения вашего проекта",
      button: "Связаться с нами"
    }
  },
  en: {
    title: "Our Services",
    subtitle: "Comprehensive solutions for your business",
    description: "We offer a full range of digital services to grow your business in the modern world of technology.",
    services: [
      {
        icon: Code,
        title: "Web Development",
        description: "Creating modern web applications and websites using cutting-edge technologies",
        features: ["React and Next.js", "Responsive design", "SEO optimization", "High performance"],
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NTY0OTM3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        icon: Smartphone,
        title: "Mobile Applications",
        description: "Development of native and cross-platform mobile applications",
        features: ["iOS and Android", "React Native", "UI/UX design", "App Store optimization"],
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NTY0OTM3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        icon: Cloud,
        title: "Cloud Solutions",
        description: "Migration and development of cloud solutions for business scalability",
        features: ["AWS, Azure, GCP", "Microservices", "DevOps automation", "Monitoring and logging"],
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGNvbXB1dGluZ3xlbnwxfHx8fDE3NTY0OTM3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        icon: BarChart,
        title: "Data Analytics",
        description: "Big data analysis and intelligent reporting creation",
        features: ["Business Intelligence", "Machine Learning", "Data visualization", "Predictive analytics"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhkYXRhJTIwYW5hbHl0aWNzfGVufDF8fHx8MTc1NjQ5Mzc2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
    ],
    cta: {
      title: "Ready to start a project?",
      description: "Contact us to discuss your project",
      button: "Contact Us"
    }
  },
  de: {
    title: "Unsere Dienstleistungen",
    subtitle: "Umfassende Lösungen für Ihr Unternehmen",
    description: "Wir bieten eine vollständige Palette digitaler Dienstleistungen, um Ihr Unternehmen in der modernen Technologiewelt wachsen zu lassen.",
    services: [
      {
        icon: Code,
        title: "Web-Entwicklung",
        description: "Erstellung moderner Webanwendungen und Websites mit modernsten Technologien",
        features: ["React und Next.js", "Responsive Design", "SEO-Optimierung", "Hohe Leistung"],
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NTY0OTM3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        icon: Smartphone,
        title: "Mobile Anwendungen",
        description: "Entwicklung nativer und plattformübergreifender mobiler Anwendungen",
        features: ["iOS und Android", "React Native", "UI/UX Design", "App Store Optimierung"],
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NTY0OTM3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        icon: Cloud,
        title: "Cloud-Lösungen",
        description: "Migration und Entwicklung von Cloud-Lösungen für Unternehmensskalierbarkeit",
        features: ["AWS, Azure, GCP", "Microservices", "DevOps Automatisierung", "Überwachung und Protokollierung"],
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGNvbXB1dGluZ3xlbnwxfHx8fDE3NTY0OTM3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        icon: BarChart,
        title: "Datenanalyse",
        description: "Big Data-Analyse und Erstellung intelligenter Berichte",
        features: ["Business Intelligence", "Machine Learning", "Datenvisualisierung", "Predictive Analytics"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhkYXRhJTIwYW5hbHl0aWNzfGVufDF8fHx8MTc1NjQ5Mzc2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
    ],
    cta: {
      title: "Bereit, ein Projekt zu starten?",
      description: "Kontaktieren Sie uns, um Ihr Projekt zu besprechen",
      button: "Kontaktieren Sie uns"
    }
  },
  cs: {
    title: "Naše služby",
    subtitle: "Komplexní řešení pro váš byznys",
    description: "Nabízíme kompletní škálu digitálních služeb pro rozvoj vašeho byznysu v moderním světě technologií.",
    services: [
      {
        icon: Code,
        title: "Vývoj webu",
        description: "Vytváření moderních webových aplikací a webových stránek pomocí špičkových technologií",
        features: ["React a Next.js", "Responzivní design", "SEO optimalizace", "Vysoký výkon"],
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NTY0OTM3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        icon: Smartphone,
        title: "Mobilní aplikace",
        description: "Vývoj nativních a cross-platformních mobilních aplikací",
        features: ["iOS a Android", "React Native", "UI/UX design", "App Store optimalizace"],
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NTY0OTM3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        icon: Cloud,
        title: "Cloudová řešení",
        description: "Migrace a vývoj cloudových řešení pro škálovatelnost byznysu",
        features: ["AWS, Azure, GCP", "Mikroservisy", "DevOps automatizace", "Monitoring a logování"],
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGNvbXB1dGluZ3xlbnwxfHx8fDE3NTY0OTM3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        icon: BarChart,
        title: "Analytika dat",
        description: "Analýza velkých dat a vytváření inteligentních reportů",
        features: ["Business Intelligence", "Machine Learning", "Vizualizace dat", "Prediktivní analytika"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhkYXRhJTIwYW5hbHl0aWNzfGVufDF8fHx8MTc1NjQ5Mzc2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
    ],
    cta: {
      title: "Připraveni začít projekt?",
      description: "Kontaktujte nás k prodiskutování vašeho projektu",
      button: "Kontaktovat nás"
    }
  }
};

function ServicesPageComponent({ language, onPageChange }: ServicesPageProps) {
  const { lang = "cs" } = useParams();
  const currentLanguage = language || (lang as Language);
  const text = content[currentLanguage as keyof typeof content] || content.ru;

  const breadcrumbItems = [
    { name: "Home", url: `https://ikhsystems.com/${lang}` },
    { name: text.title, url: `https://ikhsystems.com/${lang}/services` }
  ];

  const faqData = [
    {
      question: "Kolik stojí vývoj webové stránky na klíč?",
      answer: "Základní cena za vývoj webové stránky na klíč začína od 500 EUR. Konečná cena závisí na složitosti projektu, požadovaných funkcionalitách a designu."
    },
    {
      question: "Jak dlouho trvá vývoj webové stránky?",
      answer: "Typický vývoj webové stránky trvá 2-8 týdnů v závislosti na složitosti projektu. Jednoduché weby můžeme dokončit rychleji, složitější projekty mohou trvat déle."
    },
    {
      question: "Poskytujete podporu po dokončení projektu?",
      answer: "Ano, poskytujeme technickou podporu a údržbu všech našich projektů. Nabízíme různé balíčky podpory podle vašich potřeb."
    },
    {
      question: "Vytváříte responzivní weby?",
      answer: "Všechny naše weby jsou responzivní a optimalizované pro všechna zařízení - počítače, tablety i mobilní telefony."
    }
  ];

  return (
    <div className="py-20">
      <Helmet>
        <title>Služby — IKH Systems</title>
        <meta name="description" content="Kompletní spektrum IT služeb: webový vývoj, mobilní aplikace, software, IT konzultace." />
        <link rel="canonical" href={`https://ikhsystems.com/${lang}/services`} />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <JsonLd 
        type="BreadcrumbList" 
        data={schemas.breadcrumbList(breadcrumbItems)} 
      />
      <JsonLd 
        type="FAQPage" 
        data={schemas.faqPage(faqData)} 
      />
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">{text.title}</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {text.subtitle}
          </p>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            {text.description}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid gap-16 mb-20">
          {text.services.map((service, index) => (
            <motion.div
              key={index}
              id={`service-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`grid lg:grid-cols-2 gap-12 items-center scroll-mt-20 ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image */}
              <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                <div className="aspect-[4/3] rounded-xl overflow-hidden">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Preliminary Prices Section */}
        <PreliminaryPrices 
          language={currentLanguage} 
          onPageChange={onPageChange} 
        />

      </div>
    </div>
  );
}

// Default export for lazy loading
export default ServicesPageComponent;

// Keep named export for backward compatibility
export { ServicesPageComponent as ServicesPage };
