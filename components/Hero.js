"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden">
      {/* Image de fond */}
      <div className="absolute inset-0">
        <Image
          src="/images/background-accueil.jpg"
          alt="Fond d'accueil zen"
          fill
          priority
          className="object-cover brightness-105 contrast-105 opacity-90"
        />
        {/* Filtre flouté et adouci */}
        <div className="absolute inset-0 bg-amber-50/30 backdrop-blur-sm" />
      </div>

      {/* Contenu principal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-amber-900 px-6"
      >
        {/* Logo agrandi */}
        <div className="flex justify-center mb-8">
          <Image
            src="/images/logo-colibri.png"
            alt="Logo Le Colibri du Bien-Être"
            width={280} // deux fois plus grand qu’avant
            height={280}
            className="drop-shadow-lg"
          />
        </div>

        {/* Titre */}
        <h1 className="text-5xl md:text-6xl font-semibold mb-4 font-serif">
          Le Colibri du Bien-Être
        </h1>

        {/* Phrase d’accroche */}
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-amber-800 font-light mb-10">
          "Harmoniser le corps et l’esprit à travers des soins empreints de douceur,
          d’écoute et d’énergie bienveillante."
        </p>

        {/* Liens vers Prestations et Réservation */}
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <Link href="/prestations">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-amber-600 text-white px-8 py-3 rounded-xl shadow-md hover:bg-amber-700 transition"
            >
              Découvrez nos prestations
            </motion.button>
          </Link>

          <Link href="/reservation">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-white/90 text-amber-800 px-8 py-3 rounded-xl shadow-md hover:bg-white transition"
            >
              Réservez votre moment de bien-être
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
