"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Gift, Heart, Snowflake } from "lucide-react";

export default function CarteCadeauPage() {
  const [theme, setTheme] = useState("plaisir"); // 'plaisir' ou 'fetes'
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

  return (
    <section className="pt-28 pb-20 px-4 md:px-12 bg-amber-50/30 min-h-screen text-gray-800">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-semibold text-amber-800 mb-3">Offrez une Carte Cadeau</h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Personnalisez votre bon cadeau, choisissez l'illustration et recevez-le directement par e-mail après validation.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* --- COLONNE GAUCHE : FORMULAIRE & CHOIX DU THÈME --- */}
        <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg border border-amber-100 space-y-6">
          {/* Choix de l'illustration */}
          <div>
            <label className="block text-sm font-semibold text-amber-900 mb-3">
              1. Choisissez l'illustration de la carte :
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setTheme("plaisir")}
                className={`p-4 rounded-xl border text-sm font-medium flex items-center justify-center gap-2 transition ${
                  theme === "plaisir"
                    ? "border-amber-600 bg-amber-100/70 text-amber-950 font-bold shadow-sm"
                    : "border-gray-200 hover:bg-amber-50 text-gray-600"
                }`}
              >
                <Heart size={18} className="text-amber-600" />
                <span>Plaisir d'offrir (Zen)</span>
              </button>

              <button
                type="button"
                onClick={() => setTheme("fetes")}
                className={`p-4 rounded-xl border text-sm font-medium flex items-center justify-center gap-2 transition ${
                  theme === "fetes"
                    ? "border-amber-700 bg-amber-900 text-amber-100 font-bold shadow-sm"
                    : "border-gray-200 hover:bg-amber-50 text-gray-600"
                }`}
              >
                <Snowflake size={18} className="text-amber-300" />
                <span>Fêtes de fin d'année</span>
              </button>
            </div>
          </div>

          {/* Saisie des informations */}
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

            <button
              type="button"
              className="w-full mt-4 bg-amber-700 hover:bg-amber-800 text-white font-medium text-lg rounded-full py-3.5 transition shadow-md flex items-center justify-center gap-2"
            >
              <Gift size={20} />
              <span>Procéder au paiement en ligne</span>
            </button>
          </div>
        </div>

        {/* --- COLONNE DROITE : PRÉVISUALISATION TEMPS RÉEL --- */}
        <div className="sticky top-32 space-y-4">
          <p className="text-center font-medium text-amber-900 text-sm flex items-center justify-center gap-1.5">
            <Sparkles size={16} className="text-amber-600" /> Aperçu en temps réel
          </p>

          <motion.div
            key={theme}
            initial={{ opacity: 0.8, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className={`relative w-full aspect-[1.7/1] rounded-3xl p-6 shadow-2xl overflow-hidden border flex flex-col justify-between bg-cover bg-center transition-all ${
              theme === "plaisir"
                ? "border-amber-300/80 bg-[url('/images/carte-zen-bg.jpeg')] text-amber-950"
                : "border-amber-400/50 bg-[url('/images/carte-fetes-bg.png')] text-amber-50 shadow-amber-950/20"
            }`}
          >
            {/* Voile d'ombrage léger pour garantir la lisibilité des textes */}
            <div
              className={`absolute inset-0 pointer-events-none transition-colors ${
                theme === "plaisir"
                  ? "bg-amber-50/60 backdrop-blur-[1px]"
                  : "bg-amber-950/70 backdrop-blur-[1px]"
              }`}
            />

            {/* En-tête : Logo & Badge */}
            <div className="relative z-10 flex justify-between items-start gap-4">
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 md:w-16 md:h-16 shrink-0 filter drop-shadow-md">
                  <Image
                    src="/images/logo-colibri.png"
                    alt="Le Colibri du Bien-Être"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3
                    className={`text-base md:text-lg font-bold tracking-wide leading-tight ${
                      theme === "plaisir" ? "text-amber-900" : "text-amber-200"
                    }`}
                  >
                    Le Colibri du Bien-Être
                  </h3>
                  <p
                    className={`text-xs italic ${
                      theme === "plaisir" ? "text-amber-800" : "text-amber-300/80"
                    }`}
                  >
                    Soin & Sérénité
                  </p>
                </div>
              </div>

              <div
                className={`text-[11px] font-semibold px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1.5 border ${
                  theme === "plaisir"
                    ? "bg-amber-800/90 text-amber-50 border-amber-600/40"
                    : "bg-amber-400/20 text-amber-200 border-amber-300/30"
                }`}
              >
                {theme === "fetes" ? <Snowflake size={12} /> : <Gift size={12} />}
                <span>{theme === "fetes" ? "Bon des Fêtes" : "Carte Cadeau"}</span>
              </div>
            </div>

            {/* Corps : Soin & Prénoms */}
            <div className="relative z-10 my-auto py-1 space-y-2">
              <div
                className={`p-3 rounded-xl border backdrop-blur-md ${
                  theme === "plaisir"
                    ? "bg-white/80 border-amber-200/80"
                    : "bg-amber-900/70 border-amber-700/60"
                }`}
              >
                <p
                  className={`text-[10px] uppercase tracking-wider font-bold mb-0.5 flex items-center gap-1 ${
                    theme === "plaisir" ? "text-amber-800" : "text-amber-300"
                  }`}
                >
                  <Sparkles size={12} /> Soin Offert :
                </p>
                <p className="text-sm md:text-base font-bold truncate">
                  {formData.prestation}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div
                  className={`p-2 rounded-lg border backdrop-blur-sm ${
                    theme === "plaisir"
                      ? "bg-white/60 border-amber-200/60"
                      : "bg-amber-900/50 border-amber-700/50"
                  }`}
                >
                  <span
                    className={`block text-[10px] ${
                      theme === "plaisir" ? "text-amber-800" : "text-amber-300/70"
                    }`}
                  >
                    Pour :
                  </span>
                  <span className="font-semibold truncate block">
                    {formData.beneficiaire || "Prénom Nom"}
                  </span>
                </div>

                <div
                  className={`p-2 rounded-lg border backdrop-blur-sm ${
                    theme === "plaisir"
                      ? "bg-white/60 border-amber-200/60"
                      : "bg-amber-900/50 border-amber-700/50"
                  }`}
                >
                  <span
                    className={`block text-[10px] ${
                      theme === "plaisir" ? "text-amber-800" : "text-amber-300/70"
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
                  className={`text-xs italic text-center px-2 truncate ${
                    theme === "plaisir" ? "text-amber-900/90" : "text-amber-200/90"
                  }`}
                >
                  « {formData.message} »
                </p>
              )}
            </div>

            {/* Pied de carte */}
            <div
              className={`relative z-10 pt-2 border-t flex justify-between items-end text-[10px] ${
                theme === "plaisir"
                  ? "border-amber-300/60 text-amber-900/90"
                  : "border-amber-700/60 text-amber-200/90"
              }`}
            >
              <div>
                <p className="font-medium">
                  Code : <span className="font-mono font-bold">CADEAU-2026-X7K</span>
                </p>
                <p className="text-[9px] opacity-80">Valable 1 an après achat</p>
              </div>

              <div className="text-right">
                <p className="font-semibold">Sur RDV : 06 92 61 14 66</p>
                <p className="text-[9px] opacity-80">lecolibridubienetre.fr</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
