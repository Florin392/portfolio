import {
  AboutTab,
  BeyondCode,
  Certification,
  ContactInfo,
  ExperienceItem,
  FooterContent,
  HeroContent,
  Location,
  TimelineItem,
} from "@/types";
import { EMOJIS } from "./emojis";
import { PROJECTS } from "./projects";

const LOCATION: Location = {
  city: "Málaga",
  country: "Spain",
  full: "Torremolinos, Málaga, Spain",
};

export const HERO_CONTENT: HeroContent = {
  name: {
    first: "Florin",
    last: "Iordache",
  },
  roles: ["Jr. Frontend Developer", "Jr. React Developer"],
  description:
    "I'm passionate about web development and continuous learning. As a Frontend Developer with 1.5 years at NN Insurance Group, I've built financial applications using React, TypeScript, and Redux. Working with microfrontend architecture taught me to create modular, scalable solutions that make a real impact.",
  location: LOCATION,
  status: {
    available: true,
    message: {
      available: "Open to opportunities",
      unavailable: "Currently unavailable",
    },
  },
  metrics: [
    {
      emoji: EMOJIS.developer,
      value: "1.5+",
      label: "Years of Frontend Experience",
    },
    {
      emoji: EMOJIS.mechanicalEngineer,
      value: "5",
      label: "Years of Mechanical Design Engineering",
    },
    {
      emoji: EMOJIS.sideProjects,
      value: PROJECTS.length.toString(),
      label: "Side Projects",
    },
  ],
  techStack: [
    "React",
    "TypeScript",
    "Redux Toolkit",
    "Material-UI",
    "Tailwind CSS",
    "Jest",
  ],
  social: {
    github: "https://github.com/Florin392",
    linkedin: "https://www.linkedin.com/in/florin-iordache-2b998b166",
    email: "iordacheflorin3@yahoo.com",
    phone: "+34 614 31 05 56",
  },
  cta: {
    primary: { text: "View Projects", action: "scrollToProjects" },
    secondary: {
      text: "Download Resume",
      href: "https://drive.google.com/file/d/11-rAcm8SdQZFguYTkyqUlcV7TkL0eliD/view?usp=drive_link",
    },
  },
};

export const TIMELINE: TimelineItem[] = [
  {
    year: "2012-2016",
    title: "The Foundation",
    icon: EMOJIS.education,
    description:
      "Industrial Engineering @ POLITEHNICA Bucharest. Where I learned to solve complex problems systematically.",
  },
  {
    year: "2015-2017",
    title: "Understanding Users",
    icon: EMOJIS.retail,
    description:
      "Sales & Customer Service at Decathlon and Gebrüder Weiss. Learned empathy and communication - crucial skills for understanding users and working with teams.",
  },
  {
    year: "2017-2022",
    title: "Leading Teams",
    icon: EMOJIS.automotive,
    description:
      "Renault-Nissan-Mitsubishi (5 years). Managed design teams, launched vehicles. These leadership skills translate perfectly to Agile development.",
  },
  {
    year: "2021-2022",
    title: "The Pivot",
    icon: EMOJIS.pivot,
    description:
      "Learned JavaScript/React at eJobs Romania. Evening courses while working full-time. Fell in love with web development.",
  },
  {
    year: "2022-2024",
    title: "Frontend Developer",
    icon: EMOJIS.developer,
    description:
      "NN Insurance Group - Frontend Developer. Built financial planning apps with React microfrontends. This is where I leveled up.",
  },
  {
    year: "2025",
    title: "Expanding Horizons",
    icon: EMOJIS.growth,
    description:
      "IBM Full Stack Certification + Open to New Adventures. Learning Node.js/Express. Ready for the next chapter!",
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "nn-insurance",
    company: "NN Insurance Group",
    role: "Frontend Developer",
    duration: "Nov 2022 - Apr 2024",
    workLocation: "Remote",
    description:
      "Built financial planning and insurance quotation applications using React microfrontend architecture.",
    achievements: [
      "Developed custom React hooks for centralized state management",
      "Optimized performance reducing render time by 40%",
      "Maintained 80%+ test coverage with Jest",
      "Collaborated in Agile Scrum with cross-functional teams",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Redux Toolkit",
      "Material-UI",
      "Jest",
    ],
  },
  {
    id: "renault",
    company: "Renault-Nissan-Mitsubishi",
    role: "Engineering Lead",
    duration: "Aug 2022 - Nov 2022",
    workLocation: "Bucharest, Romania",
    description:
      "Led design teams and managed cross-functional collaboration for vehicle development projects.",
    achievements: [
      "Managed team of designers for compliant component development",
      "Facilitated cross-functional communication",
      "Led vehicle launch into manufacturing",
    ],
    technologies: [
      "Leadership",
      "Project Management",
      "Cross-functional Teams",
    ],
  },
];

