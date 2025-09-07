import { Language } from '@/types'
import { getTranslation } from '@/lib/i18n'
import { MotionSection, MotionStagger, MotionHover } from '@/components/client/MotionSection'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Monitor, Smartphone, Settings } from 'lucide-react'
import Link from 'next/link'

interface ChallengesSectionProps {
  lang: Language
}

const challengeIcons = [Monitor, Smartphone, Settings]

export function ChallengesSection({ lang }: ChallengesSectionProps) {
  const t = getTranslation(lang)

  return (
    <section className="py-20 bg-muted/30">
      {/* Container with design-spec standards: mx-auto px-4 */}
      <div className="container mx-auto px-4">
        {/* Section header with design-spec typography */}
        <MotionSection className="text-center mb-16">
          {/* H2 typography as per design-spec: text-3xl font-bold */}
          <h2 className="text-3xl font-bold text-foreground mb-6">
            {t.challenges.title}
          </h2>
          {/* Large body text as per design-spec: text-lg leading-relaxed */}
          <p className="text-lg leading-relaxed text-muted-foreground max-w-3xl mx-auto">
            {t.challenges.subtitle}
          </p>
        </MotionSection>

        {/* Grid layout following design-spec: responsive 1→2→3 */}
        <MotionStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.2}>
          {t.challenges.items.map((challenge, index) => {
            const IconComponent = challengeIcons[index] || Monitor
            
            return (
              <MotionHover key={index} scale={1.02} y={-4}>
                <Card className="h-full group relative overflow-hidden">
                  {/* Background gradient effect */}
                  <div className="absolute inset-0 bg-gradient-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-250"></div>
                  
                  <CardHeader className="relative z-10">
                    {/* Icon with brand colors */}
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-xl mb-4 group-hover:shadow-brand transition-all duration-250">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Card title with design-spec typography */}
                    <CardTitle className="text-xl font-semibold mb-3">
                      {challenge.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="relative z-10">
                    <CardDescription className="text-sm leading-relaxed">
                      {challenge.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </MotionHover>
            )
          })}
        </MotionStagger>

        {/* Bottom CTA with design-spec card pattern */}
        <MotionSection className="text-center mt-16" delay={0.8}>
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {t.common.actions.getStarted}
              </CardTitle>
              <CardDescription className="text-base">
                {t.hero.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/${lang}/contacts`}>
                <Button variant="brandGradient" size="lg">
                  {t.common.actions.contactUs}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </MotionSection>
      </div>
    </section>
  )
}