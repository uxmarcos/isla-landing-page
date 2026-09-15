import { useEffect, useRef, useState } from "react";

type BadgeKey = "bl" | "bs" | "br" | "ba";
type Action = { label: string; primary: boolean };
type Signal = {
  badge: BadgeKey;
  badgeLabel: string;
  title: string;
  icp?: string;
  body: string;
  note?: string;
  actions: Action[];
};

const ISLA_SVG = (
  <svg width="22" height="21" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14.9444 2.81169C17.2321 2.7267 19.4848 3.07721 20.754 5.22478C21.1033 5.97349 21.6394 6.32044 22.0264 6.57048C22.1649 6.65995 22.2844 6.73684 22.3692 6.8156C22.5174 6.95759 22.9547 7.19394 23.4229 7.44646C24.0294 7.77357 24.6888 8.1294 24.8419 8.34685C26.1256 10.1466 26.2991 11.2123 26.2481 13.3683C25.8271 15.4433 24.1291 20.3577 20.7051 23.4162C18.6263 24.5666 16.8446 25.4366 14.4757 25.2551C14.4105 25.2507 14.3451 25.2457 14.2794 25.2414C13.815 25.2111 13.338 25.1806 12.8848 25.1027C12.4939 25.0444 12.1132 24.9475 11.7325 24.8508C11.5125 24.7949 11.2919 24.7392 11.0694 24.6906C10.9384 24.662 10.8092 24.6332 10.6817 24.6056C8.67042 24.1704 7.08574 23.8279 5.45026 22.3625C5.1444 22.0884 4.90955 21.7667 4.66999 21.4386C4.6436 21.4025 4.61652 21.3665 4.58991 21.3302C3.58994 19.9682 2.83906 18.4628 2.74518 16.7472C2.70578 16.0266 2.73555 15.2606 2.84186 14.5461C2.87401 14.3301 2.91786 14.1159 2.961 13.9015C2.99278 13.7437 3.02445 13.5854 3.05182 13.4269C3.08605 13.2288 3.1205 13.0305 3.15534 12.8322C3.29707 12.0254 3.43918 11.2169 3.54303 10.4054C3.60721 9.90403 3.64535 9.40236 3.68366 8.89958C3.69047 8.81023 3.6972 8.72052 3.70417 8.63103C3.7088 8.57153 3.71345 8.51195 3.71784 8.45232C3.74747 8.0501 3.77796 7.64565 3.8819 7.25505C4.04308 6.64929 4.34815 6.0413 4.7696 5.57439C6.88778 3.22792 11.4306 2.99335 14.6221 2.82829C14.7311 2.82266 14.8387 2.81725 14.9444 2.81169ZM15.4932 5.71501C13.2593 4.31611 10.5244 3.20281 8.29596 4.61052C5.01823 6.68124 3.50878 10.0258 4.68171 14.4035C5.61329 17.8802 7.22099 20.4407 9.01569 22.3732C11.8411 25.4153 16.8305 23.7529 19.7598 20.8107C22.8336 17.7232 25.8025 15.3011 24.794 11.5373C23.5074 6.73592 20.1133 8.60798 15.4932 5.71501Z"
      fill="#00BFFF"
    />
  </svg>
);

const BADGE_STYLES: Record<BadgeKey, { background: string; color: string }> = {
  bl: { background: "rgba(77,184,255,0.12)", color: "#4db8ff" },
  bs: { background: "rgba(239,157,39,0.12)", color: "#ef9d27" },
  br: { background: "rgba(229,83,109,0.12)", color: "#e5536d" },
  ba: { background: "rgba(56,201,160,0.12)", color: "#38c9a0" },
};

