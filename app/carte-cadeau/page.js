"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Gift, Heart, Snowflake, Download } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function CarteCadeauPage() {
  const [theme, setTheme] = useState("plaisir");
  const [loadingPdf, setLoadingPdf] = useState(false);
  const carteRef = useRef(null);

  const [formData, setFormData] = useState({
    beneficiaire: "",
    offertPar: "",
    prestation: "Massage intuitif complet – Holistique, Énergétique & Magnétique",
    message: "Un moment de pure détente rien que pour toi.",
    emailClient: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fonction pour générer et télécharger le vrai PDF
// Fonction pour générer et télécharger le vrai PDF
  const genererPDF = async () => {
    if (!carteRef.current) {
      alert("L'élément de la carte cadeau n'a pas été trouvé.");
      return;
    }

    setLoadingPdf(true);

    try {
      const element = carteRef.current;

      // Capture du composant avec html2canvas en convertissant les couleurs incompatibles
     // Fonction pour générer et télécharger le vrai PDF (bypass des fonctions de couleurs CSS modernes)
  const genererPDF = async () => {
    if (!carteRef.current) {
      alert("L'élément de me la carte cadeau n'a pas été trouvé.");
      return;
    }

    setLoadingPdf(true);

    try {
      const element = carteRef.current;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: null,
        onclone: (clonedDoc) => {
          // Force la conversion de TOUS les styles de TOUS les éléments en RGB
          const allElements = clonedDoc.querySelectorAll("*");
          allElements.forEach((el) => {
            const computed = window.getComputedStyle(el);
            
            // Si la couleur contient "lab" ou "oklch", on la force en RGB calculé
            ["color", "backgroundColor", "borderColor", "outlineColor"].forEach((prop) => {
              const val = computed[prop];
              if (val && (val.includes("lab") || val.includes("oklch"))) {
                // Création d'un mini canvas invisible pour traduire la couleur en RGBA exact
                const dummyCanvas = document.createElement("canvas");
                const ctx = dummyCanvas.getContext("2d");
                if (ctx) {
                  ctx.fillStyle = val;
                  el.style[prop] = ctx.fillStyle;
                }
              } else if (val) {
                el.style[prop] = val;
              }
            });

            // Supprime les ombres complexes (box-shadow) générées en oklch/lab par Tailwind v4
            el.style.boxShadow = "none";
          });
        },
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.95);

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = 297;
      const pdfHeight = 210;
      const cardWidth = 230;
      const cardHeight = (canvas.height * cardWidth) / canvas.width;

      const x = (pdfWidth - cardWidth) / 2;
      const y = (pdfHeight - cardHeight) / 2;

      pdf.setFillColor(253, 251, 247);
      pdf.rect(0, 0, pdfWidth, pdfHeight, "F");
      pdf.addImage(imgData, "JPEG", x, y, cardWidth, cardHeight);

      pdf.save(`Carte-Cadeau-${formData.beneficiaire || "Client"}.pdf`);
    } catch (error) {
      console.error("Erreur génération PDF :", error);
      alert("Une erreur est survenue lors de la création du PDF : " + error.message);
    } finally {
      setLoadingPdf(false);
    }
  };
  return (
    <section className="pt-28 pb-20 px-3 md:px-12 bg-amber-50/30 min-h-screen text-gray-800">
      <div className="max-w-6xl mx-auto text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-amber-800 mb-2">
          Offrez une Carte Cadeau
        </h1>
        <p className="text-sm md:text-base text-gray-700 max-w-2xl mx-auto">
          Personnalisez votre bon cadeau, choisissez l'illustration et téléchargez un aperçu PDF.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* --- COLONNE GAUCHE : FORMULAIRE --- */}
        <div className="bg-white/90 backdrop-blur-sm p-5 md:p-8 rounded-2xl shadow-lg border border-amber-100 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-amber-900 mb-3">
              1. Choisissez l'illustration de la carte :
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTheme("plaisir")}
                className={`p-3 md:p-4 rounded-xl border text-xs md:text-sm font-medium flex items-center justify-center gap-2 transition ${
                  theme === "plaisir"
                    ? "border-amber-600 bg-amber-100/80 text-amber-950 font-bold shadow-sm"
                    : "border-gray-200 hover:bg-amber-50 text-gray-600"
                }`}
              >
                <Heart size={16} className="text-amber-600 shrink-0" />
                <span>Plaisir d'offrir (Zen)</span>
              </button>

              <button
                type="button"
                onClick={() => setTheme("fetes")}
                className={`p-3 md:p-4 rounded-xl border text-xs md:text-sm font-medium flex items-center justify-center gap-2 transition ${
                  theme === "fetes"
                    ? "border-amber-700 bg-amber-900 text-amber-100 font-bold shadow-sm"
                    : "border-gray-200 hover:bg-amber-50 text-gray-600"
                }`}
              >
                <Snowflake size={16} className="text-amber-300 shrink-0" />
                <span>Fêtes de fin d'année</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-amber-900">
              2. Personnalisez votre carte :
            </label>

            <div>
              <label className="block text-xs text-gray-600 mb-1">Choix du soin offert</label>
              <select
                name="prestation"
                value={formData.prestation}
                onChange={handleChange}
                className="w-full border border-amber-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-amber-400 bg-white"
              >
                <option value="Massage holistique">Massage holistique</option>
                <option value="Massage intuitif complet – Holistique, Énergétique & Magnétique">
                  Massage intuitif complet – Holistique, Énergétique & Magnétique
                </option>
                <option value="Soins énergétiques">Soins énergétiques</option>
                <option value="Séance de relaxation">Séance de relaxation</option>
                <option value="Massage assis AMMA">Massage assis AMMA</option>
                <option value="Massage tête / pieds / mains">Massage tête / pieds / mains</option>
                <option value="Power Feet">Power Feet</option>
                <option value="Power Head">Power Head</option>
                <option value="Massage sportif – préparation avant effort">
                  Massage sportif – préparation avant effort
                </option>
                <option value="Massage récupération après l’effort">
                  Massage récupération après l’effort
                </option>
                <option value="Massage profond avec points d’acupression">
                  Massage profond avec points d’acupression
                </option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Pour (Prénom / Nom)</label>
                <input
                  type="text"
                  name="beneficiaire"
                  placeholder="Ex: Marie"
                  value={formData.beneficiaire}
                  onChange={handleChange}
                  className="w-full border border-amber-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-amber-400"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">De la part de</label>
                <input
                  type="text"
                  name="offertPar"
                  placeholder="Ex: Laurent & Sophie"
                  value={formData.offertPar}
                  onChange={handleChange}
                  className="w-full border border-amber-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-amber-400"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">Message personnalisé</label>
              <textarea
                name="message"
                placeholder="Ex: Un doux moment pour prendre soin de toi..."
                value={formData.message}
                onChange={handleChange}
                maxLength={120}
                className="w-full border border-amber-200 rounded-lg p-3 h-20 text-sm focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">Votre e-mail (pour recevoir le bon)</label>
              <input
                type="email"
                name="emailClient"
                placeholder="votre.email@exemple.com"
                value={formData.emailClient}
                onChange={handleChange}
                className="w-full border border-amber-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-amber-400"
                required
              />
            </div>

            <div className="pt-2 space-y-3">
              {/* Bouton pour tester et télécharger le PDF réel */}
              <button
                type="button"
                onClick={genererPDF}
                disabled={loadingPdf}
                className="w-full bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-semibold text-sm rounded-full py-3 transition shadow-sm flex items-center justify-center gap-2"
              >
                <Download size={18} />
                <span>{loadingPdf ? "Génération du PDF..." : "Télécharger un aperçu PDF"}</span>
              </button>

              {/* Bouton de paiement */}
              <button
                type="button"
                className="w-full bg-amber-700 hover:bg-amber-800 text-white font-medium text-base md:text-lg rounded-full py-3.5 transition shadow-md flex items-center justify-center gap-2"
              >
                <Gift size={20} />
                <span>Procéder au paiement en ligne</span>
              </button>
            </div>
          </div>
        </div>

        {/* --- COLONNE DROITE : APERÇU ET CIBLE DU PDF --- */}
        <div className="lg:sticky lg:top-32 space-y-3">
          <p className="text-center font-medium text-amber-900 text-sm flex items-center justify-center gap-1.5">
            <Sparkles size={16} className="text-amber-600" /> Aperçu en temps réel
          </p>

          {/* Div ciblée par useRef pour la capture PDF */}
          <div ref={carteRef} className="w-full">
            <motion.div
              key={theme}
              initial={{ opacity: 0.8, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              style={{
                backgroundImage: `url(${
                  theme === "plaisir"
                    ? "/images/carte-zen-bg.jpeg"
                    : "/images/carte-fetes-bg.png"
                })`,
              }}
              className={`relative w-full aspect-[1.58/1] rounded-2xl md:rounded-3xl p-3.5 sm:p-5 md:p-6 shadow-xl overflow-hidden border flex flex-col justify-between bg-cover bg-center transition-all ${
                theme === "plaisir"
                  ? "border-amber-300/80 text-amber-950"
                  : "border-amber-300/60 text-white shadow-amber-950/30"
              }`}
            >
              {/* Voile d'ambiance */}
              <div
                className={`absolute inset-0 pointer-events-none transition-colors ${
                  theme === "plaisir" ? "bg-amber-50/10" : "bg-black/20"
                }`}
              />

              {/* En-tête : Logo & Type de Carte */}
              <div className="relative z-10 flex justify-between items-start gap-2">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 shrink-0 filter drop-shadow-md">
                    <Image
                      src="/images/logo-colibri.png"
                      alt="Le Colibri du Bien-Être"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3
                      className={`text-xs sm:text-sm md:text-base font-bold tracking-wide leading-tight drop-shadow-md ${
                        theme === "plaisir" ? "text-amber-950" : "text-amber-100"
                      }`}
                    >
                      Le Colibri du Bien-Être
                    </h3>
                    <p
                      className={`text-[9px] sm:text-xs italic ${
                        theme === "plaisir" ? "text-amber-900 font-medium" : "text-amber-200"
                      }`}
                    >
                      Soin & Sérénité
                    </p>
                  </div>
                </div>

                <div
                  className={`text-[9px] sm:text-[10px] md:text-xs font-semibold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full backdrop-blur-md flex items-center gap-1 border shrink-0 ${
                    theme === "plaisir"
                      ? "bg-amber-900/90 text-amber-50 border-amber-600/40"
                      : "bg-amber-500/90 text-amber-950 border-amber-300/60 shadow-sm"
                  }`}
                >
                  {theme === "fetes" ? <Snowflake size={11} /> : <Gift size={11} />}
                  <span>{theme === "fetes" ? "Bon des Fêtes" : "Carte Cadeau"}</span>
                </div>
              </div>

              {/* Corps de Carte */}
              <div className="relative z-10 my-auto space-y-1.5 sm:space-y-2">
                <div
                  className={`p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl border backdrop-blur-md shadow-sm ${
                    theme === "plaisir"
                      ? "bg-white/90 border-amber-200/90 text-amber-950"
                      : "bg-black/55 border-white/20 text-white"
                  }`}
                >
                  <p
                    className={`text-[8px] sm:text-[10px] uppercase tracking-wider font-bold mb-0.5 flex items-center gap-1 ${
                      theme === "plaisir" ? "text-amber-800" : "text-amber-300"
                    }`}
                  >
                    <Sparkles size={11} /> Soin Offert :
                  </p>
                  <p className="text-[11px] sm:text-xs md:text-sm font-bold leading-tight">
                    {formData.prestation}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
                  <div
                    className={`p-1.5 sm:p-2 rounded-lg border backdrop-blur-md shadow-sm ${
                      theme === "plaisir"
                        ? "bg-white/85 border-amber-200/70 text-amber-950"
                        : "bg-black/50 border-white/20 text-white"
                    }`}
                  >
                    <span
                      className={`block text-[8px] sm:text-[10px] font-semibold ${
                        theme === "plaisir" ? "text-amber-800" : "text-amber-300"
                      }`}
                    >
                      Pour :
                    </span>
                    <span className="font-semibold truncate block">
                      {formData.beneficiaire || "Prénom Nom"}
                    </span>
                  </div>

                  <div
                    className={`p-1.5 sm:p-2 rounded-lg border backdrop-blur-md shadow-sm ${
                      theme === "plaisir"
                        ? "bg-white/85 border-amber-200/70 text-amber-950"
                        : "bg-black/50 border-white/20 text-white"
                    }`}
                  >
                    <span
                      className={`block text-[8px] sm:text-[10px] font-semibold ${
                        theme === "plaisir" ? "text-amber-800" : "text-amber-300"
                      }`}
                    >
                      De la part de :
                    </span>
                    <span className="font-semibold truncate block">
                      {formData.offertPar || "Prénom Nom"}
                    </span>
                  </div>
                </div>

                {formData.message && (
                  <p
                    className={`text-[9px] sm:text-xs italic text-center px-1 truncate drop-shadow-sm ${
                      theme === "plaisir" ? "text-amber-950 font-semibold" : "text-amber-100"
                    }`}
                  >
                    « {formData.message} »
                  </p>
                )}
              </div>

              {/* Pied de Carte */}
              <div
                className={`relative z-10 p-1.5 sm:p-2 rounded-lg border backdrop-blur-md flex justify-between items-end text-[8px] sm:text-[10px] md:text-xs font-semibold ${
                  theme === "plaisir"
                    ? "bg-amber-950/90 text-amber-50 border-amber-800/80 shadow-md"
                    : "bg-black/75 text-amber-100 border-amber-300/40 shadow-md"
                }`}
              >
                <div>
                  <p>
                    Code : <span className="font-mono font-bold text-amber-300">CADEAU-2026-X7K</span>
                  </p>
                  <p className="text-[7px] sm:text-[9px] opacity-80 font-normal">Valable 1 an après achat</p>
                </div>

                <div className="text-right">
                  <p className="text-amber-200 font-bold">Sur RDV : 06 92 61 14 66</p>
                  <p className="text-[7px] sm:text-[9px] opacity-80 font-normal">lecolibridubienetre.fr</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
