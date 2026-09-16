import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { Check, ArrowUp, ArrowDown, TrendingUp, ChevronRight } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import type { Translations } from "@/i18n/translations";
import lead1 from "@/assets/kanban/lead-1.jpg";
import lead2 from "@/assets/kanban/lead-2.jpg";
import lead3 from "@/assets/kanban/lead-3.jpg";

/* ── shared helpers ───────────────────────────────────────── */

function useCycle(length: number, ms: number, active: boolean) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!active || length <= 0) return;
    const id = setInterval(() => setI((p) => (p + 1) % length), ms);
    return () => clearInterval(id);
  }, [length, ms, active]);
  return [i, setI] as const;
}

function Card({
  label,
  title,
  description,
  children,
  index,
  inView,
  reduced,
}: {
  label: string;
  title: string;
  description: string;
  children: React.ReactNode;
  index: number;
  inView: boolean;
  reduced: boolean | null;
}) {
  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col rounded-2xl border border-slate-200/90 bg-white p-6 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-slate-300 md:p-8 dark:border-[#2C2C2C] dark:bg-[#111111] dark:shadow-none dark:hover:border-white/20"
    >
      <div className="font-display text-[12px] font-bold italic uppercase tracking-[0.12em] text-isla-cyan">
        {label}
      </div>
      <h3 className="font-display mt-3 text-[22px] font-semibold leading-snug tracking-[-0.01em] text-slate-900 md:text-[26px] dark:text-white">
        {title}
      </h3>
      <p className="mt-3 text-[14.5px] leading-relaxed text-slate-500 dark:text-white/65">
        {description}
      </p>
      <div className="mt-6 flex-1">{children}</div>
    </motion.article>
  );
}

/* ── 1 · Research ─────────────────────────────────────────── */

