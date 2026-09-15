import { ArrowRight } from "lucide-react";
import { getStartedProps } from "@/hooks/useCalBooking";

type Variant = "light" | "mid" | "dark";

type Card = {
  tag: string;
  index: string;
  title: string;
  description: string;
  variant: Variant;
};

const cards: Card[] = [
  {
    tag: "Founders",
    index: "PROFILE 01",
    title: "Founders building in public",
    description:
      "You're building something big and want the market to see it. Isla engages your ICP 24/7 while you focus on the product.",
    variant: "light",
  },
  {
    tag: "Teams",
    index: "PROFILE 02",
    title: "B2B marketing teams",
    description:
      "A shared calendar with content ready every week. Approvals, analytics and a dedicated person to execute it all.",
    variant: "mid",
  },
  {
    tag: "Duos",
    index: "PROFILE 03",
    title: "Founder + first hire",
    description:
      "Isla is the third teammate: it monitors, runs the calendar and shows analytics. You just approve and reap the results.",
    variant: "dark",
  },
];

const styles: Record<
  Variant,
  {
    card: string;
    tagBg: string;
    tagText: string;
    tagDot: string;
    meta: string;
    title: string;
    description: string;
    footerLabel: string;
    notchFill: string;
    notchHover: string;
    notchBg: string;
  }
> = {
  light: {
    card: "bg-[#F2F9FD] text-slate-900 dark:bg-[#111111] dark:text-white",
    tagBg: "bg-white/60 dark:bg-white/10",
    tagText: "text-slate-700 dark:text-white",
    tagDot: "bg-isla-cyan",
    meta: "text-slate-500 dark:text-white/45",
    title: "text-slate-900 dark:text-white",
    description: "text-slate-600 dark:text-white/65",
    footerLabel: "text-slate-600 dark:text-white/65",
    notchFill: "bg-isla-cyan text-white",
    notchHover: "group-hover:bg-[#F2F9FD] group-hover:text-slate-900 dark:group-hover:bg-[#111111] dark:group-hover:text-white",
    notchBg: "bg-white dark:bg-[#0A0A0A]",
  },
  mid: {
    card: "bg-[#015268] text-white",
    tagBg: "bg-white/10",
    tagText: "text-white",
    tagDot: "bg-isla-cyan",
    meta: "text-white/60",
    title: "text-white",
    description: "text-white/75",
    footerLabel: "text-white/75",
    notchFill: "bg-isla-cyan text-white",
    notchHover: "group-hover:bg-[#015268] group-hover:text-white",
    notchBg: "bg-white dark:bg-[#0A0A0A]",
  },
  dark: {
    card: "bg-[#05313F] text-white",
    tagBg: "bg-white/10",
    tagText: "text-white",
    tagDot: "bg-isla-cyan",
    meta: "text-white/50",
    title: "text-white",
    description: "text-white/70",
    footerLabel: "text-white/70",
    notchFill: "bg-isla-cyan text-white",
    notchHover: "group-hover:bg-[#05313F] group-hover:text-white",
    notchBg: "bg-white dark:bg-[#0A0A0A]",
  },
};

export function WhoItsFor() {
  
  return (
    <>
    <style>{`
      .dark .card-notch { background: #0A0A0A; }
      .dark .card-notch::before,
      .dark .card-notch::after { background: var(--notch-card-bg-dark, var(--notch-card-bg)); }
    `}</style>
    <section
      id="for-teams"
      data-nav-theme="light"
      className="relative w-full border-t border-[#D3D3D3] bg-white py-20 md:py-28 scroll-mt-20 dark:border-[#2C2C2C] dark:bg-[#0A0A0A]"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="flex flex-col items-start text-left">
          <span className="inline-flex items-center rounded-full bg-isla-cyan px-3 py-1 text-[12px] font-semibold uppercase tracking-wider text-white">
            Who it's for
          </span>
          <h2
            className="font-display mt-5 max-w-3xl text-[40px] font-medium leading-[1.1] text-slate-900 md:text-[56px] dark:text-white"
            style={{ letterSpacing: "-0.5px" }}
          >
            From solo founders
            <br />
            to B2B marketing teams.
          </h2>
        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {cards.map((c) => {
            const s = styles[c.variant];
            const bgHex =
              c.variant === "light" ? "#F2F9FD" : c.variant === "mid" ? "#015268" : "#05313F";
            const bgHexDark = c.variant === "light" ? "#111111" : bgHex;
            return (
              <article
                key={c.title}
                style={{
                  ["--notch-card-bg" as never]: bgHex,
                  ["--notch-card-bg-dark" as never]: bgHexDark,
                }}
                className={`group relative flex h-full min-h-[360px] flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 ${s.card}`}
              >
                {/* Top row: tag + meta */}
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-2 rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${s.tagBg} ${s.tagText}`}
                  >
                    <span className={`h-2 w-2 rounded-sm ${s.tagDot}`} />
                    {c.tag}
                  </span>
                  <span
                    className={`font-mono text-[11px] uppercase tracking-[0.18em] ${s.meta}`}
                  >
                    {c.index}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className={`font-display mt-6 text-[22px] font-medium leading-[1.2] tracking-tight md:text-[24px] ${s.title}`}
                >
                  <span className="hover-underline">{c.title}</span>
                </h3>

                {/* Description */}
                <p
                  className={`mt-3 text-[14.5px] leading-relaxed ${s.description}`}
                >
                  <span className="hover-underline hover-underline-delay">
                    {c.description}
                  </span>
                </p>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Footer label */}
                <div className="mt-8">
                  <span
                    className={`font-mono text-[11px] uppercase tracking-[0.2em] ${s.footerLabel}`}
                  >
                    Learn more
                  </span>
                </div>

                {/* Notch cut-out anchored to the card's bottom-right corner */}
                <div className="card-notch" />

                {/* Arrow CTA — get started */}
                <a
                  {...getStartedProps}
                  aria-label="Get Started"
                  className={`absolute bottom-2 right-2 flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border-4 border-white cursor-pointer transition-colors duration-300 dark:border-[#0A0A0A] ${s.notchFill} ${s.notchHover}`}
                >
                  <ArrowRight className="arrow-slide pointer-events-none h-5 w-5" strokeWidth={2.25} />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
    </>
  );
}

export default WhoItsFor;
