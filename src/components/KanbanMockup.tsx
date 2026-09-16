"use client";

import * as React from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  Search,
  Filter,
  Plus,
  Play,
  LayoutGrid,
  List,
  ChevronRight,
  Clock,
  AlertTriangle,
  MessageSquare,
  CheckCircle2,
  Flame,
  UserX,
  Loader2,
} from "lucide-react";
import MockSidebar from "@/components/kanban/MockSidebar";
import AgentCursor, { type CursorPhase } from "@/components/kanban/AgentCursor";

import F1 from "@/assets/avatars/F1.png";
import F2 from "@/assets/avatars/F2.png";
import F5 from "@/assets/avatars/F5.png";
import F6 from "@/assets/avatars/F6.png";
import F8 from "@/assets/avatars/F8.png";
import M1 from "@/assets/avatars/M1.png";
import M2 from "@/assets/avatars/M2.png";
import M3 from "@/assets/avatars/M3.png";
import M5 from "@/assets/avatars/M5.png";
import M6 from "@/assets/avatars/M6.png";
import P1 from "@/assets/avatars/gen/p1.jpg";
import P2 from "@/assets/avatars/gen/p2.jpg";
import P3 from "@/assets/avatars/gen/p3.jpg";
import P4 from "@/assets/avatars/gen/p4.jpg";
import P5 from "@/assets/avatars/gen/p5.jpg";
import P6 from "@/assets/avatars/gen/p6.jpg";
import P7 from "@/assets/avatars/gen/p7.jpg";
import P8 from "@/assets/avatars/gen/p8.jpg";
import P9 from "@/assets/avatars/gen/p9.jpg";
import P10 from "@/assets/avatars/gen/p10.jpg";
import P11 from "@/assets/avatars/gen/p11.jpg";
import P12 from "@/assets/avatars/gen/p12.jpg";
import P13 from "@/assets/avatars/gen/p13.jpg";
import P14 from "@/assets/avatars/gen/p14.jpg";

const AVATARS: Record<string, string> = {
  F1, F2, F5, F6, F8, M1, M2, M3, M5, M6,
  P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12, P13, P14,
};

/* -------------------------------------------------------------------- */
/*  Data model                                                          */
/* -------------------------------------------------------------------- */

type Stage = "leads" | "connecting" | "engaging" | "ready" | "reach_out";

type LeadState =
  | "pending_approval"
  | "scheduled"
  | "awaiting_accept"
  | "invite_declined"
  | "need_attention"
  | "engaging"
  | "ready"
  | "sent";

type Lead = {
  id: string;
  name: string;
  role: string;
  company: string;
  score: number;
  stage: Stage;
  source: string;
  state: LeadState;
  nextAt?: string;
  avatar: string;
  /** Occupies its slot but stays invisible while the overlay card flies to it. */
  landing?: boolean;
};

/** Single source of truth for stage colors: column dot + card side indicator. */
const STAGE_COLORS: Record<Stage, string> = {
  leads: "#A3ADBA",
  connecting: "#6366F1",
  engaging: "#8B5CF6",
  ready: "#FB923C",
  reach_out: "#6366F1",
};

const STAGES: { key: Stage; label: string }[] = [
  { key: "leads", label: "New Prospects" },
  { key: "connecting", label: "Connecting" },
  { key: "engaging", label: "Engaging" },
  { key: "ready", label: "Ready to Reach Out" },
  { key: "reach_out", label: "Reaching Out" },
];

/** Total leads per stage — the visible cards are only a preview. */
const INITIAL_TOTALS: Record<Stage, number> = {
  leads: 48,
  connecting: 36,
  engaging: 24,
  ready: 7,
  reach_out: 5,
};

/** Only four cards per column are ever rendered. */
const MAX_VISIBLE = 4;

