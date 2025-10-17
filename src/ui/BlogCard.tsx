import { Link } from "react-router-dom";
import { BlogPost } from "../Data/BlogData";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <article className="blog-card">
      <div className="image-wrapper">
        <img src={post.image} alt={post.title} />
      </div>

      <div className="card-body">
        <h3 className="blog-title">{post.title}</h3>
        <p className="blog-excerpt">{post.excerpt}</p>

        <div className="blog-footer">
          <Link to={`/blog/${post.id}`} className="read-more">
            Read More →
          </Link>
          <span className="blog-date">{post.date}</span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
