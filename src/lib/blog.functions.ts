import { createServerFn } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import {
  getPostBySlug,
  listPublishedPosts,
  type BlogPost,
  type BlogPostSummary,
} from "./notion.server";
import { getMockPost, getMockPosts } from "./blog-mock";

function notionConfigured() {
  return Boolean(
    (process.env.NOTION_TOKEN || process.env.NOTION_API_KEY) &&
      process.env.NOTION_DATABASE_ID,
  );
}

// Cache responses on the edge: fresh for 60s, serve stale up to 10min while
// revalidating in the background. Drops perceived latency on repeat visits.
function setBlogCacheHeaders() {
  try {
    setResponseHeader(
      "Cache-Control",
      "public, max-age=60, s-maxage=60, stale-while-revalidate=600",
    );
  } catch {
    // not in a request context (e.g. during build); ignore
  }
}

export const fetchBlogPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ posts: BlogPostSummary[]; error: string | null }> => {
    setBlogCacheHeaders();
    if (!notionConfigured()) {
      return { posts: getMockPosts(), error: null };
    }
    try {
      const posts = await listPublishedPosts();
      if (posts.length === 0) return { posts: getMockPosts(), error: null };
      return { posts, error: null };
    } catch (e) {
      console.error("fetchBlogPosts failed:", e);
      return { posts: getMockPosts(), error: null };
    }
  },
);

export const fetchBlogPost = createServerFn({ method: "GET" })
  .inputValidator(z.object({ slug: z.string().min(1).max(200) }).parse)
  .handler(
    async ({
      data,
    }): Promise<{
      post: BlogPost | null;
      related: BlogPostSummary[];
      error: string | null;
    }> => {
      setBlogCacheHeaders();
      const buildRelated = (all: BlogPostSummary[]) =>
        all.filter((p) => p.slug !== data.slug).slice(0, 3);

      if (!notionConfigured()) {
        const post = getMockPost(data.slug);
        return { post, related: buildRelated(getMockPosts()), error: null };
      }
      try {
        // Fetch post + list in PARALLEL to remove the waterfall.
        const [post, all] = await Promise.all([
          getPostBySlug(data.slug),
          listPublishedPosts().catch(() => [] as BlogPostSummary[]),
        ]);
        if (!post) {
          const mock = getMockPost(data.slug);
          return {
            post: mock,
            related: buildRelated(all.length ? all : getMockPosts()),
            error: null,
          };
        }
        return { post, related: buildRelated(all), error: null };
      } catch (e) {
        console.error("fetchBlogPost failed:", e);
        const mock = getMockPost(data.slug);
        return { post: mock, related: buildRelated(getMockPosts()), error: null };
      }
    },
  );
