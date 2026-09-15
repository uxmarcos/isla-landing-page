import type { BlogPost, BlogPostSummary } from "./notion.server";

const COVER =
  "https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&w=1600&q=80";

const AUTHOR = "Eduardo Schuch";
const DATE = "2025-06-26";

const MOCK_SUMMARIES: BlogPostSummary[] = [
  {
    id: "m1",
    slug: "why-b2b-teams-fail-gtm-execution",
    title: "Why Most B2B Teams Fail at Go-to-Market Execution",
    excerpt:
      "The gap between planning and execution—and how top-performing teams close it.",
    date: DATE,
    author: AUTHOR,
    category: "GTM Strategy",
    cover: COVER,
  },
  {
    id: "m2",
    slug: "linkedin-activity-into-real-pipeline",
    title: "How to Turn LinkedIn Activity Into Real Pipeline",
    excerpt:
      "A practical framework for converting engagement into qualified opportunities.",
    date: DATE,
    author: AUTHOR,
    category: "LinkedIn Growth",
    cover: COVER,
  },
  {
    id: "m3",
    slug: "ai-powered-gtm-system-inside-slack",
    title: "Building an AI-Powered GTM System Inside Slack",
    excerpt:
      "How modern teams automate repetitive growth tasks without adding complexity.",
    date: DATE,
    author: AUTHOR,
    category: "AI & Automation",
    cover: COVER,
  },
  {
    id: "m4",
    slug: "end-of-random-posting-content-engine",
    title: "The End of Random Posting: Creating a Repeatable Content Engine",
    excerpt: "Build a system that consistently generates visibility and demand.",
    date: DATE,
    author: AUTHOR,
    category: "Content Strategy",
    cover: COVER,
  },
  {
    id: "m5",
    slug: "signal-based-outbound-reaching-buyers",
    title: "Signal-Based Outbound: Reaching Buyers at the Right Moment",
    excerpt:
      "Use intent signals to improve response rates and book more meetings.",
    date: DATE,
    author: AUTHOR,
    category: "Outbound",
    cover: COVER,
  },
  {
    id: "m6",
    slug: "hidden-cost-of-gtm-fragmentation",
    title: "The Hidden Cost of GTM Fragmentation",
    excerpt:
      "Why disconnected tools and workflows slow growth and reduce efficiency.",
    date: DATE,
    author: AUTHOR,
    category: "Revenue Operations",
    cover: COVER,
  },
  {
    id: "m7",
    slug: "founders-build-authority-linkedin",
    title: "How Founders Can Build Authority Without Spending Hours on LinkedIn",
    excerpt: "A scalable approach to personal branding for busy executives.",
    date: DATE,
    author: AUTHOR,
    category: "Founder-Led Growth",
    cover: COVER,
  },
  {
    id: "m8",
    slug: "zero-to-consistent-pipeline-case-study",
    title: "From Zero to Consistent Pipeline: A GTM Transformation Story",
    excerpt:
      "Lessons learned from implementing a structured growth system.",
    date: DATE,
    author: AUTHOR,
    category: "Case Study",
    cover: COVER,
  },
  {
    id: "m9",
    slug: "modern-gtm-stack-b2b-teams-need",
    title: "The Modern GTM Stack: What B2B Teams Actually Need",
    excerpt:
      "Separate essential tools from unnecessary software and reduce operational overhead.",
    date: DATE,
    author: AUTHOR,
    category: "Growth Frameworks",
    cover: COVER,
  },
];

