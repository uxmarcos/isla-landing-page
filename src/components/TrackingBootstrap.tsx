import { useEffect } from "react";
import { useScrollDepth, track, isTrackingDisabled } from "@/lib/analytics";

/** Mounts global tracking listeners (scroll depth, Cal booking opens). */
export default function TrackingBootstrap() {
  useScrollDepth();

  useEffect(() => {
    if (isTrackingDisabled()) return;

    // Detect Cal.com modal opens via DOM mutation (Cal injects iframes).
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const el = target?.closest?.("[data-cal-link]") as HTMLElement | null;
      if (!el) return;
      track("cta_clicked", {
        location: el.dataset.ctaLocation || "unknown",
        label: el.dataset.ctaLabel || el.textContent?.trim()?.slice(0, 40) || "",
        cal_link: el.getAttribute("data-cal-link"),
      });
      track("cal_booking_opened", { location: el.dataset.ctaLocation || "unknown" });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
