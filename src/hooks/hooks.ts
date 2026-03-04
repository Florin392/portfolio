import { RefObject, useCallback, useEffect } from "react";

export const useScrollTo = () => {
  return useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
};

/**
 * Fires `callback` when a mousedown event occurs outside `ref`.
 * Wrap `callback` in useCallback to prevent unnecessary effect re-runs.
 */

export const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  callback: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, callback]);
};
