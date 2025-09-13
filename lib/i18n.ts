import { Language } from '@/types'

// Supported languages
export const locales: Language[] = ['cs', 'en', 'de']
export const defaultLocale: Language = 'en'

// SEO-optimized domain URLs for each locale  
export const getLocalizedUrl = (path: string, locale: Language): string => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ikhsystems.com'
  return `${baseUrl}/${locale}${path}`
}

// Translation interface
export interface TranslationDictionary {
  common: {
    navigation: {
      home: string
      about: string
      services: string
      contact: string
      logoPortfolio: string
    }
    actions: {
      learnMore: string
      getStarted: string
      contactUs: string
      readMore: string
      close: string
      submit: string
      cancel: string
    }
    loading: string
    error: string
    success: string
  }
  hero: {
    title: string
    subtitle: string
    description: string
    cta: {
      primary: string
      secondary: string
    }
    carousel: {
      slides: Array<{
        image: string
        alt: string
        title: string
        subtitle?: string
        cta?: {
          label: string
          href: string
        }
      }>
    }
  }
  about: {
    title: string
    subtitle: string
    description: string
    team: {
      title: string
      members: Array<{
        name: string
        role: string
        experience: string
      }>
    }
    mission: {
      title: string
      description: string
    }
    innovations: {
      title: string
      description: string
    }
    achievements: {
      title: string
      description: string
    }
  }
  challenges: {
    title: string
    subtitle: string
    items: Array<{
      title: string
      description: string
    }>
  }
  services: {
    title: string
    subtitle: string
    items: Array<{
      title: string
      description: string
      features: string[]
    }>
  }
  contact: {
    title: string
    subtitle: string
    form: {
      name: {
        label: string
        placeholder: string
      }
      email: {
        label: string
        placeholder: string
      }
      message: {
        label: string
        placeholder: string
      }
      submit: string
    }
    info: {
      email: string
      phone: string
      address: string
    }
  }
  seo: {
    home: {
      title: string
      description: string
      keywords: string
    }
    about: {
      title: string
      description: string
      keywords: string
    }
    services: {
      title: string
      description: string
      keywords: string
    }
    contact: {
      title: string
      description: string
      keywords: string
    }
    logoPortfolio: {
      title: string
      description: string
      keywords: string
    }
  }
}

