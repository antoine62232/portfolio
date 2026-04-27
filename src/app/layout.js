// src/app/layout.js
import "./globals.css";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/utils/SmoothScroll";

export const metadata = {
  title: "Antoine Bayart — Développeur Fullstack",
  description:
    "Portfolio d'Antoine Bayart, développeur web fullstack spécialisé React, Next.js et interfaces 3D interactives.",
  authors: [{ name: "Antoine Bayart" }],
  keywords: ["développeur fullstack", "React", "Next.js", "Three.js", "portfolio", "Antoine Bayart"],
  openGraph: {
    title: "Antoine Bayart — Développeur Fullstack",
    description:
      "Portfolio d'Antoine Bayart, développeur web fullstack spécialisé React, Next.js et interfaces 3D interactives.",
    url: "https://portfolio-antoine-bayart.vercel.app",
    siteName: "Antoine Bayart Portfolio",
    locale: "fr_FR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="antialiased">
      <body className="bg-[#050505] text-white">
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}