import { forwardRef, useEffect, useRef, useState } from "react";

type Props = { isActive: boolean };

const RADAR_CX = 55;
const RADAR_CY = 55;
const RADAR_R = 38;
const RADAR_AXES = 7;
const RADAR_VALUES = [0.3, 0.3, 0.4, 1.0, 0.27, 0.55, 0.5];

const TIME_CHIPS = ["10 min", "20 min", "30 min", "1h or more"];
const PLATFORMS = [
  { label: "LinkedIn", soon: false },
  { label: "X / Twitter", soon: false },
  { label: "Instagram", soon: true },
  { label: "YouTube", soon: true },
];
const GOALS = [
  { emoji: "🧲", text: "Get more customers" },
  { emoji: "🔍", text: "New opportunities" },
  { emoji: "🧠", text: "Thought leader" },
  { emoji: "🤝", text: "Create connections" },
  { emoji: "💰", text: "Attract investors" },
  { emoji: "🛠️", text: "Build in public" },
];
const TASKS = [
  "Collecting profile data",
  "Analyzing content topics",
  "Measuring engagement",
  "Detecting authority signals",
  "Comparing similar profiles",
  "Generating your strategy",
];
const STRENGTHS = [
  { icon: "💡", title: "Systems Thinking", desc: "Strong structural product mindset." },
  { icon: "⚡", title: "Rapid Prototyping", desc: "Ships and validates ideas fast." },
  { icon: "📊", title: "Data-Oriented", desc: "Decisions grounded in metrics." },
];
const BLINDS = [
  { icon: "⚠️", title: "Weak Positioning", desc: "Unique edge not clear in bio." },
  { icon: "💬", title: "Low Triggers", desc: "Posts report more than spark." },
  { icon: "📖", title: "Untold Story", desc: "Multidisciplinary edge untapped." },
];

function buildRingPoints(level: number) {
  const r = (RADAR_R * level) / 4;
  const pts: string[] = [];
  for (let i = 0; i < RADAR_AXES; i++) {
    const a = (Math.PI * 2 * i) / RADAR_AXES - Math.PI / 2;
    pts.push(`${(RADAR_CX + Math.cos(a) * r).toFixed(2)},${(RADAR_CY + Math.sin(a) * r).toFixed(2)}`);
  }
  return pts.join(" ");
}

function buildAxisEnds() {
  const ends: { x: number; y: number }[] = [];
  for (let i = 0; i < RADAR_AXES; i++) {
    const a = (Math.PI * 2 * i) / RADAR_AXES - Math.PI / 2;
    ends.push({ x: RADAR_CX + Math.cos(a) * RADAR_R, y: RADAR_CY + Math.sin(a) * RADAR_R });
  }
  return ends;
}

function radarPointsAt(progress: number) {
  const pts: string[] = [];
  for (let i = 0; i < RADAR_AXES; i++) {
    const a = (Math.PI * 2 * i) / RADAR_AXES - Math.PI / 2;
    const r = RADAR_R * RADAR_VALUES[i] * progress;
    pts.push(`${(RADAR_CX + Math.cos(a) * r).toFixed(2)},${(RADAR_CY + Math.sin(a) * r).toFixed(2)}`);
  }
  return pts.join(" ");
}

