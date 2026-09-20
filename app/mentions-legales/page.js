import Link from "next/link";

export default function MentionsLegales() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 font-sans">
      <Link href="/" className="text-emerald-700 hover:underline font-semibold mb-6 inline-block">
        ← Retour à l'accueil
      </Link>
      
      <h1 className="text-3xl font-bold text-emerald-800 border-b border-emerald-200 pb-3 mb-6">
        Mentions Légales
      </h1>

      <div className="space-y-6 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-emerald-900 mb-2">1. Éditeur du site</h2>
          <p>
  <strong>Nom / Entreprise :</strong> Le Colibri du Bien-Être<br />
  <strong>SIRET :</strong> 	93965812600015<br />
  <strong>Localisation :</strong> La Réunion (974)<br />
  <strong>Téléphone :</strong> 06 92 61 14 66<br />
  <strong>E-mail :</strong> lecolibridubienetre@gmail.com
</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-emerald-900 mb-2">2. Hébergement</h2>
          <p>
            Ce site est hébergé par <strong>Vercel Inc.</strong><br />
            Adresse : 440 N Barranca Ave #4133 Covina, CA 91723, USA —{" "}
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline">
              https://vercel.com
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-emerald-900 mb-2">3. Activité réglementée</h2>
          <p>
            Les prestations proposées sont des massages de bien-être et des soins énergétiques hors d'un cadre médical ou thérapeutique.
          </p>
        </section>
      </div>
    </div>
  );
}
