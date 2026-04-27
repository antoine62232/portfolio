export const metadata = {
  title: "Mentions Légales — Antoine Bayart",
  description: "Mentions légales et politique de confidentialité du portfolio d'Antoine Bayart.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MentionsLegales() {
  return (
    <main className="min-h-screen bg-[#050505] text-white py-32 px-8 md:px-24">
      <div className="max-w-4xl mx-auto w-full space-y-16">

        {/* Titre */}
        <div>
          <h1 className="text-sm text-[#D4AF37] font-mono tracking-widest uppercase mb-4">
            Mentions Légales
          </h1>
          <p className="text-white/40 text-sm font-mono">
            Dernière mise à jour : avril 2025
          </p>
        </div>

        {/* Éditeur du site */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white border-b border-white/10 pb-4">
            1. Éditeur du site
          </h2>
          <p className="text-white/70 leading-relaxed">
            Ce site est édité par :<br /><br />
            <span className="text-white font-medium">Antoine Bayart</span><br />
            Particulier — Développeur web fullstack<br />
            Email : <a href="mailto:antoinebayart@laposte.net" className="text-[#D4AF37] hover:underline">antoinebayart@laposte.net</a>
          </p>
        </section>

        {/* Hébergement */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white border-b border-white/10 pb-4">
            2. Hébergement
          </h2>
          <p className="text-white/70 leading-relaxed">
            Ce site est hébergé par :<br /><br />
            <span className="text-white font-medium">Vercel Inc.</span><br />
            440 N Barranca Ave #4133, Covina, CA 91723, États-Unis<br />
            Site web : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:underline">vercel.com</a>
          </p>
        </section>

        {/* Propriété intellectuelle */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white border-b border-white/10 pb-4">
            3. Propriété intellectuelle
          </h2>
          <p className="text-white/70 leading-relaxed">
            L'ensemble du contenu de ce site (textes, visuels, animations, code) est la propriété exclusive d'Antoine Bayart. Toute reproduction, même partielle, est interdite sans autorisation préalable.
          </p>
        </section>

        {/* Politique de confidentialité */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white border-b border-white/10 pb-4">
            4. Politique de confidentialité (RGPD)
          </h2>

          <div className="space-y-6 text-white/70 leading-relaxed">
            <div>
              <h3 className="text-white font-medium mb-2">Données collectées</h3>
              <p>
                Lors de l'utilisation du formulaire de contact, les données suivantes sont collectées : nom, prénom et adresse email.
              </p>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2">Finalité</h3>
              <p>
                Ces données sont utilisées uniquement pour répondre à votre prise de contact. Elles ne sont ni stockées, ni revendues, ni transmises à des tiers.
              </p>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2">Service d'envoi</h3>
              <p>
                Les messages sont acheminés via le service <span className="text-white">EmailJS</span>. Pour en savoir plus sur leur politique de confidentialité : <a href="https://www.emailjs.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:underline">emailjs.com/legal/privacy-policy</a>
              </p>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2">Vos droits</h3>
              <p>
                Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-moi à : <a href="mailto:antoinebayart@laposte.net" className="text-[#D4AF37] hover:underline">antoinebayart@laposte.net</a>
              </p>
            </div>
          </div>
        </section>

        {/* Retour */}
        <div>
          <a 
            href="/" 
            className="inline-block text-sm font-mono text-white/50 hover:text-[#D4AF37] transition-colors duration-300 uppercase tracking-widest"
          >
            ← Retour au portfolio
          </a>
        </div>

      </div>
    </main>
  );
}