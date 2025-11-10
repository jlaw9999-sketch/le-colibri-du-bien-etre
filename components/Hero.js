"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      className="h-screen flex flex-col justify-center items-center text-center bg-cover bg-center relative"
      style={{ backgroundImage: "url(/images/background-accueil.jpg)" }}
    >
      <div className="absolute inset-0 bg-white/50 backdrop-blur-sm"></div>

      <div className="relative z-10 flex flex-col items-center">
        <Image src="/images/logo-colibri.png" alt="Logo Colibri" width={480} height={480} className="mx-auto mb-8 drop-shadow-lg" />

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-semibold text-amber-800 mb-4"
        >
          Le Colibri du Bien-Être
        </motion.h1>

        <p className="max-w-2xl text-lg md:text-xl text-gray-700 mb-8">
          Des massages et soins énergétiques pour réharmoniser votre corps, votre esprit et votre âme.
        </p>
        <a
          href="/contact"
          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition"
        >
          Prendre rendez-vous
        </a>
      </div>
    </section>
  );
}
