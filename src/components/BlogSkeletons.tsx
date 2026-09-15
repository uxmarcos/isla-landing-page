import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function CardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[16/10] w-full rounded-lg bg-neutral-200" />
      <div className="mt-5 h-5 w-5/6 rounded bg-neutral-200" />
      <div className="mt-2 h-5 w-3/4 rounded bg-neutral-200" />
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-neutral-200" />
          <div className="h-3 w-20 rounded bg-neutral-200" />
        </div>
        <div className="h-3 w-16 rounded bg-neutral-200" />
      </div>
      <div className="mt-3 h-3 w-full rounded bg-neutral-200" />
      <div className="mt-2 h-3 w-2/3 rounded bg-neutral-200" />
    </div>
  );
}

export function BlogIndexSkeleton() {
  return (
    <main className="bg-white dark:bg-[#0A0A0A]">
      <Navbar />
      <section className="relative w-full overflow-hidden bg-white dark:bg-[#0A0A0A] pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mx-auto h-7 w-28 animate-pulse rounded-full bg-neutral-200" />
          <div className="mx-auto mt-6 h-12 w-3/4 animate-pulse rounded bg-neutral-200" />
          <div className="mx-auto mt-4 h-12 w-1/2 animate-pulse rounded bg-neutral-200" />
          <div className="mx-auto mt-6 h-5 w-2/3 animate-pulse rounded bg-neutral-200" />
        </div>
      </section>
      <section className="bg-white dark:bg-[#0A0A0A] py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <ul className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <li key={i}>
                <CardSkeleton />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export function BlogPostSkeleton() {
  return (
    <main className="bg-white dark:bg-[#0A0A0A]">
      <Navbar />
      <section
        data-nav-theme="dark"
        className="relative h-[280px] w-full overflow-hidden bg-[#05070d] md:h-[340px]"
      >
        <div className="absolute inset-0 animate-pulse bg-neutral-900" />
      </section>
      <section className="bg-white dark:bg-[#0A0A0A]">
        <div className="mx-auto max-w-6xl px-6 pt-8">
          <div className="h-4 w-64 animate-pulse rounded bg-neutral-200" />
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 pt-6 pb-20 lg:grid-cols-[1fr_300px] lg:gap-16">
          <article className="min-w-0 animate-pulse">
            <div className="h-5 w-24 rounded bg-neutral-200" />
            <div className="mt-4 h-10 w-full rounded bg-neutral-200" />
            <div className="mt-2 h-10 w-3/4 rounded bg-neutral-200" />
            <div className="mt-6 h-4 w-48 rounded bg-neutral-200" />
            <div className="mt-10 aspect-[16/9] w-full rounded-lg bg-neutral-200" />
            <div className="mt-10 space-y-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="h-4 rounded bg-neutral-200"
                  style={{ width: `${70 + ((i * 13) % 30)}%` }}
                />
              ))}
            </div>
          </article>
          <aside className="animate-pulse">
            <div className="h-64 rounded-lg border border-neutral-200 dark:border-[#2C2C2C] bg-neutral-100 dark:bg-[#1A1A1A]" />
          </aside>
        </div>
      </section>
      <Footer />
    </main>
  );
}
