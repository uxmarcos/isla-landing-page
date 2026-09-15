import { Star } from "lucide-react";
import logoYC from "@/assets/investors/yc.svg";
import logoA16Z from "@/assets/investors/a16z.svg";
import logoLatitud from "@/assets/investors/latitud.svg";
import logoMIT from "@/assets/investors/mit.svg";
import logoLinkVentures from "@/assets/investors/linkventures.svg";

const investorLogos: { name: string; src: string; height: number }[] = [
  { name: "Y Combinator", src: logoYC, height: 40 },
  { name: "Andreessen Horowitz", src: logoA16Z, height: 30 },
  { name: "Latitud", src: logoLatitud, height: 26 },
  { name: "MIT", src: logoMIT, height: 24 },
  { name: "Link Ventures", src: logoLinkVentures, height: 22 },
];

export function TrustedBy() {
  const base = [...investorLogos, ...investorLogos];
  const loop = [...base, ...base];
  return (
    <section
      data-nav-theme="light"
      className="relative w-full self-stretch border-t border-[#D3D3D3] bg-[#FBFBFB] dark:border-white/10 dark:bg-black"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-[18px] px-6 py-[18px] lg:px-20 xl:px-[150px]">
        {/* Row 1 — label + rating */}
        <div className="flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-white">
            Trusted by founders from
          </span>
          <div className="hidden items-center gap-3 sm:flex">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-3.5 w-3.5 fill-isla-cyan text-isla-cyan"
                />
              ))}
            </div>
            <p className="text-[14px] italic text-slate-700 dark:text-white/70">
              "Finally, a tool that tells me what to do."
            </p>
          </div>
        </div>

        {/* Row 2 — infinite logo marquee */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="flex w-max animate-marquee items-center gap-x-20">
            {loop.map((l, i) => (
              <img
                key={`${l.name}-${i}`}
                src={l.src}
                alt={l.name}
                style={{ height: l.height }}
                className="w-auto shrink-0 select-none object-contain opacity-80 grayscale dark:invert"
                draggable={false}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustedBy;