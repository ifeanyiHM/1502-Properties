import { blogPosts } from "../Data/BlogData";
import BlogCard from "../ui/BlogCard";

const Blogs = () => {
  return (
    <div className="blog-list-page">
      <h1>Our Blog</h1>
      <div className="blog-grid">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