const SIGNALS: Signal[] = [
  {
    badge: "bl",
    badgeLabel: "Lead Intelligence",
    title: "3 ICP matches on your last post",
    body: "B2B founders, 11–50 employees. Sofia R., Bruno M. and 1 other engaged.",
    actions: [
      { label: "View profiles →", primary: true },
      { label: "Save leads", primary: false },
      { label: "Snooze", primary: false },
    ],
  },
  {
    badge: "br",
    badgeLabel: "Repeat Engager",
    title: "🔥 Lucas Ferreira",
    icp: "ICP 85%",
    body: "Head of Growth @ NovaTech · 8 engagements across 8 posts — warm lead.",
    note: "Hi Lucas — I noticed you've been engaging with my posts. Would love to connect.",
    actions: [
      { label: "Send invite", primary: true },
      { label: "Open profile", primary: false },
      { label: "Edit first", primary: false },
      { label: "Skip", primary: false },
    ],
  },
  {
    badge: "bs",
    badgeLabel: "Silence Alert",
    title: "No post in 9 days",
    body: "Engagement drops ~40% after a week of silence. Quick idea ready for you.",
    note: "Você sabe quanto tempo seu produto leva para entregar valor? A maioria dos founders não sabe.",
    actions: [
      { label: "I'll post today", primary: true },
      { label: "Generate an idea", primary: false },
      { label: "Snooze 3 days", primary: false },
    ],
  },
  {
    badge: "ba",
    badgeLabel: "Analytics",
    title: "Your best post this week",
    body: "+320 impressions, 14 comments. Decision-makers from SaaS and fintech engaged. Best repost: Tuesday 9–11am.",
    actions: [
      { label: "See breakdown →", primary: true },
      { label: "Repost this", primary: false },
      { label: "Dismiss", primary: false },
    ],
  },
  {
    badge: "bl",
    badgeLabel: "Lead Intelligence",
    title: "Ana Costa viewed your profile",
    icp: "ICP 72%",
    body: "Co-founder @ Stackly · Visited twice in the last 3 days. No connection yet.",
    note: "Hi Ana — I came across your profile and think there could be a good fit to connect.",
    actions: [
      { label: "Send invite", primary: true },
      { label: "Open profile", primary: false },
      { label: "Skip", primary: false },
    ],
  },
];

const CHANNELS = ["# isla-signals", "# warm-leads", "# analytics", "# calendar", "# content"];

function Avatar() {
  return (
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: 7,
        background: "#061420",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        padding: 1,
      }}
    >
      {ISLA_SVG}
    </div>
  );
}

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 3, alignItems: "center", padding: "2px 0" }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "#3a5060",
            animation: "step3-blink 1.2s infinite",
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}

