import { useEffect, useRef, useState } from "react";

interface Props {
  className?: string;
}

type StateKey = "pending" | "approved" | "posting" | "posted";
type DotKey = "pend" | "appr" | "post" | "draft";

const STATES: Record<StateKey, {
  badge: string;
  badgeC: string;
  btn: string;
  btnC: string;
  dot: DotKey;
  border: string;
  label: string;
}> = {
  pending: {
    badge: "rgba(245,158,11,0.15)",
    badgeC: "rgba(160,100,0,1)",
    btn: "rgba(245,158,11,0.12)",
    btnC: "rgba(160,100,0,1)",
    dot: "pend",
    border: "rgba(245,158,11,0.5)",
    label: "Pending Approval",
  },
  approved: {
    badge: "rgba(59,130,246,0.14)",
    badgeC: "rgba(25,75,175,1)",
    btn: "rgba(59,130,246,0.12)",
    btnC: "rgba(25,75,175,1)",
    dot: "appr",
    border: "rgba(59,130,246,0.55)",
    label: "Approved",
  },
  posting: {
    badge: "rgba(59,130,246,0.22)",
    badgeC: "rgba(15,55,155,1)",
    btn: "rgba(59,130,246,0.18)",
    btnC: "rgba(15,55,155,1)",
    dot: "appr",
    border: "rgba(59,130,246,0.7)",
    label: "Posting",
  },
  posted: {
    badge: "rgba(29,168,85,0.15)",
    badgeC: "rgba(14,95,46,1)",
    btn: "rgba(29,168,85,0.13)",
    btnC: "rgba(14,95,46,1)",
    dot: "post",
    border: "rgba(29,168,85,0.55)",
    label: "Posted",
  },
};

const dotColors: Record<DotKey, { border: string; bg: string }> = {
  pend: { border: "#F59E0B", bg: "rgba(245,158,11,0.15)" },
  appr: { border: "#3B82F6", bg: "rgba(59,130,246,0.2)" },
  post: { border: "#1DA855", bg: "#1DA855" },
  draft: { border: "rgba(0,0,0,0.18)", bg: "rgba(0,0,0,0.08)" },
};

const BASE_W = 492;
const BASE_H = 362;

function Dot({ type }: { type: DotKey }) {
  const c = dotColors[type];
  return (
    <div
      style={{
        width: 9,
        height: 9,
        borderRadius: "50%",
        border: `1.5px solid ${c.border}`,
        background: c.bg,
        flexShrink: 0,
      }}
    />
  );
}

function Bar({ width }: { width: string | number }) {
  return (
    <div
      style={{
        height: 4,
        borderRadius: 2,
        background: "rgba(0,0,0,0.09)",
        margin: "2px 0",
        width,
      }}
    />
  );
}

function Img() {
  return (
    <div
      style={{
        width: "100%",
        height: 22,
        background: "rgba(0,0,0,0.07)",
        borderRadius: 3,
        margin: "2px 0",
      }}
    />
  );
}

function Avatar() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 3 }}>
      <div
        style={{
          width: 9,
          height: 9,
          borderRadius: "50%",
          background: "rgba(0,0,0,0.14)",
          flexShrink: 0,
        }}
      />
      <div
        style={{
          height: 4,
          width: 28,
          background: "rgba(0,0,0,0.09)",
          borderRadius: 2,
        }}
      />
    </div>
  );
}

function LiIcon() {
  return (
    <div
      style={{
        width: 12,
        height: 12,
        background: "#0a66c2",
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontSize: 7,
        fontWeight: 900,
        lineHeight: 1,
        flexShrink: 0,
      }}
    >
      in
    </div>
  );
}

interface CardProps {
  time: string;
  dotType: DotKey;
  borderColor?: string;
  hasImg?: boolean;
  bars?: Array<string | number>;
  draft?: boolean;
  cardRef?: React.Ref<HTMLDivElement>;
  dotRef?: React.Ref<HTMLDivElement>;
}

