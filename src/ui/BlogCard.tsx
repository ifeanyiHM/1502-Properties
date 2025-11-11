import { Link } from "react-router-dom";
import { BlogProps } from "../Data/BlogData";
import useBlog from "../context/useBlog";

interface BlogCardProps {
  post: BlogProps;
  // getBlogFirstParagraph: (content: string) => string;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const { getBlogFirstParagraph } = useBlog();
  const paragraphs = getBlogFirstParagraph(post.content);

  return (
    <Link to={`/blog/${post.id}`}>
      <article className="blog-card">
        <div className="image-wrapper">
          <img src={post.images[0]} alt={post.title} />
        </div>

        <div className="card-body">
          <h3 className="blog-title">{post.title}</h3>
          <p className="blog-excerpt">{paragraphs[0]?.slice(0, 150)}...</p>

          <div className="blog-footer">
            <span className="read-more">Read More →</span>
            <span className="blog-date">
              {" "}
              {new Date(post.created_at).toDateString()}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
