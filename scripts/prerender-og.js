// Runs after `vite build`. Writes a copy of dist/index.html for every blog and
// property with its own <title>, description, canonical and Open Graph /
// Twitter tags. Social crawlers (WhatsApp, Facebook, LinkedIn, X) never run
// JavaScript, so they can only see tags that are already in the HTML file.
// The React app still boots normally on these files and Helmet keeps working.
import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import slugify from "slugify";

const SITE_URL = (process.env.SITE_URL || "https://1502properties.com").replace(
  /\/$/,
  "",
);
const SUPABASE_URL =
  process.env.SUPABASE_URL || "https://hgvmdoevulnsfenaynow.supabase.co";
const SUPABASE_KEY = process.env.VITE_SUPABASE_KEY;
const DEFAULT_IMAGE = `${SITE_URL}/openg.png`;
const DIST = path.resolve("dist");

const esc = (v) =>
  String(v)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const clean = (html) =>
  String(html ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

function absoluteImage(src) {
  if (!src || /\.(mp4|webm|ogg)(\?.*)?$/i.test(src)) return DEFAULT_IMAGE;
  try {
    return new URL(src, `${SITE_URL}/`).href;
  } catch {
    return DEFAULT_IMAGE;
  }
}

async function fetchRows(table, columns) {
  if (!SUPABASE_KEY) {
    console.warn(`prerender-og: VITE_SUPABASE_KEY not set, skipping ${table}.`);
    return [];
  }
  const url = new URL(`${SUPABASE_URL}/rest/v1/${table}`);
  url.searchParams.set("select", columns);
  const res = await fetch(url, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  });
  if (!res.ok) {
    console.warn(`prerender-og: could not fetch ${table} (${res.status}).`);
    return [];
  }
  const rows = await res.json();
  return Array.isArray(rows) ? rows : [];
}

function buildHead(template, m) {
  // Remove the generic tags from index.html so crawlers don't see duplicates.
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<link\s+rel="canonical"[^>]*>/gi, "")
    .replace(/<meta\s+name="description"[\s\S]*?\/>/gi, "")
    .replace(/<meta\s+property="og:(?!site_name|locale)[\s\S]*?\/>/gi, "")
    .replace(
      /<meta\s+name="twitter:(?:title|description|image|site|card)"[\s\S]*?\/>/gi,
      "",
    );

  const tags = `
    <title>${esc(m.title)}</title>
    <meta name="description" content="${esc(m.description)}" />
    <link rel="canonical" href="${esc(m.url)}" />
    <meta property="og:type" content="${m.type}" />
    <meta property="og:title" content="${esc(m.title)}" />
    <meta property="og:description" content="${esc(m.description)}" />
    <meta property="og:url" content="${esc(m.url)}" />
    <meta property="og:image" content="${esc(m.image)}" />
    <meta property="og:image:alt" content="${esc(m.title)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(m.title)}" />
    <meta name="twitter:description" content="${esc(m.description)}" />
    <meta name="twitter:image" content="${esc(m.image)}" />
  `;
  return html.replace("</head>", `${tags}</head>`);
}

async function writePage(dir, slug, html) {
  // Keep the slug as a single, safe path segment.
  if (!slug || /[\\/]|\.\./.test(slug) || /[<>:"|?*]/.test(slug)) return false;
  const target = path.join(DIST, dir, slug);
  await fs.mkdir(target, { recursive: true });
  await fs.writeFile(path.join(target, "index.html"), html, "utf8");
  return true;
}

const template = await fs.readFile(path.join(DIST, "index.html"), "utf8");

const [blogs, properties] = await Promise.all([
  fetchRows("blogs", "title,content,images,created_at"),
  fetchRows("properties", "title,src,price,location,created_at"),
]);

let blogCount = 0;
for (const b of blogs) {
  if (!b.title) continue;
  const slug = slugify(b.title, { lower: true, strict: true });
  const paragraphs = [...String(b.content ?? "").matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((x) => clean(x[1]))
    .filter(Boolean);
  const description = (paragraphs[0] || b.title).slice(0, 200);
  const html = buildHead(template, {
    title: `${b.title} | 1502 Properties`,
    description,
    url: `${SITE_URL}/blog/${slug}`,
    image: absoluteImage(b.images?.[0]),
    type: "article",
  });
  if (await writePage("blog", slug, html)) blogCount++;
}

let propCount = 0;
for (const p of properties) {
  if (!p.title) continue;
  // Must match the app's route: navigate(`/expandPropertyDetails/${slugify(title)}`)
  const slug = slugify(p.title);
  const price = p.price
    ? p.price.startsWith("₦") || p.price.startsWith("Contact")
      ? p.price
      : `₦ ${p.price}`
    : "";
  const description = [price, p.location].filter(Boolean).join(" | ");
  const html = buildHead(template, {
    title: `${p.title} | 1502 Properties`,
    description: description || p.title,
    url: `${SITE_URL}/expandPropertyDetails/${slug}`,
    image: absoluteImage(p.src?.[0]),
    type: "website",
  });
  if (await writePage("expandPropertyDetails", slug, html)) propCount++;
}

console.log(`prerender-og: wrote ${blogCount} blog and ${propCount} property pages.`);
