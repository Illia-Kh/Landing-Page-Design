import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle } from "lucide-react";

interface PreliminaryPricesProps {
  language: string;
  onPageChange?: (page: "home" | "about" | "services" | "contact") => void;
}

const content = {
  ru: {
    title: "Предварительная стоимость услуг",
    intro: "Мы подготовили ориентировочные цены на основные направления. Обратите внимание: итоговая стоимость проекта зависит от ваших задач и технических требований.",
    items: [
      "Веб-разработка — от 500 €",
      "Мобильные приложения — от 1500 €",
      "Облачные решения — от 800 €",
      "Аналитика данных — от 1000 €"
    ],
    disclaimer: "Указанные цены являются ориентировочными и не являются публичной офертой.",
    cta: "Свяжитесь с нами, чтобы обсудить детали и получить точную смету под ваш проект."
  },
  en: {
    title: "Preliminary Service Prices",
    intro: "We have prepared approximate prices for our main services. Please note: the final project cost depends on your requirements and technical specifications.",
    items: [
      "Web Development — from 500 €",
      "Mobile Applications — from 1500 €",
      "Cloud Solutions — from 800 €",
      "Data Analytics — from 1000 €"
    ],
    disclaimer: "The prices listed are approximate and do not constitute a public offer.",
    cta: "Contact us to discuss details and get an accurate estimate for your project."
  },
  de: {
    title: "Vorläufige Servicepreise",
    intro: "Wir haben ungefähre Preise für unsere Hauptdienstleistungen vorbereitet. Bitte beachten Sie: Die endgültigen Projektkosten hängen von Ihren Anforderungen und technischen Spezifikationen ab.",
    items: [
      "Web-Entwicklung — ab 500 €",
      "Mobile Anwendungen — ab 1500 €",
      "Cloud-Lösungen — ab 800 €",
      "Datenanalyse — ab 1000 €"
    ],
    disclaimer: "Die angegebenen Preise sind ungefähr und stellen kein öffentliches Angebot dar.",
    cta: "Kontaktieren Sie uns, um Details zu besprechen und eine genaue Schätzung für Ihr Projekt zu erhalten."
  },
  cs: {
    title: "Předběžné ceny služeb",
    intro: "Připravili jsme orientační ceny pro naše hlavní služby. Upozorňujeme: finální cena projektu závisí na vašich požadavcích a technických specifikacích.",
    items: [
      "Vývoj webu — od 500 €",
      "Mobilní aplikace — od 1500 €",
      "Cloudová řešení — od 800 €",
      "Analytika dat — od 1000 €"
    ],
    disclaimer: "Uvedené ceny jsou orientační a nepředstavují veřejnou nabídku.",
    cta: "Kontaktujte nás, abychom prodiskutovali detaily a získali přesný odhad pro váš projekt."
  }
};

export function PreliminaryPrices({ language, onPageChange }: PreliminaryPricesProps) {
  const text = content[language as keyof typeof content] || content.ru;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="mb-20"
    >
      <div className="bg-card border rounded-2xl p-8 lg:p-12">
        {/* Header Section - Centered */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">{text.title}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {text.intro}
          </p>
        </div>

        {/* Prices Grid - Centered Two Columns */}
        <div className="flex justify-center mb-12">
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl">
            {text.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center justify-center gap-3 text-center"
              >
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-lg font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Disclaimer and CTA - Centered */}
        <div className="text-center space-y-8">
          {/* Highlighted Disclaimer */}
          <div className="flex items-center justify-center gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-orange-600 flex-shrink-0" />
            <p className="text-base font-medium text-orange-800 underline">
              {text.disclaimer}
            </p>
          </div>
          
          {/* CTA Button */}
          <button 
            onClick={() => onPageChange?.("contact")}
            className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-lg font-medium"
          >
            {text.cta}
          </button>
        </div>
      </div>
    </motion.section>
  );
}
