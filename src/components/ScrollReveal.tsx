import { useEffect } from "react";

/**
 * Adds a subtle fade/rise reveal to section headings and lead paragraphs
 * as they scroll into view. Purely presentational, no layout impact.
 */
export function ScrollReveal() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );

    const nodes = document.querySelectorAll<HTMLElement>(
      "section h2, section > div > p, [data-reveal]",
    );
    nodes.forEach((node, i) => {
      node.classList.add("reveal");
      node.style.transitionDelay = `${Math.min(i % 3, 2) * 70}ms`;
      observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}

export default ScrollReveal;