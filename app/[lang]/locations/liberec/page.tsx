import LocationPage from '@/components/sections/LocationPage'
import type { Language } from '@/types'

interface LiberecPageProps {
  params: Promise<{ lang: Language }>
}

export default async function LiberecPage({ params }: LiberecPageProps) {
  const { lang } = await params
  return (
    <LocationPage
      city="Liberec"
      slug="liberec"
      title="Tvorba webových stránek a webdesign v Liberci"
      description="Potřebujete spolehlivou tvorba webu Liberec? Naše tým se specializuje na moderní webdesign Liberec pro podniky v Libereckém kraji. Vytváříme weby, které pomáhají místním firmám zvýšit svou online viditelnost a přilákat nové zákazníky. Nabízíme responzivní design, rychlé načítání a optimalizaci pro vyhledávače. Spolupracujeme s obchody, restauracemi, ubytováním, službami a dalšími podniky po celém Libereckém kraji. Každý projekt řešíme individuálně s důrazem na funkčnost a uživatelskou přívětivost. Naše weby jsou připravené na růst a snadno se spravují. Kontaktujte nás a domluvte si konzultaci."
      lang={lang}
    />
  )
}
