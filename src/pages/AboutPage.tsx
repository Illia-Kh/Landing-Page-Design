import { motion } from "framer-motion";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Users, Target, Award, Globe, Lightbulb } from "lucide-react";
import { JsonLd, schemas } from "../components/JsonLd";

interface AboutPageProps {
  language: string;
}

const content = {
  ru: {
    title: "О нас",
    subtitle: "Небольшая команда, которая делает проекты под ключ",
    description: "Мы — команда специалистов в разработке, дизайне и технологиях. При необходимости подключаем проверенных фрилансеров — так остаёмся гибкими и собранными под любую задачу.",
    stats: [
      { icon: Users, value: "10+", label: "Специалистов в команде" },
      { icon: Target, value: "50+", label: "Реализованных решений" },
      { icon: Award, value: "5", label: "Отраслевых признаний" },
      { icon: Globe, value: "4", label: "Стран партнерства" }
    ],
    mission: {
      title: "Наша миссия",
      text: "Наша цель помочь клиенту реально достичь результата: увеличить продажи, улучшить удобство для пользователей или автоматизировать процессы."
    },
    values: {
      title: "Наши ценности",
      items: [
        { title: "Честность", description: "Мы открыто говорим, что умеем, а чему ещё учимся." },
        { title: "Качество", description: "Даже небольшой проект должен работать стабильно." },
        { title: "Партнёрство", description: "Строим отношения так, чтобы клиенту хотелось вернуться." }
      ]
    },
    team: {
      title: "Наша команда",
      subtitle: "Маленькая, собранная и гибкая",
      description: "Мы — небольшая команда специалистов. Каждый отвечает за свою часть работы, а вместе мы закрываем проекты под ключ. Если задача требует расширения, привлекаем проверенных фрилансеров и быстро собираем нужную экспертизу.",
      members: [
        { name: "Illia Kharchenko", role: "Технический директор", experience: "5+ лет опыта" },
        { name: "Elyzabet Zakharchenko", role: "Ведущий дизайнер", experience: "4+ лет опыта" },
        { name: "Viktor Novák", role: "Архитектор решений", experience: "6+ лет опыта" },
        { name: "Anastasia Kowalski", role: "Менеджер проектов", experience: "3+ лет опыта" }
      ]
    },
    innovations: {
      title: "Инновации",
      subtitle: "Современные инструменты без лишнего пафоса",
      description: "Мы используем современные инструменты и подходы, которые помогают быстро запускать проекты и масштабировать их, когда бизнес растёт.",
      technologies: [
        { name: "Искусственный интеллект", description: "Пробуем решения, которые автоматизируют рутину и помогают анализировать данные." },
        { name: "Облачные технологии", description: "Используем платформы AWS, Azure и Google Cloud для надёжной работы проектов." },
        { name: "DevOps практика", description: "Настраиваем процессы так, чтобы обновления выкатывались без сбоев." },
        { name: "Микросервисная архитектура", description: "Строим гибкие решения, которые легко дорабатывать и развивать." }
      ]
    },
    achievements: {
      title: "Достижения",
      description: "За годы работы мы достигли значительных результатов и получили признание в индустрии.",
      milestones: [
        { year: "2019", title: "Основание компании", description: "Запуск деятельности в области инновационных IT-решений" },
        { year: "2021", title: "Первые крупные проекты", description: "Успешная реализация комплексных решений для корпоративных клиентов" },
        { year: "2022", title: "Отраслевое признание", description: "Получение профессиональных оценок от независимых экспертов" },
        { year: "2024", title: "Выход на европейские рынки", description: "Присутствие на 5 европейских рынках и развитие международных партнерств" }
      ]
    }
  },
  en: {
    title: "About Us",
    subtitle: "A small team that delivers turnkey projects",
    description: "We are a team of specialists in development, design, and technology. When needed, we bring in trusted freelancers — this keeps us flexible and assembled for any task.",
    stats: [
      { icon: Users, value: "10+", label: "Team Specialists" },
      { icon: Target, value: "50+", label: "Delivered Solutions" },
      { icon: Award, value: "5", label: "Industry Recognitions" },
      { icon: Globe, value: "4", label: "Partner Countries" }
    ],
    mission: {
      title: "Our Mission",
      text: "Our goal is to help clients actually achieve results: increase sales, improve user experience, or automate processes."
    },
    values: {
      title: "Our Values",
      items: [
        { title: "Honesty", description: "We openly say what we can do and what we're still learning." },
        { title: "Quality", description: "Even a small project should work reliably." },
        { title: "Partnership", description: "We build relationships so clients want to come back." }
      ]
    },
    team: {
      title: "Our Team",
      subtitle: "Small, focused, and flexible",
      description: "We are a small team of specialists. Each person handles their part of the work, and together we deliver turnkey projects. When a task requires expansion, we bring in trusted freelancers and quickly assemble the needed expertise.",
      members: [
        { name: "Illia Kharchenko", role: "Technical Director", experience: "5+ years experience" },
        { name: "Elyzabet Zakharchenko", role: "Lead Designer", experience: "4+ years experience" },
        { name: "Viktor Novák", role: "Solutions Architect", experience: "6+ years experience" },
        { name: "Anastasia Kowalski", role: "Project Manager", experience: "3+ years experience" }
      ]
    },
    innovations: {
      title: "Innovation",
      subtitle: "Modern tools without unnecessary hype",
      description: "We use modern tools and approaches that help quickly launch projects and scale them when business grows.",
      technologies: [
        { name: "Artificial Intelligence", description: "We try solutions that automate routine tasks and help analyze data." },
        { name: "Cloud Technologies", description: "We use AWS, Azure, and Google Cloud platforms for reliable project operation." },
        { name: "DevOps Practice", description: "We set up processes so updates deploy without failures." },
        { name: "Microservices Architecture", description: "We build flexible solutions that are easy to improve and develop." }
      ]
    },
    achievements: {
      title: "Achievements",
      description: "Over the years, we have achieved significant results and gained recognition in the industry.",
      milestones: [
        { year: "2019", title: "Company Foundation", description: "Launch of innovative IT solutions business activities" },
        { year: "2021", title: "First Major Projects", description: "Successful implementation of comprehensive solutions for corporate clients" },
        { year: "2022", title: "Industry Recognition", description: "Receiving professional evaluations from independent experts" },
        { year: "2024", title: "European Market Entry", description: "Presence in 5 European markets and development of international partnerships" }
      ]
    }
  },
  de: {
    title: "Über uns",
    subtitle: "Ein kleines Team, das schlüsselfertige Projekte liefert",
    description: "Wir sind ein Team von Spezialisten in Entwicklung, Design und Technologie. Bei Bedarf holen wir vertrauenswürdige Freelancer hinzu — so bleiben wir flexibel und für jede Aufgabe gerüstet.",
    stats: [
      { icon: Users, value: "10+", label: "Team-Spezialisten" },
      { icon: Target, value: "50+", label: "Umgesetzte Lösungen" },
      { icon: Award, value: "5", label: "Branchenanerkennung" },
      { icon: Globe, value: "4", label: "Partnerländer" }
    ],
    mission: {
      title: "Unsere Mission",
      text: "Unser Ziel ist es, Kunden dabei zu helfen, tatsächlich Ergebnisse zu erzielen: Verkäufe steigern, Benutzerfreundlichkeit verbessern oder Prozesse automatisieren."
    },
    values: {
      title: "Unsere Werte",
      items: [
        { title: "Ehrlichkeit", description: "Wir sagen offen, was wir können und wobei wir noch lernen." },
        { title: "Qualität", description: "Auch ein kleines Projekt sollte zuverlässig funktionieren." },
        { title: "Partnerschaft", description: "Wir bauen Beziehungen auf, damit Kunden gerne zurückkommen." }
      ]
    },
    team: {
      title: "Unser Team",
      subtitle: "Klein, fokussiert und flexibel",
      description: "Wir sind ein kleines Team von Spezialisten. Jeder übernimmt seinen Teil der Arbeit, und zusammen liefern wir schlüsselfertige Projekte. Wenn eine Aufgabe Erweiterung erfordert, holen wir vertrauenswürdige Freelancer hinzu und sammeln schnell die benötigte Expertise.",
      members: [
        { name: "Illia Kharchenko", role: "Technischer Direktor", experience: "5+ Jahre Erfahrung" },
        { name: "Elyzabet Zakharchenko", role: "Lead Designer", experience: "4+ Jahre Erfahrung" },
        { name: "Viktor Novák", role: "Lösungsarchitekt", experience: "6+ Jahre Erfahrung" },
        { name: "Anastasia Kowalski", role: "Projektmanager", experience: "3+ Jahre Erfahrung" }
      ]
    },
    innovations: {
      title: "Innovation",
      subtitle: "Moderne Tools ohne unnötigen Hype",
      description: "Wir verwenden moderne Tools und Ansätze, die helfen, Projekte schnell zu starten und zu skalieren, wenn das Geschäft wächst.",
      technologies: [
        { name: "Künstliche Intelligenz", description: "Wir probieren Lösungen aus, die Routineaufgaben automatisieren und bei der Datenanalyse helfen." },
        { name: "Cloud-Technologien", description: "Wir nutzen AWS-, Azure- und Google Cloud-Plattformen für zuverlässigen Projektbetrieb." },
        { name: "DevOps-Praxis", description: "Wir richten Prozesse so ein, dass Updates ohne Ausfälle bereitgestellt werden." },
        { name: "Microservices-Architektur", description: "Wir bauen flexible Lösungen, die einfach zu verbessern und zu entwickeln sind." }
      ]
    },
    achievements: {
      title: "Erfolge",
      description: "Im Laufe der Jahre haben wir bedeutende Ergebnisse erzielt und Anerkennung in der Branche erhalten.",
      milestones: [
        { year: "2019", title: "Unternehmensgründung", description: "Start der Geschäftstätigkeit im Bereich innovativer IT-Lösungen" },
        { year: "2021", title: "Erste Großprojekte", description: "Erfolgreiche Umsetzung umfassender Lösungen für Unternehmenskunden" },
        { year: "2022", title: "Branchenanerkennung", description: "Erhalt professioneller Bewertungen von unabhängigen Experten" },
        { year: "2024", title: "Europäischer Markteintritt", description: "Präsenz in 5 europäischen Märkten und Entwicklung internationaler Partnerschaften" }
      ]
    }
  },
  cs: {
    title: "O nás",
    subtitle: "Malý tým, který dodává projekty na klíč",
    description: "Jsme tým specialistů ve vývoji, designu a technologiích. V případě potřeby přizveme ověřené freelancery — tak zůstáváme flexibilní a připravení na jakýkoli úkol.",
    stats: [
      { icon: Users, value: "10+", label: "Specialistů v týmu" },
      { icon: Target, value: "50+", label: "Realizovaných řešení" },
      { icon: Award, value: "5", label: "Oborových uznání" },
      { icon: Globe, value: "4", label: "Partnerských zemí" }
    ],
    mission: {
      title: "Naše mise",
      text: "Naším cílem je pomoci klientům skutečně dosáhnout výsledků: zvýšit prodeje, zlepšit uživatelskou přívětivost nebo automatizovat procesy."
    },
    values: {
      title: "Naše hodnoty",
      items: [
        { title: "Upřímnost", description: "Otevřeně říkáme, co umíme a čemu se ještě učíme." },
        { title: "Kvalita", description: "I malý projekt musí fungovat spolehlivě." },
        { title: "Partnerství", description: "Budujeme vztahy tak, aby se klienti rádi vraceli." }
      ]
    },
    team: {
      title: "Náš tým",
      subtitle: "Malý, soustředěný a flexibilní",
      description: "Jsme malý tým specialistů. Každý má na starosti svou část práce a společně dodáváme projekty na klíč. Když úkol vyžaduje rozšíření, přizveme ověřené freelancery a rychle sestavíme potřebnou expertizu.",
      members: [
        { name: "Illia Kharchenko", role: "Technický ředitel", experience: "5+ let zkušeností" },
        { name: "Elyzabet Zakharchenko", role: "Vedoucí designér", experience: "4+ let zkušeností" },
        { name: "Viktor Novák", role: "Architekt řešení", experience: "6+ let zkušeností" },
        { name: "Anastasia Kowalski", role: "Projektový manažer", experience: "3+ let zkušeností" }
      ]
    },
    innovations: {
      title: "Inovace",
      subtitle: "Moderní nástroje bez zbytečného humbuku",
      description: "Používáme moderní nástroje a přístupy, které pomáhají rychle spouštět projekty a škálovat je, když podnikání roste.",
      technologies: [
        { name: "Umělá inteligence", description: "Zkoušíme řešení, která automatizují rutinní úkoly a pomáhají analyzovat data." },
        { name: "Cloudové technologie", description: "Používáme platformy AWS, Azure a Google Cloud pro spolehlivý provoz projektů." },
        { name: "DevOps praxe", description: "Nastavujeme procesy tak, aby se aktualizace nasazovaly bez výpadků." },
        { name: "Mikroservisní architektura", description: "Stavíme flexibilní řešení, která se snadno vylepšují a rozvíjejí." }
      ]
    },
    achievements: {
      title: "Úspěchy",
      description: "Během let jsme dosáhli významných výsledků a získali uznání v průmyslu.",
      milestones: [
        { year: "2019", title: "Založení společnosti", description: "Zahájení činnosti v oblasti inovativních IT řešení" },
        { year: "2021", title: "První velké projekty", description: "Úspěšná realizace komplexních řešení pro podnikové klienty" },
        { year: "2022", title: "Oborové uznání", description: "Získání profesionálních hodnocení od nezávislých expertů" },
        { year: "2024", title: "Vstup na evropské trhy", description: "Působnost na 5 evropských trzích a rozvoj mezinárodních partnerství" }
      ]
    }
  }
};

