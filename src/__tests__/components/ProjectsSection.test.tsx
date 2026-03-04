/**
 * ProjectsSection.test.tsx
 *
 * Behaviour: renders a card with title, Code link, and Live Demo link per project.
 * Edge case: ProjectImage shows a fallback icon when the image fails to load.
 * Behaviour: external links have target=_blank and rel=noopener noreferrer.
 * Behaviour: certifications section always renders below the projects grid.
 */

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ProjectsSection } from "@/components/ProjectsSection";
import { PROJECTS } from "@/constants/projects";
import { CERTIFICATIONS } from "@/constants/content";

describe("ProjectsSection — project cards", () => {
  it("renders a title card for every project", () => {
    render(<ProjectsSection />);
    PROJECTS.forEach((p) => {
      expect(screen.getByText(p.title)).toBeInTheDocument();
    });
  });

  it("renders a Code link for every project", () => {
    render(<ProjectsSection />);
    expect(screen.getAllByRole("link", { name: /code/i })).toHaveLength(
      PROJECTS.length,
    );
  });

  it("renders a Live Demo link for every project", () => {
    render(<ProjectsSection />);
    expect(screen.getAllByRole("link", { name: /live demo/i })).toHaveLength(
      PROJECTS.length,
    );
  });
});

describe("ProjectsSection — external link safety", () => {
  it("all non-placeholder links have target=_blank", () => {
    render(<ProjectsSection />);
    screen
      .getAllByRole("link")
      .filter((l) => l.getAttribute("href") !== "#")
      .forEach((link) => {
        expect(link).toHaveAttribute("target", "_blank");
      });
  });

  it("all non-placeholder links have rel=noopener noreferrer", () => {
    render(<ProjectsSection />);
    screen
      .getAllByRole("link")
      .filter((l) => l.getAttribute("href") !== "#")
      .forEach((link) => {
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
      });
  });
});

describe("ProjectsSection — ProjectImage fallback (edge case)", () => {
  it("renders an img element for each project initially", () => {
    render(<ProjectsSection />);
    expect(screen.getAllByRole("img")).toHaveLength(PROJECTS.length);
  });

  it("removes the broken img and shows the fallback icon on load error", () => {
    render(<ProjectsSection />);
    const images = screen.getAllByRole("img");

    fireEvent.error(images[0]);

    // One image replaced by an aria-hidden fallback icon — img count drops by 1
    expect(screen.getAllByRole("img")).toHaveLength(PROJECTS.length - 1);
  });
});

describe("ProjectsSection — certifications", () => {
  it("renders every certification name", () => {
    render(<ProjectsSection />);
    CERTIFICATIONS.forEach((cert) => {
      expect(screen.getByText(cert.name)).toBeInTheDocument();
    });
  });

  it("renders issuer and status for every certification", () => {
    render(<ProjectsSection />);
    CERTIFICATIONS.forEach((cert) => {
      // Rendered as "{issuer} · {status} · {date}" in a single paragraph
      expect(screen.getByText(new RegExp(cert.issuer))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(cert.status))).toBeInTheDocument();
    });
  });
});
