import { Language } from '@/types'
import { getTranslation } from '@/lib/i18n'
import { MotionSection, MotionStagger } from '@/components/client/MotionSection'
import { HeroCarousel, HeroLogo } from '@/components/client/HeroCarousel'
import { LangSwitcher } from '@/components/client/LangSwitcher'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface HeroSectionProps {
  lang: Language
}

export function HeroSection({ lang }: HeroSectionProps) {
  const t = getTranslation(lang)

  // Hero carousel images - using actual image paths that would be replaced with actual hero images
  const heroImages = [
    {
      src: '/hero-1.svg',
      alt: 'Tech Innovation',
      title: 'Digital Transformation',
      description: 'Leading the future of technology'
    },
    {
      src: '/hero-1.svg',
      alt: 'Software Development',
      title: 'Software Excellence',
      description: 'Building robust solutions'
    },
    {
      src: '/hero-1.svg',
      alt: 'System Integration',
      title: 'System Integration',
      description: 'Seamless connectivity'
    }
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with design-spec layout pattern */}
      <div className="absolute inset-0">
        {/* Hero carousel as background */}
        <HeroCarousel 
          images={heroImages} 
          className="w-full h-full"
        />
        
        {/* Gradient overlay following design-spec */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/60 to-background/90 dark:from-background/95 dark:via-background/80 dark:to-background/95" />
        
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-brand-secondary rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '1000ms' }}></div>
        </div>
      </div>

      {/* Navigation - design-spec layout */}
      <nav className="absolute top-0 left-0 right-0 z-50 py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <MotionSection direction="left" delay={0.2}>
            <Link href={`/${lang}`} className="flex items-center gap-3 text-2xl font-bold text-foreground">
              <HeroLogo className="w-12 h-12" />
              IKH-TechSystems
            </Link>
          </MotionSection>
          
          <MotionSection direction="right" delay={0.4}>
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-6">
                <Link 
                  href={`/${lang}/about`}
                  className="text-foreground/80 hover:text-brand-primary transition-colors duration-250"
                >
                  {t.common.navigation.about}
                </Link>
                <Link 
                  href={`/${lang}/services`}
                  className="text-foreground/80 hover:text-brand-primary transition-colors duration-250"
                >
                  {t.common.navigation.services}
                </Link>
                <Link 
                  href={`/${lang}/contacts`}
                  className="text-foreground/80 hover:text-brand-primary transition-colors duration-250"
                >
                  {t.common.navigation.contact}
                </Link>
              </div>
              <LangSwitcher currentLang={lang} />
            </div>
          </MotionSection>
        </div>
      </nav>

      {/* Hero content - design-spec grid layout */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center min-h-[80vh]">
          {/* Text content - lg:col-span-7 as per design-spec */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <MotionStagger className="space-y-8" staggerDelay={0.2}>
              <div>
                {/* H1 typography as per design-spec: text-4xl lg:text-5xl font-bold */}
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  <span className="block">{t.hero.title}</span>
                  <span className="text-gradient block mt-2">{t.hero.subtitle}</span>
                </h1>
              </div>
              
              <div>
                {/* Large body text as per design-spec: text-lg leading-relaxed */}
                <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                  {t.hero.description}
                </p>
              </div>
              
              {/* CTA buttons with design-spec button variants */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <Link href={`/${lang}/contacts`}>
                  <Button
                    variant="brandGradient"
                    size="lg"
                  >
                    {t.hero.cta.primary}
                  </Button>
                </Link>
                <Link href={`/${lang}/about`}>
                  <Button
                    variant="outline"
                    size="lg"
                  >
                    {t.hero.cta.secondary}
                  </Button>
                </Link>
              </div>
            </MotionStagger>
          </div>

          {/* Visual content area - lg:col-span-5 as per design-spec */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <MotionSection
              direction="right"
              delay={0.6}
              className="relative"
            >
              {/* Hero visual element placeholder */}
              <div className="relative w-96 h-96 max-w-full">
                <div className="absolute inset-0 bg-gradient-primary rounded-2xl opacity-20 blur-xl animate-pulse-slow"></div>
                <div className="relative bg-gradient-to-br from-card via-card to-card/80 rounded-2xl p-8 shadow-2xl backdrop-blur-sm border border-border/50">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                      <HeroLogo className="w-8 h-8" />
                      <span className="text-sm font-medium text-muted-foreground">
                        Innovation Hub
                      </span>
                    </div>
                    
                    {/* Stats or features visualization */}
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-gradient-primary rounded-full"></div>
                          <div className="h-2 bg-muted rounded flex-1"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </MotionSection>
          </div>
        </div>
      </div>

      {/* Scroll indicator - design-spec pattern */}
      <MotionSection 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        direction="up"
        delay={1.5}
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-sm">{t.common.actions.learnMore}</span>
          <div className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </MotionSection>
    </section>
  )
}