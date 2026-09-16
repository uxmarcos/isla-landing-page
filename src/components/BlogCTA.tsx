import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import SlideLabel from "@/components/ui/SlideLabel";
import { useLocale } from "@/hooks/useLocale";
import blogCards from "@/assets/blog-cards.png";
import blogCardsDark from "@/assets/blog-cards-dark.png";

export function BlogCTA() {
  const { dict } = useLocale();
  return (
    <section
      data-nav-theme="light"
      className="relative w-full border-t border-[#D3D3D3] bg-white py-20 md:py-28 dark:border-[#2C2C2C] dark:bg-[#0A0A0A]"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 md:p-14 shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:border-[#2C2C2C] dark:bg-[#111111] dark:shadow-none">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            {/* Left: text */}
            <div>
              <span className="inline-block rounded-full bg-isla-cyan px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                {dict.blogCTA.badge}
              </span>

              <h2
                className="font-display mt-6 text-[36px] font-light leading-[1.05] text-neutral-900 md:text-[48px] dark:text-white"
                style={{ letterSpacing: "-0.4px" }}
              >
                {dict.blogCTA.heading}
              </h2>

              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-neutral-500 md:text-[16px] dark:text-white/45">
                {dict.blogCTA.description}
              </p>

              <div className="mt-8">
                <Link
                  to="/blog"
                  className="group inline-flex items-center gap-1.5 rounded-[4px] bg-isla-cyan py-1 pl-3.5 pr-1 text-[14px] font-bold text-white shadow-[0_0_20px_rgba(0,191,255,0.35)] transition-transform hover:scale-[1.02]"
                >
                  <SlideLabel primary={dict.blogCTA.readBlog} secondary={dict.blogCTA.seeArticles} />
                  <span className="flex h-7 w-7 items-center justify-center rounded-[3px] transition-transform group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                </Link>
              </div>
            </div>

            {/* Right: image */}
            <div className="relative flex items-center justify-center">
              <img
                src={blogCards}
                alt="Featured blog articles preview"
                className="w-full max-w-[560px] h-auto dark:hidden"
              />
              <img
                src={blogCardsDark}
                alt="Featured blog articles preview"
                className="hidden w-full max-w-[560px] h-auto dark:block"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
