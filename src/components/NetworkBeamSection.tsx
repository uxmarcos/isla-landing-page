import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import avLarissa from "@/assets/leads/larissa.jpg";
import avChris from "@/assets/leads/chris.jpg";
import avEduardo from "@/assets/leads/eduardo.jpg";
import avMarina from "@/assets/leads/marina.jpg";
import avDaniel from "@/assets/leads/daniel.jpg";
import avSofia from "@/assets/leads/sofia.jpg";
import avTomas from "@/assets/leads/tomas.jpg";
import avAmelia from "@/assets/leads/amelia.jpg";
import avRafael from "@/assets/leads/rafael.jpg";

/* ── Icons (from design assets) ───────────────────────────── */
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 25 25" className="h-[22px] w-[22px] text-[#015268] dark:text-[#7FD8FF]" fill="none">
      <path d="M4.58589 9.52656L4.0859 9.52359C3.14311 9.518 2.67172 9.5152 2.37708 9.80634C2.08246 10.0975 2.07966 10.5689 2.07406 11.5117L2.02359 20.0115C2.018 20.9543 2.0152 21.4257 2.30634 21.7203C2.5975 22.015 3.06889 22.0178 4.01168 22.0234L4.51167 22.0263C5.45447 22.0319 5.92586 22.0347 6.22049 21.7436C6.51512 21.4524 6.51792 20.981 6.52351 20.0383L6.57398 11.5384C6.57958 10.5956 6.58238 10.1242 6.29123 9.82958C6.00008 9.53496 5.52869 9.53216 4.58589 9.52656Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.61742 4.2884C6.61004 5.53102 5.59672 6.53238 4.3541 6.525C3.11148 6.51762 2.11012 5.5043 2.1175 4.26168C2.12488 3.01906 3.1382 2.0177 4.38082 2.02508C5.62344 2.03246 6.6248 3.04578 6.61742 4.2884Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12.4119 9.57342L11.5859 9.56852C10.6431 9.56292 10.1717 9.56012 9.87708 9.85126C9.58246 10.1424 9.57966 10.6138 9.57406 11.5566L9.52359 20.0565C9.518 20.9992 9.5152 21.4706 9.80634 21.7653C10.0975 22.0599 10.5689 22.0627 11.5117 22.0683L12.0117 22.0713C12.9545 22.0769 13.4258 22.0797 13.7205 21.7885C14.0151 21.4973 14.0179 21.026 14.0235 20.0832L14.0444 16.5833C14.0542 14.9266 14.5902 13.5865 16.15 13.5958C16.9298 13.6004 17.5581 14.2758 17.5531 15.1041L17.5264 19.6041C17.5208 20.5468 17.518 21.0182 17.8092 21.3129C18.1002 21.6075 18.5717 21.6103 19.5145 21.6159L20.0132 21.6189C20.9558 21.6245 21.4271 21.6273 21.7217 21.3362C22.0163 21.0451 22.0192 20.5739 22.025 19.6313L22.0591 14.131C22.0739 11.6458 19.7222 9.61707 17.3826 9.60317C16.0507 9.59527 14.8587 10.2411 14.076 11.2573C14.0797 10.6272 14.0815 10.3122 13.9461 10.0775C13.8603 9.92889 13.7376 9.80483 13.5901 9.71729C13.357 9.57903 13.042 9.57716 12.4119 9.57342Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 25 25" className="h-[22px] w-[22px] text-[#015268] dark:text-[#7FD8FF]" fill="none">
      <path d="M17.0717 12.1003C17.0553 14.8617 14.8035 17.0869 12.0421 17.0705C9.28073 17.0541 7.05548 14.8023 7.07188 12.0409C7.08827 9.27956 9.3401 7.05431 12.1015 7.0707" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14.1295 2.28301C13.4841 2.14799 12.8156 2.07516 12.1307 2.07109C6.60793 2.0383 2.10428 6.48879 2.07148 12.0115C2.03869 17.5342 6.48918 22.0379 12.0119 22.0707C17.5346 22.1035 22.0383 17.653 22.0711 12.1303C22.0752 11.4454 22.0103 10.7761 21.883 10.1291" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12.1011 12.0335L16.6809 7.50772M19.8563 4.46154L19.3149 2.47115C19.2149 2.14318 18.8218 2.01038 18.555 2.22577C17.112 3.39078 15.5382 4.9622 16.801 7.46302C19.3679 8.67864 20.847 7.06869 21.9818 5.71486C22.2076 5.4455 22.0748 5.03777 21.7378 4.93815L19.8563 4.46154Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RadarIcon() {
  return (
    <svg viewBox="0 0 25 25" className="h-[22px] w-[22px] text-[#015268] dark:text-[#7FD8FF]" fill="none">
      <path d="M12.0622 13.5714C12.8906 13.5763 13.5662 12.9087 13.5711 12.0803C13.576 11.2519 12.9084 10.5763 12.0801 10.5714C11.2517 10.5665 10.5761 11.2341 10.5712 12.0625C10.5663 12.8909 11.2339 13.5664 12.0622 13.5714Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.1073 6.07078C8.79366 6.05111 6.09147 8.7214 6.0718 12.0351C6.05212 15.3487 8.72241 18.0509 12.0361 18.0706C15.3497 18.0902 18.0519 15.4199 18.0716 12.1063C18.0814 10.4494 17.4187 8.94552 16.3394 7.8533" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.1307 2.07109C6.60793 2.0383 2.10428 6.48879 2.07148 12.0115C2.03869 17.5342 6.48918 22.0379 12.0119 22.0707C17.5346 22.1035 22.0383 17.653 22.0711 12.1303C22.0875 9.36892 20.9831 6.86232 19.1843 5.04196L12.0713 12.0709" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IslaMark() {
  return (
    <svg viewBox="0 0 46 44" className="h-8 w-8 text-[#383838] dark:text-white" fill="none">
      <path d="M23.5926 0.0220289C28.0112 -0.14216 32.3607 0.5346 34.8121 4.68223C35.4869 6.12876 36.5245 6.79849 37.2721 7.28147C37.5398 7.45449 37.7709 7.60347 37.9346 7.75579C38.221 8.02999 39.0634 8.48597 39.9673 8.97353C41.138 9.60492 42.4109 10.2907 42.7078 10.7108C45.1876 14.1873 45.5242 16.2468 45.4257 20.4114C44.6123 24.4191 41.333 33.9113 34.72 39.8181C30.7052 42.0398 27.2639 43.7183 22.6893 43.3679C22.5634 43.3594 22.436 43.3517 22.309 43.3434C21.4122 43.285 20.4908 43.2249 19.6158 43.0744C18.8603 42.9616 18.1246 42.7737 17.3891 42.5867C16.9643 42.4788 16.5388 42.372 16.1092 42.2782C15.8561 42.2229 15.6064 42.1677 15.36 42.1144C11.4757 41.2739 8.41543 40.6118 5.25676 37.7817C4.66596 37.2523 4.21192 36.6311 3.74915 35.9974C3.69808 35.9275 3.64633 35.8567 3.59483 35.7866C1.66377 33.1564 0.213213 30.2498 0.03191 26.9367C-0.0441999 25.545 0.014795 24.065 0.220132 22.685C0.28223 22.2678 0.364527 21.853 0.447864 21.439C0.509191 21.1343 0.571945 20.8302 0.624792 20.5243C0.69086 20.1418 0.757045 19.759 0.824308 19.3762C1.09808 17.8176 1.3728 16.2551 1.5734 14.6878C1.69735 13.7193 1.77232 12.7509 1.84631 11.7798C1.85945 11.6074 1.8724 11.4349 1.88584 11.2622C1.8948 11.147 1.90369 11.0314 1.91218 10.9159C1.96941 10.139 2.0257 9.35724 2.22651 8.60275C2.53783 7.43292 3.12913 6.25961 3.94302 5.35793C8.03414 0.826377 16.8077 0.372801 22.9716 0.0540227C23.1817 0.0431526 23.3889 0.0327448 23.5926 0.0220289ZM24.6522 5.62895C20.3377 2.92721 15.0565 0.775997 10.7526 3.4946C4.42188 7.49379 1.50475 13.9535 3.76987 22.4083C5.56908 29.1231 8.67544 34.0682 12.1417 37.8004C17.5986 43.6765 27.2366 40.4665 32.8942 34.7834C38.8308 28.8203 44.5634 24.1421 42.6156 16.8728C40.1307 7.59987 33.5751 11.2159 24.6522 5.62895Z" fill="currentColor" />
    </svg>
  );
}

/* ── Data ─────────────────────────────────────────────────── */
const sources = [
  { Icon: LinkedInIcon, title: "Your posts", desc: "People engaging with your content" },
  { Icon: TargetIcon, title: "Competitor", desc: "People engaging with competitors' posts" },
  { Icon: RadarIcon, title: "Your niche", desc: "People within your area of expertise" },
];

type Lead = { name: string; role: string; company: string; score: number; avatar: string };

const leadPool: Lead[][] = [
  [
    { name: "Larissa Santos", role: "CEO", company: "Revolution", score: 94, avatar: avLarissa },
    { name: "Chris Richard", role: "CMO", company: "Blue Space", score: 88, avatar: avChris },
    { name: "Eduardo Schuch", role: "Founder", company: "Isla", score: 91, avatar: avEduardo },
  ],
  [
    { name: "Marina Alves", role: "Head of Growth", company: "Northwind", score: 97, avatar: avMarina },
    { name: "Daniel Okafor", role: "VP Sales", company: "Loopfy", score: 83, avatar: avDaniel },
    { name: "Sofia Marchetti", role: "COO", company: "Arcadia", score: 90, avatar: avSofia },
  ],
  [
    { name: "Tomás Vieira", role: "CEO", company: "Kindred", score: 86, avatar: avTomas },
    { name: "Amelia Ford", role: "CRO", company: "Vertex Labs", score: 98, avatar: avAmelia },
    { name: "Rafael Nunes", role: "Founder", company: "Basecamp X", score: 92, avatar: avRafael },
  ],
];

function LeadCard({ lead, phase }: { lead: Lead; phase: number }) {
  return (
    <div
      key={phase}
      className="isla-lead-enter flex w-full flex-col items-center gap-1 rounded-xl border border-slate-200 bg-white p-2 text-center shadow-[0_8px_24px_-18px_rgba(15,23,42,0.5)] md:ml-0 md:w-[218px] md:max-w-none md:flex-row md:items-center md:gap-3 md:p-3.5 md:text-left dark:border-[#2C2C2C] dark:bg-[#111111] dark:shadow-none"
    >
      <img
        src={lead.avatar}
        alt={`${lead.name}, ${lead.role} at ${lead.company}`}
        decoding="sync"
        width={512}
        height={512}
        className="h-7 w-7 flex-shrink-0 rounded-full object-cover md:h-10 md:w-10"
      />
      <div className="min-w-0 flex-1">
        <div className="truncate text-[11px] font-semibold text-slate-900 md:text-[13.5px] dark:text-white">
          <span className="md:hidden">{lead.name.split(" ")[0]}</span>
          <span className="hidden md:inline">{lead.name}</span>
        </div>
        <p className="truncate text-[9.5px] leading-snug text-slate-500 md:text-[11.5px] dark:text-white/65">
          <span className="md:hidden">{lead.role}</span>
          <span className="hidden md:inline">
            {lead.role} · {lead.company}
          </span>
        </p>
      </div>
      <div className="hidden flex-col items-end sm:flex">
        <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-slate-400 dark:text-white/45">
          Score
        </span>
        <span className="text-[15px] font-semibold text-isla-cyan">{lead.score}</span>
      </div>
    </div>
  );
}

type Pt = { x: number; y: number };

export function NetworkBeamSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const srcRefs = useRef<(HTMLDivElement | null)[]>([]);
  const leadRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [paths, setPaths] = useState<{ left: string[]; right: string[] }>({ left: [], right: [] });
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [phase, setPhase] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Preload every avatar up-front so a card swap never waits on an image.
  useEffect(() => {
    leadPool.flat().forEach((l) => {
      const img = new Image();
      img.src = l.avatar;
    });
  }, []);

  // Cards flip exactly when the beam lands on the right column (end of cycle).
  useEffect(() => {
    const id = setInterval(() => setPhase((p) => (p + 1) % leadPool.length), 2000);
    return () => clearInterval(id);
  }, []);
  const leads = leadPool[phase];

  const measure = useCallback(() => {
    const c = containerRef.current;
    const hub = hubRef.current;
    if (!c || !hub) return;
    const cb = c.getBoundingClientRect();
    const hb = hub.getBoundingClientRect();
    setBox({ w: cb.width, h: cb.height });

    const vertical = window.innerWidth < 768;

    const rel = (r: DOMRect, side: "left" | "right"): Pt => ({
      x: (side === "left" ? r.left : r.right) - cb.left,
      y: r.top + r.height / 2 - cb.top,
    });

    const relV = (r: DOMRect, side: "top" | "bottom"): Pt => ({
      x: r.left + r.width / 2 - cb.left,
      y: (side === "top" ? r.top : r.bottom) - cb.top,
    });

    // single convergence / divergence points on the hub edges
    const inPt: Pt = vertical
      ? { x: hb.left + hb.width / 2 - cb.left, y: hb.top - cb.top - 6 }
      : { x: hb.left - cb.left - 6, y: hb.top + hb.height / 2 - cb.top };
    const outPt: Pt = vertical
      ? { x: hb.left + hb.width / 2 - cb.left, y: hb.bottom - cb.top + 6 }
      : { x: hb.right - cb.left + 6, y: hb.top + hb.height / 2 - cb.top };

    const curve = (a: Pt, b: Pt) => {
      if (vertical) {
        const dy = Math.abs(b.y - a.y);
        const c1 = { x: a.x, y: a.y + dy * 0.55 };
        const c2 = { x: b.x, y: b.y - dy * 0.55 };
        return `M ${a.x} ${a.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${b.x} ${b.y}`;
      }
      const dx = Math.abs(b.x - a.x);
      const c1 = { x: a.x + dx * 0.55, y: a.y };
      const c2 = { x: b.x - dx * 0.55, y: b.y };
      return `M ${a.x} ${a.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${b.x} ${b.y}`;
    };

    const left = srcRefs.current
      .filter(Boolean)
      .map((el) =>
        vertical
          ? curve(relV(el!.getBoundingClientRect(), "bottom"), inPt)
          : curve(rel(el!.getBoundingClientRect(), "right"), inPt),
      );
    const right = leadRefs.current
      .filter(Boolean)
      .map((el) =>
        vertical
          ? curve(outPt, relV(el!.getBoundingClientRect(), "top"))
          : curve(outPt, rel(el!.getBoundingClientRect(), "left")),
      );

    setPaths({ left, right });
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure, isMobile]);

  useEffect(() => {
    const ro = new ResizeObserver(() => measure());
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  return (
    <section
      id="network"
      data-nav-theme="light"
      className="relative w-full scroll-mt-20 border-t border-[#D3D3D3] bg-white py-24 md:py-32 dark:border-[#2C2C2C] dark:bg-[#0A0A0A]"
    >
      <style>{`
        @keyframes isla-beam-left { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -200; } }
        @keyframes isla-beam-right { from { stroke-dashoffset: 100; } to { stroke-dashoffset: -100; } }
        @keyframes isla-lead-in {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .isla-lead-enter { animation: isla-lead-in 0.22s ease-out both; }
        .isla-beam { stroke-dasharray: 14 186; }
        .isla-beam-l { animation: isla-beam-left 2s linear infinite; }
        .isla-beam-r { animation: isla-beam-right 2s linear infinite; }
      `}</style>

      <div className="mx-auto max-w-[1120px] px-4 md:px-6">
        <h2 className="font-display mx-auto max-w-3xl text-center text-[38px] font-light leading-[1.12] tracking-[-0.4px] text-black md:text-[56px] dark:text-white">
          Your next client is already{" "}
          <span className="font-normal italic tracking-[-2.4px] text-isla-cyan">
            in your network.
          </span>
        </h2>

        {/* Diagram */}
        <div className="flex justify-center">
        <div
          ref={containerRef}
          className="relative mx-auto mt-10 flex w-full max-w-[960px] flex-col items-center gap-9 md:mt-16 md:flex-row md:items-center md:justify-between md:gap-4"
        >
          {/* Beams */}
          <svg
            className="pointer-events-none absolute inset-0 z-0 h-full w-full"
            width={box.w}
            height={box.h}
            fill="none"
          >
            <defs>
              <linearGradient
                id="isla-beam-grad"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="0"
                x2={box.w || 1}
                y2="0"
              >
                <stop offset="0%" stopColor="#00BFFF" stopOpacity="0" />
                <stop offset="45%" stopColor="#00BFFF" />
                <stop offset="55%" stopColor="#00BFFF" />
                <stop offset="100%" stopColor="#00BFFF" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[...paths.left, ...paths.right].map((d, i) => (
              <path key={`base-${i}`} d={d} className="stroke-[#E2E8F0] dark:stroke-white/10" strokeWidth="1.6" fill="none" />
            ))}
            {paths.left.map((d, i) => (
              <path
                key={`bl-${i}`}
                d={d}
                pathLength={100}
                stroke="#00BFFF"
                strokeWidth="2.4"
                strokeLinecap="round"
                fill="none"
                className="isla-beam isla-beam-l"
              />
            ))}
            {paths.right.map((d, i) => (
              <path
                key={`br-${i}`}
                d={d}
                pathLength={100}
                stroke="#00BFFF"
                strokeWidth="2.4"
                strokeLinecap="round"
                fill="none"
                className="isla-beam isla-beam-r"
              />
            ))}
          </svg>

          {/* Sources */}
          <div className="relative z-10 flex w-full min-w-0 items-stretch justify-center gap-2 md:w-auto md:flex-col md:gap-5">
            {sources.map((s, i) => (
              <div
                key={s.title}
                ref={(el) => {
                  srcRefs.current[i] = el;
                }}
                className="flex flex-1 flex-col items-center gap-1 rounded-xl border border-slate-200 bg-white p-2 text-center shadow-[0_8px_24px_-18px_rgba(15,23,42,0.5)] md:w-[210px] md:max-w-none md:flex-none md:flex-row md:items-start md:gap-3 md:p-3.5 md:text-left dark:border-[#2C2C2C] dark:bg-[#111111] dark:shadow-none"
              >
                <span className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#EAF7FD] [&_svg]:h-[16px] [&_svg]:w-[16px] md:mt-0.5 md:h-9 md:w-9 md:[&_svg]:h-[22px] md:[&_svg]:w-[22px] dark:bg-[#1A1A1A]">
                  <s.Icon />
                </span>
                <div className="min-w-0 w-full">
                  <div className="text-[8.5px] font-medium uppercase tracking-[0.1em] text-slate-400 md:text-[10px] dark:text-white/45">
                    Source
                  </div>
                  <div className="truncate text-[11px] font-semibold leading-snug text-slate-900 md:text-[14px] dark:text-white">
                    {s.title}
                  </div>
                  <p className="mt-0.5 hidden text-[11.5px] leading-snug text-slate-500 md:block dark:text-white/65">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Hub */}
          <div className="relative z-20 flex flex-shrink-0 items-center justify-center">
            <div
              ref={hubRef}
              className="relative flex h-[42px] w-[42px] items-center justify-center rounded-[14px] border border-slate-200 bg-white shadow-[0_10px_30px_-16px_rgba(15,23,42,0.35)] [&_svg]:h-6 [&_svg]:w-6 md:h-[68px] md:w-[68px] md:rounded-[18px] md:[&_svg]:h-8 md:[&_svg]:w-8 dark:border-[#2C2C2C] dark:bg-[#111111] dark:shadow-none"
            >
              <IslaMark />
            </div>
          </div>

          {/* Leads */}
          <div className="relative z-10 flex w-full min-w-0 items-stretch justify-center gap-2 md:w-auto md:flex-col md:gap-5">
            {leads.map((l, i) => (
              <div
                key={i}
                ref={(el) => {
                  leadRefs.current[i] = el;
                }}
                className="flex flex-1 md:flex-none"
              >
                <LeadCard lead={l} phase={phase} />
              </div>
            ))}
          </div>
        </div>
        </div>

        <p className="mx-auto mt-14 max-w-[720px] text-center text-[14.5px] leading-relaxed text-slate-500 md:text-[15.5px] dark:text-white/65">
          Isla captures signals from three sources, filters them through its ICP, and returns
          profiles ready to start the conversation. Content that is bait, not marketing.
        </p>
      </div>
    </section>
  );
}

export default NetworkBeamSection;
