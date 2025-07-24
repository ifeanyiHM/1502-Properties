import { Link } from "react-router-dom";
import { blogPosts } from "../../Data/BlogData";

const getRandomArticles = (count: number) => {
  const shuffled = [...blogPosts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const FeaturedArticles = () => {
  const featured = getRandomArticles(2);

  return (
    <section className="featured-articles">
      <h2 className="section-title">Featured Blogs</h2>
      <div className="article-grid">
        {featured.map((post) => (
          <div key={post.id} className="article-card">
            <Link to={`/blog/${post.id}`}>
              <img
                src={post.image}
                alt={post.title}
                className="article-image"
              />
              <div className="article-content">
                <p className="article-date">
                  {new Date(post.date).toDateString()}
                </p>
                <h3 className="article-title">{post.title}</h3>
                <p className="article-excerpt">{post.excerpt}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedArticles;
