import { useState } from "react";

export default function BlurImage({
  src,
  alt,
  title,
  loading,
}: {
  src: string;
  alt: string;
  title: string;
  loading: "eager" | "lazy" | undefined;
}) {
  const [loaded, setLoaded] = useState(false);

  const style: React.CSSProperties = {
    transition: "all 0.7s ease-in-out",
    filter: loaded ? "blur(0px)" : "blur(8px)",
    transform: loaded ? "scale(1)" : "scale(1.05)",
    // borderRadius: "8px",
    objectFit: "cover",
  };

  return (
    <img
      src={src}
      alt={alt}
      title={title}
      loading={loading}
      width="auto"
      height="auto"
      style={style}
      onLoad={() => setLoaded(true)}
    />
  );
}
