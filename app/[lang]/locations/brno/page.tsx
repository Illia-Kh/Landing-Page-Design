import LocationPage from '@/components/sections/LocationPage'
import type { Language } from '@/types'

interface BrnoPageProps {
  params: Promise<{ lang: Language }>
}

export default async function BrnoPage({ params }: BrnoPageProps) {
  const { lang } = await params
  return (
    <LocationPage
      city="Brno"
      slug="brno"
      title="Tvorba webových stránek a webdesign v Brně"
      description="Hledáte spolehlivou tvorba webu Brno? Naše tým vytváří moderní webdesign Brno pro podniky všech velikostí. Rozumíme specifickým potřebám brněnského trhu a vytváříme weby, které pomáhají místním firmám oslovit své zákazníky. Nabízíme responzivní design, rychlé načítání a optimalizaci pro vyhledávače. Spolupracujeme s kavárnami, obchody, lékaři, právníky a dalšími profesionály v Brně. Každý web navrhujeme tak, aby odrážel identitu vaší značky a přitahoval nové zákazníky. Naše řešení jsou škálovatelná a připravená na budoucí růst vašeho podnikání. Kontaktujte nás a domluvte si konzultaci."
      lang={lang}
    />
  )
}
