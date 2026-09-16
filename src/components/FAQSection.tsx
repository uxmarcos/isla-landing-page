import { useEffect, useMemo, useRef, useState } from "react";
import { Plus, Minus, Search } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

type QA = { q: string; a: string; topic: "General" | "Product" | "Security & Billing" };

const TOPICS: QA["topic"][] = ["General", "Product", "Security & Billing"];

function FAQItem({
  qa,
  index,
  isOpen,
  onToggle,
}: {
  qa: QA;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!answerRef.current) return;
    setHeight(isOpen ? answerRef.current.scrollHeight : 0);
  }, [isOpen]);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 50}ms` }}
      className={`border-b border-slate-200 dark:border-[#2C2C2C] transform transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group flex w-full items-center justify-between gap-6 py-5 text-left transition-colors"
      >
        <span
          className={`text-[15px] font-medium transition-colors ${
            isOpen ? "text-slate-900 dark:text-white" : "text-slate-700 group-hover:text-slate-900 dark:text-white/65 dark:group-hover:text-white"
          }`}
        >
          {qa.q}
        </span>
        <span
          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            isOpen
              ? "border-isla-cyan/60 bg-isla-cyan/10 text-isla-cyan shadow-[0_0_18px_-4px_rgba(0,191,255,0.5)]"
              : "border-slate-300 bg-white text-slate-500 group-hover:border-slate-400 group-hover:text-slate-900 dark:border-[#2C2C2C] dark:bg-[#1A1A1A] dark:text-white/45 dark:group-hover:border-white/30 dark:group-hover:text-white"
          }`}
        >
          {isOpen ? (
            <Minus className="h-4 w-4" strokeWidth={2.5} />
          ) : (
            <Plus className="h-4 w-4" strokeWidth={2.5} />
          )}
        </span>
      </button>

      <div
        style={{
          height: `${height}px`,
          transition: "height 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        className="overflow-hidden"
      >
        <div ref={answerRef} className="pb-6 pr-12">
          <p
            className={`text-[14.5px] leading-relaxed text-slate-600 dark:text-white/65 transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            {qa.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FAQSection() {
  const { dict } = useLocale();
  const faqs: QA[] = dict.faq.items;
  const [activeTopic, setActiveTopic] = useState<QA["topic"]>("General");
  const [query, setQuery] = useState("");
  const [openKey, setOpenKey] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const grouped = useMemo(() => {
    const filter = (t: QA["topic"]) =>
      faqs
        .filter((f) => f.topic === t)
        .filter((f) =>
          query.trim()
            ? (f.q + " " + f.a).toLowerCase().includes(query.toLowerCase())
            : true
        );
    return TOPICS.map((t) => ({ topic: t, items: filter(t) }));
  }, [query, faqs]);

  // Track which topic section is currently in view to highlight the sidebar
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          const topic = visible[0].target.getAttribute("data-topic") as
            | QA["topic"]
            | null;
          if (topic) setActiveTopic(topic);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
    );
    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToTopic = (topic: QA["topic"]) => {
    const el = sectionRefs.current[topic];
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      id="faq"
      data-nav-theme="light"
      className="relative w-full border-t border-[#D3D3D3] bg-white py-24 md:py-32 scroll-mt-20 [overflow:clip] dark:border-[#2C2C2C] dark:bg-[#0A0A0A]"
    >
      <div className="relative mx-auto max-w-6xl px-6">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[320px_1fr] md:gap-16">
          {/* LEFT — sticky navigation column */}
          <aside className="md:sticky md:top-24 md:self-start">
            <h2
              className="font-display text-[40px] font-semibold leading-[1.02] text-slate-900 md:text-[52px] dark:text-white"
              style={{ letterSpacing: "-1.2px" }}
            >
              {dict.faq.heading}
            </h2>

            {/* Search */}
            <div className="mt-7 flex w-full items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 transition-all focus-within:border-isla-cyan/60 focus-within:shadow-[0_0_24px_-8px_rgba(0,191,255,0.45)] dark:border-[#2C2C2C] dark:bg-[#1A1A1A]">
              <Search className="h-4 w-4 text-slate-400 dark:text-white/45" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={dict.faq.searchPlaceholder}
                className="w-full bg-transparent text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white dark:placeholder:text-white/45"
              />
            </div>
          </aside>

          {/* Sections — show all at once */}
          <div className="flex flex-col gap-14">
            {grouped.map((g) => (
              <div
                key={g.topic}
                data-topic={g.topic}
                ref={(el) => {
                  sectionRefs.current[g.topic] = el;
                }}
                className="scroll-mt-28"
              >
                <h3
                  className="font-display text-[28px] font-semibold text-slate-900 md:text-[32px] dark:text-white"
                  style={{ letterSpacing: "-0.5px" }}
                >
                  {dict.faq.topics[g.topic]}
                </h3>

                <div className="mt-6 border-t border-slate-200 dark:border-[#2C2C2C]">
                  {g.items.length === 0 ? (
                    <p className="py-6 text-[14px] text-slate-500 dark:text-white/45">
                      {dict.faq.noMatch}
                    </p>
                  ) : (
                    g.items.map((qa, i) => {
                      const key = `${g.topic}-${qa.q}`;
                      return (
                        <FAQItem
                          key={key}
                          qa={qa}
                          index={i}
                          isOpen={openKey === key}
                          onToggle={() =>
                            setOpenKey(openKey === key ? null : key)
                          }
                        />
                      );
                    })
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
