import { Link } from "react-router-dom";
import { BlogPost } from "../Data/BlogData";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <div className="blog-card">
      <img src={post.image} alt={post.title} />
      <div className="card-content">
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <Link to={`/blog/${post.id}`}>Read more</Link>
      </div>
    </div>
  );
};

export default BlogCard;