// Translation data
export const translations: Record<Language, TranslationDictionary> = {
  en: {
    common: {
      navigation: {
        home: "Home",
        about: "About",
        services: "Services", 
        contact: "Contact",
        logoPortfolio: "Logo Portfolio"
      },
      actions: {
        learnMore: "Learn More",
        getStarted: "Get Started",
        contactUs: "Contact Us",
        readMore: "Read More",
        close: "Close",
        submit: "Submit",
        cancel: "Cancel"
      },
      loading: "Loading...",
      error: "An error occurred",
      success: "Success"
    },
    hero: {
      title: "IKH Systems",
      subtitle: "Innovative IT Solutions for Business",
      description: "We create modern technological solutions that help companies reach new heights in the digital age.",
      cta: {
        primary: "Get Started",
        secondary: "Learn More"
      },
      carousel: {
        slides: [
          {
            image: "/media/banner/hero-analytics.webp",
            alt: "Analytics dashboard showing business insights and data visualization",
            title: "Analytics & Insights",
            subtitle: "Transform your data into actionable business intelligence",
            cta: {
              label: "Explore Analytics",
              href: "/services"
            }
          },
          {
            image: "/media/banner/ciber securaty.webp",
            alt: "Cybersecurity shield protecting digital infrastructure",
            title: "Cybersecurity",
            subtitle: "Protect your business with enterprise-grade security solutions",
            cta: {
              label: "Secure Your Business",
              href: "/services"
            }
          },
          {
            image: "/media/banner/server.webp",
            alt: "Modern server infrastructure and cloud computing setup",
            title: "Infrastructure",
            subtitle: "Scalable and reliable server solutions for your business",
            cta: {
              label: "View Solutions",
              href: "/services"
            }
          }
        ]
      }
    },
    about: {
      title: "About Us",
      subtitle: "Building the Future with Technology",
      description: "We are a team of passionate developers and designers creating cutting-edge digital solutions.",
      team: {
        title: "Our Team",
        members: [
          {
            name: "Illia Khromov",
            role: "Lead Developer",
            experience: "5+ years"
          }
        ]
      },
      mission: {
        title: "Our Mission",
        description: "To deliver exceptional digital experiences through innovative technology solutions."
      },
      innovations: {
        title: "Innovation",
        description: "We stay at the forefront of technology to provide cutting-edge solutions."
      },
      achievements: {
        title: "Achievements", 
        description: "Successful projects delivered with exceptional quality and performance."
      }
    },
    challenges: {
      title: "Challenges We Solve",
      subtitle: "From Concept to Digital Reality",
      items: [
        {
          title: "Web Development",
          description: "Modern, responsive websites and applications"
        },
        {
          title: "Mobile Solutions",
          description: "Cross-platform mobile applications"
        },
        {
          title: "System Integration",
          description: "Seamless integration of business systems"
        }
      ]
    },
    services: {
      title: "Our Services",
      subtitle: "Comprehensive Digital Solutions",
      items: [
        {
          title: "Web Development",
          description: "Full-stack web applications with modern technologies",
          features: ["React/Next.js", "Node.js", "Database Design", "API Development"]
        },
        {
          title: "Mobile Development", 
          description: "Native and cross-platform mobile applications",
          features: ["React Native", "iOS/Android", "App Store Optimization", "Performance"]
        },
        {
          title: "System Integration",
          description: "Enterprise system integration and automation",
          features: ["API Integration", "Database Migration", "Process Automation", "Cloud Solutions"]
        }
      ]
    },
    contact: {
      title: "Contact Us",
      subtitle: "Let's Build Something Amazing Together",
      form: {
        name: {
          label: "Name",
          placeholder: "Your name"
        },
        email: {
          label: "Email",
          placeholder: "your@email.com"
        },
        message: {
          label: "Message",
          placeholder: "Tell us about your project..."
        },
        submit: "Send Message"
      },
      info: {
        email: "contact@ikhsystems.com",
        phone: "+420 123 456 789",
        address: "Prague, Czech Republic"
      }
    },
    seo: {
      home: {
        title: "IKH Systems - Innovative IT Solutions for Business",
        description: "We create modern technological solutions that help companies reach new heights in the digital age.",
        keywords: "IT solutions, web development, mobile applications, software solutions"
      },
      about: {
        title: "About Us - IKH Systems | Expert Development Team",
        description: "Meet our expert development team. We specialize in creating innovative digital solutions for modern businesses.",
        keywords: "about us, development team, IT experts, company profile"
      },
      services: {
        title: "Services - IKH Systems | Web & Mobile Development",
        description: "Comprehensive web development, mobile applications, and system integration services for your business.",
        keywords: "web development, mobile development, system integration, IT services"
      },
      contact: {
        title: "Contact Us - IKH Systems | Get In Touch",
        description: "Ready to start your project? Contact our expert team for consultation and project estimates.",
        keywords: "contact, consultation, project estimate, get in touch"
      },
      logoPortfolio: {
        title: "Logo Portfolio - IKH Systems | Work Examples",
        description: "Logo and branding portfolio from IKH Systems. Examples of work and creative solutions.",
        keywords: "portfolio, logos, branding, work examples"
      }
    }
  },
  cs: {
    common: {
      navigation: {
        home: "Domů",
        about: "O nás",
        services: "Služby",
        contact: "Kontakt",
        logoPortfolio: "Logo Portfolio"
      },
      actions: {
        learnMore: "Více informací",
        getStarted: "Začít",
        contactUs: "Kontaktujte nás",
        readMore: "Číst více",
        close: "Zavřít",
        submit: "Odeslat",
        cancel: "Zrušit"
      },
      loading: "Načítání...",
      error: "Došlo k chybě",
      success: "Úspěch"
    },
    hero: {
      title: "IKH Systems",
      subtitle: "Inovativní IT řešení pro byznys",
      description: "Vytváříme moderní technologická řešení, která pomáhají společnostem dosáhnout nových výšin v digitální éře.",
      cta: {
        primary: "Začít",
        secondary: "Více informací"
      },
      carousel: {
        slides: [
          {
            image: "/media/banner/hero-analytics.webp",
            alt: "Analytický dashboard zobrazující obchodní přehledy a vizualizaci dat",
            title: "Analytika & Přehledy",
            subtitle: "Transformujte svá data na akční obchodní inteligenci",
            cta: {
              label: "Prozkoumat analytiku",
              href: "/services"
            }
          },
          {
            image: "/media/banner/ciber securaty.webp",
            alt: "Kybernetický štít chránící digitální infrastrukturu",
            title: "Kybernetická bezpečnost",
            subtitle: "Chraňte svůj byznys řešeními na úrovni podniku",
            cta: {
              label: "Zabezpečit byznys",
              href: "/services"
            }
          },
          {
            image: "/media/banner/server.webp",
            alt: "Moderní serverová infrastruktura a cloudové řešení",
            title: "Infrastruktura",
            subtitle: "Škálovatelná a spolehlivá serverová řešení pro váš byznys",
            cta: {
              label: "Zobrazit řešení",
              href: "/services"
            }
          }
        ]
      }
    },
    about: {
      title: "O nás",
      subtitle: "Budujeme budoucnost s technologií",
      description: "Jsme tým vášnivých vývojářů a designérů, kteří vytvářejí špičková digitální řešení.",
      team: {
        title: "Náš tým",
        members: [
          {
            name: "Illia Khromov",
            role: "Vedoucí vývojář",
            experience: "5+ let"
          }
        ]
      },
      mission: {
        title: "Naše mise",
        description: "Poskytovat výjimečné digitální zážitky prostřednictvím inovativních technologických řešení."
      },
      innovations: {
        title: "Inovace",
        description: "Zůstáváme v čele technologie, abychom poskytovali špičková řešení."
      },
      achievements: {
        title: "Úspěchy",
        description: "Úspěšné projekty dodané s výjimečnou kvalitou a výkonem."
      }
    },
    challenges: {
      title: "Problémy, které řešíme",
      subtitle: "Od konceptu k digitální realitě",
      items: [
        {
          title: "Webový vývoj",
          description: "Moderní, responzivní webové stránky a aplikace"
        },
        {
          title: "Mobilní řešení",
          description: "Cross-platform mobilní aplikace"
        },
        {
          title: "Integrace systémů",
          description: "Bezproblémová integrace podnikových systémů"
        }
      ]
    },
    services: {
      title: "Naše služby",
      subtitle: "Komplexní digitální řešení",
      items: [
        {
          title: "Webový vývoj",
          description: "Full-stack webové aplikace s moderními technologiemi",
          features: ["React/Next.js", "Node.js", "Návrh databáze", "Vývoj API"]
        },
        {
          title: "Mobilní vývoj",
          description: "Nativní a cross-platform mobilní aplikace",
          features: ["React Native", "iOS/Android", "Optimalizace App Store", "Výkon"]
        },
        {
          title: "Integrace systémů",
          description: "Integrace podnikových systémů a automatizace",
          features: ["Integrace API", "Migrace databáze", "Automatizace procesů", "Cloudová řešení"]
        }
      ]
    },
    contact: {
      title: "Kontaktujte nás",
      subtitle: "Pojďme spolu vytvořit něco úžasného",
      form: {
        name: {
          label: "Jméno",
          placeholder: "Vaše jméno"
        },
        email: {
          label: "Email",
          placeholder: "vas@email.cz"
        },
        message: {
          label: "Zpráva",
          placeholder: "Řekněte nám o vašem projektu..."
        },
        submit: "Odeslat zprávu"
      },
      info: {
        email: "contact@ikhsystems.com",
        phone: "+420 123 456 789",
        address: "Praha, Česká republika"
      }
    },
    seo: {
      home: {
        title: "IKH Systems - Inovativní IT řešení pro byznys",
        description: "Vytváříme moderní technologická řešení, která pomáhají společnostem dosáhnout nových výšin v digitální éře.",
        keywords: "IT řešení, webový vývoj, mobilní aplikace, softwarová řešení"
      },
      about: {
        title: "O nás - IKH Systems | Expertní vývojový tým",
        description: "Seznamte se s naším expertním vývojovým týmem. Specializujeme se na vytváření inovativních digitálních řešení.",
        keywords: "o nás, vývojový tým, IT experti, profil společnosti"
      },
      services: {
        title: "Služby - IKH Systems | Webový a mobilní vývoj",
        description: "Komplexní služby webového vývoje, mobilních aplikací a integrace systémů pro váš byznys.",
        keywords: "webový vývoj, mobilní vývoj, integrace systémů, IT služby"
      },
      contact: {
        title: "Kontakt - IKH Systems | Spojte se s námi",
        description: "Připraveni začít váš projekt? Kontaktujte náš expertní tým pro konzultaci a odhad projektu.",
        keywords: "kontakt, konzultace, odhad projektu, spojte se s námi"
      },
      logoPortfolio: {
        title: "Logo Portfolio - IKH Systems | Příklady práce",
        description: "Portfolio loga a brandingu od IKH Systems. Příklady práce a kreativních řešení.",
        keywords: "portfolio, loga, branding, příklady práce"
      }
    }
  },
  de: {
    common: {
      navigation: {
        home: "Startseite",
        about: "Über uns",
        services: "Dienstleistungen",
        contact: "Kontakt",
        logoPortfolio: "Logo-Portfolio"
      },
      actions: {
        learnMore: "Mehr erfahren",
        getStarted: "Loslegen",
        contactUs: "Kontakt aufnehmen",
        readMore: "Weiterlesen",
        close: "Schließen",
        submit: "Senden",
        cancel: "Abbrechen"
      },
      loading: "Lädt...",
      error: "Ein Fehler ist aufgetreten",
      success: "Erfolgreich abgeschlossen"
    },
    hero: {
      title: "IKH Systems",
      subtitle: "Innovative IT-Lösungen für Unternehmen",
      description: "Wir schaffen moderne technologische Lösungen, die Unternehmen dabei helfen, im digitalen Zeitalter neue Höhen zu erreichen.",
      cta: {
        primary: "Loslegen",
        secondary: "Mehr erfahren"
      },
      carousel: {
        slides: [
          {
            image: "/media/banner/hero-analytics.webp",
            alt: "Analytics-Dashboard mit Geschäftseinblicken und Datenvisualisierung",
            title: "Analytics & Einblicke",
            subtitle: "Verwandeln Sie Ihre Daten in umsetzbare Geschäftsintelligenz",
            cta: {
              label: "Analytics erkunden",
              href: "/services"
            }
          },
          {
            image: "/media/banner/ciber securaty.webp",
            alt: "Cybersicherheitsschild zum Schutz der digitalen Infrastruktur",
            title: "Cybersicherheit",
            subtitle: "Schützen Sie Ihr Unternehmen mit Sicherheitslösungen auf Unternehmensebene",
            cta: {
              label: "Unternehmen sichern",
              href: "/services"
            }
          },
          {
            image: "/media/banner/server.webp",
            alt: "Moderne Serverinfrastruktur und Cloud-Computing-Setup",
            title: "Infrastruktur",
            subtitle: "Skalierbare und zuverlässige Serverlösungen für Ihr Unternehmen",
            cta: {
              label: "Lösungen anzeigen",
              href: "/services"
            }
          }
        ]
      }
    },
    about: {
      title: "Über uns",
      subtitle: "Die Zukunft mit Technologie gestalten",
      description: "Wir sind ein Team leidenschaftlicher Entwickler und Designer, die hochmoderne digitale Lösungen schaffen.",
      team: {
        title: "Unser Team",
        members: [
          {
            name: "Illia Khromov",
            role: "Lead-Entwickler",
            experience: "5+ Jahre"
          }
        ]
      },
      mission: {
        title: "Unsere Mission",
        description: "Außergewöhnliche digitale Erfahrungen durch innovative Technologielösungen zu liefern."
      },
      innovations: {
        title: "Innovation",
        description: "Wir bleiben an der Spitze der Technologie, um hochmoderne Lösungen anzubieten."
      },
      achievements: {
        title: "Erfolge",
        description: "Erfolgreiche Projekte mit außergewöhnlicher Qualität und Leistung geliefert."
      }
    },
    challenges: {
      title: "Herausforderungen, die wir lösen",
      subtitle: "Vom Konzept zur digitalen Realität",
      items: [
        {
          title: "Webentwicklung",
          description: "Moderne, responsive Websites und Anwendungen"
        },
        {
          title: "Mobile Lösungen",
          description: "Plattformübergreifende mobile Anwendungen"
        },
        {
          title: "Systemintegration",
          description: "Nahtlose Integration von Unternehmenssystemen"
        }
      ]
    },
    services: {
      title: "Unsere Dienstleistungen",
      subtitle: "Umfassende digitale Lösungen",
      items: [
        {
          title: "Webentwicklung",
          description: "Full-Stack-Webanwendungen mit modernen Technologien",
          features: ["React/Next.js", "Node.js", "Datenbankdesign", "API-Entwicklung"]
        },
        {
          title: "Mobile Entwicklung",
          description: "Native und plattformübergreifende mobile Anwendungen",
          features: ["React Native", "iOS/Android", "App Store Optimierung", "Performance"]
        },
        {
          title: "Systemintegration",
          description: "Integration und Automatisierung von Unternehmenssystemen",
          features: ["API-Integration", "Datenbankmigration", "Prozessautomatisierung", "Cloud-Lösungen"]
        }
      ]
    },
    contact: {
      title: "Kontaktieren Sie uns",
      subtitle: "Lassen Sie uns gemeinsam etwas Großartiges schaffen",
      form: {
        name: {
          label: "Name",
          placeholder: "Ihr Name"
        },
        email: {
          label: "E-Mail",
          placeholder: "ihre@email.de"
        },
        message: {
          label: "Nachricht",
          placeholder: "Erzählen Sie uns von Ihrem Projekt..."
        },
        submit: "Nachricht senden"
      },
      info: {
        email: "contact@ikhsystems.com",
        phone: "+420 123 456 789",
        address: "Prag, Tschechische Republik"
      }
    },
    seo: {
      home: {
        title: "IKH Systems - Innovative IT-Lösungen für Unternehmen",
        description: "Wir schaffen moderne technologische Lösungen, die Unternehmen dabei helfen, im digitalen Zeitalter neue Höhen zu erreichen.",
        keywords: "IT-Lösungen, Webentwicklung, mobile Anwendungen, Softwarelösungen"
      },
      about: {
        title: "Über uns - IKH Systems | Expertelles Entwicklungsteam",
        description: "Lernen Sie unser expertelles Entwicklungsteam kennen. Wir spezialisieren uns auf innovative digitale Lösungen.",
        keywords: "über uns, Entwicklungsteam, IT-Experten, Unternehmensprofil"
      },
      services: {
        title: "Dienstleistungen - IKH Systems | Web- & Mobile-Entwicklung",
        description: "Umfassende Webentwicklung, mobile Anwendungen und Systemintegrationsdienste für Ihr Unternehmen.",
        keywords: "Webentwicklung, mobile Entwicklung, Systemintegration, IT-Dienstleistungen"
      },
      contact: {
        title: "Kontakt - IKH Systems | Nehmen Sie Kontakt auf",
        description: "Bereit, Ihr Projekt zu starten? Kontaktieren Sie unser Expertenteam für Beratung und Projektschätzungen.",
        keywords: "Kontakt, Beratung, Projektschätzung, Kontakt aufnehmen"
      },
      logoPortfolio: {
        title: "Logo-Portfolio - IKH Systems | Arbeitsbeispiele",
        description: "Logo- und Branding-Portfolio von IKH Systems. Beispiele für Arbeit und kreative Lösungen.",
        keywords: "Portfolio, Logos, Branding, Arbeitsbeispiele"
      }
    }
  }
}

// Utility function to get translations for a specific language
export function getTranslation(lang: Language): TranslationDictionary {
  return translations[lang] || translations[defaultLocale]
}

// Utility function to check if a language is supported
export function isSupportedLanguage(lang: string): lang is Language {
  return locales.includes(lang as Language)
}