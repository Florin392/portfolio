/**
 * SocialLink.test.tsx
 *
 * SocialLink:
 *   Behaviour: renders a secure external link with correct href and aria-label.
 *   Behaviour: applies the correct background class per variant.
 *
 * SocialLinks:
 *   Integration: composes GitHub, LinkedIn, and Email links with correct hrefs.
 *   Behaviour: email link uses the mailto: protocol.
 *   Behaviour: variant prop flows through to every child link.
 */

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SocialLink } from "@/components/SocialLink";
import { SocialLinks } from "@/components/SocialLinks";
import { Github } from "lucide-react";

// ─── SocialLink ───────────────────────────────────────────────────────────────

describe("SocialLink", () => {
  const baseProps = {
    href: "https://github.com/test",
    label: "GitHub",
    icon: Github,
  };

  it("renders an anchor with the correct href", () => {
    render(<SocialLink {...baseProps} />);
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/test",
    );
  });

  it("opens in a new tab", () => {
    render(<SocialLink {...baseProps} />);
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "target",
      "_blank",
    );
  });

  it("has rel=noopener noreferrer to prevent tab-napping", () => {
    render(<SocialLink {...baseProps} />);
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "rel",
      "noopener noreferrer",
    );
  });

  it("default variant applies bg-white/10", () => {
    render(<SocialLink {...baseProps} />);
    expect(screen.getByRole("link").className).toContain("bg-white/10");
  });

  it("small variant applies bg-white/5 instead of bg-white/10", () => {
    render(<SocialLink {...baseProps} variant="small" />);
    const link = screen.getByRole("link");
    expect(link.className).toContain("bg-white/5");
    expect(link.className).not.toContain("bg-white/10");
  });
});

// ─── SocialLinks ──────────────────────────────────────────────────────────────

const mockSocial = {
  github: "https://github.com/Florin392",
  linkedin: "https://www.linkedin.com/in/florin-iordache-2b998b166",
  email: "iordacheflorin3@yahoo.com",
  phone: "+34 614 31 05 56",
};

describe("SocialLinks", () => {
  it("renders exactly 3 links", () => {
    render(<SocialLinks social={mockSocial} />);
    expect(screen.getAllByRole("link")).toHaveLength(3);
  });

  it("GitHub link points to the correct URL", () => {
    render(<SocialLinks social={mockSocial} />);
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      mockSocial.github,
    );
  });

  it("LinkedIn link points to the correct URL", () => {
    render(<SocialLinks social={mockSocial} />);
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      mockSocial.linkedin,
    );
  });

  it("Email link uses the mailto: protocol", () => {
    render(<SocialLinks social={mockSocial} />);
    expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      `mailto:${mockSocial.email}`,
    );
  });

  it("small variant applies to all child links", () => {
    render(<SocialLinks social={mockSocial} variant="small" />);
    screen.getAllByRole("link").forEach((link) => {
      expect(link.className).toContain("bg-white/5");
    });
  });

  it("default variant applies to all child links when no variant is passed", () => {
    render(<SocialLinks social={mockSocial} />);
    screen.getAllByRole("link").forEach((link) => {
      expect(link.className).toContain("bg-white/10");
    });
  });
});
