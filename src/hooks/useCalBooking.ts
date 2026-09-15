import { useCallback, useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

export const CAL_NAMESPACE = "15min";
export const CAL_LINK = "marcoshollmann/15min";
export const CAL_CONFIG =
  '{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}';

export const calBookingProps = {
  "data-cal-namespace": CAL_NAMESPACE,
  "data-cal-link": CAL_LINK,
  "data-cal-config": CAL_CONFIG,
} as const;

export function useCalBooking() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  const openCal = useCallback(async () => {
    const cal = await getCalApi({ namespace: CAL_NAMESPACE });
    cal("modal", {
      calLink: CAL_LINK,
      config: {
        layout: "month_view",
        useSlotsViewOnSmallScreen: "true",
      },
    });
  }, []);

  return { openCal };
}

export const GET_STARTED_URL = "https://app.isla.to/signup";

export const getStartedProps = {
  href: GET_STARTED_URL,
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
