/**
 * FABMenu.test.tsx
 *
 * Behaviour: menu items are hidden on first render.
 * Behaviour: toggle opens the menu showing all 5 nav items.
 * Behaviour: toggle again closes the menu.
 * Behaviour: clicking a nav item calls scrollTo with the correct section id.
 * Behaviour: menu closes after a nav item is clicked.
 * Integration: the callback registered with useClickOutside closes the menu.
 */

import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

const mockScrollTo = jest.fn();
const mockUseClickOutside = jest.fn();

jest.mock("@/hooks/hooks", () => ({
  useScrollTo: () => mockScrollTo,
  useClickOutside: (ref: React.RefObject<HTMLElement>, cb: () => void) =>
    mockUseClickOutside(ref, cb),
}));

import { FABMenu } from "@/components/FABMenu";

beforeEach(() => {
  mockScrollTo.mockClear();
  mockUseClickOutside.mockClear();
});

describe("FABMenu — toggle behaviour", () => {
  it("menu items are hidden on first render", () => {
    render(<FABMenu />);
    expect(
      screen.queryByRole("button", { name: /home/i }),
    ).not.toBeInTheDocument();
  });

  it("clicking the toggle reveals all 5 nav items", async () => {
    const user = userEvent.setup();
    render(<FABMenu />);

    await user.click(screen.getByRole("button", { name: /navigation menu/i }));

    expect(screen.getByRole("button", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /skills/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /projects/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /contact/i }),
    ).toBeInTheDocument();
  });

  it("clicking the toggle a second time hides the nav items", async () => {
    const user = userEvent.setup();
    render(<FABMenu />);

    const toggle = screen.getByRole("button", { name: /navigation menu/i });
    await user.click(toggle);
    await user.click(toggle);

    expect(
      screen.queryByRole("button", { name: /home/i }),
    ).not.toBeInTheDocument();
  });
});

describe("FABMenu — navigation behaviour", () => {
  it("clicking 'Projects' calls scrollTo with id 'projects'", async () => {
    const user = userEvent.setup();
    render(<FABMenu />);

    await user.click(screen.getByRole("button", { name: /navigation menu/i }));
    await user.click(screen.getByRole("button", { name: /projects/i }));

    expect(mockScrollTo).toHaveBeenCalledWith("projects");
  });

  it("clicking 'About' calls scrollTo with id 'about'", async () => {
    const user = userEvent.setup();
    render(<FABMenu />);

    await user.click(screen.getByRole("button", { name: /navigation menu/i }));
    await user.click(screen.getByRole("button", { name: /about/i }));

    expect(mockScrollTo).toHaveBeenCalledWith("about");
  });

  it("menu closes after a nav item is clicked", async () => {
    const user = userEvent.setup();
    render(<FABMenu />);

    await user.click(screen.getByRole("button", { name: /navigation menu/i }));
    await user.click(screen.getByRole("button", { name: /contact/i }));

    expect(
      screen.queryByRole("button", { name: /contact/i }),
    ).not.toBeInTheDocument();
  });
});

describe("FABMenu — outside click integration", () => {
  it("the callback registered with useClickOutside closes the menu when invoked", async () => {
    const user = userEvent.setup();
    render(<FABMenu />);

    // Open the menu first
    await user.click(screen.getByRole("button", { name: /navigation menu/i }));
    expect(screen.getByRole("button", { name: /home/i })).toBeInTheDocument();

    // Retrieve the close callback the component registered with useClickOutside
    const [, closeCallback] = mockUseClickOutside.mock.calls[0];

    // Wrap the state update in act() to avoid the "not wrapped in act" warning
    act(() => {
      closeCallback();
    });

    expect(
      screen.queryByRole("button", { name: /home/i }),
    ).not.toBeInTheDocument();
  });
});
