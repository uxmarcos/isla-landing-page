import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";

// ─── Constants ───────────────────────────────────────────────────────────────

const LOOP_MS = 9200;
const BASE_W = 492;
const BASE_H = 362;

type ScoreKey = "cold" | "cool" | "warm" | "hot" | "hero";

interface AvatarDef {
  cls: string;
  initials: string;
  scoreClass: ScoreKey;
  target: number;
  scoreDelay: number;
}

const AVATARS: AvatarDef[] = [
  { cls: "av1", initials: "JM", scoreClass: "warm", target: 7.2, scoreDelay: 3.2 },
  { cls: "av2", initials: "AK", scoreClass: "cool", target: 6.4, scoreDelay: 3.3 },
  { cls: "av3", initials: "SR", scoreClass: "hero", target: 9.9, scoreDelay: 3.9 },
  { cls: "av4", initials: "TP", scoreClass: "hot", target: 8.5, scoreDelay: 3.5 },
  { cls: "av5", initials: "LB", scoreClass: "cool", target: 5.8, scoreDelay: 3.6 },
  { cls: "av6", initials: "MC", scoreClass: "warm", target: 7.6, scoreDelay: 3.7 },
  { cls: "av7", initials: "DW", scoreClass: "hot", target: 8.1, scoreDelay: 3.4 },
  { cls: "av8", initials: "EF", scoreClass: "cool", target: 6.9, scoreDelay: 3.8 },
];

const AV_CONFIG: Record<string, { px: number; py: number; spawnDelay: number; bg: string }> = {
  av1: { px: -180, py: -85, spawnDelay: 0.55, bg: "linear-gradient(135deg,#ffffff,#e2ebf3)" },
  av2: { px: 175, py: -90, spawnDelay: 0.8, bg: "linear-gradient(135deg,#f0f4f8,#d2dce7)" },
  av3: { px: -105, py: -15, spawnDelay: 2.3, bg: "linear-gradient(135deg,#ffffff,#e8eef4)" },
  av4: { px: 115, py: -5, spawnDelay: 1.05, bg: "linear-gradient(135deg,#e5ecf2,#c8d3de)" },
  av5: { px: -195, py: 75, spawnDelay: 1.3, bg: "linear-gradient(135deg,#ffffff,#dde6ee)" },
  av6: { px: 185, py: 80, spawnDelay: 1.55, bg: "linear-gradient(135deg,#edf2f7,#d0dae4)" },
  av7: { px: 15, py: -115, spawnDelay: 1.8, bg: "linear-gradient(135deg,#ffffff,#e0e8f0)" },
  av8: { px: -25, py: 105, spawnDelay: 2.05, bg: "linear-gradient(135deg,#dde6ee,#bac6d2)" },
};

const GHOST_AVATARS = [
  { id: "g1", initials: "BT", px: -90, py: -110, spawnDelay: 0.45, bg: "linear-gradient(135deg,#e8eef4,#d0dae4)" },
  { id: "g2", initials: "PL", px: 90, py: -110, spawnDelay: 0.6, bg: "linear-gradient(135deg,#edf2f7,#c8d3de)" },
  { id: "g3", initials: "YH", px: 200, py: -30, spawnDelay: 0.7, bg: "linear-gradient(135deg,#e2ebf3,#bac6d2)" },
  { id: "g4", initials: "KR", px: 160, py: -65, spawnDelay: 0.9, bg: "linear-gradient(135deg,#f0f4f8,#d2dce7)" },
  { id: "g5", initials: "NW", px: -60, py: 115, spawnDelay: 0.65, bg: "linear-gradient(135deg,#dde6ee,#c0cdd8)" },
  { id: "g6", initials: "CT", px: 60, py: 120, spawnDelay: 0.75, bg: "linear-gradient(135deg,#e5ecf2,#cad5df)" },
  { id: "g7", initials: "FD", px: -155, py: 20, spawnDelay: 0.85, bg: "linear-gradient(135deg,#f0f4f8,#d8e2ec)" },
  { id: "g8", initials: "OZ", px: 155, py: 35, spawnDelay: 0.95, bg: "linear-gradient(135deg,#edf2f7,#c8d3de)" },
  { id: "g9", initials: "VN", px: -155, py: -50, spawnDelay: 1.1, bg: "linear-gradient(135deg,#e8eef4,#d0dae4)" },
  { id: "g10", initials: "QB", px: -10, py: -95, spawnDelay: 1.2, bg: "linear-gradient(135deg,#f0f4f8,#d2dce7)" },
  { id: "g11", initials: "IM", px: 110, py: 80, spawnDelay: 1.35, bg: "linear-gradient(135deg,#dde6ee,#bac6d2)" },
  { id: "g12", initials: "XP", px: -110, py: 80, spawnDelay: 1.45, bg: "linear-gradient(135deg,#e2ebf3,#c8d3de)" },
];

