import { Mail, MapPin } from "lucide-react";
import { CONTACT_INFO, HERO_CONTENT } from "@/constants/content";
import { SocialLinks } from "./SocialLinks";

export const ContactSection = () => {
  const { social, cta } = HERO_CONTENT;

  return (
    <section id="contact" className="py-24 px-4 relative z-10">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8">
          Get In <span className="text-yellow-400">Touch</span>
        </h2>

        <p className="text-lg md:text-xl text-gray-400 mb-8 md:mb-12">
          {CONTACT_INFO.subtitle}
        </p>

        {/* Contact Information */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 md:p-8 mb-6 md:mb-8">
          <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
            Contact Information
          </h3>

          <div className="space-y-4 md:space-y-6 text-left max-w-md mx-auto">
            {/* Email */}
            <div className="flex items-center gap-3 md:gap-4">
              <div className="p-2 md:p-3 bg-cyan-500/10 rounded-full flex-shrink-0">
                <Mail className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
              </div>
              <div className="min-w-0">
                <p className="text-xs md:text-sm text-gray-400">Email</p>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-base md:text-lg hover:text-cyan-400 transition-colors break-all"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 md:gap-4">
              <div className="p-2 md:p-3 bg-cyan-500/10 rounded-full flex-shrink-0">
                <MapPin className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-400">Location</p>
                <p className="text-base md:text-lg">
                  {CONTACT_INFO.location.full}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={cta.secondary.href}
            download
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-105 transition-all"
          >
            {cta.secondary.text}
          </a>

          {/* Social Icons */}
          <SocialLinks social={social} />
        </div>
      </div>
    </section>
  );
};