function ResearchDemo({
  active,
  reduced,
  dict,
}: {
  active: boolean;
  reduced: boolean | null;
  dict: Translations["feedbackLoop"];
}) {
  const researchItems = dict.researchItems;
  const [done, setDone] = useState(reduced ? researchItems.length : 0);
  const [insights, setInsights] = useState(24);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    if (!active || reduced) return;
    const id = setInterval(() => {
      setDone((p) => {
        if (p >= researchItems.length) {
          setInsights(24);
          return 0;
        }
        setInsights((n) => n + 1);
        setBump(true);
        setTimeout(() => setBump(false), 500);
        return p + 1;
      });
    }, 1600);
    return () => clearInterval(id);
  }, [active, reduced]);

  return (
    <div>
      <div className="flex items-center justify-between border-t border-slate-200/80 pt-4 dark:border-[#2C2C2C]">
        <span className="text-[13.5px] text-slate-600 dark:text-white/65">
          {dict.newResearch}
        </span>
        <motion.span
          animate={bump ? { scale: [1, 1.12, 1] } : { scale: 1 }}
          transition={{ duration: 0.45 }}
          className="text-[13.5px] font-bold text-isla-cyan"
        >
          +{insights} {dict.insightsSuffix}
        </motion.span>
      </div>

      <ul className="mt-4 space-y-1 rounded-xl border border-slate-200/80 bg-slate-50/50 p-3 dark:border-[#2C2C2C] dark:bg-[#1A1A1A]">
        {researchItems.map((t, i) => {
          const isDone = i < done;
          return (
            <li key={t} className="flex items-center gap-3 rounded-lg px-1.5 py-2">
              <span
                className={`grid size-[18px] shrink-0 place-items-center rounded-[5px] border transition-colors duration-500 ${
                  isDone
                    ? "border-isla-cyan bg-isla-cyan text-white"
                    : "border-slate-300 bg-white dark:border-[#2C2C2C] dark:bg-transparent"
                }`}
              >
                <AnimatePresence>
                  {isDone && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Check className="size-3" strokeWidth={3.5} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
              <span
                className={`text-[13.5px] transition-colors duration-500 ${
                  isDone
                    ? "text-slate-400 line-through dark:text-white/45"
                    : "text-slate-600 dark:text-white/65"
                }`}
              >
                {t}
              </span>
            </li>
          );
        })}
        <li className="flex items-center gap-3 rounded-lg bg-slate-100/80 px-1.5 py-2 dark:bg-[#1A1A1A]">
          <span className="size-[18px] shrink-0 rounded-[5px] border border-slate-300 bg-white dark:border-[#2C2C2C] dark:bg-transparent" />
          <motion.span
            animate={active && !reduced ? { opacity: [0.45, 1, 0.45] } : { opacity: 1 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="text-[13.5px] text-slate-600 dark:text-white/65"
          >
            {dict.scanning}
          </motion.span>
        </li>
      </ul>
    </div>
  );
}

/* ── 2 · Content ──────────────────────────────────────────── */

function ContentDemo({
  active,
  reduced,
  contentSteps,
}: {
  active: boolean;
  reduced: boolean | null;
  contentSteps: string[];
}) {
  const [step] = useCycle(contentSteps.length, 2200, active && !reduced);
  const pct = (step / (contentSteps.length - 1)) * 100;

  return (
    <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 px-5 py-8 dark:border-[#2C2C2C] dark:bg-[#1A1A1A]">
      <div className="flex items-start justify-between gap-1">
        {contentSteps.map((s, i) => {
          const state = i < step ? "done" : i === step ? "active" : "todo";
          return (
            <div key={s} className="flex min-w-0 flex-1 flex-col items-center gap-2">
              <motion.span
                animate={
                  state === "active" && !reduced
                    ? { scale: [1, 1.12, 1] }
                    : { scale: 1 }
                }
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className={`grid size-7 shrink-0 place-items-center rounded-full border-2 transition-colors duration-500 ${
                  state === "done"
                    ? "border-isla-cyan bg-isla-cyan text-white"
                    : state === "active"
                      ? "border-isla-cyan bg-white text-isla-cyan dark:bg-transparent"
                      : "border-slate-200 bg-slate-200 text-slate-400 dark:border-[#2C2C2C] dark:bg-[#1A1A1A]"
                }`}
              >
                {state === "done" ? (
                  <Check className="size-3.5" strokeWidth={3.5} />
                ) : (
                  <span
                    className={`size-1.5 rounded-full ${
                      state === "active" ? "bg-isla-cyan" : "bg-slate-400"
                    }`}
                  />
                )}
              </motion.span>
              <span
                className={`truncate text-[11.5px] font-semibold transition-colors duration-500 md:text-[12.5px] ${
                  state === "active"
                    ? "text-isla-cyan"
                    : "text-slate-600 dark:text-white/65"
                }`}
              >
                {s}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-[#1A1A1A]">
        <motion.div
          className="h-full rounded-full bg-isla-cyan"
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

/* ── 3 · Buying signals ───────────────────────────────────── */

const kpiValues = [
  { base: 482, delta: "+14%" },
  { base: 2410, delta: "+28%" },
  { base: 12, delta: "+3%" },
];

function useCountUp(target: number, run: boolean, reduced: boolean | null) {
  const [v, setV] = useState(reduced ? target : 0);
  useEffect(() => {
    if (!run) return;
    if (reduced) return setV(target);
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setV(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, reduced]);
  return v;
}

function KpiRow({
  kpi,
  run,
  reduced,
  delay,
  numberLocale,
}: {
  kpi: { label: string; base: number; delta: string };
  run: boolean;
  reduced: boolean | null;
  delay: number;
  numberLocale: string;
}) {
  const [target, setTarget] = useState(kpi.base);
  const value = useCountUp(target, run, reduced);

  useEffect(() => {
    if (!run || reduced) return;
    const id = setInterval(
      () => setTarget((p) => p + Math.max(1, Math.round(kpi.base * 0.004))),
      5200,
    );
    return () => clearInterval(id);
  }, [run, reduced, kpi.base]);

  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-slate-50/50 px-4 py-3.5 dark:border-[#2C2C2C] dark:bg-[#1A1A1A]">
      <div className="min-w-0">
        <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-slate-400">
          {kpi.label}
        </p>
        <p className="font-display mt-1 text-[22px] font-semibold leading-none text-slate-900 tabular-nums dark:text-white">
          {value.toLocaleString(numberLocale)}
        </p>
      </div>
      <motion.span
        animate={run && !reduced ? { opacity: [1, 0.55, 1] } : { opacity: 1 }}
        transition={{ duration: 3, repeat: Infinity, delay, ease: "easeInOut" }}
        className="shrink-0 rounded-md bg-emerald-50 px-2 py-1 text-[11.5px] font-bold text-emerald-600 dark:bg-emerald-500/10"
      >
        {kpi.delta}
      </motion.span>
    </div>
  );
}

/* ── 4 · Prioritization ───────────────────────────────────── */

const leadsBase = [
  { img: lead1, name: "Maria Pereira", role: "VP Marketing · Series A" },
  { img: lead2, name: "Lucas Miller", role: "Founder · SaaS" },
  { img: lead3, name: "John Smith", role: "CTO · Tech" },
];

function PriorityDemo({
  active,
  reduced,
  upLabel,
  downLabel,
}: {
  active: boolean;
  reduced: boolean | null;
  upLabel: string;
  downLabel: string;
}) {
  const [order, setOrder] = useState([0, 1, 2]);
  const [moved, setMoved] = useState(1);

  useEffect(() => {
    if (!active || reduced) return;
    const id = setInterval(() => {
      setOrder((p) => {
        const n = [...p];
        const i = Math.floor(Math.random() * 2);
        [n[i], n[i + 1]] = [n[i + 1], n[i]];
        setMoved(n[i]);
        return n;
      });
    }, 3400);
    return () => clearInterval(id);
  }, [active, reduced]);

  return (
    <ul className="space-y-2.5">
      {order.map((id, pos) => {
        const l = leadsBase[id];
        const up = id === moved;
        return (
          <motion.li
            key={l.name}
            layout
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50/50 px-3.5 py-3 dark:border-[#2C2C2C] dark:bg-[#1A1A1A]"
          >
            <span className="w-3 shrink-0 text-[13px] font-bold text-slate-400 dark:text-white/45">
              {pos + 1}
            </span>
            <img
              src={l.img}
              alt={l.name}
              loading="lazy"
              className="size-9 shrink-0 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-semibold text-slate-900 dark:text-white">
                {l.name}
              </p>
              <p className="truncate text-[12px] text-slate-500 dark:text-white/45">
                {l.role}
              </p>
            </div>
            <span
              className={`inline-flex shrink-0 items-center gap-1 text-[11.5px] font-bold ${
                up ? "text-emerald-600" : "text-red-500"
              }`}
            >
              {up ? <ArrowUp className="size-3.5" /> : <ArrowDown className="size-3.5" />}
              {up ? upLabel : downLabel}
            </span>
          </motion.li>
        );
      })}
    </ul>
  );
}

/* ── 5 · Learning loop ────────────────────────────────────── */

function LearningDemo({
  active,
  reduced,
  timeline,
  confidenceLabel,
}: {
  active: boolean;
  reduced: boolean | null;
  timeline: { t: string; w: string }[];
  confidenceLabel: string;
}) {
  const [done, setDone] = useState(reduced ? timeline.length : 0);

  useEffect(() => {
    if (!active || reduced) return;
    const id = setInterval(
      () => setDone((p) => (p >= timeline.length ? 0 : p + 1)),
      1400,
    );
    return () => clearInterval(id);
  }, [active, reduced]);

  const score = 81 + Math.round((12 * done) / timeline.length);

  return (
    <div>
      <ul className="space-y-3">
        {timeline.map((item, i) => {
          const isDone = i < done;
          return (
            <li key={item.t} className="flex items-start gap-3">
              <motion.span
                animate={{
                  scale: isDone && !reduced ? [0.8, 1.1, 1] : 1,
                  opacity: isDone ? 1 : 0.4,
                }}
                transition={{ duration: 0.4 }}
                className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-lg border transition-colors duration-500 ${
                  isDone
                    ? "border-isla-cyan/40 bg-isla-cyan/10 text-isla-cyan"
                    : "border-slate-200 text-slate-300 dark:border-[#2C2C2C] dark:text-white/25"
                }`}
              >
                <Check className="size-3.5" strokeWidth={3} />
              </motion.span>
              <div className="min-w-0">
                <p
                  className={`text-[14px] font-semibold transition-colors duration-500 ${
                    isDone
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-400 dark:text-white/45"
                  }`}
                >
                  {item.t}
                </p>
                <p className="text-[12px] text-slate-400 dark:text-white/45">{item.w}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 flex items-center justify-between rounded-xl bg-slate-100/70 px-4 py-3.5 dark:bg-[#1A1A1A]">
        <span className="text-[13.5px] font-semibold text-slate-700 dark:text-white/65">
          {confidenceLabel}
        </span>
        <span className="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-isla-cyan tabular-nums">
          81% → {score}%
          <TrendingUp className="size-4" />
        </span>
      </div>
    </div>
  );
}

/* ── 6 · Compounding ──────────────────────────────────────── */

function CompoundingDemo({
  active,
  reduced,
  tags,
}: {
  active: boolean;
  reduced: boolean | null;
  tags: string[];
}) {
  const [i] = useCycle(tags.length, 2000, active && !reduced);
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
      {tags.map((t, idx) => {
        const on = idx === i;
        return (
          <div
            key={t}
            className={`flex items-center justify-between gap-2 rounded-xl border px-3 py-2.5 transition-colors duration-500 ${
              on
                ? "border-isla-cyan bg-isla-cyan text-white"
                : "border-slate-200/90 bg-white text-slate-700 dark:border-[#2C2C2C] dark:bg-transparent dark:text-white/65"
            }`}
          >
            <span className="truncate text-[13px] font-semibold">{t}</span>
            <ChevronRight className="size-3.5 shrink-0 opacity-70" />
          </div>
        );
      })}
    </div>
  );
}

/* ── section ──────────────────────────────────────────────── */

export function FeedbackLoopSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.15 });
  const seen = useRef(false);
  if (inView) seen.current = true;
  const reduced = useReducedMotion();
  const enter = seen.current;
  const { dict, locale } = useLocale();
  const fl = dict.feedbackLoop;
  const numberLocale = locale === "pt" ? "pt-BR" : "en-US";

  const cards = [
    {
      ...fl.cards[0],
      demo: <ResearchDemo active={inView} reduced={reduced} dict={fl} />,
    },
    {
      ...fl.cards[1],
      demo: <ContentDemo active={inView} reduced={reduced} contentSteps={fl.contentSteps} />,
    },
    {
      ...fl.cards[2],
      demo: (
        <div className="space-y-2.5">
          {fl.kpis.map((k, i) => (
            <KpiRow
              key={k.label}
              kpi={{ ...k, ...kpiValues[i] }}
              run={inView}
              reduced={reduced}
              delay={i * 0.4}
              numberLocale={numberLocale}
            />
          ))}
        </div>
      ),
    },
    {
      ...fl.cards[3],
      demo: (
        <PriorityDemo active={inView} reduced={reduced} upLabel={fl.up} downLabel={fl.down} />
      ),
    },
    {
      ...fl.cards[4],
      demo: (
        <LearningDemo
          active={inView}
          reduced={reduced}
          timeline={fl.timeline}
          confidenceLabel={fl.confidenceScore}
        />
      ),
    },
    {
      ...fl.cards[5],
      demo: <CompoundingDemo active={inView} reduced={reduced} tags={fl.tags} />,
    },
  ];

  return (
    <section
      id="feedback-loop"
      data-nav-theme="light"
      className="relative w-full scroll-mt-20 border-t border-[#D3D3D3] bg-white py-24 md:py-32 dark:border-[#2C2C2C] dark:bg-[#0A0A0A]"
    >
      <div ref={ref} className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={enter ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-[650px] text-center"
        >
          <h2 className="font-display text-[34px] font-normal leading-[1.08] tracking-[-0.03em] text-slate-900 md:text-[50px] dark:text-white">
            {fl.heading}{" "}
            <span className="italic text-isla-cyan">{fl.headingHighlight}</span>
          </h2>
          <p className="mx-auto mt-6 text-[15px] leading-relaxed text-slate-500 md:text-[16px] dark:text-white/65">
            {fl.subheadline}
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-3 md:mt-20 md:grid-cols-2 md:gap-5">
          {cards.map((c, i) => (
            <Card
              key={c.label}
              label={c.label}
              title={c.title}
              description={c.description}
              index={i}
              inView={enter}
              reduced={reduced}
            >
              {c.demo}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeedbackLoopSection;
