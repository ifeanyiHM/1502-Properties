// useWindowSize.ts
import { useEffect, useState } from "react";

export function useWindowWidth() {
  const [width, setWidth] = useState<number>(() =>
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return width;
}
