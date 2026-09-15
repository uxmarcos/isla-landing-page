import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { listPublishedPosts } from "@/lib/notion.server";
import { getMockPosts } from "@/lib/blog-mock";

const BASE_URL = "https://isla.to";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

function toLastmod(iso: string | null | undefined): string {
  if (iso) {
    const d = new Date(iso);
    if (!isNaN(d.getTime())) return d.toISOString();
  }
  return new Date().toISOString();
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const now = new Date().toISOString();
        const entries: SitemapEntry[] = [
          { path: "/", lastmod: now, changefreq: "weekly", priority: "1.0" },
          { path: "/blog", lastmod: now, changefreq: "daily", priority: "0.8" },
        ];

        let posts: { slug: string; date?: string | null }[] = [];
        try {
          if (process.env.NOTION_TOKEN && process.env.NOTION_DATABASE_ID) {
            posts = await listPublishedPosts();
          }
        } catch {
          posts = [];
        }
        if (posts.length === 0) posts = getMockPosts();
        for (const p of posts) {
          entries.push({
            path: `/blog/${p.slug}`,
            lastmod: toLastmod(p.date ?? null),
            changefreq: "monthly",
            priority: "0.6",
          });
        }

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
