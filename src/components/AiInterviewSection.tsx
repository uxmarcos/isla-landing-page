import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight, AudioLines, Keyboard, Mic, PhoneOff } from "lucide-react";
import SlideLabel from "@/components/ui/SlideLabel";
import ProductShowcase from "@/components/ui/ProductShowcase";
import { AnimatePresence, motion } from "framer-motion";
import { getStartedProps } from "@/hooks/useCalBooking";

/**
 * Mobile-only visual for this section. Swap this for an imported image
 * (e.g. `import mockup from "@/assets/interview-mobile.png"`) when ready.
 */
function IslaMark() {
  return (
    <svg viewBox="0 0 30 28" className="h-16 w-16" fill="none" aria-hidden>
      <path
        d="M14.9736 2.81738C17.2662 2.73219 19.523 3.08333 20.7949 5.23535C21.145 5.98589 21.6834 6.33338 22.0713 6.58398C22.2102 6.67375 22.3301 6.75105 22.415 6.83008C22.5636 6.97235 23.0007 7.20894 23.4697 7.46191C24.0771 7.78951 24.7376 8.14531 24.8916 8.36328C26.1783 10.1671 26.3529 11.2357 26.3018 13.3965C25.8798 15.4759 24.1783 20.401 20.7471 23.4658C18.664 24.6185 16.8785 25.4894 14.5049 25.3076C14.4396 25.3032 14.3735 25.2992 14.3076 25.2949C13.8423 25.2646 13.3642 25.2334 12.9102 25.1553C12.5182 25.0968 12.1365 24.9993 11.7549 24.9023C11.5345 24.8463 11.3137 24.7909 11.0908 24.7422C10.9595 24.7135 10.8299 24.6849 10.7021 24.6572C8.68668 24.2211 7.09885 23.8776 5.45996 22.4092C5.15342 22.1345 4.91784 21.8122 4.67773 21.4834C4.65123 21.4471 4.62438 21.4104 4.59766 21.374C3.59572 20.0093 2.84309 18.5012 2.74902 16.7822C2.70953 16.0601 2.74014 15.2922 2.84668 14.5762C2.8789 14.3597 2.9216 14.1445 2.96484 13.9297C2.99666 13.7716 3.02922 13.6138 3.05664 13.4551C3.09092 13.2566 3.12526 13.058 3.16016 12.8594C3.30221 12.0507 3.44475 11.24 3.54883 10.4268C3.61314 9.92429 3.65204 9.4218 3.69043 8.91797C3.69725 8.82852 3.70397 8.739 3.71094 8.64941C3.71559 8.58964 3.7202 8.52964 3.72461 8.46973C3.7543 8.06661 3.78351 7.661 3.8877 7.26953C4.04923 6.66256 4.35603 6.05378 4.77832 5.58594C6.90102 3.23472 11.4532 2.99938 14.6514 2.83398C14.7604 2.82834 14.8679 2.82294 14.9736 2.81738ZM15.5234 5.72656C13.2848 4.32475 10.5446 3.20858 8.31152 4.61914C5.02678 6.69414 3.51321 10.0458 4.68848 14.4326C5.62201 17.9166 7.23376 20.4824 9.03223 22.4189C11.8636 25.4677 16.8643 23.8022 19.7998 20.8535C22.88 17.7595 25.8544 15.3322 24.8438 11.5605C23.5545 6.74918 20.1531 8.62536 15.5234 5.72656Z"
        fill="currentColor"
      />
    </svg>
  );
}

type Turn = { q: string; a: string };

const TURNS: Turn[] = [
  {
    q: "Let's start with \u201cStop measuring your marketing team by leads\u201d. What actually happened that made you realize this?",
    a: "I was building the pipeline dashboard for our head of sales, and the number he actually cared about wasn't on it \u2014 he just wanted to know which deals were slipping this week.",
  },
  {
    q: "Interesting. Who exactly do you disagree with \u2014 and what's the cost of ignoring it?",
    a: "Most demand gen playbooks. They optimize for volume, so you end up with a full CRM and an empty quarter.",
  },
  {
    q: "What changed once you started reporting on defensible pipeline instead?",
    a: "Our weekly review went from arguing about MQL definitions to picking three accounts to actually unblock.",
  },
  {
    q: "What would you tell a marketing leader who wants to make that shift next quarter?",
    a: "Pick one number your sales lead already trusts, and report only that for 90 days. Everything else is noise.",
  },
];

