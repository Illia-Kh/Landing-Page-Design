import LocationPage from '@/components/sections/LocationPage'
import type { Language } from '@/types'

interface PlzenPageProps {
  params: Promise<{ lang: Language }>
}

export default async function PlzenPage({ params }: PlzenPageProps) {
  const { lang } = await params
  return (
    <LocationPage
      city="Plzeň"
      slug="plzen"
      title="Tvorba webových stránek a webdesign v Plzni"
      description="Hledáte profesionální tvorba webu Plzeň? Naše agentura vytváří moderní webdesign Plzeň pro podniky v Plzeňském kraji. Specializujeme se na vytváření webů, které pomáhají místním firmám oslovit své zákazníky a zvýšit prodeje. Nabízíme kompletní řešení včetně responzivního designu, e-commerce a SEO optimalizace. Spolupracujeme s pivovary, restauracemi, obchody, lékaři a dalšími podniky po celé Plzni. Každý web navrhujeme s ohledem na specifické potřeby vašeho oboru a cílové skupiny. Naše řešení jsou spolehlivá, rychlá a připravená na budoucí rozvoj. Kontaktujte nás a domluvte si konzultaci."
      lang={lang}
    />
  )
}
