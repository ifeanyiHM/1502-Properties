import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import slugify from "slugify";
import useBlog from "../context/useBlog";
import BlogNotFound from "../ui/BlogNotFound";
import { Spinner } from "../Utilities/Spinner";

const SITE_URL = "https://1502properties.com";

const BlogDetailsPage = () => {
  const { allBlogs, getBlogFirstParagraph, loadingBlogs } = useBlog();
  const { title } = useParams();

  const post = allBlogs?.find(
    (p) => slugify(p.title, { lower: true, strict: true }) === title,
  );

  const relatedPosts = allBlogs
    ?.filter((p) => slugify(p.title, { lower: true, strict: true }) !== title)
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, 10)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  useEffect(() => {
    const aside = document.querySelector("aside");
    if (!aside) return;

    const updateStickyTop = () => {
      const asideHeight = aside.offsetHeight;
      const viewportHeight = window.innerHeight;

      aside.style.top = `${-(asideHeight - viewportHeight)}px`;
    };

    updateStickyTop();
    window.addEventListener("resize", updateStickyTop);

    return () => window.removeEventListener("resize", updateStickyTop);
  }, []);

  if (loadingBlogs) return <Spinner />;

  if (!post) {
    return <BlogNotFound />;
  }

  // Create a clean description from the blog content.
  const rawDescription = getBlogFirstParagraph(post.content)?.[0] || post.title;

  const description = rawDescription
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 200);

  // Open Graph images must use absolute, publicly accessible URLs.
  const image = post.images?.[0]
    ? new URL(post.images[0], `${SITE_URL}/`).href
    : `${SITE_URL}/openg.png`;

  const postSlug = slugify(post.title, {
    lower: true,
    strict: true,
  });

  const canonicalUrl = `${SITE_URL}/blog/${postSlug}`;

  return (
    <>
      <Helmet>
        {/* Standard SEO metadata */}
        <title>{post.title} | 1502 Properties</title>

        <meta name="description" content={description} />

        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph metadata */}
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="1502 Properties" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={image} />
        <meta property="og:image:alt" content={post.title} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />

        {/* Article metadata */}
        <meta
          property="article:published_time"
          content={new Date(post.created_at).toISOString()}
        />

        {/* Twitter / X card metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:image:alt" content={post.title} />
        <meta name="twitter:creator" content="@ifeanyimichaell" />
      </Helmet>

      <div className="blog-details">
        <header
          className="blog-hero"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="overlay">
            <h1>{post.title}</h1>
            <p className="date">{new Date(post.created_at).toDateString()}</p>
          </div>
        </header>

        <main className="content-wrapper">
          <article className="main-post">
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          <aside className="related-posts">
            <h2>Related Articles</h2>

            <div className="related-list">
              {relatedPosts.map((related) => (
                <Link
                  to={`/blog/${slugify(related.title, {
                    lower: true,
                    strict: true,
                  })}`}
                  key={related.id}
                  className="related-item"
                >
                  <img src={related.images?.[0]} alt={related.title} />

                  <div className="related-info">
                    <h3>{related.title.slice(0, 40)}...</h3>

                    <p>
                      {getBlogFirstParagraph(related.content)[0].slice(0, 75)}
                      ...
                    </p>

                    <span>{new Date(related.created_at).toDateString()}</span>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </main>
      </div>
    </>
  );
};

export default BlogDetailsPage;
