import { Link } from "react-router-dom";

import { FaRegCalendarAlt } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import useBlog from "../../context/useBlog";

const FeaturedArticles = () => {
  const { allBlogs, getBlogFirstParagraph } = useBlog();

  const getRandomArticles = (count: number) => {
    const shuffled = [...allBlogs].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

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
                src={post.images[0]}
                alt={post.title}
                className="article-image"
              />
              <div className="article-content">
                <p className="article-date">
                  <FaRegCalendarAlt size={16} />
                  {new Date(post.created_at).toDateString()}
                </p>
                <h3 className="article-title">{post.title}</h3>
                <p className="article-excerpt">
                  {getBlogFirstParagraph(post.content)[0]?.slice(0, 110)}...{" "}
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