const INITIAL_LEADS: Lead[] = [
  { id: "l1", name: "Mariana Costa", role: "CMO", company: "Lumen.io", score: 84, stage: "leads", source: "Connection List", state: "pending_approval", avatar: "F1" },
  { id: "l2", name: "Lucas Almeida", role: "Head of Growth", company: "Vecta", score: 88, stage: "leads", source: "Research", state: "pending_approval", avatar: "M1" },
  { id: "l3", name: "Felipe Santos", role: "VP Sales", company: "Orbit", score: 81, stage: "leads", source: "Competitor Post", state: "pending_approval", avatar: "M2" },
  { id: "l4", name: "Camila Silva", role: "CMO", company: "Northwind", score: 92, stage: "leads", source: "Competitor Post", state: "pending_approval", avatar: "F2" },

  { id: "c1", name: "Sofia Martins", role: "CRO", company: "Lumen.io", score: 86, stage: "connecting", source: "Competitor Post", state: "awaiting_accept", avatar: "F5" },
  { id: "c2", name: "Rafael Oliveira", role: "CMO", company: "Atlas", score: 90, stage: "connecting", source: "Connection List", state: "awaiting_accept", avatar: "M5" },
  { id: "c3", name: "Carlos Pinheiro", role: "Head of Growth", company: "Vecta", score: 78, stage: "connecting", source: "Connection List", state: "need_attention", avatar: "M6" },
  { id: "c4", name: "Renata Duarte", role: "VP Marketing", company: "Halo", score: 83, stage: "connecting", source: "Research", state: "awaiting_accept", avatar: "F6" },

  { id: "e1", name: "Gabriel Ferreira", role: "CMO", company: "Orbit", score: 87, stage: "engaging", source: "Competitor Post", state: "engaging", avatar: "M3" },
  { id: "e2", name: "Ana Beatriz", role: "VP Marketing", company: "Kite", score: 91, stage: "engaging", source: "Engagement", state: "engaging", avatar: "F8" },
  { id: "e3", name: "Juliana Mendes", role: "Director of Sales", company: "Atlas", score: 85, stage: "engaging", source: "Research", state: "engaging", avatar: "P1" },
  { id: "e4", name: "Diego Ramos", role: "Head of Sales", company: "Nimbus", score: 89, stage: "engaging", source: "Engagement", state: "engaging", avatar: "P8" },

  { id: "r1", name: "Carla Lima", role: "CMO", company: "Northwind", score: 93, stage: "ready", source: "Research", state: "scheduled", nextAt: "2d", avatar: "P2" },
  { id: "r2", name: "Thiago Pereira", role: "CRO", company: "Lumen.io", score: 88, stage: "ready", source: "Research", state: "ready", avatar: "P9" },
  { id: "r3", name: "Patrícia Nunes", role: "VP Revenue", company: "Vecta", score: 82, stage: "ready", source: "Engagement", state: "ready", avatar: "P3" },

  { id: "o1", name: "André Souza", role: "CMO", company: "Vecta", score: 95, stage: "reach_out", source: "Engagement", state: "sent", avatar: "P10" },
  { id: "o2", name: "Larissa Santos", role: "VP Marketing", company: "Orbit", score: 91, stage: "reach_out", source: "Competitor Post", state: "sent", nextAt: "replied", avatar: "P4" },
  { id: "o3", name: "Bruno Ferreira", role: "Founder", company: "Kite", score: 89, stage: "reach_out", source: "Connection List", state: "sent", avatar: "P11" },
];

/** People pulled up from the (unrendered) rest of the database. Each entry is a
 *  distinct person with a distinct headshot, so the board never repeats anyone. */
