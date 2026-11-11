
"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import GiftCard from "@/components/GiftCard";

function MerciContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [cardData, setCardData] = useState({
    theme: "plaisir",
    prestation: "Soin Bien-Être",
    beneficiaire: "Prénom Nom",
    offertPar: "Proche",
    message: "",
    code: "COLIBRI-2026-XXXX",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [loadError, setLoadError] = useState("");

  // Récupération des informations de la carte depuis Stripe
  useEffect(() => {
    let isActive = true;

    async function fetchCardDetails() {
      setIsLoading(true);
      setIsReady(false);
      setLoadError("");

      if (!sessionId) {
        setLoadError("Aucune session de paiement n'a été trouvée.");
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `/api/checkout?session_id=${encodeURIComponent(sessionId)}`
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.error || "Impossible de récupérer votre carte cadeau."
          );
        }

        if (!isActive) return;

        setCardData({
          theme: data.theme || "plaisir",
          prestation: data.prestation || "Soin Bien-Être",
          beneficiaire: data.beneficiaire || "Prénom Nom",
          offertPar: data.offertPar || "Proche",
          message: data.message || "",
          code: data.code || "COLIBRI-2026-XXXX",
        });

        setIsReady(true);
      } catch (err) {
        console.error(
          "Erreur lors de la récupération des détails de la carte :",
          err
        );

        if (isActive) {
          setLoadError(
            "Impossible de récupérer votre carte cadeau. Veuillez réessayer."
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    fetchCardDetails();

    return () => {
      isActive = false;
    };
  }, [sessionId]);

  // Impression de la carte
  const handlePrint = () => {
    if (!isReady) return;

    window.print();
  };

  return (
    <div className="merci-page pt-28 pb-20 px-3 md:px-12 bg-amber-50/30 min-h-screen text-gray-800 flex flex-col items-center">

      {/* STYLES D'IMPRESSION */}
      <style jsx global>{`
        .print-only-card-container {
          display: none;
        }

        @media print {
          @page {
            size: A4 landscape;
            margin: 0;
          }

          html,
          body {
            width: 297mm !important;
            height: 210mm !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            background: white !important;
          }

          header,
          nav,
          footer,
          .web-only {
            display: none !important;
            visibility: hidden !important;
          }

          .merci-page {
            display: block !important;
            position: relative !important;
            width: 297mm !important;
            height: 210mm !important;
            min-height: 210mm !important;
            max-height: 210mm !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            background: white !important;
          }

          .print-only-card-container {
            display: flex !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 297mm !important;
            height: 210mm !important;
            margin: 0 !important;
            padding: 0 !important;
            justify-content: center !important;
            align-items: center !important;
            overflow: hidden !important;
            background: white !important;
          }

         .print-only-card-container .merci-gift-card {
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
  padding: 2.2cqw !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  overflow: hidden !important;
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
}

          .print-only-card-container,
          .print-only-card-container * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      {/* TITRE ET INFORMATIONS À L'ÉCRAN */}
      <div className="web-only max-w-xl w-full text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-amber-800 mb-2">
          Paiement validé avec succès ! 🎉
        </h1>

        <p className="text-sm text-gray-600">
          Votre carte cadeau est prête à être offerte ou enregistrée.
        </p>
      </div>

      {/* MESSAGE DE CHARGEMENT */}
      {isLoading && (
        <div className="web-only text-center py-8">
          <p className="text-amber-800 font-medium">
            Récupération de votre carte cadeau...
          </p>
        </div>
      )}

      {/* MESSAGE D'ERREUR */}
      {!isLoading && loadError && (
        <div className="web-only max-w-xl w-full text-center bg-white rounded-xl p-6 shadow-sm border border-amber-200">
          <p className="text-red-700 mb-4">
            {loadError}
          </p>

          <Link
            href="/"
            className="inline-block bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-full transition"
          >
            Retour à l'accueil
          </Link>
        </div>
      )}

      {/* APERÇU À L'ÉCRAN */}
      {isReady && (
        <>
          <div className="web-only w-full max-w-2xl mb-8">
            <GiftCard
              theme={cardData.theme}
              prestation={cardData.prestation}
              beneficiaire={cardData.beneficiaire}
              offertPar={cardData.offertPar}
              message={cardData.message}
              code={cardData.code}
              className="merci-gift-card"
            />
          </div>

          {/* VERSION RÉSERVÉE À L'IMPRESSION */}
          <div className="print-only-card-container">
            <GiftCard
              theme={cardData.theme}
              prestation={cardData.prestation}
              beneficiaire={cardData.beneficiaire}
              offertPar={cardData.offertPar}
              message={cardData.message}
              code={cardData.code}
              className="merci-gift-card"
            />
          </div>
        </>
      )}

      {/* BOUTONS */}
      {isReady && (
        <div className="web-only flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handlePrint}
            disabled={!isReady}
            className="bg-amber-700 hover:bg-amber-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-6 py-3 rounded-full transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>🖨️ Imprimer / Enregistrer en PDF</span>
          </button>

          <Link
            href="/"
            className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-6 py-3 rounded-full transition text-center shadow-md"
          >
            Retour à l'accueil
          </Link>
        </div>
      )}
    </div>
  );
}

export default function MerciPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center pt-32">
          Chargement...
        </div>
      }
    >
      <MerciContent />
    </Suspense>
  );
}
