import { useEffect, useState } from "react";
import { Network } from "lucide-react";
import CardSwap, { Card } from "@/components/ui/CardSwap";
import { DeckIcon, DraftIcon, SwipeIcon } from "@/components/idea-deck/icons";
import { useLocale } from "@/hooks/useLocale";

type Idea = {
  pillar: string;
  badge: "idea" | "trending";
  title: string;
  angle: string;
  tags: string[];
};

const FEATURE_ICONS = [DeckIcon, SwipeIcon, DraftIcon];

function IdeaCard({ idea }: { idea: Idea }) {
  const { dict } = useLocale();
  const trending = idea.badge === "trending";
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 md:p-6 shadow-[0_22px_55px_-30px_rgba(15,23,42,0.28)] dark:border-[#2C2C2C] dark:bg-[#111111]">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-isla-cyan/10 px-3 py-1 text-[13px] font-semibold text-isla-cyan">
          {idea.pillar}
        </span>
        <span
          className={
            trending
              ? "flex items-center gap-1 rounded-full border border-[#F5A25D]/50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#E4842E]"
              : "rounded-full border border-slate-200 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-400 dark:border-[#2C2C2C] dark:text-white/45"
          }
        >
          {trending ? dict.contentSwipe.trending : dict.contentSwipe.idea}
        </span>
      </div>

      <h3 className="mt-4 line-clamp-4 text-[14.5px] font-semibold leading-[1.4] text-slate-900 md:line-clamp-3 md:text-[17px] dark:text-white">
        {idea.title}
      </h3>

      <p className="mt-3 line-clamp-3 text-[13px] leading-relaxed text-slate-500 md:line-clamp-2 md:text-[14px] dark:text-white/60">
        {idea.angle}
      </p>

      <div className="mt-auto pt-4">
        <button
          type="button"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-2 text-[13px] font-semibold text-isla-cyan transition-opacity hover:opacity-80"
        >
          <Network className="h-4 w-4" strokeWidth={2.25} />
          {dict.contentSwipe.viewOnGraph}
        </button>
        <div className="mt-3 flex flex-nowrap gap-2 overflow-hidden">
          {idea.tags.map((t) => (
            <span
              key={t}
              className="whitespace-nowrap rounded-full border border-slate-200 px-2.5 py-1 text-[11.5px] text-slate-500 dark:border-[#2C2C2C] dark:text-white/45"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}

function useCardSize() {
  const [size, setSize] = useState({
    width: 400,
    height: 330,
    cardDistance: 42,
    verticalDistance: 52,
  });

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      if (vw >= 768) {
        setSize({ width: 400, height: 330, cardDistance: 42, verticalDistance: 52 });
      } else {
        const width = Math.min(360, vw - 48);
        setSize({ width, height: 330, cardDistance: 22, verticalDistance: 30 });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}

export function ContentSwipeSection() {
  const { width, height, cardDistance, verticalDistance } = useCardSize();
  const { dict } = useLocale();
  const FEATURES = dict.contentSwipe.features.map((f, i) => ({ ...f, Icon: FEATURE_ICONS[i] }));
  const IDEAS: Idea[] = dict.contentSwipe.ideas;

  return (
    <section
      id="conteudo"
      data-nav-theme="light"
      className="relative w-full scroll-mt-20 overflow-hidden border-t border-[#D3D3D3] bg-white py-20 md:py-28 dark:border-[#2C2C2C] dark:bg-[#0A0A0A]"
    >
      <div className="mx-auto max-w-6xl px-6">
        <h2
          className="font-display mx-auto max-w-3xl text-center text-[36px] font-light leading-[1.1] text-slate-900 md:text-[58px] dark:text-white"
          style={{ letterSpacing: "-1px" }}
        >
          {dict.contentSwipe.headlineLine1}
          <br />
          <em className="font-display italic text-isla-cyan">
            {dict.contentSwipe.headlineLine2}
          </em>
        </h2>

        <div className="mt-14 grid grid-cols-1 items-center gap-14 md:mt-20 md:grid-cols-[40%_60%] md:gap-8">
          {/* Features */}
          <ul className="order-1 space-y-9">
            {FEATURES.map(({ Icon, title, desc }) => (
              <li key={title} className="flex gap-4">
                <span className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-isla-cyan/10 text-[#015268] dark:text-[#7FD8FF]">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-[20px] font-medium text-slate-900 dark:text-white">
                    {title}
                  </h3>
                  <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-slate-500 dark:text-white/65">
                    {desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* Card stage */}
          <div className="relative order-2 mx-auto h-[470px] w-full max-w-[520px] md:h-[520px]">
            <CardSwap
              key={`${width}x${height}`}
              width={width}
              height={height}
              cardDistance={cardDistance}
              verticalDistance={verticalDistance}
              delay={5000}
              pauseOnHover={false}
              skewAmount={6}
              easing="elastic"
            >
              {IDEAS.map((idea) => (
                <Card key={idea.title}>
                  <IdeaCard idea={idea} />
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>

      </div>
    </section>
  );
}

export default ContentSwipeSection;