const POOL: Omit<Lead, "id" | "stage" | "state">[] = [
  { name: "Beatriz Rocha", role: "CMO", company: "Solvia", score: 87, source: "Connection List", avatar: "P5" },
  { name: "Marcelo Dias", role: "VP Sales", company: "Tenor", score: 91, source: "Competitor Post", avatar: "P12" },
  { name: "Helena Prado", role: "Head of Growth", company: "Cobalt", score: 83, source: "Research", avatar: "P6" },
  { name: "Rodrigo Muniz", role: "Founder", company: "Pilar", score: 94, source: "Engagement", avatar: "P13" },
  { name: "Isabela Freitas", role: "Director of Sales", company: "Nimbus", score: 86, source: "Connection List", avatar: "P7" },
  { name: "Vitor Campos", role: "CRO", company: "Halo", score: 79, source: "Research", avatar: "P14" },
];

const NEXT_STAGE: Record<Stage, Stage | null> = {
  leads: "connecting",
  connecting: "engaging",
  engaging: "ready",
  ready: "reach_out",
  reach_out: null,
};

const STATE_FOR: Record<Stage, LeadState> = {
  leads: "pending_approval",
  connecting: "awaiting_accept",
  engaging: "engaging",
  ready: "ready",
  reach_out: "sent",
};

function advance(lead: Lead): Lead {
  const stage = NEXT_STAGE[lead.stage];
  if (!stage) return lead;
  // Moving forward always lifts the fit score into the strong (green) band.
  const base = Math.max(lead.score, 81);
  const bump = stage === "ready" ? 88 : stage === "reach_out" ? 92 : base + 4;
  const score = Math.min(99, Math.max(base + 3, bump));
  return { ...lead, stage, score, state: STATE_FOR[stage], nextAt: undefined };
}

function cardCta(lead: Lead): string | null {
  switch (lead.stage) {
    case "leads":
      return "Move to Connect";
    case "connecting":
      return "Move to Engage";
    case "engaging":
      return "Move to Ready";
    case "ready":
      return lead.state === "scheduled" ? "Send message now" : "Generate message";
    case "reach_out":
      return lead.nextAt === "replied" ? "Chat with lead" : "Send follow-up";
  }
}

