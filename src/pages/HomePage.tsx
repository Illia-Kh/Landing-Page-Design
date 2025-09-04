import { Hero } from "../components/Hero";
import ChallengesWeSolve from "../components/sections/ChallengesWeSolve";
import { Language } from "../types";
import Vision from "../components/sections/Vision";

interface HomePageProps {
  language: Language;
  onPageChange: (page: string) => void;
}

export function HomePage({ language, onPageChange }: HomePageProps) {
  return (
    <>
      <Hero language={language} onPageChange={onPageChange} />
      <ChallengesWeSolve language={language} />
      <Vision language={language} />
      {/* Gallery removed */}
    </>
  );
}
