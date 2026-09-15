import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { CheckCircle2, ArrowUpRight, Minus, Plus } from "lucide-react";
import SlideLabel from "@/components/ui/SlideLabel";
import { useCalBooking, calBookingProps, getStartedProps } from "@/hooks/useCalBooking";

const SEAT_PRICE = 100;
const YEARLY_SEAT_PRICE = 70;

const billingOptions = [
  { id: "monthly", label: "Monthly", note: "", price: SEAT_PRICE },
  { id: "yearly", label: "Yearly", note: "Save 30%", price: YEARLY_SEAT_PRICE },
] as const;

type BillingId = (typeof billingOptions)[number]["id"];

const selfServiceFeatures = [
  "AI agents that take actions to grow your account",
  "Content ideas and AI interview drafts",
  "Advanced analytics",
  "Growth alerts and account monitoring",
];

const managedFeatures = [
  "Everything in Self Service",
  "A dedicated Isla professional managing your content",
  "Fully managed content creation and review",
  "Weekly 20-min strategy call",
  "Priority support",
];

function SeatStepper({
  seats,
  setSeats,
}: {
  seats: number;
  setSeats: (n: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-[#D3D3D3] bg-white px-4 py-2.5 dark:border-[#2C2C2C] dark:bg-[#111111]">
      <span className="text-[13.5px] font-medium text-[#696969] dark:text-white/65">
        Seats
      </span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Remove seat"
          onClick={() => setSeats(Math.max(1, seats - 1))}
          className="flex h-7 w-7 items-center justify-center rounded-md border border-[#D3D3D3] text-[#2C2C2C] transition-colors hover:border-isla-cyan hover:text-isla-cyan disabled:opacity-40 dark:border-[#2C2C2C] dark:text-white"
          disabled={seats <= 1}
        >
          <Minus className="h-3.5 w-3.5" strokeWidth={2.5} />
        </button>
        <span className="min-w-[1.5rem] text-center text-[15px] font-semibold tabular-nums text-[#2C2C2C] dark:text-white">
          {seats}
        </span>
        <button
          type="button"
          aria-label="Add seat"
          onClick={() => setSeats(Math.min(50, seats + 1))}
          className="flex h-7 w-7 items-center justify-center rounded-md border border-[#D3D3D3] text-[#2C2C2C] transition-colors hover:border-isla-cyan hover:text-isla-cyan dark:border-[#2C2C2C] dark:text-white"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
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

  const [billing, setBilling] = useState<BillingId>("monthly");
  const [selfSeats, setSelfSeats] = useState(1);
  const [managedSeats, setManagedSeats] = useState(1);

  const pricePerSeat =
    billingOptions.find((b) => b.id === billing)?.price ?? SEAT_PRICE;
  const isYearly = billing === "yearly";
  const total = pricePerSeat * selfSeats;

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
          Ready to Get Started?
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



        <div
          ref={cardRef}
          className="grid w-full grid-cols-1 items-stretch gap-6 md:grid-cols-2 md:gap-8"
        >
          {/* Self Service */}
          <motion.article
            animate={{ paddingBottom: expanded ? 41 : 13 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-full w-full flex-col rounded-[40px] border border-[#D3D3D3] bg-white p-[13px] dark:border-[#2C2C2C] dark:bg-[#111111]"
          >
            <div className="flex flex-col justify-start gap-5 rounded-[28px] border border-[#D3D3D3] bg-[#FBFBFB] p-5 dark:border-[#2C2C2C] dark:bg-[#1A1A1A]">
              <p className="text-[20px] font-semibold leading-6 text-[#2C2C2C] dark:text-white">
                Copilot
              </p>

              <div className="flex flex-col gap-3">
                <div className="flex items-baseline gap-2">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={total}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8, position: "absolute" }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="font-display text-[32px] font-bold leading-[38px] text-[#2C2C2C] dark:text-white"
                      style={{ letterSpacing: "-1px" }}
                    >
                      ${total.toLocaleString("en-US")}
                    </motion.span>
                  </AnimatePresence>
                  {isYearly && (
                    <span className="font-display text-[20px] font-semibold leading-[24px] text-[#696969]/70 line-through dark:text-white/40">
                      ${(SEAT_PRICE * selfSeats).toLocaleString("en-US")}
                    </span>
                  )}
                  <span className="text-[14px] text-[#696969] dark:text-white/60">
                    /month
                  </span>
                </div>
                <p className="text-[14.5px] leading-[21.75px] text-[#696969] dark:text-white/65">
                  You run your own content with Isla's agents, keeping full
                  control of your pipeline while the AI does the heavy lifting.
                </p>
              </div>

              <SeatStepper seats={selfSeats} setSeats={setSelfSeats} />

              <a
                {...getStartedProps}
                href="https://app.isla.to/signup"
                data-cta-location="pricing_self_service"
                data-cta-label="Get Started"
                className="group flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg bg-isla-cyan py-1.5 pl-5 pr-1.5 text-[14.5px] font-semibold text-white transition-all duration-300 hover:brightness-110"
              >
                <SlideLabel primary="Get Started" />
                <span className="flex h-9 w-9 items-center justify-center rounded-[3px] transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </a>
            </div>


            <FeatureList features={selfServiceFeatures} expanded={expanded} />
          </motion.article>

          {/* Managed */}
          <motion.article
            animate={{ paddingBottom: expanded ? 41 : 13 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-full w-full flex-col rounded-[40px] border border-[#D3D3D3] bg-white p-[13px] dark:border-[#2C2C2C] dark:bg-[#111111]"
          >
            <div className="flex flex-col justify-start gap-5 rounded-[28px] border border-[#D3D3D3] bg-[#FBFBFB] p-5 dark:border-[#2C2C2C] dark:bg-[#1A1A1A]">

              <div className="flex items-center justify-between gap-3">
                <p className="text-[20px] font-semibold leading-6 text-[#2C2C2C] dark:text-white">
                  Autopilot
                </p>
                <span className="rounded-full bg-isla-cyan/10 px-2.5 py-1 text-[11.5px] font-bold uppercase tracking-wider text-isla-cyan">
                  MANAGED
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-baseline gap-2">
                  <span
                    className="font-display text-[32px] font-bold leading-[38px] text-[#2C2C2C] dark:text-white"
                    style={{ letterSpacing: "-1px" }}
                  >
                    Custom pricing
                  </span>
                </div>
                <p className="text-[14.5px] leading-[21.75px] text-[#696969] dark:text-white/65">
                  An Isla professional manages your content end to end, you
                  never start from a blank page. Talk to us to get your plan
                  and pricing.
                </p>
              </div>

              <SeatStepper seats={managedSeats} setSeats={setManagedSeats} />

              <button
                type="button"
                {...calBookingProps}
                data-cta-location="pricing_managed"
                data-cta-label="Book a Call"
                className="group flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg bg-isla-cyan py-1.5 pl-5 pr-1.5 text-[14.5px] font-semibold text-white transition-all duration-300 hover:brightness-110"
              >
                <SlideLabel primary="Book a Call" />
                <span className="flex h-9 w-9 items-center justify-center rounded-[3px] transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </button>
            </div>

            <FeatureList features={managedFeatures} expanded={expanded} />
          </motion.article>
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
