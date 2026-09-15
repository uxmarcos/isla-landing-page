import { useEffect, useRef, useState, useCallback } from "react";

type BadgeKey = "bl" | "bs" | "br" | "ba";
type Action = { label: string; primary: boolean; toast: string };
type Signal = {
  badge: BadgeKey;
  badgeLabel: string;
  title: string;
  body: string;
  note?: string | null;
  icp?: string;
  actions: Action[];
};

const ISLA_SVG = (
  <svg width="26" height="25" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14.9444 2.81169C17.2321 2.7267 19.4848 3.07721 20.754 5.22478C21.1033 5.97349 21.6394 6.32044 22.0264 6.57048C22.1649 6.65995 22.2844 6.73684 22.3692 6.8156C22.5174 6.95759 22.9547 7.19394 23.4229 7.44646C24.0294 7.77357 24.6888 8.1294 24.8419 8.34685C26.1256 10.1466 26.2991 11.2123 26.2481 13.3683C25.8271 15.4433 24.1291 20.3577 20.7051 23.4162C18.6263 24.5666 16.8446 25.4366 14.4757 25.2551C14.4105 25.2507 14.3451 25.2457 14.2794 25.2414C13.815 25.2111 13.338 25.1806 12.8848 25.1027C12.4939 25.0444 12.1132 24.9475 11.7325 24.8508C11.5125 24.7949 11.2919 24.7392 11.0694 24.6906C10.9384 24.662 10.8092 24.6332 10.6817 24.6056C8.67042 24.1704 7.08574 23.8279 5.45026 22.3625C5.1444 22.0884 4.90955 21.7667 4.66999 21.4386C4.6436 21.4025 4.61652 21.3665 4.58991 21.3302C3.58994 19.9682 2.83906 18.4628 2.74518 16.7472C2.70578 16.0266 2.73555 15.2606 2.84186 14.5461C2.87401 14.3301 2.91786 14.1159 2.961 13.9015C2.99278 13.7437 3.02445 13.5854 3.05182 13.4269C3.08605 13.2288 3.1205 13.0305 3.15534 12.8322C3.29707 12.0254 3.43918 11.2169 3.54303 10.4054C3.60721 9.90403 3.64535 9.40236 3.68366 8.89958C3.69047 8.81023 3.6972 8.72052 3.70417 8.63103C3.7088 8.57153 3.71345 8.51195 3.71784 8.45232C3.74747 8.0501 3.77796 7.64565 3.8819 7.25505C4.04308 6.64929 4.34815 6.0413 4.7696 5.57439C6.88778 3.22792 11.4306 2.99335 14.6221 2.82829C14.7311 2.82266 14.8387 2.81725 14.9444 2.81169ZM15.4932 5.71501C13.2593 4.31611 10.5244 3.20281 8.29596 4.61052C5.01823 6.68124 3.50878 10.0258 4.68171 14.4035C5.61329 17.8802 7.22099 20.4407 9.01569 22.3732C11.8411 25.4153 16.8305 23.7529 19.7598 20.8107C22.8336 17.7232 25.8025 15.3011 24.794 11.5373C23.5074 6.73592 20.1133 8.60798 15.4932 5.71501Z"
      fill="#00BFFF"
    />
  </svg>
);

const BADGE_STYLES = {
  bl: { background: "rgba(77,184,255,0.15)", color: "#4db8ff" },
  bs: { background: "rgba(239,157,39,0.15)", color: "#ef9d27" },
  br: { background: "rgba(229,83,109,0.15)", color: "#e5536d" },
  ba: { background: "rgba(56,201,160,0.15)", color: "#38c9a0" },
};

