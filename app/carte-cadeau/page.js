"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Gift, Heart, Snowflake, Download } from "lucide-react";

export default function CarteCadeauPage() {
  const [theme, setTheme] = useState("plaisir");
  const [loadingPdf, setLoadingPdf] = useState(false);
  const carteRef = useRef(null);

  const [formData, setFormData] = useState({
    beneficiaire: "",
    offertPar: "",
    prestation: "Massage intuitif complet - Holistique, Energetique & Magnetique",
    message: "Un moment de pure detente rien que pour toi.",
    emailClient: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const genererPDF = async () => {
    if (!carteRef.current) return;
    setLoadingPdf(true);

    try {
      const jsPDFModule = await import("jspdf");
      const html2canvasModule = await import("html2canvas");
      const jsPDF = jsPDFModule.default;
      const html2canvas = html2canvasModule.default;

      const element = carteRef.current;
      const clone = element.cloneNode(true);

      const container = document.createElement("div");
      container.style.position = "absolute";
      container.style.left = "-9999px";
      container.appendChild(clone);
      document.body.appendChild(container);

      const canvas = await html2canvas(clone, { scale: 2, useCORS: true });
      document.body.removeChild(container);

      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

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
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPdf(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fdfaf5] px-4 py-10 text-[#2d1f1f]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 inline-flex items-center rounded-full border border-[#e7d6c6] bg-[#fff8f1] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#7a5a48]">
              <Gift className="mr-2 h-4 w-4" /> Carte cadeau
            </p>
            <h1 className="text-3xl font-bold text-[#2d1f1f] md:text-4xl">
              Créez une carte cadeau personnalisée
            </h1>
          </div>

          <button
            type="button"
            onClick={genererPDF}
            disabled={loadingPdf}
            className="inline-flex items-center justify-center rounded-full bg-[#7a5a48] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#7a5a48]/20 transition hover:bg-[#684a3d] disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Download className="mr-2 h-4 w-4" />
            {loadingPdf ? "Génération..." : "Télécharger PDF"}
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_1.35fr]">
          <section className="rounded-[32px] border border-[#f0e2d7] bg-white p-5 shadow-[0_20px_60px_rgba(122,90,72,0.08)]">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-full bg-[#fff2e8] p-2 text-[#7a5a48]">
                <Sparkles className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold">Personnaliser</h2>
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
                    className="w-full rounded-2xl border border-[#ebddd2] bg-[#fffdfb] px-3 py-2.5 text-sm outline-none transition focus:border-[#c5967e] focus:ring-2 focus:ring-[#f3d9ca]"
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
                    className="w-full rounded-2xl border border-[#ebddd2] bg-[#fffdfb] px-3 py-2.5 text-sm outline-none transition focus:border-[#c5967e] focus:ring-2 focus:ring-[#f3d9ca]"
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
                  className="w-full rounded-2xl border border-[#ebddd2] bg-[#fffdfb] px-3 py-2.5 text-sm outline-none transition focus:border-[#c5967e] focus:ring-2 focus:ring-[#f3d9ca]"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-medium text-[#5d433d]">Message</span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-2xl border border-[#ebddd2] bg-[#fffdfb] px-3 py-2.5 text-sm outline-none transition focus:border-[#c5967e] focus:ring-2 focus:ring-[#f3d9ca]"
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
                  className="w-full rounded-2xl border border-[#ebddd2] bg-[#fffdfb] px-3 py-2.5 text-sm outline-none transition focus:border-[#c5967e] focus:ring-2 focus:ring-[#f3d9ca]"
                />
              </label>

              <div className="pt-2">
                <p className="mb-2 text-sm font-medium text-[#5d433d]">Thème</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "plaisir", label: "Plaisir", icon: Sparkles },
                    { id: "amour", label: "Amour", icon: Heart },
                    { id: "froid", label: "Hiver", icon: Snowflake },
                  ].map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setTheme(id)}
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition ${
                        theme === id
                          ? "border-[#7a5a48] bg-[#7a5a48] text-white"
                          : "border-[#ebddd2] bg-[#fffaf6] text-[#5d433d] hover:border-[#d4b6a4]"
                      }`}
                    >
                      <Icon className="h-4 w-4" /> {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-[32px] border border-[#f0e2d7] bg-[#fef9f4] p-4 shadow-[0_20px_60px_rgba(122,90,72,0.08)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(252,229,210,0.9),_transparent_50%)]" />

            <div ref={carteRef} className="relative mx-auto max-w-[720px] rounded-[28px] border border-[#f0d8c3] bg-[#fffdfb] p-5 shadow-[0_18px_45px_rgba(122,90,72,0.1)]">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#7a5a48]">
                  <Gift className="h-5 w-5" />
                  <span className="text-sm font-semibold uppercase tracking-[0.18em]">Carte cadeau</span>
                </div>
                <div className="rounded-full border border-[#f2d8be] bg-[#fff5ef] px-2.5 py-1 text-xs font-medium text-[#7a5a48]">
                  {theme === "plaisir" ? "Plaisir" : theme === "amour" ? "Amour" : "Hiver"}
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-4">
                  <div className="rounded-[24px] bg-[#fdf4ee] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7b69]">Pour</p>
                    <h3 className="mt-2 text-2xl font-bold text-[#2d1f1f]">
                      {formData.beneficiaire || "Votre bénéficiaire"}
                    </h3>
                  </div>

                  <div className="rounded-[24px] bg-[#f9efe8] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7b69]">Prestation</p>
                    <p className="mt-2 text-base font-medium text-[#2d1f1f]">
                      {formData.prestation}
                    </p>
                  </div>

                  <div className="rounded-[24px] border border-[#f0d8c3] bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7b69]">Message</p>
                    <p className="mt-2 text-base leading-relaxed text-[#4a3833]">
                      {formData.message}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-4">
                  <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#f9d7c1] via-[#f8eee5] to-[#f3d4d0] p-4">
                    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/30" />
                    <div className="absolute -left-7 bottom-3 h-16 w-16 rounded-full bg-white/20" />
                    <div className="relative">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a5a48]">Offert par</p>
                      <p className="mt-2 text-lg font-bold text-[#2d1f1f]">
                        {formData.offertPar || "Votre nom"}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-[#f0d8c3] bg-[#fffaf6] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7b69]">Contact</p>
                    <p className="mt-2 text-sm text-[#4a3833]">{formData.emailClient || "client@email.com"}</p>
                    <div className="mt-4 flex items-center gap-2 text-[#7a5a48]">
                      <Sparkles className="h-4 w-4" />
                      <span className="text-xs font-medium uppercase tracking-[0.15em]">Cadeau spécial</span>
                    </div>
                  </div>

                  <div className="relative h-36 overflow-hidden rounded-[24px] border border-[#f0d8c3] bg-[#fffdfb] p-3">
                    <Image
                      src="/images/carte-cadeau-illustration.svg"
                      alt="Illustration carte cadeau"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}