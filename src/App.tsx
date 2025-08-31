import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Breadcrumb } from "./components/Breadcrumb";
import { Router, Route, Page } from "./components/Router";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { ContactPage } from "./pages/ContactPage";
import { LogoShowcase } from "./pages/LogoShowcase";
import { useMobileDevice } from "./components/ui/use-mobile-device";
import { SEO } from "./components/SEO";
import { StructuredData, schemas } from "./components/StructuredData";
import { Hreflang } from "./components/Hreflang";
import { PreloadResources } from "./components/PerformanceOptimization";
import { CoreWebVitalsMonitor } from "./components/PerformanceOptimization";
import { ResourceHints } from "./components/PerformanceOptimization";

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState("ru");
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const isMobileDevice = useMobileDevice();

  // Apply theme to document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const handleThemeToggle = () => {
    setIsDark(!isDark);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
  };

  // SEO content based on current page and language
  const getSEOContent = () => {
    const baseUrl = "https://codehero.com";
    const seoData = {
      home: {
        ru: {
          title: "CodeHero - Инновационные IT решения для бизнеса",
          description: "Создаем современные технологические решения, которые помогают компаниям достигать новых высот в цифровой эпохе.",
          keywords: "IT решения, веб-разработка, мобильные приложения, программное решения"
        },
        en: {
          title: "CodeHero - Innovative IT Solutions for Business",
          description: "We create modern technological solutions that help companies reach new heights in the digital age.",
          keywords: "IT solutions, web development, mobile applications, software solutions"
        },
        de: {
          title: "CodeHero - Innovative IT-Lösungen für Unternehmen",
          description: "Wir schaffen moderne technologische Lösungen, die Unternehmen dabei helfen, im digitalen Zeitalter neue Höhen zu erreichen.",
          keywords: "IT-Lösungen, Webentwicklung, mobile Anwendungen, Softwarelösungen"
        },
        cs: {
          title: "CodeHero - Inovativní IT řešení pro byznys",
          description: "Vytváříme moderní technologická řešení, která pomáhají společnostem dosáhnout nových výšin v digitální éře.",
          keywords: "IT řešení, webový vývoj, mobilní aplikace, softwarová řešení"
        }
      },
      about: {
        ru: {
          title: "О нас - CodeHero | IT консалтинг и разработка",
          description: "Узнайте больше о команде CodeHero, наших ценностях и опыте в создании инновационных IT решений.",
          keywords: "о нас, команда, IT консалтинг, опыт разработки"
        },
        en: {
          title: "About Us - CodeHero | IT Consulting & Development",
          description: "Learn more about the CodeHero team, our values and experience in creating innovative IT solutions.",
          keywords: "about us, team, IT consulting, development experience"
        },
        de: {
          title: "Über uns - CodeHero | IT-Beratung & Entwicklung",
          description: "Erfahren Sie mehr über das CodeHero-Team, unsere Werte und Erfahrungen bei der Erstellung innovativer IT-Lösungen.",
          keywords: "über uns, team, IT-beratung, entwicklungs-erfahrung"
        },
        cs: {
          title: "O nás - CodeHero | IT konzultace a vývoj",
          description: "Dozvěďte se více o týmu CodeHero, našich hodnotách a zkušenostech s vytvářením inovativních IT řešení.",
          keywords: "o nás, tým, IT konzultace, vývojové zkušenosti"
        }
      },
      services: {
        ru: {
          title: "Услуги - CodeHero | Веб-разработка и IT консалтинг",
          description: "Полный спектр IT услуг: веб-разработка, мобильные приложения, программное обеспечение, IT консалтинг.",
          keywords: "услуги, веб-разработка, мобильные приложения, IT консалтинг"
        },
        en: {
          title: "Services - CodeHero | Web Development & IT Consulting",
          description: "Full range of IT services: web development, mobile applications, software, IT consulting.",
          keywords: "services, web development, mobile applications, IT consulting"
        },
        de: {
          title: "Dienstleistungen - CodeHero | Webentwicklung & IT-Beratung",
          description: "Vollständige Palette von IT-Dienstleistungen: Webentwicklung, mobile Anwendungen, Software, IT-Beratung.",
          keywords: "dienstleistungen, webentwicklung, mobile anwendungen, IT-beratung"
        },
        cs: {
          title: "Služby - CodeHero | Webový vývoj a IT konzultace",
          description: "Kompletní spektrum IT služeb: webový vývoj, mobilní aplikace, software, IT konzultace.",
          keywords: "služby, webový vývoj, mobilní aplikace, IT konzultace"
        }
      },
      contact: {
        ru: {
          title: "Контакты - CodeHero | Свяжитесь с нами",
          description: "Свяжитесь с командой CodeHero для обсуждения вашего проекта. Консультации и разработка IT решений.",
          keywords: "контакты, связаться, IT консультации, разработка проектов"
        },
        en: {
          title: "Contact - CodeHero | Get in Touch",
          description: "Contact the CodeHero team to discuss your project. IT consulting and solution development.",
          keywords: "contact, get in touch, IT consulting, project development"
        },
        de: {
          title: "Kontakt - CodeHero | Kontaktieren Sie uns",
          description: "Kontaktieren Sie das CodeHero-Team, um Ihr Projekt zu besprechen. IT-Beratung und Lösungsentwicklung.",
          keywords: "kontakt, kontaktieren, IT-beratung, projektenwicklung"
        },
        cs: {
          title: "Kontakt - CodeHero | Kontaktujte nás",
          description: "Kontaktujte tým CodeHero pro diskusi o vašem projektu. IT konzultace a vývoj řešení.",
          keywords: "kontakt, kontaktovat, IT konzultace, vývoj projektů"
        }
      }
    };

    const currentSeo = seoData[currentPage]?.[language] || seoData.home.ru;
    const currentUrl = currentPage === 'home' ? baseUrl : `${baseUrl}/${currentPage}`;
    
    return {
      title: currentSeo.title,
      description: currentSeo.description,
      keywords: currentSeo.keywords,
      url: currentUrl,
      language: language
    };
  };

  const seoContent = getSEOContent();

  return (
    <div className="min-h-screen bg-background">
      {/* Performance Optimization */}
      <PreloadResources />
      <CoreWebVitalsMonitor />
      <ResourceHints />
      
      {/* SEO Component */}
      <SEO 
        title={seoContent.title}
        description={seoContent.description}
        keywords={seoContent.keywords}
        url={seoContent.url}
        language={seoContent.language}
      />
      
      {/* Hreflang for multilingual SEO */}
      <Hreflang 
        currentPage={currentPage} 
        currentLanguage={language} 
      />
      
      {/* Structured Data */}
      <StructuredData 
        type="Organization" 
        data={schemas.organization} 
      />
      
      <Header
        isDark={isDark}
        onThemeToggle={handleThemeToggle}
        language={language}
        onLanguageChange={handleLanguageChange}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <main className={currentPage === "home" ? "pt-16" : "pt-20"}>
        {!isMobileDevice && (
          <Breadcrumb 
            currentPage={currentPage} 
            language={language} 
            onPageChange={handlePageChange} 
          />
        )}
        <Router currentPage={currentPage}>
          <Route key="home-route" page="home" currentPage={currentPage}>
            <HomePage language={language} onPageChange={handlePageChange} />
          </Route>
          <Route key="about-route" page="about" currentPage={currentPage}>
            <AboutPage language={language} />
          </Route>
          <Route key="services-route" page="services" currentPage={currentPage}>
            <ServicesPage language={language} onPageChange={handlePageChange} />
          </Route>

          <Route key="contact-route" page="contact" currentPage={currentPage}>
            <ContactPage language={language} />
          </Route>
          {/* Temporary showcase route - can be removed later */}
          {currentPage === "logo-showcase" && (
            <LogoShowcase language={language} />
          )}
        </Router>
      </main>

      <Footer language={language} onPageChange={handlePageChange} currentPage={currentPage} />
    </div>
  );
}