function Card({ time, dotType, borderColor, hasImg, bars = [], draft = false, cardRef, dotRef }: CardProps) {
  return (
    <div
      ref={cardRef}
      style={{
        background: draft ? "rgba(255,255,255,0.55)" : "#fff",
        borderRadius: 7,
        padding: "5px 5px 4px",
        border: `1px ${draft ? "dashed" : "solid"} ${borderColor || "rgba(0,0,0,0.09)"}`,
        flexShrink: 0,
        transition: "border-color 0.35s",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 3 }}>
        <LiIcon />
        <span style={{ fontSize: 7.5, color: "rgba(0,0,0,0.38)" }}>{time}</span>
        <div ref={dotRef}>
          <Dot type={dotType} />
        </div>
      </div>
      {hasImg && <Img />}
      {bars.map((w, i) => <Bar key={i} width={w} />)}
      <Avatar />
    </div>
  );
}

function WaitingCard({ nameWidth }: { nameWidth: number }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.5)",
        border: "1.5px dashed rgba(0,0,0,0.14)",
        borderRadius: 7,
        padding: "5px 4px",
      }}
    >
      <div style={{ fontSize: 6.5, fontWeight: 700, color: "rgba(0,0,0,0.45)", marginBottom: 3 }}>Waiting</div>
      <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
        <div style={{ width: 9, height: 9, borderRadius: "50%", background: "rgba(0,0,0,0.14)" }} />
        <div style={{ height: 4, width: nameWidth, background: "rgba(0,0,0,0.09)", borderRadius: 2 }} />
      </div>
    </div>
  );
}

