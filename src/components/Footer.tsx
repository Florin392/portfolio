import { FOOTER_CONTENT, HERO_CONTENT } from "@/constants/content";
import { SocialLinks } from "./SocialLinks";

export const Footer = () => {
  const { social } = HERO_CONTENT;

  return (
    <footer className="py-8 md:py-12 px-4 border-t border-white/10 bg-black/30 backdrop-blur-sm relative z-10">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          <div className="text-gray-400 text-center md:text-left text-sm md:text-base">
            <p className="mb-1">{FOOTER_CONTENT.copyright}</p>
            <p className="text-xs md:text-sm">{FOOTER_CONTENT.location.full}</p>
          </div>

          <div className="flex gap-3 md:gap-4">
            <SocialLinks social={social} variant="small" />
          </div>
        </div>
      </div>
    </footer>
  );
};
