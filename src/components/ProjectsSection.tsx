import { useState } from "react";
import { Code, Github, ExternalLink } from "lucide-react";
import { PROJECTS } from "@/constants/projects";
import { CERTIFICATIONS } from "@/constants/content";
import { EMOJIS } from "@/constants/emojis";

interface ProjectImageProps {
  src: string;
  alt: string;
}

const ProjectImage = ({ src, alt }: ProjectImageProps) => {
  const [hasError, setHasError] = useState(false);
  return hasError ? (
    <Code
      className="w-12 h-12 md:w-16 md:h-16 text-cyan-400 opacity-50"
      aria-hidden="true"
    />
  ) : (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
      onError={() => setHasError(true)}
    />
  );
};

export const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="py-24 px-4 bg-black/30 backdrop-blur-sm relative z-10"
    >
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-12 text-center">
          Featured <span className="text-yellow-400">Projects</span>
        </h2>

        <p className="text-center text-gray-400 mb-12 md:mb-16 text-base md:text-lg max-w-2xl mx-auto">
          A showcase of my work, including microfrontend applications and
          full-stack development projects
        </p>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all group flex flex-col"
            >
              {/* Project Image/Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center overflow-hidden flex-shrink-0">
                <ProjectImage src={project.image} alt={project.title} />
              </div>

              {/* Project Content */}
              <div className="p-4 md:p-6 flex flex-col flex-grow">
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm md:text-base text-gray-400 mb-3 md:mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 md:px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links  */}
                <div className="flex gap-3 md:gap-4 mt-auto">
                  <a
                    href={project.github}
                    target={project.github !== "#" ? "_blank" : undefined}
                    rel={
                      project.github !== "#" ? "noopener noreferrer" : undefined
                    }
                    className="flex items-center gap-2 text-xs md:text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <Github className="w-3 h-3 md:w-4 md:h-4" />
                    Code
                  </a>
                  <a
                    href={project.live}
                    target={project.live !== "#" ? "_blank" : undefined}
                    rel={
                      project.live !== "#" ? "noopener noreferrer" : undefined
                    }
                    className="flex items-center gap-2 text-xs md:text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-16 md:mt-24 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
            Certifications {EMOJIS.certificate}
          </h3>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 ">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.id}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 md:p-8 max-w-sm hover:border-cyan-500/50 transition-all"
              >
                <div className="text-4xl md:text-5xl mb-3 md:mb-4">
                  {cert.icon}
                </div>
                <h4 className="font-semibold text-lg md:text-xl mb-2">
                  {cert.name}
                </h4>
                <p className="text-xs md:text-sm text-gray-400">
                  {cert.issuer} · {cert.status} · {cert.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
