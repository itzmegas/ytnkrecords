import type { CollectionEntry } from "astro:content";
import {
  IconBrandInstagram,
  IconBrandSoundcloud,
  IconBrandSpotify,
  IconBrandYoutube,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

import Button from "./ui/Button";

interface SpotlightArtistProps {
  artists: CollectionEntry<"artists">[];
}

const SpotlightArtist = ({ artists }: SpotlightArtistProps) => {
  const [currentArtist, setCurrentArtist] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayArtist, setDisplayArtist] = useState(0);

  useEffect(() => {
    if (currentArtist !== displayArtist) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setDisplayArtist(currentArtist);
        setIsTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentArtist, displayArtist]);

  if (!artists || artists.length === 0) {
    return null;
  }

  const artist = artists[displayArtist];
  if (!artist) return null;

  const handlePrevArtist = () => {
    if (isTransitioning) return;
    setCurrentArtist((prev) => (prev - 1 + artists.length) % artists.length);
  };

  const handleNextArtist = () => {
    if (isTransitioning) return;
    setCurrentArtist((prev) => (prev + 1) % artists.length);
  };

  const slug = artist.id.replace(/\.md$/, "");

  // Resolve image source: it's a string URL from the content collection
  const imageSrc = artist.data.image;

  const defaultIconProps = { stroke: 1.2 };

  return (
    <div className="flex flex-col lg:flex-row items-center gap-12 relative px-2 lg:px-16">
      <Button
        onClick={handlePrevArtist}
        className="absolute left-0 lg:-left-8 z-20 p-3 bg-white/5 hover:bg-primary/20 hover:text-primary rounded-full transition-all border border-white/10 hover:border-primary/50 hidden md:flex"
      >
        <IconChevronLeft size={32} />
      </Button>

      <div className="relative w-full lg:w-1/2 aspect-square rounded-2xl overflow-hidden border border-primary/20 group">
        <div
          className={`w-full h-full transition-all duration-300 ease-in-out ${
            isTransitioning
              ? "opacity-0 scale-95 blur-sm"
              : "opacity-100 scale-100 blur-0"
          }`}
        >
          <img
            src={imageSrc}
            alt={artist.data.name}
            width={800}
            height={800}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-linear-to-tr from-primary/30 to-transparent mix-blend-overlay" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background-dark/40 backdrop-blur-sm">
          <a
            href={`/artists/${slug}`}
            className="bg-white text-black px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">
              open_in_new
            </span>
            View Profile
          </a>
        </div>
      </div>

      <div
        className={`w-full lg:w-1/2 flex flex-col gap-6 transition-all duration-300 ease-in-out ${
          isTransitioning
            ? "opacity-0 translate-x-4"
            : "opacity-100 translate-x-0"
        }`}
      >
        <h2 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase italic">
          {artist.data.name.split(" ")[0]}{" "}
          <span
            className="text-transparent"
            style={{ WebkitTextStroke: "1px white" }}
          >
            {artist.data.name.split(" ").slice(1).join(" ")}
          </span>
        </h2>
        <p className="text-slate-400 font-sans text-lg leading-relaxed line-clamp-4">
          {artist.data.bio}
        </p>
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-white">
            Links
          </span>
          <div className="flex gap-4">
            {artist.data.socials.instagram && (
              <a
                href={artist.data.socials.instagram}
                className="border border-white/40 p-2 rounded-full"
              >
                <IconBrandInstagram {...defaultIconProps} />
              </a>
            )}
            {artist.data.socials.spotify && (
              <a
                href={artist.data.socials.spotify}
                className="border border-white/40 p-2 rounded-full"
              >
                <IconBrandSpotify {...defaultIconProps} />
              </a>
            )}
            {artist.data.socials.youtube && (
              <a
                href={artist.data.socials.youtube}
                className="border border-white/40 p-2 rounded-full"
              >
                <IconBrandYoutube {...defaultIconProps} />
              </a>
            )}
            {artist.data.socials.soundcloud && (
              <a
                href={artist.data.socials.soundcloud}
                className="border border-white/40 p-2 rounded-full"
              >
                <IconBrandSoundcloud {...defaultIconProps} />
              </a>
            )}
          </div>
        </div>
      </div>

      <Button
        onClick={handleNextArtist}
        className="absolute right-0 lg:-right-8 z-20 p-3 bg-white/5 hover:bg-primary/20 hover:text-primary rounded-full transition-all border border-white/10 hover:border-primary/50 hidden md:flex"
      >
        <IconChevronRight size={32} />
      </Button>

      {/* Mobile controls */}
      <div className="flex md:hidden gap-4 mt-4">
        <Button
          onClick={handlePrevArtist}
          className="p-3 bg-white/5 rounded-full border border-white/10"
        >
          <IconChevronLeft />
        </Button>
        <Button
          onClick={handleNextArtist}
          className="p-3 bg-white/5 rounded-full border border-white/10"
        >
          <IconChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default SpotlightArtist;
