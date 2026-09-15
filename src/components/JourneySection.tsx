import NetworkBeamSection from "@/components/NetworkBeamSection";
import step1 from "@/assets/how/step-1.png.asset.json";
import step2 from "@/assets/how/step-2.png.asset.json";
import step3 from "@/assets/how/step-3.png.asset.json";
import step4 from "@/assets/how/step-4.png.asset.json";
import step5 from "@/assets/how/step-5.png.asset.json";
import step6 from "@/assets/how/step-6.png.asset.json";

const stepMedia = [step1, step2, step3, step4, step5, step6];

/* ────────────────────────────────────────────────────────────
 * How it works — simple, normal scroll, media placeholders
 * ────────────────────────────────────────────────────────── */
type Step = {
  num: string;
  title: string;
  body: React.ReactNode;
};

const steps: Step[] = [
  {
    num: "01",
    title: "Reveal the pipeline already inside your network",
    body: (
      <p>
        Isla scores every LinkedIn connection your team has against your ICP —
        turning scattered profiles into a real pipeline.
      </p>
    ),
  },
  {
    num: "02",
    title: "Create content designed for your ICP",
    body: (
      <p>
        Isla researches your niche, market news and winning topics, then pairs
        it with short interviews to capture your voice.
      </p>
    ),
  },
  {
    num: "03",
    title: "Publish and measure ICP impact",
    body: (
      <p>
        See exactly which buyers saw and engaged with your content. Content
        becomes a targeting instrument, not a vanity metric.
      </p>
    ),
  },
  {
    num: "04",
    title: "Expand your ICP network every day. Grow your account",
    body: (
      <p>
        Every day Isla brings new ICP-matching prospects into your network — so
        you build distribution made of future customers, not followers.
      </p>
    ),
  },
  {
    num: "05",
    title: "Warm the people already inside it",
    body: (
      <p>
        Comments, repeated exposure and the right intros build familiarity
        first. Isla only recommends outreach once the signals are there.
      </p>
    ),
  },
  {
    num: "06",
    title: "Know when it is time to talk",
    body: (
      <p>
        The moment a lead turns from aware to interested, you get an alert. You
        approve, we send.
      </p>
    ),
  },
];

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
      src={media.url}
      alt={alt}
      loading="lazy"
      className="aspect-[4/3] w-full rounded-2xl object-cover"
    />
  );
}

function HowItWorks() {
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
            How it works
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
                    {s.body}
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
