import { LucideIcon } from "lucide-react";

interface SocialLinkProps {
  href: string;
  label: string;
  icon: LucideIcon;
  variant?: "default" | "small";
}

export const SocialLink = ({
  href,
  label,
  icon: Icon,
  variant = "default",
}: SocialLinkProps) => {
  const sizeClasses = variant === "small" ? "h-4 w-4 md:h-5 md:w-5" : "w-6 h-6";
  const paddingClasses = variant === "small" ? "p-2 md:p-3" : "p-3";
  const bgClass = variant === "small" ? "bg-white/5" : "bg-white/10";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${paddingClasses} ${bgClass} rounded-full hover:bg-cyan-500/20 transition-colors`}
      aria-label={label}
    >
      <Icon className={sizeClasses} />
    </a>
  );
};
