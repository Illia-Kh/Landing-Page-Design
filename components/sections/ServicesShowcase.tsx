import { Language } from '@/types'
import { getTranslation } from '@/lib/i18n'
import { MotionSection, MotionStagger, MotionHover } from '@/components/client/MotionSection'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Code, Smartphone, Layers, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface ServicesShowcaseProps {
  lang: Language
}

const serviceIcons = {
  web: Code,
  mobile: Smartphone,
  integration: Layers,
}

export function ServicesShowcase({ lang }: ServicesShowcaseProps) {
  const t = getTranslation(lang)

  return (
    <section className="py-20 bg-background">
      {/* Container with design-spec standards: mx-auto px-4 */}
      <div className="container mx-auto px-4">
        {/* Section header with design-spec typography */}
        <MotionSection className="text-center mb-16">
          {/* H2 typography as per design-spec: text-3xl font-bold */}
          <h2 className="text-3xl font-bold text-foreground mb-6">
            {t.services.title}
          </h2>
          {/* Large body text as per design-spec: text-lg leading-relaxed */}
          <p className="text-lg leading-relaxed text-muted-foreground max-w-3xl mx-auto">
            {t.services.subtitle}
          </p>
        </MotionSection>

        {/* Grid layout following design-spec: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 */}
        <MotionStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.2}>
          {t.services.items.map((service, index) => {
            const IconComponent = Object.values(serviceIcons)[index] || Code
            
            return (
              <MotionHover key={index} scale={1.02} y={-8}>
                <Card className="h-full group">
                  <CardHeader>
                    {/* Icon with brand gradient */}
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-xl mb-4 group-hover:shadow-brand transition-all duration-250">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Card title with design-spec typography */}
                    <CardTitle className="text-xl font-semibold">
                      {service.title}
                    </CardTitle>
                    
                    <CardDescription className="text-sm">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    {/* Features list with consistent spacing */}
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li 
                          key={featureIndex}
                          className="flex items-start gap-3 text-sm text-muted-foreground"
                        >
                          <div className="w-2 h-2 bg-brand-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  
                  <CardFooter>
                    <div className="flex items-center text-brand-primary font-medium group-hover:text-brand-secondary transition-colors duration-250 cursor-pointer">
                      {t.common.actions.learnMore}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-250" />
                    </div>
                  </CardFooter>
                </Card>
              </MotionHover>
            )
          })}
        </MotionStagger>

        {/* CTA section with design-spec button */}
        <MotionSection className="text-center mt-16" delay={0.6}>
          <Link href={`/${lang}/services`}>
            <Button variant="brandGradient" size="lg">
              {t.common.actions.learnMore}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </MotionSection>
      </div>
    </section>
  )
}