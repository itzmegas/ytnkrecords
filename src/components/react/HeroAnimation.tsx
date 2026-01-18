import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroAnimationProps {
  children: React.ReactNode;
}

export const HeroAnimation = ({ children }: HeroAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const bgImage = document.getElementById("bg-image");

      // Animación de fondo (Parallax + Scale)
      if (bgImage) {
        gsap.to(bgImage, {
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
          y: 100,
          scale: 1.5,
          ease: "none",
        });

        // Animación suave de respiración continua (independiente del scroll)
        gsap.to(bgImage, {
          opacity: 0.3,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      /*   // Animación de textos reveal
        gsap.fromTo(
          ".reveal-text",
          {
            y: 100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power4.out",
            delay: 0.5,
          },
        );
  
        // Animación de la imagen del hero
        gsap.from(".hero-image-container", {
          scale: 0.8,
          opacity: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)",
          delay: 0.2,
        });
  
        // Revelar secciones al hacer scroll
        const sections = containerRef.current.querySelectorAll("section");
        sections.forEach((section) => {
          gsap.from(section, {
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          });
        }); */
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="relative w-full">
      {children}
    </div>
  );
};
