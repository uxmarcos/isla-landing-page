import { Star } from "lucide-react";
import type { Testimonial } from "./people";
import { PEOPLE } from "./people";
import { useLocale } from "@/hooks/useLocale";

export function TestimonialCard({ t }: { t: Testimonial }) {
  const { dict } = useLocale();
  const person = PEOPLE.find((p) => p.name === t.name);
  const tag = dict.testimonials.tags[t.tag as keyof typeof dict.testimonials.tags] ?? t.tag;

  return (
    <div data-card className="group relative flex h-auto w-[360px] shrink-0 snap-start flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-isla-cyan/40 hover:shadow-[0_20px_60px_-20px_rgba(0,191,255,0.35)] md:w-[400px] dark:border-[#2C2C2C] dark:bg-[#111111] dark:shadow-none">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-isla-cyan/20 via-transparent to-transparent" />
      </div>

      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="rounded-full border border-isla-cyan/30 bg-isla-cyan/10 px-3 py-1 text-[11px] font-medium text-isla-cyan">
            {tag}
          </span>
        </div>

        <p className="text-[15px] leading-relaxed text-slate-700 dark:text-white/65">"{t.quote}"</p>
      </div>

      <div className="relative mt-6 flex items-center gap-3 border-t border-slate-100 pt-4 dark:border-[#2C2C2C]">
        {person ? (
          <img
            src={person.image}
            alt={t.name}
            draggable={false}
            className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-slate-200 dark:ring-[#2C2C2C]"
          />
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-isla-cyan text-[12px] font-semibold text-white">
            {t.initials}
          </div>
        )}
        <div className="min-w-0">
          <div className="truncate text-[14px] font-semibold text-slate-900 dark:text-white">
            {t.name}
          </div>
          <div className="truncate text-[12px] text-slate-500 dark:text-white/45">{t.role}</div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
