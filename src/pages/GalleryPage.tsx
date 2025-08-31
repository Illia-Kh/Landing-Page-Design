import { Gallery } from "../components/Gallery";

interface GalleryPageProps {
  language: string;
}

export function GalleryPage({ language }: GalleryPageProps) {
  return (
    <div className="py-20">
      <Gallery language={language} />
    </div>
  );
}
