"use client";

import * as React from "react";
import confetti from "canvas-confetti";
import { useTheme } from "@/hooks/useTheme";
import lead1 from "@/assets/kanban/lead-1.jpg";
import lead2 from "@/assets/kanban/lead-2.jpg";
import lead3 from "@/assets/kanban/lead-3.jpg";
import lead4 from "@/assets/kanban/lead-4.jpg";
import lead5 from "@/assets/kanban/lead-5.jpg";
import lead6 from "@/assets/kanban/lead-6.jpg";

const ACCENT = "#00BFFF";

type Lead = {
  name: string;
  role: string;
  photo: string;
  fit: boolean;
  warmth?: number;
};

const LEADS: Lead[] = [
  { name: "Marina Alves", role: "Head de Growth · SaaS B2B", photo: lead1, fit: true, warmth: 82 },
  { name: "Bruno Costa", role: "Freelancer · Design", photo: lead4, fit: false },
  { name: "Carla Nunes", role: "VP Ops · Fintech", photo: lead3, fit: true, warmth: 74 },
  { name: "Diego Ramos", role: "Estudante", photo: lead2, fit: false },
  { name: "Paula Reis", role: "Diretora Comercial · Indústria", photo: lead5, fit: true, warmth: 69 },
];

const HERO = LEADS[0];

const COLUMNS = [
  "Leads",
  "Engaging",
  "Reach Out",
  "Call Booked",
] as const;

// Skeleton fill per column so the board never looks empty
const COL_SKELETONS: { photo: string; nameW: string; roleW: string }[][] = [
  [
    { photo: lead6, nameW: "70%", roleW: "55%" },
    { photo: lead2, nameW: "60%", roleW: "48%" },
    { photo: lead5, nameW: "72%", roleW: "58%" },
  ],
  [
    { photo: lead2, nameW: "58%", roleW: "50%" },
    { photo: lead6, nameW: "66%", roleW: "42%" },
  ],
  [
    { photo: lead4, nameW: "60%", roleW: "44%" },
    { photo: lead3, nameW: "70%", roleW: "50%" },
  ],
  [
    { photo: lead6, nameW: "62%", roleW: "50%" },
  ],
];

/* -------------------------------------------------------------------------- */

