import { Link } from "react-router-dom";
import { blogPosts } from "../../Data/BlogData";

import { FaRegCalendarAlt } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

const getRandomArticles = (count: number) => {
  const shuffled = [...blogPosts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const FeaturedArticles = () => {
  const featured = getRandomArticles(2);

  return (
    <section className="featured-articles">
      <h2 className="section-title">Featured Blogs</h2>
      <p className="section-subtitle">
        Fresh insights and stories from our writers — handpicked for you.
      </p>
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
                  <FaRegCalendarAlt size={16} />
                  {new Date(post.date).toDateString()}
                </p>
                <h3 className="article-title">{post.title}</h3>
                <p className="article-excerpt">
                  {post.excerpt}{" "}
                  <span>
                    Read article <FaArrowRightLong />
                  </span>
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="featured-articles__cta">
        <Link to="/blogs" className="featured-articles__button">
          View All Articles
          <FaArrowRightLong size={20} />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedArticles;
