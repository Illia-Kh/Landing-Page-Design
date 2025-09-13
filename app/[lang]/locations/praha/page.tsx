import LocationPage from '@/components/sections/LocationPage'
import type { Language } from '@/types'

interface PrahaPageProps {
  params: Promise<{ lang: Language }>
}

export default async function PrahaPage({ params }: PrahaPageProps) {
  const { lang } = await params
  return (
    <LocationPage
      city="Praha"
      slug="praha"
      title="Tvorba webových stránek a webdesign v Praze"
      description="Potřebujete profesionální tvorba webu Praha? Naše agentura se specializuje na moderní webdesign Praha a vytváříme webové stránky, které pomáhají místním podnikům růst. Nabízíme kompletní řešení od návrhu až po spuštění, včetně optimalizace pro vyhledávače a mobilní zařízení. Naše zkušenosti s pražským trhem nám umožňují vytvářet weby, které skutečně fungují a přinášejí výsledky. Spolupracujeme s restauracemi, obchody, službami i technologickými firmami po celé Praze. Každý projekt přistupujeme individuálně a zaměřujeme se na potřeby vašich zákazníků. Kontaktujte nás a domluvte si konzultaci."
      lang={lang}
    />
  )
}
