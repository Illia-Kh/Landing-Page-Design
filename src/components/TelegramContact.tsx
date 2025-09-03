import { motion } from "framer-motion";
import { Send, MessageCircle, ArrowRight, Bot, Zap } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

interface TelegramContactProps {
  language: string;
}

const content = {
  ru: {
    title: "Свяжитесь с нами через Telegram",
    subtitle: "Быстро, удобно и безопасно",
    botName: "@IKHTechSystemsBot",
    description: "Наш интеллектуальный Telegram бот готов помочь вам 24/7. Получите мгновенные ответы на ваши вопросы о наших услугах.",
    features: [
      {
        icon: Zap,
        title: "Мгновенные ответы",
        description: "Получайте ответы на ваши вопросы в режиме реального времени"
      },
      {
        icon: Bot,
        title: "ИИ-помощник",
        description: "Умный бот, который понимает ваши потребности"
      },
      {
        icon: MessageCircle,
        title: "Персональная поддержка",
        description: "При необходимости подключим живого специалиста"
      }
    ],
    steps: {
      title: "Как начать общение:",
      list: [
        "Нажмите кнопку 'Открыть Telegram'",
        "Напишите /start в чате с ботом",
        "Опишите ваш проект или задайте вопрос",
        "Получите персональную консультацию"
      ]
    },
    buttons: {
      openTelegram: "Открыть Telegram",
      copyBot: "Копировать имя бота"
    },
    success: "Имя бота скопировано в буфер обмена!"
  },
  en: {
    title: "Contact us via Telegram",
    subtitle: "Fast, convenient and secure",
    botName: "@IKHTechSystemsBot",
    description: "Our intelligent Telegram bot is ready to help you 24/7. Get instant answers to your questions about our services.",
    features: [
      {
        icon: Zap,
        title: "Instant Answers",
        description: "Get responses to your questions in real-time"
      },
      {
        icon: Bot,
        title: "AI Assistant",
        description: "Smart bot that understands your needs"
      },
      {
        icon: MessageCircle,
        title: "Personal Support",
        description: "We'll connect you with a live specialist when needed"
      }
    ],
    steps: {
      title: "How to start chatting:",
      list: [
        "Click the 'Open Telegram' button",
        "Write /start in the chat with the bot",
        "Describe your project or ask a question",
        "Get personalized consultation"
      ]
    },
    buttons: {
      openTelegram: "Open Telegram",
      copyBot: "Copy bot name"
    },
    success: "Bot name copied to clipboard!"
  },
  de: {
    title: "Kontaktieren Sie uns über Telegram",
    subtitle: "Schnell, bequem und sicher",
    botName: "@IKHTechSystemsBot",
    description: "Unser intelligenter Telegram-Bot ist bereit, Ihnen 24/7 zu helfen. Erhalten Sie sofortige Antworten auf Ihre Fragen zu unseren Dienstleistungen.",
    features: [
      {
        icon: Zap,
        title: "Sofortige Antworten",
        description: "Erhalten Sie Antworten auf Ihre Fragen in Echtzeit"
      },
      {
        icon: Bot,
        title: "KI-Assistent",
        description: "Intelligenter Bot, der Ihre Bedürfnisse versteht"
      },
      {
        icon: MessageCircle,
        title: "Persönlicher Support",
        description: "Bei Bedarf verbinden wir Sie mit einem live Spezialisten"
      }
    ],
    steps: {
      title: "So starten Sie das Gespräch:",
      list: [
        "Klicken Sie auf 'Telegram öffnen'",
        "Schreiben Sie /start im Chat mit dem Bot",
        "Beschreiben Sie Ihr Projekt oder stellen Sie eine Frage",
        "Erhalten Sie persönliche Beratung"
      ]
    },
    buttons: {
      openTelegram: "Telegram öffnen",
      copyBot: "Bot-Namen kopieren"
    },
    success: "Bot-Name in Zwischenablage kopiert!"
  },
  cs: {
    title: "Kontaktujte nás přes Telegram",
    subtitle: "Rychle, pohodlně a bezpečně",
    botName: "@IKHTechSystemsBot",
    description: "Náš inteligentní Telegram bot je připraven vám pomoci 24/7. Získejte okamžité odpovědi na vaše otázky o našich službách.",
    features: [
      {
        icon: Zap,
        title: "Okamžité odpovědi",
        description: "Získejte odpovědi na vaše otázky v reálném čase"
      },
      {
        icon: Bot,
        title: "AI asistent",
        description: "Chytrý bot, který rozumí vašim potřebám"
      },
      {
        icon: MessageCircle,
        title: "Osobní podpora",
        description: "V případě potřeby vás propojíme s živým specialistou"
      }
    ],
    steps: {
      title: "Jak začít konverzaci:",
      list: [
        "Klikněte na tlačítko 'Otevřít Telegram'",
        "Napište /start do chatu s botem",
        "Popište svůj projekt nebo položte otázku",
        "Získejte personalizovanou konzultaci"
      ]
    },
    buttons: {
      openTelegram: "Otevřít Telegram",
      copyBot: "Kopírovat jméno bota"
    },
    success: "Jméno bota zkopírováno do schránky!"
  }
};

export function TelegramContact({ language }: TelegramContactProps) {
  const text = content[language as keyof typeof content] || content.ru;

  const handleOpenTelegram = () => {
    window.open(`https://t.me/IKHTechSystemsBot`, '_blank');
  };

  const handleCopyBot = async () => {
    try {
      await navigator.clipboard.writeText(text.botName);
      alert(text.success);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text.botName;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        alert(text.success);
      } catch (err) {
        console.error('Could not copy text: ', err);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Card className="p-8 bg-gradient-to-br from-[color-mix(in_oklab,var(--bg),white_6%)] to-[color-mix(in_oklab,var(--bg),white_12%)] border-[var(--border-color)]">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-[var(--accent)] rounded-full mb-4"
          >
            <Send className="h-8 w-8 text-[var(--accent-contrast)]" />
          </motion.div>
          <h2 className="text-2xl font-bold mb-2">{text.title}</h2>
          <p className="text-muted-foreground">{text.subtitle}</p>
        </div>

        {/* Bot Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-[var(--card-bg)] rounded-full shadow-sm border border-[var(--border-color)] mb-4">
            <Bot className="h-5 w-5 text-[var(--accent)]" />
            <code className="font-mono text-lg font-semibold">{text.botName}</code>
          </div>
          <p className="text-muted-foreground max-w-md mx-auto">{text.description}</p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6 mb-8"
        >
          {text.features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="text-center p-4 rounded-lg bg-[color-mix(in_oklab,var(--card-bg),black_5%)]"
            >
              <feature.icon className="h-8 w-8 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8"
        >
          <h3 className="font-semibold mb-4 text-center">{text.steps.title}</h3>
          <div className="grid gap-3 max-w-md mx-auto">
            {text.steps.list.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="flex-shrink-0 w-6 h-6 bg-[var(--accent)] text-[var(--accent-contrast)] rounded-full flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </div>
                <p className="text-sm">{step}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button 
            onClick={handleOpenTelegram}
            className="bg-[var(--accent)] hover:bg-[color-mix(in_oklab,var(--accent),black_10%)] text-[var(--accent-contrast)] px-8 py-3"
          >
            <Send className="h-4 w-4 mr-2" />
            {text.buttons.openTelegram}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
          <Button 
            onClick={handleCopyBot}
            variant="outline"
            className="px-8 py-3"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            {text.buttons.copyBot}
          </Button>
        </motion.div>
      </Card>
    </motion.div>
  );
}
