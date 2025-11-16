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
  title: "Le Colibri du Bien-Être",
  description: "Massages, soins et bien-être holistique",
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
