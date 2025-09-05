import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Router, Route, Page } from "./components/Router";
import { Language } from "./types";
import { useTranslations } from "./i18n/translations";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { ContactPage } from "./pages/ContactPage";
import { LogoShowcase } from "./pages/LogoShowcase";
// Removed breadcrumb, so mobile device detection is no longer needed here
import { SEO } from "./components/SEO";
import { JsonLd, schemas } from "./components/JsonLd";
import { Hreflang } from "./components/Hreflang";
import { PreloadResources } from "./components/PerformanceOptimization";
import { CoreWebVitalsMonitor } from "./components/PerformanceOptimization";
import { ResourceHints } from "./components/PerformanceOptimization";

export default function App() {
  const [language, setLanguage] = useState<Language>("en");
  const [currentPage, setCurrentPage] = useState<Page>("home");

  // Update HTML lang attribute when language changes
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const handleLanguageChange = (newLanguage: Language) => {
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
        pl: {
          title: "IKH-TechSystems - Innowacyjne rozwiązania IT dla biznesu",
          description: "Tworzymy nowoczesne rozwiązania technologiczne, które pomagają firmom osiągać nowe wyżyny w erze cyfrowej.",
          keywords: "rozwiązania IT, tworzenie stron, aplikacje mobilne, rozwiązania software"
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
        pl: {
          title: "O nas - IKH-TechSystems | Konsulting IT i rozwój",
          description: "Dowiedz się więcej o zespole IKH-TechSystems, naszych wartościach i doświadczeniu w tworzeniu innowacyjnych rozwiązań IT.",
          keywords: "o nas, zespół, konsulting IT, doświadczenie w rozwoju"
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
        pl: {
          title: "Usługi - IKH-TechSystems | Tworzenie stron i konsulting IT",
          description: "Pełna gama usług IT: tworzenie stron internetowych, aplikacje mobilne, oprogramowanie, konsulting IT.",
          keywords: "usługi, tworzenie stron, aplikacje mobilne, konsulting IT"
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
        pl: {
          title: "Kontakt - IKH-TechSystems | Skontaktuj się z nami",
          description: "Skontaktuj się z zespołem IKH-TechSystems, aby omówić swój projekt. Konsultacje IT i rozwój rozwiązań.",
          keywords: "kontakt, skontaktuj się, konsultacje IT, rozwój projektów"
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
        pl: {
          title: "Portfolio logo - IKH-TechSystems | Przykłady prac",
          description: "Portfolio logo i brandingu od IKH-TechSystems. Przykłady prac i kreatywnych rozwiązań.",
          keywords: "portfolio, loga, branding, przykłady prac"
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

    const currentSeo = seoData[currentPage as keyof typeof seoData]?.[language as keyof typeof seoData.home] || seoData.home.en;
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
      <JsonLd 
        type="Organization" 
        data={schemas.organization} 
      />
      <JsonLd 
        type="LocalBusiness" 
        data={schemas.localBusiness} 
      />
      <JsonLd 
        type="Service" 
        data={schemas.websiteTurnkeyService} 
      />
      
      <Header
        language={language}
        onLanguageChange={handleLanguageChange}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <main className={currentPage === "home" ? "pt-16" : "pt-20"}>
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
          {/* Add the logo-showcase route properly */}
          <Route key="logo-showcase-route" page="logo-showcase">
            <LogoShowcase language={language} />
          </Route>
        </Router>
      </main>

      <Footer language={language} onPageChange={handlePageChange} currentPage={currentPage} />
    </div>
  );
}
