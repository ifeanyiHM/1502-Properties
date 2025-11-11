import { BlogProps } from "./BlogData";

export interface BlogContextProps {
  loadingBlogs: boolean;
  fetchBlogs: () => void;
  AllBlogs: BlogProps[];
}

export const defaultBlogProps: BlogContextProps = {
  loadingBlogs: false,
  fetchBlogs: () => {},
  AllBlogs: [],
};