const SIGNALS: Signal[] = [
  {
    badge: "bl",
    badgeLabel: "Lead Intelligence",
    title: "3 ICP matches on your last post",
    body: "B2B founders, 11–50 employees. Sofia R., Bruno M. and 1 other engaged.",
    note: null,
    actions: [
      { label: "View profiles →", primary: true, toast: "Opening profiles..." },
      { label: "Save leads", primary: false, toast: "Saved to warm leads" },
      { label: "Snooze", primary: false, toast: "Snoozed" },
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
      { label: "Send invite", primary: true, toast: "Invite sent to Lucas!" },
      { label: "Open profile", primary: false, toast: "Profile opened" },
      { label: "Edit first", primary: false, toast: "Edit mode on" },
      { label: "Skip", primary: false, toast: "Skipped" },
    ],
  },
  {
    badge: "bs",
    badgeLabel: "Silence Alert",
    title: "No post in 9 days",
    body: "Engagement drops ~40% after a week of silence. Quick idea ready for you.",
    note: "Você sabe quanto tempo seu produto leva para entregar valor? A maioria dos founders não sabe.",
    actions: [
      { label: "I'll post today", primary: true, toast: "Post scheduled!" },
      { label: "Generate an idea", primary: false, toast: "Generating new idea..." },
      { label: "Snooze 3 days", primary: false, toast: "Snoozed 3 days" },
    ],
  },
  {
    badge: "ba",
    badgeLabel: "Analytics",
    title: "Your best post this week",
    body: "+320 impressions, 14 comments. Decision-makers from SaaS and fintech engaged. Best repost window: Tuesday 9–11am.",
    note: null,
    actions: [
      { label: "See breakdown →", primary: true, toast: "Opening analytics..." },
      { label: "Repost this", primary: false, toast: "Repost scheduled!" },
      { label: "Dismiss", primary: false, toast: "Dismissed" },
    ],
  },
  {
    badge: "bl",
    badgeLabel: "Lead Intelligence",
    title: "Ana Costa viewed your profile",
    icp: "ICP 72%",
    body: "Co-founder @ Stackly · Visited your profile twice in the last 3 days. No connection yet.",
    note: "Hi Ana — I came across your profile and think there could be a good fit to connect.",
    actions: [
      { label: "Send invite", primary: true, toast: "Invite sent to Ana!" },
      { label: "Open profile", primary: false, toast: "Profile opened" },
      { label: "Skip", primary: false, toast: "Skipped" },
    ],
  },
  {
    badge: "ba",
    badgeLabel: "Content Tip",
    title: "Best time to post today: 12–1pm",
    body: "Your audience is most active at lunchtime on Tuesdays. Posts now get 2.3x more reach in the first hour.",
    note: null,
    actions: [
      { label: "Draft a post →", primary: true, toast: "Draft opened!" },
      { label: "Remind me", primary: false, toast: "Reminder set for 12pm" },
      { label: "Dismiss", primary: false, toast: "Dismissed" },
    ],
  },
];

const CHANNELS = ["# isla-signals", "# warm-leads", "# analytics", "# calendar", "# content"];

function TypingIndicator() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "2px 0" }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#5a7080",
            animation: "isla-blink 1.2s infinite",
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}

