import MagneticLink from './ui/MagneticLink';

export default function Navbar() {
  return (
    // fixed top-0 : Toujours visible
    // z-50 : Au-dessus de ton futur canvas 3D
    // backdrop-blur-md : Léger effet de verre dépoli sur le fond noir
    <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo minimaliste */}
        <div className="text-xl font-bold text-white tracking-tighter">
          PORT<span className="text-[#D4AF37] drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">FOLIO</span>
        </div>

        {/* Liens de navigation */}
        <ul className="flex space-x-6 items-center">
          <MagneticLink href="#about">À Propos</MagneticLink>
          <MagneticLink href="#stack">Stack</MagneticLink>
          <MagneticLink href="#projects">Projets</MagneticLink>
          <MagneticLink href="#contact">Contact</MagneticLink>
        </ul>

      </div>
    </nav>
  );
}