import "./globals.css";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/utils/SmoothScroll";

export const metadata = {
  title: "Portfolio | Développeur Fullstack",
  description: "Portfolio Next-Gen avec animations GSAP et 3D",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="antialiased">
      <body className="bg-[#050505] text-white">
        
        {/* On englobe tout le site avec le Smooth Scroll */}
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
        
      </body>
    </html>
  );
}