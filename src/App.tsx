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

  // Apply theme to document with smooth transition
  useEffect(() => {
    console.log('useEffect triggered! isDark:', isDark);
    
    // Force reflow to ensure proper state
    document.documentElement.offsetHeight;
    
    // Add transition class for smooth animation
    document.documentElement.classList.add('theme-transitioning');
    
    // Apply theme class with proper timing
    requestAnimationFrame(() => {
      if (isDark) {
        document.documentElement.classList.add("dark");
        document.documentElement.setAttribute("data-theme", "dark");
        console.log('Added dark class');
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.setAttribute("data-theme", "light");
        console.log('Removed dark class');
      }
      console.log('Document classes:', document.documentElement.classList.toString());
    });
    
    // Remove transition class after animation completes
    const timeout = setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 350);
    
    return () => clearTimeout(timeout);
  }, [isDark]);

  const handleThemeToggle = () => {
    console.log('Theme toggle clicked! Current isDark:', isDark);
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
    const baseUrl = "https://ikhsystems.com";
    const seoData = {
      home: {
        ru: {
          title: "IKH-TechSystems - Инновационные IT решения для бизнеса",
          description: "Создаем современные технологические решения, которые помогают компаниям достигать новых высот в цифровой эпохе.",
          keywords: "IT решения, веб-разработка, мобильные приложения, программное решения"
        },
        en: {
          title: "IKH-TechSystems - Innovative IT Solutions for Business",
          description: "We create modern technological solutions that help companies reach new heights in the digital age.",
          keywords: "IT solutions, web development, mobile applications, software solutions"
        },
        de: {
          title: "IKH-TechSystems - Innovative IT-Lösungen für Unternehmen",
          description: "Wir schaffen moderne technologische Lösungen, die Unternehmen dabei helfen, im digitalen Zeitalter neue Höhen zu erreichen.",
          keywords: "IT-Lösungen, Webentwicklung, mobile Anwendungen, Softwarelösungen"
        },
        cs: {
          title: "IKH-TechSystems - Inovativní IT řešení pro byznys",
          description: "Vytváříme moderní technologická řešení, která pomáhají společnostem dosáhnout nových výšin v digitální éře.",
          keywords: "IT řešení, webový vývoj, mobilní aplikace, softwarová řešení"
        }
      },
      about: {
        ru: {
          title: "О нас - IKH-TechSystems | IT консалтинг и разработка",
          description: "Узнайте больше о команде IKH-TechSystems, наших ценностях и опыте в создании инновационных IT решений.",
          keywords: "о нас, команда, IT консалтинг, опыт разработки"
        },
        en: {
          title: "About Us - IKH-TechSystems | IT Consulting & Development",
          description: "Learn more about the IKH-TechSystems team, our values and experience in creating innovative IT solutions.",
          keywords: "about us, team, IT consulting, development experience"
        },
        de: {
          title: "Über uns - IKH-TechSystems | IT-Beratung & Entwicklung",
          description: "Erfahren Sie mehr über das IKH-TechSystems-Team, unsere Werte und Erfahrungen bei der Erstellung innovativer IT-Lösungen.",
          keywords: "über uns, team, IT-beratung, entwicklungs-erfahrung"
        },
        cs: {
          title: "O nás - IKH-TechSystems | IT konzultace a vývoj",
          description: "Dozvěďte se více o týmu IKH-TechSystems, našich hodnotách a zkušenostech s vytvářením inovativních IT řešení.",
          keywords: "o nás, tým, IT konzultace, vývojové zkušenosti"
        }
      },
      services: {
        ru: {
          title: "Услуги - IKH-TechSystems | Веб-разработка и IT консалтинг",
          description: "Полный спектр IT услуг: веб-разработка, мобильные приложения, программное обеспечение, IT консалтинг.",
          keywords: "услуги, веб-разработка, мобильные приложения, IT консалтинг"
        },
        en: {
          title: "Services - IKH-TechSystems | Web Development & IT Consulting",
          description: "Full range of IT services: web development, mobile applications, software, IT consulting.",
          keywords: "services, web development, mobile applications, IT consulting"
        },
        de: {
          title: "Dienstleistungen - IKH-TechSystems | Webentwicklung & IT-Beratung",
          description: "Vollständige Palette von IT-Dienstleistungen: Webentwicklung, mobile Anwendungen, Software, IT-Beratung.",
          keywords: "dienstleistungen, webentwicklung, mobile anwendungen, IT-beratung"
        },
        cs: {
          title: "Služby - IKH-TechSystems | Webový vývoj a IT konzultace",
          description: "Kompletní spektrum IT služeb: webový vývoj, mobilní aplikace, software, IT konzultace.",
          keywords: "služby, webový vývoj, mobilní aplikace, IT konzultace"
        }
      },
      contact: {
        ru: {
          title: "Контакты - IKH-TechSystems | Свяжитесь с нами",
          description: "Свяжитесь с командой IKH-TechSystems для обсуждения вашего проекта. Консультации и разработка IT решений.",
          keywords: "контакты, связаться, IT консультации, разработка проектов"
        },
        en: {
          title: "Contact - IKH-TechSystems | Get in Touch",
          description: "Contact the IKH-TechSystems team to discuss your project. IT consulting and solution development.",
          keywords: "contact, get in touch, IT consulting, project development"
        },
        de: {
          title: "Kontakt - IKH-TechSystems | Kontaktieren Sie uns",
          description: "Kontaktieren Sie das IKH-TechSystems-Team, um Ihr Projekt zu besprechen. IT-Beratung und Lösungsentwicklung.",
          keywords: "kontakt, kontaktieren, IT-beratung, projektenwicklung"
        },
        cs: {
          title: "Kontakt - IKH-TechSystems | Kontaktujte nás",
          description: "Kontaktujte tým IKH-TechSystems pro diskusi o vašem projektu. IT konzultace a vývoj řešení.",
          keywords: "kontakt, kontaktovat, IT konzultace, vývoj projektů"
        }
      },
      "logo-showcase": {
        ru: {
          title: "Портфолио логотипов - IKH-TechSystems | Примеры работ",
          description: "Портфолио логотипов и брендинга от IKH-TechSystems. Примеры работ и креативных решений.",
          keywords: "портфолио, логотипы, брендинг, примеры работ"
        },
        en: {
          title: "Logo Portfolio - IKH-TechSystems | Work Examples",
          description: "Logo and branding portfolio from IKH-TechSystems. Examples of work and creative solutions.",
          keywords: "portfolio, logos, branding, work examples"
        },
        de: {
          title: "Logo-Portfolio - IKH-TechSystems | Arbeitsbeispiele",
          description: "Logo- und Branding-Portfolio von IKH-TechSystems. Beispiele für Arbeiten und kreative Lösungen.",
          keywords: "portfolio, logos, branding, arbeitsbeispiele"
        },
        cs: {
          title: "Portfolio log - IKH-TechSystems | Příklady práce",
          description: "Portfolio log a brandingu od IKH-TechSystems. Příklady práce a kreativních řešení.",
          keywords: "portfolio, loga, branding, příklady práce"
        }
      }
    };

    const currentSeo = seoData[currentPage as keyof typeof seoData]?.[language as keyof typeof seoData.home] || seoData.home.ru;
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
          <Route key="home-route" page="home">
            <HomePage language={language} onPageChange={handlePageChange} />
          </Route>
          <Route key="about-route" page="about">
            <AboutPage language={language} />
          </Route>
          <Route key="services-route" page="services">
            <ServicesPage language={language} onPageChange={handlePageChange} />
          </Route>

          <Route key="contact-route" page="contact">
            <ContactPage language={language} />
          </Route>
          {/* Temporary showcase route - can be removed later */}
          {currentPage === 'logo-showcase' && (
            <LogoShowcase language={language} />
          )}
        </Router>
      </main>

      <Footer language={language} onPageChange={handlePageChange} currentPage={currentPage} />
    </div>
  );
}
