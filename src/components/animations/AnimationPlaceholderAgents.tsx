import { useEffect, useRef, useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

type PersonCls = "a1" | "a2" | "a3" | "a4" | "a5" | "a6" | "a7" | "a8";
type IconType = "green" | "lime" | "yellow" | "dark";
type BodyType = "reactions" | "image" | "comment" | "tags";

interface Person {
  initials: string;
  name: string;
  role: string;
  cls: PersonCls;
}

const PEOPLE: Person[] = [
  { initials: "JL", name: "Jordan Lee", role: "Head of Growth · 2h", cls: "a1" },
  { initials: "SR", name: "Sara Russo", role: "B2B SaaS Founder · 5h", cls: "a2" },
  { initials: "MK", name: "Marcus Kim", role: "VP Sales · 8h", cls: "a3" },
  { initials: "AL", name: "Alex Ngu", role: "GTM Lead · 12h", cls: "a4" },
  { initials: "EP", name: "Emma Park", role: "CMO · Stripe · 1h", cls: "a5" },
  { initials: "DT", name: "Derek Tran", role: "Founder · YC · 4h", cls: "a6" },
  { initials: "RN", name: "Rachel Nolan", role: "Demand Gen · 3h", cls: "a7" },
  { initials: "BW", name: "Ben Walsh", role: "RevOps · HubSpot · 6h", cls: "a8" },
];

const AVATAR_GRADIENTS: Record<PersonCls, string> = {
  a1: "linear-gradient(135deg, #ffffff, #e2ebf3)",
  a2: "linear-gradient(135deg, #f0f4f8, #d2dce7)",
  a3: "linear-gradient(135deg, #ffffff, #e8eef4)",
  a4: "linear-gradient(135deg, #e5ecf2, #c8d3de)",
  a5: "linear-gradient(135deg, #ffffff, #dde6ee)",
  a6: "linear-gradient(135deg, #edf2f7, #d0dae4)",
  a7: "linear-gradient(135deg, #ffffff, #e0e8f0)",
  a8: "linear-gradient(135deg, #dde6ee, #bac6d2)",
};

const BODY_TYPES: BodyType[] = ["reactions", "image", "comment", "tags"];
const PATTERN = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({ person: i, body: i % 4 }));

interface CardInsight {
  id: string;
  top: number;
  iconType: IconType;
  label: string;
  sub: string;
  badge: string | null;
  live: boolean;
}

const CARD_INSIGHTS: CardInsight[] = [
  { id: "c1", top: 50, iconType: "green", label: "Like this post", sub: "High engagement signal", badge: null, live: true },
  { id: "c2", top: 118, iconType: "lime", label: "High-intent lead", sub: "Matches your ICP", badge: "9.4", live: false },
  { id: "c3", top: 195, iconType: "yellow", label: "Leave a comment", sub: "Warm touch opportunity", badge: null, live: false },
  { id: "c4", top: 268, iconType: "dark", label: "Connect now", sub: "Profile matches ICP", badge: null, live: false },
];

const ICON_COLORS: Record<IconType, string> = {
  green: "#10b981",
  lime: "#84cc16",
  yellow: "#eab308",
  dark: "#1a2332",
};

// ─── Utility ─────────────────────────────────────────────────────────────────

