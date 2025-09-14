import { Language } from '@/types'

// Supported languages
export const locales: Language[] = ['cs', 'en', 'de', 'ua']
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
    headline: string
    subtitle: string
    description: string
    cta: {
      primary: string
      secondary?: string
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
    badge: string
    items: Array<{
      title: string
      description: string
      features: string[]
    }>
    analytics: {
      title: string
      subtitle: string
      description: string
      features: Array<{
        title: string
        description: string
      }>
      cta: string
    }
    cybersecurity: {
      title: string
      subtitle: string
      description: string
      features: Array<{
        title: string
        description: string
      }>
      cta: string
    }
    infrastructure: {
      title: string
      subtitle: string
      description: string
      features: Array<{
        title: string
        description: string
      }>
      cta: string
    }
    detailedFeatures: {
      web: Array<{
        title: string
        description: string
      }>
      mobile: Array<{
        title: string
        description: string
      }>
      integration: Array<{
        title: string
        description: string
      }>
    }
  }
  contact: {
    title: string
    subtitle: string
    team: {
      title: string
      subtitle: string
      members: Array<{
        name: string
        position: string
        description: string
        image: string
      }>
    }
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
  locations: {
    praha: {
      title: string
      description: string
      keywords: string
    }
    brno: {
      title: string
      description: string
      keywords: string
    }
    ostrava: {
      title: string
      description: string
      keywords: string
    }
    plzen: {
      title: string
      description: string
      keywords: string
    }
    liberec: {
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
      headline: "Technologies that drive outcomes",
      subtitle: "We create modern technological solutions that help companies reach new heights in the digital age.",
      description: "We create modern technological solutions that help companies reach new heights in the digital age.",
      cta: {
        primary: "Contact Us"
      },
      carousel: {
        slides: [
          {
            image: "/media/banner/1.webp",
            alt: "Modern web development with React and Next.js frameworks",
            title: "Web Development",
            subtitle: "Full-stack web applications with modern technologies",
            cta: {
              label: "Explore Web Development",
              href: "/services#service-1"
            }
          },
          {
            image: "/media/banner/2.webp",
            alt: "Mobile app development for iOS and Android platforms",
            title: "Mobile Development",
            subtitle: "Native and cross-platform mobile applications",
            cta: {
              label: "Discover Mobile Apps",
              href: "/services#service-2"
            }
          },
          {
            image: "/media/banner/3.webp",
            alt: "System integration and API development for enterprise solutions",
            title: "System Integration",
            subtitle: "Enterprise system integration and automation",
            cta: {
              label: "Learn About Integration",
              href: "/services#service-3"
            }
          },
          {
            image: "/media/banner/hero-analytics.webp",
            alt: "Analytics dashboard showing business insights and data visualization",
            title: "Analytics & Insights",
            subtitle: "Transform your data into actionable business intelligence",
            cta: {
              label: "Explore Analytics",
              href: "/services#analytics"
            }
          },
          {
            image: "/media/banner/ciber securaty.webp",
            alt: "Cybersecurity shield protecting digital infrastructure",
            title: "Cybersecurity",
            subtitle: "Protect your business with enterprise-grade security solutions",
            cta: {
              label: "Secure Your Business",
              href: "/services#cybersecurity"
            }
          },
          {
            image: "/media/banner/server.webp",
            alt: "Modern server infrastructure and cloud computing setup",
            title: "Infrastructure",
            subtitle: "Scalable and reliable server solutions for your business",
            cta: {
              label: "View Solutions",
              href: "/services#infrastructure"
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
      title: "We turn complex tech challenges into clear, reliable outcomes.",
      subtitle: "",
      items: [
        {
          title: "Reduce operating overhead",
          description: "We simplify processes and systems, so your business runs steadier with lower costs."
        },
        {
          title: "Acquire customers more effectively",
          description: "We align analytics and marketing so the customer journey feels unified and brings results."
        },
        {
          title: "Launch faster with reliable engineering",
          description: "From idea to product with predictable timelines and confident quality."
        },
        {
          title: "Keep systems resilient and secure",
          description: "We harden infrastructure and protect data so the business runs without disruptions."
        }
      ]
    },
    services: {
      title: "Our Services",
      subtitle: "Comprehensive Digital Solutions",
      badge: "Our Services",
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
      ],
      analytics: {
        title: "Analytics & Insights",
        subtitle: "Transform Your Data Into Actionable Intelligence",
        description: "Unlock the power of your data with our comprehensive analytics solutions. Get real-time insights, predictive analytics, and data visualization that drive business growth.",
        features: [
          { title: "Real-time Dashboards", description: "Live data visualization and monitoring" },
          { title: "Predictive Analytics", description: "AI-powered forecasting and trends" },
          { title: "Custom Reports", description: "Tailored insights for your business" },
          { title: "Data Integration", description: "Connect all your data sources" }
        ],
        cta: "Get Analytics Solution"
      },
      cybersecurity: {
        title: "Cybersecurity",
        subtitle: "Protect Your Business with Enterprise-Grade Security",
        description: "Comprehensive cybersecurity solutions to safeguard your digital assets. From threat detection to incident response, we keep your business secure.",
        features: [
          { title: "Threat Detection", description: "Advanced monitoring and alerting" },
          { title: "Security Audits", description: "Comprehensive vulnerability assessments" },
          { title: "Incident Response", description: "Rapid response to security breaches" },
          { title: "Compliance", description: "Meet industry security standards" }
        ],
        cta: "Secure Your Business"
      },
      infrastructure: {
        title: "Infrastructure",
        subtitle: "Scalable and Reliable Server Solutions",
        description: "Modern infrastructure solutions that scale with your business. From cloud migration to server optimization, we ensure your systems run smoothly.",
        features: [
          { title: "Cloud Migration", description: "Seamless transition to cloud platforms" },
          { title: "Server Optimization", description: "Performance tuning and monitoring" },
          { title: "Backup Solutions", description: "Automated backup and disaster recovery" },
          { title: "24/7 Monitoring", description: "Round-the-clock system monitoring" }
        ],
        cta: "View Solutions"
      },
      detailedFeatures: {
        web: [
          { title: "React/Next.js", description: "Modern frontend frameworks for dynamic web applications" },
          { title: "Node.js", description: "Powerful backend development with JavaScript" },
          { title: "Database Design", description: "Optimized database architecture and management" },
          { title: "API Development", description: "RESTful APIs and microservices architecture" }
        ],
        mobile: [
          { title: "React Native", description: "Cross-platform mobile app development" },
          { title: "iOS/Android", description: "Native mobile applications for both platforms" },
          { title: "App Store Optimization", description: "Maximize app visibility and downloads" },
          { title: "Performance", description: "Optimized performance and user experience" }
        ],
        integration: [
          { title: "API Integration", description: "Seamless connection between different systems" },
          { title: "Database Migration", description: "Safe and efficient data migration processes" },
          { title: "Process Automation", description: "Streamline business workflows and operations" },
          { title: "Cloud Solutions", description: "Scalable cloud infrastructure and services" }
        ]
      }
    },
    contact: {
      title: "Contact Us",
      subtitle: "Let's Build Something Amazing Together",
      team: {
        title: "Our Team",
        subtitle: "The experts behind your success",
        members: [
          {
            name: "Alex Johnson",
            position: "Lead Developer",
            description: "Full-stack developer with 8+ years of experience in React, Node.js, and cloud technologies.",
            image: "/team/alex-johnson.jpg"
          },
          {
            name: "Maria Rodriguez",
            position: "UI/UX Designer",
            description: "Creative designer specializing in user experience and modern web interfaces.",
            image: "/team/maria-rodriguez.jpg"
          },
          {
            name: "David Chen",
            position: "Project Manager",
            description: "Experienced project manager ensuring smooth delivery and client satisfaction.",
            image: "/team/david-chen.jpg"
          }
        ]
      },
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
    },
    locations: {
      praha: {
        title: "Web Development and Web Design in Prague | IKH Systems",
        description: "Professional web development and web design services in Prague. We create modern websites that help local businesses grow and attract customers. Our Prague-based team understands the local market and delivers results.",
        keywords: "web development Prague, web design Prague, website creation Prague, digital agency Prague"
      },
      brno: {
        title: "Web Development and Web Design in Brno | IKH Systems",
        description: "Expert web development and web design services in Brno. We help local businesses establish strong online presence with modern, responsive websites optimized for search engines.",
        keywords: "web development Brno, web design Brno, website creation Brno, digital agency Brno"
      },
      ostrava: {
        title: "Web Development and Web Design in Ostrava | IKH Systems",
        description: "Professional web development and web design services in Ostrava. We specialize in creating websites for industrial companies, shops, restaurants, and services in the Moravian-Silesian region.",
        keywords: "web development Ostrava, web design Ostrava, website creation Ostrava, digital agency Ostrava"
      },
      plzen: {
        title: "Web Development and Web Design in Plzeň | IKH Systems",
        description: "Quality web development and web design services in Plzeň. We create modern websites for local businesses, helping them increase their online presence and attract new customers.",
        keywords: "web development Plzeň, web design Plzeň, website creation Plzeň, digital agency Plzeň"
      },
      liberec: {
        title: "Web Development and Web Design in Liberec | IKH Systems",
        description: "Professional web development and web design services in Liberec. We help local businesses in the Liberec region establish strong online presence with modern, SEO-optimized websites.",
        keywords: "web development Liberec, web design Liberec, website creation Liberec, digital agency Liberec"
      }
    }
  },
  cs: {
    common: {
      navigation: {
        home: "Domů",
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
      headline: "Technologie, které přinášejí výsledky",
      subtitle: "Vytváříme moderní technologická řešení, která pomáhají společnostem dosáhnout nových výšin v digitální éře.",
      description: "Vytváříme moderní technologická řešení, která pomáhají společnostem dosáhnout nových výšin v digitální éře.",
      cta: {
        primary: "Kontaktujte nás"
      },
      carousel: {
        slides: [
          {
            image: "/media/banner/1.webp",
            alt: "Moderní webový vývoj s React a Next.js frameworky",
            title: "Webový vývoj",
            subtitle: "Full-stack webové aplikace s moderními technologiemi",
            cta: {
              label: "Prozkoumat webový vývoj",
              href: "/services#service-1"
            }
          },
          {
            image: "/media/banner/2.webp",
            alt: "Vývoj mobilních aplikací pro iOS a Android platformy",
            title: "Mobilní vývoj",
            subtitle: "Nativní a multiplatformní mobilní aplikace",
            cta: {
              label: "Objevit mobilní aplikace",
              href: "/services#service-2"
            }
          },
          {
            image: "/media/banner/3.webp",
            alt: "Systémová integrace a API vývoj pro podniková řešení",
            title: "Systémová integrace",
            subtitle: "Podniková systémová integrace a automatizace",
            cta: {
              label: "Dozvědět se o integraci",
              href: "/services#service-3"
            }
          },
          {
            image: "/media/banner/hero-analytics.webp",
            alt: "Analytický dashboard zobrazující obchodní přehledy a vizualizaci dat",
            title: "Analytika & Přehledy",
            subtitle: "Transformujte svá data na akční obchodní inteligenci",
            cta: {
              label: "Prozkoumat analytiku",
              href: "/services#analytics"
            }
          },
          {
            image: "/media/banner/ciber securaty.webp",
            alt: "Kybernetický štít chránící digitální infrastrukturu",
            title: "Kybernetická bezpečnost",
            subtitle: "Chraňte svůj byznys řešeními na úrovni podniku",
            cta: {
              label: "Zabezpečit byznys",
              href: "/services#cybersecurity"
            }
          },
          {
            image: "/media/banner/server.webp",
            alt: "Moderní serverová infrastruktura a cloudové řešení",
            title: "Infrastruktura",
            subtitle: "Škálovatelná a spolehlivá serverová řešení pro váš byznys",
            cta: {
              label: "Zobrazit řešení",
              href: "/services#infrastructure"
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
      title: "Přeměňujeme složité technické výzvy na jasné a spolehlivé výsledky.",
      subtitle: "",
      items: [
        {
          title: "Snížit provozní náklady",
          description: "Zjednodušujeme procesy a systémy, takže váš podnik funguje stabilněji s nižšími náklady."
        },
        {
          title: "Získat zákazníky efektivněji",
          description: "Sjednocujeme analytiku a marketing, takže cesta zákazníka působí jednotně a přináší výsledky."
        },
        {
          title: "Spustit rychleji se spolehlivým inženýrstvím",
          description: "Od nápadu k produktu s předvídatelnými termíny a jistou kvalitou."
        },
        {
          title: "Udržet systémy odolné a bezpečné",
          description: "Posilujeme infrastrukturu a chráníme data, takže podnik funguje bez přerušení."
        }
      ]
    },
    services: {
      title: "Naše služby",
      subtitle: "Komplexní digitální řešení",
      badge: "Naše služby",
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
      ],
      analytics: {
        title: "Analytika a přehledy",
        subtitle: "Transformujte svá data na akční inteligenci",
        description: "Odemkněte sílu svých dat s našimi komplexními analytickými řešeními. Získejte přehledy v reálném čase, prediktivní analýzu a vizualizaci dat, které podporují růst podnikání.",
        features: [
          { title: "Dashboardy v reálném čase", description: "Vizualizace a monitorování živých dat" },
          { title: "Prediktivní analýza", description: "Předpovědi a trendy poháněné AI" },
          { title: "Vlastní reporty", description: "Přizpůsobené přehledy pro váš byznys" },
          { title: "Integrace dat", description: "Propojte všechny své zdroje dat" }
        ],
        cta: "Získat analytické řešení"
      },
      cybersecurity: {
        title: "Kybernetická bezpečnost",
        subtitle: "Chraňte svůj byznys s bezpečností na podnikové úrovni",
        description: "Komplexní řešení kybernetické bezpečnosti pro ochranu vašich digitálních aktiv. Od detekce hrozeb po reakci na incidenty, udržujeme váš byznys v bezpečí.",
        features: [
          { title: "Detekce hrozeb", description: "Pokročilé monitorování a upozornění" },
          { title: "Bezpečnostní audity", description: "Komplexní hodnocení zranitelností" },
          { title: "Reakce na incidenty", description: "Rychlá reakce na bezpečnostní narušení" },
          { title: "Dodržování předpisů", description: "Splňte průmyslové bezpečnostní standardy" }
        ],
        cta: "Zabezpečit byznys"
      },
      infrastructure: {
        title: "Infrastruktura",
        subtitle: "Škálovatelná a spolehlivá serverová řešení",
        description: "Moderní infrastrukturní řešení, která se škálují s vaším byznysem. Od migrace do cloudu po optimalizaci serverů, zajišťujeme hladký chod vašich systémů.",
        features: [
          { title: "Migrace do cloudu", description: "Plynulý přechod na cloudové platformy" },
          { title: "Optimalizace serverů", description: "Ladění výkonu a monitorování" },
          { title: "Řešení zálohování", description: "Automatizované zálohování a obnova po havárii" },
          { title: "24/7 monitorování", description: "Nepřetržité monitorování systémů" }
        ],
        cta: "Zobrazit řešení"
      },
      detailedFeatures: {
        web: [
          { title: "React/Next.js", description: "Moderní frontend frameworky pro dynamické webové aplikace" },
          { title: "Node.js", description: "Výkonný backend vývoj s JavaScriptem" },
          { title: "Návrh databáze", description: "Optimalizovaná architektura a správa databáze" },
          { title: "Vývoj API", description: "RESTful API a architektura mikroslužeb" }
        ],
        mobile: [
          { title: "React Native", description: "Cross-platform vývoj mobilních aplikací" },
          { title: "iOS/Android", description: "Nativní mobilní aplikace pro obě platformy" },
          { title: "Optimalizace App Store", description: "Maximalizujte viditelnost a stahování aplikací" },
          { title: "Výkon", description: "Optimalizovaný výkon a uživatelská zkušenost" }
        ],
        integration: [
          { title: "Integrace API", description: "Plynulé propojení mezi různými systémy" },
          { title: "Migrace databáze", description: "Bezpečné a efektivní procesy migrace dat" },
          { title: "Automatizace procesů", description: "Zjednodušte pracovní postupy a operace byznysu" },
          { title: "Cloudová řešení", description: "Škálovatelná cloudová infrastruktura a služby" }
        ]
      }
    },
    contact: {
      title: "Kontaktujte nás",
      subtitle: "Pojďme spolu vytvořit něco úžasného",
      team: {
        title: "Náš tým",
        subtitle: "Expertí za vaším úspěchem",
        members: [
          {
            name: "Alex Johnson",
            position: "Hlavní vývojář",
            description: "Full-stack vývojář s 8+ lety zkušeností v React, Node.js a cloudových technologiích.",
            image: "/team/alex-johnson.jpg"
          },
          {
            name: "Maria Rodriguez",
            position: "UI/UX Designérka",
            description: "Kreativní designérka specializující se na uživatelskou zkušenost a moderní webová rozhraní.",
            image: "/team/maria-rodriguez.jpg"
          },
          {
            name: "David Chen",
            position: "Projektový manažer",
            description: "Zkušený projektový manažer zajišťující plynulé dodání a spokojenost klientů.",
            image: "/team/david-chen.jpg"
          }
        ]
      },
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
    },
    locations: {
      praha: {
        title: "Tvorba webových stránek a webdesign v Praze | IKH Systems",
        description: "Profesionální tvorba webu Praha a webdesign Praha. Vytváříme moderní webové stránky, které pomáhají místním podnikům růst a přitahovat zákazníky. Náš pražský tým rozumí místnímu trhu a přináší výsledky.",
        keywords: "tvorba webu Praha, webdesign Praha, vytvoření webu Praha, digitální agentura Praha"
      },
      brno: {
        title: "Tvorba webových stránek a webdesign v Brně | IKH Systems",
        description: "Expertní tvorba webu Brno a webdesign Brno. Pomáháme místním podnikům vytvořit silnou online přítomnost s moderními, responzivními weby optimalizovanými pro vyhledávače.",
        keywords: "tvorba webu Brno, webdesign Brno, vytvoření webu Brno, digitální agentura Brno"
      },
      ostrava: {
        title: "Tvorba webových stránek a webdesign v Ostravě | IKH Systems",
        description: "Profesionální tvorba webu Ostrava a webdesign Ostrava. Specializujeme se na vytváření webů pro průmyslové podniky, obchody, restaurace a služby v Moravskoslezském kraji.",
        keywords: "tvorba webu Ostrava, webdesign Ostrava, vytvoření webu Ostrava, digitální agentura Ostrava"
      },
      plzen: {
        title: "Tvorba webových stránek a webdesign v Plzni | IKH Systems",
        description: "Kvalitní tvorba webu Plzeň a webdesign Plzeň. Vytváříme moderní webové stránky pro místní podniky, pomáháme jim zvýšit online přítomnost a přitáhnout nové zákazníky.",
        keywords: "tvorba webu Plzeň, webdesign Plzeň, vytvoření webu Plzeň, digitální agentura Plzeň"
      },
      liberec: {
        title: "Tvorba webových stránek a webdesign v Liberci | IKH Systems",
        description: "Profesionální tvorba webu Liberec a webdesign Liberec. Pomáháme místním podnikům v Libereckém kraji vytvořit silnou online přítomnost s moderními, SEO optimalizovanými weby.",
        keywords: "tvorba webu Liberec, webdesign Liberec, vytvoření webu Liberec, digitální agentura Liberec"
      }
    }
  },
  de: {
    common: {
      navigation: {
        home: "Startseite",
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
      headline: "Technologien, die Ergebnisse bringen",
      subtitle: "Wir schaffen moderne technologische Lösungen, die Unternehmen dabei helfen, im digitalen Zeitalter neue Höhen zu erreichen.",
      description: "Wir schaffen moderne technologische Lösungen, die Unternehmen dabei helfen, im digitalen Zeitalter neue Höhen zu erreichen.",
      cta: {
        primary: "Kontaktieren Sie uns"
      },
      carousel: {
        slides: [
          {
            image: "/media/banner/1.webp",
            alt: "Moderne Webentwicklung mit React und Next.js Frameworks",
            title: "Webentwicklung",
            subtitle: "Full-Stack-Webanwendungen mit modernen Technologien",
            cta: {
              label: "Webentwicklung erkunden",
              href: "/services#service-1"
            }
          },
          {
            image: "/media/banner/2.webp",
            alt: "Mobile App-Entwicklung für iOS und Android Plattformen",
            title: "Mobile Entwicklung",
            subtitle: "Native und plattformübergreifende mobile Anwendungen",
            cta: {
              label: "Mobile Apps entdecken",
              href: "/services#service-2"
            }
          },
          {
            image: "/media/banner/3.webp",
            alt: "Systemintegration und API-Entwicklung für Unternehmenslösungen",
            title: "Systemintegration",
            subtitle: "Unternehmenssystemintegration und Automatisierung",
            cta: {
              label: "Über Integration erfahren",
              href: "/services#service-3"
            }
          },
          {
            image: "/media/banner/hero-analytics.webp",
            alt: "Analytics-Dashboard mit Geschäftseinblicken und Datenvisualisierung",
            title: "Analytics & Einblicke",
            subtitle: "Verwandeln Sie Ihre Daten in umsetzbare Geschäftsintelligenz",
            cta: {
              label: "Analytics erkunden",
              href: "/services#analytics"
            }
          },
          {
            image: "/media/banner/ciber securaty.webp",
            alt: "Cybersicherheitsschild zum Schutz der digitalen Infrastruktur",
            title: "Cybersicherheit",
            subtitle: "Schützen Sie Ihr Unternehmen mit Sicherheitslösungen auf Unternehmensebene",
            cta: {
              label: "Unternehmen sichern",
              href: "/services#cybersecurity"
            }
          },
          {
            image: "/media/banner/server.webp",
            alt: "Moderne Serverinfrastruktur und Cloud-Computing-Setup",
            title: "Infrastruktur",
            subtitle: "Skalierbare und zuverlässige Serverlösungen für Ihr Unternehmen",
            cta: {
              label: "Lösungen anzeigen",
              href: "/services#infrastructure"
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
      title: "Wir verwandeln komplexe technische Herausforderungen in klare, zuverlässige Ergebnisse.",
      subtitle: "",
      items: [
        {
          title: "Betriebskosten reduzieren",
          description: "Wir vereinfachen Prozesse und Systeme, damit Ihr Unternehmen stabiler mit niedrigeren Kosten läuft."
        },
        {
          title: "Kunden effektiver gewinnen",
          description: "Wir richten Analytics und Marketing aus, damit die Customer Journey einheitlich wirkt und Ergebnisse bringt."
        },
        {
          title: "Schneller mit zuverlässigem Engineering starten",
          description: "Von der Idee zum Produkt mit vorhersagbaren Zeitplänen und vertrauensvoller Qualität."
        },
        {
          title: "Systeme widerstandsfähig und sicher halten",
          description: "Wir härten die Infrastruktur ab und schützen Daten, damit das Geschäft ohne Unterbrechungen läuft."
        }
      ]
    },
    services: {
      title: "Unsere Dienstleistungen",
      subtitle: "Umfassende digitale Lösungen",
      badge: "Unsere Dienstleistungen",
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
      ],
      analytics: {
        title: "Analytik und Einblicke",
        subtitle: "Verwandeln Sie Ihre Daten in umsetzbare Intelligenz",
        description: "Entfesseln Sie die Macht Ihrer Daten mit unseren umfassenden Analyselösungen. Erhalten Sie Echtzeit-Einblicke, prädiktive Analytik und Datenvisualisierung, die das Geschäftswachstum vorantreiben.",
        features: [
          { title: "Echtzeit-Dashboards", description: "Live-Datenvisualisierung und -überwachung" },
          { title: "Prädiktive Analytik", description: "KI-gestützte Prognosen und Trends" },
          { title: "Benutzerdefinierte Berichte", description: "Maßgeschneiderte Einblicke für Ihr Unternehmen" },
          { title: "Datenintegration", description: "Verbinden Sie alle Ihre Datenquellen" }
        ],
        cta: "Analyselösung erhalten"
      },
      cybersecurity: {
        title: "Cybersicherheit",
        subtitle: "Schützen Sie Ihr Unternehmen mit Unternehmenssicherheit",
        description: "Umfassende Cybersicherheitslösungen zum Schutz Ihrer digitalen Assets. Von der Bedrohungserkennung bis zur Incident Response halten wir Ihr Unternehmen sicher.",
        features: [
          { title: "Bedrohungserkennung", description: "Erweiterte Überwachung und Benachrichtigung" },
          { title: "Sicherheitsaudits", description: "Umfassende Schwachstellenbewertungen" },
          { title: "Incident Response", description: "Schnelle Reaktion auf Sicherheitsverletzungen" },
          { title: "Compliance", description: "Erfüllen Sie Branchensicherheitsstandards" }
        ],
        cta: "Unternehmen sichern"
      },
      infrastructure: {
        title: "Infrastruktur",
        subtitle: "Skalierbare und zuverlässige Serverlösungen",
        description: "Moderne Infrastrukturlösungen, die mit Ihrem Unternehmen wachsen. Von der Cloud-Migration bis zur Serveroptimierung sorgen wir für einen reibungslosen Betrieb Ihrer Systeme.",
        features: [
          { title: "Cloud-Migration", description: "Nahtloser Übergang zu Cloud-Plattformen" },
          { title: "Serveroptimierung", description: "Leistungsoptimierung und -überwachung" },
          { title: "Backup-Lösungen", description: "Automatisierte Backups und Disaster Recovery" },
          { title: "24/7-Überwachung", description: "Rund-um-die-Uhr-Systemüberwachung" }
        ],
        cta: "Lösungen anzeigen"
      },
      detailedFeatures: {
        web: [
          { title: "React/Next.js", description: "Moderne Frontend-Frameworks für dynamische Webanwendungen" },
          { title: "Node.js", description: "Leistungsstarke Backend-Entwicklung mit JavaScript" },
          { title: "Datenbankdesign", description: "Optimierte Datenbankarchitektur und -verwaltung" },
          { title: "API-Entwicklung", description: "RESTful APIs und Microservices-Architektur" }
        ],
        mobile: [
          { title: "React Native", description: "Plattformübergreifende mobile App-Entwicklung" },
          { title: "iOS/Android", description: "Native mobile Anwendungen für beide Plattformen" },
          { title: "App Store Optimierung", description: "Maximieren Sie App-Sichtbarkeit und Downloads" },
          { title: "Performance", description: "Optimierte Leistung und Benutzererfahrung" }
        ],
        integration: [
          { title: "API-Integration", description: "Nahtlose Verbindung zwischen verschiedenen Systemen" },
          { title: "Datenbankmigration", description: "Sichere und effiziente Datenmigrationsprozesse" },
          { title: "Prozessautomatisierung", description: "Streamline Geschäftsworkflows und -operationen" },
          { title: "Cloud-Lösungen", description: "Skalierbare Cloud-Infrastruktur und -dienste" }
        ]
      }
    },
    contact: {
      title: "Kontaktieren Sie uns",
      subtitle: "Lassen Sie uns gemeinsam etwas Großartiges schaffen",
      team: {
        title: "Unser Team",
        subtitle: "Die Experten hinter Ihrem Erfolg",
        members: [
          {
            name: "Alex Johnson",
            position: "Lead-Entwickler",
            description: "Full-Stack-Entwickler mit 8+ Jahren Erfahrung in React, Node.js und Cloud-Technologien.",
            image: "/team/alex-johnson.jpg"
          },
          {
            name: "Maria Rodriguez",
            position: "UI/UX-Designerin",
            description: "Kreative Designerin, spezialisiert auf Benutzererfahrung und moderne Web-Interfaces.",
            image: "/team/maria-rodriguez.jpg"
          },
          {
            name: "David Chen",
            position: "Projektmanager",
            description: "Erfahrener Projektmanager, der für reibungslose Lieferung und Kundenzufriedenheit sorgt.",
            image: "/team/david-chen.jpg"
          }
        ]
      },
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
    },
    locations: {
      praha: {
        title: "Webentwicklung und Webdesign in Prag | IKH Systems",
        description: "Professionelle Webentwicklung und Webdesign-Services in Prag. Wir erstellen moderne Websites, die lokalen Unternehmen beim Wachstum und bei der Kundenakquise helfen. Unser Prager Team versteht den lokalen Markt und liefert Ergebnisse.",
        keywords: "Webentwicklung Prag, Webdesign Prag, Website-Erstellung Prag, Digitalagentur Prag"
      },
      brno: {
        title: "Webentwicklung und Webdesign in Brünn | IKH Systems",
        description: "Experten-Webentwicklung und Webdesign-Services in Brünn. Wir helfen lokalen Unternehmen, eine starke Online-Präsenz mit modernen, suchmaschinenoptimierten responsiven Websites aufzubauen.",
        keywords: "Webentwicklung Brünn, Webdesign Brünn, Website-Erstellung Brünn, Digitalagentur Brünn"
      },
      ostrava: {
        title: "Webentwicklung und Webdesign in Ostrava | IKH Systems",
        description: "Professionelle Webentwicklung und Webdesign-Services in Ostrava. Wir spezialisieren uns auf die Erstellung von Websites für Industrieunternehmen, Geschäfte, Restaurants und Dienstleister in der Mährisch-Schlesischen Region.",
        keywords: "Webentwicklung Ostrava, Webdesign Ostrava, Website-Erstellung Ostrava, Digitalagentur Ostrava"
      },
      plzen: {
        title: "Webentwicklung und Webdesign in Pilsen | IKH Systems",
        description: "Qualitativ hochwertige Webentwicklung und Webdesign-Services in Pilsen. Wir erstellen moderne Websites für lokale Unternehmen und helfen ihnen, ihre Online-Präsenz zu stärken und neue Kunden zu gewinnen.",
        keywords: "Webentwicklung Pilsen, Webdesign Pilsen, Website-Erstellung Pilsen, Digitalagentur Pilsen"
      },
      liberec: {
        title: "Webentwicklung und Webdesign in Reichenberg | IKH Systems",
        description: "Professionelle Webentwicklung und Webdesign-Services in Reichenberg. Wir helfen lokalen Unternehmen in der Reichenberger Region, eine starke Online-Präsenz mit modernen, SEO-optimierten Websites aufzubauen.",
        keywords: "Webentwicklung Reichenberg, Webdesign Reichenberg, Website-Erstellung Reichenberg, Digitalagentur Reichenberg"
      }
    }
  },
  ua: {
    common: {
      navigation: {
        home: "Головна",
        services: "Послуги",
        contact: "Контакти",
        logoPortfolio: "Портфоліо логотипів"
      },
      actions: {
        learnMore: "Дізнатися більше",
        getStarted: "Почати",
        contactUs: "Зв'язатися з нами",
        readMore: "Читати далі",
        close: "Закрити",
        submit: "Надіслати",
        cancel: "Скасувати"
      },
      loading: "Завантаження...",
      error: "Сталася помилка",
      success: "Успішно виконано"
    },
    hero: {
      title: "IKH Systems",
      headline: "Технології, які приносять результати",
      subtitle: "Ми створюємо сучасні технологічні рішення, які допомагають компаніям досягати нових висот у цифрову епоху.",
      description: "Ми створюємо сучасні технологічні рішення, які допомагають компаніям досягати нових висот у цифрову епоху.",
      cta: {
        primary: "Зв'яжіться з нами"
      },
      carousel: {
        slides: [
          {
            image: "/media/banner/1.webp",
            alt: "Сучасна веб-розробка з React та Next.js фреймворками",
            title: "Веб-розробка",
            subtitle: "Full-stack веб-додатки з сучасними технологіями",
            cta: {
              label: "Дослідити веб-розробку",
              href: "/services#service-1"
            }
          },
          {
            image: "/media/banner/2.webp",
            alt: "Розробка мобільних додатків для iOS та Android платформ",
            title: "Мобільна розробка",
            subtitle: "Нативні та крос-платформні мобільні додатки",
            cta: {
              label: "Відкрити мобільні додатки",
              href: "/services#service-2"
            }
          },
          {
            image: "/media/banner/3.webp",
            alt: "Системна інтеграція та API розробка для корпоративних рішень",
            title: "Системна інтеграція",
            subtitle: "Корпоративна системна інтеграція та автоматизація",
            cta: {
              label: "Дізнатися про інтеграцію",
              href: "/services#service-3"
            }
          },
          {
            image: "/media/banner/hero-analytics.webp",
            alt: "Дашборд аналітики з бізнес-аналітикою та візуалізацією даних",
            title: "Аналітика та інсайти",
            subtitle: "Перетворіть свої дані на дієві бізнес-рішення",
            cta: {
              label: "Досліджувати аналітику",
              href: "/services#analytics"
            }
          },
          {
            image: "/media/banner/ciber securaty.webp",
            alt: "Щит кібербезпеки для захисту цифрової інфраструктури",
            title: "Кібербезпека",
            subtitle: "Захистіть свій бізнес рішеннями корпоративного рівня",
            cta: {
              label: "Захистити бізнес",
              href: "/services#cybersecurity"
            }
          },
          {
            image: "/media/banner/server.webp",
            alt: "Сучасна серверна інфраструктура та хмарні обчислення",
            title: "Інфраструктура",
            subtitle: "Масштабовані та надійні серверні рішення для вашого бізнесу",
            cta: {
              label: "Переглянути рішення",
              href: "/services#infrastructure"
            }
          }
        ]
      }
    },
    about: {
      title: "Про нас",
      subtitle: "Будуємо майбутнє з технологіями",
      description: "Ми команда пристрасних розробників та дизайнерів, які створюють передові цифрові рішення.",
      team: {
        title: "Наша команда",
        members: [
          {
            name: "Ілля Хромов",
            role: "Головний розробник",
            experience: "5+ років"
          }
        ]
      },
      mission: {
        title: "Наша місія",
        description: "Надавати виняткові цифрові рішення через інноваційні технологічні підходи."
      },
      innovations: {
        title: "Інновації",
        description: "Ми залишаємося на передовій технологій, щоб пропонувати найсучасніші рішення."
      },
      achievements: {
        title: "Досягнення",
        description: "Успішні проекти з винятковою якістю та продуктивністю."
      }
    },
    challenges: {
      title: "Ми перетворюємо складні технічні виклики на чіткі та надійні результати.",
      subtitle: "",
      items: [
        {
          title: "Зменшити операційні витрати",
          description: "Ми спрощуємо процеси та системи, щоб ваш бізнес працював стабільніше з меншими витратами."
        },
        {
          title: "Ефективніше залучати клієнтів",
          description: "Ми узгоджуємо аналітику та маркетинг, щоб шлях клієнта відчувався єдиним і приносив результати."
        },
        {
          title: "Швидше запускати з надійною інженерією",
          description: "Від ідеї до продукту з передбачуваними термінами та впевненою якістю."
        },
        {
          title: "Підтримувати системи стійкими та безпечними",
          description: "Ми зміцнюємо інфраструктуру та захищаємо дані, щоб бізнес працював без перебоїв."
        }
      ]
    },
    services: {
      title: "Наші послуги",
      subtitle: "Комплексні цифрові рішення",
      badge: "Наші послуги",
      items: [
        {
          title: "Веб-розробка",
          description: "Full-stack веб-додатки з сучасними технологіями",
          features: ["React/Next.js", "Node.js", "Дизайн баз даних", "Розробка API"]
        },
        {
          title: "Мобільна розробка",
          description: "Нативні та кросплатформені мобільні додатки",
          features: ["React Native", "iOS/Android", "Оптимізація App Store", "Продуктивність"]
        },
        {
          title: "Інтеграція систем",
          description: "Інтеграція корпоративних систем та автоматизація",
          features: ["Інтеграція API", "Міграція баз даних", "Автоматизація процесів", "Хмарні рішення"]
        }
      ],
      analytics: {
        title: "Аналітика та інсайти",
        subtitle: "Перетворіть свої дані на дієву інтелектуальність",
        description: "Розкрийте силу своїх даних за допомогою наших комплексних аналітичних рішень. Отримайте інсайти в реальному часі, предиктивну аналітику та візуалізацію даних, які стимулюють зростання бізнесу.",
        features: [
          { title: "Дашборди в реальному часі", description: "Візуалізація та моніторинг живих даних" },
          { title: "Предиктивна аналітика", description: "Прогнози та тренди на основі ШІ" },
          { title: "Користувацькі звіти", description: "Індивідуальні інсайти для вашого бізнесу" },
          { title: "Інтеграція даних", description: "Підключіть усі свої джерела даних" }
        ],
        cta: "Отримати аналітичне рішення"
      },
      cybersecurity: {
        title: "Кібербезпека",
        subtitle: "Захистіть свій бізнес корпоративним рівнем безпеки",
        description: "Комплексні рішення кібербезпеки для захисту ваших цифрових активів. Від виявлення загроз до реагування на інциденти, ми забезпечуємо безпеку вашого бізнесу.",
        features: [
          { title: "Виявлення загроз", description: "Розширений моніторинг та сповіщення" },
          { title: "Аудит безпеки", description: "Комплексна оцінка вразливостей" },
          { title: "Реагування на інциденти", description: "Швидка реакція на порушення безпеки" },
          { title: "Відповідність стандартам", description: "Відповідайте галузевим стандартам безпеки" }
        ],
        cta: "Захистити бізнес"
      },
      infrastructure: {
        title: "Інфраструктура",
        subtitle: "Масштабовані та надійні серверні рішення",
        description: "Сучасні інфраструктурні рішення, які масштабуються разом з вашим бізнесом. Від міграції в хмару до оптимізації серверів, ми забезпечуємо плавну роботу ваших систем.",
        features: [
          { title: "Міграція в хмару", description: "Плавний перехід на хмарні платформи" },
          { title: "Оптимізація серверів", description: "Налаштування продуктивності та моніторинг" },
          { title: "Рішення резервного копіювання", description: "Автоматизоване резервне копіювання та відновлення після збоїв" },
          { title: "24/7 моніторинг", description: "Круглодобовий моніторинг систем" }
        ],
        cta: "Переглянути рішення"
      },
      detailedFeatures: {
        web: [
          { title: "React/Next.js", description: "Сучасні frontend фреймворки для динамічних веб-додатків" },
          { title: "Node.js", description: "Потужна backend розробка з JavaScript" },
          { title: "Дизайн баз даних", description: "Оптимізована архітектура та управління базою даних" },
          { title: "Розробка API", description: "RESTful API та архітектура мікросервісів" }
        ],
        mobile: [
          { title: "React Native", description: "Крос-платформна розробка мобільних додатків" },
          { title: "iOS/Android", description: "Нативні мобільні додатки для обох платформ" },
          { title: "Оптимізація App Store", description: "Максимізуйте видимість та завантаження додатків" },
          { title: "Продуктивність", description: "Оптимізована продуктивність та користувацький досвід" }
        ],
        integration: [
          { title: "Інтеграція API", description: "Плавне з'єднання між різними системами" },
          { title: "Міграція баз даних", description: "Безпечні та ефективні процеси міграції даних" },
          { title: "Автоматизація процесів", description: "Спрощення бізнес-процесів та операцій" },
          { title: "Хмарні рішення", description: "Масштабована хмарна інфраструктура та послуги" }
        ]
      }
    },
    contact: {
      title: "Зв'язатися з нами",
      subtitle: "Давайте разом створимо щось дивовижне",
      team: {
        title: "Наша команда",
        subtitle: "Експерти за вашим успіхом",
        members: [
          {
            name: "Alex Johnson",
            position: "Головний розробник",
            description: "Full-stack розробник з 8+ роками досвіду в React, Node.js та хмарних технологіях.",
            image: "/team/alex-johnson.jpg"
          },
          {
            name: "Maria Rodriguez",
            position: "UI/UX Дизайнерка",
            description: "Креативна дизайнерка, що спеціалізується на користувацькому досвіді та сучасних веб-інтерфейсах.",
            image: "/team/maria-rodriguez.jpg"
          },
          {
            name: "David Chen",
            position: "Проектний менеджер",
            description: "Досвідчений проектний менеджер, що забезпечує плавну доставку та задоволеність клієнтів.",
            image: "/team/david-chen.jpg"
          }
        ]
      },
      form: {
        name: {
          label: "Ім'я",
          placeholder: "Ваше ім'я"
        },
        email: {
          label: "Email",
          placeholder: "ваш@email.ua"
        },
        message: {
          label: "Повідомлення",
          placeholder: "Розкажіть нам про ваш проект..."
        },
        submit: "Надіслати повідомлення"
      },
      info: {
        email: "contact@ikhsystems.com",
        phone: "+420 123 456 789",
        address: "Прага, Чеська Республіка"
      }
    },
    seo: {
      home: {
        title: "IKH Systems - Інноваційні IT рішення для бізнесу",
        description: "Ми створюємо сучасні технологічні рішення, які допомагають компаніям досягати нових висот у цифрову епоху.",
        keywords: "IT рішення, веб-розробка, мобільні додатки, програмні рішення"
      },
      about: {
        title: "Про нас - IKH Systems | Експертна команда розробників",
        description: "Познайомтеся з нашою експертною командою розробників. Ми спеціалізуємося на створенні інноваційних цифрових рішень.",
        keywords: "про нас, команда розробників, IT експерти, профіль компанії"
      },
      services: {
        title: "Послуги - IKH Systems | Веб та мобільна розробка",
        description: "Комплексні послуги веб-розробки, мобільних додатків та інтеграції систем для вашого бізнесу.",
        keywords: "веб-розробка, мобільна розробка, інтеграція систем, IT послуги"
      },
      contact: {
        title: "Контакти - IKH Systems | Зв'язатися з нами",
        description: "Готові розпочати свій проект? Зв'яжіться з нашою експертною командою для консультації та оцінки проекту.",
        keywords: "контакти, консультація, оцінка проекту, зв'язатися"
      },
      logoPortfolio: {
        title: "Портфоліо логотипів - IKH Systems | Приклади робіт",
        description: "Портфоліо логотипів та брендингу від IKH Systems. Приклади робіт та креативних рішень.",
        keywords: "портфоліо, логотипи, брендинг, приклади робіт"
      }
    },
    locations: {
      praha: {
        title: "Веб-розробка та веб-дизайн у Празі | IKH Systems",
        description: "Професійні послуги веб-розробки та веб-дизайну в Празі. Ми створюємо сучасні веб-сайти, які допомагають місцевим бізнесам рости та залучати клієнтів. Наша пражська команда розуміє місцевий ринок і приносить результати.",
        keywords: "веб-розробка Прага, веб-дизайн Прага, створення веб-сайту Прага, цифрова агенція Прага"
      },
      brno: {
        title: "Веб-розробка та веб-дизайн у Брно | IKH Systems",
        description: "Експертні послуги веб-розробки та веб-дизайну в Брно. Ми допомагаємо місцевим бізнесам створити сильну онлайн-присутність з сучасними, адаптивними веб-сайтами, оптимізованими для пошукових систем.",
        keywords: "веб-розробка Брно, веб-дизайн Брно, створення веб-сайту Брно, цифрова агенція Брно"
      },
      ostrava: {
        title: "Веб-розробка та веб-дизайн у Остраві | IKH Systems",
        description: "Професійні послуги веб-розробки та веб-дизайну в Остраві. Ми спеціалізуємося на створенні веб-сайтів для промислових підприємств, магазинів, ресторанів та послуг у Моравсько-Сілезькому краї.",
        keywords: "веб-розробка Острава, веб-дизайн Острава, створення веб-сайту Острава, цифрова агенція Острава"
      },
      plzen: {
        title: "Веб-розробка та веб-дизайн у Пльзені | IKH Systems",
        description: "Якісні послуги веб-розробки та веб-дизайну в Пльзені. Ми створюємо сучасні веб-сайти для місцевих бізнесів, допомагаємо їм підвищити онлайн-присутність та залучити нових клієнтів.",
        keywords: "веб-розробка Пльзень, веб-дизайн Пльзень, створення веб-сайту Пльзень, цифрова агенція Пльзень"
      },
      liberec: {
        title: "Веб-розробка та веб-дизайн у Лібереці | IKH Systems",
        description: "Професійні послуги веб-розробки та веб-дизайну в Лібереці. Ми допомагаємо місцевим бізнесам у Ліберецькому краї створити сильну онлайн-присутність з сучасними, SEO-оптимізованими веб-сайтами.",
        keywords: "веб-розробка Ліберець, веб-дизайн Ліберець, створення веб-сайту Ліберець, цифрова агенція Ліберець"
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