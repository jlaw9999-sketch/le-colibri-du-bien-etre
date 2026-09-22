"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Gift, Snowflake } from "lucide-react";

export default function CarteCadeauPage() {
  const [theme, setTheme] = useState("plaisir");
  const [formData, setFormData] = useState({
    beneficiaire: "",
    offertPar: "",
    prestation: "Massage intuitif complet – Holistique, Énergétique & Magnétique",
    message: "Un moment de pure détente rien que pour toi.",
    emailClient: "",
  });

  const handleChange = function(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(function(prev) {
      return Object.assign({}, prev, { [name]: value });
    });
  };

  const bgStyle = 
    theme === "zen" 
      ? { backgroundImage: "url('/carte-zen-bg.jpeg')" } 
      : theme === "fetes" 
      ? { backgroundImage: "url('/carte-fetes-bg.png')" } 
      : {};

  return (