function smoothStep(e0: number, e1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

const shimmerStyle: React.CSSProperties = {
  background: "linear-gradient(90deg, #e8ecf1 0%, #f0f4f8 50%, #e8ecf1 100%)",
  backgroundSize: "200% 100%",
  animation: "shimmer 2.4s linear infinite",
  borderRadius: 4,
};

function SkLine({ width = "100%" as string | number }) {
  return <div style={{ ...shimmerStyle, height: 7, width, marginBottom: 0 }} />;
}

function SkImg() {
  return (
    <div
      style={{
        ...shimmerStyle,
        width: "100%",
        height: 56,
        borderRadius: 6,
        marginBottom: 11,
        backgroundSize: "200% 100%",
      }}
    />
  );
}

function SkPill({ width }: { width: number }) {
  return (
    <div
      style={{
        height: 10,
        borderRadius: 5,
        width,
        background: "linear-gradient(90deg, #eef2f6 0%, #f4f7fa 50%, #eef2f6 100%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 2.4s linear infinite",
      }}
    />
  );
}

function SkTag({ width }: { width: number }) {
  return (
    <div
      style={{
        height: 14,
        borderRadius: 4,
        width,
        background: "linear-gradient(90deg, #eef2f6 0%, #f4f7fa 50%, #eef2f6 100%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 2.4s linear infinite",
      }}
    />
  );
}

function ReactDot({ bg }: { bg: string }) {
  return (
    <div
      style={{
        width: 14,
        height: 14,
        borderRadius: "50%",
        border: "1.5px solid #fff",
        marginLeft: -4,
        background: bg,
        flexShrink: 0,
      }}
    />
  );
}

function PostBody({ bodyType }: { bodyType: BodyType }) {
  const actions = (
    <div style={{ display: "flex", gap: 8, paddingTop: 9, borderTop: "1px solid #f0f2f5" }}>
      <SkPill width={38} />
      <SkPill width={32} />
      <SkPill width={28} />
    </div>
  );

  if (bodyType === "reactions")
    return (
      <>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 11 }}>
          <SkLine />
          <SkLine />
          <SkLine width="65%" />
        </div>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 9 }}>
          <ReactDot bg="#1a2332" />
          <ReactDot bg="#08BEED" />
          <ReactDot bg="#0ea5d9" />
          <div style={{ ...shimmerStyle, height: 7, width: 58, marginLeft: 7 }} />
        </div>
        {actions}
      </>
    );

  if (bodyType === "image")
    return (
      <>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 11 }}>
          <SkLine />
          <SkLine width="85%" />
        </div>
        <SkImg />
        <div style={{ display: "flex", gap: 8, paddingTop: 9, borderTop: "1px solid #f0f2f5" }}>
          <SkPill width={38} />
          <SkPill width={32} />
        </div>
      </>
    );

  if (bodyType === "comment")
    return (
      <>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 11 }}>
          <SkLine />
          <SkLine width="70%" />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 4, marginBottom: 10 }}>
          <div style={{ ...shimmerStyle, width: 20, height: 20, borderRadius: "50%", flexShrink: 0 }} />
          <div style={{ ...shimmerStyle, flex: 1, height: 22, borderRadius: 11 }} />
        </div>
        <div style={{ display: "flex", gap: 8, paddingTop: 9, borderTop: "1px solid #f0f2f5" }}>
          <SkPill width={38} />
          <SkPill width={32} />
        </div>
      </>
    );

  // tags
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 11 }}>
        <SkLine />
        <SkLine />
        <SkLine width="55%" />
      </div>
      <div style={{ display: "flex", gap: 5, marginBottom: 10 }}>
        <SkTag width={38} />
        <SkTag width={28} />
        <SkTag width={32} />
      </div>
      <div style={{ display: "flex", gap: 8, paddingTop: 9, borderTop: "1px solid #f0f2f5" }}>
        <SkPill width={38} />
        <SkPill width={32} />
      </div>
    </>
  );
}

function Post({ person, bodyType }: { person: number; bodyType: BodyType }) {
  const p = PEOPLE[person];

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 10,
        padding: 12,
        marginBottom: 10,
        boxShadow: "0 4px 14px rgba(20,40,70,0.08),0 1px 3px rgba(20,40,70,0.04)",
        position: "relative",
        overflow: "hidden",
        transition: "box-shadow 0.3s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 9,
          marginBottom: 11,
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 10.5,
            fontWeight: 700,
            color: "#3a4556",
            letterSpacing: "0.2px",
            border: "1.5px solid rgba(255,255,255,0.95)",
            boxShadow: "0 2px 6px rgba(20,40,70,0.1)",
            background: AVATAR_GRADIENTS[p.cls],
          }}
        >
          {p.initials}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#1a2332",
              letterSpacing: "-0.1px",
              lineHeight: 1.2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {p.name}
          </div>
          <div
            style={{
              fontSize: 9,
              color: "#7a8799",
              marginTop: 2,
              fontWeight: 500,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {p.role}
          </div>
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 2 }}>
        <PostBody bodyType={bodyType} />
      </div>
    </div>
  );
}

