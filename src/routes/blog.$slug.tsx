import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { fetchBlogPost } from "@/lib/blog.functions";
import { BlogCard } from "./blog.index";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import { BlogPostSkeleton } from "@/components/BlogSkeletons";
import { useLocale } from "@/hooks/useLocale";

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
  errorComponent: ({ error }) => {
    const { dict } = useLocale();
    return (
      <main>
        <Navbar />
        <section className="bg-[#05070d] pt-32 pb-24 text-center text-white">
          <h1 className="text-2xl font-semibold">{dict.blogPost.errorHeading}</h1>
          <p className="mt-2 text-sm text-white/60">{error.message}</p>
          <Link to="/blog" className="mt-6 inline-block text-isla-cyan underline">
            {dict.blogPost.backToBlog}
          </Link>
        </section>
        <Footer />
      </main>
    );
  },
  notFoundComponent: () => {
    const { dict } = useLocale();
    return (
      <main>
        <Navbar />
        <section className="bg-[#05070d] pt-32 pb-24 text-center text-white">
          <h1 className="text-2xl font-semibold">{dict.blogPost.notFoundHeading}</h1>
          <Link to="/blog" className="mt-6 inline-block text-isla-cyan underline">
            {dict.blogPost.backToBlog}
          </Link>
        </section>
        <Footer />
      </main>
    );
  },
});

function formatDate(iso: string | null, locale: "en" | "pt") {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString(locale === "pt" ? "pt-BR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

function BlogPostPage() {
  const { post, related } = Route.useLoaderData();
  const { dict, locale } = useLocale();
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
            <Link to="/" className="hover:text-isla-cyan">{dict.blogPost.home}</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/blog" className="hover:text-isla-cyan">{dict.blogPost.blog}</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="truncate text-neutral-700">{post.title}</span>
          </nav>
        </div>
        <div className="mx-auto max-w-3xl px-6 pt-6 pb-20">
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
                <span>{formatDate(post.date, locale)}</span>
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
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-white dark:bg-[#0A0A0A] pb-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-center text-2xl font-semibold text-neutral-900 dark:text-white">
              {dict.blogPost.youMayAlsoLike}
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
                {dict.blogPost.viewAll}
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
