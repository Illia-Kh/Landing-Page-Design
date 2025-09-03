import { Language } from '../types';

// Centralized i18n dictionaries with proper namespacing
export interface TranslationDictionary {
  // Common/shared translations
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
      readMore: string;
      close: string;
      submit: string;
      cancel: string;
    };
    loading: string;
    error: string;
    success: string;
  };

  // Hero section
  hero: {
    title: string;
    subtitle: string;
    description: string;
    cta: {
      primary: string;
      secondary: string;
    };
  };

  // About Us section
  sections: {
    about: {
      title: string;
      subtitle: string;
      tabs: string[];
      cards: Array<{
        title: string;
        description: string;
      }>;
      team: {
        title: string;
        description: string;
        members: Array<{
          name: string;
          role: string;
          experience: string;
        }>;
      };
      mission: {
        title: string;
        description: string;
      };
      innovations: {
        title: string;
        description: string;
      };
      achievements: {
        title: string;
        description: string;
      };
    };
    challenges: {
      title: string;
      subtitle: string;
      items: Array<{
        title: string;
        description: string;
      }>;
    };
  };

  // Services section
  services: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
      features: string[];
    }>;
  };

  // Contact section
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: {
        label: string;
        placeholder: string;
      };
      email: {
        label: string;
        placeholder: string;
      };
      message: {
        label: string;
        placeholder: string;
      };
      submit: string;
    };
    info: {
      title: string;
      address: string;
      phone: string;
      email: string;
      hours: string;
    };
  };

  // Footer
  footer: {
    company: {
      title: string;
      description: string;
    };
    links: {
      title: string;
      items: Array<{
        label: string;
        href: string;
      }>;
    };
    contact: {
      title: string;
      address: string;
      phone: string;
      email: string;
    };
    social: {
      title: string;
    };
    copyright: string;
  };

  // SEO metadata
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
        readMore: "Читать далее",
        close: "Закрыть",
        submit: "Отправить",
        cancel: "Отмена",
      },
      loading: "Загрузка...",
      error: "Произошла ошибка",
      success: "Успешно выполнено",
    },
    hero: {
      title: "IKH-TechSystems",
      subtitle: "Инновационные IT решения для бизнеса",
      description: "Мы создаем современные технологические решения, которые помогают компаниям достигать новых высот в цифровую эпоху.",
      cta: {
        primary: "Начать проект",
        secondary: "Узнать больше",
      },
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
        team: {
          title: "Наша команда",
          description: "Профессионалы с глубокими знаниями в различных областях IT",
          members: [
            { name: "Алексей Петров", role: "Lead Developer", experience: "8 лет" },
            { name: "Мария Сидорова", role: "UI/UX Designer", experience: "6 лет" },
            { name: "Дмитрий Козлов", role: "DevOps Engineer", experience: "7 лет" },
            { name: "Анна Волкова", role: "Project Manager", experience: "5 лет" },
          ],
        },
        mission: {
          title: "Наша миссия",
          description: "Создавать технологические решения, которые делают бизнес эффективнее и конкурентоспособнее",
        },
        innovations: {
          title: "Инновации",
          description: "Используем передовые технологии и методологии разработки",
        },
        achievements: {
          title: "Достижения",
          description: "Более 100 успешных проектов и довольных клиентов",
        },
      },
      challenges: {
        title: "Решаем сложные задачи",
        subtitle: "Наши экспертные решения для вашего бизнеса",
        items: [
          {
            title: "Веб-разработка",
            description: "Создание современных веб-приложений и сайтов",
          },
          {
            title: "Мобильные приложения",
            description: "Разработка нативных и кроссплатформенных приложений",
          },
          {
            title: "IT консалтинг",
            description: "Консультации по выбору технологий и архитектуре",
          },
        ],
      },
    },
    services: {
      title: "Наши услуги",
      subtitle: "Полный спектр IT услуг для вашего бизнеса",
      items: [
        {
          title: "Веб-разработка",
          description: "Создание современных веб-приложений и сайтов",
          features: ["React/Vue.js", "Node.js", "Адаптивный дизайн", "SEO оптимизация"],
        },
        {
          title: "Мобильные приложения",
          description: "Разработка для iOS и Android",
          features: ["React Native", "Flutter", "Native iOS/Android", "UI/UX дизайн"],
        },
        {
          title: "IT консалтинг",
          description: "Экспертные консультации по IT решениям",
          features: ["Архитектура", "Выбор технологий", "Оптимизация", "Аудит кода"],
        },
      ],
    },
    contact: {
      title: "Свяжитесь с нами",
      subtitle: "Готовы обсудить ваш проект? Напишите нам!",
      form: {
        name: {
          label: "Имя",
          placeholder: "Ваше имя",
        },
        email: {
          label: "Email",
          placeholder: "your@email.com",
        },
        message: {
          label: "Сообщение",
          placeholder: "Расскажите о вашем проекте",
        },
        submit: "Отправить сообщение",
      },
      info: {
        title: "Контактная информация",
        address: "Москва, Россия",
        phone: "+7 (555) 123-45-67",
        email: "info@ikh-techsystems.com",
        hours: "Пн-Пт: 9:00-18:00",
      },
    },
    footer: {
      company: {
        title: "IKH-TechSystems",
        description: "Инновационные IT решения для современного бизнеса. Создаем будущее вместе с вами.",
      },
      links: {
        title: "Быстрые ссылки",
        items: [
          { label: "Главная", href: "#home" },
          { label: "О нас", href: "#about" },
          { label: "Услуги", href: "#services" },
          { label: "Контакты", href: "#contact" },
        ],
      },
      contact: {
        title: "Контакты",
        address: "Москва, Россия",
        phone: "+7 (555) 123-45-67",
        email: "info@ikh-techsystems.com",
      },
      social: {
        title: "Социальные сети",
      },
      copyright: "© 2024 IKH-TechSystems. Все права защищены.",
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
  // English translations
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
        readMore: "Read More",
        close: "Close",
        submit: "Submit",
        cancel: "Cancel",
      },
      loading: "Loading...",
      error: "An error occurred",
      success: "Successfully completed",
    },
    hero: {
      title: "IKH-TechSystems",
      subtitle: "Innovative IT Solutions for Business",
      description: "We create modern technological solutions that help companies reach new heights in the digital age.",
      cta: {
        primary: "Start Project",
        secondary: "Learn More",
      },
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
        team: {
          title: "Our Team",
          description: "Professionals with deep knowledge in various IT fields",
          members: [
            { name: "Alex Petrov", role: "Lead Developer", experience: "8 years" },
            { name: "Maria Sidorova", role: "UI/UX Designer", experience: "6 years" },
            { name: "Dmitry Kozlov", role: "DevOps Engineer", experience: "7 years" },
            { name: "Anna Volkova", role: "Project Manager", experience: "5 years" },
          ],
        },
        mission: {
          title: "Our Mission",
          description: "Creating technological solutions that make business more efficient and competitive",
        },
        innovations: {
          title: "Innovation",
          description: "Using cutting-edge technologies and development methodologies",
        },
        achievements: {
          title: "Achievements",
          description: "Over 100 successful projects and satisfied clients",
        },
      },
      challenges: {
        title: "Solving Complex Problems",
        subtitle: "Our expert solutions for your business",
        items: [
          {
            title: "Web Development",
            description: "Creating modern web applications and websites",
          },
          {
            title: "Mobile Applications",
            description: "Development of native and cross-platform applications",
          },
          {
            title: "IT Consulting",
            description: "Technology and architecture consulting",
          },
        ],
      },
    },
    services: {
      title: "Our Services",
      subtitle: "Full range of IT services for your business",
      items: [
        {
          title: "Web Development",
          description: "Creating modern web applications and websites",
          features: ["React/Vue.js", "Node.js", "Responsive Design", "SEO Optimization"],
        },
        {
          title: "Mobile Applications",
          description: "Development for iOS and Android",
          features: ["React Native", "Flutter", "Native iOS/Android", "UI/UX Design"],
        },
        {
          title: "IT Consulting",
          description: "Expert consulting on IT solutions",
          features: ["Architecture", "Technology Selection", "Optimization", "Code Audit"],
        },
      ],
    },
    contact: {
      title: "Contact Us",
      subtitle: "Ready to discuss your project? Write to us!",
      form: {
        name: {
          label: "Name",
          placeholder: "Your name",
        },
        email: {
          label: "Email",
          placeholder: "your@email.com",
        },
        message: {
          label: "Message",
          placeholder: "Tell us about your project",
        },
        submit: "Send Message",
      },
      info: {
        title: "Contact Information",
        address: "Moscow, Russia",
        phone: "+7 (555) 123-45-67",
        email: "info@ikh-techsystems.com",
        hours: "Mon-Fri: 9:00-18:00",
      },
    },
    footer: {
      company: {
        title: "IKH-TechSystems",
        description: "Innovative IT solutions for modern business. Creating the future together with you.",
      },
      links: {
        title: "Quick Links",
        items: [
          { label: "Home", href: "#home" },
          { label: "About", href: "#about" },
          { label: "Services", href: "#services" },
          { label: "Contact", href: "#contact" },
        ],
      },
      contact: {
        title: "Contact",
        address: "Moscow, Russia",
        phone: "+7 (555) 123-45-67",
        email: "info@ikh-techsystems.com",
      },
      social: {
        title: "Social Media",
      },
      copyright: "© 2024 IKH-TechSystems. All rights reserved.",
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
  // German translations
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
        readMore: "Weiterlesen",
        close: "Schließen",
        submit: "Senden",
        cancel: "Abbrechen",
      },
      loading: "Lädt...",
      error: "Ein Fehler ist aufgetreten",
      success: "Erfolgreich abgeschlossen",
    },
    hero: {
      title: "IKH-TechSystems",
      subtitle: "Innovative IT-Lösungen für Unternehmen",
      description: "Wir schaffen moderne technologische Lösungen, die Unternehmen dabei helfen, im digitalen Zeitalter neue Höhen zu erreichen.",
      cta: {
        primary: "Projekt starten",
        secondary: "Mehr erfahren",
      },
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
        team: {
          title: "Unser Team",
          description: "Profis mit tiefem Wissen in verschiedenen IT-Bereichen",
          members: [
            { name: "Alex Petrov", role: "Lead Developer", experience: "8 Jahre" },
            { name: "Maria Sidorova", role: "UI/UX Designer", experience: "6 Jahre" },
            { name: "Dmitry Kozlov", role: "DevOps Engineer", experience: "7 Jahre" },
            { name: "Anna Volkova", role: "Project Manager", experience: "5 Jahre" },
          ],
        },
        mission: {
          title: "Unsere Mission",
          description: "Technologische Lösungen schaffen, die Unternehmen effizienter und wettbewerbsfähiger machen",
        },
        innovations: {
          title: "Innovation",
          description: "Einsatz modernster Technologien und Entwicklungsmethoden",
        },
        achievements: {
          title: "Erfolge",
          description: "Über 100 erfolgreiche Projekte und zufriedene Kunden",
        },
      },
      challenges: {
        title: "Komplexe Probleme lösen",
        subtitle: "Unsere Expertenlösungen für Ihr Unternehmen",
        items: [
          {
            title: "Webentwicklung",
            description: "Erstellung moderner Webanwendungen und Websites",
          },
          {
            title: "Mobile Anwendungen",
            description: "Entwicklung nativer und plattformübergreifender Anwendungen",
          },
          {
            title: "IT-Beratung",
            description: "Technologie- und Architekturberatung",
          },
        ],
      },
    },
    services: {
      title: "Unsere Dienstleistungen",
      subtitle: "Vollständige Palette von IT-Dienstleistungen für Ihr Unternehmen",
      items: [
        {
          title: "Webentwicklung",
          description: "Erstellung moderner Webanwendungen und Websites",
          features: ["React/Vue.js", "Node.js", "Responsive Design", "SEO-Optimierung"],
        },
        {
          title: "Mobile Anwendungen",
          description: "Entwicklung für iOS und Android",
          features: ["React Native", "Flutter", "Native iOS/Android", "UI/UX Design"],
        },
        {
          title: "IT-Beratung",
          description: "Expertenberatung zu IT-Lösungen",
          features: ["Architektur", "Technologieauswahl", "Optimierung", "Code-Audit"],
        },
      ],
    },
    contact: {
      title: "Kontakt aufnehmen",
      subtitle: "Bereit, Ihr Projekt zu besprechen? Schreiben Sie uns!",
      form: {
        name: {
          label: "Name",
          placeholder: "Ihr Name",
        },
        email: {
          label: "E-Mail",
          placeholder: "ihre@email.com",
        },
        message: {
          label: "Nachricht",
          placeholder: "Erzählen Sie uns von Ihrem Projekt",
        },
        submit: "Nachricht senden",
      },
      info: {
        title: "Kontaktinformationen",
        address: "Moskau, Russland",
        phone: "+7 (555) 123-45-67",
        email: "info@ikh-techsystems.com",
        hours: "Mo-Fr: 9:00-18:00",
      },
    },
    footer: {
      company: {
        title: "IKH-TechSystems",
        description: "Innovative IT-Lösungen für moderne Unternehmen. Gemeinsam schaffen wir die Zukunft.",
      },
      links: {
        title: "Schnelllinks",
        items: [
          { label: "Startseite", href: "#home" },
          { label: "Über uns", href: "#about" },
          { label: "Dienstleistungen", href: "#services" },
          { label: "Kontakt", href: "#contact" },
        ],
      },
      contact: {
        title: "Kontakt",
        address: "Moskau, Russland",
        phone: "+7 (555) 123-45-67",
        email: "info@ikh-techsystems.com",
      },
      social: {
        title: "Soziale Medien",
      },
      copyright: "© 2024 IKH-TechSystems. Alle Rechte vorbehalten.",
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
  // Czech translations
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
        readMore: "Číst více",
        close: "Zavřít",
        submit: "Odeslat",
        cancel: "Zrušit",
      },
      loading: "Načítání...",
      error: "Došlo k chybě",
      success: "Úspěšně dokončeno",
    },
    hero: {
      title: "IKH-TechSystems",
      subtitle: "Inovativní IT řešení pro byznys",
      description: "Vytváříme moderní technologická řešení, která pomáhají společnostem dosáhnout nových výšin v digitálním věku.",
      cta: {
        primary: "Zahájit projekt",
        secondary: "Zjistit více",
      },
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
        team: {
          title: "Náš tým",
          description: "Profesionálové s hlubokými znalostmi v různých oblastech IT",
          members: [
            { name: "Alex Petrov", role: "Lead Developer", experience: "8 let" },
            { name: "Maria Sidorova", role: "UI/UX Designer", experience: "6 let" },
            { name: "Dmitry Kozlov", role: "DevOps Engineer", experience: "7 let" },
            { name: "Anna Volkova", role: "Project Manager", experience: "5 let" },
          ],
        },
        mission: {
          title: "Naše mise",
          description: "Vytváření technologických řešení, která dělají byznys efektivnější a konkurenceschopnější",
        },
        innovations: {
          title: "Inovace",
          description: "Používání nejmodernějších technologií a vývojových metodologií",
        },
        achievements: {
          title: "Úspěchy",
          description: "Více než 100 úspěšných projektů a spokojených klientů",
        },
      },
      challenges: {
        title: "Řešíme složité problémy",
        subtitle: "Naše expertní řešení pro váš byznys",
        items: [
          {
            title: "Webový vývoj",
            description: "Vytváření moderních webových aplikací a stránek",
          },
          {
            title: "Mobilní aplikace",
            description: "Vývoj nativních a multiplatformních aplikací",
          },
          {
            title: "IT konzultace",
            description: "Konzultace technologií a architektury",
          },
        ],
      },
    },
    services: {
      title: "Naše služby",
      subtitle: "Kompletní spektrum IT služeb pro váš byznys",
      items: [
        {
          title: "Webový vývoj",
          description: "Vytváření moderních webových aplikací a stránek",
          features: ["React/Vue.js", "Node.js", "Responzivní design", "SEO optimalizace"],
        },
        {
          title: "Mobilní aplikace",
          description: "Vývoj pro iOS a Android",
          features: ["React Native", "Flutter", "Nativní iOS/Android", "UI/UX design"],
        },
        {
          title: "IT konzultace",
          description: "Expertní konzultace IT řešení",
          features: ["Architektura", "Výběr technologií", "Optimalizace", "Audit kódu"],
        },
      ],
    },
    contact: {
      title: "Kontaktujte nás",
      subtitle: "Připraveni diskutovat váš projekt? Napište nám!",
      form: {
        name: {
          label: "Jméno",
          placeholder: "Vaše jméno",
        },
        email: {
          label: "E-mail",
          placeholder: "vas@email.com",
        },
        message: {
          label: "Zpráva",
          placeholder: "Řekněte nám o vašem projektu",
        },
        submit: "Odeslat zprávu",
      },
      info: {
        title: "Kontaktní informace",
        address: "Moskva, Rusko",
        phone: "+7 (555) 123-45-67",
        email: "info@ikh-techsystems.com",
        hours: "Po-Pá: 9:00-18:00",
      },
    },
    footer: {
      company: {
        title: "IKH-TechSystems",
        description: "Inovativní IT řešení pro moderní byznys. Vytváříme budoucnost společně s vámi.",
      },
      links: {
        title: "Rychlé odkazy",
        items: [
          { label: "Domů", href: "#home" },
          { label: "O nás", href: "#about" },
          { label: "Služby", href: "#services" },
          { label: "Kontakt", href: "#contact" },
        ],
      },
      contact: {
        title: "Kontakt",
        address: "Moskva, Rusko",
        phone: "+7 (555) 123-45-67",
        email: "info@ikh-techsystems.com",
      },
      social: {
        title: "Sociální sítě",
      },
      copyright: "© 2024 IKH-TechSystems. Všechna práva vyhrazena.",
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