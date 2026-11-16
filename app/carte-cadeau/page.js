
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Gift, Heart, Snowflake, Clock, Tag, Check } from "lucide-react";
import GiftCard from "@/components/GiftCard";

// Grille tarifaire et détails des prestations
const listePrestations = [
  { name: "Massage holistique", duration: "60 min", price: "75 €" },
  { name: "Massage intuitif complet – Holistique, Énergétique & Magnétique", duration: "1h30", price: "95 €" },
  { name: "Soins énergétiques", duration: "45 min", price: "55 €" },
  { name: "Séance de relaxation", duration: "50 min", price: "65 €" },
  { name: "Massage assis AMMA", duration: "35 min", price: "50 €" },
  { name: "Massage tête / pieds / mains", duration: "30 min", price: "50 €" },
  { name: "Power Feet", duration: "15 min", price: "20 €" },
  { name: "Power Head", duration: "20 min", price: "25 €" },
  { name: "Massage sportif – préparation avant effort", duration: "1h30", price: "130 €" },
  { name: "Massage récupération après l’effort", duration: "1h00", price: "150 €" },
  { name: "Massage profond avec points d’acupression", duration: "1h30", price: "95 €" },
];

const tarifsPrestations = {
  "Massage holistique": 75,
  "Massage intuitif complet – Holistique, Énergétique & Magnétique": 95,
  "Soins énergétiques": 55,
  "Séance de relaxation": 65,
  "Massage assis AMMA": 50,
  "Massage tête / pieds / mains": 50,
  "Power Feet": 20,
  "Power Head": 25,
  "Massage sportif – préparation avant effort": 130,
  "Massage récupération après l’effort": 150,
  "Massage profond avec points d’acupression": 95,
};

export default function CarteCadeauPage() {
  const [theme, setTheme] = useState("plaisir");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const prixPrestation = tarifsPrestations[formData.prestation] || 50;

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          theme,
          amount: prixPrestation,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Erreur lors de la création de la session de paiement.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Une erreur est survenue.");
    }
  };

  const currentPrice = tarifsPrestations[formData.prestation] || 50;

  return (
    <section className="pt-28 pb-20 px-3 md:px-12 bg-amber-50/30 min-h-screen text-gray-800">
      <div className="max-w-6xl mx-auto text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-amber-800 mb-2">
          Offrez une Carte Cadeau
        </h1>

        <p className="text-sm md:text-base text-gray-700 max-w-2xl mx-auto">
          Personnalisez votre bon cadeau, choisissez l'illustration et recevez-le directement par e-mail après validation.
        </p>
      </div>

     <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 items-start">

        {/* COLONNE GAUCHE : FORMULAIRE */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-sm p-5 md:p-8 rounded-2xl shadow-lg border border-amber-100 space-y-5"
        >
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
                <Heart className="text-amber-600 shrink-0" size={16} />
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
                <Snowflake className="text-amber-300 shrink-0" size={16} />
                <span>Fêtes de fin d'année</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-amber-900">
              2. Choisissez le soin offert :
            </label>

            <div className="grid grid-cols-1 gap-2.5 max-h-80 overflow-y-auto pr-1">
              {listePrestations.map((soin, idx) => {
                const isSelected = formData.prestation === soin.name;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, prestation: soin.name })
                    }
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${
                      isSelected
                        ? "border-amber-600 bg-amber-50 text-amber-950 shadow-sm ring-1 ring-amber-600"
                        : "border-gray-200 hover:border-amber-300 bg-white text-gray-700"
                    }`}
                  >
                    <div className="flex items-start sm:items-center gap-2.5">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 ${
                          isSelected
                            ? "border-amber-600 bg-amber-600 text-white"
                            : "border-gray-300 bg-gray-50"
                        }`}
                      >
                        {isSelected && <Check size={12} strokeWidth={3} />}
                      </div>

                      <span className="text-xs md:text-sm font-medium leading-snug whitespace-normal">
                        {soin.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto pl-7 sm:pl-0">
                      <span className="text-[11px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Clock size={11} /> {soin.duration}
                      </span>

                      <span className="text-xs font-bold text-amber-800 bg-amber-100/70 px-2.5 py-0.5 rounded-md flex items-center gap-0.5">
                        <Tag size={11} /> {soin.price}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Pour (Prénom / Nom)
                </label>

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
                <label className="block text-xs text-gray-600 mb-1">
                  De la part de
                </label>

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
              <label className="block text-xs text-gray-600 mb-1">
                Message personnalisé
              </label>

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
              <label className="block text-xs text-gray-600 mb-1">
                Votre e-mail (pour recevoir le bon)
              </label>

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

            <button
              type="submit"
              className="w-full mt-2 bg-amber-700 hover:bg-amber-800 text-white font-medium text-base md:text-lg rounded-full py-3.5 transition shadow-md flex items-center justify-center gap-2"
            >
              <Gift size={20} />
              <span>Procéder au paiement ({currentPrice} €)</span>
            </button>
          </div>
        </form>

        {/* COLONNE DROITE : APERÇU */}
        <div className="lg:sticky lg:top-32 space-y-3">
          <p className="text-center font-medium text-amber-900 text-sm flex items-center justify-center gap-1.5">
            <Sparkles size={16} className="text-amber-600" />
            Aperçu en temps réel
          </p>

          <motion.div
            key={theme}
            initial={{ opacity: 0.8, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <GiftCard
              theme={theme}
              prestation={formData.prestation}
              beneficiaire={formData.beneficiaire || "Prénom Nom"}
              offertPar={formData.offertPar || "Prénom Nom"}
              message={formData.message}
              code="CADEAU-2026-X7K"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
