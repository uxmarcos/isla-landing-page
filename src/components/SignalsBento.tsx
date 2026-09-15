import { useEffect, useRef, useState } from "react";
import { ChevronRight, Check, TrendingUp, Users, Sparkles, Eye, Heart, UserPlus, MessageCircle, Share2 } from "lucide-react";
import signalsBg from "@/assets/signals-bg.png";

/* ----------------------- Hooks ----------------------- */
function useInView<T extends HTMLElement>(opts?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2, ...opts },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function useLoopTick(intervalMs: number, steps: number, enabled: boolean) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    const id = setInterval(() => setTick((t) => (t + 1) % steps), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, steps, enabled]);
  return tick;
}

/* ----------------------- Card shell ----------------------- */
function BentoCard({
  className = "",
  children,
  delay = 0,
}: {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        opacity: inView ? 1 : 0,
      }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 transition-[transform,border-color,box-shadow,opacity] duration-200 ease-out hover:-translate-y-0.5 hover:border-isla-cyan/40 hover:shadow-[0_0_60px_-15px_rgba(0,191,255,0.4)] sm:p-7 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-isla-cyan/[0.08] via-transparent to-transparent" />
      </div>
      <div className="relative flex h-full flex-col">{children}</div>
    </div>
  );
}

function CardHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-5">
      <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-isla-cyan">
        {eyebrow}
      </div>
      <h3 className="text-[20px] font-semibold leading-snug tracking-tight text-white sm:text-[22px]">
        {title}
      </h3>
      {description && (
        <p className="mt-2 text-[14px] leading-relaxed text-white/60">{description}</p>
      )}
    </div>
  );
}

/* ----------------------- Lead Intelligence (looping) ----------------------- */
const leads = [
  { initials: "LM", name: "Lucas M.", role: "Founder · SaaS", score: 94 },
  { initials: "AP", name: "Ana P.", role: "CEO · B2B", score: 88 },
  { initials: "JS", name: "João S.", role: "CTO · Tech", score: 76 },
];