function stateBadge(
  lead: Lead,
): { label: string; icon: typeof Clock; cls: string } | null {
  switch (lead.state) {
    case "invite_declined":
      return { label: "Connection Declined", icon: UserX, cls: "bg-red-50 text-red-700 dark:bg-[#462323] dark:text-red-300" };
    case "need_attention":
      return { label: "Need Attention", icon: AlertTriangle, cls: "bg-red-50 text-red-700 dark:bg-[#462323] dark:text-white" };
    case "awaiting_accept":
      return { label: "Waiting Connection", icon: Loader2, cls: "bg-sky-50 text-sky-700 dark:bg-[#112b32] dark:text-[#00BFFF]" };
    case "engaging":
      return { label: "Warming Lead", icon: Flame, cls: "bg-sky-50 text-sky-700 dark:bg-[#112b32] dark:text-[#00BFFF]" };
    case "scheduled":
      return { label: `Action in ${lead.nextAt ?? "2d"}`, icon: Clock, cls: "bg-sky-50 text-sky-700 dark:bg-[#112b32] dark:text-[#00BFFF]" };
    case "ready":
      return { label: "Need Message", icon: MessageSquare, cls: "bg-amber-50 text-amber-700 dark:bg-[#3a2e12] dark:text-amber-300" };
    case "sent":
      return lead.nextAt === "replied"
        ? { label: "Replied", icon: CheckCircle2, cls: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400" }
        : { label: "Waiting Reply", icon: Clock, cls: "bg-sky-50 text-sky-700 dark:bg-[#112b32] dark:text-[#00BFFF]" };
    default:
      return null;
  }
}

function connectionBar(lead: Lead) {
  return STAGE_COLORS[lead.stage];
}

/* -------------------------------------------------------------------- */
/*  Animated counter                                                    */
/* -------------------------------------------------------------------- */

function Counter({ value }: { value: number }) {
  return (
    <span className="relative ml-1 inline-flex h-[14px] w-[22px] overflow-hidden align-middle text-[11px] tabular-nums text-neutral-500 dark:text-neutral-400">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* -------------------------------------------------------------------- */
/*  Card                                                                */
/* -------------------------------------------------------------------- */

const CardBody = React.memo(function CardBody({
  lead,
  barColor,
}: {
  lead: Lead;
  barColor?: string;
}) {
  const cta = cardCta(lead);
  const state = stateBadge(lead);
  const scorePill =
    lead.score >= 80
      ? "bg-green-700 text-white"
      : "bg-sky-600 text-white";

  return (
    <>
      <span
        className="absolute left-0 top-0 h-full w-[3px]"
        style={{
          backgroundColor: barColor ?? connectionBar(lead),
          // Gradual RGB interpolation once the card has landed in its column.
          transition: "background-color 700ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />


      <div className="flex flex-col gap-2.5 pl-4 pr-3 pt-3">
        <div className="flex items-center gap-2.5">
          <div className="relative h-9 w-9 shrink-0">
            <img
              src={AVATARS[lead.avatar]}
              alt=""
              width={72}
              height={72}
              loading="eager"
              decoding="async"
              className="size-9 rounded-full bg-neutral-200 object-cover dark:bg-neutral-800"
            />
            <span
              className={`absolute -bottom-1 left-1/2 flex h-[18px] min-w-[26px] -translate-x-1/2 items-center justify-center rounded-lg px-1.5 text-[11px] font-semibold tabular-nums ring-2 ring-white dark:ring-[#111111] ${scorePill}`}
            >
              {lead.score}
            </span>
          </div>
          <div className="min-w-0 flex-1 pl-1">
            <div className="truncate text-[13px] font-semibold leading-tight text-neutral-900 dark:text-white">
              {lead.name}
            </div>
            <div className="truncate text-[11px] leading-tight text-neutral-500 dark:text-neutral-400">
              {lead.role} · {lead.company}
            </div>
          </div>
        </div>

        <div className="flex flex-nowrap items-center gap-1">
          <span className="h-[20px] shrink-0 whitespace-nowrap rounded-lg bg-neutral-100 px-1.5 text-[10px] font-semibold leading-[20px] text-neutral-700 dark:bg-[#3c3c3c] dark:text-white">
            {lead.source}
          </span>
          {state && (
            <span
              className={`inline-flex h-[20px] shrink-0 items-center gap-1 whitespace-nowrap rounded-lg px-1.5 text-[10px] font-semibold ${state.cls}`}
            >
              <state.icon className="size-2.5" />
              {state.label}
            </span>
          )}
        </div>
      </div>

      {cta ? (
        <div className="mt-2.5 flex w-full items-center justify-between border-t border-[#E6E6E6] py-2 pl-4 pr-3 text-[12px] font-semibold text-neutral-800 dark:border-[#2C2C2C] dark:text-white/90">
          <span>{cta}</span>
          <ChevronRight className="size-3.5 text-neutral-400" />
        </div>
      ) : (
        <div className="h-3" />
      )}
    </>
  );
});

const CARD_SHELL =
  "relative overflow-clip rounded-[10px] border border-[#E6E6E6] bg-white dark:border-[#2C2C2C] dark:bg-[#111111]";

const CardView = React.memo(function CardView({
  lead,
  held = false,
  barColor,
}: {
  lead: Lead;
  held?: boolean;
  barColor?: string;
}) {
  return (
    <motion.div
      layout
      layoutId={lead.id}
      data-lead={lead.id}
      initial={{ opacity: 0, scale: 0.965 }}
      animate={{
        opacity: 1,
        scale: held ? 1.035 : 1,
        rotate: held ? 3 : 0,
        boxShadow: held
          ? "0 18px 40px rgba(0,0,0,0.18)"
          : "0 1px 2px rgba(0,0,0,0.04)",
      }}
      exit={{ opacity: 0, scale: 0.96 }}
      style={{
        willChange: "transform, opacity",
        backfaceVisibility: "hidden",
        zIndex: held ? 30 : 1,
      }}
      transition={{
        layout: { duration: 1.5, ease: [0.33, 0, 0.2, 1] },
        opacity: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
        scale: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        rotate: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        boxShadow: { duration: 0.55 },
        default: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      }}
      className={CARD_SHELL}
    >
      <CardBody lead={lead} barColor={barColor} />
    </motion.div>
  );
});


/* -------------------------------------------------------------------- */
/*  Board                                                               */
/* -------------------------------------------------------------------- */

/** Intrinsic desktop app size. The hero crops the bottom naturally. */
const APP_WIDTH = 1560;
const APP_HEIGHT = 900;
/** Portion of the app that stays visible inside the hero. */
const VISIBLE_HEIGHT = 660;

/** The whole board loops back to its initial state on this cadence. */
const RESET_MS = 30000;

/**
 * Picks somebody from the database who is not already on the board, and avoids
 * surfacing a second low-scoring lead while one is already visible.
 */
function makeLead(
  stage: Stage,
  n: number,
  lists: Record<Stage, Lead[]>,
): Lead | null {
  const visible = Object.values(lists).flat();
  const taken = new Set(visible.map((l) => l.name));
  const hasLow = visible.some((l) => l.score < 80);
  const free = POOL.filter((p) => !taken.has(p.name));
  const preferred = free.filter((p) => (hasLow ? p.score >= 80 : true));
  const options = preferred.length ? preferred : free;
  if (!options.length) return null;
  const tpl = options[n % options.length];
  return { ...tpl, id: `p${stage}${n}`, stage, state: STATE_FOR[stage] };
}

/** Every column starts (and restarts) full, so the counts read as believable. */
function buildInitialLists(cycle: number): Record<Stage, Lead[]> {
  const map = {} as Record<Stage, Lead[]>;
  for (const s of STAGES) {
    map[s.key] = INITIAL_LEADS.filter((l) => l.stage === s.key)
      .slice(0, MAX_VISIBLE)
      .map((l) => ({ ...l, id: `${l.id}-${cycle}` }));
  }
  let n = 0;
  for (const s of STAGES) {
    while (map[s.key].length < MAX_VISIBLE) {
      const fresh = makeLead(s.key, n++, map);
      if (!fresh) break;
      map[s.key].push({ ...fresh, id: `${fresh.id}-i${cycle}` });
    }
  }
  return map;
}

function BoardApp({ drift = false }: { drift?: boolean }) {
  const [cycle, setCycle] = React.useState(0);
  const [totals, setTotals] = React.useState<Record<Stage, number>>(INITIAL_TOTALS);
  const [lists, setLists] = React.useState<Record<Stage, Lead[]>>(() =>
    buildInitialLists(0),
  );

  const listsRef = React.useRef(lists);
  const totalsRef = React.useRef(totals);
  listsRef.current = lists;
  totalsRef.current = totals;

  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const boardRef = React.useRef<HTMLDivElement | null>(null);
  const listRefs = React.useRef<Partial<Record<Stage, HTMLDivElement | null>>>({});
  const [active, setActive] = React.useState(false);
  const seq = React.useRef(0);
  /** Purely visual: which card the agent cursor should follow right now. */
  const [cursorTarget, setCursorTarget] = React.useState<string | null>(null);
  /** Keeps the card's side bar in its origin-stage color until it has landed. */
  const [holdColor, setHoldColor] = React.useState<{ id: string; color: string } | null>(null);
  const [phase, setPhase] = React.useState<CursorPhase>("idle");



  React.useEffect(() => {
    const node = rootRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const obs = new IntersectionObserver(([e]) => setActive(e.isIntersecting), {
      threshold: 0.05,
    });
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  React.useEffect(() => {
    if (!active) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const gaps = [1400, 1900, 1600, 2100, 1700];
    const APPROACH = 1000;
    const GRAB = 420;
    const DRAG = 1500;
    const SETTLE = 420;
    let i = 0;

    const step = () => {
      if (cancelled) return;
      const curLists = listsRef.current;
      const candidates = (["leads", "connecting", "engaging", "ready"] as Stage[]).filter(
        (s) => (curLists[s]?.length ?? 0) > 1,
      );
      if (!candidates.length) {
        timer = setTimeout(step, 1600);
        return;
      }
      const from = candidates[Math.floor(Math.random() * candidates.length)];
      const to = NEXT_STAGE[from]!;
      const visible = curLists[from];
      // Only ever move a card from the visible rows.
      const card = visible[Math.min(visible.length - 1, 1 + Math.floor(Math.random() * 2))];
      if (!card) {
        timer = setTimeout(step, 1600);
        return;
      }
      const commit = () => {
      const moved = advance(card);
      // The side bar keeps the origin column's color for the whole flight.
      setHoldColor({ id: moved.id, color: STAGE_COLORS[from] });




      setLists((prev) => {
        const next = { ...prev };
        // Source column: hand the card over, pull a replacement up from the
        // database so the column never looks emptier than its counter.
        const rest = prev[from].filter((l) => l.id !== card.id);
        while (rest.length < MAX_VISIBLE) {
          seq.current += 1;
          const fresh = makeLead(from, seq.current, { ...prev, [from]: rest });
          if (!fresh) break;
          rest.push({ ...fresh, id: `${fresh.id}-${seq.current}` });
        }
        next[from] = rest;
        // Destination column: the card slides into the top of the stack and the
        // rest of the stack shifts down to make room.
        next[to] = [moved, ...prev[to]].slice(0, MAX_VISIBLE);
        return next;
      });

      setTotals((prev) => ({
        ...prev,
        [from]: Math.max(MAX_VISIBLE, prev[from] - 1),
        [to]: prev[to] + 1,
      }));

      // The card travels with the cursor for the whole drag, then is released.
      timer = setTimeout(() => {
        if (cancelled) return;
        setPhase("release");
        // Card is now seated in the new column: start the gradual color blend.
        setHoldColor(null);

        timer = setTimeout(() => {
          if (cancelled) return;
          setPhase("idle");
          timer = setTimeout(step, gaps[i++ % gaps.length]);
        }, SETTLE);
      }, DRAG);
      };
      // Phased interaction: the cursor approaches the card, grabs it (the card
      // tilts and lifts), drags it across, then releases it.
      setCursorTarget(card.id);
      setPhase("approach");
      timer = setTimeout(() => {
        if (cancelled) return;
        setPhase("grab");
        timer = setTimeout(() => {
          if (cancelled) return;
          setPhase("drag");
          commit();
        }, GRAB);
      }, APPROACH);
    };

    timer = setTimeout(step, 1400);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [active, cycle]);

  // Loop the whole board back to its starting state so the pipeline never
  // drifts into a thin, lopsided arrangement.
  React.useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      seq.current = 0;
      setCycle((c) => {
        const nextCycle = c + 1;
        setLists(buildInitialLists(nextCycle));
        setTotals(INITIAL_TOTALS);
        return nextCycle;
      });
    }, RESET_MS);
    return () => clearInterval(id);
  }, [active]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none flex select-none bg-white text-neutral-900 dark:bg-[#0A0A0A] dark:text-white"
      style={{ width: APP_WIDTH, height: APP_HEIGHT }}
    >
      <MockSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <div className="px-7 pt-7">
          <h3 className="text-[20px] font-semibold tracking-tight">Lead Board</h3>
          <p className="mt-1 text-[13px] text-neutral-500 dark:text-neutral-400">
            Track every lead from first signal to closed revenue.
          </p>

          <div className="mb-5 mt-5 flex items-center gap-3">
            <div className="flex h-9 items-center gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-[#1A1A1A]">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1 text-[12px] font-medium shadow-sm dark:bg-[#2C2C2C]">
                <LayoutGrid className="size-3.5" /> Kanban
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[12px] font-medium text-neutral-500 dark:text-neutral-400">
                <List className="size-3.5" /> List
              </span>
            </div>
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
              <div className="flex h-9 items-center rounded-lg border border-[#E6E6E6] pl-9 text-[13px] text-neutral-400 dark:border-[#2C2C2C]">
                Search...
              </div>
            </div>
            <span className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#E6E6E6] px-3 text-[13px] font-medium dark:border-[#2C2C2C]">
              <Filter className="size-3.5" /> Filter
            </span>
            <span className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-neutral-900 px-3 text-[13px] font-medium text-white dark:bg-white dark:text-black">
              <Plus className="size-3.5" /> New Lead
            </span>
          </div>
        </div>

        {/* Board */}
        <div ref={boardRef} className="relative min-h-0 flex-1 px-7 pb-7">
          <LayoutGroup>
            <div
              className={`flex h-full items-stretch gap-3 ${drift ? "isla-kanban-drift" : ""}`}
            >
              {STAGES.map((stage) => (
                <div
                  key={stage.key}
                  className="flex min-w-0 flex-1 flex-col rounded-[14px] bg-[#F5F5F5] px-1.5 py-2.5 dark:bg-[#1A1A1A]"
                >
                  <div className="flex items-center justify-between px-2 pb-2.5">
                    <div className="flex min-w-0 items-center gap-1.5">
                      <span
                        className="size-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: STAGE_COLORS[stage.key] }}
                      />
                      <span className="truncate text-[11px] font-semibold tracking-[-0.275px]">
                        {stage.label}
                      </span>
                      <Counter value={totals[stage.key]} />
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-600 opacity-0 dark:text-white/80">
                      Run All
                      <Play className="size-2.5 fill-current" />
                    </span>
                  </div>

                  <div
                    ref={(n) => {
                      listRefs.current[stage.key] = n;
                    }}
                    className="min-h-0 flex-1 space-y-2 px-1 pb-1"
                  >
                    <AnimatePresence initial={false}>
                      {lists[stage.key].map((lead) => (
                        <CardView
                          key={lead.id}
                          lead={lead}
                          held={lead.id === cursorTarget && (phase === "grab" || phase === "drag")}
                          barColor={holdColor?.id === lead.id ? holdColor.color : undefined}
                        />

                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>
          </LayoutGroup>

          <AgentCursor boardRef={boardRef} targetId={cursorTarget} phase={phase} />


        </div>
      </div>
    </div>
  );
}

/**
 * Scales the fixed-size desktop app to the available width and crops the
 * bottom, so the interface reads as a real window continuing below the fold.
 */
export function KanbanMockup({ className }: { className?: string }) {
  const wrapRef = React.useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = React.useState(1);
  const [mobile, setMobile] = React.useState(false);

  React.useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    const update = () => {
      const w = node.clientWidth;
      const isMobile = window.innerWidth < 768;
      setMobile(isMobile);
      // On mobile the board is intentionally cropped: we only fit ~700px of
      // the 1560px app, so the columns overflow to the right.
      setScale(Math.min(1, w / (isMobile ? 720 : APP_WIDTH)));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(node);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`relative w-full overflow-hidden ${className ?? ""}`}
      style={{ height: VISIBLE_HEIGHT * scale }}
    >
      <style>{`
        @keyframes isla-kanban-drift {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-220px, 0, 0); }
        }
        .isla-kanban-drift {
          animation: isla-kanban-drift 26s ease-in-out infinite alternate;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .isla-kanban-drift { animation: none; }
        }
      `}</style>
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ transform: `scale(${scale})`, width: APP_WIDTH, height: APP_HEIGHT }}
      >
        <BoardApp drift={mobile} />
      </div>
    </div>
  );
}

export default KanbanMockup;
