export function EnergyIcon() {
  return (
    <div className="relative h-12 w-12">
      <style>{`
        @keyframes bolt-flicker {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 4px #FFD700); }
          25% { transform: scale(1.12); filter: drop-shadow(0 0 14px #FFD700) drop-shadow(0 0 4px #FFA500); }
          50% { transform: scale(0.96); filter: drop-shadow(0 0 8px #FFD700); opacity: 0.85; }
          75% { transform: scale(1.08); filter: drop-shadow(0 0 16px #FFEA00); }
        }
        @keyframes spark-fly {
          0% { transform: translate(0, 0) scale(0); opacity: 1; }
          100% { transform: translate(var(--dx), var(--dy)) scale(1); opacity: 0; }
        }
        @keyframes arc-flash {
          0%, 100% { opacity: 0; }
          40%, 60% { opacity: 1; }
        }
        .bolt { transition: filter 0.3s; }
        .spark, .arc { opacity: 0; }
        .group:hover .bolt { animation: bolt-flicker 0.45s ease-in-out infinite; transform-origin: center; }
        .group:hover .spark { animation: spark-fly 0.7s ease-out infinite; }
        .group:hover .arc { animation: arc-flash 0.3s steps(2) infinite; }
        .spark-1 { --dx: 14px; --dy: -10px; animation-delay: 0s !important; }
        .spark-2 { --dx: -12px; --dy: -8px; animation-delay: 0.15s !important; }
        .spark-3 { --dx: 12px; --dy: 12px; animation-delay: 0.3s !important; }
        .spark-4 { --dx: -14px; --dy: 10px; animation-delay: 0.45s !important; }
      `}</style>

      <svg viewBox="0 0 48 48" className="absolute inset-0 overflow-visible">
        {/* Arc flashes */}
        <path className="arc" d="M10 14 L18 18 L14 22" fill="none" stroke="#FFEA00" strokeWidth="1" strokeLinecap="round" />
        <path className="arc" d="M38 30 L32 26 L36 22" fill="none" stroke="#FFEA00" strokeWidth="1" strokeLinecap="round" style={{ animationDelay: "0.15s" }} />

        {/* Sparks */}
        <circle cx="24" cy="24" r="1.2" className="spark spark-1" fill="#FFD700" />
        <circle cx="24" cy="24" r="1" className="spark spark-2" fill="#FFEA00" />
        <circle cx="24" cy="24" r="1.2" className="spark spark-3" fill="#FFA500" />
        <circle cx="24" cy="24" r="1" className="spark spark-4" fill="#FFD700" />

        {/* Lightning bolt */}
        <g className="bolt" style={{ transformOrigin: "24px 24px" }}>
          <path
            d="M26 6 L14 28 L22 28 L20 42 L34 18 L26 18 Z"
            fill="#FFD700"
            stroke="#F59E0B"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
}
