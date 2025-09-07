import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

export default function SimpleHome() {
  const { lang = "cs" } = useParams();

  return (
    <>
      <Helmet>
        <title>IKH-TechSystems - Domů</title>
        <meta name="description" content="Inovativní IT řešení pro byznys" />
        <link rel="canonical" href={`https://ikhsystems.com/${lang}`} />
        <meta property="og:type" content="website" />
      </Helmet>

      <section className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-4">Vítejte na domovské stránce</h1>
        <p>Toto je test routingu s React Router.</p>
      </section>
    </>
  );
}