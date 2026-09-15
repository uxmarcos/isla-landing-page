import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCard from "./TestimonialCard";
import { TESTIMONIALS } from "./people";

export function TestimonialsScroller() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isDown, setIsDown] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const moved = useRef(0);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!ref.current) return;
    setIsDown(true);
    moved.current = 0;
    startX.current = e.pageX - ref.current.offsetLeft;
    scrollLeft.current = ref.current.scrollLeft;
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    setIsDown(false);
    (e.target as Element).releasePointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDown || !ref.current) return;
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX.current) * 1.4;
    moved.current = Math.abs(walk);
    ref.current.scrollLeft = scrollLeft.current - walk;
  };

  const scrollByCards = (dir: 1 | -1) => {
    if (!ref.current) return;
    const card = ref.current.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 20 : 400;
    ref.current.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onPointerMove={onPointerMove}
        onClickCapture={(e) => {
          if (moved.current > 6) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        className={`flex snap-x snap-mandatory items-stretch gap-5 overflow-x-auto scroll-smooth px-6 pb-6 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden select-none touch-pan-y ${
          isDown ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        {TESTIMONIALS.filter((t) => !t.hidden).map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
        <div className="w-2 shrink-0" />
      </div>

      {/* Navigation buttons */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => scrollByCards(-1)}
          aria-label="Previous testimonials"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-all hover:border-isla-cyan/60 hover:bg-isla-cyan/10 hover:text-isla-cyan dark:border-[#2C2C2C] dark:bg-[#111111] dark:text-white/65"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCards(1)}
          aria-label="Next testimonials"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-all hover:border-isla-cyan/60 hover:bg-isla-cyan/10 hover:text-isla-cyan dark:border-[#2C2C2C] dark:bg-[#111111] dark:text-white/65"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default TestimonialsScroller;
