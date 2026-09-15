import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, ChevronRight, CheckCircle2 } from "lucide-react";
import { fetchBlogPost } from "@/lib/blog.functions";
import { BlogCard } from "./blog.index";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import { BlogPostSkeleton } from "@/components/BlogSkeletons";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/blog/$slug")({
  staleTime: 5 * 60 * 1000,
  loader: async ({ params }) => {
    const data = await fetchBlogPost({ data: { slug: params.slug } });
    if (!data.post) throw notFound();
    return data;
  },
  pendingComponent: BlogPostSkeleton,
  head: ({ params, loaderData }) => {
    const post = loaderData?.post;
    if (!post) return { meta: [{ title: "Post — Isla" }] };
    const url = `https://isla.to/blog/${params.slug}`;
    const jsonLd: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      datePublished: post.date ?? undefined,
      author: post.author
        ? { "@type": "Person", name: post.author }
        : undefined,
      image: post.cover ?? undefined,
      mainEntityOfPage: url,
      description: post.excerpt || undefined,
    };
    return {
      meta: [
        { title: `${post.title} — Isla Blog` },
        { name: "description", content: post.excerpt || post.title },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt || post.title },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        ...(post.cover ? [{ property: "og:image", content: post.cover }] : []),
        ...(post.cover
          ? [{ name: "twitter:image", content: post.cover }]
          : []),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.excerpt || post.title },
      ],
      links: [
        { rel: "canonical", href: url },
        ...(post.cover
          ? [
              {
                rel: "preload",
                as: "image" as const,
                href: post.cover,
                fetchpriority: "high",
              },
            ]
          : []),
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(jsonLd),
        },
      ],
    };
  },
  component: BlogPostPage,
  errorComponent: ({ error }) => (
    <main>
      <Navbar />
      <section className="bg-[#05070d] pt-32 pb-24 text-center text-white">
        <h1 className="text-2xl font-semibold">Couldn't load post</h1>
        <p className="mt-2 text-sm text-white/60">{error.message}</p>
        <Link to="/blog" className="mt-6 inline-block text-isla-cyan underline">
          Back to blog
        </Link>
      </section>
      <Footer />
    </main>
  ),
  notFoundComponent: () => (
    <main>
      <Navbar />
      <section className="bg-[#05070d] pt-32 pb-24 text-center text-white">
        <h1 className="text-2xl font-semibold">Post not found</h1>
        <Link to="/blog" className="mt-6 inline-block text-isla-cyan underline">
          Back to blog
        </Link>
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

const SOCIALS = [
  { Icon: Facebook, label: "Facebook", count: "12k", href: "#" },
  { Icon: Twitter, label: "Twitter", count: "2k", href: "#" },
  { Icon: Instagram, label: "Instagram", count: "4k", href: "#" },
  { Icon: Linkedin, label: "LinkedIn", count: "78k", href: "#" },
  { Icon: Youtube, label: "YouTube", count: "65k", href: "#" },
];

function BlogPostPage() {
  const { post, related } = Route.useLoaderData();
  if (!post) return null;

  return (
    <main className="bg-white dark:bg-[#0A0A0A]">
      <Navbar />

      {/* Banner */}
      <section
        data-nav-theme="dark"
        className="relative h-[280px] w-full overflow-hidden bg-[#05070d] md:h-[340px]"
      >
        {post.cover && (
          <>
            <img
              src={post.cover}
              alt=""
              loading="eager"
              decoding="async"
              // @ts-expect-error - valid HTML attribute, missing in React types
              fetchpriority="high"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </>
        )}
      </section>

      {/* Article + Sidebar */}
      <section className="bg-white dark:bg-[#0A0A0A]">
        <div className="mx-auto max-w-6xl px-6 pt-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-neutral-500 dark:text-white/45">
            <Link to="/" className="hover:text-isla-cyan">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/blog" className="hover:text-isla-cyan">Blog</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="truncate text-neutral-700">{post.title}</span>
          </nav>
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 pt-6 pb-20 lg:grid-cols-[1fr_300px] lg:gap-16">
          <article className="min-w-0">
            <header className="mb-8">
              {post.category && (
                <span className="inline-block rounded-md bg-isla-cyan/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-isla-cyan">
                  {post.category}
                </span>
              )}
              <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-neutral-900 dark:text-white md:text-4xl">
                {post.title}
              </h1>
              <div className="mt-5 flex items-center justify-between text-sm text-neutral-500 dark:text-white/45">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-200 text-[11px] font-semibold text-neutral-700">
                    {post.author?.[0] ?? "I"}
                  </span>
                  <span className="text-neutral-700">{post.author}</span>
                </div>
                <span>{formatDate(post.date)}</span>
              </div>
            </header>

            {post.cover && (
              <img
                src={post.cover}
                alt=""
                loading="eager"
                decoding="async"
                className="mb-10 aspect-[16/9] w-full rounded-lg object-cover"
              />
            )}

            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </article>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <NewsletterCard />
          </aside>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-white dark:bg-[#0A0A0A] pb-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-center text-2xl font-semibold text-neutral-900 dark:text-white">
              You may also like
            </h2>
            <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p: (typeof related)[number]) => (
                <li key={p.id}>
                  <BlogCard post={p} />
                </li>
              ))}
            </ul>
            <div className="mt-12 flex justify-center">
              <Link
                to="/blog"
                className="text-sm font-medium text-neutral-900 dark:text-white underline underline-offset-4 hover:text-isla-cyan"
              >
                View All
              </Link>
            </div>
          </div>
        </section>
      )}

      <FinalCTA />
      <Footer />
    </main>
  );
}

function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setErrorMsg("");
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email });
    if (error) {
      if (error.code === "23505") {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(error.message);
      }
      return;
    }
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="rounded-lg border border-neutral-200 dark:border-[#2C2C2C] p-6">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-isla-cyan/10">
            <CheckCircle2 className="h-6 w-6 text-isla-cyan" />
          </div>
          <h3 className="mt-4 text-sm font-semibold text-neutral-900 dark:text-white">
            You're subscribed!
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-white/45">
            Thanks for joining our newsletter. Keep an eye on your inbox for
            our next selection of articles.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-neutral-200 dark:border-[#2C2C2C] p-6">
      <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">Subscription</h3>
      <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-white/45">
        Subscribe to our newsletter and receive a selection of cool articles
        every week.
      </p>
      <form className="mt-4 flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          placeholder="Enter your email"
          className="rounded-md border border-neutral-200 dark:border-[#2C2C2C] bg-white dark:bg-[#0A0A0A] px-3 py-2 text-sm text-neutral-900 dark:text-white outline-none placeholder:text-neutral-400 focus:border-isla-cyan disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-md bg-isla-cyan py-2 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(0,191,255,0.3)] transition-transform hover:scale-[1.01] disabled:opacity-60"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
        {status === "error" && (
          <p className="text-[11px] text-red-600">{errorMsg || "Something went wrong. Please try again."}</p>
        )}
      </form>
    </div>
  );
}
