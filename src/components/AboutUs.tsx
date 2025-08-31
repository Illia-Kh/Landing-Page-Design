import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ArrowRight, Users, Target, Lightbulb, Trophy } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

interface AboutUsProps {
  language: "ru" | "en" | "de" | "cs";
}

export function AboutUs({ language }: AboutUsProps) {
  const [activeTab, setActiveTab] = useState(0);

  const text = {
    ru: {
      title: "О нас",
      subtitle: "Познакомьтесь с командой CodeHero и узнайте о нашей миссии",
      tabs: ["Команда", "Миссия", "Инновации", "Достижения"],
      cards: [
        {
          title: "Опытная команда",
          description: "Наши разработчики имеют многолетний опыт в создании инновационных IT решений",
          icon: Users
        },
        {
          title: "Четкая миссия",
          description: "Мы стремимся помочь бизнесу расти через современные технологии",
          icon: Target
        },
        {
          title: "Инновационный подход",
          description: "Постоянно изучаем новые технологии и внедряем их в проекты",
          icon: Lightbulb
        },
        {
          title: "Доказанные результаты",
          description: "Успешно реализовали более 100 проектов для клиентов по всему миру",
          icon: Trophy
        }
      ],
      team: {
        title: "Наша команда",
        description: "Профессионалы с глубокими знаниями в различных областях IT",
        members: [
          { name: "Алексей Петров", role: "Lead Developer", experience: "8 лет" },
          { name: "Мария Сидорова", role: "UI/UX Designer", experience: "6 лет" },
          { name: "Дмитрий Козлов", role: "DevOps Engineer", experience: "7 лет" },
          { name: "Анна Волкова", role: "Project Manager", experience: "5 лет" }
        ]
      },
      mission: {
        title: "Наша миссия",
        description: "Создавать технологические решения, которые помогают бизнесу расти и развиваться",
        values: [
          "Инновации в каждой детали",
          "Качество превыше всего",
          "Клиент в центре внимания",
          "Постоянное развитие"
        ]
      },
      innovations: {
        title: "Инновации",
        description: "Мы всегда в курсе последних технологических трендов",
        technologies: [
          "React 18 и Next.js 14",
          "AI и машинное обучение",
          "Cloud-native архитектура",
          "Микросервисы и API"
        ]
      },
      achievements: {
        title: "Достижения",
        description: "Наши успехи говорят сами за себя",
        stats: [
          { number: "100+", label: "Реализованных проектов" },
          { number: "50+", label: "Довольных клиентов" },
          { number: "5+", label: "Лет на рынке" },
          { number: "24/7", label: "Поддержка клиентов" }
        ]
      },
      cta: "Узнать больше"
    },
    en: {
      title: "About Us",
      subtitle: "Meet the CodeHero team and learn about our mission",
      tabs: ["Team", "Mission", "Innovations", "Achievements"],
      cards: [
        {
          title: "Experienced Team",
          description: "Our developers have years of experience in creating innovative IT solutions",
          icon: Users
        },
        {
          title: "Clear Mission",
          description: "We strive to help businesses grow through modern technologies",
          icon: Target
        },
        {
          title: "Innovative Approach",
          description: "We constantly study new technologies and implement them in projects",
          icon: Lightbulb
        },
        {
          title: "Proven Results",
          description: "Successfully implemented over 100 projects for clients worldwide",
          icon: Trophy
        }
      ],
      team: {
        title: "Our Team",
        description: "Professionals with deep knowledge in various IT fields",
        members: [
          { name: "Alexey Petrov", role: "Lead Developer", experience: "8 years" },
          { name: "Maria Sidorova", role: "UI/UX Designer", experience: "6 years" },
          { name: "Dmitry Kozlov", role: "DevOps Engineer", experience: "7 years" },
          { name: "Anna Volkova", role: "Project Manager", experience: "5 years" }
        ]
      },
      mission: {
        title: "Our Mission",
        description: "Create technological solutions that help businesses grow and develop",
        values: [
          "Innovation in every detail",
          "Quality above all",
          "Client in focus",
          "Continuous development"
        ]
      },
      innovations: {
        title: "Innovations",
        description: "We are always up to date with the latest technology trends",
        technologies: [
          "React 18 and Next.js 14",
          "AI and Machine Learning",
          "Cloud-native architecture",
          "Microservices and APIs"
        ]
      },
      achievements: {
        title: "Achievements",
        description: "Our successes speak for themselves",
        stats: [
          { number: "100+", label: "Completed projects" },
          { number: "50+", label: "Happy clients" },
          { number: "5+", label: "Years in market" },
          { number: "24/7", label: "Client support" }
        ]
      },
      cta: "Learn More"
    },
    de: {
      title: "Über uns",
      subtitle: "Lernen Sie das CodeHero-Team kennen und erfahren Sie mehr über unsere Mission",
      tabs: ["Team", "Mission", "Innovationen", "Erfolge"],
      cards: [
        {
          title: "Erfahrenes Team",
          description: "Unsere Entwickler haben jahrelange Erfahrung in der Erstellung innovativer IT-Lösungen",
          icon: Users
        },
        {
          title: "Klare Mission",
          description: "Wir streben danach, Unternehmen durch moderne Technologien wachsen zu lassen",
          icon: Target
        },
        {
          title: "Innovativer Ansatz",
          description: "Wir studieren ständig neue Technologien und implementieren sie in Projekten",
          icon: Lightbulb
        },
        {
          title: "Bewährte Ergebnisse",
          description: "Erfolgreich über 100 Projekte für Kunden weltweit umgesetzt",
          icon: Trophy
        }
      ],
      team: {
        title: "Unser Team",
        description: "Profis mit tiefem Wissen in verschiedenen IT-Bereichen",
        members: [
          { name: "Alexey Petrov", role: "Lead Developer", experience: "8 Jahre" },
          { name: "Maria Sidorova", role: "UI/UX Designer", experience: "6 Jahre" },
          { name: "Dmitry Kozlov", role: "DevOps Engineer", experience: "7 Jahre" },
          { name: "Anna Volkova", role: "Project Manager", experience: "5 Jahre" }
        ]
      },
      mission: {
        title: "Unsere Mission",
        description: "Technologische Lösungen schaffen, die Unternehmen beim Wachstum und der Entwicklung helfen",
        values: [
          "Innovation in jedem Detail",
          "Qualität über alles",
          "Kunde im Fokus",
          "Kontinuierliche Entwicklung"
        ]
      },
      innovations: {
        title: "Innovationen",
        description: "Wir sind immer auf dem neuesten Stand der Technologietrends",
        technologies: [
          "React 18 und Next.js 14",
          "KI und maschinelles Lernen",
          "Cloud-native Architektur",
          "Microservices und APIs"
        ]
      },
      achievements: {
        title: "Erfolge",
        description: "Unsere Erfolge sprechen für sich",
        stats: [
          { number: "100+", label: "Abgeschlossene Projekte" },
          { number: "50+", label: "Zufriedene Kunden" },
          { number: "5+", label: "Jahre im Markt" },
          { number: "24/7", label: "Kundensupport" }
        ]
      },
      cta: "Mehr erfahren"
    },
    cs: {
      title: "O nás",
      subtitle: "Poznejte tým CodeHero a dozvěďte se více o naší misi",
      tabs: ["Tým", "Mise", "Inovace", "Úspěchy"],
      cards: [
        {
          title: "Zkušený tým",
          description: "Naši vývojáři mají roky zkušeností s vytvářením inovativních IT řešení",
          icon: Users
        },
        {
          title: "Jasná mise",
          description: "Snažíme se pomáhat firmám růst prostřednictvím moderních technologií",
          icon: Target
        },
        {
          title: "Inovativní přístup",
          description: "Neustále studujeme nové technologie a implementujeme je do projektů",
          icon: Lightbulb
        },
        {
          title: "Osvědčené výsledky",
          description: "Úspěšně jsme implementovali více než 100 projektů pro klienty po celém světě",
          icon: Trophy
        }
      ],
      team: {
        title: "Náš tým",
        description: "Profesionálové s hlubokými znalostmi v různých IT oblastech",
        members: [
          { name: "Alexey Petrov", role: "Lead Developer", experience: "8 let" },
          { name: "Maria Sidorova", role: "UI/UX Designer", experience: "6 let" },
          { name: "Dmitry Kozlov", role: "DevOps Engineer", experience: "7 let" },
          { name: "Anna Volkova", role: "Project Manager", experience: "5 let" }
        ]
      },
      mission: {
        title: "Naše mise",
        description: "Vytvářet technologická řešení, která pomáhají firmám růst a rozvíjet se",
        values: [
          "Inovace v každém detailu",
          "Kvalita nade vše",
          "Klient v centru pozornosti",
          "Neustálý rozvoj"
        ]
      },
      innovations: {
        title: "Inovace",
        description: "Jsme vždy aktuální s nejnovějšími technologickými trendy",
        technologies: [
          "React 18 a Next.js 14",
          "AI a strojové učení",
          "Cloud-native architektura",
          "Mikroslužby a API"
        ]
      },
      achievements: {
        title: "Úspěchy",
        description: "Naše úspěchy mluví samy za sebe",
        stats: [
          { number: "100+", label: "Dokončených projektů" },
          { number: "50+", label: "Spokojených klientů" },
          { number: "5+", label: "Let na trhu" },
          { number: "24/7", label: "Podpora klientů" }
        ]
      },
      cta: "Dozvědět se více"
    }
  };

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    setTimeout(() => {
      const sectionIds = ["team-section", "mission-section", "innovations-section", "achievements-section"];
      const targetSection = document.getElementById(sectionIds[index] || '');
      if (targetSection) {
        targetSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {text[language].title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {text[language].subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {text[language].cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card 
                className="h-full text-center hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                    <card.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {card.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