function SignalMessage({ signal }: { signal: Signal }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 9,
        animation: "step3-fup 0.3s ease",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <Avatar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
          <span style={{ fontSize: 11, fontWeight: 500, color: "#4db8ff" }}>Isla</span>
          <span style={{ fontSize: 10, color: "#2a4050" }}>just now</span>
          <span
            style={{
              fontSize: 9,
              padding: "2px 6px",
              borderRadius: 20,
              fontWeight: 500,
              ...BADGE_STYLES[signal.badge],
            }}
          >
            {signal.badgeLabel}
          </span>
        </div>
        <div
          style={{
            background: "#112030",
            border: "0.5px solid rgba(255,255,255,0.06)",
            borderRadius: 9,
            padding: "10px 12px",
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 500, color: "#dde6ee", marginBottom: 2 }}>
            {signal.title}
            {signal.icp && (
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 500,
                  color: "#38c9a0",
                  background: "rgba(56,201,160,0.1)",
                  padding: "1px 6px",
                  borderRadius: 20,
                  marginLeft: 4,
                }}
              >
                {signal.icp}
              </span>
            )}
          </div>
          <div style={{ fontSize: 10, color: "#4a6070", lineHeight: 1.5, marginBottom: 6 }}>
            {signal.body}
          </div>
          {signal.note && (
            <div
              style={{
                fontSize: 10,
                color: "#4a6070",
                fontStyle: "italic",
                lineHeight: 1.5,
                marginBottom: 6,
                padding: "6px 8px",
                background: "rgba(77,184,255,0.04)",
                borderLeft: "2px solid rgba(77,184,255,0.2)",
                borderRadius: "0 4px 4px 0",
              }}
            >
              {signal.note}
            </div>
          )}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 6 }}>
            {signal.actions.map((a) => (
              <button
                key={a.label}
                type="button"
                style={{
                  fontSize: 10,
                  padding: "4px 10px",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  border: a.primary ? "1px solid #4ade80" : "1px solid rgba(255,255,255,0.55)",
                  background: a.primary ? "#155c2c" : "transparent",
                  color: a.primary ? "#4ade80" : "#ffffff",
                  fontWeight: 400,
                  lineHeight: 1.4,
                }}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TypingMessage() {
  return (
    <div
      style={{
        display: "flex",
        gap: 9,
        animation: "step3-fup 0.3s ease",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <Avatar />
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
          <span style={{ fontSize: 11, fontWeight: 500, color: "#4db8ff" }}>Isla</span>
        </div>
        <TypingDots />
      </div>
    </div>
  );
}

export default function Step3SignalsAnimation({ isActive }: { isActive: boolean }) {
  const [messages, setMessages] = useState<Signal[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const idxRef = useRef(0);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isActive) {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
      setMessages([]);
      setIsTyping(false);
      idxRef.current = 0;
      return;
    }

    const T = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      timeoutsRef.current.push(id);
    };

    const next = () => {
      setIsTyping(true);
      T(() => {
        setIsTyping(false);
        const signal = SIGNALS[idxRef.current % SIGNALS.length];
        idxRef.current += 1;
        setMessages((prev) => [...prev, signal]);
        T(next, 2600);
      }, 1100);
    };

    T(next, 700);

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [isActive]);

  useEffect(() => {
    const end = messagesEndRef.current;
    const container = end?.parentElement;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
  }, [messages, isTyping]);

  return (
    <>
      <style>{`
        @keyframes step3-fup {
          from { opacity: 0; transform: translateY(7px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes step3-blink {
          0%, 80%, 100% { opacity: 0.2; }
          40% { opacity: 1; }
        }
        .step3-scroll::-webkit-scrollbar { width: 3px; }
        .step3-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.07); border-radius: 2px; }
        .step3-ch:hover { background: rgba(255,255,255,0.04); color: #8aa0b0; }
        @media (max-width: 767px) {
          .step3-sidebar { display: none !important; }
        }
      `}</style>

      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg,#c8dff0 0%,#daeaf5 40%,#e8f3fa 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 640,
            height: "100%",
            maxHeight: 388,
            background: "#060C12",
            borderRadius: 14,
            overflow: "hidden",
            border: "0.5px solid rgba(255,255,255,0.10)",
            boxShadow:
              "0 40px 80px rgba(0,0,0,0.35), 0 0 0 0.5px rgba(255,255,255,0.06)",
            display: "flex",
            flexDirection: "column",
            transform: "perspective(900px) rotateX(1deg)",
          }}
        >
          {/* Title bar */}
          <div
            style={{
              height: 38,
              background: "#060C12",
              display: "flex",
              alignItems: "center",
              padding: "0 14px",
              borderBottom: "0.5px solid rgba(255,255,255,0.07)",
              flexShrink: 0,
              position: "relative",
            }}
          >
            <div style={{ display: "flex", gap: 6 }}>
              {["#ff5f57", "#ffbd2e", "#28c840"].map((c) => (
                <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />
              ))}
            </div>
            <span
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: 12,
                color: "#3a5060",
                fontFamily: "-apple-system, sans-serif",
              }}
            >
              Isla Agent
            </span>
          </div>

          {/* Layout */}
          <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
            {/* Sidebar */}
            <div
              className="step3-sidebar"
              style={{
                width: 170,
                background: "#060C12",
                borderRight: "0.5px solid rgba(255,255,255,0.07)",
                display: "flex",
                flexDirection: "column",
                padding: "16px 0",
                flexShrink: 0,
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              <div style={{ padding: "0 16px 4px" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#dde6ee", letterSpacing: "-0.01em" }}>
                  Isla
                </div>
              </div>
              <div
                style={{
                  fontSize: 9,
                  color: "#3a5060",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "0 16px",
                  marginTop: 2,
                  marginBottom: 14,
                }}
              >
                Signals
              </div>
              {CHANNELS.map((ch, i) => (
                <div
                  key={ch}
                  className="step3-ch"
                  style={{
                    padding: "6px 16px",
                    fontSize: 12,
                    cursor: "pointer",
                    transition: "background 0.15s",
                    color: i === 0 ? "#4db8ff" : "#3a5060",
                    background: i === 0 ? "rgba(77,184,255,0.1)" : "transparent",
                    borderLeft: i === 0 ? "2px solid #4db8ff" : "2px solid transparent",
                    textAlign: "left",
                  }}
                >
                  {ch}
                </div>
              ))}
            </div>

            {/* Chat area */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                background: "#0D1B26",
                overflow: "hidden",
                minWidth: 0,
              }}
            >
              {/* Chat header */}
              <div
                style={{
                  padding: "10px 16px",
                  borderBottom: "0.5px solid rgba(255,255,255,0.07)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#060C12",
                  flexShrink: 0,
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 500, color: "#dde6ee" }}># isla-signals</span>
                <span style={{ fontSize: 11, color: "#3a5060" }}>Isla delivers signals here</span>
              </div>

              {/* Messages */}
              <div
                className="step3-scroll"
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: "12px 14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {messages.map((s, i) => (
                  <SignalMessage key={i} signal={s} />
                ))}
                {isTyping && <TypingMessage />}
                <div ref={messagesEndRef} />
              </div>

              {/* Bar */}
              <div
                style={{
                  padding: "7px 14px",
                  borderTop: "0.5px solid rgba(255,255,255,0.07)",
                  background: "#060C12",
                  flexShrink: 0,
                }}
              >
                <input
                  type="text"
                  placeholder="Reply to Isla..."
                  readOnly
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.03)",
                    border: "0.5px solid rgba(255,255,255,0.09)",
                    borderRadius: 6,
                    padding: "6px 10px",
                    fontSize: 11,
                    color: "#dde6ee",
                    fontFamily: "inherit",
                    outline: "none",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
