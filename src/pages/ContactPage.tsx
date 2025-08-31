import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Card } from "../components/ui/card";
import { TelegramContact } from "../components/TelegramContact";
import { useMobileDevice } from "../components/ui/use-mobile-device";

interface ContactPageProps {
  language: string;
}

const content = {
  ru: {
    title: "Свяжитесь с нами",
    subtitle: "Готовы обсудить ваш проект? Мы всегда готовы помочь!",
    contactInfoTitle: "Наша контактная информация",
    mapPlaceholder: "Интерактивная карта",
    contactInfo: [
      {
        icon: Mail,
        title: "Email",
        value: "hello@company.com",
        description: "Отправьте нам письмо"
      },
      {
        icon: Phone,
        title: "Телефон",
        value: "+420 485 101 234",
        description: "Звоните в рабочие часы"
      },
      {
        icon: MapPin,
        title: "Офис",
        value: "Либерец, ул. Soukenická 1145/21",
        description: "Приходите к нам в гости"
      },
      {
        icon: Clock,
        title: "Время работы",
        value: "Пн-Пт: 9:00-18:00",
        description: "CET время"
      }
    ],
    telegramTitle: "Напишите нам в Telegram"
  },
  en: {
    title: "Contact Us",
    subtitle: "Ready to discuss your project? We're always here to help!",
    contactInfoTitle: "Our Contact Information",
    mapPlaceholder: "Interactive Map",
    contactInfo: [
      {
        icon: Mail,
        title: "Email",
        value: "hello@company.com",
        description: "Send us an email"
      },
      {
        icon: Phone,
        title: "Phone",
        value: "+420 485 101 234",
        description: "Call during business hours"
      },
      {
        icon: MapPin,
        title: "Office",
        value: "Liberec, Soukenická 1145/21",
        description: "Visit our office"
      },
      {
        icon: Clock,
        title: "Working Hours",
        value: "Mon-Fri: 9:00-18:00",
        description: "CET time"
      }
    ],
    telegramTitle: "Message us on Telegram"
  },
  de: {
    title: "Kontaktieren Sie uns",
    subtitle: "Bereit, Ihr Projekt zu besprechen? Wir sind immer da, um zu helfen!",
    contactInfoTitle: "Unsere Kontaktinformationen",
    mapPlaceholder: "Interaktive Karte",
    contactInfo: [
      {
        icon: Mail,
        title: "E-Mail",
        value: "hello@company.com",
        description: "Senden Sie uns eine E-Mail"
      },
      {
        icon: Phone,
        title: "Telefon",
        value: "+420 485 101 234",
        description: "Anrufen während der Geschäftszeiten"
      },
      {
        icon: MapPin,
        title: "Büro",
        value: "Liberec, Soukenická 1145/21",
        description: "Besuchen Sie unser Büro"
      },
      {
        icon: Clock,
        title: "Arbeitszeiten",
        value: "Mo-Fr: 9:00-18:00",
        description: "MEZ Zeit"
      }
    ],
    telegramTitle: "Schreiben Sie uns auf Telegram"
  },
  cs: {
    title: "Kontaktujte nás",
    subtitle: "Připraveni prodiskutovat váš projekt? Vždy jsme tu, abychom pomohli!",
    contactInfoTitle: "Naše kontaktní informace",
    mapPlaceholder: "Interaktivní mapa",
    contactInfo: [
      {
        icon: Mail,
        title: "Email",
        value: "hello@company.com",
        description: "Napište nám email"
      },
      {
        icon: Phone,
        title: "Telefon",
        value: "+420 123 456 789",
        description: "Volejte v pracovní době"
      },
      {
        icon: MapPin,
        title: "Kancelář",
        value: "Liberec, Soukenická 1145/21",
        description: "Navštivte naši kancelář"
      },
      {
        icon: Clock,
        title: "Pracovní doba",
        value: "Po-Pá: 9:00-18:00",
        description: "CET čas"
      }
    ],
    telegramTitle: "Napište nám na Telegram"
  }
};

export function ContactPage({ language }: ContactPageProps) {
  const text = content[language as keyof typeof content] || content.ru;
  const isMobileDevice = useMobileDevice();

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
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {text.subtitle}
          </p>
        </motion.div>

        {/* Mobile Telegram Contact Section */}
        {isMobileDevice && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-20"
          >
            <TelegramContact language={language} />
          </motion.div>
        )}

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <h2 className="text-2xl font-bold mb-8">{text.contactInfoTitle}</h2>
            <div className="grid gap-6">
              {text.contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg flex-shrink-0">
                        <info.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{info.title}</h3>
                        <p className="text-lg mb-1">{info.value}</p>
                        <p className="text-sm text-muted-foreground">{info.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Interactive Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="aspect-video rounded-xl overflow-hidden border"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2565.8947345287754!2d15.055846415851845!3d50.766068179497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470e7404b8c0c6d1%3A0x400af0f6614b1b0!2sSoukeni%C4%8Dk%C3%A1%201145%2F21%2C%20460%2001%20Liberec%2C%20Czechia!5e0!3m2!1sen!2sus!4v1642345678901!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Liberec Office Location"
              />
            </motion.div>
          </motion.div>

          {/* Desktop Telegram Contact */}
          {!isMobileDevice && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <TelegramContact language={language} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
