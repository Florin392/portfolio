/**
 * hooks.test.ts
 * Tests for useScrollTo and useClickOutside.
 *
 * useScrollTo:
 *   Behaviour: calls scrollIntoView with smooth behaviour on a real element.
 *   Behaviour: does nothing when the section id does not exist in the DOM.
 *   Behaviour: returns a stable callback reference across re-renders.
 *
 * useClickOutside:
 *   Behaviour: fires callback when clicking outside the ref element.
 *   Behaviour: does NOT fire callback when clicking inside the ref element.
 *   Behaviour: removes the event listener on unmount (no memory leak).
 */

import { renderHook, act } from "@testing-library/react";
import { useRef } from "react";
import { useScrollTo, useClickOutside } from "@/hooks/hooks";

// ─── useScrollTo ──────────────────────────────────────────────────────────────

describe("useScrollTo", () => {
  it("calls scrollIntoView with smooth behaviour on the target element", () => {
    const scrollIntoView = jest.fn();
    const el = document.createElement("div");
    el.id = "projects";
    el.scrollIntoView = scrollIntoView;
    document.body.appendChild(el);

    const { result } = renderHook(() => useScrollTo());
    act(() => result.current("projects"));

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
    document.body.removeChild(el);
  });

  it("does nothing and does not throw when the section id does not exist", () => {
    const { result } = renderHook(() => useScrollTo());
    expect(() =>
      act(() => result.current("nonexistent-section")),
    ).not.toThrow();
  });

  it("returns the same callback reference across re-renders (stable identity)", () => {
    const { result, rerender } = renderHook(() => useScrollTo());
    const first = result.current;
    rerender();
    expect(result.current).toBe(first);
  });
});

// ─── useClickOutside ─────────────────────────────────────────────────────────

describe("useClickOutside", () => {
  it("fires the callback when mousedown occurs outside the ref element", () => {
    const callback = jest.fn();
    const div = document.createElement("div");
    document.body.appendChild(div);

    const { unmount } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(div as HTMLDivElement);
      useClickOutside(ref, callback);
    });

    act(() => {
      document.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });

    expect(callback).toHaveBeenCalledTimes(1);
    unmount();
    document.body.removeChild(div);
  });

  it("does NOT fire the callback when mousedown occurs inside the ref element", () => {
    const callback = jest.fn();
    const div = document.createElement("div");
    document.body.appendChild(div);

    renderHook(() => {
      const ref = useRef<HTMLDivElement>(div as HTMLDivElement);
      useClickOutside(ref, callback);
    });

    act(() => {
      div.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });

    expect(callback).not.toHaveBeenCalled();
    document.body.removeChild(div);
  });

  it("removes the event listener on unmount — no memory leak", () => {
    const callback = jest.fn();
    const removeEventListener = jest.spyOn(document, "removeEventListener");
    const div = document.createElement("div");

    const { unmount } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(div as HTMLDivElement);
      useClickOutside(ref, callback);
    });

    unmount();

    expect(removeEventListener).toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function),
    );
    removeEventListener.mockRestore();
  });
});
