"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm fixed w-full top-0 left-0 z-50 border-b border-amber-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2.5">
        {/* LOGO + TITRE */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo-colibri.png"
            alt="Logo Le Colibri du Bien-Être"
            width={60}
            height={60}
            priority
          />
          <span className="text-xl md:text-2xl font-semibold text-amber-800">
            Le Colibri du Bien-Être
          </span>
        </Link>

        {/* NAVIGATION PRINCIPALE (version bureau) */}
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          <Link href="/" className="hover:text-amber-700 transition">Accueil</Link>
          <Link href="/qui-suis-je" className="hover:text-amber-700 transition">Qui suis-je</Link>
          <Link href="/prestations" className="hover:text-amber-700 transition">Prestations</Link>
          <Link href="/reservation" className="hover:text-amber-700 transition">Réservation</Link>
          <Link href="/contact" className="hover:text-amber-700 transition">Contact</Link>
        </nav>

        {/* MENU BURGER (version mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-amber-800"
          aria-label="Ouvrir le menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MENU MOBILE DÉROULANT */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 shadow-lg border-t border-amber-100 flex flex-col items-center py-4 space-y-3">
          <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-amber-700">Accueil</Link>
          <Link href="/qui-suis-je" onClick={() => setMenuOpen(false)} className="hover:text-amber-700">Qui suis-je</Link>
          <Link href="/prestations" onClick={() => setMenuOpen(false)} className="hover:text-amber-700">Prestations</Link>
          <Link href="/reservation" onClick={() => setMenuOpen(false)} className="hover:text-amber-700">Réservation</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)} className="hover:text-amber-700">Contact</Link>
        </div>
      )}
    </header>
  );
}
