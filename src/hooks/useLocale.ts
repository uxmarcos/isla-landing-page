import { useCallback, useEffect, useState } from "react";
import { translations, type TranslationKey } from "@/i18n/translations";

export type Locale = "en" | "pt";

const STORAGE_KEY = "isla-locale";

function readLocale(): Locale {
  if (typeof document === "undefined") return "en";
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "pt") return stored;
  } catch {
    /* ignore */
  }
  return "en";
}

function applyLocale(locale: Locale) {
  document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* ignore */
  }
}

function resolve(key: TranslationKey, locale: Locale): string {
  const value = key
    .split(".")
    .reduce<unknown>((acc, part) => (acc && typeof acc === "object" ? (acc as Record<string, unknown>)[part] : undefined), translations[locale]);
  if (typeof value === "string") return value;
  return key;
}

/**
 * Same pattern as useTheme: no React context, each caller re-derives its own
 * state from localStorage and stays in sync via a MutationObserver on
 * <html lang>, so the initial SSR/first-paint locale ("en") never mismatches
 * hydration — the stored preference is applied after mount.
 */
export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const initial = readLocale();
    if (initial !== "en") applyLocale(initial);
    setLocaleState(initial);

    const observer = new MutationObserver(() => {
      const current = document.documentElement.lang === "pt-BR" ? "pt" : "en";
      setLocaleState(current);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });
    return () => observer.disconnect();
  }, []);

  const setLocale = useCallback((next: Locale) => {
    applyLocale(next);
    setLocaleState(next);
  }, []);

  const t = useCallback((key: TranslationKey) => resolve(key, locale), [locale]);

  return { locale, setLocale, t, dict: translations[locale], isPt: locale === "pt" };
}

export default useLocale;
