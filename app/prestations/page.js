"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const prestations = [
  {
    name: "Massage holistique",
    duration: "60 min",
    price: "75 €",
    desc: "Un massage complet qui harmonise le corps et l’esprit, rééquilibre les énergies et favorise un mieux-être global.",
    details:
      "Ce massage allie différentes techniques douces et profondes pour libérer les tensions physiques et émotionnelles. Il vise à rétablir l’harmonie entre le corps et l’esprit, tout en favorisant la détente et la reconnexion à soi.",
    image: "/images/massage-holistique.jpg",
  },
  {
    name: "Massage intuitif complet – Holistique, Énergétique & Magnétique",
    duration: "1h30",
    price: "95 €",
    desc: "Une approche personnalisée mêlant différentes techniques pour un soin profondément régénérant.",
    details:
      "Chaque séance est unique et guidée par l’intuition et la lecture du corps. Ce massage combine gestes énergétiques, effleurages et pressions ciblées pour équilibrer les flux vitaux et dénouer les blocages.",
    image: "/images/massage-intuitif.jpg",
  },
  {
    name: "Soins énergétiques",
    duration: "45 min",
    price: "55 €",
    desc: "Rééquilibrage subtil du flux énergétique pour apaiser les tensions physiques et émotionnelles.",
    details:
      "Grâce au magnétisme et à l’écoute subtile, ce soin nettoie les charges émotionnelles, revitalise le corps et rétablit la circulation harmonieuse des énergies.",
    image: "/images/massage-energetique.jpg",
  },
  {
    name: "Séance de relaxation",
    duration: "50 min",
    price: "65 €",
    desc: "Une détente guidée pour relâcher le mental et détendre le corps tout entier.",
    details:
      "La séance vise à reconnecter corps et esprit à travers la respiration, les gestes lents et l’écoute du rythme naturel. Idéal pour apaiser le stress du quotidien.",
    image: "/images/relaxation.jpg",
  },
  {
    name: "Massage assis AMMA",
    duration: "35 min",
    price: "50 €",
    desc: "Massage habillé sur chaise, efficace et revitalisant, idéal pour relâcher les tensions musculaires.",
    details:
      "Ce massage se pratique sur une chaise ergonomique et agit sur les points de tension du dos, des bras, du cou et de la tête. Il procure une sensation de légèreté immédiate.",
    image: "/images/massage-amma.jpg",
  },
  {
    name: "Massage tête / pieds / mains",
    duration: "30 min",
    price: "50 €",
    desc: "Soin ciblé sur les extrémités pour une détente profonde et une circulation stimulée.",
    details:
      "Ce massage favorise la circulation énergétique et détend les zones réflexes souvent négligées. Un moment de lâcher-prise total.",
    image: "/images/massage-tete-pieds-mains.jpg",
  },
  {
    name: "Power Feet",
    duration: "15 min",
    price: "20 €",
    desc: "Massage énergique des pieds apportant une sensation immédiate d’ancrage et de légèreté.",
    details:
      "Ce soin combine pressions et étirements des zones réflexes des pieds pour rééquilibrer le corps et stimuler l’énergie vitale.",
    image: "/images/power-feet.jpg",
  },
  {
    name: "Power Head",
    duration: "20 min",
    price: "25 €",
    desc: "Soin revitalisant du cuir chevelu pour libérer les tensions mentales.",
    details:
      "Massage relaxant du cuir chevelu, du visage et de la nuque. Il favorise la clarté d’esprit et améliore la qualité du sommeil.",
    image: "/images/power-head.jpg",
  },
  {
    name: "Massage sportif – préparation avant effort",
    duration: "1h30",
    price: "130 €",
    desc: "Massage tonique et stimulant, pour optimiser les performances physiques.",
    details:
      "Techniques rapides et profondes pour échauffer les muscles, améliorer la mobilité et prévenir les blessures avant un effort intense.",
    image: "/images/massage-sportif.jpg",
  },
  {
    name: "Massage récupération après l’effort",
    duration: "1h00",
    price: "150 €",
    desc: "Massage ciblé pour favoriser la récupération musculaire et réduire les courbatures.",
    details:
      "Massage profond et drainant pour éliminer les toxines, apaiser les contractures et accélérer la régénération musculaire.",
    image: "/images/massage-recuperation.jpg",
  },
  {
    name: "Massage profond avec points d’acupression",
    duration: "1h30",
    price: "95 €",
    desc: "Soin en profondeur pour détendre les tissus et activer les points d’énergie du corps.",
    details:
      "Travail précis sur les méridiens et points d’acupression. Permet de relâcher les tensions accumulées et d’activer la circulation énergétique.",
    image: "/images/massage-acupression.jpg",
  },
];

export default function Prestations() {
  const [selected, setSelected] = useState(null);

  return (
    <section
      className="min-h-screen py-20 px-6 md:px-20 bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/background-massages.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <h2 className="text-4xl font-semibold text-center text-amber-800 mb-10">
        Prestations proposées
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {prestations.map((service, i) => (
          <motion.div
            key={i}
            onClick={() => setSelected(service)}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg overflow-hidden cursor-pointer transition"
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src={service.image}
              alt={service.name}
              width={600}
              height={400}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 text-center">
              <h3 className="text-xl font-semibold text-amber-700 mb-2">
                {service.name}
              </h3>
              <p className="text-gray-600 italic mb-2">
                {service.duration} — {service.price}
              </p>
              <p className="text-gray-700 text-sm">{service.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal de détail */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-lg p-6 text-center shadow-lg relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <Image
                src={selected.image}
                alt={selected.name}
                width={500}
                height={300}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-semibold text-amber-700 mb-2">
                {selected.name}
              </h3>
              <p className="text-gray-600 italic mb-2">
                {selected.duration} — {selected.price}
              </p>
              <p className="text-gray-700">{selected.details}</p>
              <button
                onClick={() => setSelected(null)}
                className="mt-6 bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700"
              >
                Fermer
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
