import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://isla.to/";
const SITEMAP_URL = "https://isla.to/sitemap.xml";
const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";

export const Route = createFileRoute("/api/public/hooks/resubmit-sitemap")({
  server: {
    handlers: {
      POST: async () => {
        const lovableKey = process.env.LOVABLE_API_KEY;
        const gscKey = process.env.GOOGLE_SEARCH_CONSOLE_API_KEY;
        if (!lovableKey || !gscKey) {
          return Response.json(
            { ok: false, error: "Missing LOVABLE_API_KEY or GOOGLE_SEARCH_CONSOLE_API_KEY" },
            { status: 500 },
          );
        }

        const url = `${GATEWAY}/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/sitemaps/${encodeURIComponent(SITEMAP_URL)}`;

        const res = await fetch(url, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${lovableKey}`,
            "X-Connection-Api-Key": gscKey,
          },
        });

        if (!res.ok) {
          const body = await res.text();
          console.error("GSC sitemap resubmit failed", res.status, body);
          return Response.json(
            { ok: false, status: res.status, body },
            { status: 502 },
          );
        }

        return Response.json({ ok: true, sitemap: SITEMAP_URL, submittedAt: new Date().toISOString() });
      },
    },
  },
});
