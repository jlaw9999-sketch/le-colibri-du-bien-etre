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
      "Alliance du toucher énergétique, magnétique et relaxant, ce massage s’adapte à vos besoins du moment. Il aide à libérer les tensions émotionnelles et physiques, tout en réveillant l’énergie vitale et la sérénité intérieure.",
    image: "/images/massage-intuitif.jpg",
  },
  {
    name: "Soins énergétiques",
    duration: "45 min",
    price: "55 €",
    desc: "Rééquilibrage subtil du flux énergétique pour apaiser les tensions physiques et émotionnelles.",
    details:
      "Ce soin rééquilibre vos centres d’énergie (chakras), libère les blocages émotionnels et apaise les tensions intérieures. Il favorise le lâcher-prise et une sensation de légèreté.",
    image: "/images/massage-energetique.jpg",
  },
  {
    name: "Séance de relaxation",
    duration: "50 min",
    price: "65 €",
    desc: "Une détente guidée pour relâcher le mental et détendre le corps tout entier.",
    details:
      "Une détente profonde guidée par la respiration, les sons ou des visualisations apaisantes. Idéal pour calmer le mental, améliorer le sommeil et retrouver un état de paix intérieure.",
    image: "/images/relaxation.jpg",
  },
  {
    name: "Massage assis AMMA",
    duration: "35 min",
    price: "50 €",
    desc: "Massage habillé sur chaise, efficace et revitalisant, idéal pour relâcher les tensions musculaires.",
    details:
      "Massage rapide et habillé, réalisé sur chaise. Parfait pour soulager les tensions du dos, des épaules et du cou, et retrouver énergie et concentration.",
    image: "/images/massage-amma.jpg",
  },
  {
    name: "Massage tête / pieds / mains",
    duration: "30 min",
    price: "50 €",
    desc: "Soin ciblé sur les extrémités pour une détente profonde et une circulation stimulée.",
    details:
      "Ce soin complet agit sur les zones réflexes pour stimuler la circulation et relâcher les tensions. Il offre une profonde sensation d’ancrage et de bien-être global.",
    image: "/images/massage-tete-pieds-mains.jpg",
  },
  {
    name: "Power Feet",
    duration: "15 min",
    price: "20 €",
    desc: "Massage énergique des pieds apportant une sensation immédiate d’ancrage et de légèreté.",
    details:
      "Massage énergique et précis des pieds pour relancer la circulation, réduire la fatigue et ancrer l’énergie. Idéal après une longue journée ou en période de stress.",
    image: "/images/power-feet.jpg",
  },
  {
    name: "Power Head",
    duration: "20 min",
    price: "25 €",
    desc: "Soin revitalisant du cuir chevelu pour libérer les tensions mentales.",
    details:
      "Stimulant la circulation sanguine et nerveuse, il aide à soulager les migraines, les tensions cervicales et favorise la concentration et la clarté mentale.",
    image: "/images/power-head.jpg",
  },
  {
    name: "Massage sportif – préparation avant effort",
    duration: "1h30",
    price: "130 €",
    desc: "Massage tonique et stimulant, pour optimiser les performances physiques.",
    details:
      "Spécialement conçu pour les sportifs, il prépare le corps à l’effort ou aide à récupérer après l’entraînement. Il améliore la souplesse, diminue les douleurs musculaires et prévient les blessures.",
    image: "/images/massage-sportif.jpg",
  },
  {
    name: "Massage récupération après l’effort",
    duration: "1h00",
    price: "150 €",
    desc: "Massage ciblé pour favoriser la récupération musculaire et réduire les courbatures.",
    details:
      "Idéal après une séance intense, ce soin favorise l’élimination des toxines et réduit les courbatures. Il soutient la régénération musculaire et la détente profonde.",
    image: "/images/massage-recuperation.jpg",
  },
  {
    name: "Massage profond avec points d’acupression",
    duration: "1h30",
    price: "95 €",
    desc: "Soin en profondeur pour détendre les tissus et activer les points d’énergie du corps.",
    details:
      "Ce massage profond agit sur les méridiens énergétiques et les points clés du corps. Il libère les blocages physiques et émotionnels et favorise un réalignement global.",
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
