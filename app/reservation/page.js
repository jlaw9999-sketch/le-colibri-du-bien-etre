"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

function FormulaireReservation() {
  const searchParams = useSearchParams();
  const soinParam = searchParams.get("soin");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    prestation: "",
    date: "",
    time: "",
    message: "",
  });

  // Pré-sélectionne la prestation reçue dans l'URL si elle existe
  useEffect(() => {
    if (soinParam) {
      setFormData((prev) => ({ ...prev, prestation: soinParam }));
    }
  }, [soinParam]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDate = (e) => {
    const dateValue = e.target.value;
    setFormData({ ...formData, date: dateValue });
    if (!dateValue) return;
    const date = new Date(dateValue + "T00:00:00");
    if (date.getDay() === 0) {
      alert("Les réservations ne sont pas possibles le dimanche. Merci de choisir un autre jour.");
      setFormData({ ...formData, date: "" });
      e.target.value = "";
    }
  };

  return (
    <motion.form
      action="https://formsubmit.co/lecolibridubienetre@gmail.com"
      method="POST"
      whileHover={{ scale: 1.01 }}
      className="text-left bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg space-y-4"
    >
      {/* Redirection après envoi (PRODUCTION) */}
      <input type="hidden" name="_next" value="https://www.lecolibridubienetre.fr/merci" />
      <input type="hidden" name="_subject" value="Nouvelle demande de réservation - Le Colibri du Bien-Être" />
      <input type="hidden" name="_captcha" value="false" />

      <input
        type="text"
        name="name"
        placeholder="Nom complet"
        value={formData.name}
        onChange={handleChange}
        className="w-full border border-amber-200 rounded-lg p-3 focus:ring-2 focus:ring-amber-400"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Adresse e-mail"
        value={formData.email}
        onChange={handleChange}
        className="w-full border border-amber-200 rounded-lg p-3 focus:ring-2 focus:ring-amber-400"
        required
      />

      <select
        name="prestation"
        value={formData.prestation}
        onChange={handleChange}
        className="w-full border border-amber-200 rounded-lg p-3 focus:ring-2 focus:ring-amber-400"
        required
      >
        <option value="">Choisissez une prestation</option>
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

      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="block text-sm text-gray-600 mb-1">
            Date souhaitée
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleDate}
            className="w-full border border-amber-300 rounded-lg p-3 bg-white text-gray-800 appearance-none focus:ring-2 focus:ring-amber-400"
            required
          />
        </div>

        <div className="w-1/2">
          <label className="block text-sm text-gray-600 mb-1">
            Heure souhaitée
          </label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full border border-amber-300 rounded-lg p-3 bg-white text-gray-800 appearance-none focus:ring-2 focus:ring-amber-400"
            required
          />
        </div>
      </div>

      <textarea
        name="message"
        placeholder="Message ou besoin particulier"
        value={formData.message}
        onChange={handleChange}
        className="w-full border border-amber-200 rounded-lg p-3 h-24 focus:ring-2 focus:ring-amber-400"
      />

      <button
        type="submit"
        className="w-full bg-amber-600 hover:bg-amber-700 text-white text-lg rounded-full py-3 transition"
      >
        Envoyer ma demande
      </button>
    </motion.form>
  );
}

export default function ReservationPage() {
  return (
    <section className="pt-28 pb-16 px-6 md:px-20 bg-[url('/images/background-reservation.jpg')] bg-cover bg-center bg-no-repeat text-center text-gray-800 min-h-screen">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-semibold text-amber-800 mb-4">Réservez votre séance</h1>
        <p className="text-gray-700 mb-8 font-medium">
          Choisissez la prestation qui vous correspond et proposez une date et une heure.
        </p>

        <Suspense fallback={<div className="text-amber-800 p-8">Chargement du formulaire...</div>}>
          <FormulaireReservation />
        </Suspense>
      </div>
    </section>
  );
}
