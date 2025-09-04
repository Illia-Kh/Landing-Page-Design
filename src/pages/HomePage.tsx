import { Hero } from "../components/Hero";
import ChallengesWeSolve from "../components/sections/ChallengesWeSolve";
import { Gallery } from "../components/Gallery";
import { Language } from "../types";

interface HomePageProps {
  language: Language;
  onPageChange: (page: string) => void;
}

export function HomePage({ language, onPageChange }: HomePageProps) {
  return (
    <>
      <Hero language={language} onPageChange={onPageChange} />
      <ChallengesWeSolve language={language} />
      <Gallery language={language} onPageChange={onPageChange} />
    </>
  );
}