export default function Step2GoalsAnimation({ isActive }: Props) {
  const [cycle, setCycle] = useState(0);
  const [scene, setScene] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [chipSel, setChipSel] = useState<number[]>([]);
  const [chipPulse, setChipPulse] = useState<number | null>(null);
  const [platSel, setPlatSel] = useState<number[]>([]);
  const [platPulse, setPlatPulse] = useState<number | null>(null);
  const [goalSel, setGoalSel] = useState<number[]>([]);
  const [goalPulse, setGoalPulse] = useState<number | null>(null);
  const [taskState, setTaskState] = useState<("idle" | "active" | "done")[]>(
    Array(TASKS.length).fill("idle"),
  );
  const [taskFill, setTaskFill] = useState<number[]>(Array(TASKS.length).fill(0));
  const [score, setScore] = useState(0);
  const [radarProgress, setRadarProgress] = useState(0);
  const [insightsShown, setInsightsShown] = useState<number>(0);
  const [cursor, setCursor] = useState({ x: 340, y: 30, visible: false, duration: 0 });

  const stageRef = useRef<HTMLDivElement | null>(null);
  const scene1Ref = useRef<HTMLDivElement | null>(null);
  const scene2Ref = useRef<HTMLDivElement | null>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const rafRef = useRef<number | null>(null);

  const T = (fn: () => void, delay: number) => {
    timeoutsRef.current.push(setTimeout(fn, delay));
  };

  const moveCursorTo = (selector: string, sceneEl: HTMLDivElement | null, duration = 500) => {
    if (!sceneEl || !stageRef.current) return;
    const target = sceneEl.querySelector(selector) as HTMLElement | null;
    if (!target) return;
    const t = target.getBoundingClientRect();
    const s = stageRef.current.getBoundingClientRect();
    const x = t.left - s.left + t.width / 2 - 7;
    const y = t.top - s.top + t.height / 2 - 7;
    setCursor({ x, y, visible: true, duration });
  };

  useEffect(() => {
    if (!isActive) return;
    // (cycle change re-triggers the loop)
    void cycle;
    // Reset state
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    setScene(0);
    setExiting(false);
    setChipSel([]);
    setChipPulse(null);
    setPlatSel([]);
    setPlatPulse(null);
    setGoalSel([]);
    setGoalPulse(null);
    setTaskState(Array(TASKS.length).fill("idle"));
    setTaskFill(Array(TASKS.length).fill(0));
    setScore(0);
    setRadarProgress(0);
    setInsightsShown(0);
    setCursor({ x: 340, y: 30, visible: false, duration: 0 });

    // ===== Scene 1 =====
    T(() => setCursor((c) => ({ ...c, visible: true, duration: 0 })), 250);
    T(() => moveCursorTo('[data-chip="1"]', scene1Ref.current, 450), 400);
    T(() => {
      setChipSel([1]);
      setChipPulse(1);
      T(() => setChipPulse(null), 500);
    }, 900);
    T(() => moveCursorTo('[data-platform="0"]', scene1Ref.current, 500), 1150);
    T(() => {
      setPlatSel((p) => [...p, 0]);
      setPlatPulse(0);
      T(() => setPlatPulse(null), 500);
    }, 1700);
    T(() => moveCursorTo('[data-platform="1"]', scene1Ref.current, 450), 1900);
    T(() => {
      setPlatSel((p) => [...p, 1]);
      setPlatPulse(1);
      T(() => setPlatPulse(null), 500);
    }, 2400);

    // Exit scene 1 -> scene 2
    T(() => setExiting(true), 2900);
    T(() => {
      setExiting(false);
      setScene(1);
    }, 2900 + 480);

    // ===== Scene 2 =====
    const s2Base = 2900 + 480;
    T(() => moveCursorTo('[data-goal="0"]', scene2Ref.current, 500), s2Base + 50);
    T(() => {
      setGoalSel((g) => [...g, 0]);
      setGoalPulse(0);
      T(() => setGoalPulse(null), 500);
    }, s2Base + 550);
    T(() => moveCursorTo('[data-goal="2"]', scene2Ref.current, 450), s2Base + 800);
    T(() => {
      setGoalSel((g) => [...g, 2]);
      setGoalPulse(2);
      T(() => setGoalPulse(null), 500);
    }, s2Base + 1300);
    T(() => moveCursorTo('[data-goal="4"]', scene2Ref.current, 450), s2Base + 1550);
    T(() => {
      setGoalSel((g) => [...g, 4]);
      setGoalPulse(4);
      T(() => setGoalPulse(null), 500);
    }, s2Base + 2050);

    // Exit scene 2 -> scene 3
    const s2Exit = s2Base + 2500;
    T(() => setExiting(true), s2Exit);
    T(() => {
      setExiting(false);
      setScene(2);
      setCursor((c) => ({ ...c, visible: false }));
    }, s2Exit + 480);

    // ===== Scene 3 =====
    const s3Base = s2Exit + 480;
    const TASK_DURATION = 520;
    TASKS.forEach((_, i) => {
      const startAt = s3Base + i * TASK_DURATION;
      T(() => {
        setTaskState((prev) => {
          const next = [...prev];
          next[i] = "active";
          return next;
        });
        // start fill
        T(() => {
          setTaskFill((prev) => {
            const next = [...prev];
            next[i] = 100;
            return next;
          });
        }, 20);
      }, startAt);
      T(() => {
        setTaskState((prev) => {
          const next = [...prev];
          next[i] = "done";
          return next;
        });
      }, startAt + TASK_DURATION);
    });

    // Exit scene 3 -> scene 4
    const s3End = s3Base + TASKS.length * TASK_DURATION + 280;
    T(() => setExiting(true), s3End);
    T(() => {
      setExiting(false);
      setScene(3);
    }, s3End + 480);

    // ===== Scene 4 =====
    const s4Base = s3End + 480;
    // Score counter
    T(() => {
      const start = performance.now();
      const dur = 1100;
      const target = 41;
      const tick = (now: number) => {
        const t = Math.min((now - start) / dur, 1);
        const e = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        setScore(Math.floor(e * target));
        if (t < 1) rafRef.current = requestAnimationFrame(tick);
        else setScore(target);
      };
      rafRef.current = requestAnimationFrame(tick);
    }, s4Base + 100);

    // Radar
    T(() => {
      const start = performance.now();
      const dur = 900;
      const tick = (now: number) => {
        const t = Math.min((now - start) / dur, 1);
        const e = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        setRadarProgress(e);
        if (t < 1) rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    }, s4Base + 300);

    // Insights staggered
    for (let i = 0; i < 6; i++) {
      T(() => setInsightsShown((n) => Math.max(n, i + 1)), s4Base + 500 + i * 130);
    }

    // Hold scene 4, then loop
    T(() => setCycle((c) => c + 1), s4Base + 500 + 6 * 130 + 3500);

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isActive, cycle]);

  const axisEnds = buildAxisEnds();

  return (
    <div
      ref={stageRef}
      className="relative h-full w-full overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #E6F4FD 0%, #C8EBFB 100%)",
        fontFamily:
          "'Segoe UI', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
      }}
    >
      {/* Decorative orbs */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: 100,
          height: 100,
          top: -30,
          right: -30,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)",
          animation: "step2Orb 8s ease-in-out infinite",
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          width: 140,
          height: 140,
          bottom: -50,
          left: -50,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)",
          animation: "step2Orb 8s ease-in-out infinite",
          animationDelay: "-4s",
        }}
      />
      {/* Soft highlights */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.5) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.25) 0%, transparent 50%)",
        }}
      />

      <style>{`
        @keyframes step2Orb { 0%,100% { transform: translate(0,0); } 50% { transform: translate(10px,-10px); } }
        @keyframes step2Pulse {
          0% { transform: scale(1); }
          40% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
        @keyframes step2InsightIn {
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 767px) {
          .step2-radar { display: none !important; }
          .step2-insights-grid {
            grid-template-columns: 1fr !important;
            gap: 6px !important;
          }
          .step2-insight-col {
            flex-direction: row !important;
            gap: 5px !important;
          }
          .step2-insight-title { display: none !important; }
          .step2-insight-item { flex: 1 1 0 !important; min-width: 0 !important; }
        }
      `}</style>

      {/* Cursor */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: 14,
          height: 14,
          zIndex: 100,
          left: cursor.x,
          top: cursor.y,
          opacity: cursor.visible ? 1 : 0,
          transition:
            cursor.duration > 0
              ? `left ${cursor.duration}ms cubic-bezier(0.4,0,0.2,1), top ${cursor.duration}ms cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease`
              : "opacity 0.3s ease",
          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
        }}
      >
        <svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" width="14" height="14">
          <path
            d="M3 2 L3 14 L6.5 10.5 L8.5 15 L10.5 14 L8.5 9.5 L13.5 9.5 Z"
            fill="#1a2332"
            stroke="#ffffff"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Scene 1 */}
      <SceneWrap active={scene === 0 && !exiting} exit={scene === 0 && exiting} ref={scene1Ref}>
        <StepHeader
          label="Step 2 of 4"
          title={
            <>
              Set your <span style={{ color: "#00A8E8" }}>preferences</span>
            </>
          }
          desc="Tell Isla how you want to show up online."
        />
        <div className="text-[10px] font-bold text-[#1a2332] mb-[7px]">Time commitment</div>
        <div className="flex gap-[6px] mb-[14px]">
          {TIME_CHIPS.map((c, i) => {
            const sel = chipSel.includes(i);
            return (
              <div
                key={i}
                data-chip={i}
                style={{
                  background: sel ? "#00A8E8" : "#fff",
                  color: sel ? "#fff" : "#1a2332",
                  border: `1.5px solid ${sel ? "#00A8E8" : "rgba(26,35,50,0.08)"}`,
                  boxShadow: sel
                    ? "0 2px 8px rgba(0,168,232,0.3)"
                    : "0 1px 3px rgba(20,40,70,0.04)",
                  animation:
                    chipPulse === i ? "step2Pulse 0.5s cubic-bezier(0.34,1.4,0.5,1)" : undefined,
                  transition: "all 0.25s ease",
                }}
                className="rounded-lg px-3 py-1.5 text-[10px] font-semibold"
              >
                {c}
              </div>
            );
          })}
        </div>
        <div className="text-[10px] font-bold text-[#1a2332] mb-[7px]">Platform</div>
        <div className="grid grid-cols-2 gap-[6px]">
          {PLATFORMS.map((p, i) => {
            const sel = platSel.includes(i);
            return (
              <div
                key={i}
                data-platform={i}
                style={{
                  background: sel ? "#f0fbff" : "#fff",
                  border: `1.5px solid ${sel ? "#00A8E8" : "rgba(26,35,50,0.08)"}`,
                  color: p.soon ? "#9ba7b8" : "#1a2332",
                  animation:
                    platPulse === i ? "step2Pulse 0.5s cubic-bezier(0.34,1.4,0.5,1)" : undefined,
                  transition: "all 0.25s ease",
                  boxShadow: "0 1px 3px rgba(20,40,70,0.04)",
                }}
                className="rounded-lg px-2.5 py-[7px] flex items-center gap-[7px] text-[10px] font-semibold"
              >
                <CheckDot active={sel} muted={p.soon} />
                <span>{p.label}</span>
                {p.soon && (
                  <span
                    style={{
                      background: "#eff2f5",
                      color: "#9ba7b8",
                      letterSpacing: "0.4px",
                    }}
                    className="ml-auto rounded-[4px] px-[5px] py-[2px] text-[7.5px] font-bold"
                  >
                    SOON
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </SceneWrap>

      {/* Scene 2 */}
      <SceneWrap active={scene === 1 && !exiting} exit={scene === 1 && exiting} ref={scene2Ref}>
        <StepHeader
          label="Step 3 of 4"
          title={
            <>
              Your <span style={{ color: "#00A8E8" }}>main goals</span>
            </>
          }
          desc="Pick what you want to achieve with Isla."
        />
        <div className="grid grid-cols-2 gap-[6px]">
          {GOALS.map((g, i) => {
            const sel = goalSel.includes(i);
            return (
              <div
                key={i}
                data-goal={i}
                style={{
                  background: sel ? "#f0fbff" : "#fff",
                  border: `1.5px solid ${sel ? "#00A8E8" : "rgba(26,35,50,0.08)"}`,
                  animation:
                    goalPulse === i ? "step2Pulse 0.5s cubic-bezier(0.34,1.4,0.5,1)" : undefined,
                  transition: "all 0.25s ease",
                  boxShadow: "0 1px 3px rgba(20,40,70,0.04)",
                  minHeight: 30,
                }}
                className="rounded-lg px-[9px] py-[7px] flex items-center gap-[6px] text-[9.5px] font-semibold text-[#1a2332]"
              >
                <CheckDot active={sel} />
                <span className="text-[11px] leading-none">{g.emoji}</span>
                <span className="leading-tight">{g.text}</span>
              </div>
            );
          })}
        </div>
      </SceneWrap>

      {/* Scene 3 */}
      <SceneWrap active={scene === 2 && !exiting} exit={scene === 2 && exiting}>
        <div
          className="text-[9px] font-bold uppercase mb-[6px]"
          style={{ color: "#00A8E8", letterSpacing: "1.8px" }}
        >
          Analyzing…
        </div>
        <div
          className="text-[18px] font-bold mb-[3px]"
          style={{ color: "#1a2332", letterSpacing: "-0.3px" }}
        >
          Building your <span style={{ color: "#00A8E8" }}>strategy</span>
        </div>
        <div className="text-[10px] mb-[14px] font-medium" style={{ color: "#7a8799", lineHeight: 1.4 }}>
          Isla is scanning your LinkedIn presence and generating your personalized brand strategy.
        </div>
        <div className="flex flex-col gap-[9px] mt-1">
          {TASKS.map((t, i) => {
            const state = taskState[i];
            return (
              <div
                key={i}
                className="grid items-center gap-[9px]"
                style={{
                  gridTemplateColumns: "14px 1fr 100px",
                  opacity: state === "idle" ? 0.42 : 1,
                  transition: "opacity 0.35s ease",
                }}
              >
                <TaskCheck state={state} />
                <div
                  className="text-[10px] font-semibold truncate"
                  style={{ color: "#1a2332" }}
                >
                  {t}
                </div>
                <div
                  className="relative overflow-hidden"
                  style={{ height: 3, background: "#dfe6ee", borderRadius: 2 }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: `${taskFill[i]}%`,
                      background: "#00A8E8",
                      borderRadius: 2,
                      transition: "width 520ms linear",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </SceneWrap>

      {/* Scene 4 */}
      <SceneWrap active={scene === 3 && !exiting} exit={scene === 3 && exiting} padding="16px">
        <div
          className="flex flex-col h-full"
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: "12px 14px",
            boxShadow:
              "0 10px 30px rgba(20,40,70,0.10), 0 2px 6px rgba(20,40,70,0.05)",
          }}
        >
          <div className="flex items-center gap-[5px] px-0.5 mb-[10px]">
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f57" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#febc2e" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#28c840" }} />
            <span className="ml-1.5 text-[9px] font-medium" style={{ color: "#9ba7b8" }}>
              isla.app
            </span>
          </div>
          <div className="flex items-center gap-[9px] mb-[10px]">
            <div
              className="flex items-center justify-center text-white font-bold"
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "#0A7A9F",
                fontSize: 11,
              }}
            >
              E
            </div>
            <div>
              <div className="text-[11px] font-bold leading-tight" style={{ color: "#1a2332" }}>
                Eduardo Schuch
              </div>
              <div className="text-[9px] font-medium mt-[1px]" style={{ color: "#7a8799" }}>
                Founder of Isla 🏝️ | MIT
              </div>
            </div>
          </div>

          <div
            className="grid gap-2 flex-1 min-h-0 step2-insights-grid"
            style={{ gridTemplateColumns: "132px 1fr 1fr" }}
          >
            {/* Score */}
            <div className="flex flex-col">
              <div
                className="flex flex-col h-full"
                style={{ background: "#f0fbff", borderRadius: 8, padding: "8px 9px 7px" }}
              >
                <div className="text-[8.5px] font-bold mb-0.5" style={{ color: "#1a2332" }}>
                  Authority Score
                </div>
                <div
                  className="font-bold tabular-nums leading-none"
                  style={{ color: "#00A8E8", fontSize: 22, letterSpacing: "-0.8px" }}
                >
                  {score}
                  <span
                    className="font-semibold"
                    style={{ color: "#1a2332", fontSize: 11, marginLeft: 1 }}
                  >
                    /100
                  </span>
                </div>
                <div className="text-[7.5px] mt-1 font-medium" style={{ color: "#7a8799" }}>
                  📈 Top <b style={{ color: "#1a2332" }}>60%</b> of founders
                </div>
                <div className="flex-1 flex items-center justify-center pt-0.5 step2-radar">
                  <svg
                    viewBox="0 0 110 110"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: "100%", maxHeight: 130, marginTop: -4 }}
                  >
                    <g stroke="#d5dde7" strokeWidth="0.5" fill="none">
                      {[1, 2, 3, 4].map((lvl) => (
                        <polygon key={lvl} points={buildRingPoints(lvl)} />
                      ))}
                    </g>
                    <g stroke="#d5dde7" strokeWidth="0.5">
                      {axisEnds.map((p, i) => (
                        <line
                          key={i}
                          x1={RADAR_CX}
                          y1={RADAR_CY}
                          x2={p.x.toFixed(2)}
                          y2={p.y.toFixed(2)}
                        />
                      ))}
                    </g>
                    <polygon
                      points={radarPointsAt(radarProgress)}
                      fill="rgba(0,168,232,0.35)"
                      stroke="#00A8E8"
                      strokeWidth="1.2"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Strengths */}
            <InsightCol title="Hidden Strengths" items={STRENGTHS} type="strength" shown={insightsShown} offset={0} />
            {/* Blind */}
            <InsightCol title="Blind Spots" items={BLINDS} type="blind" shown={insightsShown} offset={3} />
          </div>
        </div>
      </SceneWrap>
    </div>
  );
}

function CheckDot({ active, muted }: { active: boolean; muted?: boolean }) {
  return (
    <div
      style={{
        width: 13,
        height: 13,
        borderRadius: "50%",
        border: `1.3px solid ${active ? "#00A8E8" : muted ? "#d6dde6" : "#cbd5dc"}`,
        background: active ? "#00A8E8" : "transparent",
        position: "relative",
        flexShrink: 0,
        transition: "all 0.25s ease",
      }}
    >
      {active && (
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 5,
            height: 3,
            borderLeft: "1.3px solid #fff",
            borderBottom: "1.3px solid #fff",
            transform: "translate(-55%,-70%) rotate(-45deg)",
          }}
        />
      )}
    </div>
  );
}

