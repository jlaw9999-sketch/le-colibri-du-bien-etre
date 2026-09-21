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