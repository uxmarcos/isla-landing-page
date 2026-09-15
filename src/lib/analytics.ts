import { useEffect, useRef } from "react";

type Props = Record<string, unknown>;

declare global {
  interface Window {
    __ISLA_NOTRACK?: boolean;
    posthog?: { capture: (event: string, props?: Props) => void };
  }
}

export function isTrackingDisabled(): boolean {
  if (typeof window === "undefined") return true;
  return window.__ISLA_NOTRACK === true;
}

export function track(event: string, props?: Props): void {
  if (isTrackingDisabled()) return;
  try {
    window.posthog?.capture(event, props);
  } catch {
    // no-op
  }
}

/** Fires scroll_depth at 25/50/75/100 once per page load. */
export function useScrollDepth(): void {
  const fired = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (isTrackingDisabled()) return;

    const milestones = [25, 50, 75, 100];
    let rafPending = false;

    const onScroll = () => {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(() => {
        rafPending = false;
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        if (max <= 0) return;
        const pct = Math.min(100, Math.round((window.scrollY / max) * 100));
        for (const m of milestones) {
          if (pct >= m && !fired.current.has(m)) {
            fired.current.add(m);
            track("scroll_depth", { percent: m });
          }
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

/** Fires section_viewed once when the element scrolls into view (>=50%). */
export function useSectionTracking(name: string) {
  const ref = useRef<HTMLElement | null>(null);
  const fired = useRef(false);

  useEffect(() => {
    if (isTrackingDisabled()) return;
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !fired.current) {
            fired.current = true;
            track("section_viewed", { section: name });
            obs.disconnect();
          }
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [name]);

  return ref;
}
