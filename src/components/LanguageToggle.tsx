import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale, type Locale } from "@/hooks/useLocale";
import { cn } from "@/lib/utils";

const OPTIONS: { locale: Locale; label: string }[] = [
  { locale: "en", label: "EN" },
  { locale: "pt", label: "PT-BR" },
];

/** Language dropdown, styled to match ThemeToggle's icon-button footprint. */
export function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale, dict } = useLocale();
  const current = OPTIONS.find((o) => o.locale === locale) ?? OPTIONS[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={dict.language.label}
          className={cn(
            "relative inline-flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-[4px] border px-2 text-[12px] font-bold tracking-wide transition-colors duration-500",
            "border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900",
            "dark:border-white/15 dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white",
            className,
          )}
        >
          {current.label}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        {OPTIONS.map((o) => (
          <DropdownMenuItem
            key={o.locale}
            onSelect={() => setLocale(o.locale)}
            className={cn(
              "text-[13.5px]",
              o.locale === locale && "font-semibold text-isla-cyan",
            )}
          >
            {o.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageToggle;
