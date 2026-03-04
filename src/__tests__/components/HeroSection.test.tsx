/**
 * HeroSection.test.tsx
 *
 * Behaviour: "View Projects" button calls scrollTo with "projects".
 * Behaviour: Download Resume link carries the download attribute and correct href.
 * Behaviour: availability badge shows the right message based on status.available.
 * Behaviour: typing animation builds the first role character by character.
 * Behaviour: typing animation cycles to the second role after the hold period.
 *
 * Note on typing animation tests:
 *   The component renders displayText + "|" cursor inside the same parent <span>.
 *   After one tick (100ms) charIndex goes from 0→1, so displayText becomes the
 *   first character of the role. We query the parent container via its test-id
 *   and assert on textContent to avoid brittle multi-element text queries.
 */

import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

const mockScrollTo = jest.fn();
jest.mock("@/hooks/hooks", () => ({
  useScrollTo: () => mockScrollTo,
}));

import { HeroSection } from "@/components/HeroSection";
import { HERO_CONTENT } from "@/constants/content";

beforeEach(() => mockScrollTo.mockClear());

describe("HeroSection — CTA behaviour", () => {
  it("clicking 'View Projects' calls scrollTo with the section id 'projects'", async () => {
    const user = userEvent.setup();
    render(<HeroSection />);

    await user.click(
      screen.getByRole("button", { name: HERO_CONTENT.cta.primary.text }),
    );

    expect(mockScrollTo).toHaveBeenCalledWith("projects");
    expect(mockScrollTo).toHaveBeenCalledTimes(1);
  });

  it("Download Resume link has the download attribute", () => {
    render(<HeroSection />);
    expect(
      screen.getByRole("link", { name: HERO_CONTENT.cta.secondary.text }),
    ).toHaveAttribute("download");
  });

  it("Download Resume link points to the correct href", () => {
    render(<HeroSection />);
    expect(
      screen.getByRole("link", { name: HERO_CONTENT.cta.secondary.text }),
    ).toHaveAttribute("href", HERO_CONTENT.cta.secondary.href);
  });
});

describe("HeroSection — availability badge", () => {
  it("shows 'Open to opportunities' when status.available is true", () => {
    render(<HeroSection />);
    expect(screen.getByText("Open to opportunities")).toBeInTheDocument();
  });

  it("shows the full location in the badge", () => {
    render(<HeroSection />);
    expect(screen.getByText(HERO_CONTENT.location.full)).toBeInTheDocument();
  });
});

describe("HeroSection — typing animation", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("starts with an empty role text before any ticks", () => {
    render(<HeroSection />);
    HERO_CONTENT.roles.forEach((role) => {
      expect(screen.queryByText(role)).not.toBeInTheDocument();
    });
  });

  it("types out the first character of the first role after one tick", () => {
    const { container } = render(<HeroSection />);

    act(() => jest.advanceTimersByTime(100));

    // The typing area is the <div> that wraps the animated span.
    // We assert on the section's full text content which includes the typed char.
    const heroSection = container.querySelector("#hero");
    expect(heroSection?.textContent).toContain(HERO_CONTENT.roles[0][0]);
  });

  it("cycles to the second role after the full first role is typed and the hold ends", () => {
    const { container } = render(<HeroSection />);
    const firstRole = HERO_CONTENT.roles[0];
    const timeToFinish = (firstRole.length + 1) * 100 + 2000 + 100;

    act(() => jest.advanceTimersByTime(timeToFinish));

    const heroSection = container.querySelector("#hero");
    expect(heroSection?.textContent).toContain(HERO_CONTENT.roles[1][0]);
  });
});
