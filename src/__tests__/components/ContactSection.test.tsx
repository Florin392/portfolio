/**
 * ContactSection.test.tsx
 *
 * Behaviour: email renders as a clickable mailto link.
 * Behaviour: location string is displayed.
 * Behaviour: Download Resume CTA has the download attribute and correct href.
 * Integration: SocialLinks renders GitHub, LinkedIn, and Email links.
 */

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ContactSection } from "@/components/ContactSection";
import { CONTACT_INFO, HERO_CONTENT } from "@/constants/content";

describe("ContactSection — contact info", () => {
  it("email address is a clickable mailto link", () => {
    render(<ContactSection />);
    expect(
      screen.getByRole("link", { name: CONTACT_INFO.email }),
    ).toHaveAttribute("href", `mailto:${CONTACT_INFO.email}`);
  });

  it("renders the full location string", () => {
    render(<ContactSection />);
    expect(screen.getByText(CONTACT_INFO.location.full)).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(<ContactSection />);
    expect(screen.getByText(CONTACT_INFO.subtitle)).toBeInTheDocument();
  });
});

describe("ContactSection — Download Resume CTA", () => {
  it("link has the download attribute", () => {
    render(<ContactSection />);
    expect(
      screen.getByRole("link", { name: HERO_CONTENT.cta.secondary.text }),
    ).toHaveAttribute("download");
  });

  it("link points to the correct href", () => {
    render(<ContactSection />);
    expect(
      screen.getByRole("link", { name: HERO_CONTENT.cta.secondary.text }),
    ).toHaveAttribute("href", HERO_CONTENT.cta.secondary.href);
  });
});

describe("ContactSection — social links integration", () => {
  it("renders GitHub, LinkedIn, and Email social links", () => {
    render(<ContactSection />);
    expect(screen.getByRole("link", { name: "GitHub" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "LinkedIn" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Email" })).toBeInTheDocument();
  });

  it("GitHub link opens in a new tab", () => {
    render(<ContactSection />);
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "target",
      "_blank",
    );
  });
});
