
## Goal

Make new blog posts get discovered by Google as fast as possible, automatically — no manual step every time you publish.

## Background (important context)

- Google **deprecated the public `ping?sitemap=` endpoint in 2023** — submitting a sitemap URL via a GET no longer does anything.
- Google's **Indexing API** is restricted to JobPosting / BroadcastEvent. We can't use it for blog posts (it would be ignored / against ToS).
- The realistic, supported automation for a blog is:
  1. A dynamic sitemap with a correct `<lastmod>` per post.
  2. Periodically calling the **Google Search Console Sitemaps API** to resubmit `sitemap.xml`, which nudges Google to recrawl it.

The Google Search Console connector is already linked to this project, so we can call that API from the server without you copying any keys.

## One-time manual step (you, in GSC UI)

You'll need to do this once — code can't substitute for it:

1. Open Google Search Console → your `https://isla.to/` property.
2. Sitemaps → submit `https://isla.to/sitemap.xml`.

That registers the sitemap. After that, everything below runs on its own.

## What I'll build

### 1. Improve the sitemap (`src/routes/sitemap[.]xml.ts`)

- Add `lastmod` per URL using the post's `date` field from Notion (and `new Date().toISOString()` for the home and `/blog` index). `lastmod` is the single biggest signal Google uses to decide "is there anything new here worth recrawling?".
- Keep current behavior: fetch all `Publicado` posts from Notion, fall back to mocks on error.
- Same `Cache-Control: public, max-age=3600` so the edge doesn't hammer Notion.

### 2. Add a cron-triggered resubmit endpoint

New file: `src/routes/api/public/hooks/resubmit-sitemap.ts`

- POST handler under `/api/public/*` (auth-bypass prefix, secured by Supabase anon `apikey` header).
- Calls the GSC Sitemaps API via the Lovable connector gateway:
  - `PUT https://connector-gateway.lovable.dev/google_search_console/webmasters/v3/sites/https%3A%2F%2Fisla.to%2F/sitemaps/https%3A%2F%2Fisla.to%2Fsitemap.xml`
  - Headers: `Authorization: Bearer $LOVABLE_API_KEY`, `X-Connection-Api-Key: $GOOGLE_SEARCH_CONSOLE_API_KEY`.
- Returns `{ ok: true }` on 2xx, logs the GSC response body on failure.

### 3. Schedule it with pg_cron

Insert a cron job (via `supabase--insert`, not a migration, since it contains the anon key) that hits the endpoint **once a day at 03:00 UTC**. Daily is the sweet spot — frequent enough that a new post is picked up within ~24h, infrequent enough that Google doesn't ignore the resubmissions as noise.

```sql
select cron.schedule(
  'resubmit-sitemap-to-gsc',
  '0 3 * * *',
  $$
  select net.http_post(
    url := 'https://project--51b30ab7-dd1f-499b-9818-bb4c3f43834f.lovable.app/api/public/hooks/resubmit-sitemap',
    headers := '{"Content-Type":"application/json","apikey":"<ANON_KEY>"}'::jsonb,
    body := '{}'::jsonb
  );
  $$
);
```

## What you'll observe afterwards

- `sitemap.xml` will show a `<lastmod>` next to every URL, updated whenever a post's Notion `Data` field changes.
- In GSC → Sitemaps you'll see the "Last read" timestamp advance daily.
- New posts typically appear in Google search within a few days of being published — usually faster than relying on Google's own crawl schedule.

## What this does NOT do

- It does **not** force Google to index a specific URL immediately. No public tool does that for regular content; only the GSC UI's "Request indexing" button (manual, one URL at a time) gets close.
- It does **not** improve ranking — only discovery speed.
