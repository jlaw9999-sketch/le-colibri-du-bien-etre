"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="bg-amber-50 text-gray-800 font-inter">
      {/* -------------------------------------------- */}
      {/* HERO PREMIUM */}
      {/* -------------------------------------------- */}

      <section
        className="
          relative flex flex-col justify-center items-center text-center 
          h-screen overflow-hidden
          bg-cover bg-center
          md:bg-[url('/images/background-accueil.jpg')]
          bg-[url('/images/background-accueil-mobile.jpg')]
        "
      >
        {/* --- FILTRE GLOBAL LÉGER --- */}
        <div
          className="
            absolute inset-0 z-[5]
            bg-black/25
            backdrop-blur-[4px]
          "
        ></div>


        {/* --- CONTENU --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-[10] flex flex-col items-center px-6"
        >
          {/* LOGO */}
<Image
  src="/images/logo-colibri.png"
  alt="Logo Le Colibri du Bien-Être"
  width={260}
  height={260}
  className="
    drop-shadow-2xl relative z-[10]
    sm:w-[340px] sm:h-[340px]    /* TABLETTE */
    lg:w-[450px] lg:h-[450px]    /* DESKTOP */
  "
  priority
/>

          {/* TITRE ELEGANT GREAT VIBES */}
<h1
  className="
    font-greatvibes mt-4 text-5xl md:text-7xl 
    text-amber-700
    drop-shadow-[0_0_12px_rgba(255,255,255,1)]
  "
>
  Le Colibri du Bien-Être
</h1>

          {/* SLOGAN (meilleure lisibilité) */}
<p
  className="
    text-lg md:text-2xl mt-4 max-w-xl italic 
    text-white
    drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]
  "
>
  « Par mes mains, je vous aide à écouter ce que votre corps murmure. »
</p>

          {/* BOUTONS */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/prestations">
              <button className="bg-amber-400 hover:bg-amber-500 text-white px-7 py-3 rounded-full font-semibold shadow-md transition">
                Découvrir les prestations
              </button>
            </Link>

            <Link href="/reservation">
              <button className="bg-white/90 hover:bg-white text-amber-700 px-7 py-3 rounded-full font-semibold shadow-md transition">
                Prendre rendez-vous
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* --- SECTION DÉCOUVERTE --- */}
      <section className="py-20 px-6 bg-gradient-to-b from-amber-50 to-white text-center">
        <h2 className="text-3xl font-semibold text-amber-700 mb-6">
          Découvrez l’art du bien-être
        </h2>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
          Offrez-vous un moment pour respirer, lâcher prise et retrouver l’équilibre.
          Chaque soin est une invitation à reconnecter votre corps, votre esprit et votre énergie.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Image
            src="/images/massage-zen.jpg"
            alt="Massage bien-être"
            width={400}
            height={300}
            className="rounded-2xl shadow-lg object-cover w-full h-64"
          />
          <Image
            src="/images/soin-energie.jpg"
            alt="Soin énergétique"
            width={400}
            height={300}
            className="rounded-2xl shadow-lg object-cover w-full h-64"
          />
          <Image
            src="/images/bien-etre-ambiance.jpg"
            alt="Ambiance détente"
            width={400}
            height={300}
            className="rounded-2xl shadow-lg object-cover w-full h-64"
          />
        </div>
      </section>

      {/* --- SECTION SYMBOLIQUE --- */}
      <section className="py-20 bg-amber-100 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <Image
            src="/images/colibri-equilibre.jpg"
            alt="Colibri équilibre"
            width={150}
            height={150}
            className="mx-auto rounded-full shadow-md"
          />

          <h2 className="text-3xl font-semibold text-amber-800">
            Le Colibri, symbole d’équilibre et de joie
          </h2>

          <p className="text-lg text-gray-700 italic">
            Symbole de vitalité et de légèreté, le colibri nous enseigne que chaque instant
            de bien-être est un retour à soi, une invitation à la paix intérieure.
          </p>
        </div>
      </section>

      {/* --- SECTION FINALE / APPEL À L’ACTION --- */}
      <section
        className="relative bg-cover bg-center py-24 text-center text-white"
        style={{
          backgroundImage: "url('/images/background-detente.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold mb-6">Offrez-vous un moment pour vous</h2>

          <p className="text-lg mb-8">
            Découvrez les différents bonheurs que nous vous vous proposons et laissez-vous guider
            vers le soin qui vous ressemble.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/prestations">
              <button className="bg-amber-400 hover:bg-amber-500 text-white px-8 py-3 rounded-full font-medium transition">
                Voir les prestations
              </button>
            </Link>

            <Link href="/reservation">
              <button className="bg-white/90 hover:bg-white text-amber-700 px-8 py-3 rounded-full font-medium transition">
                Réserver votre moment
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
