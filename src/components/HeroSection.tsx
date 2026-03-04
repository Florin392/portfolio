import { useState, useEffect, useCallback } from "react";
import { MapPin } from "lucide-react";
import { HERO_CONTENT } from "@/constants/content";
import { useScrollTo } from "@/hooks/hooks";
import { EMOJIS } from "@/constants/emojis";
import { SocialLinks } from "./SocialLinks";

const TYPING_SPEED_MS = 100;
const HOLD_AFTER_TYPING_MS = 2000;

export const HeroSection = () => {
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const scrollTo = useScrollTo();

  // Typing animation effect
  useEffect(() => {
    let currentRole = HERO_CONTENT.roles[roleIndex];
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex <= currentRole.length) {
        setDisplayText(currentRole.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setRoleIndex((prev) => (prev + 1) % HERO_CONTENT.roles.length);
        }, HOLD_AFTER_TYPING_MS);
      }
    }, TYPING_SPEED_MS);

    return () => clearInterval(typeInterval);
  }, [roleIndex]);

  const handleViewProjects = useCallback(() => {
    scrollTo("projects");
  }, [scrollTo]);

  const { status, name, location, cta, social, metrics, techStack } =
    HERO_CONTENT;
  const isAvailable = status.available;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20"
    >
      <div className="container max-w-5xl mx-auto text-center z-10">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in">
          Hi, I'm
          <span className="text-cyan-400 pl-2 md:pl-4">{name.first}</span>
          <span className="text-yellow-400 px-2 md:px-4">{name.last}</span>
          {EMOJIS.wave}
        </h1>

        <div className="h-16 flex items-center justify-center mb-6">
          <span className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">
            {displayText}
            <span className="animate-pulse">|</span>
          </span>
        </div>

        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed opacity-0 animate-fade-in-delay-1">
          {HERO_CONTENT.description}
        </p>

        {/* Status Badge */}
        <div
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-full mb-10 opacity-0 animate-fade-in-delay-2 ${
            isAvailable
              ? "bg-green-500/20 border border-green-500"
              : "bg-red-500/20 border border-red-500"
          }`}
        >
          <div
            className={`w-3 h-3 rounded-full animate-pulse ${
              isAvailable ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <span className="font-medium">
            {isAvailable
              ? status.message.available
              : status.message.unavailable}
          </span>
          <span className="text-gray-400">|</span>
          <MapPin className="w-4 h-4" />
          <span>{location.full}</span>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-2xl mx-auto mb-10 opacity-0 animate-fade-in-delay-2">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 md:p-6 hover:scale-105 transition-transform"
            >
              <div className="text-3xl md:text-4xl mb-2">{metric.emoji}</div>
              <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-2">
                {metric.value}
              </div>
              <div className="text-xs md:text-sm text-gray-400">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 opacity-0 animate-fade-in-delay-3">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 md:px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs md:text-sm text-cyan-300 hover:bg-cyan-500/20 transition-all"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-delay-4">
          <button
            onClick={handleViewProjects}
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-105 transition-all"
          >
            {cta.primary.text}
          </button>
          <a
            href={cta.secondary.href}
            download
            className="px-8 py-3 border-2 border-cyan-500 rounded-full font-semibold hover:bg-cyan-500/10 transition-all text-center"
          >
            {cta.secondary.text}
          </a>
        </div>

        {/* Social Links */}
        <div className="flex gap-4 justify-center pt-10 opacity-0 animate-fade-in-delay-4">
          <SocialLinks social={social} />
        </div>
      </div>
    </section>
  );
};
