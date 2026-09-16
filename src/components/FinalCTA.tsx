import { ArrowUpRight } from "lucide-react";
import SlideLabel from "@/components/ui/SlideLabel";
import { useCalBooking, getStartedProps } from "@/hooks/useCalBooking";
import { useLocale } from "@/hooks/useLocale";

export function FinalCTA() {
  useCalBooking();
  const { dict } = useLocale();
  return (
    <section
      id="start"
      data-nav-theme="dark"
      className="relative w-full overflow-hidden rounded-t-[40px] bg-[#050506] py-20 md:py-24 scroll-mt-20"
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 50% at 50% 45%, rgba(0,191,255,0.10), transparent 65%)",
        }}
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <span className="text-[12px] font-bold uppercase tracking-[0.22em] text-isla-cyan">
          {dict.finalCTA.eyebrow}
        </span>

        <h2
          className="font-display mt-6 max-w-3xl text-[38px] font-light leading-[1.05] text-white md:text-[58px]"
          style={{ letterSpacing: "-0.4px" }}
        >
          {dict.finalCTA.headlinePre}{" "}
          <span className="italic text-isla-cyan">{dict.finalCTA.headlineHighlight}</span>
        </h2>

        <p className="mt-7 max-w-2xl text-[15px] leading-relaxed text-white/60 md:text-[16px]">
          {dict.finalCTA.body}
        </p>

        <p className="mt-7 text-[15px] font-bold text-white md:text-[17px]">
          {dict.finalCTA.bold}
        </p>

        <div className="mt-9">
          <a
            {...getStartedProps}
            data-cta-location="final_cta"
            data-cta-label="Get Started"
            className="group inline-flex cursor-pointer items-center gap-1.5 rounded-[4px] bg-isla-cyan py-1 pl-3.5 pr-1 text-[14px] font-bold text-white shadow-[0_0_20px_rgba(0,191,255,0.35)] transition-transform hover:scale-[1.02]"
          >
            <SlideLabel primary={dict.finalCTA.cta} secondary={dict.finalCTA.ctaSecondary} />
            <span className="flex h-7 w-7 items-center justify-center rounded-[3px] transition-transform group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default FinalCTA;
