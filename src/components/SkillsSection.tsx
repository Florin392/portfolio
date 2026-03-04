import { useState } from "react";
import { SKILLS, SKILL_CATEGORIES } from "@/constants/skills";
import { SkillCategory } from "@/types";

type ActiveCategory = "all" | SkillCategory;

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>("all");

  const filteredSkills =
    activeCategory === "all"
      ? SKILLS
      : SKILLS.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 px-4 relative z-10">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-12 text-center">
          Technical <span className="text-yellow-400">Skills</span>
        </h2>

        <p className="text-center text-gray-400 mb-8 md:mb-12 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          Skills honed through real-world projects and continuous learning, with
          context from actual experience
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12">
          {SKILL_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id as ActiveCategory)}
              className={`px-4 md:px-6 py-2 rounded-full transition-all capitalize text-sm md:text-base font-semibold ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50"
                  : "bg-white/10 border border-white/20 text-gray-400 hover:bg-white/20"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredSkills.map((skill, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 md:p-6 hover:border-cyan-500/50 transition-all group"
            >
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <h3 className="font-semibold text-base md:text-lg group-hover:text-cyan-400 transition-colors">
                  {skill.name}
                </h3>
                <span className="text-xs md:text-sm font-bold text-yellow-400">
                  {skill.level}%
                </span>
              </div>

              <p className="text-xs md:text-sm text-gray-400 mb-3 md:mb-4 min-h-[40px] md:min-h-[60px] leading-relaxed">
                {skill.context}
              </p>

              <div
                className="w-full bg-gray-800/50 h-2 rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={skill.level}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${skill.name} proficiency`}
              >
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
