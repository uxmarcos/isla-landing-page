import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import SlideLabel from "@/components/ui/SlideLabel";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
import { useTheme } from "@/hooks/useTheme";
import { useLocale } from "@/hooks/useLocale";
import { useCalBooking, getStartedProps } from "@/hooks/useCalBooking";
import islaWordmark from "@/assets/isla-wordmark.svg";

const linkHrefs = [
  { key: "howItWorks", href: "#how-it-works" },
  { key: "ideaDeck", href: "#conteudo" },
  { key: "aiInterview", href: "#interview" },
  { key: "testimonials", href: "#testimonials" },
  { key: "pricing", href: "#pricing" },
] as const;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const smoothScrollTo = (targetY: number, duration = 1100) => {
  const startY = window.scrollY;
  const diff = targetY - startY;
  if (Math.abs(diff) < 1) return;
  let startTime: number | null = null;

  const step = (timestamp: number) => {
    if (startTime === null) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);
    window.scrollTo(0, startY + diff * eased);
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.scrollY - 64;
  smoothScrollTo(top);
  return true;
};

const tryScrollToIdWithRetry = (id: string, attempts = 20) => {
  let tries = 0;
  const attempt = () => {
    if (scrollToId(id)) return;
    if (++tries >= attempts) return;
    setTimeout(attempt, 60);
  };
  attempt();
};

export function Navbar() {
  const [sectionDark, setSectionDark] = useState(true);
  const { isDark: themeDark } = useTheme();
  const { dict } = useLocale();
  const isDark = themeDark || sectionDark;
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useCalBooking();

  const links = linkHrefs.map((l) => ({ label: dict.nav[l.key], href: l.href }));

  // When landing in "/" with a hash (e.g. coming from /blog), scroll to section.
  useEffect(() => {
    if (pathname !== "/") return;
    const hash = window.location.hash;
    if (!hash) return;
    tryScrollToIdWithRetry(hash.slice(1));
  }, [pathname]);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const id = href.slice(1);
    if (pathname === "/") {
      if (scrollToId(id)) history.replaceState(null, "", href);
      return;
    }
    navigate({ to: "/", hash: id });
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return;
    e.preventDefault();
    smoothScrollTo(0);
    history.replaceState(null, "", "/");
  };


  useEffect(() => {
    const probeY = 32; // navbar vertical center area
    const probeX = () => window.innerWidth / 2;

    const detect = () => {
      // Temporarily hide navbar to read what's underneath
      const nav = document.getElementById("site-navbar");
      const prev = nav?.style.pointerEvents;
      if (nav) nav.style.pointerEvents = "none";

      const els = document.elementsFromPoint(probeX(), probeY);
      if (nav && prev !== undefined) nav.style.pointerEvents = prev;

      // Find first element marked with data-nav-theme
      for (const el of els) {
        const theme = (el as HTMLElement).closest?.("[data-nav-theme]")?.getAttribute("data-nav-theme");
        if (theme === "dark") {
          setSectionDark(true);
          return;
        }
        if (theme === "light") {
          setSectionDark(false);
          return;
        }
      }
      // Default: light
      setSectionDark(false);
    };

    detect();
    window.addEventListener("scroll", detect, { passive: true });
    window.addEventListener("resize", detect);
    return () => {
      window.removeEventListener("scroll", detect);
      window.removeEventListener("resize", detect);
    };
  }, []);

  // Smooth tokens
  const mutedColor = isDark ? "text-white/70 hover:text-white" : "text-slate-600 hover:text-slate-900";
  const borderColor = isDark ? "border-white/10" : "border-slate-200/70";
  return (
    <header
      id="site-navbar"
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-colors duration-500 ease-out ${borderColor} ${
        isDark ? "bg-transparent" : "bg-white/80 dark:bg-[#0A0A0A]/80"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" onClick={handleLogoClick} className="flex items-center">
          <img
            src={islaWordmark}
            alt="Isla"
            className={`h-7 w-auto transition-all duration-500 ${isDark ? "invert" : ""}`}
            draggable={false}
          />
        </Link>

        {/* Center links */}
        <nav className="hidden items-center gap-6 md:flex lg:gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleAnchorClick(e, l.href)}
              className={`group text-[14px] font-medium transition-colors duration-500 ${mutedColor}`}
            >
              <SlideLabel primary={l.label} />
            </a>
          ))}
          <Link
            to="/blog"
            className={`group text-[14px] font-medium transition-colors duration-500 ${mutedColor}`}
          >
            <SlideLabel primary={dict.nav.blog} />
          </Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <ThemeToggle />
          <a
            {...getStartedProps}
            data-cta-location="navbar"
            data-cta-label="Get Started"
            className="group inline-flex cursor-pointer items-center gap-1.5 rounded-[4px] bg-isla-cyan py-1 pl-3.5 pr-1 text-[14px] font-bold text-white shadow-[0_0_20px_rgba(0,191,255,0.35)] transition-transform hover:scale-[1.02]"
          >
            <SlideLabel primary={dict.nav.getStarted} secondary={dict.nav.letsGo} />
            <span className="flex h-7 w-7 items-center justify-center rounded-[3px] transition-transform group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
