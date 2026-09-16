import NetworkBeamSection from "@/components/NetworkBeamSection";
import { useLocale } from "@/hooks/useLocale";
import step1 from "@/assets/how/step-1.png";
import step2 from "@/assets/how/step-2.png";
import step3 from "@/assets/how/step-3.png";
import step4 from "@/assets/how/step-4.png";
import step5 from "@/assets/how/step-5.png";
import step6 from "@/assets/how/step-6.png";

const stepMedia = [step1, step2, step3, step4, step5, step6];

/* ────────────────────────────────────────────────────────────
 * How it works — simple, normal scroll, media placeholders
 * ────────────────────────────────────────────────────────── */
const stepNumbers = ["01", "02", "03", "04", "05", "06"];

function MediaPlaceholder({ index, alt }: { index: number; alt: string }) {
  const media = stepMedia[index];
  if (!media) {
    return (
      <div className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl bg-slate-200/70 dark:bg-white/[0.06]">
        <div className="text-center">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-white/45">
            Image / Video
          </div>
          <p className="mt-2 text-[13px] text-slate-400 dark:text-white/45">Step {index + 1} media</p>
        </div>
      </div>
    );
  }
  return (
    <img
      src={media}
      alt={alt}
      loading="lazy"
      className="aspect-[4/3] w-full rounded-2xl object-cover"
    />
  );
}

function HowItWorks() {
  const { dict } = useLocale();
  const steps = dict.howItWorks.steps.map((s, i) => ({ ...s, num: stepNumbers[i] }));

  return (
    <section
      id="how-it-works"
      data-nav-theme="light"
      className="relative w-full border-t border-[#D3D3D3] bg-[#FBFBFB] py-24 scroll-mt-20 md:py-32 dark:border-[#2C2C2C] dark:bg-[#0A0A0A]"
    >
      <span id="jornada" className="block scroll-mt-24" aria-hidden />
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="font-display mx-auto max-w-3xl text-[34px] font-normal leading-[1.08] tracking-[-0.03em] text-slate-900 md:text-[50px] dark:text-white">
            {dict.howItWorks.heading}
          </h2>
        </div>

        {/* Mobile: simple stacked list. Desktop: pinned stacking cards */}
        <div className="mt-14 md:mt-20">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className="relative md:sticky md:top-28"
              style={{ zIndex: i + 1 }}
            >
              <div
                className="mb-8 grid grid-cols-1 items-start gap-8 rounded-3xl border border-slate-200/80 bg-white p-6 md:min-h-[420px] md:grid-cols-2 md:gap-12 md:p-10 dark:border-[#2C2C2C] dark:bg-[#111111] dark:shadow-none"
              >
                <div className="flex h-full flex-col">
                  <div className="font-display text-[26px] font-normal italic leading-none text-isla-cyan md:text-[30px]">
                    {s.num}
                  </div>
                  <h3 className="font-display mt-4 text-[26px] font-normal leading-[1.15] tracking-[-0.02em] text-slate-900 md:text-[34px] dark:text-white">
                    {s.title}
                  </h3>
                  <div className="mt-5 max-w-md space-y-4 text-[15px] leading-relaxed text-slate-600 md:text-[16px] dark:text-white/65">
                    <p>{s.body}</p>
                  </div>
                </div>
                <MediaPlaceholder index={i} alt={s.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function JourneySection() {
  return (
    <>
      <NetworkBeamSection />
      <HowItWorks />
    </>
  );
}

export default JourneySection;
