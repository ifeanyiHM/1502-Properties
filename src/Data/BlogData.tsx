export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
}

export interface BlogProps {
  id: string;
  title: string;
  content: string;
  images: string[];
  created_at: string;
}
