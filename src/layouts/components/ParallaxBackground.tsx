import { useEffect, useRef } from "react";
import SimpleParallax from "simple-parallax-js/vanilla";
import backgroundImage from "@/assets/geometric-shapes-background.jpg";

export const ParallaxBackground = () => {
  const imgRef = useRef<HTMLImageElement>(null);
  const src =
    typeof backgroundImage === "string"
      ? backgroundImage
      : (backgroundImage as any).src;

  useEffect(() => {
    console.log("ParallaxBackground image src:", src);
    if (imgRef.current) {
      const instance = new SimpleParallax(imgRef.current, {
        transition: "cubic-bezier(0,0,0,1)",
        orientation: "up",
        scale: 1.6,
        delay: 0,
      });

      return () => {
        instance.destroy();
      };
    }
  }, [src]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <img
        ref={imgRef}
        src={
          src ||
          "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&q=80&w=2070"
        }
        alt="Background"
        className="w-full h-full object-cover opacity-40"
      />
    </div>
  );
};