const FEATURED_CONTENT = `
<p><strong>Most B2B teams don't have a strategy problem — they have an execution problem.</strong> The plan sounds great in the kickoff meeting, lives in a Notion doc for six weeks, then quietly dies when the quarter ends and nobody can point to what actually moved pipeline.</p>
<p>After working with hundreds of go-to-market teams, the pattern is depressingly consistent: smart people, ambitious targets, expensive tools — and a fuzzy gap between what was planned and what was shipped. This article breaks down why that gap exists, and the operating system high-performing teams use to close it.</p>

<h2>The Execution Gap Is Bigger Than You Think</h2>
<p>In a recent internal benchmark across 40+ Series A–C SaaS companies, only <strong>23%</strong> of GTM initiatives committed to at the start of a quarter were fully shipped by the end of it. The rest were partially done, silently dropped, or "moved to next quarter" — which, in practice, means dead.</p>
<p>The interesting part isn't the number. It's the reason. When we asked operators why initiatives stalled, the top three answers were never "we picked the wrong strategy." They were:</p>
<ul>
  <li>No single owner accountable for the outcome</li>
  <li>Too many parallel priorities, none of them protected</li>
  <li>No weekly mechanism to catch drift early</li>
</ul>

<blockquote>"We don't lose deals to competitors. We lose them to our own inability to follow up consistently."<br/>— VP of Sales, post-Series B SaaS</blockquote>

<h2>The Four Failure Modes</h2>
<p>Execution failure isn't one thing. It shows up in four distinct shapes, and the fix for each is different.</p>

<h3>1. Strategy Theater</h3>
<p>The team produces beautiful decks, OKRs, and ICP documents — but none of it changes what reps do on Monday morning. The plan exists in a parallel universe to the actual work.</p>

<h3>2. Tool Sprawl</h3>
<p>Each problem is solved by buying another tool. Within 18 months you have 14 GTM tools, three sources of truth, and an ops team spending 60% of its time reconciling data instead of generating insight.</p>

<h3>3. Signal Blindness</h3>
<p>Buyers are leaving signals everywhere — LinkedIn engagement, job changes, product usage, intent data — but the team is still running on cold lists from a year-old export. The motion is technically working; it's just aimed at the wrong people.</p>

<h3>4. Cadence Collapse</h3>
<p>Weekly forecast calls turn into status theater. Pipeline reviews become number-defense rituals. The meetings that should catch problems early become the meetings where problems are hidden.</p>

<figure><img src="${COVER}" alt="Operators reviewing a weekly GTM dashboard" loading="lazy" /><figcaption>A weekly cadence isn't about the meeting — it's about the forcing function.</figcaption></figure>

<h2>The Operating System That Actually Works</h2>
<p>Teams that consistently hit their numbers share a surprisingly boring set of habits. None of them are clever. All of them are hard to maintain.</p>

<ol>
  <li><strong>One owner per outcome.</strong> Not "marketing and sales own pipeline." One name, one number, one weekly review.</li>
  <li><strong>Three priorities, ruthlessly protected.</strong> Anything outside the three goes to a parking lot. The parking lot is reviewed quarterly, not weekly.</li>
  <li><strong>Signal-based targeting.</strong> Every account in the active list has a reason it's there this week — a trigger, a behavior, a moment.</li>
  <li><strong>Weekly mechanism, not monthly.</strong> Drift compounds. Catching it on Friday costs an hour. Catching it at QBR costs a quarter.</li>
  <li><strong>Decisions log.</strong> Write down what you tried, what happened, and what you'll change. Most teams rediscover the same insight three times.</li>
</ol>

<h3>What "Signal-Based" Actually Means</h3>
<p>The buzzword has been laundered into meaninglessness. In practice, signal-based GTM means three things: you know which accounts are <em>in-market right now</em>, you know <em>why</em>, and you can reach the right person with a <em>relevant</em> message within 48 hours of the signal firing.</p>
<p>If any of those three break, you're back to spray-and-pray with extra steps.</p>

<h2>Where Isla Fits</h2>
<p>The reason we built <a href="/">Isla</a> wasn't to add another tool to your stack — it was to collapse the gap between signal and action. Isla watches LinkedIn activity, job changes, content engagement, and product behavior, then routes the relevant moment to the right rep with a drafted message that's actually worth sending.</p>
<p>It's not magic. It's the same operating system above, automated end-to-end so your team spends time on conversations instead of CRM hygiene.</p>

<h2>The Bottom Line</h2>
<p>Execution isn't glamorous. There's no keynote talk titled "We Just Did The Thing We Said We'd Do, Every Week, For A Year." But that's the work. Strip your motion down to the few things that actually move pipeline, give each one an owner, and review honestly on a weekly cadence.</p>
<p>The teams that win in 2026 won't be the ones with the cleverest strategy. They'll be the ones who actually shipped theirs.</p>
`;

const SHORT_CONTENT = `
<p>This is a placeholder article used while the Notion integration is being connected. The real content will be pulled from the CMS once the database is populated.</p>

<h2>Why this matters</h2>
<p>Even short-form posts on the Isla blog follow the same structural rules: a clear thesis, two or three supporting points, and a takeaway the reader can apply this week.</p>

<blockquote>The point of writing is to change what someone does on Monday morning.</blockquote>

<h3>What you'll typically find here</h3>
<ul>
  <li>Tactical breakdowns of GTM motions that work in 2026</li>
  <li>Frameworks for turning LinkedIn activity into pipeline</li>
  <li>Case studies from teams using Isla in production</li>
</ul>

<figure><img src="${COVER}" alt="" loading="lazy" /></figure>

<h2>Coming soon</h2>
<p>Connect the Notion database to replace this placeholder with the full article. The layout, typography, and SEO metadata are already production-ready.</p>
`;

export function getMockPosts(): BlogPostSummary[] {
  return MOCK_SUMMARIES;
}

export function getMockPost(slug: string): BlogPost | null {
  const summary = MOCK_SUMMARIES.find((p) => p.slug === slug);
  if (!summary) return null;
  const contentHtml =
    slug === "why-b2b-teams-fail-gtm-execution" ? FEATURED_CONTENT : SHORT_CONTENT;
  return { ...summary, contentHtml };
}