function InsightIcon({ type }: { type: IconType }) {
  const bg = ICON_COLORS[type];
  const iconStyle: React.CSSProperties = {
    width: 26,
    height: 26,
    borderRadius: "50%",
    flexShrink: 0,
    background: bg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  };

  const symbols: Record<IconType, React.ReactNode> = {
    green: (
      <div
        style={{
          width: 6,
          height: 3,
          borderLeft: "1.5px solid white",
          borderBottom: "1.5px solid white",
          transform: "rotate(-45deg) translateY(-1px)",
        }}
      />
    ),
    lime: (
      <div
        style={{
          width: 10,
          height: 10,
          background: "white",
          WebkitMaskImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'><path d='M12 2l2.39 7.36H22l-6.18 4.49L18.2 21 12 16.52 5.8 21l2.38-7.15L2 9.36h7.61L12 2z'/></svg>")`,
          maskImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'><path d='M12 2l2.39 7.36H22l-6.18 4.49L18.2 21 12 16.52 5.8 21l2.38-7.15L2 9.36h7.61L12 2z'/></svg>")`,
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
    ),
    yellow: (
      <div
        style={{
          width: 10,
          height: 10,
          background: "white",
          WebkitMaskImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'><path d='M20 2H4v16h4v4l4-4h8V2z'/></svg>")`,
          maskImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'><path d='M20 2H4v16h4v4l4-4h8V2z'/></svg>")`,
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
    ),
    dark: (
      <div
        style={{
          width: 11,
          height: 11,
          background: "white",
          WebkitMaskImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'><path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/></svg>")`,
          maskImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'><path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/></svg>")`,
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
    ),
  };

  return <div style={iconStyle}>{symbols[type]}</div>;
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface Props {
  className?: string;
}

const BASE_W = 492;
const BASE_H = 362;

export function AnimationPlaceholderAgents({ className = "" }: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const scanLineRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const [scale, setScale] = useState(1);
  const [inView, setInView] = useState(false);

  // Trigger animations only once in viewport
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

  const allPosts = [...PATTERN, ...PATTERN];

  // Responsive scaling
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      const s = Math.min(width / BASE_W, height / BASE_H);
      setScale(s || 1);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Animation loop
  useEffect(() => {
    if (!inView) return;
    const SCROLL_DURATION = 22000;
    const SCAN_DURATION = 9000;
    const CARD_CYCLE = 8000;

    const cardSeq = [
      { idx: 0, appear: 0.05, exit: 0.45 },
      { idx: 1, appear: 0.2, exit: 0.6 },
      { idx: 2, appear: 0.4, exit: 0.8 },
      { idx: 3, appear: 0.55, exit: 0.95 },
    ];

    const track = trackRef.current;
    const scanLine = scanLineRef.current;
    if (!track || !scanLine) return;

    let patternHeight = 0;
    let startTime: number | null = null;

    const start = requestAnimationFrame(() => {
      const posts = track.querySelectorAll<HTMLElement>(".feed-post");
      const firstCycle = Array.from(posts).slice(0, PATTERN.length);
      firstCycle.forEach((p) => {
        patternHeight += p.offsetHeight + 10;
      });

      function tick(ts: number) {
        if (!startTime) startTime = ts;
        const elapsed = ts - startTime;

        const scrollY = ((elapsed % SCROLL_DURATION) / SCROLL_DURATION) * patternHeight;
        track!.style.transform = `translate3d(0, -${scrollY}px, 0)`;

        const scanP = (elapsed % SCAN_DURATION) / SCAN_DURATION;
        const scanY = -4 + scanP * 370;
        let scanOpacity: number;
        if (scanP < 0.05) scanOpacity = (scanP / 0.05) * 0.95;
        else if (scanP > 0.95) scanOpacity = ((1 - scanP) / 0.05) * 0.95;
        else scanOpacity = 0.95;
        scanLine!.style.transform = `translate3d(0, ${scanY}px, 0)`;
        scanLine!.style.opacity = String(scanOpacity);

        const allPostEls = track!.querySelectorAll<HTMLElement>(".feed-post");
        let currentY = 0;
        allPostEls.forEach((post) => {
          const height = post.offsetHeight;
          const postTopInMask = currentY - scrollY;
          const postBottomInMask = postTopInMask + height;
          const intersects =
            scanY >= postTopInMask - 4 && scanY <= postBottomInMask + 4 && scanOpacity > 0.3;

          const inner = post.firstElementChild as HTMLElement | null;
          if (inner) {
            inner.style.boxShadow = intersects
              ? "0 0 0 1.5px rgba(8,190,237,0.85),0 0 0 4px rgba(8,190,237,0.15),0 6px 24px rgba(8,190,237,0.25),0 4px 14px rgba(20,40,70,0.08)"
              : "0 4px 14px rgba(20,40,70,0.08),0 1px 3px rgba(20,40,70,0.04)";
          }

          currentY += height + 10;
        });

        const cardP = (elapsed % CARD_CYCLE) / CARD_CYCLE;
        cardSeq.forEach((seq) => {
          const card = cardRefs.current[seq.idx];
          if (!card) return;
          const p = cardP;
          if (p >= seq.appear && p <= seq.exit) {
            const inProgress = Math.min(1, (p - seq.appear) / 0.06);
            const fadeIn = smoothStep(seq.appear, seq.appear + 0.05, p);
            const fadeOut = 1 - smoothStep(seq.exit - 0.05, seq.exit, p);
            const alpha = fadeIn * fadeOut;
            const sc =
              inProgress < 1
                ? 1 + Math.sin(inProgress * Math.PI) * 0.08 * (1 - inProgress)
                : 1;
            const actualScale = lerp(0.85, sc, Math.min(1, inProgress * 1.2));
            const float = Math.sin((p - seq.appear) * Math.PI * 2 * 1.5) * 1.5;
            const translateX = lerp(15, 0, inProgress);
            card.style.opacity = String(alpha);
            card.style.transform = `scale(${actualScale}) translate(${translateX}px, ${float}px)`;
          } else {
            card.style.opacity = "0";
            card.style.transform = "scale(0.85) translate(15px, 0)";
          }
        });

        rafRef.current = requestAnimationFrame(tick);
      }

      rafRef.current = requestAnimationFrame(tick);
    });

    return () => {
      cancelAnimationFrame(start);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [inView]);

  return (
    <div
      ref={wrapperRef}
      className={`relative h-[260px] w-full overflow-hidden rounded-xl md:min-h-[363px] ${className}`}
    >
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0); }
          50%       { transform: translate(10px, -10px); }
        }
        @keyframes livePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(8,190,237,0.6); }
          50%       { box-shadow: 0 0 0 5px rgba(8,190,237,0); }
        }
      `}</style>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: BASE_W,
          height: BASE_H,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: "center center",
          background: "#C8EBFB",
          overflow: "hidden",
          borderRadius: 14,
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        {/* Gradient sheen */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 1,
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.2) 0%, transparent 50%)",
          }}
        />

        {/* Orbs */}
        <div
          style={{
            position: "absolute",
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 1,
            background: "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)",
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
            zIndex: 1,
            background: "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)",
            width: 140,
            height: 140,
            bottom: -50,
            left: -50,
            animation: "orbFloat 8s ease-in-out infinite",
            animationDelay: "-4s",
          }}
        />

        {/* Feed mask */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 20,
            width: 258,
            height: 362,
            overflow: "hidden",
            zIndex: 2,
          }}
        >
          <div
            ref={trackRef}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", willChange: "transform" }}
          >
            {allPosts.map((spec, i) => (
              <div key={i} className="feed-post">
                <Post person={spec.person} bodyType={BODY_TYPES[spec.body]} />
              </div>
            ))}
          </div>
        </div>

        {/* Fade top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 20,
            width: 258,
            height: 44,
            background: "linear-gradient(#C8EBFB, rgba(200,235,251,0))",
            zIndex: 6,
            pointerEvents: "none",
          }}
        />

        {/* Fade bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 20,
            width: 258,
            height: 44,
            background: "linear-gradient(rgba(200,235,251,0), #C8EBFB)",
            zIndex: 6,
            pointerEvents: "none",
          }}
        />

        {/* Scan line */}
        <div
          ref={scanLineRef}
          style={{
            position: "absolute",
            left: 20,
            width: 258,
            height: 2,
            top: 0,
            background:
              "linear-gradient(90deg, transparent 0%, rgba(8,190,237,0.3) 15%, rgba(8,190,237,1) 50%, rgba(8,190,237,0.3) 85%, transparent 100%)",
            boxShadow: "0 0 14px rgba(8,190,237,0.8), 0 0 32px rgba(8,190,237,0.4)",
            pointerEvents: "none",
            zIndex: 7,
            willChange: "transform",
          }}
        />

        {/* Insight cards */}
        {CARD_INSIGHTS.map((c, i) => (
          <div
            key={c.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            style={{
              position: "absolute",
              background: "#ffffff",
              borderRadius: 10,
              padding: "10px 12px",
              display: "flex",
              alignItems: "center",
              gap: 9,
              opacity: 0,
              transform: "scale(0.9) translateX(15px)",
              pointerEvents: "none",
              zIndex: 20,
              boxShadow: "0 10px 28px rgba(20,40,70,0.16), 0 2px 6px rgba(20,40,70,0.06)",
              width: 180,
              right: 18,
              top: c.top,
            }}
          >
            <div style={{ position: "relative" }}>
              <InsightIcon type={c.iconType} />
              {c.live && (
                <div
                  style={{
                    position: "absolute",
                    top: -2,
                    right: -2,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#08BEED",
                    border: "1.5px solid white",
                    animation: "livePulse 1.5s ease-in-out infinite",
                  }}
                />
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 10.5,
                  color: "#1a2332",
                  fontWeight: 700,
                  lineHeight: 1.2,
                  letterSpacing: "-0.1px",
                }}
              >
                {c.label}
              </div>
              <div
                style={{
                  fontSize: 8.5,
                  color: "#7a8799",
                  marginTop: 2,
                  fontWeight: 500,
                }}
              >
                {c.sub}
              </div>
            </div>
            {c.badge && (
              <div
                style={{
                  background: "#e0f7fe",
                  color: "#08BEED",
                  fontSize: 8,
                  fontWeight: 800,
                  padding: "2px 6px",
                  borderRadius: 6,
                }}
              >
                {c.badge}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnimationPlaceholderAgents;
