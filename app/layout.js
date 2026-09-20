// app/layout.js

import { Great_Vibes } from "next/font/google";

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});

import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Le Colibri du Bien-Être — Massages & Soins Énergétiques à La Réunion",
  description: "Massages, soins énergétiques et bien-être holistique à La Réunion. Offrez-vous un moment de détente et rééquilibrez votre corps.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-amber-50 text-gray-800">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
