import { ArrowUpRight } from "lucide-react";
import SlideLabel from "@/components/ui/SlideLabel";
import { useCalBooking, getStartedProps } from "@/hooks/useCalBooking";
import { useLocale } from "@/hooks/useLocale";

export function Hero() {
  useCalBooking();
  const { dict } = useLocale();

  return (
    <section
      id="top"
      data-nav-theme="light"
      className="relative w-full overflow-hidden bg-white text-slate-900 scroll-mt-20 dark:bg-black dark:text-white"
    >
      <div className="mx-auto flex w-full max-w-[1100px] flex-col items-center px-6 pb-10 pt-24 text-center md:pb-12 md:pt-28">
        <h1 className="hero-rise font-display max-w-[18ch] text-[34px] font-light leading-[1.1] tracking-[-0.4px] text-black md:text-[52px] md:leading-[58px] dark:text-white">
            {dict.hero.headlinePre}{" "}
          <span className="font-normal italic tracking-[-2.4px] text-isla-cyan">
              {dict.hero.headlineHighlight}
            </span>
          </h1>

          <p
          className="hero-rise mt-5 max-w-[720px] text-[15px] leading-relaxed text-slate-600 md:text-[17px] dark:text-white/70"
            style={{ animationDelay: "120ms" }}
          >
            {dict.hero.subheadline}
          </p>

          <div
          className="hero-rise mt-6 flex flex-col items-center gap-3 sm:flex-row"
            style={{ animationDelay: "280ms" }}
          >
            <a
              {...getStartedProps}
              data-cta-location="hero"
              data-cta-label="Get Started"
            className="group inline-flex cursor-pointer items-center gap-1.5 rounded-[4px] bg-isla-cyan py-1 pl-3.5 pr-1 text-[14px] font-bold text-white shadow-[0_0_20px_rgba(0,191,255,0.35)] transition-transform hover:scale-[1.02]"
            >
              <SlideLabel primary={dict.hero.cta} secondary={dict.hero.ctaSecondary} />
              <span className="flex h-7 w-7 items-center justify-center rounded-[3px] transition-transform group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </span>
            </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
