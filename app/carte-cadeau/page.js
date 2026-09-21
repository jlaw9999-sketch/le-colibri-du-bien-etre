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
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const genererPDF = async () => {
    if (!carteRef.current) {
      alert("L'élément de la carte cadeau n'a pas été trouvé.");
      return;
    }

    setLoadingPdf(true);

    try {
      const element = carteRef.current;
      const clone = element.cloneNode(true);

      const elementsToClean = clone.querySelectorAll("*");
      elementsToClean.forEach((el) => {
        el.style.boxShadow = "none";
        el.style.textShadow = "none";
        el.style.filter = "none";
        el.style.backdropFilter = "none";
      });

      const container = document.createElement("div");
      container.style.position = "absolute";
      container.style.left = "-9999px";
      container.style.top = "-9999px";
      container.appendChild(clone);
      document.body.appendChild(container);

      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      document.body.removeChild(container);

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

      const name = formData.beneficiaire ? formData.beneficiaire : "Client";
      pdf.save("Carte-Cadeau-" + name + ".pdf");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la création du PDF.");
    } finally {
      setLoadingPdf(false);
    }
  };

  return (
