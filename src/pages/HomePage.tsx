import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { Hero } from "../components/Hero";
import ChallengesWeSolve from "../components/sections/ChallengesWeSolve";
import { Language } from "../types";
import Vision from "../components/sections/Vision";

interface HomePageProps {
  language?: Language;
  onPageChange?: (page: string) => void;
}

function HomePageComponent({ language, onPageChange }: HomePageProps) {
  const { lang = "cs" } = useParams();
  const currentLanguage = language || (lang as Language);

  return (
    <>
      <Helmet>
        <title>IKH-TechSystems - Inovativní IT řešení pro byznys</title>
        <meta name="description" content="Vytváříme moderní technologická řešení, která pomáhají společnostem dosáhnout nových výšin v digitální éře." />
        <link rel="canonical" href={`https://ikhsystems.com/${lang}`} />
        <meta property="og:type" content="website" />
      </Helmet>

      <Hero language={currentLanguage} onPageChange={onPageChange || (() => {})} />
      <ChallengesWeSolve language={currentLanguage} />
      <Vision language={currentLanguage} />
      {/* Gallery removed */}
    </>
  );
}

// Default export for lazy loading
export default HomePageComponent;

// Keep named export for backward compatibility
export { HomePageComponent as HomePage };
