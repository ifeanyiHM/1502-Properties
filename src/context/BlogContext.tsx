import { createContext, ReactNode, useEffect, useState } from "react";
import { BlogProps } from "../Data/BlogData";
import { getBlogs } from "../services/apiBlogs";

interface BlogContextProps {
  loadingBlogs: boolean;
  fetchBlogs: () => void;
  allBlogs: BlogProps[];
  getBlogFirstParagraph: (content: string) => string[];
}

const defaultBlogProps: BlogContextProps = {
  loadingBlogs: false,
  fetchBlogs: () => {},
  allBlogs: [],
  getBlogFirstParagraph: () => [],
};

interface BlogProviderProps {
  children: ReactNode;
}

const BlogContext = createContext<BlogContextProps>(defaultBlogProps);

function BlogProvider({ children }: BlogProviderProps) {
  //STATE
  const [allBlogs, setAllBlogs] = useState<BlogProps[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState<boolean>(false);

  const fetchBlogs = async () => {
    setLoadingBlogs(true);
    try {
      const data = await getBlogs();
      setAllBlogs(data);
    } catch (error) {
      console.error("Error fetching Blogs:", error);
    } finally {
      setLoadingBlogs(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  console.log(allBlogs);

  function getBlogFirstParagraph(content: string): string[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    const paragraphs = Array.from(doc.querySelectorAll("p"))
      .map((el) => el.textContent?.trim() || "")
      .filter((text) => text.length > 0); // skip empty

    return paragraphs;
  }

  // Parse the HTML content to extract H1
  const parser = new DOMParser();
  const doc = parser.parseFromString(allBlogs[1]?.content, "text/html");
  const h1Text = doc.querySelector("h1")?.textContent?.trim() || "";
  console.log(h1Text);

  return (
    <BlogContext.Provider
      value={{
        loadingBlogs,
        fetchBlogs,
        allBlogs,
        getBlogFirstParagraph,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export { BlogContext, BlogProvider };