export function AnimationPlaceholderCalendar({ className = "" }: Props) {
  const outerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const calwRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const fcRef = useRef<HTMLDivElement>(null);
  const fbadgeRef = useRef<HTMLSpanElement>(null);
  const fbtnRef = useRef<HTMLDivElement>(null);
  const tcRef = useRef<HTMLDivElement>(null);
  const tdotRef = useRef<HTMLDivElement>(null);
  const prRef = useRef<HTMLDivElement>(null);
  const floatCardsRef = useRef<HTMLDivElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const [inView, setInView] = useState(false);

  // Trigger animations only when scrolled into view
  useEffect(() => {
    const el = outerRef.current;
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

  // Responsive scaling: fit BASE_W x BASE_H into the container
  useEffect(() => {
    const outer = outerRef.current;
    const stage = stageRef.current;
    if (!outer || !stage) return;
    const apply = () => {
      const w = outer.clientWidth;
      const h = outer.clientHeight;
      const scale = Math.min(w / BASE_W, h / BASE_H);
      stage.style.transform = `translate(-50%, -50%) scale(${scale})`;
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(outer);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

    function applyState(key: StateKey) {
      const s = STATES[key];
      if (fbadgeRef.current) {
        fbadgeRef.current.style.background = s.badge;
        fbadgeRef.current.style.color = s.badgeC;
        fbadgeRef.current.textContent = s.label;
      }
      if (fbtnRef.current) {
        fbtnRef.current.style.background = s.btn;
        fbtnRef.current.style.color = s.btnC;
        fbtnRef.current.textContent = s.label;
      }
      if (tdotRef.current) {
        const c = dotColors[s.dot];
        const d = tdotRef.current.querySelector("div") as HTMLDivElement | null;
        if (d) {
          d.style.borderColor = c.border;
          d.style.background = c.bg;
        }
      }
      if (tcRef.current) {
        tcRef.current.style.borderColor = s.border;
      }
    }

    function getCenter(el: HTMLElement) {
      const wr = wrapRef.current!.getBoundingClientRect();
      const er = el.getBoundingClientRect();
      // Note: parent uses CSS transform scale, but rects are in screen px;
      // since both wr and er share the same scale, the offset within wrap is also scaled.
      // We need coords in the wrap's untransformed coordinate space.
      const scaleX = wr.width / BASE_W;
      const scaleY = wr.height / BASE_H;
      return {
        x: (er.left - wr.left + er.width / 2) / scaleX,
        y: (er.top - wr.top + er.height / 2) / scaleY,
      };
    }

    function pulse() {
      if (!tcRef.current || !prRef.current) return;
      const c = getCenter(tcRef.current);
      const s = 14;
      const pr = prRef.current;
      pr.style.cssText = `position:absolute;left:${c.x - s}px;top:${c.y - s}px;width:${s * 2}px;height:${s * 2}px;border-radius:50%;border:1.5px solid rgba(29,168,85,0.65);opacity:1;pointer-events:none;transform:scale(1);transition:none`;
      requestAnimationFrame(() => {
        pr.style.transition = "transform 0.8s ease-out,opacity 0.8s ease-out";
        pr.style.transform = "scale(3.4)";
        pr.style.opacity = "0";
      });
    }

    function resetAll() {
      const calw = calwRef.current!;
      const overlay = overlayRef.current!;
      const fc = fcRef.current!;
      const pr = prRef.current!;

      calw.style.transition = "none";
      calw.style.transform = "scale(1)";
      calw.style.transformOrigin = "50% 50%";
      overlay.style.transition = "none";
      overlay.style.background = "rgba(242,249,253,0)";
      fc.style.transition = "none";
      fc.style.opacity = "0";
      fc.style.transform = "scale(0.84) translateY(8px)";
      fc.style.left = BASE_W / 2 - 79 + "px";
      fc.style.top = BASE_H / 2 - 115 + "px";
      applyState("pending");
      pr.style.opacity = "0";
    }

    let cancelled = false;

    function microFloat() {
      floatCardsRef.current.forEach((el, i) => {
        if (el) el.style.transform = `translateY(${Math.sin(Date.now() / 2000 + i * 0.85) * 1.2}px)`;
      });
      rafRef.current = requestAnimationFrame(microFloat);
    }

    async function runLoop() {
      while (!cancelled) {
        resetAll();
        await delay(1200);
        if (cancelled) break;

        const c = getCenter(tcRef.current!);
        const calw = calwRef.current!;
        const overlay = overlayRef.current!;
        const fc = fcRef.current!;

        calw.style.transition = "transform 0.9s cubic-bezier(0.4,0,0.2,1)";
        calw.style.transformOrigin = c.x + "px " + c.y + "px";
        await delay(20);
        calw.style.transform = "scale(2.15)";
        await delay(960);
        if (cancelled) break;

        overlay.style.transition = "background 0.5s cubic-bezier(0.4,0,0.2,1)";
        overlay.style.background = "rgba(242,249,253,0.74)";
        await delay(400);
        if (cancelled) break;

        fc.style.transition = "opacity 0.5s cubic-bezier(0.4,0,0.2,1),transform 0.5s cubic-bezier(0.4,0,0.2,1)";
        fc.style.opacity = "1";
        fc.style.transform = "scale(1) translateY(0)";
        await delay(1050);
        if (cancelled) break;

        applyState("approved");
        await delay(900);
        if (cancelled) break;

        applyState("posting");
        await delay(850);
        if (cancelled) break;

        applyState("posted");
        pulse();
        await delay(1050);
        if (cancelled) break;

        fc.style.transition = "opacity 0.45s cubic-bezier(0.4,0,0.2,1),transform 0.45s cubic-bezier(0.4,0,0.2,1)";
        fc.style.opacity = "0";
        fc.style.transform = "scale(0.88) translateY(6px)";
        overlay.style.transition = "background 0.45s cubic-bezier(0.4,0,0.2,1)";
        overlay.style.background = "rgba(242,249,253,0)";
        await delay(480);
        if (cancelled) break;

        calw.style.transition = "transform 0.9s cubic-bezier(0.4,0,0.2,1)";
        calw.style.transform = "scale(1)";
        await delay(950);
        await delay(1100);
      }
    }

    microFloat();
    runLoop();

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [inView]);

  const registerFloat = (el: HTMLDivElement | null) => {
    if (el && !floatCardsRef.current.includes(el)) {
      floatCardsRef.current.push(el);
    }
  };

  return (
    <div
      ref={outerRef}
      className={`relative h-[260px] w-full overflow-hidden rounded-xl md:min-h-[363px] ${className}`}
      style={{ background: "#F2F9FD" }}
    >
      <div
        ref={stageRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: BASE_W,
          height: BASE_H,
          transformOrigin: "center center",
          transform: "translate(-50%, -50%) scale(1)",
        }}
      >
        <div
          ref={wrapRef}
          style={{
            width: BASE_W,
            height: BASE_H,
            background: "#F2F9FD",
            position: "relative",
            overflow: "hidden",
            fontFamily: "system-ui,-apple-system,sans-serif",
          }}
        >
          {/* Calendar wrapper */}
          <div
            ref={calwRef}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transformOrigin: "50% 50%",
            }}
          >
            <div style={{ width: 468, padding: "8px 6px 6px" }}>
              {/* Header */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 3, marginBottom: 5 }}>
                {[
                  { num: 1, lbl: "SUN", today: false },
                  { num: 2, lbl: "MON", today: false },
                  { num: 3, lbl: "TUE", today: true },
                  { num: 4, lbl: "WED", today: false },
                  { num: 5, lbl: "THU", today: false },
                  { num: 6, lbl: "FRI", today: false },
                  { num: 7, lbl: "SAT", today: false },
                ].map(({ num, lbl, today }) => (
                  <div key={lbl} style={{ textAlign: "center", padding: "2px 0" }}>
                    <div
                      style={{
                        width: 19,
                        height: 19,
                        borderRadius: "50%",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontWeight: 700,
                        color: today ? "#fff" : "rgba(0,0,0,0.6)",
                        background: today ? "#1a1a1a" : "transparent",
                        margin: "0 auto",
                      }}
                    >
                      {num}
                    </div>
                    <div
                      style={{
                        fontSize: 7.5,
                        fontWeight: today ? 700 : 600,
                        color: today ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.35)",
                        letterSpacing: "0.3px",
                        marginTop: 2,
                      }}
                    >
                      {lbl}
                    </div>
                  </div>
                ))}
              </div>

              {/* Body */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7,1fr)",
                  gap: 3,
                  height: 296,
                }}
              >
                {/* SUN */}
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {[32, 26, 38, 28].map((w, i) => (
                    <div key={i} ref={registerFloat}><WaitingCard nameWidth={w} /></div>
                  ))}
                </div>

                {/* MON */}
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {[36, 30, 42, 24].map((w, i) => (
                    <div key={i} ref={registerFloat}><WaitingCard nameWidth={w} /></div>
                  ))}
                </div>

                {/* TUE */}
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <Card
                    cardRef={tcRef}
                    dotRef={tdotRef}
                    time="08:00"
                    dotType="pend"
                    borderColor="rgba(245,158,11,0.5)"
                    hasImg
                    bars={["88%", "62%"]}
                  />
                  <div ref={registerFloat}>
                    <Card time="11:30" dotType="appr" borderColor="rgba(59,130,246,0.4)" hasImg bars={["75%"]} />
                  </div>
                  <div ref={registerFloat}>
                    <Card time="14:00" dotType="draft" draft bars={["55%"]} />
                  </div>
                  <div ref={registerFloat}>
                    <Card time="18:30" dotType="post" borderColor="rgba(29,168,85,0.45)" hasImg bars={["70%"]} />
                  </div>
                </div>

                {/* WED */}
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <div ref={registerFloat}>
                    <Card time="09:00" dotType="pend" borderColor="rgba(245,158,11,0.5)" hasImg bars={["85%", "50%"]} />
                  </div>
                  <div ref={registerFloat}>
                    <Card time="17:00" dotType="post" borderColor="rgba(29,168,85,0.45)" bars={["48%"]} />
                  </div>
                </div>

                {/* THU */}
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <div ref={registerFloat}>
                    <Card time="08:30" dotType="appr" borderColor="rgba(59,130,246,0.4)" hasImg bars={["72%"]} />
                  </div>
                  <div ref={registerFloat}>
                    <Card time="12:00" dotType="pend" borderColor="rgba(245,158,11,0.5)" hasImg bars={["80%"]} />
                  </div>
                  <div ref={registerFloat}>
                    <Card time="19:00" dotType="draft" draft bars={["52%"]} />
                  </div>
                </div>

                {/* FRI */}
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <div ref={registerFloat}><WaitingCard nameWidth={34} /></div>
                  <div ref={registerFloat}>
                    <Card time="10:00" dotType="pend" borderColor="rgba(245,158,11,0.45)" hasImg bars={["68%"]} />
                  </div>
                  <div ref={registerFloat}>
                    <Card time="16:00" dotType="appr" borderColor="rgba(59,130,246,0.38)" bars={["82%"]} />
                  </div>
                </div>

                {/* SAT */}
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <div ref={registerFloat}>
                    <Card time="10:30" dotType="post" borderColor="rgba(29,168,85,0.4)" bars={["46%"]} />
                  </div>
                  <div ref={registerFloat}><WaitingCard nameWidth={28} /></div>
                </div>
              </div>
            </div>
          </div>

          {/* Overlay */}
          <div
            ref={overlayRef}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(242,249,253,0)",
              pointerEvents: "none",
            }}
          />

          {/* Focus card */}
          <div
            ref={fcRef}
            style={{
              position: "absolute",
              background: "#fff",
              borderRadius: 11,
              border: "1px solid rgba(0,0,0,0.1)",
              padding: "14px 14px 12px",
              width: 158,
              opacity: 0,
              pointerEvents: "none",
              transform: "scale(0.84) translateY(8px)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
              left: BASE_W / 2 - 79,
              top: BASE_H / 2 - 115,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <div
                style={{
                  width: 17,
                  height: 17,
                  background: "#0a66c2",
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: 9,
                  fontWeight: 900,
                  flexShrink: 0,
                }}
              >
                in
              </div>
              <div>
                <div style={{ fontSize: 9.5, fontWeight: 600, color: "rgba(0,0,0,0.72)", lineHeight: 1.2 }}>
                  Scheduled post
                </div>
                <div style={{ fontSize: 8, color: "rgba(0,0,0,0.38)" }}>Tuesday · 08:00</div>
              </div>
            </div>
            <div
              style={{
                width: "100%",
                height: 46,
                background: "rgba(0,0,0,0.07)",
                borderRadius: 4,
                marginBottom: 7,
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 7 }}>
              {["92%", "74%", "58%"].map((w, i) => (
                <div key={i} style={{ height: 6, borderRadius: 3, background: "rgba(0,0,0,0.08)", width: w }} />
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 10 }}>
              <div style={{ width: 13, height: 13, borderRadius: "50%", background: "rgba(0,0,0,0.14)" }} />
              <div style={{ height: 5, width: 46, background: "rgba(0,0,0,0.09)", borderRadius: 2 }} />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 9,
              }}
            >
              <span style={{ fontSize: 8, color: "rgba(0,0,0,0.42)", fontWeight: 500 }}>Status</span>
              <span
                ref={fbadgeRef}
                style={{
                  fontSize: 7.5,
                  fontWeight: 700,
                  padding: "2px 7px",
                  borderRadius: 20,
                  background: STATES.pending.badge,
                  color: STATES.pending.badgeC,
                  transition: "background 0.35s,color 0.35s",
                }}
              >
                Pending Approval
              </span>
            </div>
            <div
              ref={fbtnRef}
              style={{
                width: "100%",
                padding: "6px 0",
                borderRadius: 6,
                border: "none",
                fontSize: 9,
                fontWeight: 700,
                textAlign: "center",
                background: STATES.pending.btn,
                color: STATES.pending.btnC,
                transition: "background 0.35s,color 0.35s",
              }}
            >
              Pending Approval
            </div>
          </div>

          {/* Pulse ring */}
          <div ref={prRef} style={{ position: "absolute", borderRadius: "50%", opacity: 0, pointerEvents: "none" }} />
        </div>
      </div>
    </div>
  );
}

export default AnimationPlaceholderCalendar;
