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

const staticPaths = [
  "/",
  "/ourservices",
  "/contact",
  "/blogs",
  "/ukproperties",
  "/careers",
  "/termsandconditions",
  "/privacy-policy",
];

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function makeUrlEntry(url, lastmod) {
  return `  <url>\n    <loc>${escapeXml(url)}</loc>${lastmod ? `\n    <lastmod>${new Date(lastmod).toISOString().slice(0, 10)}</lastmod>` : ""}\n  </url>`;
}

async function fetchPublicRows(table, columns) {
  if (!SUPABASE_KEY) {
    console.warn(
      `Skipping dynamic ${table} URLs: VITE_SUPABASE_KEY is not set.`,
    );
    return [];
  }

  const endpoint = new URL(`${SUPABASE_URL}/rest/v1/${table}`);
  endpoint.searchParams.set("select", columns);

  const response = await fetch(endpoint, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });

  if (!response.ok) {
    console.warn(`Could not fetch ${table} for sitemap (${response.status}).`);
    return [];
  }

  const rows = await response.json();
  return Array.isArray(rows) ? rows : [];
}

const urls = new Map();

for (const route of staticPaths) {
  urls.set(`${SITE_URL}${route}`, null);
}

// Include currently defined career-detail routes from the project's data file.
try {
  const careersSource = await fs.readFile("src/Data/careers.data.ts", "utf8");
  const careerSlugs = [
    ...careersSource.matchAll(/slug:\s*["']([^"']+)["']/g),
  ].map((match) => match[1]);
  for (const slug of careerSlugs) {
    urls.set(`${SITE_URL}/careers/${encodeURIComponent(slug)}`, null);
  }
} catch {
  console.warn("Could not read career data; skipping career-detail URLs.");
}

const [properties, blogs] = await Promise.all([
  fetchPublicRows("properties", "title,created_at"),
  fetchPublicRows("blogs", "title,created_at"),
]);

for (const property of properties) {
  if (!property.title) continue;
  // Matches the existing app's slugify(property.title) route format.
  const slug = slugify(property.title);
  if (!slug) continue;
  urls.set(
    `${SITE_URL}/expandPropertyDetails/${encodeURIComponent(slug)}`,
    property.created_at || null,
  );
}

for (const blog of blogs) {
  if (blog.title === undefined || blog.title === null) continue;
  urls.set(
    `${SITE_URL}/blog/${encodeURIComponent(slugify(blog.title))}`,
    blog.created_at || null,
  );
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[
  ...urls.entries(),
]
  .map(([url, lastmod]) => makeUrlEntry(url, lastmod))
  .join("\n")}\n</urlset>\n`;

const outputPath = path.resolve("dist/sitemap.xml");
await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, xml, "utf8");
console.log(`Generated ${outputPath} with ${urls.size} URLs.`);
