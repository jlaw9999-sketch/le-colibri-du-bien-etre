
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Gift, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* --- LOGO --- */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/logo-colibri.png"
            alt="Logo Le Colibri du Bien-Être"
            width={60}
            height={60}
            className="rounded-full"
          />
          <span className="text-amber-700 font-semibold text-lg md:text-xl">
            Le Colibri du Bien-Être
          </span>
        </Link>

        {/* --- MENU DESKTOP --- */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-5 text-gray-700 font-medium text-sm xl:text-base">
          <Link href="/" className="hover:text-amber-700 transition whitespace-nowrap">
            Accueil
          </Link>

          <Link href="/qui-suis-je" className="hover:text-amber-700 transition whitespace-nowrap">
            Qui suis-je
          </Link>

          <Link href="/prestations" className="hover:text-amber-700 transition whitespace-nowrap">
            Prestations
          </Link>

          <Link href="/reservation" className="hover:text-amber-700 transition whitespace-nowrap">
            Réservation
          </Link>

          <Link
            href="/carte-cadeau"
            className="flex items-center gap-1.5 text-amber-700 hover:text-amber-900 transition whitespace-nowrap"
          >
            <Gift size={17} strokeWidth={2} />
            Carte cadeaux
          </Link>

          <Link
            href="/recuperer-carte"
            className="flex items-center gap-1.5 hover:text-amber-700 transition whitespace-nowrap"
          >
            <RefreshCw size={15} />
            Récupérer ma carte
          </Link>

          <Link href="/contact" className="hover:text-amber-700 transition whitespace-nowrap">
            Contact
          </Link>
        </nav>

        {/* --- BOUTON HAMBURGER MOBILE --- */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-amber-700 hover:text-amber-800 focus:outline-none"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* --- MENU MOBILE ANIMÉ --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/95 backdrop-blur-md shadow-lg absolute top-full left-0 w-full"
          >
            <div className="flex flex-col items-center py-5 space-y-4 text-amber-800 font-medium text-lg">
              <Link href="/" onClick={() => setIsOpen(false)}>
                Accueil
              </Link>

              <Link href="/qui-suis-je" onClick={() => setIsOpen(false)}>
                Qui suis-je
              </Link>

              <Link href="/prestations" onClick={() => setIsOpen(false)}>
                Prestations
              </Link>

              <Link href="/reservation" onClick={() => setIsOpen(false)}>
                Réservation
              </Link>

              <Link
                href="/carte-cadeau"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-amber-700"
              >
                <Gift size={20} />
                Carte cadeaux
              </Link>

              <Link
                href="/recuperer-carte"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2"
              >
                <RefreshCw size={18} />
                Récupérer ma carte
              </Link>

              <Link href="/contact" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
