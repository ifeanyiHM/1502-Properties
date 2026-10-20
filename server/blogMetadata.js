import { createClient } from "@supabase/supabase-js";
import slugify from "slugify";

const SITE_URL = "https://1502properties.com";

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[char];
  });
}

function getDescription(content, fallback) {
  const firstParagraph = content?.match(/<p\b[^>]*>([\s\S]*?)<\/p>/i)?.[1];

  return (firstParagraph || content || fallback)
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 200);
}

export async function renderBlogHtml(slug, template) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables");
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  // Match the title-based URLs used by the existing React Router.
  const { data: blogs, error } = await supabase
    .from("blogs")
    .select("title, content, images, created_at");

  if (error) {
    throw new Error(`Could not fetch blogs: ${error.message}`);
  }

  const post = blogs?.find(
    (blog) =>
      slugify(blog.title, { lower: true, strict: true }) === slug.toLowerCase(),
  );

  if (!post) return null;

  const postSlug = slugify(post.title, {
    lower: true,
    strict: true,
  });

  const title = `${post.title} | 1502 Properties`;
  const description = getDescription(post.content, post.title);

  const firstImage = Array.isArray(post.images) ? post.images[0] : null;

  const image = firstImage
    ? new URL(firstImage, `${SITE_URL}/`).href
    : `${SITE_URL}/openg.png`;

  const canonicalUrl = `${SITE_URL}/blog/${postSlug}`;

  // Remove the generic metadata from index.html so there are no
  // competing homepage and article Open Graph tags.
  let html = template
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, "")
    .replace(/<meta\b[^>]*>/gi, (tag) => {
      const isSocialMetadata =
        /\b(?:name|property)\s*=\s*["'](?:description|og:[^"']+|twitter:[^"']+)["']/i.test(
          tag,
        );

      return isSocialMetadata ? "" : tag;
    })
    .replace(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi, "");

  const metadata = `
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />

    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="1502 Properties" />
    <meta property="og:title" content="${escapeHtml(post.title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta property="og:image:alt" content="${escapeHtml(post.title)}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(post.title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />
    <meta name="twitter:creator" content="@ifeanyimichaell" />
  `;

  return html.replace("</head>", `${metadata}\n</head>`);
}
