import PeopleCluster from "./testimonials/PeopleCluster";
import TestimonialsScroller from "./testimonials/TestimonialsScroller";
import TestimonialCard from "./testimonials/TestimonialCard";
import { TESTIMONIALS } from "./testimonials/people";
import { motion } from "framer-motion";

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      data-nav-theme="light"
      className="relative w-full border-t border-[#D3D3D3] bg-[#FBFBFB] py-24 scroll-mt-20 dark:border-[#2C2C2C] dark:bg-[#0A0A0A]"
    >
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center"
        >
          <div className="inline-flex items-center rounded-full bg-isla-cyan px-[18px] py-[6px] text-[12px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_0_24px_rgba(0,191,255,0.35)]">
            Testimonials
          </div>
          <h2
            className="font-display mt-6 text-[44px] font-medium leading-[1.05] text-slate-900 md:text-[56px] dark:text-white"
            style={{ letterSpacing: "-0.6px" }}
          >
            Trusted by <span className="text-isla-cyan">leaders</span>
            <br />
            from various industries.
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-500 dark:text-white/45">
            Learn why founders, operators, and creators trust our platform to
            move faster, ship sharper, and sleep better.
          </p>
        </motion.div>

        {/* People cluster (auto-scrolling carousel) — visible on all breakpoints */}
        <div className="mt-16">
          <PeopleCluster />
        </div>

        {/* Divider */}
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="font-display mt-12 text-center text-[32px] font-medium text-slate-900 md:mt-20 md:text-[40px] dark:text-white"
        >
          What they say about us
        </motion.h3>
      </div>

      {/* Testimonials — horizontal scroll on desktop, stacked on mobile */}
      <div className="relative mx-auto mt-10 hidden max-w-[1400px] md:block">
        <TestimonialsScroller />
      </div>
      <div className="relative mx-auto mt-10 flex max-w-7xl flex-col items-center gap-5 px-6 md:hidden">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="w-full max-w-[400px] [&>div]:!w-full">
            <TestimonialCard t={t} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default TestimonialsSection;
