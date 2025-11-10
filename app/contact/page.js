"use client";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";

export default function Contact() {
  return (
    <section
      className="min-h-screen bg-cover bg-center py-20 px-6 md:px-20 text-center"
      style={{
        backgroundImage: "url('/images/background-contact.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-lg"
      >
        <h2 className="text-4xl font-semibold text-amber-800 mb-6">Contactez-nous</h2>
        <p className="text-gray-700 mb-8">
          Le Colibri du Bien-Être vous accueille sur rendez-vous uniquement.
        </p>

        <div className="flex flex-col items-center gap-4 mb-8">
          <a href="tel:0692611466" className="flex items-center gap-2 text-gray-800 hover:text-amber-700">
            <Phone size={20} /> <span>06 92 61 14 66</span>
          </a>

          <a href="mailto:lecolibridubienetre@gmail.com" className="flex items-center gap-2 text-gray-800 hover:text-amber-700">
            <Mail size={20} /> <span>lecolibridubienetre@gmail.com</span>
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=61568758586292"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-800 hover:text-amber-700"
          >
            {/* You can replace the SVG with lucide-react Facebook icon if preferred */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
            <span>Le Colibri du Bien-Être</span>
          </a>
        </div>

        <p className="italic text-gray-600">
          📍 Secteur Ouest & Nord — Déplacements possibles selon demande.
        </p>
      </motion.div>
    </section>
  );
}
