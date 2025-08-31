import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Users, Target, Award, Globe, Lightbulb, Trophy } from "lucide-react";

interface AboutPageProps {
  language: string;
}

const content = {
  ru: {
    title: "О нашей компании",
    subtitle: "Мы создаем инновационные решения для цифрового будущего",
    description: "Наша команда экспертов работает над созданием передовых технологических решений, которые помогают бизнесу расти и развиваться в современном цифровом мире.",
    stats: [
      { icon: Users, value: "35+", label: "Специалистов в команде" },
      { icon: Target, value: "150+", label: "Реализованных решений" },
      { icon: Award, value: "12", label: "Отраслевых признаний" },
      { icon: Globe, value: "8", label: "Стран партнерства" }
    ],
    mission: {
      title: "Наша миссия",
      text: "Мы стремимся создавать технологические решения, которые не просто решают задачи, но и вдохновляют на новые достижения."
    },
    values: {
      title: "Наши ценности",
      items: [
        { title: "Инновации", description: "Постоянный поиск новых решений" },
        { title: "Качество", description: "Безупречное выполнение каждого проекта" },
        { title: "Партнерство", description: "Долгосрочные отношения с клиентами" }
      ]
    },
    team: {
      title: "Наша команда",
      subtitle: "Профессионалы с многолетним опытом",
      description: "Мы объединили лучших специалистов в области разработки, дизайна и управления проектами. Каждый член нашей команды вносит уникальный вклад в создание инновационных решений.",
      members: [
        { name: "Illia Kharchenko", role: "Технический директор", experience: "15+ лет опыта" },
        { name: "Elyzabet Zakharchenko", role: "Ведущий дизайнер", experience: "12+ лет опыта" },
        { name: "Viktor Novák", role: "Архитектор решений", experience: "18+ лет опыта" },
        { name: "Anastasia Kowalski", role: "Менеджер проектов", experience: "10+ лет опыта" }
      ]
    },
    innovations: {
      title: "Инновации",
      subtitle: "Передовые технологии в действии",
      description: "Мы используем самые современные технологии и методологии разработки для создания решений будущего.",
      technologies: [
        { name: "Искусственный интеллект", description: "Machine Learning и Deep Learning для интеллектуальной автоматизации" },
        { name: "Облачные технологии", description: "Масштабируемые решения на базе AWS, Azure и Google Cloud" },
        { name: "DevOps практики", description: "Непрерывная интеграция и развертывание для быстрой доставки продуктов" },
        { name: "Микросервисная архитектура", description: "Гибкие и устойчивые системы нового поколения" }
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
    title: "About Our Company",
    subtitle: "We create innovative solutions for the digital future",
    description: "Our team of experts works on creating cutting-edge technological solutions that help businesses grow and develop in the modern digital world.",
    stats: [
      { icon: Users, value: "35+", label: "Team Specialists" },
      { icon: Target, value: "150+", label: "Delivered Solutions" },
      { icon: Award, value: "12", label: "Industry Recognitions" },
      { icon: Globe, value: "8", label: "Partner Countries" }
    ],
    mission: {
      title: "Our Mission",
      text: "We strive to create technological solutions that don't just solve problems, but also inspire new achievements."
    },
    values: {
      title: "Our Values",
      items: [
        { title: "Innovation", description: "Constant search for new solutions" },
        { title: "Quality", description: "Flawless execution of every project" },
        { title: "Partnership", description: "Long-term relationships with clients" }
      ]
    },
    team: {
      title: "Our Team",
      subtitle: "Professionals with years of experience",
      description: "We've brought together the best specialists in development, design, and project management. Each team member contributes uniquely to creating innovative solutions.",
      members: [
        { name: "Illia Kharchenko", role: "Technical Director", experience: "15+ years experience" },
        { name: "Elyzabet Zakharchenko", role: "Lead Designer", experience: "12+ years experience" },
        { name: "Viktor Novák", role: "Solutions Architect", experience: "18+ years experience" },
        { name: "Anastasia Kowalski", role: "Project Manager", experience: "10+ years experience" }
      ]
    },
    innovations: {
      title: "Innovation",
      subtitle: "Cutting-edge technologies in action",
      description: "We use the most modern technologies and development methodologies to create solutions of the future.",
      technologies: [
        { name: "Artificial Intelligence", description: "Machine Learning and Deep Learning for intelligent automation" },
        { name: "Cloud Technologies", description: "Scalable solutions based on AWS, Azure and Google Cloud" },
        { name: "DevOps Practices", description: "Continuous integration and deployment for fast product delivery" },
        { name: "Microservices Architecture", description: "Flexible and fault-tolerant systems of the new generation" }
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
    title: "Über unser Unternehmen",
    subtitle: "Wir schaffen innovative Lösungen für die digitale Zukunft",
    description: "Unser Expertenteam arbeitet an der Entwicklung modernster technologischer Lösungen, die Unternehmen beim Wachstum und der Entwicklung in der modernen digitalen Welt helfen.",
    stats: [
      { icon: Users, value: "35+", label: "Team-Spezialisten" },
      { icon: Target, value: "150+", label: "Umgesetzte Lösungen" },
      { icon: Award, value: "12", label: "Branchenanerkennung" },
      { icon: Globe, value: "8", label: "Partnerländer" }
    ],
    mission: {
      title: "Unsere Mission",
      text: "Wir streben danach, technologische Lösungen zu schaffen, die nicht nur Probleme lösen, sondern auch zu neuen Erfolgen inspirieren."
    },
    values: {
      title: "Unsere Werte",
      items: [
        { title: "Innovation", description: "Ständige Suche nach neuen Lösungen" },
        { title: "Qualität", description: "Tadellose Ausführung jedes Projekts" },
        { title: "Partnerschaft", description: "Langfristige Beziehungen zu Kunden" }
      ]
    },
    team: {
      title: "Unser Team",
      subtitle: "Profis mit jahrelanger Erfahrung",
      description: "Wir haben die besten Spezialisten in den Bereichen Entwicklung, Design und Projektmanagement zusammengebracht. Jedes Teammitglied trägt einzigartig zur Schaffung innovativer Lösungen bei.",
      members: [
        { name: "Illia Kharchenko", role: "Technischer Direktor", experience: "15+ Jahre Erfahrung" },
        { name: "Elyzabet Zakharchenko", role: "Lead Designer", experience: "12+ Jahre Erfahrung" },
        { name: "Viktor Novák", role: "Lösungsarchitekt", experience: "18+ Jahre Erfahrung" },
        { name: "Anastasia Kowalski", role: "Projektmanager", experience: "10+ Jahre Erfahrung" }
      ]
    },
    innovations: {
      title: "Innovation",
      subtitle: "Spitzentechnologien in Aktion",
      description: "Wir verwenden die modernsten Technologien und Entwicklungsmethoden, um Lösungen der Zukunft zu schaffen.",
      technologies: [
        { name: "Künstliche Intelligenz", description: "Machine Learning und Deep Learning für intelligente Automatisierung" },
        { name: "Cloud-Technologien", description: "Skalierbare Lösungen basierend auf AWS, Azure und Google Cloud" },
        { name: "DevOps-Praktiken", description: "Kontinuierliche Integration und Bereitstellung für schnelle Produktlieferung" },
        { name: "Microservices-Architektur", description: "Flexible und ausfallsichere Systeme der neuen Generation" }
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
    title: "O naší společnosti",
    subtitle: "Vytváříme inovativní řešení pro digitální budoucnost",
    description: "Náš tým expertů pracuje na vytváření špičkových technologických řešení, která pomáhají firmám růst a rozvíjet se v moderním digitálním světě.",
    stats: [
      { icon: Users, value: "35+", label: "Specialistů v týmu" },
      { icon: Target, value: "150+", label: "Realizovaných řešení" },
      { icon: Award, value: "12", label: "Oborových uznání" },
      { icon: Globe, value: "8", label: "Partnerských zemí" }
    ],
    mission: {
      title: "Naše mise",
      text: "Snažíme se vytvářet technologická řešení, která nejen řeší problémy, ale také inspirují k novým úspěchům."
    },
    values: {
      title: "Naše hodnoty",
      items: [
        { title: "Inovace", description: "Neustálé hledání nových řešení" },
        { title: "Kvalita", description: "Dokonalé provedení každého projektu" },
        { title: "Partnerství", description: "Dlouhodobé vztahy s klienty" }
      ]
    },
    team: {
      title: "Náš tým",
      subtitle: "Profesionálové s mnohaletými zkušenostmi",
      description: "Spojili jsme nejlepší specialisty v oblasti vývoje, designu a řízení projektů. Každý člen týmu jedinečně přispívá k vytváření inovativních řešení.",
      members: [
        { name: "Illia Kharchenko", role: "Technický ředitel", experience: "15+ let zkušeností" },
        { name: "Elyzabet Zakharchenko", role: "Vedoucí designér", experience: "12+ let zkušeností" },
        { name: "Viktor Novák", role: "Architekt řešení", experience: "18+ let zkušeností" },
        { name: "Anastasia Kowalski", role: "Projektový manažer", experience: "10+ let zkušeností" }
      ]
    },
    innovations: {
      title: "Inovace",
      subtitle: "Špičkové technologie v akci",
      description: "Používáme nejmodernější technologie a metodiky vývoje pro vytváření řešení budoucnosti.",
      technologies: [
        { name: "Umělá inteligence", description: "Machine Learning a Deep Learning pro inteligentní automatizaci" },
        { name: "Cloudové technologie", description: "Škálovatelná řešení založená na AWS, Azure a Google Cloud" },
        { name: "DevOps praktiky", description: "Kontinuální integrace a nasazování pro rychlé dodávky produktů" },
        { name: "Mikroservisní architektura", description: "Flexibilní a odolné systémy nové generace" }
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

  return (
    <div className="py-20">
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

        {/* Achievements Section */}
        <section id="achievements-section" className="scroll-mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Trophy className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">{text.achievements.title}</h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">{text.achievements.description}</p>
          </motion.div>

          <div className="space-y-8">
            {text.achievements.milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-center gap-8 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
              >
                <div className="flex-shrink-0 w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">{milestone.year}</span>
                </div>
                <div className="bg-card border rounded-lg p-6 flex-grow">
                  <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}