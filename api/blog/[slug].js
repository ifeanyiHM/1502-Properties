import { readFile } from "node:fs/promises";
import path from "node:path";
import { renderBlogHtml } from "../../server/blogMetadata.js";

export default async function handler(req, res) {
  try {
    const slug = req.query.slug;

    if (typeof slug !== "string" || !slug) {
      return res.status(400).send("Invalid blog URL");
    }

    const template = await readFile(
      path.join(process.cwd(), "dist", "index.html"),
      "utf8",
    );

    const html = await renderBlogHtml(slug, template);

    if (!html) {
      return res.status(404).send("Blog not found");
    }

    res.setHeader(
      "Cache-Control",
      "public, max-age=60, s-maxage=300, stale-while-revalidate=600",
    );

    return res.status(200).type("html").send(html);
  } catch (error) {
    console.error("Blog metadata error:", error);
    return res.status(500).send("Unable to load blog");
  }
}
