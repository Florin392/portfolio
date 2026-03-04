import { useState } from "react";
import { Briefcase, CheckCircle } from "lucide-react";
import {
  TIMELINE,
  EXPERIENCE,
  BEYOND_CODE,
  ACHIEVEMENTS,
  ABOUT_TABS,
} from "@/constants/content";
import { EMOJIS } from "@/constants/emojis";
import { AboutTabId } from "@/types";

export const AboutSection = () => {
  const [activeTab, setActiveTab] = useState<AboutTabId>("story");

  return (
    <section
      id="about"
      className="py-24 px-4 bg-black/30 backdrop-blur-sm relative z-10"
    >
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 md:mb-12">
          More Than Just <span className="text-yellow-400">Code</span>
        </h2>
        <p className="text-center text-gray-400 mb-8 md:mb-12 text-base md:text-lg">
          The journey from engines to interfaces
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12">
          {ABOUT_TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/50"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px] md:min-h-[600px]">
          {/* My Story - Timeline */}
          {activeTab === "story" && (
            <div className="space-y-6 md:space-y-8 animate-fade-in">
              <div className="relative">
                {TIMELINE.map((item, i) => (
                  <div
                    key={item.title}
                    className="flex gap-4 md:gap-8 mb-8 md:mb-12 group"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-2xl md:text-3xl group-hover:scale-110 transition-transform shadow-lg flex-shrink-0">
                        {item.icon}
                      </div>
                      {i < TIMELINE.length - 1 && (
                        <div className="w-1 h-full bg-gradient-to-b from-cyan-500 to-blue-500 opacity-30 group-hover:opacity-60 transition-opacity" />
                      )}
                    </div>
                    <div className="flex-1 pb-8 md:pb-12">
                      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 md:p-6 hover:border-cyan-500/50 transition-all">
                        <div className="text-xs md:text-sm text-cyan-400 font-semibold mb-2">
                          {item.year}
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {activeTab === "experience" && (
            <div className="grid grid-cols-1 gap-4 md:gap-6 animate-fade-in">
              {EXPERIENCE.map((exp) => (
                <div
                  key={exp.id}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 md:p-6 hover:border-cyan-500/50 transition-all group"
                >
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="p-2 md:p-3 rounded-full bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors flex-shrink-0">
                      <Briefcase className="h-5 w-5 md:h-6 md:w-6 text-cyan-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-xl md:text-2xl text-white mb-1">
                        {exp.role}
                      </h4>
                      <p className="text-cyan-300 font-medium text-base md:text-lg">
                        {exp.company}
                      </p>
                      <p className="text-xs md:text-sm text-gray-500 mb-3">
                        {exp.duration}
                      </p>
                      <p className="text-sm md:text-base text-gray-400 mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        {exp.achievements.map((achievement) => (
                          <div
                            key={achievement}
                            className="flex items-start text-xs md:text-sm text-gray-400"
                          >
                            <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2 md:px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Beyond Code */}
          {activeTab === "beyond" && (
            <div className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
                {/* When I'm not coding */}
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
                    When I&apos;m not coding...
                  </h3>
                  <div className="space-y-3 md:space-y-4">
                    {BEYOND_CODE.hobbies.map((item) => (
                      <div
                        key={item.text}
                        className="flex items-start gap-3 text-base md:text-lg text-gray-300"
                      >
                        <span className="text-xl md:text-2xl flex-shrink-0">
                          {item.emoji}
                        </span>
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Currently exploring */}
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
                    Currently exploring...
                  </h3>
                  <div className="space-y-3 md:space-y-4">
                    {BEYOND_CODE.exploring.map((item) => (
                      <div
                        key={item.text}
                        className="flex items-start gap-3 text-base md:text-lg text-gray-300"
                      >
                        <span className="text-xl md:text-2xl flex-shrink-0">
                          {item.emoji}
                        </span>
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Fun Fact */}
              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-2xl p-6 md:p-8 text-center">
                <p className="text-lg md:text-xl font-semibold leading-relaxed">
                  {BEYOND_CODE.funFact.emoji} {BEYOND_CODE.funFact.text}
                  {BEYOND_CODE.funFact.transitionEmojis.map((emoji) => (
                    <span key={emoji}>{emoji}</span>
                  ))}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Key Achievements */}
        <div className="mt-12 md:mt-16">
          <h3 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8">
            Key Achievements {EMOJIS.achievements}
          </h3>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {ACHIEVEMENTS.map((achievement) => (
              <span
                key={achievement}
                className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full text-xs md:text-sm font-semibold text-yellow-300"
              >
                {EMOJIS.check} {achievement}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
