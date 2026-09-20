"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock, Tag, CalendarCheck, Info, X, Sparkles, CheckCircle2 } from "lucide-react";

const prestations = [
  {
    name: "Massage holistique",
    duration: "60 min",
    price: "75 €",
    desc: "Un massage complet qui harmonise le corps et l’esprit, rééquilibre les énergies et favorise un mieux-être global.",
    summary: "Harmonisation globale, libération des tensions profondes, reconnexion corps-esprit.",
    details:
      "Le massage holistique considère l'individu dans sa globalité : physique, mental et émotionnel. Au-delà d'une simple détente musculaire, cette démarche vise à défaire les nœuds physiques liés au stress accumulé et aux postures quotidiennes.\n\nEn stimulant la circulation sanguine et lymphatique, ce soin favorise l'élimination des toxines tout en apaisant le système nerveux central. C'est la prestation idéale si vous vous sentez surmené(e), déconnecté(e) de votre corps ou à la recherche d'un ancrage profond.",
    benefits: [
      "Relâchement des tensions musculaires chroniques",
      "Réduction significative du niveau de stress et de cortisol",
      "Amélioration de la qualité du sommeil et du tonus vital",
    ],
    image: "/images/massage-holistique.jpg",
  },
  {
    name: "Massage intuitif complet – Holistique, Énergétique & Magnétique",
    duration: "1h30",
    price: "95 €",
    desc: "Une approche personnalisée mêlant différentes techniques pour un soin profondément régénérant.",
    summary: "Sur-mesure absolu, libération émotionnelle, réalignement énergétique intense.",
    details:
      "Chaque corps conserve en mémoire des blocages, des traumatismes légers ou des émotions non exprimées qui se traduisent par des raideurs et de la fatigue. Ce soin sur-mesure s'adapte en temps réel à l'état de votre corps et de votre champ énergétique.\n\nEn combinant le travail des tissus profonds, le magnétisme et la libération énergétique, ce massage agit comme une véritable réinitialisation. Il permet de lever les blocages subtils qui freinent votre dynamisme et d'harmoniser votre circulation énergétique globale.",
    benefits: [
      "Libération des blocages émotionnels et somatiques",
      "Sensation d'alignement et de clarté mentale retrouvée",
      "Régénération profonde de l'énergie vitale",
    ],
    image: "/images/massage-intuitif.jpg",
  },
  {
    name: "Soins énergétiques",
    duration: "45 min",
    price: "55 €",
    desc: "Rééquilibrage subtil du flux énergétique pour apaiser les tensions physiques et émotionnelles.",
    summary: "Rééquilibrage des chakras, harmonisation énergétique, apaisement mental.",
    details:
      "Notre corps est traversé par des flux d'énergie qui peuvent se retrouver perturbés par le stress, l'anxiété ou la fatigue accumulée. Le soin énergétique consiste à nettoyer et harmoniser les centres énergétiques (chakras) sans sollicitation musculaire forte.\n\nCe travail de rééquilibrage permet de relancer la libre circulation des flux vitaux dans tout l'organisme. Il est particulièrement recommandé en période de transition, d'épuisement mental ou d'anxiété, lorsqu'un massage physique ne suffit pas à apaiser le mental.",
    benefits: [
      "Apaisement immédiat du bavardage mental",
      "Sensation de légèreté et de soulagement intérieur",
      "Renforcement des capacités d'auto-guérison du corps",
    ],
    image: "/images/massage-energetique.jpg",
  },
  {
    name: "Séance de relaxation",
    duration: "50 min",
    price: "65 €",
    desc: "Une détente guidée pour relâcher le mental et détendre le corps tout entier.",
    summary: "Lâcher-prise guidé, déconnexion du stress, apaisement du système nerveux.",
    details:
      "La vie moderne soumet notre organisme à un état d'hypervigilance quasi permanent. Cette séance offre une parenthèse pour couper avec le rythme quotidien et réapprendre à votre système nerveux à se détendre véritablement.\n\nGrâce à des techniques de respiration ciblées, d'ancrage et de stimulations apaisantes, votre corps sort du mode « survie » pour entrer dans un état de régénération profonde. C'est une démarche essentielle pour prévenir le surmenage et réapprivoiser la sérénité.",
    benefits: [
      "Diminution de la tension artérielle et du rythme cardiaque",
      "Meilleure gestion des émotions et de l'anxiété",
      "Restauration d'un sommeil réparateur",
    ],
    image: "/images/relaxation.jpg",
  },
  {
    name: "Massage assis AMMA",
    duration: "35 min",
    price: "50 €",
    desc: "Massage habillé sur chaise, efficace et revitalisant, idéal pour relâcher les tensions musculaires.",
    summary: "Soin rapide et habillé, soulagement du haut du dos, regain d'énergie immédiat.",
    details:
      "Inspiré des arts traditionnels japonais, le massage AMMA s'effectue habillé et assis sur une chaise ergonomique. Il cible précisément les zones les plus sollicitées par le travail de bureau ou la conduite : le dos, les épaules, la nuque, les bras et la tête.\n\nÀ travers un enchaînement précis de pressions, d'étirements et de percussions, ce soin dénoue rapidement les contractures tout en redonnant un coup de fouet à votre niveau de vigilance et d'énergie.",
    benefits: [
      "Décompression rapide des vertèbres cervicales et dorsales",
      "Soulagement immédiat des tensions liées aux écrans",
      "Restauration de la concentration et de la vitalité",
    ],
    image: "/images/massage-amma.jpg",
  },
  {
    name: "Massage tête / pieds / mains",
    duration: "30 min",
    price: "50 €",
    desc: "Soin ciblé sur les extrémités pour une détente profonde et une circulation stimulée.",
    summary: "Reflexologie ciblée, ancrage profond, soulagement des extrémités.",
    details:
      "Les extrémités de notre corps concentrent une densité exceptionnelle de terminaisons nerveuses et de points réflexes reliés à l'ensemble des organes. Prendre soin de la tête, des mains et des pieds permet d'agir par répercussion sur tout l'organisme.\n\nCe soin libère les micro-tensions accumulées dans les mains et les pieds tout en relâchant les muscles crâniens et faciaux. Le résultat est une sensation unique à la fois d'ancrage à la terre et de légèreté dans la tête.",
    benefits: [
      "Stimulation de la circulation sanguine et de la microcirculation",
      "Libération des pressions mentales et des maux de tête",
      "Sensation d'équilibrage et de reconnexion corporelle",
    ],
    image: "/images/massage-tete-pieds-mains.jpg",
  },
  {
    name: "Power Feet",
    duration: "15 min",
    price: "20 €",
    desc: "Massage énergique des pieds apportant une sensation immédiate d’ancrage et de légèreté.",
    summary: "Relance circulatoire, soulagement des pieds lourds, effet défatiguant instantané.",
    details:
      "Nos pieds supportent tout le poids de notre corps au quotidien et souffrent souvent d'un manque d'attention. Le soin Power Feet est un protocole dynamique spécifiquement conçu pour décongestionner et défatiguer les membres inférieurs.\n\nPar des manœuvres vigoureuses et des pressions ciblées, ce massage relance immédiatement la circulation de retour, soulage la voûte plantaire et élimine la sensation de pieds lourds ou engourdis.",
    benefits: [
      "Légèreté immédiate dans les jambes et les pieds",
      "Stimulation des points d'ancrage énergétique",
      "Idéal après une longue station debout ou de la marche",
    ],
    image: "/images/power-feet.jpg",
  },
  {
    name: "Power Head",
    duration: "20 min",
    price: "25 €",
    desc: "Soin revitalisant du cuir chevelu pour libérer les tensions mentales.",
    summary: "Décompression crânienne, oxygénation du cuir chevelu, clarté d'esprit.",
    details:
      "Le stress se loge de manière très insidieuse dans le cuir chevelu, les tempes et la mâchoire, provoquant souvent des céphalées de tension ou une fatigue visuelle. Le Power Head est un massage ciblé et intense de la boîte crânienne.\n\nEn stimulant l'oxygénation des tissus et la microcirculation crânienne, ce soin dissipe le brouillard mental, détend les traits du visage et procure une clarté d'esprit rafraîchissante.",
    benefits: [
      "Soulagement des céphalées et des tensions oculaires",
      "Relaxation profonde des muscles faciaux et de la mâchoire",
      "Oxygénation du cuir chevelu et sensation de fraîcheur",
    ],
    image: "/images/power-head.jpg",
  },
  {
    name: "Massage sportif – préparation avant effort",
    duration: "1h30",
    price: "130 €",
    desc: "Massage tonique et stimulant, pour optimiser les performances physiques.",
    summary: "Préparation musculaire, augmentation de l'élasticité, prévention des blessures.",
    details:
      "Destiné aux athlètes et passionnés de sport préparant un objectif ou un entraînement intense, ce massage prépare activement le système musculo-squelettique à l'effort à venir.\n\nGrâce à des manœuvres rapides, des frictions et des étirements passifs, il réchauffe les muscles en profondeur, augmente la souplesse articulaire et optimise l'afflux sanguin vers les fibres musculaires pour réduire le risque de blessure ou d'élongation.",
    benefits: [
      "Échauffement et assouplissement des fibres musculaires",
      "Optimisation de l'amplitude articulaire et du tonus",
      "Prévention active de la crampe et de la déchirure",
    ],
    image: "/images/massage-sportif.jpg",
  },
  {
    name: "Massage récupération après l’effort",
    duration: "1h00",
    price: "150 €",
    desc: "Massage ciblé pour favoriser la récupération musculaire et réduire les courbatures.",
    summary: "Drainage des toxines, réduction des courbatures, régénération musculaire rapide.",
    details:
      "Après un effort physique soutenu, les muscles accumulent de l'acide lactique et subissent de micro-lésions à l'origine des courbatures et de la raideur. Ce massage de récupération est un maillon essentiel de l'entraînement sportif.\n\nÀ travers des pétrissages profonds, des drainages et des pressions glissées lentissimes, il accélère le retour veineux, évacue les déchets métaboliques et favorise la réparation tissulaire pour vous permettre de reprendre l'entraînement plus vite et sans douleur.",
    benefits: [
      "Élimination accélérée des toxines et de l'acide lactique",
      "Diminution significative de l'intensité des courbatures",
      "Relâchement des spasmes et contractures post-effort",
    ],
    image: "/images/massage-recuperation.jpg",
  },
  {
    name: "Massage profond avec points d’acupression",
    duration: "1h30",
    price: "95 €",
    desc: "Soin en profondeur pour détendre les tissus et activer les points d’énergie du corps.",
    summary: "Travail myofascial profond, déblocage des méridiens, réalignement structural.",
    details:
      "Inspiré de la médecine traditionnelle chinoise et du travail des tissus profonds (deep tissue), ce soin s'adresse aux personnes souffrant de raideurs tenaces ou de blocages récurrents.\n\nEn combinant des pressions fermes le long des méridiens énergétiques et un travail ciblé sur les points d'acupression, ce massage permet de défaire les adhérences dans les fascias et de réaligner la posture, offrant un soulagement durable là où les massages classiques restent en surface.",
    benefits: [
      "Déblocage des nœuds musculaires et myo-fasciaux profonds",
      "Rééquilibrage des flux d'énergie le long des méridiens",
      "Amélioration de la posture et liberté de mouvement retrouvée",
    ],
    image: "/images/massage-acupression.jpg",
  },
];

