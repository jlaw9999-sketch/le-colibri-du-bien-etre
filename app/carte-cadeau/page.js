"use client";

import { useState, useRef } from "react";
import { Sparkles, Gift, Heart, Snowflake, Download } from "lucide-react";

export default function CarteCadeauPage() {
  const [theme, setTheme] = useState("zen"); // "zen" ou "fetes"
  const [loadingPdf, setLoadingPdf] = useState(false);
  const carteRef = useRef(null);

  const [formData, setFormData] = useState({
    beneficiaire: "",
    offertPar: "",
    prestation: "Massage intuitif complet - Holistique, Énergétique & Magnétique",
    message: "Un moment de pure détente rien que pour toi.",
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
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });

      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

      const pdfWidth = 297;
      const pdfHeight = 210;
      const cardWidth = 240;
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

  // Sélection de l'arrière-plan selon le thème actif
  const bgImage = theme === "zen" ? "/carte-zen-bg.jpeg" : "/carte-fetes-bg.png";

  return (
