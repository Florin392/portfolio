/**
 * utils.test.ts
 * Tests for the cn() class-merging utility.
 *
 * Behaviour: merges class names correctly.
 * Behaviour: last Tailwind class wins on conflict.
 * Edge case: falsy values are ignored gracefully.
 */

import { cn } from "@/utils/utils";

describe("cn", () => {
  it("merges two class names into a single string", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });

  it("resolves Tailwind conflicts — last value wins", () => {
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("ignores false conditional classes", () => {
    expect(cn("base", false && "ignored", "included")).toBe("base included");
  });

  it("ignores undefined and null without throwing", () => {
    expect(cn("a", undefined, null)).toBe("a");
  });

  it("returns an empty string when called with no arguments", () => {
    expect(cn()).toBe("");
  });
});
