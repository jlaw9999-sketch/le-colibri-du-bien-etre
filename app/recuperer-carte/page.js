
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import GiftCard from '../../components/GiftCard';

export default function RecupererCartePage() {
  const [loading, setLoading] = useState(true);
  const [cartes, setCartes] = useState([]);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');
  const [printingIndex, setPrintingIndex] = useState(null);

  useEffect(() => {
    const recupererCartes = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');

      if (!token) {
        setError(
          'Lien de récupération manquant. Veuillez utiliser le lien reçu par e-mail.'
        );
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/recuperer-carte?token=${encodeURIComponent(token)}`
        );

        const data = await response.json();

        if (response.ok) {
          setCartes(data.cartes || []);
          setSearched(true);
        } else {
          setError(
            data.error || 'Impossible de récupérer vos cartes cadeaux.'
          );
        }
      } catch (err) {
        console.error(err);
        setError('Impossible de contacter le serveur.');
      } finally {
        setLoading(false);
      }
    };

    recupererCartes();
  }, []);

  const handlePrint = (index) => {
    setPrintingIndex(index);
  };

  useEffect(() => {
    if (printingIndex === null) return;

    const timer = setTimeout(() => {
      window.print();
    }, 300);

    return () => clearTimeout(timer);
  }, [printingIndex]);

  useEffect(() => {
    const handleAfterPrint = () => {
      setPrintingIndex(null);
    };

    window.addEventListener('afterprint', handleAfterPrint);

    return () => {
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, []);

  return (
    <div className="recuperer-page pt-28 pb-20 px-3 md:px-12 bg-amber-50/30 min-h-screen text-gray-800 flex flex-col items-center">

      <style jsx global>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 0;
          }

          html,
          body {
            margin: 0 !important;
            padding: 0 !important;
            width: 297mm !important;
            height: 210mm !important;
            background: white !important;
            overflow: hidden !important;
          }

          body * {
            visibility: hidden !important;
          }

          header,
          nav,
          footer {
            display: none !important;
          }

          .recuperer-page {
            width: 297mm !important;
            height: 210mm !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            display: block !important;
            overflow: hidden !important;
          }

          .print-hidden {
            display: none !important;
          }

          .printable-card-wrapper {
            display: none !important;
          }

          .printable-card-wrapper.print-target {
            display: flex !important;
            visibility: visible !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 297mm !important;
            height: 210mm !important;
            min-width: 297mm !important;
            min-height: 210mm !important;
            margin: 0 !important;
            padding: 0 !important;
            justify-content: center !important;
            align-items: center !important;
            background: white !important;
          }

          .printable-card-wrapper.print-target * {
            visibility: visible !important;
          }

          .printable-card-wrapper.print-target .gift-card {
            display: flex !important;
            width: 285mm !important;
            min-width: 285mm !important;
            max-width: 285mm !important;
            height: 180.38mm !important;
            min-height: 180.38mm !important;
            max-height: 180.38mm !important;
            aspect-ratio: auto !important;
            box-sizing: border-box !important;
            margin: 0 !important;
            padding: 5mm !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            overflow: hidden !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      {/* Titre */}
      <div className="max-w-xl w-full text-center mb-6 print-hidden">
        <h1 className="text-2xl md:text-3xl font-semibold text-amber-800 mb-2">
          Retrouver ma carte cadeau
        </h1>

        <p className="text-sm text-gray-600">
          Retrouvez et imprimez les cartes cadeaux associées à votre achat.
        </p>
      </div>

      {/* Chargement */}
      {loading && (
        <p className="text-amber-800 text-sm mb-6 print-hidden">
          Recherche de vos cartes cadeaux...
        </p>
      )}

      {/* Erreur */}
      {error && (
        <div className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm max-w-md w-full mb-6 print-hidden">
          <p className="text-red-600 text-sm">
            {error}
          </p>
        </div>
      )}

      {/* Aucun résultat */}
      {searched && cartes.length === 0 && (
        <div className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm max-w-md w-full print-hidden">
          <p className="text-gray-600 text-sm">
            Aucune carte cadeau payée n'a été trouvée pour cette adresse e-mail.
          </p>
        </div>
      )}

      {/* Cartes retrouvées */}
      {cartes.map((carte, index) => (
        <div
          key={carte.code || index}
          className={`w-full max-w-2xl mb-8 printable-card-wrapper flex flex-col items-center ${
            printingIndex === index ? 'print-target' : ''
          }`}
        >
          <GiftCard
            theme={carte.theme || 'plaisir'}
            prestation={carte.prestation || 'Soin Bien-Être'}
            beneficiaire={carte.beneficiaire || 'Prénom Nom'}
            offertPar={carte.offertPar || 'Proche'}
            message={carte.message || ''}
            code={carte.code || 'CODE-INDISPONIBLE'}
          />

          {/* Bouton d'impression */}
          <div className="text-center mt-4 print-hidden">
            <button
              type="button"
              onClick={() => handlePrint(index)}
              className="bg-amber-700 hover:bg-amber-800 text-white font-medium px-6 py-2.5 rounded-full text-sm transition shadow-md cursor-pointer"
            >
              🖨️ Imprimer cette carte en PDF
            </button>
          </div>
        </div>
      ))}

      {/* Retour accueil */}
      <div className="text-center mt-6 print-hidden">
        <Link
          href="/"
          className="text-gray-600 hover:text-amber-800 underline text-sm"
        >
          ← Retour à l'accueil
        </Link>
      </div>

    </div>
  );
}
