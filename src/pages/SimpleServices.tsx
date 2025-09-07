import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

export default function SimpleServices() {
  const { lang = "cs" } = useParams();

  return (
    <>
      <Helmet>
        <title>Služby — IKH Systems</title>
        <meta name="description" content="Kompletní spektrum IT služeb." />
        <link rel="canonical" href={`https://ikhsystems.com/${lang}/services`} />
        <meta property="og:type" content="website" />
      </Helmet>

      <section className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-4">Naše služby</h1>
        <p>Toto je test routingu stránky služeb.</p>
      </section>
    </>
  );
}