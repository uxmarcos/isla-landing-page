import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "isla-theme";

function readTheme(): Theme {
  if (typeof document === "undefined") return "light";
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "dark" || stored === "light") return stored;
  } catch {
    /* ignore */
  }
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* ignore */
  }
}

/**
 * Class-based theme applied on <html>. The initial class is set by an inline
 * script in the document head, so there is no flash before hydration.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    // The stored preference is the source of truth: in production the inline
    // bootstrap script can run after hydration, so the <html> class may not be
    // set yet on first effect. Apply it here too, then stay in sync with it.
    const initial = readTheme();
    document.documentElement.classList.toggle("dark", initial === "dark");
    setThemeState(initial);

    const observer = new MutationObserver(() => {
      setThemeState(
        document.documentElement.classList.contains("dark") ? "dark" : "light",
      );
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const setTheme = useCallback((next: Theme) => {
    applyTheme(next);
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback((origin?: { x: number; y: number }) => {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";

    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> };
    };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!doc.startViewTransition || reduced || !origin) {
      applyTheme(next);
      setThemeState(next);
      return;
    }

    const transition = doc.startViewTransition(() => {
      applyTheme(next);
      setThemeState(next);
    });

    transition.ready.then(() => {
      const { x, y } = origin;
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      );
      document.documentElement.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
        },
        {
          duration: 620,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  }, []);

  return { theme, setTheme, toggleTheme, isDark: theme === "dark" };
}

export default useTheme;