export default function Prestations() {
  const [selected, setSelected] = useState(null);

  return (
    <section
      className="min-h-screen py-16 px-4 md:px-12 bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/background-massages.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-900 mb-4 bg-amber-50/80 backdrop-blur-sm py-3 px-6 rounded-2xl w-fit mx-auto shadow-sm">
          Prestations & Tarifs
        </h2>
        <p className="text-center text-amber-950 font-medium mb-12 max-w-2xl mx-auto bg-amber-50/70 backdrop-blur-sm p-3 rounded-xl">
          Découvrez nos soins sur-mesure pour rééquilibrer le corps et l'esprit. Réservez votre moment de sérénité en quelques clics.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {prestations.map((service, i) => (
            <motion.div
              key={i}
              className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl overflow-hidden flex flex-col justify-between transition-all border border-amber-100"
              whileHover={{ y: -4 }}
            >
              <div>
                <div className="relative h-48 w-full">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-amber-800/90 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md backdrop-blur-md flex items-center gap-1">
                    <Tag size={13} />
                    {service.price}
                  </div>
                  <div className="absolute top-3 left-3 bg-white/90 text-amber-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md backdrop-blur-md flex items-center gap-1">
                    <Clock size={13} />
                    {service.duration}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-amber-900 mb-2 leading-snug">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {service.desc}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-0 space-y-2 mt-auto">
                <button
                  onClick={() => setSelected(service)}
                  className="w-full text-xs text-amber-800 font-semibold py-2.5 px-3 rounded-lg border border-amber-300 hover:bg-amber-50 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Info size={14} />
                  Détails & bienfaits du soin
                </button>

                <Link
                  href={`/reservation?soin=${encodeURIComponent(service.name)}`}
                  className="w-full bg-amber-700 hover:bg-amber-800 text-white font-medium py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors text-sm"
                >
                  <CalendarCheck size={16} />
                  Réserver ce soin
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal de détail enrichi */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-full z-10 transition-colors"
              >
                <X size={18} />
              </button>

              <div className="relative h-56 w-full rounded-xl overflow-hidden mb-5">
                <Image
                  src={selected.image}
                  alt={selected.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-white">
                  <span className="text-xs font-semibold bg-black/40 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 border border-white/20">
                    <Clock size={13} /> {selected.duration}
                  </span>
                  <span className="text-lg font-bold bg-amber-600 px-3 py-1 rounded-lg shadow-md">
                    {selected.price}
                  </span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-amber-900 mb-2">
                {selected.name}
              </h3>

              {/* Résumé express */}
              <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 mb-5 flex items-start gap-2.5 text-amber-900 text-xs font-medium">
                <Sparkles size={16} className="text-amber-700 shrink-0 mt-0.5" />
                <span>{selected.summary}</span>
              </div>

              {/* Description détaillée avec paragraphes */}
              <div className="space-y-3 mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Pourquoi choisir ce soin ?
                </h4>
                {selected.details.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-gray-700 text-sm leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Liste des bienfaits concrets */}
              {selected.benefits && (
                <div className="mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-3">
                    Bénéfices constatés :
                  </h4>
                  <ul className="space-y-2">
                    {selected.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                        <CheckCircle2 size={15} className="text-amber-600 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions de bas de modal */}
              <div className="flex gap-3 pt-2 border-t border-gray-100">
                <button
                  onClick={() => setSelected(null)}
                  className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl transition-colors text-sm"
                >
                  Fermer
                </button>
                <Link
                  href={`/reservation?soin=${encodeURIComponent(selected.name)}`}
                  className="w-2/3 bg-amber-700 hover:bg-amber-800 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors text-sm"
                >
                  <CalendarCheck size={16} />
                  Réserver ce soin
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
