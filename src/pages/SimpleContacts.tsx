import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

export default function SimpleContacts() {
  const { lang = "cs" } = useParams();

  return (
    <>
      <Helmet>
        <title>Kontakt — IKH Systems</title>
        <meta name="description" content="Kontaktujte nás pro váš projekt." />
        <link rel="canonical" href={`https://ikhsystems.com/${lang}/contacts`} />
        <meta property="og:type" content="website" />
      </Helmet>

      <section className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-4">Kontakt</h1>
        <p>Toto je test routingu kontaktní stránky.</p>
      </section>
    </>
  );
}