export const ABOUT_TABS: AboutTab[] = [
  { id: "story", icon: EMOJIS.story, label: "My Story" },
  { id: "experience", icon: EMOJIS.experience, label: "Experience" },
  { id: "beyond", icon: EMOJIS.beyond, label: "Beyond Code" },
];

export const BEYOND_CODE: BeyondCode = {
  hobbies: [
    { emoji: EMOJIS.running, text: "Running along Málaga beaches" },
    { emoji: EMOJIS.hiking, text: "Hiking in the Andalusian mountains" },
    {
      emoji: EMOJIS.book,
      text: "Losing myself in sci-fi, novels, and self-growth books",
    },
    {
      emoji: EMOJIS.food,
      text: "Turning the kitchen into my little creative lab",
    },
    { emoji: EMOJIS.coffee, text: "Coffee in hand, ideas in mind" },
  ],
  exploring: [
    {
      emoji: EMOJIS.developer,
      text: "Mastering React fundamentals and modern React practices",
    },
    {
      emoji: EMOJIS.typescript,
      text: "Improving code quality through strong typing with TypeScript",
    },
    {
      emoji: EMOJIS.testing,
      text: "Testing apps primarily with unit tests using Jest, beginning to explore integration testing concepts, and interested in learning end-to-end testing tools like Cypress",
    },
    {
      emoji: EMOJIS.backend,
      text: "Diving into backend basics: building RESTful APIs with Node.js and Express and using Postman for API testing and debugging",
    },
    {
      emoji: EMOJIS.database,
      text: "Learning NoSQL concepts and MongoDB for fullstack apps",
    },
    {
      emoji: EMOJIS.docker,
      text: "Learning Docker basics to create consistent development and deployment environments",
    },
  ],
  funFact: {
    emoji: EMOJIS.idea,
    text: "I went from designing car interiors to designing web interfaces. User experience matters whether you're driving a Renault or using a web app!",
    transitionEmojis: [
      EMOJIS.mechanicalEngineer,
      EMOJIS.arrow,
      EMOJIS.developer,
    ],
  },
};

export const ACHIEVEMENTS: string[] = [
  "Career Pivot: Engineering → Frontend Development",
  "React + TypeScript Production Experience",
  "React Hooks for State Management",
  "Performance Optimization with React Hooks",
  "Yup + React Hook Form Integration",
  "Jest Testing & Code Reviews",
  "Agile Team Collaboration (UI/UX, Backend, QA)",
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "ibm-fullstack",
    name: "IBM Full Stack Developer",
    issuer: "Coursera",
    date: "2025",
    status: "In Progress",
    icon: EMOJIS.education,
  },
  {
    id: "js-developer",
    name: "JavaScript Developer",
    issuer: "eJobs Romania",
    date: "2021-2022",
    status: "Completed",
    icon: EMOJIS.achievements,
  },
];

export const CONTACT_INFO: ContactInfo = {
  subtitle: "Looking for a frontend developer? Let's talk!",
  email: HERO_CONTENT.social.email,
  phone: HERO_CONTENT.social.phone,
  location: LOCATION,
  preferredContact: "email",
};

export const FOOTER_CONTENT: FooterContent = {
  copyright: "© 2025 Florin Iordache. All rights reserved.",
  location: LOCATION,
};
