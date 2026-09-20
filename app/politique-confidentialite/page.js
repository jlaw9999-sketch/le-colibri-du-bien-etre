import Link from "next/link";

export default function PolitiqueConfidentialite() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 font-sans">
      <Link href="/" className="text-emerald-700 hover:underline font-semibold mb-6 inline-block">
        ← Retour à l'accueil
      </Link>

      <h1 className="text-3xl font-bold text-emerald-800 border-b border-emerald-200 pb-3 mb-6">
        Politique de Confidentialité (RGPD)
      </h1>

      <div className="space-y-6 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-emerald-900 mb-2">1. Données collectées</h2>
          <p>
            Nous collectons uniquement les informations strictement nécessaires aux demandes de contact et de réservation par e-mail : nom, prénom, e-mail et numéro de téléphone.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-emerald-900 mb-2">2. Utilisation et protection</h2>
          <p>
            Vos données sont utilisées exclusivement pour répondre à vos demandes et gérer vos rendez-vous. Elles ne sont jamais vendues, louées ni cédées à des tiers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-emerald-900 mb-2">3. Vos droits</h2>
          <p>
            Conformément au RGPD, vous disposez d'un droit d'accès, de modification et de suppression de vos données personnelles sur simple demande par e-mail à :{" "}
            <a href="mailto:lecolibridubienetre@gmail.com" className="text-emerald-700 underline">
              lecolibridubienetre@gmail.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
