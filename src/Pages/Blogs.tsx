import { blogPosts } from "../Data/BlogData";
import BlogCard from "../ui/BlogCard";

const Blogs = () => {
  return (
    <section className="blogs-section">
      <div className="container">
        <div className="blogs-header">
          <h1>Insights & Stories</h1>
          <p>
            Stay updated with our latest news, tips, and trends in real estate
            and design.
          </p>
        </div>

        <div className="blog-grid">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
