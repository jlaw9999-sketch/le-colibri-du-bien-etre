"use client";

import { useState } from "react";
import { Sparkles, Gift, Heart, Snowflake, Check, Mail, MessageSquare } from "lucide-react";

export default function CarteCadeauPage() {
  const [theme, setTheme] = useState("plaisir");
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    beneficiaire: "",
    offertPar: "",
    prestation: "Massage intuitif complet - Holistique, Énergétique & Magnétique",
    message: "Un moment de pure détente rien que pour toi.",
    emailClient: "",
  });

  // Suggestions de messages gentils pour faciliter la personnalisation
  const suggestionsMessages = [
    "Un moment de pure détente rien que pour toi.",
    "Pour prendre soin de toi, tu le mérites tant.",
    "Une parenthèse de douceur et de lâcher-prise rien que pour toi.",
    "Joyeux anniversaire ! Profite pleinement de cette bulle de bien-être.",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectSuggestion = (msg) => {
    setFormData((prev) => ({ ...prev, message: msg }));
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
