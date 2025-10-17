import { Link, useParams } from "react-router-dom";
import { blogPosts } from "../Data/BlogData";

const BlogDetailsPage = () => {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === id);
  const relatedPosts = blogPosts.filter((p) => p.id !== id).slice(0, 3);

  if (!post) return <p>Blog post not found.</p>;

  return (
    <div className="blog-details">
      <header
        className="blog-hero"
        style={{ backgroundImage: `url(${post.image})` }}
      >
        <div className="overlay">
          <h1>{post.title}</h1>
          <p className="date">{new Date(post.date).toDateString()}</p>
        </div>
      </header>

      <main className="content-wrapper">
        <article className="main-post">
          <p className="excerpt">{post.excerpt}</p>
          <div className="content">
            {post.content.split("\n").map((para, idx) => (
              <p key={idx}>{para.trim()}</p>
            ))}
          </div>
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
                <img src={related.image} alt={related.title} />
                <div className="related-info">
                  <h3>{related.title}</h3>
                  <p>{related.excerpt.slice(0, 60)}...</p>
                  <span>{new Date(related.date).toDateString()}</span>
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
