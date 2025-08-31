import { motion } from "motion/react";
import { Logo, LogoCompact } from "../components/Logo";
import { HeroLogo } from "../components/HeroLogo";
import { CodeLogo, CodeLogoCompact } from "../components/CodeLogo";
import { CodeHeroLogo } from "../components/CodeHeroLogo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { useMobileDevice } from "../components/ui/use-mobile-device";

interface LogoShowcaseProps {
  language: string;
}

export function LogoShowcase({ language }: LogoShowcaseProps) {
  const isMobileDevice = useMobileDevice();
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">IKH-TechFlow Logo Showcase</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Демонстрация нового фирменного стиля и логотипа компании IKH-TechFlow
          </p>
        </motion.div>

        {/* Code Hero Logo - скрываем на мобильных устройствах и при ширине экрана < 768px */}
        {!isMobileDevice && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-20"
          >
            <Card className="p-12 text-center bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl mb-4 text-white">Code Hero Logo</CardTitle>
                <CardDescription className="text-gray-300">Интерактивный логотип в стиле IDE для главных страниц</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeHeroLogo language={language} />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Traditional Hero Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-20"
        >
          <Card className="p-12 text-center bg-gradient-to-br from-background to-secondary/30">
            <CardHeader>
              <CardTitle className="text-2xl mb-4">Traditional Hero Logo</CardTitle>
              <CardDescription>Классический полноразмерный логотип</CardDescription>
            </CardHeader>
            <CardContent>
              <HeroLogo language={language} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Code Logo Variations - скрываем на мобильных устройствах и при ширине экрана < 768px */}
        {!isMobileDevice && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Code Logo - Large */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="p-8 text-center h-full bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Large Code Logo</CardTitle>
                <CardDescription className="text-gray-300">Полноразмерный терминальный интерфейс</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center py-8">
                <CodeLogo size="lg" animated={true} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Code Logo - Medium */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Card className="p-8 text-center h-full bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Medium Code Logo</CardTitle>
                <CardDescription className="text-gray-300">Универсальный размер для секций</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center py-8">
                <CodeLogo size="md" animated={true} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Code Logo - Small */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="p-8 text-center h-full bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Small Code Logo</CardTitle>
                <CardDescription className="text-gray-300">Компактный для интерфейсов</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center py-8">
                <CodeLogo size="sm" animated={true} />
              </CardContent>
            </Card>
          </motion.div>
        </div>
        )}

        {/* Traditional Logo Variations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Standard Logo - Large */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Card className="p-8 text-center h-full">
              <CardHeader>
                <CardTitle>Large Logo</CardTitle>
                <CardDescription>Для лендингов и важных разделов</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center py-8">
                <Logo size="lg" animated={true} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Standard Logo - Medium */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Card className="p-8 text-center h-full">
              <CardHeader>
                <CardTitle>Medium Logo</CardTitle>
                <CardDescription>Универсальный размер для большинства случаев</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center py-8">
                <Logo size="md" animated={true} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Standard Logo - Small */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Card className="p-8 text-center h-full">
              <CardHeader>
                <CardTitle>Small Logo</CardTitle>
                <CardDescription>Для компактных интерфейсов</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center py-8">
                <Logo size="sm" animated={true} />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Compact Versions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mb-16"
        >
          <Card className="p-8">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Compact Logos</CardTitle>
              <CardDescription>Компактные версии для навигации и хедеров</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {!isMobileDevice && (
                <div className="bg-gray-900 p-6 rounded-lg">
                  <h4 className="text-white text-lg mb-4 text-center">Code Logo Compact</h4>
                  <div className="flex items-center justify-center space-x-12">
                    <div className="text-center">
                      <p className="text-sm text-gray-300 mb-4">Анимированная</p>
                      <CodeLogoCompact animated={true} />
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-300 mb-4">Статичная</p>
                      <CodeLogoCompact animated={false} />
                    </div>
                  </div>
                </div>
              )}
              
              <div className="bg-background p-6 rounded-lg border">
                <h4 className="text-lg mb-4 text-center">Traditional Logo Compact</h4>
                <div className="flex items-center justify-center space-x-12">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">Анимированная</p>
                    <LogoCompact animated={true} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">Статичная</p>
                    <LogoCompact animated={false} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Integration Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mb-16"
        >
          <Card className="p-8">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Примеры интеграции</CardTitle>
              <CardDescription>Как логотипы выглядят в разных контекстах</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Header simulation */}
              <div className="bg-background border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  {!isMobileDevice ? (
                    <CodeLogoCompact animated={false} />
                  ) : (
                    <LogoCompact animated={false} />
                  )}
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted-foreground">Навигация</span>
                    <span className="text-sm text-muted-foreground">Услуги</span>
                    <span className="text-sm text-muted-foreground">Контакты</span>
                  </div>
                </div>
              </div>

              {/* Footer simulation */}
              <div className="bg-gray-900 text-white rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <Logo size="md" animated={false} />
                  <div className="text-sm text-gray-300">
                    © 2025 IKH-TechFlow. Все права защищены.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Brand Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Card className="p-8">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Принципы использования</CardTitle>
              <CardDescription>Основные правила применения логотипа IKH-TechFlow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4 text-primary">✅ Рекомендуется</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Использовать Code Logo для tech-контекста</li>
                    <li>• Traditional Logo для формальных документов</li>
                    <li>• Сохранять пропорции всех элементов</li>
                    <li>• Анимировать только в Hero-секциях</li>
                    <li>• Соблюдать цветовую схему терминала</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4 text-destructive">❌ Не рекомендуется</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Менять структуру кода в терминале</li>
                    <li>• Использовать неподходящие цвета</li>
                    <li>• Смешивать стили логотипов</li>
                    <li>• Убирать терминальные элементы</li>
                    <li>• Нарушать читаемость кода</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}