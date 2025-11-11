import { Link, useParams } from "react-router-dom";
import useBlog from "../context/useBlog";
import { Spinner } from "../Utilities/Spinner";
import { useEffect } from "react";

const BlogDetailsPage = () => {
  const { allBlogs, getBlogFirstParagraph, loadingBlogs } = useBlog();

  const { id } = useParams();
  const post = allBlogs?.find((p) => String(p?.id) === id);
  const relatedPosts = allBlogs
    ?.filter((p) => String(p?.id) !== id)
    .slice(0, 4);

  // Dynamically sets the aside's sticky top position so that when it sticks,
  // its bottom aligns with the bottom of the viewport. This allows the aside
  // to scroll naturally with the page until its last content is visible, then
  // stops scrolling while the main content continues.
  useEffect(() => {
    const aside = document.querySelector("aside");
    if (!aside) return;

    const updateStickyTop = () => {
      const asideHeight = aside.offsetHeight;
      const viewportHeight = window.innerHeight;
      const topValue = -(asideHeight - viewportHeight);

      aside.style.top = `${topValue}px`;
    };

    updateStickyTop();

    window.addEventListener("resize", updateStickyTop);

    return () => window.removeEventListener("resize", updateStickyTop);
  }, []);

  if (loadingBlogs) return <Spinner />;

  if (!post) return <p>Blog post not found.</p>;

  return (
    <div className="blog-details">
      <header
        className="blog-hero"
        style={{ backgroundImage: `url(${post.images[0]})` }}
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
                to={`/blog/${related.id}`}
                key={related.id}
                className="related-item"
              >
                <img src={related.images[0]} alt={related.title} />
                <div className="related-info">
                  <h3>{related.title.slice(0, 40)}...</h3>
                  <p>
                    {getBlogFirstParagraph(related.content)[0].slice(0, 75)}...
                  </p>
                  <span>{new Date(related.created_at).toDateString()}</span>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default BlogDetailsPage;
