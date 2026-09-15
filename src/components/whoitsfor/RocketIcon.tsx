export function RocketIcon() {
  return (
    <div className="relative h-12 w-12">
      <style>{`
        @keyframes rocket-shake {
          0%, 100% { transform: translate(0, 0) rotate(-2deg); }
          25% { transform: translate(0.6px, -1px) rotate(-1deg); }
          50% { transform: translate(-0.6px, -1.5px) rotate(-3deg); }
          75% { transform: translate(0.6px, -1px) rotate(-1deg); }
        }
        @keyframes flame-flicker {
          0%, 100% { transform: scaleY(1) scaleX(1); opacity: 0.95; }
          50% { transform: scaleY(1.3) scaleX(0.85); opacity: 1; }
        }
        @keyframes smoke-puff {
          0% { transform: translate(var(--tx, 0), 0) scale(0.4); opacity: 0; }
          30% { opacity: 0.6; }
          100% { transform: translate(var(--tx, 0), 18px) scale(1.4); opacity: 0; }
        }
        .group:hover .rocket-body { animation: rocket-shake 0.12s linear infinite; }
        .group:hover .rocket-flame { animation: flame-flicker 0.18s ease-in-out infinite; opacity: 1; }
        .group:hover .rocket-smoke { animation: smoke-puff 0.9s ease-out infinite; opacity: 1; }
        .rocket-flame, .rocket-smoke { opacity: 0; transition: opacity 0.2s; }
        .smoke-1 { --tx: -3px; animation-delay: 0s !important; }
        .smoke-2 { --tx: 3px; animation-delay: 0.3s !important; }
        .smoke-3 { --tx: 0px; animation-delay: 0.6s !important; }
      `}</style>

      {/* Smoke */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <div className="rocket-smoke smoke-1 absolute h-2 w-2 rounded-full bg-slate-300 dark:bg-white/30" />
        <div className="rocket-smoke smoke-2 absolute h-2 w-2 rounded-full bg-slate-300 dark:bg-white/30" />
        <div className="rocket-smoke smoke-3 absolute h-2 w-2 rounded-full bg-slate-300 dark:bg-white/30" />
      </div>

      {/* Rocket */}
      <svg viewBox="0 0 48 48" className="rocket-body dark:text-white absolute inset-0 origin-bottom">
        {/* Body */}
        <path
          d="M24 6 C28 10 30 16 30 24 L30 32 L18 32 L18 24 C18 16 20 10 24 6 Z"
          className="fill-[#475569] dark:fill-[#8A8F98]"
        />
        {/* Window */}
        <circle cx="24" cy="20" r="3" fill="#00BFFF" />
        <circle cx="24" cy="20" r="3" fill="none" className="stroke-[#0F172A] dark:stroke-white" strokeWidth="1" />
        {/* Fins */}
        <path d="M18 26 L12 34 L18 32 Z" className="fill-[#0F172A] dark:fill-white" />
        <path d="M30 26 L36 34 L30 32 Z" className="fill-[#0F172A] dark:fill-white" />
        {/* Bottom */}
        <rect x="18" y="32" width="12" height="2" className="fill-[#0F172A] dark:fill-white" />
        {/* Flame */}
        <g className="rocket-flame" style={{ transformOrigin: "24px 34px" }}>
          <path d="M21 34 Q24 44 27 34 Z" fill="#FFB020" />
          <path d="M22 34 Q24 40 26 34 Z" fill="#FF5722" />
          <path d="M23 34 Q24 38 25 34 Z" fill="#FFEB3B" />
        </g>
      </svg>
    </div>
  );
}