function TaskCheck({ state }: { state: "idle" | "active" | "done" }) {
  const isDone = state === "done";
  const isActive = state === "active";
  return (
    <div
      style={{
        width: 14,
        height: 14,
        borderRadius: "50%",
        border: `${isActive ? 1.5 : 1.3}px solid ${
          isDone ? "#10b981" : isActive ? "#00A8E8" : "#cbd5dc"
        }`,
        background: isDone ? "#10b981" : "transparent",
        position: "relative",
        flexShrink: 0,
        transition: "all 0.3s ease",
      }}
    >
      {isDone && (
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 5.5,
            height: 3,
            borderLeft: "1.3px solid #fff",
            borderBottom: "1.3px solid #fff",
            transform: "translate(-55%,-75%) rotate(-45deg)",
          }}
        />
      )}
    </div>
  );
}

function InsightCol({
  title,
  items,
  type,
  shown,
  offset,
}: {
  title: string;
  items: { icon: string; title: string; desc: string }[];
  type: "strength" | "blind";
  shown: number;
  offset: number;
}) {
  return (
    <div className="flex flex-col gap-[5px] min-w-0 step2-insight-col">
      <div className="text-[8.5px] font-bold mb-0.5 step2-insight-title" style={{ color: "#1a2332" }}>
        {title}
      </div>
      {items.map((it, i) => {
        const isShown = shown > offset + i;
        return (
          <div
            key={i}
            className="step2-insight-item"
            style={{
              background: type === "strength" ? "#f0fbff" : "#fef2f2",
              borderRadius: 6,
              padding: "6px 7px",
              display: "flex",
              gap: 5,
              opacity: isShown ? 1 : 0,
              transform: isShown ? "translateY(0)" : "translateY(4px)",
              transition: "opacity 0.35s cubic-bezier(0.34,1.3,0.5,1), transform 0.35s cubic-bezier(0.34,1.3,0.5,1)",
            }}
          >
            <span style={{ fontSize: 10, lineHeight: 1.1, flexShrink: 0 }}>{it.icon}</span>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div
                className="font-bold"
                style={{ fontSize: 8.5, color: "#1a2332", lineHeight: 1.1, marginBottom: 1.5 }}
              >
                {it.title}
              </div>
              <div
                className="font-medium"
                style={{ fontSize: 7.5, color: "#7a8799", lineHeight: 1.3 }}
              >
                {it.desc}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function StepHeader({
  label,
  title,
  desc,
}: {
  label: string;
  title: React.ReactNode;
  desc: string;
}) {
  return (
    <>
      <div
        className="text-[9px] font-bold uppercase mb-1"
        style={{ color: "#00A8E8", letterSpacing: "1.8px" }}
      >
        {label}
      </div>
      <div
        className="text-[18px] font-bold mb-[3px]"
        style={{ color: "#1a2332", letterSpacing: "-0.3px" }}
      >
        {title}
      </div>
      <div className="text-[10px] mb-[14px] font-medium" style={{ color: "#7a8799", lineHeight: 1.4 }}>
        {desc}
      </div>
    </>
  );
}

type SceneWrapProps = {
  active: boolean;
  exit: boolean;
  children: React.ReactNode;
  padding?: string;
};

const SceneWrap = forwardRef<HTMLDivElement, SceneWrapProps>(
  ({ active, exit, children, padding = "22px 26px" }, ref) => (
    <div
      ref={ref}
      className="absolute inset-0 flex flex-col"
      style={{
        padding,
        zIndex: 2,
        opacity: active ? 1 : 0,
        transform: exit ? "translateY(-8px)" : active ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        pointerEvents: active ? "auto" : "none",
      }}
    >
      {children}
    </div>
  ),
);
SceneWrap.displayName = "SceneWrap";
