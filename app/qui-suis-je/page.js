
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Leaf } from "lucide-react";

export default function QuiSuisJe() {
  return (
    <section
      className="min-h-screen bg-cover bg-center pt-32 pb-16 px-5 md:pt-36 md:px-12 lg:px-20 flex flex-col items-center text-gray-800"
      style={{
        backgroundImage: "url('/images/background-qui-suis-je.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="relative w-full max-w-5xl overflow-hidden bg-[#fffdf7]/90 backdrop-blur-md border border-amber-200/70 rounded-3xl shadow-[0_20px_60px_rgba(88,58,20,0.16)] p-7 md:p-12 lg:p-14 text-center md:text-left"
      >
        {/* Petite décoration supérieure */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200" />

        {/* --- PRÉSENTATION --- */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-12">
          <div className="shrink-0 p-1.5 rounded-full bg-gradient-to-br from-amber-200 via-white to-amber-400 shadow-lg">
            <Image
              src="/images/photo-marie-christine.jpg"
              alt="Marie-Christine Valin"
              width={300}
              height={300}
              sizes="(max-width: 768px) 220px, 300px"
              className="rounded-full object-cover w-[220px] h-[220px] md:w-[280px] md:h-[280px]"
            />
          </div>

          <div className="flex-1">
            <p className="text-amber-700 uppercase tracking-[0.2em] text-xs font-semibold mb-3">
              Mon parcours
            </p>

            <h2 className="text-4xl md:text-5xl font-semibold text-amber-800 mb-5">
              Qui suis-je ?
            </h2>

            <div className="flex items-center gap-3 mb-5 justify-center md:justify-start">
              <span className="w-12 h-px bg-amber-400" />
              <Leaf size={19} className="text-amber-600" />
              <span className="w-12 h-px bg-amber-400" />
            </div>

            <p className="italic text-gray-700 text-lg leading-relaxed">
              “Soulager, apaiser, accompagner : ma vocation est d’harmoniser
              corps et esprit avec humanité.”
            </p>
          </div>
        </div>

        {/* --- HISTOIRE ET PARCOURS --- */}
        <div className="space-y-7 leading-[1.9] text-gray-700 text-[15px] md:text-base">
          <p>
            Depuis mon plus jeune âge, j’ai grandi aux côtés de ma grand-mère,
            une femme inspirante dotée d’un véritable don de guérison. J’ai été
            profondément marquée par la douceur de ses gestes, par sa façon
            d’apaiser les douleurs à travers la présence, l’écoute et la
            bienveillance. C’est auprès d’elle que j’ai compris que le corps
            garde la mémoire de nos émotions, et qu’il existe une voie pour
            soulager l’esprit en réconciliant le corps.
          </p>

          <p>
            Bien que la vie m’ait d’abord menée sur d’autres chemins
            professionnels, cet appel intérieur à prendre soin des autres n’a
            jamais cessé de grandir. J’ai alors décidé de me former
            sérieusement, d’étudier le bien-être, l’énergétique et les
            médecines douces, pour structurer cette sensibilité naturelle et
            donner un cadre professionnel à ma pratique.
          </p>

          <p>
            Aujourd’hui, je suis certifiée en{" "}
            <strong>
              massage holistique, magnétisme et en bien-être énergétique
            </strong>
            . J’exerce en tant que praticienne indépendante et également en
            partenariat avec des structures spécialisées dans le bien-être.
            Chaque séance est pour moi un moment unique : une écoute du corps,
            une lecture subtile des tensions, une rencontre entre les besoins du
            moment et l’énergie de la personne.
          </p>

          <p>
            En 2025, j’ai fondé{" "}
            <strong>Le Colibri du Bien-Être</strong>, symbole de légèreté et de
            lumière, pour proposer des soins individualisés, empreints de
            respect, d’éthique et d’authenticité. Ma pratique repose sur une
            approche globale du bien-être : harmoniser les plans physiques,
            émotionnels et énergétiques pour aider chacun à retrouver son
            équilibre.
          </p>

          <p>
            Guidée par la conviction que{" "}
            <em>
              le toucher est un langage silencieux qui guérit ce que les mots
              ne peuvent dire
            </em>
            , je vous accueille avec douceur, écoute et humanité, dans un cadre
            bienveillant propice à la détente et à la reconnexion à soi.
          </p>

          {/* --- CITATION FINALE --- */}
          <div className="mt-10 pt-7 border-t border-amber-200/80">
            <p className="text-amber-800 font-medium text-lg italic text-center leading-relaxed">
              <Leaf size={20} className="inline-block mr-2 text-amber-600" />
              “Prendre soin de soi, c’est aussi s’offrir la possibilité de
              rayonner à nouveau.”
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
