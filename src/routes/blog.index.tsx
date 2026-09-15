import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { fetchBlogPosts } from "@/lib/blog.functions";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import SlideLabel from "@/components/ui/SlideLabel";
import { BlogIndexSkeleton } from "@/components/BlogSkeletons";

export const Route = createFileRoute("/blog/")({
  staleTime: 5 * 60 * 1000,
  loader: () => fetchBlogPosts(),
  pendingComponent: BlogIndexSkeleton,
  head: () => ({
    meta: [
      { title: "Blog — The Growth Playbook for B2B Teams" },
      {
        name: "description",
        content:
          "Case studies, frameworks, and practical insights on go-to-market strategy, growth, and customer acquisition.",
      },
      { property: "og:title", content: "The Growth Playbook for B2B Teams — Isla Blog" },
      {
        property: "og:description",
        content:
          "Case studies, frameworks, and practical insights on go-to-market strategy, growth, and customer acquisition.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://isla.to/blog" },
    ],
    links: [{ rel: "canonical", href: "https://isla.to/blog" }],
  }),
  component: BlogIndex,
  errorComponent: ({ error }) => (
    <main>
      <Navbar />
      <section className="bg-[#05070d] pt-32 pb-24 text-center text-white">
        <h1 className="text-2xl font-semibold">Couldn't load the blog</h1>
        <p className="mt-2 text-sm text-white/60">{error.message}</p>
      </section>
      <Footer />
    </main>
  ),
});

function formatDate(iso: string | null) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

function BlogIndex() {
  const { posts, error } = Route.useLoaderData();
  const visible = posts.slice(0, 9);

  return (
    <main className="bg-white dark:bg-[#0A0A0A]">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-white dark:bg-[#0A0A0A] pt-32 pb-8 md:pt-40 md:pb-10">
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <span className="inline-block rounded-full bg-isla-cyan px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white">
            Isla Blog
          </span>
          <h1
            className="mt-6 font-display text-[40px] font-light leading-[1.05] text-neutral-900 dark:text-white md:text-[60px]"
            style={{ letterSpacing: "-0.4px" }}
          >
            The Growth Playbook for B2B Teams
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-neutral-500 dark:text-white/45 md:text-[18px]">
            Case studies, frameworks, and practical insights on go-to-market
            strategy, growth, and customer acquisition.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-white dark:bg-[#0A0A0A] py-20 md:py-24 pt-0">
        <div className="mx-auto max-w-7xl px-6">
          {error && (
            <div className="mb-8 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {visible.length === 0 ? (
            <p className="text-center text-neutral-500 dark:text-white/45">
              No posts published yet.
            </p>
          ) : (
            <ul className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((post: (typeof visible)[number]) => (
                <li key={post.id}>
                  <BlogCard post={post} />
                </li>
              ))}
            </ul>
          )}

          {visible.length >= 9 && (
            <div className="mt-16 flex justify-center">
              <button
                type="button"
                className="group inline-flex items-center gap-2 rounded-[4px] bg-isla-cyan py-1.5 pl-5 pr-1.5 text-[14px] font-bold text-white shadow-[0_8px_30px_rgba(0,191,255,0.35)] transition-transform hover:scale-[1.02]"
              >
                Load More
                <span className="flex h-8 w-8 items-center justify-center rounded-[3px] transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </button>
            </div>
          )}
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </main>
  );
}

export function BlogCard({
  post,
}: {
  post: {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    date: string | null;
    author: string;
    category: string;
    cover: string | null;
  };
}) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      preload="intent"
      className="group block"
    >
      <div className="relative overflow-hidden rounded-lg">
        {post.cover ? (
          <img
            src={post.cover}
            alt=""
            loading="lazy"
            className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="aspect-[16/10] w-full bg-neutral-200" />
        )}
        {post.category && (
          <span className="absolute left-3 top-3 rounded-md bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
            {post.category}
          </span>
        )}
      </div>

      <h2 className="mt-5 text-[18px] font-semibold leading-snug text-neutral-900 dark:text-white transition-colors duration-300 group-hover:text-isla-cyan">
        {post.title}
      </h2>

      <div className="mt-3 flex items-center justify-between text-[12px] text-neutral-500 dark:text-white/45">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-200 text-[10px] font-semibold text-neutral-700">
            {post.author?.[0] ?? "I"}
          </span>
          <span className="text-neutral-700">{post.author}</span>
        </div>
        <span>{formatDate(post.date)}</span>
      </div>

      {post.excerpt && (
        <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-neutral-500 dark:text-white/45">
          {post.excerpt}
        </p>
      )}

      <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-neutral-900 dark:text-white transition-transform duration-200 group-hover:scale-[1.02]">
        <SlideLabel primary="View Post" />
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-45" strokeWidth={2.5} />
      </span>
    </Link>
  );
}