const SCORE_STYLES: Record<ScoreKey, { bg: string; color: string; shadow?: string }> = {
  cold: { bg: "#ef4444", color: "#ffffff" },
  cool: { bg: "#f59e0b", color: "#ffffff" },
  warm: { bg: "#eab308", color: "#1a2332" },
  hot: { bg: "#84cc16", color: "#0f1f10" },
  hero: { bg: "#10b981", color: "#ffffff", shadow: "0 2px 10px rgba(16,185,129,0.6)" },
};

const ACTIVITY_BARS = [
  { h: 6, hot: false }, { h: 11, hot: false }, { h: 8, hot: false },
  { h: 14, hot: true }, { h: 10, hot: false }, { h: 16, hot: true },
  { h: 7, hot: false },
];

// ─── Easing ──────────────────────────────────────────────────────────────────

const easeOutExpo = (p: number) => (p === 1 ? 1 : 1 - Math.pow(2, -10 * p));
const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3);

// ─── Scene ───────────────────────────────────────────────────────────────────

function Scene() {
  const counterRef = useRef<HTMLDivElement | null>(null);
  const scoreRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const rafs = useRef<number[]>([]);

  useEffect(() => {
    const s0 = performance.now();
    function tickCounter(now: number) {
      const el = counterRef.current;
      if (!el) return;
      const elapsed = now - s0 - 300;
      if (elapsed < 0) {
        el.textContent = "0";
        rafs.current.push(requestAnimationFrame(tickCounter));
        return;
      }
      const p = Math.min(elapsed / 2500, 1);
      el.textContent = Math.floor(easeOutExpo(p) * 1200).toLocaleString();
      if (p < 1) rafs.current.push(requestAnimationFrame(tickCounter));
      else el.textContent = "1,200";
    }
    rafs.current.push(requestAnimationFrame(tickCounter));

    AVATARS.forEach(({ cls, target, scoreDelay }) => {
      const delayMs = scoreDelay * 1000;
      const s1 = performance.now();
      function tickScore(now: number) {
        const el = scoreRefs.current[cls];
        if (!el) return;
        const elapsed = now - s1 - delayMs;
        if (elapsed < 0) {
          el.textContent = "0.0";
          rafs.current.push(requestAnimationFrame(tickScore));
          return;
        }
        const p = Math.min(elapsed / 600, 1);
        el.textContent = (easeOutCubic(p) * target).toFixed(1);
        if (p < 1) rafs.current.push(requestAnimationFrame(tickScore));
        else el.textContent = target.toFixed(1);
      }
      rafs.current.push(requestAnimationFrame(tickScore));
    });

    const captured = rafs.current;
    return () => captured.forEach(cancelAnimationFrame);
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
      {/* Label bar */}
      <div style={{ position: "absolute", top: 18, left: 20, height: 14, display: "flex", alignItems: "center", gap: 6, zIndex: 10 }}>
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#1a2332", opacity: 0, animation: "dotIn 0.4s ease-out 0.2s forwards" }} />
        {[
          { text: "ANALYZING FEED", anim: "lblShow 2.7s ease 0.3s forwards" },
          { text: "SCORING LEADS", anim: "lblShow 1.9s ease 3.2s forwards" },
          { text: "WARM LEAD FOUND", anim: "lblShow 3.9s ease 5.3s forwards" },
        ].map((l, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              left: 14,
              fontSize: 9,
              fontWeight: 700,
              color: "#1a2332",
              letterSpacing: "1.6px",
              textTransform: "uppercase",
              opacity: 0,
              whiteSpace: "nowrap",
              animation: l.anim,
            }}
          >
            {l.text}
          </span>
        ))}
      </div>

      {/* Central metric */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          textAlign: "center",
          opacity: 0,
          zIndex: 4,
          animation:
            "metricIn 0.5s cubic-bezier(0.2,0.8,0.3,1) 0.3s forwards, metricOut 0.6s cubic-bezier(0.4,0,0.8,0.4) 3s forwards",
        }}
      >
        <div style={{ fontSize: 8, fontWeight: 600, color: "#4a5766", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 5, opacity: 0.7 }}>
          Impressions
        </div>
        <div
          ref={counterRef}
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "#1a2332",
            letterSpacing: -2,
            lineHeight: 1,
            textShadow: "0 2px 10px rgba(30,60,100,0.08)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          0
        </div>
        <div
          style={{
            fontSize: 9,
            color: "#6b7a8c",
            marginTop: 5,
            fontWeight: 500,
            opacity: 0,
            animation: "subIn 0.4s ease-out 1.8s forwards",
          }}
        >
          +24% this week
        </div>
      </div>

      {/* Ghost avatars */}
      {GHOST_AVATARS.map(({ id, initials, px, py, spawnDelay, bg }) => (
        <div
          key={id}
          style={{
            position: "absolute",
            width: 34,
            height: 34,
            borderRadius: "50%",
            left: "50%",
            top: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#6b7a8c",
            fontSize: 9.5,
            fontWeight: 700,
            letterSpacing: "0.3px",
            border: "1.5px solid rgba(255,255,255,0.7)",
            opacity: 0,
            zIndex: 2,
            background: bg,
            ["--px" as string]: `${px}px`,
            ["--py" as string]: `${py}px`,
            animation: `ghostSpawn 0.55s cubic-bezier(0.34,1.4,0.64,1) ${spawnDelay}s forwards, ghostDim 0.5s cubic-bezier(0.4,0,0.6,1) 5.6s forwards`,
          } as CSSProperties}
        >
          {initials}
        </div>
      ))}

      {/* Avatars */}
      {AVATARS.map(({ cls, initials, scoreClass, scoreDelay }) => {
        const cfg = AV_CONFIG[cls];
        const sc = SCORE_STYLES[scoreClass];
        const isHero = cls === "av3";

        const spawnAnim = `avSpawn 0.65s cubic-bezier(0.34,1.5,0.64,1) ${cfg.spawnDelay}s forwards`;
        const dimAnim = `avDim 0.5s cubic-bezier(0.4,0,0.6,1) 5.6s forwards`;
        const heroAnim = `avSpawn 0.65s cubic-bezier(0.34,1.5,0.64,1) ${cfg.spawnDelay}s forwards, heroZoom 1s cubic-bezier(0.34,1.2,0.5,1) 5.5s forwards`;

        return (
          <div
            key={cls}
            style={{
              position: "absolute",
              width: 40,
              height: 40,
              borderRadius: "50%",
              left: "50%",
              top: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#3a4556",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.3px",
              boxShadow: "0 4px 14px rgba(20,40,70,0.18)",
              border: "2px solid rgba(255,255,255,0.95)",
              opacity: 0,
              zIndex: 3,
              background: cfg.bg,
              ["--px" as string]: `${cfg.px}px`,
              ["--py" as string]: `${cfg.py}px`,
              animation: isHero ? heroAnim : `${spawnAnim}, ${dimAnim}`,
            } as CSSProperties}
          >
            {initials}
            <div
              ref={(el) => {
                scoreRefs.current[cls] = el;
              }}
              style={{
                position: "absolute",
                fontSize: 9.5,
                fontWeight: 800,
                padding: "3px 7px",
                borderRadius: 10,
                top: -7,
                right: -14,
                opacity: 0,
                transform: "scale(0) translateY(5px)",
                fontVariantNumeric: "tabular-nums",
                letterSpacing: "-0.2px",
                whiteSpace: "nowrap",
                background: sc.bg,
                color: sc.color,
                boxShadow: sc.shadow || "0 2px 6px rgba(20,40,70,0.25)",
                animation: `scoreCount 0.6s cubic-bezier(0.34,1.6,0.64,1) ${scoreDelay}s forwards`,
              }}
            >
              0.0
            </div>
          </div>
        );
      })}

      {/* Hero pulse ring */}
      <div
        style={{
          position: "absolute",
          left: "calc(50% - 115px)",
          top: "50%",
          width: 66,
          height: 66,
          borderRadius: "50%",
          border: "2px solid rgba(16,185,129,0.5)",
          transform: "translate(-50%,-50%) scale(0)",
          opacity: 0,
          animation: "ringPulse 2s ease-out 6s infinite",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Details card */}
      <div
        style={{
          position: "absolute",
          right: 26,
          top: "50%",
          transform: "translateY(-50%) translateX(25px)",
          width: 185,
          background: "#ffffff",
          borderRadius: 10,
          padding: "13px 14px",
          boxShadow: "0 10px 30px rgba(20,40,70,0.18),0 2px 6px rgba(20,40,70,0.08)",
          opacity: 0,
          zIndex: 5,
          animation:
            "cardIn 0.55s cubic-bezier(0.2,0.9,0.3,1) 5.9s forwards, cardOut 0.35s cubic-bezier(0.4,0,0.8,0.4) 8.7s forwards",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 11,
            right: 12,
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#10b981",
            animation: "livePulse 1.6s ease-in-out infinite",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 9 }}>
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#1a2332,#3a4556)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 9,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            SR
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1a2332", letterSpacing: "-0.2px", lineHeight: 1.1 }}>Sarah Reynolds</div>
            <div style={{ fontSize: 8.5, color: "#7a8799", marginTop: 2, letterSpacing: "0.1px", fontWeight: 500 }}>VP Marketing · Acme</div>
          </div>
        </div>

        <div style={{ height: 1, background: "linear-gradient(90deg,transparent,#e2e8ef,transparent)", margin: "8px 0" }} />

        <div style={{ fontSize: 9.5, color: "#1a2332", display: "flex", alignItems: "center", gap: 6, fontWeight: 600 }}>
          <div
            style={{
              width: 12,
              height: 12,
              background: "#10b981",
              borderRadius: "50%",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <div style={{ width: 5, height: 3, borderLeft: "1.5px solid white", borderBottom: "1.5px solid white", transform: "rotate(-45deg) translateY(-1px)" }} />
          </div>
          <span>High ICP match</span>
          <div
            style={{
              background: "#10b981",
              color: "#ffffff",
              fontSize: 8.5,
              fontWeight: 800,
              padding: "2px 6px",
              borderRadius: 8,
              marginLeft: "auto",
              letterSpacing: "-0.2px",
            }}
          >
            9.9
          </div>
        </div>

        <div style={{ marginTop: 9 }}>
          <div style={{ fontSize: 7.5, color: "#9ba7b8", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600, marginBottom: 4 }}>
            Warm Signals
          </div>
          <div style={{ display: "flex", gap: 2.5, height: 16, alignItems: "flex-end" }}>
            {ACTIVITY_BARS.map((bar, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: bar.hot ? "#10b981" : "#e2e8ef",
                  borderRadius: 1,
                  height: 0,
                  ["--ah" as string]: `${bar.h}px`,
                  animation: `actGrow 0.4s cubic-bezier(0.34,1.3,0.64,1) ${6.35 + i * 0.05}s forwards`,
                } as CSSProperties}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Root ────────────────────────────────────────────────────────────────────

interface Props {
  className?: string;
}

export function AnimationPlaceholderAnalytics({ className = "" }: Props) {
  const [loopKey, setLoopKey] = useState(0);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setLoopKey((k) => k + 1), LOOP_MS);
    return () => clearInterval(id);
  }, [inView]);

  useLayoutEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const compute = () => {
      const { width, height } = el.getBoundingClientRect();
      const s = Math.min(width / BASE_W, height / BASE_H);
      setScale(s);
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes orbFloat {
          0%,100% { transform:translate(0,0); }
          50%      { transform:translate(10px,-10px); }
        }
        @keyframes dotIn { to { opacity:1; } }
        @keyframes lblShow {
          0%   { opacity:0; transform:translateY(3px); }
          12%  { opacity:1; transform:translateY(0); }
          88%  { opacity:1; transform:translateY(0); }
          100% { opacity:0; transform:translateY(-3px); }
        }
        @keyframes metricIn {
          from { opacity:0; transform:translate(-50%,-46%) scale(0.85); }
          to   { opacity:1; transform:translate(-50%,-50%) scale(1); }
        }
        @keyframes metricOut {
          0%   { opacity:1; transform:translate(-50%,-50%) scale(1); filter:blur(0); }
          100% { opacity:0; transform:translate(-50%,-50%) scale(0.6); filter:blur(8px); }
        }
        @keyframes subIn {
          from { opacity:0; transform:translateY(3px); }
          to   { opacity:0.9; transform:translateY(0); }
        }
        @keyframes ghostSpawn {
          0%   { opacity:0; transform:translate(-50%,-50%) scale(0); }
          60%  { opacity:0.4; transform:translate(calc(-50% + var(--px)),calc(-50% + var(--py))) scale(1.1); }
          100% { opacity:0.4; transform:translate(calc(-50% + var(--px)),calc(-50% + var(--py))) scale(1); }
        }
        @keyframes ghostDim {
          to { opacity:0.12; filter:blur(2px);
               transform:translate(calc(-50% + var(--px)),calc(-50% + var(--py))) scale(0.82); }
        }
        @keyframes avSpawn {
          0%   { opacity:0; transform:translate(-50%,-50%) scale(0); }
          60%  { opacity:1; transform:translate(calc(-50% + var(--px)),calc(-50% + var(--py))) scale(1.15); }
          100% { opacity:1; transform:translate(calc(-50% + var(--px)),calc(-50% + var(--py))) scale(1); }
        }
        @keyframes avDim {
          to { opacity:0.22; filter:blur(1.5px);
               transform:translate(calc(-50% + var(--px)),calc(-50% + var(--py))) scale(0.85); }
        }
        @keyframes heroZoom {
          0%   { transform:translate(calc(-50% + var(--px)),calc(-50% + var(--py))) scale(1);
                 box-shadow:0 4px 14px rgba(20,40,70,0.18); }
          100% { transform:translate(calc(-50% + -115px),calc(-50% + 0px)) scale(1.65);
                 box-shadow:0 14px 38px rgba(16,185,129,0.5),0 0 0 3px rgba(255,255,255,0.95),0 0 0 6px rgba(16,185,129,0.3); }
        }
        @keyframes scoreCount {
          0%   { opacity:0; transform:scale(0) translateY(5px); }
          50%  { opacity:1; transform:scale(1.2) translateY(0); }
          100% { opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes ringPulse {
          0%   { transform:translate(-50%,-50%) scale(0.7); opacity:0.7; }
          100% { transform:translate(-50%,-50%) scale(2); opacity:0; }
        }
        @keyframes cardIn {
          to { opacity:1; transform:translateY(-50%) translateX(0); }
        }
        @keyframes cardOut {
          to { opacity:0; transform:translateY(-50%) translateX(15px) scale(0.95); }
        }
        @keyframes actGrow { to { height:var(--ah); } }
        @keyframes livePulse {
          0%,100% { box-shadow:0 0 0 0 rgba(16,185,129,0.5); }
          50%     { box-shadow:0 0 0 5px rgba(16,185,129,0); }
        }
      `}</style>

      <div
        ref={wrapperRef}
        className={`relative h-[260px] w-full overflow-hidden rounded-xl md:min-h-[363px] ${className}`}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: BASE_W,
            height: BASE_H,
            transform: `translate(-50%,-50%) scale(${scale})`,
            transformOrigin: "center center",
          }}
        >
          <div
            style={{
              width: BASE_W,
              height: BASE_H,
              background: "#C8EBFB",
              position: "relative",
              overflow: "hidden",
              borderRadius: 14,
              fontFamily: "'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                zIndex: 1,
                backgroundImage:
                  "radial-gradient(circle at 20% 20%,rgba(255,255,255,0.4) 0%,transparent 50%),radial-gradient(circle at 80% 80%,rgba(255,255,255,0.2) 0%,transparent 50%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                borderRadius: "50%",
                pointerEvents: "none",
                background: "radial-gradient(circle,rgba(255,255,255,0.5) 0%,transparent 70%)",
                width: 100,
                height: 100,
                top: -30,
                right: -30,
                animation: "orbFloat 8s ease-in-out infinite",
              }}
            />
            <div
              style={{
                position: "absolute",
                borderRadius: "50%",
                pointerEvents: "none",
                background: "radial-gradient(circle,rgba(255,255,255,0.5) 0%,transparent 70%)",
                width: 140,
                height: 140,
                bottom: -50,
                left: -50,
                animation: "orbFloat 8s ease-in-out -4s infinite",
              }}
            />
            {inView && <Scene key={loopKey} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default AnimationPlaceholderAnalytics;
