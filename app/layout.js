// app/layout.js
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Le Colibri du Bien-Être",
  description: "Massages holistiques et soins énergétiques à l’écoute du corps et de l’âme.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-amber-50 text-gray-800">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
