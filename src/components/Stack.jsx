"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Frontend & Frameworks",
    skills: ["React", "Next.js", "Astro", "JavaScript (ES6+)"]
  },
  {
    title: "UI & Design Libraries",
    skills: ["Tailwind CSS", "Material UI", "Chakra UI", "Bootstrap"]
  },
  {
    title: "Backend & Database",
    skills: ["Node.js", "Express", "MySQL", "API REST"]
  },
  {
    title: "Animation & 3D",
    skills: ["Three.js", "GSAP", "Framer Motion"]
  },
  {
    title: "Outils & Sécurité",
    skills: ["Stripe", "JWT", "Axios", "Git"]
  }
];

export default function Stack() {
  const sectionRef = useRef();

  useGSAP(() => {
    gsap.fromTo(".skill-category", 
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      }
    );

    gsap.fromTo(".skill-badge", 
      { scale: 0.8, opacity: 0 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: "back.out(1.7)",
      }
    );
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      id="stack" 
      className="min-h-screen bg-[#050505] text-white py-24 px-8 md:px-24 flex flex-col justify-center relative z-10"
    >
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="skill-category text-sm md:text-lg text-[#D4AF37] font-mono tracking-widest uppercase mb-12">
          &lt; 02. Stack Technique /&gt;
        </h2>

        <div className="space-y-16">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <h3 className="text-white/50 font-mono text-xs uppercase tracking-[0.2em] mb-6">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, i) => (
                  <div 
                    key={i} 
                    className="skill-badge px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm text-white/70 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}