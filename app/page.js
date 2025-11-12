"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="bg-amber-50 text-gray-800">

      {/* --- SECTION HERO --- */}
<section
  className="relative h-screen flex flex-col justify-center items-center text-center bg-cover bg-center"
  style={{ backgroundImage: "url('/images/background-accueil.jpg')" }}
>
  {/* ✅ fond légèrement éclairci */}
  <div className="absolute inset-0 bg-black/15 backdrop-blur-[1.5px]"></div>

  {/* ✅ halo de lumière doux derrière le logo */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-100/20 rounded-full blur-3xl"></div>

  <motion.div
    initial={{ opacity: 0, y: -20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 1 }}
    className="relative z-10"
  >
    <div className="flex flex-col items-center space-y-6">
      <Image
        src="/images/logo-colibri.png"
        alt="Logo Le Colibri du Bien-Être"
        width={600}
        height={600}
        className="drop-shadow-[0_0_25px_rgba(255,255,255,0.25)]"
        priority
      />

      <h1 className="text-6xl md:text-7xl font-[GreatVibes] text-amber-100 drop-shadow-lg tracking-wide">
        Le Colibri du Bien-Être
      </h1>

      <p className="text-lg md:text-xl text-white/90 italic max-w-2xl mx-auto">
        « Par mes mains, je vous aide à écouter ce que votre corps murmure. »
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <Link href="/prestations">
          <button className="bg-amber-400 hover:bg-amber-500 text-white px-6 py-3 rounded-full font-medium transition">
            Découvrir les prestations
          </button>
        </Link>

        <Link href="/reservation">
          <button className="bg-white/80 hover:bg-white text-amber-700 px-6 py-3 rounded-full font-medium transition">
            Prendre rendez-vous
          </button>
        </Link>
      </div>
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
        style={{ backgroundImage: "url('/images/background-detente.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold mb-6">Offrez-vous un moment pour vous</h2>
          <p className="text-lg mb-8">
            Découvrez les différents bonheurs que nous vous proposons et laissez-vous guider
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
