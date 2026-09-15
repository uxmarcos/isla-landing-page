import { useEffect, useRef, useState } from "react";
import { PEOPLE } from "./people";
import { useInView } from "@/hooks/useInView";

// Curved auto-scrolling carousel of portraits.
// Cards translate horizontally on a loop; each card's rotateY/translateZ
// is computed from its distance to the viewport center to fake a subtle arc.

const CARD_W = 200;
const CARD_H = 280;
const GAP = 28;
const STEP = CARD_W + GAP;
const SPEED = 28; // px per second — slow drift

export function PeopleCluster() {
  // Triple the list so we can loop seamlessly
  const visiblePeople = PEOPLE.filter((p) => !p.hidden);
  const loop = [...visiblePeople, ...visiblePeople, ...visiblePeople];
  const trackRef = useRef<HTMLDivElement | null>(null);
  const { ref: viewportRef, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const [, force] = useState(0);

  // One full set width — wrap point
  const setWidth = visiblePeople.length * STEP;

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    let last = performance.now();
    // Start centered on the middle copy
    offsetRef.current = -setWidth;

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!pausedRef.current) offsetRef.current -= SPEED * dt;
      if (offsetRef.current <= -setWidth * 2) {
        offsetRef.current += setWidth;
      }
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
      }
      // Recompute curve transforms for each card
      updateCurve();
      raf = requestAnimationFrame(tick);
    };

    const updateCurve = () => {
      const vp = viewportRef.current;
      if (!vp) return;
      const center = vp.clientWidth / 2;
      const cards = vp.querySelectorAll<HTMLElement>("[data-curve-card]");
      cards.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const vpRect = vp.getBoundingClientRect();
        const cardCenter = rect.left - vpRect.left + rect.width / 2;
        const dist = (cardCenter - center) / center; // -1..1
        const clamped = Math.max(-1.2, Math.min(1.2, dist));
        const rotY = clamped * -22; // degrees
        const tz = -Math.abs(clamped) * 80; // push sides back
        const ty = Math.abs(clamped) * 14; // slight dip on edges
        const inner = el.querySelector<HTMLElement>("[data-curve-inner]");
        if (inner) {
          inner.style.transform = `translateY(${ty}px) translateZ(${tz}px) rotateY(${rotY}deg)`;
        }
        el.style.opacity = String(1 - Math.abs(clamped) * 0.35);
      });
      force((n) => n + 1);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [setWidth, inView]);

  return (
    <div
      ref={viewportRef}
      onPointerEnter={() => { pausedRef.current = true; }}
      onPointerLeave={() => { pausedRef.current = false; }}
      className="relative mx-auto w-full max-w-[1400px]"
      style={{ perspective: "1200px", height: CARD_H + 60 }}
    >
      <div
        ref={trackRef}
        className="absolute left-1/2 top-1/2 flex -translate-y-1/2 will-change-transform"
        style={{
          gap: `${GAP}px`,
          transformStyle: "preserve-3d",
        }}
      >
        {loop.map((p, i) => (
          <a
            key={`${p.name}-${i}`}
            data-curve-card
            href={p.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block shrink-0 cursor-pointer"
            style={{
              width: CARD_W,
              height: CARD_H,
              transition: "opacity 0.3s ease",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              data-curve-inner
              className="relative h-full w-full overflow-hidden rounded-2xl shadow-[0_18px_50px_-24px_rgba(15,23,42,0.35)] ring-1 ring-slate-200 transition-[box-shadow,transform,outline] duration-300 ease-out will-change-transform group-hover:scale-105 group-hover:shadow-[0_25px_70px_-10px_rgba(0,191,255,0.55)] group-hover:ring-isla-cyan/50 dark:shadow-none dark:ring-[#2C2C2C]"
              style={{ backfaceVisibility: "hidden" }}
            >
              <div
                className="h-full w-full bg-neutral-900"
                style={{
                  backgroundImage: `url(${p.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2 rounded-md bg-white/85 px-2 py-1 backdrop-blur-sm dark:bg-[#111111]/85">
                <span className="truncate text-[12px] font-medium text-slate-900 dark:text-white">
                  {p.name}
                </span>
                <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default PeopleCluster;
