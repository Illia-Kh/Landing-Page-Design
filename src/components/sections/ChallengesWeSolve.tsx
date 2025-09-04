import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ShieldCheck, Users, Rocket, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import type { Language } from "../../types";

import en from "../../i18n/locales/en.json";
import cs from "../../i18n/locales/cs.json";
import ru from "../../i18n/locales/ru.json";
import de from "../../i18n/locales/de.json";

type ChallengeCard = { icon: string; title: string; desc: string };

const localeMap: Record<Language, any> = {
  en,
  cs,
  ru,
  de
};

const iconOrder: Array<{ key: string; Icon: React.ComponentType<any> }> = [
  { key: "cost", Icon: Wallet },
  { key: "growth", Icon: Users },
  { key: "speed", Icon: Rocket },
  { key: "resilience", Icon: ShieldCheck }
];

interface ChallengesWeSolveProps {
  language: Language;
}

export default function ChallengesWeSolve({ language }: ChallengesWeSolveProps) {
  const t = localeMap[language] ?? localeMap.ru;

  const heading: string = t?.sections?.challenges?.heading ?? "Challenges We Solve";
  const cards: ChallengeCard[] = Array.isArray(t?.sections?.challenges?.cards)
    ? t.sections.challenges.cards
    : [];

  return (
    <section id="challenges" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">{heading}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.slice(0, 4).map((card, index) => {
            const Icon = iconOrder[index]?.Icon ?? Wallet;
            return (
              <motion.div
                key={`${card.title}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-xl">{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{card.desc}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


