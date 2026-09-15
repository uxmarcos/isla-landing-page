import { useEffect, useRef, useState } from "react";
import Step1ConnectAnimation from "./Step1ConnectAnimation";
import Step2GoalsAnimation from "./Step2GoalsAnimation";
import Step3SignalsAnimation from "./Step3SignalsAnimation";
import { useIsMobile } from "@/hooks/use-mobile";

const STEPS = [
  {
    id: 1,
    title: "Connect your LinkedIn",
    description:
      "Isla analyzes your profile, audience, and content history. No credentials stored. OAuth-only.",
  },
  {
    id: 2,
    title: "Set your goals",
    description:
      "Tell Isla what matters: grow followers, generate leads, build authority. It uses this to personalize every signal.",
  },
  {
    id: 3,
    title: "Receive signals where you work",
    description:
      "Every morning, Isla sends you actionable opportunities. Comment, create, or delegate. In seconds.",
  },
];



const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

export function SetupSection() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement | null>(null);

  const [active, setActive] = useState(0);
  const [stepProgress, setStepProgress] = useState(0); // 0..1 within active step
  const [inView, setInView] = useState(false);

  /* ---- Entry zoom: detect when section is in view ---- */
  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.15 },
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  /* ---- Desktop: scroll-driven step + progress ---- */
  useEffect(() => {
    if (isMobile) return;
    const el = sectionRef.current;
    if (!el) return;

    let raf = 0;
    let queued = false;

    const compute = () => {
      queued = false;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = clamp(-rect.top / scrollable, 0, 1);

      const idx = progress >= 1 ? 2 : Math.min(2, Math.floor(progress * 3));
      const local = clamp(progress * 3 - idx, 0, 1);

      setActive((prev) => (prev !== idx ? idx : prev));
      setStepProgress(local);
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  /* ---- Mobile: no auto-advance — all steps render expanded simultaneously ---- */

  /* ---- Click step: smooth scroll to its segment ---- */
  const handleClick = (i: number) => {
    if (isMobile) {
      setActive(i);
      return;
    }
    const el = sectionRef.current;
    if (!el) return;
    const scrollable = el.offsetHeight - window.innerHeight;
    const targetY = el.offsetTop + (i / 3) * scrollable + 4;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      data-nav-theme="light"
      className="relative w-full bg-white md:min-h-[300vh] scroll-mt-20"
    >
      {/* Mobile (<768px): all 3 steps stacked, each with its own animation */}
      {isMobile ? (
        <div
          className={`mx-auto flex w-full max-w-6xl flex-col px-6 py-20 transition-all duration-500 ease-out ${
            inView ? "scale-100 opacity-100" : "scale-[0.96] opacity-90"
          }`}
        >
          {/* Header */}
          <div className="inline-flex w-fit items-center rounded-full bg-isla-cyan px-[18px] py-[6px] text-[12px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_0_24px_rgba(0,191,255,0.35)]">
            Setup takes 5 minutes
          </div>
          <h2
            className="font-display mt-6 text-[36px] font-medium leading-[1.05] text-neutral-900"
            style={{ letterSpacing: "-0.4px" }}
          >
            Connect once.
            <br />
            Isla does the rest.
          </h2>

          {/* Stacked steps */}
          <div className="mt-10 flex flex-col gap-10">
            {STEPS.map((step, i) => (
              <MobileStepBlock key={step.id} index={i} step={step} />
            ))}
          </div>
        </div>
      ) : (
        // Desktop (≥768px): unchanged sticky scroll layout
        <div className="md:sticky md:top-0 md:flex md:h-screen md:items-center">
          <div
            className={`mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 transition-all duration-500 ease-out md:grid-cols-2 md:gap-16 md:py-0 ${
              inView ? "scale-100 opacity-100" : "scale-[0.96] opacity-90"
            }`}
          >
            {/* Left: header + steps */}
            <div className="flex flex-col">
              <div className="inline-flex w-fit items-center rounded-full bg-isla-cyan px-[18px] py-[6px] text-[12px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_0_24px_rgba(0,191,255,0.35)]">
                Setup takes 5 minutes
              </div>
              <h2
                className="font-display mt-6 text-[40px] font-medium leading-[1.05] text-neutral-900"
                style={{ letterSpacing: "-0.4px" }}
              >
                Connect once.
                <br />
                Isla does the rest.
              </h2>

              <div className="mt-10 flex flex-col gap-3">
                {STEPS.map((step, i) => (
                  <StepItem
                    key={step.id}
                    index={i}
                    step={step}
                    isActive={i === active}
                    progress={i === active ? stepProgress * 100 : 0}
                    showProgress={i === active && !isMobile}
                    onClick={() => handleClick(i)}
                  />
                ))}
              </div>
            </div>

            {/* Right: animation */}
            <div className="flex items-center justify-center">
              <SetupAnimationContainer activeIndex={active} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/**
 * Mobile-only step block: animation on top, number + title + description below.
 * All 3 animations render with isActive=true so they all play simultaneously.
 */
function MobileStepBlock({
  index,
  step,
}: {
  index: number;
  step: (typeof STEPS)[number];
}) {
  const animations = [
    <Step1ConnectAnimation key="s1" isActive />,
    <Step2GoalsAnimation key="s2" isActive />,
    <Step3SignalsAnimation key="s3" isActive />,
  ];
  return (
    <div
      className="flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-neutral-200/60 shadow-[0_4px_24px_rgba(15,23,42,0.04)] animate-fade-in"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative h-[340px] w-full overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-white">
        {animations[index]}
      </div>
      <div className="flex items-start gap-3 p-5">
        <span className="mt-0.5 text-[12px] font-medium tabular-nums text-isla-cyan">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex-1">
          <h3 className="text-[16px] font-semibold text-neutral-900">{step.title}</h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-500">
            {step.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function StepItem({
  index,
  step,
  isActive,
  progress,
  showProgress,
  onClick,
}: {
  index: number;
  step: (typeof STEPS)[number];
  isActive: boolean;
  progress: number;
  showProgress: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group w-full cursor-pointer rounded-[10px] text-left transition-all duration-300 ${
        isActive
          ? "bg-neutral-50 p-6"
          : "bg-transparent px-6 py-4 hover:bg-neutral-50/60"
      }`}
    >
      <div className="flex items-start gap-5">
        <span
          className={`mt-0.5 text-[13px] font-medium tabular-nums transition-colors ${
            isActive ? "text-isla-cyan" : "text-neutral-400"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="flex-1">
          {showProgress && (
            <div className="mb-3 h-[2px] w-full overflow-hidden rounded-full bg-neutral-200">
              <div
                className="h-full bg-isla-cyan"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
          <h3
            className={`text-[16px] font-semibold transition-colors ${
              isActive ? "text-neutral-900" : "text-neutral-500"
            }`}
          >
            {step.title}
          </h3>
          <div
            className={`grid transition-all duration-300 ${
              isActive ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <p className="overflow-hidden text-[14px] leading-relaxed text-neutral-500">
              {step.description}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}

function SetupAnimationContainer({ activeIndex }: { activeIndex: number }) {
  const slides = [
    { node: <Step1ConnectAnimation isActive={activeIndex === 0} />, bare: true },
    { node: <Step2GoalsAnimation isActive={activeIndex === 1} />, bare: true },
    { node: <Step3SignalsAnimation isActive={activeIndex === 2} />, bare: true },
  ];
  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-sky-50 via-blue-50 to-white ring-1 ring-neutral-200/60">
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-all duration-500 ${
            s.bare ? "" : "p-6"
          } ${
            i === activeIndex
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-3 opacity-0"
          }`}
        >
          {s.node}
        </div>
      ))}
    </div>
  );
}

export default SetupSection;
