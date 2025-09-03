import { Hero } from "../components/Hero";
import { AboutUs } from "../components/AboutUs";
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
      <AboutUs language={language} onPageChange={onPageChange} />
      <Gallery language={language} onPageChange={onPageChange} />
    </>
  );
}
