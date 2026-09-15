// Notion API helpers (server-only). Uses an internal integration token.

const NOTION_API = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

function getEnv() {
  const token = process.env.NOTION_TOKEN || process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!token) throw new Error("NOTION_TOKEN/NOTION_API_KEY is not configured");
  if (!databaseId) throw new Error("NOTION_DATABASE_ID is not configured");
  return { token, databaseId };
}

async function notionFetch(path: string, init: RequestInit = {}) {
  const { token } = getEnv();
  const res = await fetch(`${NOTION_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Notion API ${res.status}: ${body}`);
  }
  return res.json();
}

function plainText(rich: any[] | undefined): string {
  if (!Array.isArray(rich)) return "";
  return rich.map((r) => r?.plain_text ?? "").join("");
}

function richTextToHtml(rich: any[] | undefined): string {
  if (!Array.isArray(rich)) return "";
  return rich
    .map((r) => {
      let text = escapeHtml(r?.plain_text ?? "");
      const a = r?.annotations ?? {};
      if (a.code) text = `<code>${text}</code>`;
      if (a.bold) text = `<strong>${text}</strong>`;
      if (a.italic) text = `<em>${text}</em>`;
      if (a.strikethrough) text = `<s>${text}</s>`;
      if (a.underline) text = `<u>${text}</u>`;
      if (r?.href) text = `<a href="${escapeAttr(r.href)}" target="_blank" rel="noopener noreferrer">${text}</a>`;
      return text;
    })
    .join("");
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );
}
function escapeAttr(s: string) {
  return escapeHtml(s);
}

export interface BlogPostSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string | null;
  author: string;
  category: string;
  cover: string | null;
}

export interface BlogPost extends BlogPostSummary {
  contentHtml: string;
}

function readProps(page: any): BlogPostSummary {
  const p = page.properties ?? {};
  const title = plainText(p.Name?.title) || "Untitled";
  const slug =
    plainText(p.Slug?.rich_text)?.trim() ||
    slugify(title) ||
    page.id.replace(/-/g, "");
  const excerpt = plainText(p.Resumo?.rich_text);
  const date = p.Data?.date?.start ?? null;
  const author =
    p.Autor?.select?.name ??
    p.Autor?.multi_select?.[0]?.name ??
    p.Autor?.people?.[0]?.name ??
    plainText(p.Autor?.rich_text) ??
    "";
  const category = p.Categoria?.select?.name ?? "";
  const capaFile = p.Capa?.files?.[0];
  const coverFromProp =
    capaFile?.file?.url ?? capaFile?.external?.url ?? p.Capa?.url ?? null;
  const coverFromPage =
    page.cover?.external?.url ?? page.cover?.file?.url ?? null;
  return {
    id: page.id,
    slug,
    title,
    excerpt,
    date,
    author,
    category,
    cover: coverFromProp || coverFromPage,
  };
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function listPublishedPosts(): Promise<BlogPostSummary[]> {
  const { databaseId } = getEnv();
  const results: any[] = [];
  let cursor: string | undefined;
  do {
    const body: Record<string, unknown> = {
      filter: { property: "Status", select: { equals: "Publicado" } },
      sorts: [{ property: "Data", direction: "descending" }],
      page_size: 100,
    };
    if (cursor) body.start_cursor = cursor;
    const data = await notionFetch(`/databases/${databaseId}/query`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    results.push(...(data.results ?? []));
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);
  return results.map(readProps);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { databaseId } = getEnv();
  const data = await notionFetch(`/databases/${databaseId}/query`, {
    method: "POST",
    body: JSON.stringify({
      filter: {
        and: [
          { property: "Status", select: { equals: "Publicado" } },
          { property: "Slug", rich_text: { equals: slug } },
        ],
      },
      page_size: 1,
    }),
  });
  const page = data.results?.[0];
  if (!page) return null;
  const summary = readProps(page);
  const contentHtml = await fetchPageHtml(page.id);
  return { ...summary, contentHtml };
}

async function fetchBlockChildren(blockId: string): Promise<any[]> {
  const all: any[] = [];
  let cursor: string | undefined;
  do {
    const qs = new URLSearchParams({ page_size: "100" });
    if (cursor) qs.set("start_cursor", cursor);
    const data = await notionFetch(`/blocks/${blockId}/children?${qs}`);
    all.push(...(data.results ?? []));
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);
  return all;
}

async function fetchPageHtml(pageId: string): Promise<string> {
  const blocks = await fetchBlockChildren(pageId);
  return blocksToHtml(blocks);
}

async function blocksToHtml(blocks: any[]): Promise<string> {
  const out: string[] = [];
  let listBuffer: { type: "ul" | "ol"; items: string[] } | null = null;
  const flushList = () => {
    if (listBuffer) {
      out.push(
        `<${listBuffer.type}>${listBuffer.items.map((i) => `<li>${i}</li>`).join("")}</${listBuffer.type}>`,
      );
      listBuffer = null;
    }
  };

  for (const block of blocks) {
    const t = block.type;
    if (t === "bulleted_list_item" || t === "numbered_list_item") {
      const wanted = t === "bulleted_list_item" ? "ul" : "ol";
      if (!listBuffer || listBuffer.type !== wanted) {
        flushList();
        listBuffer = { type: wanted, items: [] };
      }
      listBuffer.items.push(richTextToHtml(block[t].rich_text));
      continue;
    }
    flushList();

    switch (t) {
      case "paragraph": {
        const html = richTextToHtml(block.paragraph.rich_text);
        if (html.trim()) out.push(`<p>${html}</p>`);
        break;
      }
      case "heading_1":
        out.push(`<h2>${richTextToHtml(block.heading_1.rich_text)}</h2>`);
        break;
      case "heading_2":
        out.push(`<h3>${richTextToHtml(block.heading_2.rich_text)}</h3>`);
        break;
      case "heading_3":
        out.push(`<h4>${richTextToHtml(block.heading_3.rich_text)}</h4>`);
        break;
      case "quote":
        out.push(`<blockquote>${richTextToHtml(block.quote.rich_text)}</blockquote>`);
        break;
      case "code": {
        const lang = block.code.language ?? "";
        out.push(
          `<pre><code class="language-${escapeAttr(lang)}">${escapeHtml(plainText(block.code.rich_text))}</code></pre>`,
        );
        break;
      }
      case "divider":
        out.push("<hr />");
        break;
      case "image": {
        const url =
          block.image?.external?.url ?? block.image?.file?.url ?? "";
        const caption = plainText(block.image.caption);
        if (url) {
          out.push(
            `<figure><img src="${escapeAttr(url)}" alt="${escapeAttr(caption)}" loading="lazy" />${
              caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : ""
            }</figure>`,
          );
        }
        break;
      }
      case "callout": {
        out.push(
          `<aside class="callout">${richTextToHtml(block.callout.rich_text)}</aside>`,
        );
        break;
      }
      default:
        // ignore unsupported blocks silently
        break;
    }
  }
  flushList();
  return out.join("\n");
}
