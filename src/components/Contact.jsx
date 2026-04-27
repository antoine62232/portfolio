"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const formContainerRef = useRef(null);
  const successTextRef = useRef(null);
  const formRef = useRef(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // Animation d'apparition au scroll
  useGSAP(() => {
    gsap.fromTo(".contact-reveal", 
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      }
    );
  }, { scope: sectionRef });

  // La fonction de soumission
  const handleSubmit = (e) => {
    e.preventDefault(); 
    setIsSubmitting(true);

    // Appel à EmailJS pour envoyer le formulaire
    emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      formRef.current,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      // Si le message est envoyé -> On lance l'animation GSAP
      const tl = gsap.timeline({
        onComplete: () => setIsSent(true)
      });

      // 1. On fait disparaître le contenu du formulaire (fondu au noir)
      tl.to(".form-content", { 
        opacity: 0, 
        duration: 0.5
      })
      // 2. Le pliage (Le formulaire s'écrase en une ligne dorée)
      .to(formContainerRef.current, {
        height: "4px",
        minHeight: "4px",
        padding: 0,
        backgroundColor: "#D4AF37", 
        border: "none",
        duration: 0.8,
        ease: "power2.inOut"
      })
      // 3. L'envol (La ligne part vers le haut et le fond (Z) en rétrécissant)
      .to(formContainerRef.current, {
        y: -500, 
        scale: 0, 
        rotationZ: 15, 
        duration: 1.5,
        ease: "back.in(1.5)" 
      })
      // 4. Apparition du message de succès
      .fromTo(successTextRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 
        "-=0.2"
      );
    })
    .catch(() => {
      // En cas d'erreur, on affiche une alerte et on réactive le bouton d'envoi
      setIsSubmitting(false);
      alert("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
    });
  };

  return (
    <section 
      ref={sectionRef} 
      id="contact" 
      className="scroll-mt-24 w-full min-h-screen bg-[#050505] text-white py-24 px-8 md:px-24 flex flex-col justify-center relative z-10"
    >
      <div className="max-w-4xl mx-auto w-full relative">
        
        <h2 className="contact-reveal text-sm md:text-lg text-[#D4AF37] font-mono tracking-widest uppercase mb-8">
          &lt; 04. Contact /&gt;
        </h2>
        
        <p className="contact-reveal text-3xl md:text-5xl font-light leading-tight mb-16 text-white/80">
          Une idée ? Un projet ? <br/>
          <span className="text-white font-semibold">Parlons-en.</span>
        </p>

        <div className="relative w-full min-h-[550px] md:min-h-[400px] flex items-center justify-center"> 
          
          {!isSent && (
            <div 
              ref={formContainerRef} 
              className="contact-reveal w-full max-w-2xl bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm overflow-hidden"
            >
              {/* Ajout du formRef sur la balise form */}
              <form ref={formRef} onSubmit={handleSubmit} className="form-content flex flex-col space-y-8">
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div className="relative group">
      <label htmlFor="user_name" className="sr-only">Votre nom</label>
      <input 
        id="user_name"
        type="text" 
        name="user_name" 
        required 
        className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors peer"
        placeholder="Votre nom"
      />
    </div>
    <div className="relative group">
      <label htmlFor="user_firstname" className="sr-only">Votre prénom</label>
      <input 
        id="user_firstname"
        type="text" 
        name="user_firstname" 
        required 
        className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors peer"
        placeholder="Votre prénom"
      />
    </div>
  </div>

  <div className="relative group">
    <label htmlFor="user_email" className="sr-only">Votre adresse email</label>
    <input 
      id="user_email"
      type="email" 
      name="user_email"
      required 
      className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors peer"
      placeholder="Votre adresse email"
    />
  </div>

  <div className="relative group">
    <label htmlFor="message" className="sr-only">Votre message</label>
    <textarea 
      id="message"
      name="message"
      required 
      rows="4"
      className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors resize-none peer"
      placeholder="Votre message..."
    ></textarea>
  </div>

  <button 
    type="submit" 
    disabled={isSubmitting}
    className="mt-4 self-start px-8 py-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 font-mono tracking-wider uppercase text-sm"
  >
    {isSubmitting ? "Envoi..." : "Envoyer"}
  </button>

</form>
            </div>
          )}

          <div 
            ref={successTextRef} 
            className="absolute inset-0 flex flex-col items-start justify-center opacity-0 pointer-events-none"
          >
            <h3 className="text-3xl md:text-5xl font-light text-white mb-4">
              Message <span className="text-[#D4AF37] font-semibold tracking-wide">transmis.</span>
            </h3>
            <p className="text-white/60 text-lg">
              Je vous réponds à la vitesse de la lumière (ou presque).
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}