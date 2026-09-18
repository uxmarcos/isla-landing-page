import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { CheckCircle2, ArrowUpRight, Minus, Plus } from "lucide-react";
import SlideLabel from "@/components/ui/SlideLabel";
import { useCalBooking, calBookingProps } from "@/hooks/useCalBooking";
import { useLocale } from "@/hooks/useLocale";

const AUTOPILOT_MONTHLY_PRICE = 999;
const AUTOPILOT_YEARLY_PRICE = 500;

type BillingId = "monthly" | "yearly";

function SeatStepper({
  seats,
  setSeats,
  label,
}: {
  seats: number;
  setSeats: (n: number) => void;
  label: string;
}) {
  return (
    <div className="flex h-full items-center justify-center gap-1.5 rounded-xl border border-[#D3D3D3] bg-white px-2 py-2.5 sm:justify-between sm:gap-3 sm:px-4 dark:border-[#2C2C2C] dark:bg-[#111111]">
      <span className="hidden text-[13.5px] font-medium text-[#696969] dark:text-white/65 sm:inline">
        {label}
      </span>
      <div className="flex items-center gap-1.5 sm:gap-3">
        <button
          type="button"
          aria-label="Remove seat"
          onClick={() => setSeats(Math.max(1, seats - 1))}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-[#D3D3D3] text-[#2C2C2C] transition-colors hover:border-isla-cyan hover:text-isla-cyan disabled:opacity-40 sm:h-7 sm:w-7 dark:border-[#2C2C2C] dark:text-white"
          disabled={seats <= 1}
        >
          <Minus className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={2.5} />
        </button>
        <span className="min-w-[1rem] text-center text-[13px] font-semibold tabular-nums text-[#2C2C2C] sm:min-w-[1.5rem] sm:text-[15px] dark:text-white">
          {seats}
        </span>
        <button
          type="button"
          aria-label="Add seat"
          onClick={() => setSeats(Math.min(50, seats + 1))}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-[#D3D3D3] text-[#2C2C2C] transition-colors hover:border-isla-cyan hover:text-isla-cyan sm:h-7 sm:w-7 dark:border-[#2C2C2C] dark:text-white"
        >
          <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

function FeatureList({
  features,
  expanded,
}: {
  features: string[];
  expanded: boolean;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden"
    >
      <ul className="flex flex-col gap-3.5 pl-4 pr-6 pt-6">
        {features.map((f, i) => (
          <motion.li
            key={f}
            initial={false}
            animate={{ opacity: expanded ? 1 : 0, y: expanded ? 0 : 10 }}
            transition={{
              duration: 0.5,
              delay: expanded ? 0.25 + i * 0.16 : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex items-center gap-2"
          >
            <CheckCircle2
              className="h-6 w-6 flex-shrink-0 text-isla-cyan"
              strokeWidth={1.5}
            />
            <span className="text-[14.5px] font-medium leading-[21.75px] text-[#696969] dark:text-white/65">
              {f}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export function PricingSection() {
  useCalBooking();
  const cardRef = useRef<HTMLDivElement>(null);
  const expanded = useInView(cardRef, { once: true, amount: 0.4 });
  const { dict } = useLocale();
  const p = dict.pricing;

  const billingOptions = [
    { id: "monthly" as const, label: p.monthly, note: "" },
    { id: "yearly" as const, label: p.yearly, note: p.save50 },
  ];

  const [billing, setBilling] = useState<BillingId>("monthly");
  const [managedSeats, setManagedSeats] = useState(1);

  const isYearly = billing === "yearly";
  const autopilotPricePerSeat = isYearly
    ? AUTOPILOT_YEARLY_PRICE
    : AUTOPILOT_MONTHLY_PRICE;
  const autopilotTotal = autopilotPricePerSeat * managedSeats;

  return (
    <section
      id="pricing"
      data-nav-theme="light"
      className="relative w-full border-t border-[#D3D3D3] bg-white py-24 md:py-32 scroll-mt-20 dark:border-[#2C2C2C] dark:bg-[#0A0A0A]"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 md:gap-12">
        <h2
          className="font-display text-center text-[40px] font-normal leading-[1.12] text-[#2C2C2C] md:text-[60px] dark:text-white"
          style={{ letterSpacing: "-1px" }}
        >
          {p.heading}
        </h2>

        {/* Billing cycle toggle */}
        <div className="relative mt-4 flex flex-wrap items-center justify-center gap-1.5 rounded-full border border-[#D3D3D3] bg-[#FBFBFB] p-1.5 dark:border-[#2C2C2C] dark:bg-[#111111]">
          {billingOptions.map((b) => {
            const active = billing === b.id;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => setBilling(b.id)}
                className={`relative rounded-full px-8 py-3.5 text-[15px] font-semibold transition-colors ${
                  active
                    ? "bg-[#2C2C2C] text-white dark:bg-white dark:text-[#111111]"
                    : "text-[#696969] hover:text-[#2C2C2C] dark:text-white/60 dark:hover:text-white"
                }`}
              >
                {b.label}
                {b.note && (
                  <span className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-isla-cyan px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
                    {b.note}
                  </span>
                )}
              </button>
            );
          })}
        </div>



        <div ref={cardRef} className="mx-auto w-full max-w-xl">
          {/* Managed */}
          <motion.article
            animate={{ paddingBottom: expanded ? 41 : 13 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-full w-full flex-col rounded-[40px] border border-[#D3D3D3] bg-white p-[13px] dark:border-[#2C2C2C] dark:bg-[#111111]"
          >
            <div className="flex flex-col justify-start gap-5 rounded-[28px] border border-[#D3D3D3] bg-[#FBFBFB] p-5 dark:border-[#2C2C2C] dark:bg-[#1A1A1A]">

              <div className="flex items-center justify-between gap-3">
                <p className="text-[20px] font-semibold leading-6 text-[#2C2C2C] dark:text-white">
                  {p.autopilot.name}
                </p>
                <span className="rounded-full bg-isla-cyan/10 px-2.5 py-1 text-[11.5px] font-bold uppercase tracking-wider text-isla-cyan">
                  {p.managedBadge}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-baseline gap-2">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={autopilotTotal}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8, position: "absolute" }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="font-display text-[32px] font-bold leading-[38px] text-[#2C2C2C] dark:text-white"
                      style={{ letterSpacing: "-1px" }}
                    >
                      ${autopilotTotal.toLocaleString("en-US")}
                    </motion.span>
                  </AnimatePresence>
                  {isYearly && (
                    <span className="font-display text-[20px] font-semibold leading-[24px] text-[#696969]/70 line-through dark:text-white/40">
                      ${(AUTOPILOT_MONTHLY_PRICE * managedSeats).toLocaleString("en-US")}
                    </span>
                  )}
                  <span className="text-[14px] text-[#696969] dark:text-white/60">
                    {p.perMonth}
                  </span>
                </div>
                <p className="text-[14.5px] leading-[21.75px] text-[#696969] dark:text-white/65">
                  {p.autopilot.description}
                </p>
              </div>

              <div className="flex items-stretch gap-3">
                <div className="shrink-0">
                  <SeatStepper seats={managedSeats} setSeats={setManagedSeats} label={p.seats} />
                </div>
                <button
                  type="button"
                  {...calBookingProps}
                  data-cta-location="pricing_managed"
                  data-cta-label="Book a Call"
                  className="group flex min-w-0 flex-1 cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-isla-cyan py-1.5 pl-3 pr-1 text-[12.5px] font-semibold text-white transition-all duration-300 hover:brightness-110 sm:gap-3 sm:pl-5 sm:pr-1.5 sm:text-[14.5px]"
                >
                  <SlideLabel className="whitespace-nowrap" primary={p.bookACall} />
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[3px] transition-transform duration-300 group-hover:rotate-45 sm:h-9 sm:w-9">
                    <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.5} />
                  </span>
                </button>
              </div>
            </div>

            <FeatureList features={p.autopilot.features} expanded={expanded} />
          </motion.article>
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
