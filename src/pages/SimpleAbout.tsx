import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

export default function SimpleAbout() {
  const { lang = "cs" } = useParams();

  return (
    <>
      <Helmet>
        <title>O nás — IKH Systems</title>
        <meta name="description" content="Dozvěďte se více o našem týmu a hodnotách." />
        <link rel="canonical" href={`https://ikhsystems.com/${lang}/about`} />
        <meta property="og:type" content="website" />
      </Helmet>

      <section className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-4">O nás</h1>
        <p>Toto je test routingu stránky O nás.</p>
      </section>
    </>
  );
}