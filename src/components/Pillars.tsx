import { ArrowRight, Check } from "lucide-react";
import AnimationPlaceholderAgents from "./animations/AnimationPlaceholderAgents";
import AnimationPlaceholderCalendar from "./animations/AnimationPlaceholderCalendar";
import AnimationPlaceholderAnalytics from "./animations/AnimationPlaceholderAnalytics";
import { useCalBooking } from "@/hooks/useCalBooking";

type Pillar = {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  visual: React.ReactNode;
  reverse?: boolean;
};

const pillars: Pillar[] = [
  {
    eyebrow: "AI Agents",
    title: "LinkedIn employees working 24/7",
    description:
      "Agents monitor LinkedIn 24/7, find opportunities, respond to comments, and engage with your ICP.",
    bullets: [
      "Continuous opportunity monitoring",
      "Automatic ICP engagement",
      "Smart comment responses",
      "Hot lead identification",
    ],
    visual: <AnimationPlaceholderAgents />,
  },
  {
    eyebrow: "Smart Calendar",
    title: "Content ready every week",
    description:
      "Your team gets approved content to publish. A calendar with approvals and suggestions.",
    bullets: [
      "New content every week",
      "Team approvals & workflows",
      "Ready-to-use templates",
      "Performance-based suggestions",
    ],
    visual: <AnimationPlaceholderCalendar />,
    reverse: true,
  },
  {
    eyebrow: "Deep Analytics",
    title: "Who engages, not just how many",
    description:
      "See who is engaging, their profiles, behaviors, and follow-up opportunities.",
    bullets: [
      "Complete profile of each engagement",
      "Pattern & trend identification",
      "Lead quality scoring",
      "Follow-up recommendations",
    ],
    visual: <AnimationPlaceholderAnalytics />,
  },
];

export function Pillars() {
  const { openCal } = useCalBooking();
  return (
    <section id="pillars" data-nav-theme="light" className="relative w-full bg-white py-20 md:py-28 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center rounded-full bg-isla-cyan px-3 py-1 text-[12px] font-semibold uppercase tracking-wider text-white">
            Isla's 3 Pillars
          </span>
          <h2 className="font-display mt-5 max-w-2xl text-[40px] font-medium leading-[1.1] text-slate-900" style={{ letterSpacing: "-0.4px" }}>
            Everything you need
            <br />
            to grow on LinkedIn.
          </h2>
        </div>

        {/* Pillar cards */}
        <div className="mt-14 flex flex-col gap-6 md:gap-8">
          {pillars.map((p) => (
            <article
              key={p.title}
              className="grid grid-cols-1 gap-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] md:grid-cols-2 md:gap-12 md:p-8"
            >
              {/* Text */}
              <div
                className={`flex flex-col justify-center ${
                  p.reverse ? "md:order-2" : ""
                }`}
              >
                <span className="text-[12px] font-semibold uppercase tracking-wider text-isla-cyan">
                  {p.eyebrow}
                </span>
                <h3 className="font-display mt-2 text-[24px] font-semibold leading-tight tracking-tight text-slate-900 md:text-[28px]">
                  {p.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-500">
                  {p.description}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {p.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-center gap-2.5 text-[14px] text-slate-700"
                    >
                      <Check
                        className="h-4 w-4 flex-shrink-0 text-isla-cyan"
                        strokeWidth={3}
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual */}
              <div
                className={`flex items-center ${
                  p.reverse ? "md:order-1" : ""
                }`}
              >
                {p.visual}
              </div>
            </article>
          ))}
        </div>

        {/* Final callout — styled like the "B2B Marketing Teams" card */}
        <article
          style={{ ["--notch-card-bg" as never]: "#05313F" }}
          className="group relative mt-8 flex h-full min-h-[280px] flex-col rounded-2xl bg-[#05313F] p-6 pb-28 text-white md:p-8 md:pb-8"
        >
          {/* Top row: tag + meta */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 rounded-md bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
              <span className="h-2 w-2 rounded-sm bg-isla-cyan" />
              Operator
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/60">
              INCLUDED
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display mt-6 text-[22px] font-medium leading-[1.2] tracking-tight text-white md:text-[28px]">
            A dedicated operator included
          </h3>

          {/* Description */}
          <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-white/75">
            A dedicated strategist sets up your agents, plans content, and
            continuously optimizes performance. You just review, approve, and
            publish.
          </p>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Notch cut-out anchored to the card's bottom-right corner */}
          <div
            className="card-notch"
            style={{ ["--notch-w" as never]: "180px", ["--notch-h" as never]: "72px" }}
          />

          {/* CTA button — opens Cal embed. Sized to sit symmetrically inside the 180x72 notch with 8px breathing room on every side. */}
          <button
            type="button"
            onClick={openCal}
            aria-label="Book a Call"
            style={{ width: "164px", height: "56px" }}
            className="absolute bottom-2 right-2 inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl border-4 border-white bg-isla-cyan text-sm font-semibold text-white cursor-pointer transition-colors duration-300 group-hover:bg-[#05313F] group-hover:text-white"
          >
            <span className="pointer-events-none">Book a Call</span>
            <ArrowRight className="arrow-slide pointer-events-none h-5 w-5" strokeWidth={2.25} />
          </button>
        </article>
      </div>
    </section>
  );
}

export default Pillars;