const READ_MS = 1700;
const TYPE_MS = 3200;
const HOLD_MS = 800;
const GAP_MS = 700;
const TURN_MS = READ_MS + TYPE_MS + HOLD_MS + GAP_MS;
const CYCLE_MS = TURNS.length * TURN_MS + 1800;

const EASE = [0.22, 1, 0.36, 1] as const;

type Entry = { id: string; role: "isla" | "you"; text: string };

function useInterviewLoop(active: boolean) {
  const [turn, setTurn] = useState(0);
  const [phase, setPhase] = useState<"asking" | "listening">("asking");
  const [typed, setTyped] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [elapsed, setElapsed] = useState(0);
  const [progress, setProgress] = useState(0);
  const cycleRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined" || !active) return;
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;

    let raf = 0;
    let start = performance.now();

    const tick = (now: number) => {
      let t = now - start;
      if (t >= CYCLE_MS) {
        start = now;
        t = 0;
        cycleRef.current += 1;
      }

      const idx = Math.max(0, Math.min(TURNS.length - 1, Math.floor(t / TURN_MS)));
      const local = t - idx * TURN_MS;
      const done = t >= TURNS.length * TURN_MS;

      const asking = !done && local < READ_MS;
      const typingT = Math.min(
        1,
        Math.max(0, (local - READ_MS) / TYPE_MS),
      );
      const submitted = done || local >= READ_MS + TYPE_MS + HOLD_MS;

      // build transcript deterministically from the timeline
      const next: Entry[] = [];
      for (let i = 0; i <= (done ? TURNS.length - 1 : idx); i++) {
        next.push({ id: `q${i}`, role: "isla", text: TURNS[i].q });
        const isPast = i < idx || done;
        if (isPast || submitted) {
          next.push({ id: `a${i}`, role: "you", text: TURNS[i].a });
        }
      }

      setTurn(idx);
      setPhase(asking ? "asking" : "listening");
      setEntries((prev) =>
        prev.length === next.length &&
        prev[prev.length - 1]?.id === next[next.length - 1]?.id
          ? prev
          : next,
      );

      const answer = TURNS[idx]?.a ?? "";
      const chars = reduce
        ? answer.length
        : Math.round(easeOut(typingT) * answer.length);
      setTyped(submitted && !done ? "" : answer.slice(0, chars));

      setElapsed(Math.min(t, TURNS.length * TURN_MS) / 1000);
      setProgress(
        Math.min(1, (idx + Math.min(1, local / (TURN_MS - GAP_MS))) / TURNS.length),
      );

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  return { turn, phase, typed, entries, elapsed, progress, cycle: cycleRef.current };
}

function easeOut(x: number) {
  return 1 - Math.pow(1 - x, 2.2);
}

function formatTime(seconds: number) {
  const s = Math.floor(seconds);
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

export function AiInterviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => setActive(e.isIntersecting),
      { threshold: 0.15 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);
  const { turn, phase, typed, entries, elapsed, progress } =
    useInterviewLoop(active);
  const scrollRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [entries.length]);
  const speaking = phase === "asking";

  return (
    <section
      ref={sectionRef}
      id="interview"
      data-nav-theme="light"
      className="relative w-full overflow-hidden border-t border-[#D3D3D3] dark:border-[#2C2C2C] bg-white pt-24 pb-0 md:pt-32 dark:bg-[#0A0A0A]"
    >
      <div className="mx-auto max-w-6xl px-6 pb-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-[34px] font-normal leading-[1.06] tracking-[-0.03em] text-slate-900 md:text-[52px] dark:text-white">
            Refine the idea in just 4 minutes with the{" "}
            <span className="italic text-isla-cyan">Isla interviewer.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-slate-500 md:text-[16px] dark:text-white/65">
            Liked an idea? Do a quick interview with the AI about it. In four
            minutes, you turn that insight into your first draft post, ready to
            adjust with the agent or send for human review by the Isla team.
          </p>
          <a
            {...getStartedProps}
            data-cta-location="ai-interview"
            data-cta-label="Get Started"
            className="group mt-8 inline-flex cursor-pointer items-center gap-1.5 rounded-[4px] bg-isla-cyan py-1 pl-3.5 pr-1 text-[14px] font-bold text-white shadow-[0_0_20px_rgba(0,191,255,0.35)] transition-transform hover:scale-[1.02]"
          >
            <SlideLabel primary="Get Started" secondary="Let's go" />
            <span className="flex h-7 w-7 items-center justify-center rounded-[3px] transition-transform group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
            </span>
          </a>
        </div>
      </div>

      {/* Product showcase · blue presentation band */}
      <ProductShowcase>
        <div className="flex flex-col bg-white dark:bg-[#111111]">
          <div className="flex items-center justify-center gap-2 border-b border-slate-200 py-3.5 text-[13px] dark:border-[#2C2C2C]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-medium text-slate-700 dark:text-white/65">
              Live call with Isla
            </span>
            <span className="font-mono tabular-nums text-slate-400 dark:text-white/45">
              {formatTime(elapsed)}
            </span>
          </div>

          <div className="grid h-[588px] grid-cols-1 md:h-[640px] lg:h-[620px] lg:grid-cols-[260px_minmax(0,1fr)_300px]">
            {/* Left · refining now (desktop only) */}
            <div className="hidden h-full flex-col justify-between overflow-hidden border-slate-200 p-6 lg:flex lg:border-r dark:border-[#2C2C2C]">
              <div>
                <div className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-white/45">
                  Refining now
                </div>
                <p className="mt-4 text-[15px] font-semibold leading-snug text-slate-900 dark:text-white">
                  Stop measuring your marketing team by 'leads'. Start measuring
                  them by pipeline they can defend in a room full of skeptics.
                </p>

                <div className="mt-6 font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-white/45">
                  Pillar
                </div>
                <p className="mt-1.5 text-[14px] text-slate-700 dark:text-white/65">
                  Marketing Leadership
                </p>

                <div className="mt-5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-white/45">
                  Angle
                </div>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-600 dark:text-white/45">
                  Reframe marketing accountability from vanity metrics to
                  revenue conversations.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {["#b2b", "#revops", "#marketing"].map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-slate-100 px-2 py-1 text-[11.5px] text-slate-500 dark:bg-[#1A1A1A] dark:text-white/45"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <div className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-white/45">
                  Call progress
                </div>
                <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-[#1A1A1A]">
                  <div
                    className="h-full rounded-full bg-isla-cyan will-change-transform"
                    style={{
                      width: "100%",
                      transform: `scaleX(${Math.max(0.04, progress)})`,
                      transformOrigin: "left center",
                    }}
                  />
                </div>
                <p className="mt-2 text-[12.5px] tabular-nums text-slate-500 dark:text-white/45">
                  Q{turn + 1}/{TURNS.length} · {TURNS.length - turn - 1} left
                </p>
              </div>
            </div>

            {/* Center · live agent */}
            <div className="flex h-full flex-col items-center overflow-hidden bg-[#FBFBFB] px-5 py-10 text-center md:px-6 md:py-14 lg:bg-white dark:bg-[#111111] dark:lg:bg-[#111111]">
              <div className="relative grid size-[130px] place-items-center md:size-[168px]">
                <span
                  className="absolute inset-0 rounded-full bg-isla-cyan/15 transition-transform duration-[900ms] ease-out"
                  style={{ transform: `scale(${speaking ? 1 : 0.9})` }}
                />
                <span
                  key={`ripple-${turn}-${speaking}`}
                  className="absolute inset-2 rounded-full border border-isla-cyan/40 animate-[isla-ripple_2.4s_ease-out_infinite]"
                />
                <motion.div
                  className="relative grid size-[104px] place-items-center rounded-full bg-isla-cyan text-white md:size-[132px]"
                  animate={
                    speaking
                      ? { scale: [1, 1.045, 1], opacity: 1 }
                      : { scale: [1, 1.015, 1], opacity: 0.92 }
                  }
                  transition={{
                    duration: speaking ? 1.8 : 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <IslaMark />
                </motion.div>
              </div>

              <div className="mt-5 inline-flex h-5 items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-white/45">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={speaking ? "speaking" : "listening"}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="inline-flex items-center gap-2"
                  >
                    {speaking ? (
                      <AudioLines className="size-4 text-isla-cyan" />
                    ) : (
                      <Mic className="size-4 animate-pulse text-isla-cyan" />
                    )}
                    {speaking ? "Isla speaking" : "Listening"}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div className="mt-6 h-[124px] w-full overflow-hidden md:mt-7 md:h-[112px] lg:h-auto lg:min-h-[104px]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.h3
                    key={`q-${turn}`}
                    initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                    transition={{ duration: 0.55, ease: EASE }}
                    className="font-display mx-auto max-w-2xl text-[19px] font-semibold leading-snug text-slate-900 md:text-[26px] dark:text-white"
                  >
                    {TURNS[turn].q}
                  </motion.h3>
                </AnimatePresence>
              </div>

              <div className="mx-auto mt-8 h-[148px] w-full max-w-2xl overflow-hidden rounded-xl border border-slate-200 bg-white p-4 text-left transition-colors duration-500 md:mt-9 lg:h-auto lg:min-h-[128px] dark:border-[#2C2C2C] dark:bg-[#1A1A1A]"
                style={{
                  borderColor: !speaking ? "rgba(0,191,255,0.45)" : undefined,
                  boxShadow: !speaking
                    ? "0 0 0 4px rgba(0,191,255,0.07)"
                    : "0 0 0 0 rgba(0,191,255,0)",
                }}
              >
                <div className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-white/45">
                  You
                </div>
                <p className="mt-2 text-[14.5px] leading-relaxed text-slate-700 dark:text-white/65">
                  {typed}
                  <span className="ml-0.5 inline-block h-4 w-[7px] translate-y-0.5 animate-pulse bg-isla-cyan" />
                </p>
              </div>
            </div>

            {/* Right · transcript (desktop only) */}
            <div className="hidden h-full flex-col overflow-hidden border-slate-200 p-6 lg:flex lg:border-l dark:border-[#2C2C2C]">
              <div className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-white/45">
                Transcript
              </div>
              <div
                ref={scrollRef}
                className="mt-5 flex-1 space-y-4 overflow-hidden pr-1"
              >
                <AnimatePresence initial={false}>
                  {entries.map((e) => (
                    <motion.p
                      key={e.id}
                      layout
                      initial={{ opacity: 0, y: 12, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className={
                        e.role === "you"
                          ? "rounded-lg bg-slate-100 p-3 text-[13.5px] leading-relaxed text-slate-700 dark:bg-[#1A1A1A] dark:text-white/65"
                          : "text-[13.5px] leading-relaxed text-slate-600 dark:text-white/45"
                      }
                    >
                      {e.text}
                    </motion.p>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Call controls */}
          <div className="hidden items-center justify-center gap-3 border-t border-slate-200 bg-white px-4 py-4 md:flex dark:border-[#2C2C2C] dark:bg-[#111111]">
            <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-[13.5px] font-medium text-slate-700 shadow-sm dark:border-[#2C2C2C] dark:bg-[#1A1A1A] dark:text-white/65 dark:shadow-none">
              <Keyboard className="size-4 text-slate-400 dark:text-white/45" strokeWidth={2} />
              Type instead
            </span>
            <span className="inline-flex items-center gap-2 rounded-lg bg-[#F04438] px-4 py-2.5 text-[13.5px] font-semibold text-white shadow-sm dark:shadow-none">
              <PhoneOff className="size-4" strokeWidth={2} />
              End call
            </span>
          </div>
        </div>
      </ProductShowcase>
    </section>
  );
}

export default AiInterviewSection;