function LeadCard({
  lead,
  children,
  style,
  className,
}: {
  lead: Lead;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-black/[0.07] bg-white px-3.5 py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.05),0_8px_20px_-14px_rgba(0,0,0,0.2)] dark:border-[#2C2C2C] dark:bg-[#111111] dark:shadow-none ${className ?? ""}`}
      style={style}
    >
      <div className="flex items-center gap-2.5">
        <img
          src={lead.photo}
          alt=""
          loading="lazy"
          className="size-7 shrink-0 rounded-full object-cover md:size-9"
        />
        <div className="min-w-0">
          <div className="truncate text-[13px] font-semibold text-neutral-900 dark:text-white">
            {lead.name}
          </div>
          <div className="truncate font-mono text-[10px] uppercase tracking-wide text-neutral-400 dark:text-white/45">
            {lead.role}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

function SkeletonCard({
  photo,
  nameW,
  roleW,
}: {
  photo: string;
  nameW: string;
  roleW: string;
}) {
  return (
    <div className="rounded-lg border border-black/[0.06] bg-white px-2 py-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] dark:border-[#2C2C2C] dark:bg-[#1A1A1A] dark:shadow-none">
      <div className="flex items-center gap-2">
        <img
          src={photo}
          alt=""
          loading="lazy"
          className="size-6 shrink-0 rounded-full object-cover opacity-70"
        />
        <div className="min-w-0 flex-1 space-y-1">
          <div
            className="h-1.5 rounded-full bg-neutral-200 dark:bg-white/20"
            style={{ width: nameW }}
          />
          <div
            className="h-1.5 rounded-full bg-neutral-100 dark:bg-white/10"
            style={{ width: roleW }}
          />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Stage — Radar / ICP filter                                                 */
/* -------------------------------------------------------------------------- */

function StageRadar({ sub }: { sub: number }) {
  // Two phases:
  //   sub 0..0.2  → "arrival": every lead looks identical, no ICP hints.
  //   sub 0.2..1  → "filter":  ICP borders/badges appear, non-fit fade away.
  const revealStart = 0.2;
  const reveal = Math.max(0, Math.min(1, (sub - revealStart) / (1 - revealStart)));
  const analysed = Math.round(reveal * 100);
  return (
    <div className="h-full">
      <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-neutral-400 dark:text-white/45">
        <span>Filtro ICP + Warmth Score</span>
        <span style={{ color: ACCENT }}>
          {analysed}% analisados
        </span>
      </div>
      <div className="grid gap-2">
        {LEADS.map((lead, i) => {
          if (lead.fit) {
            // Fade ICP hint IN as we reveal, so the card first looks neutral.
            const borderColor = `rgba(0,191,255,${0.08 + reveal * 0.37})`;
            return (
              <LeadCard
                key={lead.name}
                lead={lead}
                style={{ borderColor, transition: "border-color 200ms linear" }}
              >
                <div
                  className="overflow-hidden"
                  style={{
                    maxHeight: `${reveal * 22}px`,
                    opacity: reveal,
                    transition: "max-height 200ms linear, opacity 200ms linear",
                  }}
                >
                  <div
                    className="mt-1.5 flex items-center gap-1 font-mono text-[9px] uppercase tracking-wide"
                    style={{ color: ACCENT }}
                  >
                    <span
                      className="size-1.5 rounded-full"
                      style={{ backgroundColor: ACCENT }}
                    />
                    ICP match · warmth {lead.warmth}
                  </div>
                </div>
              </LeadCard>
            );
          }
          // Non-fit: fade + collapse height only after the reveal starts.
          const t = Math.max(0, Math.min(1, (reveal - i * 0.05) / 0.55));
          const opacity = 1 - t;
          const scale = 1 - t * 0.15;
          const maxH = 90 * (1 - t);
          const pad = t;
          return (
            <div
              key={lead.name}
              className="overflow-hidden"
              style={{
                maxHeight: `${maxH}px`,
                marginBottom: `${-pad * 8}px`,
                transition: "max-height 200ms linear, margin-bottom 200ms linear",
              }}
            >
              <div
                style={{
                  opacity,
                  transform: `translateY(${t * 14}px) scale(${scale})`,
                  filter: `grayscale(${t})`,
                  transition:
                    "opacity 200ms linear, transform 200ms linear, filter 200ms linear",
                }}
              >
                <LeadCard lead={lead} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Stage — Kanban with sliding hero card                                     */
/* -------------------------------------------------------------------------- */

function StageKanban({ colFloat }: { colFloat: number }) {
  const { isDark } = useTheme();
  const cols = COLUMNS.length;
  const clamped = Math.max(0, Math.min(cols - 1, colFloat));
  const active = Math.round(clamped);
  // How far we are from a "settled" column (0 = perfectly in slot, ~0.5 = mid-hop).
  const transitionAmt = Math.min(1, Math.abs(clamped - active) * 2);
  // Small lift so the card visually "hops" between columns without going too high.
  const hopLift = Math.sin(transitionAmt * Math.PI) * 10;

  // Scoped confetti — canvas lives inside the kanban so it scrolls away
  // with the section instead of hanging over the next one.
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const fireRef = React.useRef<((opts: confetti.Options) => void) | null>(null);
  const firedRef = React.useRef(false);
  React.useEffect(() => {
    if (!canvasRef.current) return;
    fireRef.current = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: false,
    });
    return () => {
      fireRef.current = null;
    };
  }, []);
  React.useEffect(() => {
    const landed = active === cols - 1 && transitionAmt < 0.15;
    if (landed && !firedRef.current && fireRef.current) {
      firedRef.current = true;
      const fire = fireRef.current;
      const end = Date.now() + 700;
      const frame = () => {
        fire({
          particleCount: 3,
          angle: 60,
          spread: 60,
          startVelocity: 38,
          origin: { x: 0.85, y: 1 },
          colors: ["#00BFFF", "#7dd3fc", "#a5f3fc", "#ffffff"],
          scalar: 0.8,
          disableForReducedMotion: true,
        });
        fire({
          particleCount: 3,
          angle: 120,
          spread: 60,
          startVelocity: 38,
          origin: { x: 0.95, y: 1 },
          colors: ["#00BFFF", "#7dd3fc", "#a5f3fc", "#ffffff"],
          scalar: 0.8,
          disableForReducedMotion: true,
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
    if (active !== cols - 1) firedRef.current = false;
  }, [active, transitionAmt, cols]);

  return (
    <div className="relative h-full">
      {/* Local confetti canvas — absolute inside kanban, not viewport-fixed */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-30 h-full w-full"
        aria-hidden
      />
      <div className="grid h-full grid-cols-4 gap-1.5">
        {COLUMNS.map((title, i) => {
          const isActive = i === active;
          return (
            <div
              key={title}
              className="flex flex-col rounded-lg p-1.5 transition-colors duration-500"
              style={
                isActive
                  ? {
                      background: isDark ? "#111111" : "#fff",
                      border: isDark ? "1px solid #2C2C2C" : "1px solid rgba(0,0,0,0.08)",
                      boxShadow: isDark ? "none" : "0 6px 18px -14px rgba(0,0,0,0.25)",
                    }
                  : {
                      background: isDark ? "#1A1A1A" : "rgba(0,0,0,0.02)",
                      border: isDark ? "1px dashed #2C2C2C" : "1px dashed rgba(0,0,0,0.09)",
                    }
              }
            >
              <div
                className={`mb-1.5 truncate font-mono text-[8.5px] font-semibold uppercase tracking-widest ${
                  isActive ? "text-neutral-700 dark:text-white/80" : "text-neutral-400 dark:text-white/45"
                }`}
                title={title}
              >
                {title}
              </div>
              <div className="flex-1 space-y-1">
                {/* Reserve a slot where the hero card will land — pushes
                    the skeleton stack down inside the active column. */}
                {isActive ? (
                  <div
                    style={{
                      height: "72px",
                      marginBottom: "6px",
                      opacity: 1 - transitionAmt,
                      transition: "opacity 160ms linear",
                    }}
                    aria-hidden
                  />
                ) : null}
                {COL_SKELETONS[i].map((s, j) => (
                  <SkeletonCard key={j} {...s} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Hero card that slides across columns and drops into the active slot */}
      <div
        className="pointer-events-none absolute z-20"
        style={{
          top: 24,
          left: `calc(${clamped} * ((100% - 18px) / 4 + 6px) + 6px)`,
          width: `calc((100% - 18px) / 4 - 12px)`,
          transform: `translate3d(0, ${-hopLift}px, 0)`,
          willChange: "transform, left",
        }}
      >
        <div style={{ animation: "pl-pop 0.4s both" }}>
          <LeadCard lead={HERO} className="ring-1 ring-[color:var(--isla,#00BFFF)]/40">
            <div className="mt-2">
              <div className="mb-1 flex items-center justify-between font-mono text-[9px] uppercase tracking-wide text-neutral-400 dark:text-white/45">
                <span>Warmth</span>
                <span style={{ color: ACCENT }}>{HERO.warmth}</span>
              </div>
              <div className="h-1.5 rounded-full bg-black/5 dark:bg-white/10">
                <div
                  className="h-1.5 rounded-full"
                  style={{
                    width: `${40 + (clamped / (cols - 1)) * 55}%`,
                    background: `linear-gradient(90deg, #7dd3fc, ${ACCENT})`,
                    transition: "width 200ms linear",
                  }}
                />
              </div>
            </div>
            {active === cols - 1 ? (
              <div className="mt-2 flex items-center gap-1.5 border-t border-black/5 pt-2 font-mono text-[9.5px] uppercase tracking-wide dark:border-white/10" style={{ color: ACCENT }}>
                <span className="size-1.5 rounded-full" style={{ backgroundColor: ACCENT }} />
                Call marcada · Qui 14h30
              </div>
            ) : null}
          </LeadCard>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Public component                                                          */
/* -------------------------------------------------------------------------- */

export interface PipelineStageProps {
  /**
   * Continuous progress across the whole animation, 0..4:
   *  - 0..1 → radar/filter stage (sub-progress fades non-fit leads out)
   *  - 1..4 → kanban stage (hero card slides across 6 columns)
   */
  progress: number;
  className?: string;
}

export function PipelineStage({ progress, className }: PipelineStageProps) {
  const inRadar = progress < 1;
  const sub = Math.max(0, Math.min(1, progress));
  // Map 1..4 → column position 0..5 across the 6 kanban columns.
  const colFloat = ((Math.max(1, progress) - 1) / 3) * (COLUMNS.length - 1);

  const windowLabel = inRadar ? "CAPTAÇÃO" : "KANBAN";

  return (
    <div
      className={`w-full overflow-hidden rounded-[20px] border border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_20px_44px_-24px_rgba(0,0,0,0.22)] dark:border-[#2C2C2C] dark:bg-[#111111] dark:shadow-none ${className ?? ""}`}
    >
      <style>{`
        @keyframes pl-pop { 0% { transform: scale(0.7); opacity: 0 } 100% { transform: scale(1); opacity: 1 } }
      `}</style>

      <div className="flex items-center justify-between gap-4 border-b border-black/[0.06] px-5 py-3.5 dark:border-[#2C2C2C]">
        <div className="flex items-center gap-1.5">
          <span className="text-[14px] font-bold tracking-tight text-neutral-900 dark:text-white">
            isla
          </span>
          <span style={{ color: ACCENT }}>◆</span>
          <span className="text-[14px] font-semibold tracking-tight text-neutral-500 dark:text-white/65">
            pipeline
          </span>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 dark:text-white/45">
          {windowLabel}
        </span>
      </div>

      <div className="relative h-[300px] p-4 md:h-[380px] md:p-5">
        {inRadar ? (
          <StageRadar sub={sub} />
        ) : (
          <StageKanban colFloat={colFloat} />
        )}
      </div>
    </div>
  );
}

export default PipelineStage;