"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function QuiSuisJe() {
  return (
    <section
      className="min-h-screen bg-cover bg-center py-20 px-6 md:px-20 flex flex-col items-center text-gray-800"
      style={{
        backgroundImage: "url('/images/background-qui-suis-je.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl bg-white/85 backdrop-blur-sm rounded-2xl shadow-lg p-8 md:p-12 text-center md:text-left"
      >
        <div className="flex flex-col md:flex-row items-center gap-10 mb-8">
          <Image
            src="/images/photo-marie-christine.jpg"
            alt="Marie-Christine Valin"
            width={300}
            height={300}
            className="rounded-full shadow-md object-cover"
          />
          <div>
            <h2 className="text-4xl font-semibold text-amber-800 mb-4">
              Qui suis-je ?
            </h2>
            <p className="italic text-gray-700">
              “Soulager, apaiser, accompagner : ma vocation est d’harmoniser
              corps et esprit avec humanité.”
            </p>
          </div>
        </div>

        <div className="space-y-6 leading-relaxed text-gray-700">
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
              massage holistique, magnétisme, Power Wellness et réflexologie
              plantaire
            </strong>
            . J’exerce en tant que praticienne indépendante et également en
            partenariat avec des structures spécialisées dans le bien-être.
            Chaque séance est pour moi un moment unique : une écoute du corps,
            une lecture subtile des tensions, une rencontre entre les besoins du
            moment et l’énergie de la personne.
          </p>

          <p>
            En 2023, j’ai fondé{" "}
            <strong>Le Colibri du Bien-Être</strong>, symbole de légèreté et de
            lumière, pour proposer des soins individualisés, empreints de
            respect, d’éthique et d’authenticité. Ma pratique repose sur une
            approche globale du bien-être : harmoniser les plans physiques,
            émotionnels et énergétiques pour aider chacun à retrouver son
            équilibre.
          </p>

          <p>
            Guidée par la conviction que{" "}
            <em>le toucher est un langage silencieux qui guérit ce que les mots
            ne peuvent dire</em>, je vous accueille avec douceur, écoute et
            humanité, dans un cadre bienveillant propice à la détente et à la
            reconnexion à soi.
          </p>

          <p className="text-amber-800 font-medium mt-8">
            🌿 “Prendre soin de soi, c’est aussi s’offrir la possibilité de
            rayonner à nouveau.”
          </p>
        </div>
      </motion.div>
    </section>
  );
}