function SignalCard({ signal, onToast }: { signal: Signal; onToast: (t: string) => void }) {
  return (
    <div
      style={{
        background: "#112030",
        border: "0.5px solid rgba(255,255,255,0.06)",
        borderRadius: 10,
        padding: "12px 14px",
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 500, color: "#dde6ee", marginBottom: 3 }}>
        {signal.title}
        {signal.icp && (
          <span
            style={{
              fontSize: 10,
              fontWeight: 500,
              color: "#38c9a0",
              background: "rgba(56,201,160,0.1)",
              padding: "2px 7px",
              borderRadius: 20,
              marginLeft: 5,
            }}
          >
            {signal.icp}
          </span>
        )}
      </div>
      <div style={{ fontSize: 11, color: "#5a7080", lineHeight: 1.55, marginBottom: signal.note ? 6 : 8 }}>
        {signal.body}
      </div>
      {signal.note && (
        <div
          style={{
            fontSize: 11,
            color: "#5a7080",
            fontStyle: "italic",
            lineHeight: 1.5,
            marginBottom: 8,
            padding: "8px 10px",
            background: "rgba(77,184,255,0.04)",
            borderLeft: "2px solid rgba(77,184,255,0.25)",
            borderRadius: "0 5px 5px 0",
          }}
        >
          {signal.note}
        </div>
      )}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 8 }}>
        {signal.actions.map((action: Action) => (
          <button
            key={action.label}
            onClick={() => onToast(action.toast)}
            style={{
              fontSize: 11,
              padding: "5px 13px",
              borderRadius: 7,
              cursor: "pointer",
              fontFamily: "inherit",
              border: action.primary ? "1px solid #4ade80" : "1px solid rgba(255,255,255,0.6)",
              background: action.primary ? "#155c2c" : "transparent",
              color: action.primary ? "#4ade80" : "#ffffff",
              fontWeight: 400,
              lineHeight: 1.4,
              transition: "all 0.15s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = action.primary ? "#1a7035" : "rgba(255,255,255,0.12)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = action.primary ? "#155c2c" : "transparent";
            }}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Message({ signal, isTyping, onToast }: { signal: Signal; isTyping: boolean; onToast: (t: string) => void }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        alignSelf: "stretch",
        animation: "isla-fadeup 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: 8,
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

      {/* Body */}
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
          <span style={{ fontSize: 12, fontWeight: 500, color: "#4db8ff" }}>Isla</span>
          {!isTyping && (
            <>
              <span style={{ fontSize: 10, color: "#5a7080" }}>just now</span>
              <span
                style={{
                  fontSize: 9,
                  padding: "2px 7px",
                  borderRadius: 20,
                  fontWeight: 500,
                  ...BADGE_STYLES[signal.badge],
                }}
              >
                {signal.badgeLabel}
              </span>
            </>
          )}
        </div>
        {isTyping ? (
          <TypingIndicator />
        ) : (
          <SignalCard signal={signal} onToast={onToast} />
        )}
      </div>
    </div>
  );
}

export default function IslaAgentChat() {
  const [messages, setMessages] = useState<Signal[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [inputVal, setInputVal] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const idxRef = useRef(0);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((text: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast(text);
    toastTimeoutRef.current = setTimeout(() => setToast(null), 2200);
  }, []);

  const scheduleNext = useCallback(() => {
    loopTimeoutRef.current = setTimeout(() => {
      setIsTyping(true);
      loopTimeoutRef.current = setTimeout(() => {
        const signal = SIGNALS[idxRef.current % SIGNALS.length];
        idxRef.current += 1;
        setIsTyping(false);
        setMessages((prev) => [...prev, signal]);
        scheduleNext();
      }, 1200);
    }, 2800);
  }, []);

  useEffect(() => {
    setIsTyping(true);
    const firstTimeout = setTimeout(() => {
      const signal = SIGNALS[0];
      idxRef.current = 1;
      setIsTyping(false);
      setMessages([signal]);
      scheduleNext();
    }, 900);

    return () => {
      clearTimeout(firstTimeout);
      if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, [scheduleNext]);

  useEffect(() => {
    const end = messagesEndRef.current;
    const container = end?.parentElement;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputVal.trim()) {
      showToast("Isla is processing your reply...");
      setInputVal("");
    }
  };

  return (
    <>
      <style>{`
        @keyframes isla-fadeup {
          0%   { opacity: 0; transform: translateY(14px) scale(0.985); filter: blur(2px); }
          60%  { opacity: 1; filter: blur(0); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes isla-blink {
          0%, 80%, 100% { opacity: 0.2; }
          40% { opacity: 1; }
        }
        .isla-scrollbar::-webkit-scrollbar { width: 3px; }
        .isla-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 2px; }
        .isla-ch:hover { background: rgba(255,255,255,0.04); color: #8aa0b0; }
        @media (max-width: 767px) {
          .isla-sidebar { display: none !important; }
        }
      `}</style>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: 540,
          background: "#060C12",
          borderRadius: 14,
          overflow: "hidden",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          border: "0.5px solid rgba(255,255,255,0.08)",
          position: "relative",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            height: 40,
            background: "#060C12",
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            borderBottom: "0.5px solid rgba(255,255,255,0.06)",
            flexShrink: 0,
            position: "relative",
          }}
        >
          <div style={{ display: "flex", gap: 7 }}>
            {["#ff5f57", "#ffbd2e", "#28c840"].map((c) => (
              <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
            ))}
          </div>
          <span
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: 13,
              color: "#5a7080",
            }}
          >
            Isla Agent
          </span>
        </div>

        {/* Layout */}
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {/* Sidebar */}
          <div
            className="isla-sidebar"
            style={{
              width: 200,
              background: "#060C12",
              borderRight: "0.5px solid rgba(255,255,255,0.06)",
              display: "flex",
              flexDirection: "column",
              padding: "16px 0",
              flexShrink: 0,
            }}
          >
            <div style={{ padding: "0 14px 12px", borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#dde6ee" }}>Isla </span>
              <span style={{ fontSize: 10, color: "#5a7080", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Signals
              </span>
            </div>
            <div style={{ padding: "10px 0" }}>
              {CHANNELS.map((ch, i) => (
                <div
                  key={ch}
                  className="isla-ch"
                  style={{
                    padding: "5px 14px",
                    fontSize: 12,
                    color: i === 0 ? "#4db8ff" : "#5a7080",
                    cursor: "pointer",
                    borderRadius: 5,
                    margin: "1px 6px",
                    background: i === 0 ? "rgba(77,184,255,0.1)" : "transparent",
                    transition: "background 0.15s",
                    textAlign: "left",
                  }}
                >
                  {ch}
                </div>
              ))}
            </div>
          </div>

          {/* Chat */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#0D1B26", overflow: "hidden" }}>
            {/* Chat header */}
            <div
              style={{
                padding: "12px 18px",
                borderBottom: "0.5px solid rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "#060C12",
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 500, color: "#dde6ee" }}># isla-signals</span>
              <span style={{ fontSize: 11, color: "#5a7080" }}>· Isla delivers signals here</span>
            </div>

            {/* Messages */}
            <div
              className="isla-scrollbar"
              style={{
                flex: 1,
                overflowY: "auto",
                overflowAnchor: "none",
                padding: "14px 18px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                textAlign: "left",
                gap: 12,
              }}
            >
              {messages.length === 0 && !isTyping && (
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    color: "#5a7080",
                    opacity: 0.5,
                  }}
                >
                  Waiting for signals...
                </div>
              )}
              {messages.map((signal, i) => (
                <Message key={i} signal={signal} isTyping={false} onToast={showToast} />
              ))}
              {isTyping && (
                <Message signal={{ badge: "bl", badgeLabel: "", title: "", body: "", actions: [] }} isTyping={true} onToast={showToast} />
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input bar */}
            <div
              style={{
                padding: "8px 18px",
                borderTop: "0.5px solid rgba(255,255,255,0.06)",
                background: "#060C12",
              }}
            >
              <input
                type="text"
                placeholder="Reply to Isla..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.04)",
                  border: "0.5px solid rgba(255,255,255,0.1)",
                  borderRadius: 7,
                  padding: "7px 11px",
                  fontSize: 12,
                  color: "#dde6ee",
                  fontFamily: "inherit",
                  outline: "none",
                }}
              />
            </div>
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <div
            style={{
              position: "absolute",
              bottom: 60,
              left: "50%",
              transform: "translateX(-50%)",
              background: "#112030",
              border: "0.5px solid rgba(56,201,160,0.3)",
              color: "#38c9a0",
              fontSize: 11,
              padding: "5px 14px",
              borderRadius: 20,
              whiteSpace: "nowrap",
              animation: "isla-fadeup 0.2s ease",
              zIndex: 100,
            }}
          >
            {toast}
          </div>
        )}
      </div>
    </>
  );
}
