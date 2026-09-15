import { motion } from "framer-motion";
import islaWordmark from "@/assets/isla-wordmark.svg.asset.json";

type Column = {
  key: string;
  label: string;
  cost: string;
  missing: string;
  highlight?: boolean;
};

const COLUMNS: Column[] = [
  {
    key: "isla",
    label: "Isla",
    cost: "$70/mo per account",
    missing:
      "Network growth, warming, content and measurement as one loop, run for you.",
    highlight: true,
  },
  {
    key: "agency",
    label: "Content agency",
    cost: "$2,000–5,000/mo",
    missing:
      "Posts, and nothing downstream. No network growth, no measurement, no follow-up.",
  },
  {
    key: "sdr",
    label: "SDR + outbound stack",
    cost: "$6,000+/mo loaded",
    missing:
      "Messages strangers. Ignores the warm buyers already in your network.",
  },
  {
    key: "tool",
    label: "A LinkedIn tool",
    cost: "$100–500/mo",
    missing:
      "A dashboard someone has to remember to open. No content, no research, no operator.",
  },
  {
    key: "internal",
    label: "Internally",
    cost: '"Free"',
    missing: "Works for five weeks.",
  },
];

const ROWS = [
  { key: "cost" as const, label: "Cost" },
  { key: "missing" as const, label: "What's missing" },
];

function IslaMark() {
  return (
    <img
      src={islaWordmark.url}
      alt="Isla"
      draggable={false}
      className="h-6 w-auto brightness-0 invert"
    />
  );
}

export function WhyNotSection() {
  return (
    <section
      id="compare"
      data-nav-theme="light"
      className="relative w-full overflow-hidden border-t border-[#D3D3D3] bg-[#FBFBFB] py-24 scroll-mt-20 md:py-32 dark:border-[#2C2C2C] dark:bg-[#0A0A0A]"
    >
      {/* Vertical blueprint lines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-16 right-16 md:left-24 md:right-24"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, #D3D3D3 0 1px, transparent 1px 48px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-16 right-16 hidden dark:block md:left-24 md:right-24"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, #2C2C2C 0 1px, transparent 1px 48px)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display mx-auto flex w-full max-w-[908px] flex-col items-start gap-[10px] whitespace-normal border border-[#D3D3D3] bg-white px-6 py-4 text-[34px] font-light leading-[1.12] text-slate-900 md:whitespace-nowrap md:text-[clamp(20px,4.2vw,52px)] dark:border-[#2C2C2C] dark:bg-[#111111] dark:text-white"
          style={{ letterSpacing: "-0.4px" }}
        >
          Why not an agency, an SDR, or a tool
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 overflow-hidden rounded-2xl border border-[#D3D3D3] bg-white dark:border-[#2C2C2C] dark:bg-[#111111]"
        >
          {/* Desktop table */}
          <div className="hidden md:block">
            <table className="w-full table-fixed border-collapse">
              <thead>
                <tr>
                  <th className="w-[16%] border-b border-r border-[#D3D3D3] bg-white p-6 dark:border-[#2C2C2C] dark:bg-[#111111]" />
                  {COLUMNS.map((c) => (
                    <th
                      key={c.key}
                      className={`border-b border-r border-[#D3D3D3] p-6 text-left align-middle last:border-r-0 dark:border-[#2C2C2C] ${
                        c.highlight ? "bg-isla-cyan" : "bg-white dark:bg-[#111111]"
                      }`}
                    >
                      {c.highlight ? (
                        <IslaMark />
                      ) : (
                        <span className="text-[15px] font-semibold text-slate-900 dark:text-white">
                          {c.label}
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, ri) => (
                  <tr key={row.key}>
                    <td
                      className={`border-r border-[#D3D3D3] bg-white p-6 align-top text-[14px] font-semibold text-slate-900 dark:border-[#2C2C2C] dark:bg-[#111111] dark:text-white ${
                        ri < ROWS.length - 1 ? "border-b" : ""
                      }`}
                    >
                      {row.label}
                    </td>
                    {COLUMNS.map((c) => (
                      <td
                        key={c.key}
                        className={`border-r border-[#D3D3D3] p-6 align-top text-[14px] leading-relaxed last:border-r-0 dark:border-[#2C2C2C] ${
                          ri < ROWS.length - 1 ? "border-b" : ""
                        } ${
                          c.highlight
                            ? "bg-isla-cyan/12 text-slate-900 dark:text-white"
                            : "bg-white text-slate-600 dark:bg-[#111111] dark:text-white/65"
                        }`}
                      >
                        {c[row.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile stacked cards */}
          <div className="divide-y divide-[#D3D3D3] dark:divide-[#2C2C2C] md:hidden">
            {COLUMNS.map((c) => (
              <div
                key={c.key}
                className={c.highlight ? "bg-isla-cyan/12 p-6" : "bg-white p-6 dark:bg-[#111111]"}
              >
                {c.highlight ? (
                  <span className="inline-flex rounded-md bg-isla-cyan px-3 py-1.5">
                    <IslaMark />
                  </span>
                ) : (
                  <span className="text-[15px] font-semibold text-slate-900 dark:text-white">
                    {c.label}
                  </span>
                )}
                <dl className="mt-4 space-y-3">
                  {ROWS.map((row) => (
                    <div key={row.key}>
                      <dt className="text-[12px] font-semibold uppercase tracking-wide text-slate-400 dark:text-white/45">
                        {row.label}
                      </dt>
                      <dd className="mt-1 text-[14px] leading-relaxed text-slate-700 dark:text-white/65">
                        {c[row.key]}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default WhyNotSection;
