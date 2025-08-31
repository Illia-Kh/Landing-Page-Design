import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ArrowRight, Users, Target, Lightbulb, Trophy } from "lucide-react";

interface AboutUsProps {
  language: string;
  onPageChange?: (page: "about") => void;
}

const content = {
  ru: {
    title: "О нас",
    subtitle: "Мы команда профессионалов, создающая будущее технологий",
    learnMore: "Подробнее",
    cards: [
      {
        icon: Users,
        title: "Наша команда",
        description: "Опытные специалисты с многолетним стажем в IT-сфере",
        link: "/team"
      },
      {
        icon: Target,
        title: "Наша миссия",
        description: "Помогаем бизнесу адаптироваться к цифровым изменениям",
        link: "/mission"
      },
      {
        icon: Lightbulb,
        title: "Инновации",
        description: "Используем передовые технологии для решения задач",
        link: "/innovations"
      },
      {
        icon: Trophy,
        title: "Достижения",
        description: "Более 100 успешно реализованных проектов",
        link: "/achievements"
      }
    ]
  },
  en: {
    title: "About Us",
    subtitle: "We are a team of professionals creating the future of technology",
    learnMore: "Learn more",
    cards: [
      {
        icon: Users,
        title: "Our Team",
        description: "Experienced specialists with years of experience in IT",
        link: "/team"
      },
      {
        icon: Target,
        title: "Our Mission",
        description: "Helping businesses adapt to digital changes",
        link: "/mission"
      },
      {
        icon: Lightbulb,
        title: "Innovation",
        description: "Using cutting-edge technologies to solve problems",
        link: "/innovations"
      },
      {
        icon: Trophy,
        title: "Achievements",
        description: "More than 100 successfully implemented projects",
        link: "/achievements"
      }
    ]
  },
  de: {
    title: "Über uns",
    subtitle: "Wir sind ein Team von Profis, die die Zukunft der Technologie schaffen",
    learnMore: "Mehr erfahren",
    cards: [
      {
        icon: Users,
        title: "Unser Team",
        description: "Erfahrene Spezialisten mit jahrelanger Erfahrung in der IT",
        link: "/team"
      },
      {
        icon: Target,
        title: "Unsere Mission",
        description: "Wir helfen Unternehmen bei der Anpassung an digitale Veränderungen",
        link: "/mission"
      },
      {
        icon: Lightbulb,
        title: "Innovation",
        description: "Verwendung modernster Technologien zur Problemlösung",
        link: "/innovations"
      },
      {
        icon: Trophy,
        title: "Erfolge",
        description: "Mehr als 100 erfolgreich umgesetzte Projekte",
        link: "/achievements"
      }
    ]
  },
  cs: {
    title: "O nás",
    subtitle: "Jsme tým profesionálů tvořících budoucnost technologií",
    learnMore: "Zjistit více",
    cards: [
      {
        icon: Users,
        title: "Náš tým",
        description: "Zkušení specialisté s mnohaletými zkušenostmi v IT",
        link: "/team"
      },
      {
        icon: Target,
        title: "Naše mise",
        description: "Pomáháme firmám přizpůsobit se digitálním změnám",
        link: "/mission"
      },
      {
        icon: Lightbulb,
        title: "Inovace",
        description: "Používáme špičkové technologie k řešení problémů",
        link: "/innovations"
      },
      {
        icon: Trophy,
        title: "Úspěchy",
        description: "Více než 100 úspěšně realizovaných projektů",
        link: "/achievements"
      }
    ]
  }
};

export function AboutUs({ language, onPageChange }: AboutUsProps) {
  const text = content[language as keyof typeof content] || content.ru;

  const handleCardClick = (index: number) => {
    if (onPageChange) {
      onPageChange("about");
      // Ждем навигации, затем прокручиваем к соответствующему разделу
      setTimeout(() => {
        const sectionIds = ["team-section", "mission-section", "innovations-section", "achievements-section"];
        const targetSection = document.getElementById(sectionIds[index]);
        if (targetSection) {
          targetSection.scrollIntoView({ 
            behavior: "smooth", 
            block: "start" 
          });
        }
      }, 500);
    }
  };

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">{text.title}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {text.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {text.cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card 
                className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer"
                onClick={() => handleCardClick(index)}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-colors">
                    <card.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{card.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="mb-4">
                    {card.description}
                  </CardDescription>
                  <div className="flex items-center justify-center gap-2 text-primary group-hover:gap-3 transition-all">
                    <span className="text-sm font-medium">{text.learnMore}</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
