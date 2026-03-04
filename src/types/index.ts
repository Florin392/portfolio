import React from "react";

export type SectionId = "hero" | "about" | "skills" | "projects" | "contact";

export interface Emojis {
  // Hero
  wave: string;
  developer: string;
  mechanicalEngineer: string;
  sideProjects: string;
  // Timeline
  education: string;
  retail: string;
  automotive: string;
  pivot: string;
  growth: string;
  // About tabs
  story: string;
  experience: string;
  beyond: string;
  // Beyond code
  running: string;
  hiking: string;
  book: string;
  food: string;
  coffee: string;
  typescript: string;
  backend: string;
  testing: string;
  database: string;
  docker: string;
  idea: string;
  // Other
  achievements: string;
  check: string;
  certificate: string;
  completed: string;
  location: string;
  arrow: string;
}

export interface ContactDetails {
  email: string;
  phone: string;
}

export interface HeroName {
  first: string;
  last: string;
}

export interface Location {
  city: string;
  country: string;
  full: string;
}

export interface HeroStatus {
  available: boolean;
  message: {
    available: string;
    unavailable: string;
  };
}

export interface HeroMetric {
  emoji: string;
  value: string;
  label: string;
}

export interface HeroSocial extends ContactDetails {
  github: string;
  linkedin: string;
}

export interface HeroCta {
  primary: { text: string; action: string };
  secondary: { text: string; href: string };
}

export interface HeroContent {
  name: HeroName;
  roles: string[];
  description: string;
  location: Location;
  status: HeroStatus;
  metrics: HeroMetric[];
  techStack: string[];
  social: HeroSocial;
  cta: HeroCta;
}

export interface TimelineItem {
  year: string;
  title: string;
  icon: string;
  description: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  duration: string;
  workLocation: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export type AboutTabId = "story" | "experience" | "beyond";

export interface AboutTab {
  id: AboutTabId;
  icon: string;
  label: string;
}

export interface BeyondCodeItem {
  emoji: string;
  text: string;
}

export interface FunFact {
  emoji: string;
  text: string;
  transitionEmojis: string[];
}

export interface BeyondCode {
  hobbies: BeyondCodeItem[];
  exploring: BeyondCodeItem[];
  funFact: FunFact;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  status: "In Progress" | "Completed";
  icon: string;
}

export interface ContactInfo extends ContactDetails {
  subtitle: string;
  location: Location;
  preferredContact: "email" | "phone";
}

export interface FooterContent {
  copyright: string;
  location: Location;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github: string;
  live: string;
}

export interface ProjectCategory {
  id: string;
  label: string;
}

export type ProjectStatus = "completed" | "in-progress" | "planned";

export type SkillCategory = "frontend" | "backend" | "tools";

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: SkillCategory;
  yearsOfExperience: number;
  context: string;
  highlights: string[];
}

export interface SkillCategoryOption {
  id: "all" | SkillCategory;
  label: string;
  count: number;
}

export interface MenuItem {
  id: SectionId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}
