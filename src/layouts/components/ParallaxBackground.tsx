import SimpleParallax from "simple-parallax-js";
import backgroundImage from "@/assets/geometric-shapes-background.jpg";

export const ParallaxBackground = () => {
    const imageSrc =
        typeof backgroundImage === "string"
            ? backgroundImage
            : (backgroundImage as any)?.src;

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {imageSrc ? (
                <SimpleParallax
                    scale={1.6}
                    delay={0}
                    transition="cubic-bezier(0,0,0,1)"
                >
                    <img
                        src={imageSrc}
                        alt="Background"
                        className="w-full h-screen object-cover opacity-40"
                    />
                </SimpleParallax>
            ) : (
                <div className="bg-dark w-full h-full" />
            )}
        </div>
    );
};
