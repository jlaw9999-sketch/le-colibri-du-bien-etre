
import Image from "next/image";
import { Sparkles, Gift, Snowflake } from "lucide-react";

export default function GiftCard({
  theme = "plaisir",
  prestation = "Soin Bien-Être",
  beneficiaire = "Prénom Nom",
  offertPar = "Proche",
  message = "",
  code = "CADEAU-2026-X7K",
  className = "",
}) {
  const isFetes = theme === "fetes";

  return (
    <>
      <div
        className={`gift-card ${isFetes ? "gift-fetes" : "gift-plaisir"} ${className}`}
      >
        {/* VOILE D'AMBIANCE */}
        <div className="gift-overlay" />

        {/* EN-TÊTE */}
        <div className="gift-header">
          <div className="gift-brand">
            <div className="gift-logo">
              <Image
                src="/images/logo-colibri.png"
                alt="Le Colibri du Bien-Être"
                fill
                sizes="8vw"
                className="object-contain"
                priority
              />
            </div>

            <div className="gift-brand-text">
              <h3>Le Colibri du Bien-Être</h3>
              <p>Soin & Sérénité</p>
            </div>
          </div>

          <div className="gift-badge">
            {isFetes ? <Snowflake /> : <Gift />}
            <span>{isFetes ? "Bon des Fêtes" : "Carte Cadeau"}</span>
          </div>
        </div>

        {/* CONTENU CENTRAL */}
        <div className="gift-content">

          <div className="gift-prestation">
            <p className="gift-label">
              <Sparkles />
              Soin offert :
            </p>

            <p className="gift-prestation-name">
              {prestation}
            </p>
          </div>

          <div className="gift-people">

            <div className="gift-person">
              <span>Pour :</span>
              <strong>{beneficiaire || "Prénom Nom"}</strong>
            </div>

            <div className="gift-person">
              <span>De la part de :</span>
              <strong>{offertPar || "Prénom Nom"}</strong>
            </div>

          </div>

          {message && (
            <div className="gift-message">
              <p>« {message} »</p>
            </div>
          )}

        </div>

        {/* PIED DE CARTE */}
        <div className="gift-footer">

          <div className="gift-footer-code">
            <p>
              Code : <strong>{code || "CODE-INDISPONIBLE"}</strong>
            </p>
            <span>Valable 6 mois après achat</span>
          </div>

          <div className="gift-footer-contact">
            <p>Sur RDV : 06 92 61 14 66</p>
            <span>lecolibridubienetre.fr</span>
          </div>

        </div>
      </div>

      <style jsx global>{`
        .gift-card {
          container-type: inline-size;
          position: relative;
          width: 100%;
          aspect-ratio: 1.58 / 1;
          box-sizing: border-box;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 2.2cqw;
          border: 0.15cqw solid #d4af37;
          border-radius: 2cqw;
          background-size: cover;
          background-position: center;
          box-shadow: 0 1cqw 2cqw rgba(0, 0, 0, 0.18);
          isolation: isolate;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .gift-plaisir {
          color: #422006;
          background-image: url("/images/carte-zen-bg.jpeg");
        }

        .gift-fetes {
          color: white;
          background-image: url("/images/carte-fetes-bg.png");
        }

        .gift-overlay {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background: rgba(255, 248, 220, 0.10);
        }

        .gift-fetes .gift-overlay {
          background: rgba(0, 0, 0, 0.20);
        }

        .gift-header {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1.5cqw;
        }

        .gift-brand {
  display: flex;
  align-items: center;
  gap: 1.5cqw;
  min-width: 0;
  padding: 1.5cqw 2cqw;
  background: rgba(255, 248, 220, 0.78);
backdrop-filter: blur(3px);
  border: 0.2cqw solid #d4af37;
  border-radius: 2cqw;
  box-shadow: 0 0.3cqw 0.8cqw rgba(0,0,0,0.15);
}

       .gift-logo {
  position: relative;
  flex: 0 0 10cqw;
  width: 10cqw;
  height: 10cqw;
  filter: drop-shadow(0 0.4cqw 0.4cqw rgba(0,0,0,0.25));
}

	.gift-brand-text h3 {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 3.6cqw;
  line-height: 1.15;
  font-weight: 700;
  letter-spacing: 0.025em;
  margin: 0;
  color: #422006;
}

        .gift-brand-text p {
          font-size: 1.45cqw;
          font-style: italic;
          margin: 0.4cqw 0 0;
        }

        .gift-plaisir .gift-brand-text p {
          color: #78350f;
          font-weight: 500;
        }

        .gift-fetes .gift-brand-text p {
          color: #78350f;
        }

.gift-fetes .gift-brand-text h3 {
  color: #422006;
}

        .gift-badge {
          display: flex;
          align-items: center;
          gap: 0.7cqw;
          padding: 1cqw 1.8cqw;
          border-radius: 5cqw;
          font-size: 1.9cqw;
          font-weight: 700;
          border: 0.15cqw solid rgba(255,255,255,0.25);
          white-space: nowrap;
        }

        .gift-badge svg {
          width: 2.2cqw;
          height: 2.2cqw;
        }

        .gift-plaisir .gift-badge {
          background: rgba(120, 53, 15, 0.92);
          color: #fff7ed;
        }

        .gift-fetes .gift-badge {
          background: rgba(245, 158, 11, 0.92);
          color: #451a03;
        }

        .gift-content {
          position: relative;
          z-index: 1;
          width: 100%;
          margin-top: auto;
          margin-bottom: auto;
          display: flex;
          flex-direction: column;
          gap: 1.8cqw;
        }

        .gift-prestation {
          padding: 1.2cqw;
          border-radius: 1.3cqw;
          border: 0.15cqw solid;
          backdrop-filter: blur(0.5cqw);
          box-shadow: 0 0.3cqw 0.8cqw rgba(0,0,0,0.10);
        }

        .gift-plaisir .gift-prestation {
          background: rgba(255,255,255,0.90);
          border-color: rgba(217, 165, 70, 0.75);
          color: #451a03;
        }

        .gift-fetes .gift-prestation {
          background: rgba(0,0,0,0.55);
          border-color: rgba(255,255,255,0.20);
          color: white;
        }

        .gift-label {
          display: flex;
          align-items: center;
          gap: 0.5cqw;
          margin: 0 0 0.4cqw;
          font-size: 1.8cqw;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .gift-label svg {
          width: 1.9cqw;
          height: 1.9cqw;
        }

        .gift-plaisir .gift-label {
          color: #92400e;
        }

        .gift-fetes .gift-label {
          color: #fcd34d;
        }

        .gift-prestation-name {
          font-size: 2.8cqw;
          font-weight: 800;
          line-height: 1.25;
          margin: 0;
          overflow-wrap: anywhere;
        }

        .gift-people {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.8cqw;
        }

        .gift-person {
          min-width: 0;
          padding: 1.4cqw;
          border: 0.15cqw solid;
          border-radius: 1.2cqw;
          backdrop-filter: blur(0.5cqw);
          box-shadow: 0 0.3cqw 0.8cqw rgba(0,0,0,0.08);
          display: flex;
          flex-direction: column;
          gap: 0.3cqw;
        }

        .gift-plaisir .gift-person {
          background: rgba(255,255,255,0.85);
          border-color: rgba(217, 165, 70, 0.60);
          color: #451a03;
        }

        .gift-fetes .gift-person {
          background: rgba(0,0,0,0.50);
          border-color: rgba(255,255,255,0.20);
          color: white;
        }

        .gift-person span {
          font-size: 1.8cqw;
          font-weight: 600;
        }

        .gift-plaisir .gift-person span {
          color: #92400e;
        }

        .gift-fetes .gift-person span {
          color: #fcd34d;
        }

        .gift-person strong {
          display: block;
          font-size: 2.4cqw;
          line-height: 1.2;
          overflow-wrap: anywhere;
        }

        .gift-message {
          width: 94%;
          align-self: center;
          padding: 1.3cqw 1.8cqw;
          border: 0.15cqw solid;
          border-radius: 1.2cqw;
          text-align: center;
          backdrop-filter: blur(0.5cqw);
          box-shadow: 0 0.3cqw 0.8cqw rgba(0,0,0,0.08);
        }

        .gift-plaisir .gift-message {
          background: rgba(255,255,255,0.75);
          border-color: rgba(217, 165, 70, 0.50);
          color: #451a03;
        }

        .gift-fetes .gift-message {
          background: rgba(0,0,0,0.40);
          border-color: rgba(255,255,255,0.15);
          color: #fef3c7;
        }

        .gift-message p {
          margin: 0;
          font-size: 2.1cqw;
          font-style: italic;
          font-weight: 700;
          line-height: 1.4;
        }

        .gift-footer {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 2cqw;
          padding: 1.6cqw 1.8cqw;
          border: 0.15cqw solid;
          border-radius: 1.2cqw;
          font-size: 2cqw;
          font-weight: 700;
          backdrop-filter: blur(0.5cqw);
        }

        .gift-plaisir .gift-footer {
          background: rgba(69, 26, 3, 0.94);
          border-color: rgba(120, 53, 15, 0.80);
          color: #fff7ed;
        }

        .gift-fetes .gift-footer {
          background: rgba(0,0,0,0.78);
          border-color: rgba(252, 211, 77, 0.40);
          color: #fef3c7;
        }

        .gift-footer p {
          margin: 0;
          line-height: 1.3;
	  font-size: 1.15em;
        }

        .gift-footer-code strong {
          color: #fcd34d;
          font-family: monospace;
        }

        .gift-footer span {
          display: block;
          margin-top: 0.3cqw;
          font-size: 1.55cqw;
          font-weight: 400;
          opacity: 0.85;
        }

        .gift-footer-contact {
          text-align: right;
        }

        .gift-footer-contact p {
          color: #fde68a;
        }

        @media print {
          .gift-card {
            border-radius: 0 !important;
            box-shadow: none !important;
          }
        }
      `}</style>
    </>
  );
}
