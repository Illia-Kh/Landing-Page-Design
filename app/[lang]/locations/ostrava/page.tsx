import LocationPage from '@/components/sections/LocationPage'
import type { Language } from '@/types'

interface OstravaPageProps {
  params: Promise<{ lang: Language }>
}

export default async function OstravaPage({ params }: OstravaPageProps) {
  const { lang } = await params
  return (
    <LocationPage
      city="Ostrava"
      slug="ostrava"
      title="Tvorba webových stránek a webdesign v Ostravě"
      description="Potřebujete kvalitní tvorba webu Ostrava? Specializujeme se na profesionální webdesign Ostrava pro podniky v Moravskoslezském kraji. Vytváříme moderní, funkční weby, které pomáhají místním firmám zvýšit svou online přítomnost. Naše služby zahrnují responzivní design, e-commerce řešení a optimalizaci pro vyhledávače. Spolupracujeme s průmyslovými podniky, obchody, restauracemi a službami po celé Ostravě. Rozumíme specifikám regionálního trhu a vytváříme weby, které skutečně fungují. Každý projekt řešíme komplexně od analýzy potřeb až po dlouhodobou podporu. Kontaktujte nás a domluvte si konzultaci."
      lang={lang}
    />
  )
}
