/**
 * SkillsSection.test.tsx
 *
 * Behaviour: all skills render when no filter is applied.
 * Behaviour: each filter button shows only the skills in that category (exact count).
 * Behaviour: clicking All after a filter restores the full list.
 * Behaviour: active filter button gets the gradient class; others revert.
 * Accessibility: every progress bar has correct aria attributes including aria-valuenow.
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { SkillsSection } from "@/components/SkillsSection";
import { SKILLS } from "@/constants/skills";

const count = (category: string) =>
  SKILLS.filter((s) => s.category === category).length;

describe("SkillsSection — default state", () => {
  it("renders all skills when no filter is applied", () => {
    render(<SkillsSection />);
    expect(screen.getAllByRole("progressbar")).toHaveLength(SKILLS.length);
  });

  it("All button has the active gradient class by default", () => {
    render(<SkillsSection />);
    expect(screen.getByRole("button", { name: /^all$/i }).className).toContain(
      "from-cyan-500",
    );
  });
});

describe("SkillsSection — filter behaviour", () => {
  it("Frontend filter shows exactly the frontend skill count", async () => {
    const user = userEvent.setup();
    render(<SkillsSection />);

    await user.click(screen.getByRole("button", { name: /^frontend$/i }));

    expect(screen.getAllByRole("progressbar")).toHaveLength(count("frontend"));
  });

  it("Frontend filter hides backend skills — Node.js is not visible", async () => {
    const user = userEvent.setup();
    render(<SkillsSection />);

    await user.click(screen.getByRole("button", { name: /^frontend$/i }));

    expect(screen.queryByText("Node.js")).not.toBeInTheDocument();
  });

  it("Backend filter shows exactly the backend skill count", async () => {
    const user = userEvent.setup();
    render(<SkillsSection />);

    await user.click(screen.getByRole("button", { name: /^backend$/i }));

    expect(screen.getAllByRole("progressbar")).toHaveLength(count("backend"));
  });

  it("Backend filter hides frontend skills — React is not visible", async () => {
    const user = userEvent.setup();
    render(<SkillsSection />);

    await user.click(screen.getByRole("button", { name: /^backend$/i }));

    expect(screen.queryByText("React")).not.toBeInTheDocument();
  });

  it("Tools filter shows exactly the tools skill count", async () => {
    const user = userEvent.setup();
    render(<SkillsSection />);

    await user.click(screen.getByRole("button", { name: /^tools$/i }));

    expect(screen.getAllByRole("progressbar")).toHaveLength(count("tools"));
  });

  it("switching from Frontend back to All restores all skills", async () => {
    const user = userEvent.setup();
    render(<SkillsSection />);

    await user.click(screen.getByRole("button", { name: /^frontend$/i }));
    await user.click(screen.getByRole("button", { name: /^all$/i }));

    expect(screen.getAllByRole("progressbar")).toHaveLength(SKILLS.length);
  });
});

describe("SkillsSection — active button style", () => {
  it("clicked filter button gets the active gradient class", async () => {
    const user = userEvent.setup();
    render(<SkillsSection />);

    await user.click(screen.getByRole("button", { name: /^frontend$/i }));

    expect(
      screen.getByRole("button", { name: /^frontend$/i }).className,
    ).toContain("from-cyan-500");
  });

  it("previously active button reverts to bg-white/10 after switching", async () => {
    const user = userEvent.setup();
    render(<SkillsSection />);

    await user.click(screen.getByRole("button", { name: /^frontend$/i }));
    await user.click(screen.getByRole("button", { name: /^tools$/i }));

    expect(
      screen.getByRole("button", { name: /^frontend$/i }).className,
    ).toContain("bg-white/10");
  });
});

describe("SkillsSection — accessibility", () => {
  it("every progress bar has aria-valuemin=0 and aria-valuemax=100", () => {
    render(<SkillsSection />);
    screen.getAllByRole("progressbar").forEach((bar) => {
      expect(bar).toHaveAttribute("aria-valuemin", "0");
      expect(bar).toHaveAttribute("aria-valuemax", "100");
    });
  });

  it("every progress bar has a non-empty aria-label naming the skill", () => {
    render(<SkillsSection />);
    screen.getAllByRole("progressbar").forEach((bar) => {
      const label = bar.getAttribute("aria-label");
      expect(label).toBeTruthy();
    });
  });

  it("progress bar aria-valuenow matches the skill's level", () => {
    render(<SkillsSection />);
    const bars = screen.getAllByRole("progressbar");
    bars.forEach((bar, i) => {
      expect(bar).toHaveAttribute("aria-valuenow", String(SKILLS[i].level));
    });
  });
});
