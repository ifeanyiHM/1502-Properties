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
      <h2>Find your next home!</h2>
      <h2>
        With over 200 properties available for{" "}
        <span>sale, rent, and short-term lease,</span> finding your perfect home
        has never been easier. Start your search today!
      </h2>

      <div className="ticker-wrapper">
        <div className="ticker-text">{slides[curIndex]}</div>
      </div>
    </div>
  );
}

export default SearchProperties;
