/**
 * integrity.test.ts
 *
 * Cross-constant business rules — things TypeScript cannot catch at compile
 * time because they depend on runtime relationships between separate files.
 *
 * Rule: if TypeScript already enforces it, it is NOT tested here.
 */

import { PROJECTS } from "@/constants/projects";
import { SKILLS, SKILL_CATEGORIES } from "@/constants/skills";
import {
  HERO_CONTENT,
  CONTACT_INFO,
  FOOTER_CONTENT,
  CERTIFICATIONS,
} from "@/constants/content";

describe("Cross-constant integrity", () => {
  it("hero 'Side Projects' metric value stays in sync with PROJECTS.length", () => {
    // If someone adds a project but forgets to update the metric, this fails.
    const metric = HERO_CONTENT.metrics.find((m) =>
      m.label.toLowerCase().includes("side project"),
    );
    expect(metric?.value).toBe(String(PROJECTS.length));
  });

  it("CONTACT_INFO.email is the same value as HERO_CONTENT.social.email", () => {
    // Both point to the same LOCATION const — if someone edits one manually
    // and forgets the other, this catches the drift.
    expect(CONTACT_INFO.email).toBe(HERO_CONTENT.social.email);
  });

  it("FOOTER_CONTENT.location.full matches CONTACT_INFO.location.full", () => {
    expect(FOOTER_CONTENT.location.full).toBe(CONTACT_INFO.location.full);
  });

  it("SKILL_CATEGORIES 'all' count equals the actual SKILLS array length", () => {
    // Guards against manually hardcoded counts diverging from the real array.
    const allCategory = SKILL_CATEGORIES.find((c) => c.id === "all");
    expect(allCategory?.count).toBe(SKILLS.length);
  });

  it("each SKILL_CATEGORY sub-count matches the real filtered result", () => {
    SKILL_CATEGORIES.filter((c) => c.id !== "all").forEach((cat) => {
      const actual = SKILLS.filter((s) => s.category === cat.id).length;
      expect(cat.count).toBe(actual);
    });
  });

  it("all CERTIFICATION ids are unique", () => {
    const ids = CERTIFICATIONS.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("all PROJECT ids are unique", () => {
    const ids = PROJECTS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
