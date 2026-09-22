"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Gift, Snowflake, ArrowLeft } from "lucide-react";
import Link from "next/link";

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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const bgStyle = 
    theme === "zen" 
      ? { backgroundImage: "url('/carte-zen-bg.jpeg')" } 
      : theme === "fetes" 
      ? { backgroundImage: "url('/carte-fetes-bg.png')" } 
      : {};

  return (
    <main className="min-h-screen bg-[#fdfaf5] px-4 pt-28 pb-20 text-[#2d1f1f]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              href="/prestations"
              className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7a5a48] transition hover:text-[#5d433d]"
            >
              <ArrowLeft className="h-4 w-4" /> Retour aux prestations
            </Link>
            <p className="mb-2 inline-flex items-center rounded-full border border-[#e7d6c6] bg-[#fff8f1] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#7a5a48]">
              <Gift className="mr-2 h-4 w-4" /> Carte cadeau
            </p>
            <h1 className="text-3xl font-bold text-[#2d1f1f] md:text-4xl">
              Créez une carte cadeau personnalisée
            </h1>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <section className="rounded-[32px] border border-[#f0e2d7] bg-white p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-[#f5e6dc] pb-4">
              <div className="rounded-full bg-[#fff2e8] p-2.5 text-[#7a5a48]">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Personnalisez votre attention</h2>
                <p className="text-xs text-[#8c6d5c]">Remplissez les informations pour composer le bon cadeau.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-[#5d433d]">Bénéficiaire</span>
                  <input
                    type="text"
                    name="beneficiaire"
                    value={formData.beneficiaire}
                    onChange={handleChange}
                    placeholder="Nom du bénéficiaire"
                    className="w-full rounded-2xl border border-[#ebddd2] bg-[#fffdfb] px-3.5 py-3 text-sm outline-none transition focus:border-[#c5967e] focus:ring-2 focus:ring-[#f3d9ca]"
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-[#5d433d]">Offert par</span>
                  <input
                    type="text"
                    name="offertPar"
                    value={formData.offertPar}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    className="w-full rounded-2xl border border-[#ebddd2] bg-[#fffdfb] px-3.5 py-3 text-sm outline-none transition focus:border-[#c5967e] focus:ring-2 focus:ring-[#f3d9ca]"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-1 block text-sm font-medium text-[#5d433d]">Prestation</span>
                <input
                  type="text"
                  name="prestation"
                  value={formData.prestation}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#ebddd2] bg-[#fffdfb] px-3.5 py-3 text-sm outline-none transition focus:border-[#c5967e] focus:ring-2 focus:ring-[#f3d9ca]"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-medium text-[#5d433d]">Message personnalisé</span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-2xl border border-[#ebddd2] bg-[#fffdfb] px-3.5 py-3 text-sm outline-none transition focus:border-[#c5967e] focus:ring-2 focus:ring-[#f3d9ca]"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-medium text-[#5d433d]">Email du client</span>
                <input
                  type="email"
                  name="emailClient"
                  value={formData.emailClient}
                  onChange={handleChange}
                  placeholder="client@email.com"
                  className="w-full rounded-2xl border border-[#ebddd2] bg-[#fffdfb] px-3.5 py-3 text-sm outline-none transition focus:border-[#c5967e] focus:ring-2 focus:ring-[#f3d9ca]"
                />
              </label>

              <div className="pt-2">
                <p className="mb-2 text-sm font-medium text-[#5d433d]">Thème visuel de la carte</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setTheme("plaisir")}
                    className={
                      theme === "plaisir"
                        ? "inline-flex items-center gap-2 rounded-full border border-[#7a5a48] bg-[#7a5a48] px-4 py-2 text-sm font-medium text-white shadow-sm transition"
                        : "inline-flex items-center gap-2 rounded-full border border-[#ebddd2] bg-[#fffaf6] px-4 py-2 text-sm font-medium text-[#5d433d] transition hover:border-[#d4b6a4]"
                    }
                  >
                    <Gift className="h-4 w-4" /> Plaisir d'offrir
                  </button>

                  <button
                    type="button"
                    onClick={() => setTheme("zen")}
                    className={
                      theme === "zen"
                        ? "inline-flex items-center gap-2 rounded-full border border-[#7a5a48] bg-[#7a5a48] px-4 py-2 text-sm font-medium text-white shadow-sm transition"
                        : "inline-flex items-center gap-2 rounded-full border border-[#ebddd2] bg-[#fffaf6] px-4 py-2 text-sm font-medium text-[#5d433d] transition hover:border-[#d4b6a4]"
                    }
                  >
                    <Sparkles className="h-4 w-4" /> Ambiance Zen
                  </button>

                  <button
                    type="button"
                    onClick={() => setTheme("fetes")}
                    className={
                      theme === "fetes"
                        ? "inline-flex items-center gap-2 rounded-full border border-[#7a5a48] bg-[#7a5a48] px-4 py-2 text-sm font-medium text-white shadow-sm transition"
                        : "inline-flex items-center gap-2 rounded-full border border-[#ebddd2] bg-[#fffaf6] px-4 py-2 text-sm font-medium text-[#5d433d] transition hover:border-[#d4b6a4]"
                    }
                  >
                    <Snowflake className="h-4 w-4" /> Fêtes de fin d'année
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="flex items-center justify-center lg:sticky lg:top-28 h-fit">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-[650px] rounded-[32px] border-2 border-[#e7d6c6] p-8 shadow-xl relative overflow-hidden flex flex-col justify-between bg-cover bg-center"
              style={Object.assign({ minHeight: "420px" }, bgStyle)}
            >
              <div
                className={
                  theme === "plaisir"
                    ? "absolute inset-0 bg-gradient-to-br from-[#fffdfb] via-[#fff8f3] to-[#fef2e8] pointer-events-none"
                    : "absolute inset-0 bg-white/80 backdrop-blur-[1px] pointer-events-none"
                }
              />

              <div className="relative z-10 flex items-center justify-between border-b border-[#f0e2d7] pb-4">
                <div className="flex items-center gap-2 text-[#7a5a48]">
                  <Gift className="h-5 w-5" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em]">Le Colibri du Bien-Être</span>
                </div>
                <span className="rounded-full bg-[#fff2e8]/90 px-3 py-1 text-xs font-semibold text-[#7a5a48] uppercase tracking-wider">
                  {theme}
                </span>
              </div>

              <div className="relative z-10 py-6 space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7b69]">Offert à</p>
                  <h3 className="text-2xl font-bold text-[#2d1f1f] mt-1">
                    {formData.beneficiaire || "Nom du bénéficiaire"}
                  </h3>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7b69]">Prestation incluse</p>
                  <p className="text-base font-medium text-[#4a3833] mt-1">
                    {formData.prestation}
                  </p>
                </div>

                <div className="bg-white/90 p-4 rounded-2xl border border-[#f5e6dc] shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7b69] mb-1">Message personnalisé</p>
                  <p className="text-sm italic text-[#5d433d]">
                    &ldquo;{formData.message || "Votre message apparaîtra ici..."}&rdquo;
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex items-end justify-between border-t border-[#f0e2d7] pt-4 text-sm">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7b69]">De la part de</p>
                  <p className="font-bold text-[#2d1f1f] mt-0.5">{formData.offertPar || "Votre nom"}</p>
                </div>
                <div className="text-right text-xs text-[#8c6d5c]">
                  <span>{formData.emailClient || "contact@lecolibridubienetre.com"}</span>
                </div>
              </div>
            </motion.div>
          </section>
        </div>
      </div>
    </main>
  );
}
