/**
 * AboutSection.test.tsx
 *
 * Behaviour: Story tab is active by default — timeline content is visible.
 * Behaviour: clicking Experience shows experience content, hides timeline.
 * Behaviour: clicking Beyond Code shows hobbies and exploring content.
 * Behaviour: clicking Story again restores timeline content.
 * Behaviour: aria-selected reflects the currently active tab.
 * Edge case: Key Achievements section is always visible regardless of active tab.
 *
 * Note on Achievements matcher:
 *   Each achievement renders as `{EMOJIS.check} {achievement}` inside a single
 *   <span>. The emoji and text are siblings in the same text node so
 *   getByText(exactString) fails. We use a partial regex match instead.
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { AboutSection } from "@/components/AboutSection";

describe("AboutSection — default state (Story tab)", () => {
  it("Story tab has aria-selected=true on first render", () => {
    render(<AboutSection />);
    expect(screen.getByRole("tab", { name: /my story/i })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("timeline content is visible by default", () => {
    render(<AboutSection />);
    expect(screen.getByText("The Foundation")).toBeInTheDocument();
  });

  it("experience and beyond content are NOT visible by default", () => {
    render(<AboutSection />);
    expect(screen.queryByText("NN Insurance Group")).not.toBeInTheDocument();
    expect(screen.queryByText(/when i'm not coding/i)).not.toBeInTheDocument();
  });
});

describe("AboutSection — tab switching behaviour", () => {
  it("clicking Experience shows company name and hides timeline", async () => {
    const user = userEvent.setup();
    render(<AboutSection />);

    await user.click(screen.getByRole("tab", { name: /experience/i }));

    expect(screen.getByText("NN Insurance Group")).toBeInTheDocument();
    expect(screen.queryByText("The Foundation")).not.toBeInTheDocument();
  });

  it("clicking Beyond Code shows hobbies heading and hides timeline", async () => {
    const user = userEvent.setup();
    render(<AboutSection />);

    await user.click(screen.getByRole("tab", { name: /beyond/i }));

    expect(screen.getByText(/when i'm not coding/i)).toBeInTheDocument();
    expect(screen.queryByText("The Foundation")).not.toBeInTheDocument();
  });

  it("clicking Beyond Code shows currently exploring section", async () => {
    const user = userEvent.setup();
    render(<AboutSection />);

    await user.click(screen.getByRole("tab", { name: /beyond/i }));

    expect(screen.getByText(/currently exploring/i)).toBeInTheDocument();
  });

  it("clicking Story after Experience restores the timeline", async () => {
    const user = userEvent.setup();
    render(<AboutSection />);

    await user.click(screen.getByRole("tab", { name: /experience/i }));
    await user.click(screen.getByRole("tab", { name: /my story/i }));

    expect(screen.getByText("The Foundation")).toBeInTheDocument();
    expect(screen.queryByText("NN Insurance Group")).not.toBeInTheDocument();
  });
});

describe("AboutSection — aria-selected state", () => {
  it("Experience tab gets aria-selected=true after click", async () => {
    const user = userEvent.setup();
    render(<AboutSection />);

    await user.click(screen.getByRole("tab", { name: /experience/i }));

    expect(screen.getByRole("tab", { name: /experience/i })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("Story tab loses aria-selected=true after switching to Experience", async () => {
    const user = userEvent.setup();
    render(<AboutSection />);

    await user.click(screen.getByRole("tab", { name: /experience/i }));

    expect(screen.getByRole("tab", { name: /my story/i })).toHaveAttribute(
      "aria-selected",
      "false",
    );
  });
});

describe("AboutSection — Key Achievements (always visible)", () => {
  // The achievement text renders as: `✓ Career Pivot: Engineering → Frontend Development`
  // inside a single <span>. getByText(exactString) fails because the emoji and
  // the achievement text are in the same text node separated by whitespace.
  // We use a regex on a distinctive substring instead.

  it("achievements section is visible on the Story tab", () => {
    render(<AboutSection />);
    expect(screen.getByText(/Career Pivot/i)).toBeInTheDocument();
  });

  it("achievements section is visible on the Experience tab", async () => {
    const user = userEvent.setup();
    render(<AboutSection />);

    await user.click(screen.getByRole("tab", { name: /experience/i }));

    expect(screen.getByText(/Career Pivot/i)).toBeInTheDocument();
  });

  it("achievements section is visible on the Beyond tab", async () => {
    const user = userEvent.setup();
    render(<AboutSection />);

    await user.click(screen.getByRole("tab", { name: /beyond/i }));

    expect(screen.getByText(/Career Pivot/i)).toBeInTheDocument();
  });
});
