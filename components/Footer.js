"use client";

import { Mail, Phone, Facebook } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-amber-100/60 text-gray-800 mt-16 border-t border-amber-200">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        {/* --- CONTACT --- */}
        <div>
          <h3 className="text-xl font-semibold text-amber-800 mb-4">
            Contact
          </h3>
          <p className="flex items-center gap-2 mb-2">
            <Phone size={18} className="text-amber-700" />
            <a href="tel:0692611466" className="hover:text-amber-700">
              06 92 61 14 66
            </a>
          </p>
          <p className="flex items-center gap-2 mb-2">
            <Mail size={18} className="text-amber-700" />
            <a
              href="mailto:lecolibridubienetre@gmail.com"
              className="hover:text-amber-700"
            >
              lecolibridubienetre@gmail.com
            </a>
          </p>
        </div>

        {/* --- LIENS RAPIDES --- */}
        <div>
          <h3 className="text-xl font-semibold text-amber-800 mb-4">
            Liens utiles
          </h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-amber-700">
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/qui-suis-je" className="hover:text-amber-700">
                Qui suis-je ?
              </Link>
            </li>
            <li>
              <Link href="/prestations" className="hover:text-amber-700">
                Prestations
              </Link>
            </li>
            <li>
              <Link href="/reservation" className="hover:text-amber-700">
                Réservation
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-amber-700">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* --- RÉSEAUX SOCIAUX --- */}
        <div>
          <h3 className="text-xl font-semibold text-amber-800 mb-4">
            Suivez-nous
          </h3>
          <div className="flex gap-4 items-center">
            <a
              href="https://www.facebook.com/profile.php?id=61568758586292"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-amber-700 transition-colors"
            >
              <Facebook size={22} />
              Facebook
            </a>
          </div>
        </div>
      </div>

      {/* --- COPYRIGHT --- */}
      <div className="text-center py-6 border-t border-amber-200 text-sm text-gray-600">
        © {new Date().getFullYear()} Le Colibri du Bien-Être — Créé avec douceur et lumière 🌸
      </div>
    </footer>
  );
}
