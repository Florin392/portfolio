import { Github, Linkedin, Mail } from "lucide-react";
import { HeroSocial } from "@/types";
import { SocialLink } from "./SocialLink";

interface SocialLinksProps {
  social: HeroSocial;
  variant?: "default" | "small";
}

export const SocialLinks = ({
  social,
  variant = "default",
}: SocialLinksProps) => {
  return (
    <div className="flex gap-3 md:gap-4">
      <SocialLink
        href={social.github}
        label="GitHub"
        icon={Github}
        variant={variant}
      />
      <SocialLink
        href={social.linkedin}
        label="LinkedIn"
        icon={Linkedin}
        variant={variant}
      />
      <SocialLink
        href={`mailto:${social.email}`}
        label="Email"
        icon={Mail}
        variant={variant}
      />
    </div>
  );
};
