import KanbanMockup from "@/components/KanbanMockup";
import BrowserFrame from "@/components/ui/BrowserFrame";
import heroKanbanMobile from "@/assets/hero-kanban-mobile.png.asset.json";

export function HeroShowcase() {
  return (
    <section
      data-nav-theme="light"
      className="relative w-full overflow-hidden border-t border-[#D3D3D3] bg-isla-cyan dark:border-[#2C2C2C]"
    >
      <style>{`
        @keyframes isla-window-open {
          from { opacity: 0; transform: translate3d(0, 90px, 0) scale(0.985); }
          to   { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
        }
        .isla-window-open {
          animation: isla-window-open 820ms cubic-bezier(0.16, 1, 0.3, 1) both;
          will-change: transform, opacity;
        }
        @media (prefers-reduced-motion: reduce) {
          .isla-window-open { animation: none; }
        }
      `}</style>
      <div className="mx-auto w-full max-w-[1440px] px-[10px] pt-8 md:px-6 md:pt-16 lg:px-20">
        {/* Mobile: static cropped mockup image */}
        <div className="isla-window-open md:hidden">
          <div className="relative -mx-[10px] overflow-hidden">
            <img
              src={heroKanbanMobile.url}
              alt="Isla Lead Board kanban with leads moving from first signal to closed revenue"
              className="block w-full max-w-none object-cover"
              loading="eager"
            />
          </div>
        </div>

        {/* Live product mockup — Isla Lead Board (tablet & desktop) */}
        <div className="isla-window-open hidden md:block">
          <BrowserFrame className="rounded-t-2xl border-b-0 shadow-[0_-10px_60px_rgba(0,0,0,0.12)] dark:shadow-none">
            <KanbanMockup className="rounded-none border-0" />
          </BrowserFrame>
        </div>
      </div>
    </section>
  );
}

export default HeroShowcase;