function LeadListSimulation() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const STEP_MS = 1400;
  const TOTAL_STEPS = leads.length + 2;
  const tick = useLoopTick(STEP_MS, TOTAL_STEPS, inView);

  return (
    <div ref={ref} className="mt-auto rounded-xl border border-white/[0.06] bg-black/30 p-4">
      <div className="mb-3 flex items-center gap-2 text-[12px] text-white/60">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-isla-cyan opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-isla-cyan" />
        </span>
        Scanning new ICP matches…
      </div>
      <div className="space-y-2">
        {leads.map((l, i) => {
          const revealed = inView && tick !== 0 && tick > i;
          return (
            <div
              key={l.name}
              className="flex h-[52px] items-center justify-between rounded-lg border bg-white/[0.02] px-3 transition-all duration-300"
              style={{
                opacity: revealed ? 1 : 0.15,
                borderColor: revealed ? "rgba(0,191,255,0.25)" : "rgba(255,255,255,0.05)",
                transform: revealed ? "translateX(0)" : "translateX(-6px)",
              }}
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-isla-cyan/15 text-[11px] font-semibold text-isla-cyan ring-1 ring-isla-cyan/30">
                  {l.initials}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-[13px] font-medium text-white">{l.name}</div>
                  <div className="truncate text-[11px] text-white/50">{l.role}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="rounded-md border border-isla-cyan/30 bg-isla-cyan/10 px-2 py-0.5 text-[11px] font-semibold text-isla-cyan transition-opacity duration-300"
                  style={{ opacity: revealed ? 1 : 0 }}
                >
                  ICP {l.score}
                </span>
                <ChevronRight className="h-4 w-4 text-white/40" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ----------------------- Engagement Timeline ----------------------- */
const events = [
  { label: "Viewed your profile", when: "3 weeks ago", icon: <Eye className="h-3.5 w-3.5 text-white" /> },
  { label: "Liked your post", when: "12 days ago", icon: <Heart className="h-3.5 w-3.5 text-white" /> },
  { label: "Followed you", when: "10 days ago", icon: <UserPlus className="h-3.5 w-3.5 text-white" /> },
  { label: "Commented your post", when: "7 days ago", icon: <MessageCircle className="h-3.5 w-3.5 text-white" /> },
  { label: "Shared your post", when: "Today", icon: <Share2 className="h-3.5 w-3.5 text-white" /> },
];

const ISLA_INSIGHT =
  "Isla detected strong buying signals from Maria — repeated engagement over weeks suggests this is the right moment to reach out.";

function EngagementTimeline() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const tick = useLoopTick(1100, events.length, inView);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    let cancelled = false;
    const start = setTimeout(function step() {
      if (cancelled) return;
      i++;
      setTyped(ISLA_INSIGHT.slice(0, i));
      if (i < ISLA_INSIGHT.length) setTimeout(step, 22);
    }, 600);
    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, [inView]);

  return (
    <div ref={ref} className="mt-3 flex flex-col gap-3">
      <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-black/30 p-3">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-isla-cyan/15 text-[12px] font-semibold text-isla-cyan ring-1 ring-isla-cyan/30">
          MP
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-medium text-white">Maria Pereira</div>
          <div className="text-[11px] text-white/50">VP Marketing · Series A</div>
        </div>
        <span className="rounded-md border border-isla-cyan/30 bg-isla-cyan/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-isla-cyan">
          Warm
        </span>
      </div>
      <div className="flex-1">
        <div className="mb-2 flex items-center justify-between">
          <div className="text-[12px] font-medium text-isla-cyan">Engagement History</div>
          <div className="text-[11px] text-white/40">5 actions</div>
        </div>
        <div className="space-y-2">
          {events.map((e, i) => {
            const active = inView && tick === i;
            return (
              <div
                key={e.label}
                className="flex h-[46px] items-center gap-3 rounded-lg border px-3 transition-all duration-300"
                style={{
                  borderColor: active ? "rgba(0,191,255,0.5)" : "rgba(255,255,255,0.05)",
                  background: active ? "rgba(0,191,255,0.07)" : "rgba(255,255,255,0.02)",
                  boxShadow: active ? "0 0 24px -8px rgba(0,191,255,0.6)" : "none",
                }}
              >
                <div
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/[0.04] text-[12px] transition-colors duration-300"
                  style={{
                    background: active ? "rgba(0,191,255,0.15)" : "rgba(255,255,255,0.04)",
                  }}
                >
                  {e.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-medium text-white">{e.label}</div>
                </div>
                <div className="text-[11px] text-white/50">{e.when}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex items-start gap-2 rounded-lg border border-isla-cyan/20 bg-isla-cyan/[0.04] px-3 py-2.5">
        <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-isla-cyan" />
        <p className="text-[11px] italic leading-relaxed text-white/60">
          {typed}
          {typed.length < ISLA_INSIGHT.length && (
            <span className="ml-0.5 inline-block h-3 w-[1.5px] translate-y-[2px] animate-pulse bg-isla-cyan/70 align-middle" />
          )}
        </p>
      </div>
    </div>
  );
}

/* ----------------------- Pipeline (one-shot intent meter) ----------------------- */
function PipelineSimulation() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    let start = 0;
    const TARGET = 92;
    const RISE = 1800;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const t = ts - start;
      if (t < RISE) {
        const p = t / RISE;
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(eased * TARGET));
        raf = requestAnimationFrame(tick);
      } else {
        setVal(TARGET);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  return (
    <div ref={ref} className="mt-auto rounded-xl border border-white/[0.06] bg-black/30 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[12px] text-white/60">
          <Users className="h-3.5 w-3.5 text-isla-cyan" />
          Intent score
        </div>
        <div className="text-[14px] font-semibold text-white tabular-nums">
          {val}
          <span className="text-white/40">/100</span>
        </div>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-isla-cyan to-isla-cyan/60 shadow-[0_0_12px_rgba(0,191,255,0.6)]"
          style={{ width: `${val}%`, transition: "width 60ms linear" }}
        />
      </div>
      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-white/50">
        <Sparkles className="h-3 w-3 text-isla-cyan" />
        High intent — engaged 4× this week
      </div>
    </div>
  );
}

/* ----------------------- Growth (one-shot count up) ----------------------- */
function GrowthSimulation() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    let start = 0;
    const TARGET = 8;
    const RISE = 1500;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const t = ts - start;
      if (t < RISE) {
        const p = t / RISE;
        const eased = 1 - Math.pow(1 - p, 3);
        setN(Math.round(eased * TARGET));
        raf = requestAnimationFrame(tick);
      } else {
        setN(TARGET);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  return (
    <div ref={ref} className="mt-auto rounded-xl border border-white/[0.06] bg-black/30 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[12px] text-white/60">
          <TrendingUp className="h-3.5 w-3.5 text-isla-cyan" />
          New ICP profiles
        </div>
        <div className="text-[11px] text-white/40">this week</div>
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <div className="font-display text-[40px] font-semibold leading-none text-white tabular-nums">
          {n}
        </div>
        <div className="rounded-md border border-isla-cyan/30 bg-isla-cyan/10 px-1.5 py-0.5 text-[10px] font-semibold text-isla-cyan tabular-nums">
          +{n}
        </div>
      </div>
      <div className="mt-3 flex h-8 items-end gap-1">
        {[3, 5, 2, 6, 4, 7, n].map((v, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm bg-gradient-to-t from-isla-cyan/40 to-isla-cyan/80 transition-all duration-500"
            style={{ height: `${(v / 8) * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}

/* ----------------------- Team activity (looping checkboxes) ----------------------- */
const baseTasks = [
  "Draft: Q4 Product Launch",
  "Review: Competitor Analysis",
  "Publish: Team Milestone Post",
];

function TeamActivitySimulation() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const tick = useLoopTick(1200, baseTasks.length + 2, inView);
  const done = Math.min(tick, baseTasks.length);

  return (
    <div ref={ref} className="mt-auto rounded-xl border border-white/[0.06] bg-black/30 p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-[12px] text-white/60">Team Activity</div>
        <div className="text-[12px] font-semibold text-isla-cyan tabular-nums">
          {done}/{baseTasks.length} Complete
        </div>
      </div>

      <div className="mb-4 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full bg-gradient-to-r from-isla-cyan to-isla-cyan/60 transition-all duration-500 ease-out"
          style={{ width: `${(done / baseTasks.length) * 100}%` }}
        />
      </div>

      <div className="space-y-2">
        {baseTasks.map((label, i) => {
          const isDone = i < done;
          return (
            <div
              key={label}
              className="flex h-[48px] items-center gap-3 rounded-lg border border-white/[0.05] bg-white/[0.02] px-3"
            >
              <span
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                  isDone
                    ? "border-isla-cyan bg-isla-cyan text-white"
                    : "border-white/20 bg-transparent"
                }`}
              >
                <Check
                  className="h-3 w-3 transition-opacity duration-300"
                  strokeWidth={3}
                  style={{ opacity: isDone ? 1 : 0 }}
                />
              </span>
              <span
                className={`text-[13px] transition-all duration-300 ${
                  isDone ? "text-white/40 line-through" : "text-white"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ----------------------- Section ----------------------- */
export function SignalsBento() {
  return (
    <section
      id="features"
      data-nav-theme="dark"
      className="relative overflow-hidden bg-[#05070b] py-24 sm:py-32 scroll-mt-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${signalsBg})` }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6">
        <div className="mb-14 max-w-3xl">
          <div className="mb-6 inline-flex items-center rounded-full bg-isla-cyan px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_0_30px_rgba(0,191,255,0.4)]">
            Everything you need to grow
          </div>
          <h2 className="font-display text-[40px] font-medium leading-[1.05] text-white" style={{ letterSpacing: "-0.4px" }}>
            More than alerts.
            <br />
            <span className="text-isla-cyan">A full growth system.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          <BentoCard className="md:col-span-2" delay={0}>
            <CardHeader
              eyebrow="Lead Intelligence"
              title="Your next customer just liked your post."
              description="“12 people liked your post. 4 match your ICP — B2B founders, 11–50 employees.”"
            />
            <LeadListSimulation />
          </BentoCard>

          <BentoCard className="md:row-span-2" delay={80}>
            <CardHeader
              eyebrow="Warm Leads"
              title="Someone keeps coming back."
              description="“This VP of Marketing commented on 3 of your posts this month. That's a warm lead.”"
            />
            <EngagementTimeline />
          </BentoCard>

          <BentoCard delay={120}>
            <CardHeader
              eyebrow="Pipeline"
              title="Know exactly who's worth your time."
              description="“Engaged with your last 4 posts. High intent.”"
            />
            <PipelineSimulation />
          </BentoCard>

          <BentoCard delay={160}>
            <CardHeader
              eyebrow="Growth"
              title="The right people are out there."
              description="“8 profiles match your ICP and aren't in your network yet.”"
            />
            <GrowthSimulation />
          </BentoCard>

          <BentoCard className="md:col-span-3" delay={200}>
            <CardHeader
              eyebrow="For Teams"
              title="Monday morning. Everything you need."
              description="“3 posts drafted, 2 lead opportunities flagged, 1 amplification queued.”"
            />
            <TeamActivitySimulation />
          </BentoCard>
        </div>
      </div>
    </section>
  );
}

export default SignalsBento;
