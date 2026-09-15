export function TeamIcon() {
  return (
    <div className="relative h-12 w-12">
      <style>{`
        @keyframes float-a { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        @keyframes float-b { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        @keyframes float-c { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        @keyframes link-pulse {
          0%, 100% { stroke-dashoffset: 0; opacity: 0.4; }
          50% { stroke-dashoffset: -8; opacity: 1; }
        }
        @keyframes ring-pulse {
          0% { transform: scale(0.6); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .team-link { opacity: 0; transition: opacity 0.3s; stroke-dasharray: 4 4; }
        .team-ring { opacity: 0; transform-origin: center; }
        .group:hover .person-a { animation: float-a 1.6s ease-in-out infinite; }
        .group:hover .person-b { animation: float-b 1.6s ease-in-out 0.2s infinite; }
        .group:hover .person-c { animation: float-c 1.6s ease-in-out 0.4s infinite; }
        .group:hover .team-link { opacity: 1; animation: link-pulse 1.4s linear infinite; }
        .group:hover .team-ring { animation: ring-pulse 1.6s ease-out infinite; }
      `}</style>

      <svg viewBox="0 0 48 48" className="absolute inset-0">
        {/* Connection lines */}
        <line x1="12" y1="32" x2="24" y2="20" className="team-link" stroke="#00BFFF" strokeWidth="1.2" />
        <line x1="36" y1="32" x2="24" y2="20" className="team-link" stroke="#00BFFF" strokeWidth="1.2" />
        <line x1="12" y1="32" x2="36" y2="32" className="team-link" stroke="#00BFFF" strokeWidth="1.2" />

        {/* Pulse rings */}
        <circle cx="24" cy="14" r="5" className="team-ring" fill="none" stroke="#00BFFF" strokeWidth="1" style={{ transformOrigin: "24px 14px" }} />
        <circle cx="12" cy="32" r="5" className="team-ring" fill="none" stroke="#00BFFF" strokeWidth="1" style={{ transformOrigin: "12px 32px", animationDelay: "0.3s" }} />
        <circle cx="36" cy="32" r="5" className="team-ring" fill="none" stroke="#00BFFF" strokeWidth="1" style={{ transformOrigin: "36px 32px", animationDelay: "0.6s" }} />

        {/* Person A — top */}
        <g className="person-a" style={{ transformOrigin: "24px 16px" }}>
          <circle cx="24" cy="12" r="3.5" className="fill-[#0F172A] dark:fill-white" />
          <path d="M18 22 Q24 17 30 22 L29 26 L19 26 Z" className="fill-[#475569] dark:fill-[#8A8F98]" />
        </g>
        {/* Person B — bottom left */}
        <g className="person-b" style={{ transformOrigin: "12px 34px" }}>
          <circle cx="12" cy="30" r="3.5" className="fill-[#0F172A] dark:fill-white" />
          <path d="M6 40 Q12 35 18 40 L17 44 L7 44 Z" className="fill-[#475569] dark:fill-[#8A8F98]" />
        </g>
        {/* Person C — bottom right */}
        <g className="person-c" style={{ transformOrigin: "36px 34px" }}>
          <circle cx="36" cy="30" r="3.5" className="fill-[#0F172A] dark:fill-white" />
          <path d="M30 40 Q36 35 42 40 L41 44 L31 44 Z" className="fill-[#475569] dark:fill-[#8A8F98]" />
        </g>
      </svg>
    </div>
  );
}
