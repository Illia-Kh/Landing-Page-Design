import { Language } from '../types';

// Centralized i18n dictionaries with proper namespacing
export interface TranslationDictionary {
  common: {
    navigation: {
      home: string;
      about: string;
      services: string;
      contact: string;
      logoPortfolio: string;
    };
    actions: {
      learnMore: string;
      getStarted: string;
      contactUs: string;
    };
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  sections: {
    about: {
      title: string;
      subtitle: string;
      tabs: string[];
      cards: Array<{
        title: string;
        description: string;
      }>;
    };
  };
  seo: {
    home: {
      title: string;
      description: string;
      keywords: string;
    };
    about: {
      title: string;
      description: string;
      keywords: string;
    };
    services: {
      title: string;
      description: string;
      keywords: string;
    };
    contact: {
      title: string;
      description: string;
      keywords: string;
    };
    logoPortfolio: {
      title: string;
      description: string;
      keywords: string;
    };
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  ru: {
    common: {
      navigation: {
        home: "Главная",
        about: "О нас",
        services: "Услуги",
        contact: "Контакты",
        logoPortfolio: "Портфолио логотипов",
      },
      actions: {
        learnMore: "Узнать больше",
        getStarted: "Начать",
        contactUs: "Связаться с нами",
      },
    },
    hero: {
      title: "IKH-TechSystems",
      subtitle: "Инновационные IT решения для бизнеса",
      description: "Мы создаем современные технологические решения, которые помогают компаниям достигать новых высот в цифровую эпоху.",
    },
    sections: {
      about: {
        title: "О нас",
        subtitle: "Познакомьтесь с командой CodeHero и узнайте о нашей миссии",
        tabs: ["Команда", "Миссия", "Инновации", "Достижения"],
        cards: [
          {
            title: "Опытная команда",
            description: "Наши разработчики имеют многолетний опыт в создании инновационных IT решений",
          },
          {
            title: "Четкая миссия",
            description: "Мы стремимся помочь бизнесу расти через современные технологии",
          },
          {
            title: "Инновационный подход",
            description: "Постоянно изучаем новые технологии и внедряем их в проекты",
          },
          {
            title: "Доказанные результаты",
            description: "Успешно реализовали более 100 проектов для клиентов по всему миру",
          },
        ],
      },
    },
    seo: {
      home: {
        title: "IKH-TechSystems - Инновационные IT решения для бизнеса",
        description: "Мы создаем современные технологические решения, которые помогают компаниям достигать новых высот в цифровую эпоху.",
        keywords: "IT решения, веб-разработка, мобильные приложения, программное решения",
      },
      about: {
        title: "О нас - IKH-TechSystems | Наша команда и миссия",
        description: "Познакомьтесь с командой IKH-TechSystems. Узнайте о нашей миссии, ценностях и подходе к разработке.",
        keywords: "о компании, команда, миссия, IT компания",
      },
      services: {
        title: "Услуги - IKH-TechSystems | Веб-разработка и IT консалтинг",
        description: "Полный спектр IT услуг: веб-разработка, мобильные приложения, программное обеспечение, IT консалтинг.",
        keywords: "услуги, веб-разработка, мобильные приложения, IT консалтинг",
      },
      contact: {
        title: "Контакты - IKH-TechSystems | Связаться с нами",
        description: "Свяжитесь с IKH-TechSystems. Обсудим ваш проект и поможем найти лучшее решение.",
        keywords: "контакты, связаться, проект, консультация",
      },
      logoPortfolio: {
        title: "Портфолио логотипов - IKH-TechSystems | Примеры работ",
        description: "Портфолио логотипов и брендинга от IKH-TechSystems. Примеры работ и креативных решений.",
        keywords: "портфолио, логотипы, брендинг, примеры работ",
      },
    },
  },
  en: {
    common: {
      navigation: {
        home: "Home",
        about: "About",
        services: "Services",
        contact: "Contact",
        logoPortfolio: "Logo Portfolio",
      },
      actions: {
        learnMore: "Learn More",
        getStarted: "Get Started",
        contactUs: "Contact Us",
      },
    },
    hero: {
      title: "IKH-TechSystems",
      subtitle: "Innovative IT Solutions for Business",
      description: "We create modern technological solutions that help companies reach new heights in the digital age.",
    },
    sections: {
      about: {
        title: "About Us",
        subtitle: "Meet the CodeHero team and learn about our mission",
        tabs: ["Team", "Mission", "Innovation", "Achievements"],
        cards: [
          {
            title: "Experienced Team",
            description: "Our developers have years of experience creating innovative IT solutions",
          },
          {
            title: "Clear Mission",
            description: "We strive to help businesses grow through modern technology",
          },
          {
            title: "Innovative Approach",
            description: "Constantly learning new technologies and implementing them in projects",
          },
          {
            title: "Proven Results",
            description: "Successfully implemented over 100 projects for clients worldwide",
          },
        ],
      },
    },
    seo: {
      home: {
        title: "IKH-TechSystems - Innovative IT Solutions for Business",
        description: "We create modern technological solutions that help companies reach new heights in the digital age.",
        keywords: "IT solutions, web development, mobile applications, software solutions",
      },
      about: {
        title: "About Us - IKH-TechSystems | Our Team and Mission",
        description: "Meet the IKH-TechSystems team. Learn about our mission, values and development approach.",
        keywords: "about company, team, mission, IT company",
      },
      services: {
        title: "Services - IKH-TechSystems | Web Development & IT Consulting",
        description: "Full range of IT services: web development, mobile applications, software, IT consulting.",
        keywords: "services, web development, mobile applications, IT consulting",
      },
      contact: {
        title: "Contact - IKH-TechSystems | Get in Touch",
        description: "Contact IKH-TechSystems. Let's discuss your project and help find the best solution.",
        keywords: "contact, get in touch, project, consultation",
      },
      logoPortfolio: {
        title: "Logo Portfolio - IKH-TechSystems | Work Examples",
        description: "Logo and branding portfolio from IKH-TechSystems. Examples of work and creative solutions.",
        keywords: "portfolio, logos, branding, work examples",
      },
    },
  },
  de: {
    common: {
      navigation: {
        home: "Startseite",
        about: "Über uns",
        services: "Dienstleistungen",
        contact: "Kontakt",
        logoPortfolio: "Logo-Portfolio",
      },
      actions: {
        learnMore: "Mehr erfahren",
        getStarted: "Loslegen",
        contactUs: "Kontakt aufnehmen",
      },
    },
    hero: {
      title: "IKH-TechSystems",
      subtitle: "Innovative IT-Lösungen für Unternehmen",
      description: "Wir schaffen moderne technologische Lösungen, die Unternehmen dabei helfen, im digitalen Zeitalter neue Höhen zu erreichen.",
    },
    sections: {
      about: {
        title: "Über uns",
        subtitle: "Lernen Sie das CodeHero-Team kennen und erfahren Sie mehr über unsere Mission",
        tabs: ["Team", "Mission", "Innovation", "Erfolge"],
        cards: [
          {
            title: "Erfahrenes Team",
            description: "Unsere Entwickler haben jahrelange Erfahrung in der Entwicklung innovativer IT-Lösungen",
          },
          {
            title: "Klare Mission",
            description: "Wir helfen Unternehmen durch moderne Technologie zu wachsen",
          },
          {
            title: "Innovativer Ansatz",
            description: "Ständiges Lernen neuer Technologien und deren Umsetzung in Projekten",
          },
          {
            title: "Bewährte Ergebnisse",
            description: "Über 100 erfolgreich umgesetzte Projekte für Kunden weltweit",
          },
        ],
      },
    },
    seo: {
      home: {
        title: "IKH-TechSystems - Innovative IT-Lösungen für Unternehmen",
        description: "Wir schaffen moderne technologische Lösungen, die Unternehmen dabei helfen, im digitalen Zeitalter neue Höhen zu erreichen.",
        keywords: "IT-Lösungen, Webentwicklung, mobile Anwendungen, Softwarelösungen",
      },
      about: {
        title: "Über uns - IKH-TechSystems | Unser Team und Mission",
        description: "Lernen Sie das IKH-TechSystems-Team kennen. Erfahren Sie mehr über unsere Mission, Werte und Entwicklungsansatz.",
        keywords: "über das Unternehmen, Team, Mission, IT-Unternehmen",
      },
      services: {
        title: "Dienstleistungen - IKH-TechSystems | Webentwicklung & IT-Beratung",
        description: "Vollständige Palette von IT-Dienstleistungen: Webentwicklung, mobile Anwendungen, Software, IT-Beratung.",
        keywords: "dienstleistungen, webentwicklung, mobile anwendungen, IT-beratung",
      },
      contact: {
        title: "Kontakt - IKH-TechSystems | Kontakt aufnehmen",
        description: "Kontaktieren Sie IKH-TechSystems. Lassen Sie uns Ihr Projekt besprechen und die beste Lösung finden.",
        keywords: "kontakt, kontakt aufnehmen, projekt, beratung",
      },
      logoPortfolio: {
        title: "Logo-Portfolio - IKH-TechSystems | Arbeitsbeispiele",
        description: "Logo- und Branding-Portfolio von IKH-TechSystems. Beispiele für Arbeiten und kreative Lösungen.",
        keywords: "portfolio, logos, branding, arbeitsbeispiele",
      },
    },
  },
  cs: {
    common: {
      navigation: {
        home: "Domů",
        about: "O nás",
        services: "Služby",
        contact: "Kontakt",
        logoPortfolio: "Portfolio log",
      },
      actions: {
        learnMore: "Zjistit více",
        getStarted: "Začít",
        contactUs: "Kontaktujte nás",
      },
    },
    hero: {
      title: "IKH-TechSystems",
      subtitle: "Inovativní IT řešení pro byznys",
      description: "Vytváříme moderní technologická řešení, která pomáhají společnostem dosáhnout nových výšin v digitálním věku.",
    },
    sections: {
      about: {
        title: "O nás",
        subtitle: "Seznamte se s týmem CodeHero a zjistěte více o naší misi",
        tabs: ["Tým", "Mise", "Inovace", "Úspěchy"],
        cards: [
          {
            title: "Zkušený tým",
            description: "Naši vývojáři mají mnohaletou zkušenost s vytvářením inovativních IT řešení",
          },
          {
            title: "Jasná mise",
            description: "Snažíme se pomoci firmám růst prostřednictvím moderních technologií",
          },
          {
            title: "Inovativní přístup",
            description: "Neustále se učíme nové technologie a implementujeme je do projektů",
          },
          {
            title: "Prokázané výsledky",
            description: "Úspěšně jsme realizovali více než 100 projektů pro klienty po celém světě",
          },
        ],
      },
    },
    seo: {
      home: {
        title: "IKH-TechSystems - Inovativní IT řešení pro byznys",
        description: "Vytváříme moderní technologická řešení, která pomáhají společnostem dosáhnout nových výšin v digitálním věku.",
        keywords: "IT řešení, webový vývoj, mobilní aplikace, softwarová řešení",
      },
      about: {
        title: "O nás - IKH-TechSystems | Náš tým a mise",
        description: "Seznamte se s týmem IKH-TechSystems. Zjistěte více o naší misi, hodnotách a přístupu k vývoji.",
        keywords: "o společnosti, tým, mise, IT společnost",
      },
      services: {
        title: "Služby - IKH-TechSystems | Webový vývoj a IT konzultace",
        description: "Kompletní spektrum IT služeb: webový vývoj, mobilní aplikace, software, IT konzultace.",
        keywords: "služby, webový vývoj, mobilní aplikace, IT konzultace",
      },
      contact: {
        title: "Kontakt - IKH-TechSystems | Kontaktujte nás",
        description: "Kontaktujte IKH-TechSystems. Pojďme diskutovat váš projekt a pomůžeme najít nejlepší řešení.",
        keywords: "kontakt, kontaktujte nás, projekt, konzultace",
      },
      logoPortfolio: {
        title: "Portfolio log - IKH-TechSystems | Příklady práce",
        description: "Portfolio log a brandingu od IKH-TechSystems. Příklady práce a kreativních řešení.",
        keywords: "portfolio, loga, branding, příklady práce",
      },
    },
  },
};

// Helper function to get translations for a specific language
export const useTranslations = (language: Language): TranslationDictionary => {
  return translations[language] || translations.ru;
};

// Helper function to get nested translation by path
export const getTranslation = (
  language: Language,
  path: string,
  fallback: string = ''
): string => {
  const t = useTranslations(language);
  const keys = path.split('.');
  let value: any = t;
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return fallback;
    }
  }
  
  return typeof value === 'string' ? value : fallback;
};