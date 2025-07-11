import { useEffect, useState } from "react";

const slides = [
  "large expanse of land",
  "commercial property",
  "joint ventures",
  "mixed development",
  "residential units",
];

function SearchProperties() {
  const [curIndex, setCurIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="search-properties">
      <h2>
        Discover premium homes,{" "}
        <span>commercial spaces and joint ventures opportunities</span> -
        curated for ambitious lifestyles and smart investments. Your next bold
        move starts here.
      </h2>

      <div className="ticker-wrapper">
        <div className="ticker-text">{slides[curIndex]}</div>
        <p className="slogan">
          1502 Properties — Built on Trust, Designed for Generations
        </p>
      </div>
    </div>
  );
}

export default SearchProperties;