export function AboutPage({ language }: AboutPageProps) {
  const text = content[language as keyof typeof content] || content.ru;

  const breadcrumbItems = [
    { name: "Home", url: "https://ikhsystems.com/" },
    { name: text.title, url: "https://ikhsystems.com/about" }
  ];

  return (
    <div className="py-20">
      <JsonLd 
        type="BreadcrumbList" 
        data={schemas.breadcrumbList(breadcrumbItems)} 
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

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {text.stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Section */}
        <section id="team-section" className="mb-20 scroll-mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">{text.team.title}</h2>
            <p className="text-xl text-muted-foreground mb-6">{text.team.subtitle}</p>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">{text.team.description}</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {text.team.members.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border rounded-lg p-6 text-center"
              >
                <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-1">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.experience}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="aspect-[21/9] rounded-2xl overflow-hidden"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwd29ya2luZyUyMG9mZmljZXxlbnwxfHx8fDE3NTY0OTM3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Team working together"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </section>

        {/* Mission Section */}
        <section id="mission-section" className="mb-20 scroll-mt-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold">{text.mission.title}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {text.mission.text}
              </p>
              <div className="space-y-6">
                <h3 className="text-xl font-bold">{text.values.title}</h3>
                {text.values.items.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-card border rounded-lg p-6"
                  >
                    <h4 className="text-lg font-semibold mb-2">{value.title}</h4>
                    <p className="text-muted-foreground">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="aspect-video rounded-xl overflow-hidden"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwbWVldGluZyUyMG9mZmljZXxlbnwxfHx8fDE3NTY0OTM3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Team meeting"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Innovations Section */}
        <section id="innovations-section" className="mb-20 scroll-mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Lightbulb className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">{text.innovations.title}</h2>
            <p className="text-xl text-muted-foreground mb-6">{text.innovations.subtitle}</p>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">{text.innovations.description}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {text.innovations.technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border rounded-lg p-8"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg mb-4 flex items-center justify-center">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{tech.name}</h3>
                <p className="text-muted-foreground">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        
      </div>
    </div>
  );
}
