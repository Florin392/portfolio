/**
 * Footer.test.tsx
 *
 * Behaviour: renders copyright text and location.
 * Integration: SocialLinks renders inside the footer landmark.
 * Behaviour: social links in the footer open in a new tab.
 */

import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Footer } from "@/components/Footer";
import { FOOTER_CONTENT } from "@/constants/content";

describe("Footer", () => {
  it("renders the copyright text", () => {
    render(<Footer />);
    expect(screen.getByText(FOOTER_CONTENT.copyright)).toBeInTheDocument();
  });

  it("renders the location string", () => {
    render(<Footer />);
    expect(screen.getByText(FOOTER_CONTENT.location.full)).toBeInTheDocument();
  });

  it("renders GitHub, LinkedIn, and Email links inside the footer landmark", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(
      within(footer).getByRole("link", { name: "GitHub" }),
    ).toBeInTheDocument();
    expect(
      within(footer).getByRole("link", { name: "LinkedIn" }),
    ).toBeInTheDocument();
    expect(
      within(footer).getByRole("link", { name: "Email" }),
    ).toBeInTheDocument();
  });

  it("all social links open in a new tab", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    within(footer)
      .getAllByRole("link")
      .forEach((link) => {
        expect(link).toHaveAttribute("target", "_blank");
      });
  });
});
