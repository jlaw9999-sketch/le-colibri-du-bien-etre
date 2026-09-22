"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Gift, Heart, Snowflake } from "lucide-react";

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

  return (
