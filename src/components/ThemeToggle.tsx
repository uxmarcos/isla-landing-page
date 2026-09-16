import { useRef } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

/**
 * Light/Dark toggle with a circular view-transition reveal from the button.
 *
 * `onDarkSurface` reflects the navbar's section-aware theme (e.g. scrolled
 * over a dark footer while the site itself is in light mode) — it's what
 * decides the button's own colors, independently of the global theme.
 */
export function ThemeToggle({
  className,
  onDarkSurface = false,
}: {
  className?: string;
  onDarkSurface?: boolean;
}) {
  const { isDark, toggleTheme } = useTheme();
  const ref = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    const rect = ref.current?.getBoundingClientRect();
    toggleTheme(
      rect ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } : undefined,
    );
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={handleClick}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "relative inline-flex size-9 cursor-pointer items-center justify-center rounded-[4px] border transition-colors duration-500",
        onDarkSurface
          ? "border-white/15 text-white/80 hover:bg-white/10 hover:text-white"
          : "border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900",
        className,
      )}
    >
      <Sun
        className={cn(
          "absolute size-[18px] transition-all duration-500",
          isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100",
        )}
        strokeWidth={2}
      />
      <Moon
        className={cn(
          "absolute size-[18px] transition-all duration-500",
          isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0",
        )}
        strokeWidth={2}
      />
    </button>
  );
}

export default ThemeToggle;
