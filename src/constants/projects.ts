import { Project, ProjectCategory, ProjectStatus } from "@/types";

export const PROJECTS: Project[] = [
  {
    id: "todo-app",
    title: "To-do app",
    description: "A simple to-do application for every day use.",
    technologies: ["React", "TailwindCSS"],
    image: "/projects/to-do-app.png",
    github: "https://github.com/Florin392/todoapp",
    live: "https://florin392.github.io/todoapp/",
  },
  {
    id: "password-generator",
    title: "Password generator",
    description: "A simple password generator built in two ways.",
    technologies: ["React", "Redux", "Vite", "TailwindCSS"],
    image: "/projects/password-generator.png",
    github: "https://github.com/Florin392/password-generator",
    live: "https://password-generator-dun-gamma.vercel.app/",
  },
  {
    id: "online-store",
    title: "Online store",
    description:
      "A platform for plant shopping, developed with a full-stack approach.",
    technologies: ["React", "TypeScript", ".NET", "Docker", "TailwindCSS"],
    image: "/projects/online-store.png",
    github: "https://github.com/Florin392/onlineStore",
    live: "https://online-shop.fly.dev/",
  },
  {
    id: "gemini-chatbot",
    title: "Chatbot with Gemini AI",
    description:
      "A conversational chatbot built with React and powered by Google's Gemini 2.5 Flash model.",
    technologies: [
      "React",
      "Vite",
      "CSS",
      ".NET",
      "Vercel",
      "Google Gemini 2.5 Flash",
    ],
    image: "/projects/gemini-chatbot.png",
    github: "https://github.com/Florin392/gemini-chatbot",
    live: "https://gemini-chatbot-fawn.vercel.app/",
  },
];

// Project categories for filtering (if needed in future)
export const PROJECT_CATEGORIES: ProjectCategory[] = [
  { id: "all", label: "All Projects" },
  { id: "frontend", label: "Frontend" },
  { id: "fullstack", label: "Full Stack" },
  { id: "personal", label: "Personal" },
];

// Project status types
export const PROJECT_STATUS: Record<
  "COMPLETED" | "IN_PROGRESS" | "PLANNED",
  ProjectStatus
> = {
  COMPLETED: "completed",
  IN_PROGRESS: "in-progress",
  PLANNED: "planned",
};
