import { Hero } from "../components/Hero";
import { AboutUs } from "../components/AboutUs";
import { Gallery } from "../components/Gallery";
import { Page } from "../components/Router";

interface HomePageProps {
  language: string;
  onPageChange: (page: Page) => void;
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