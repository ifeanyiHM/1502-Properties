import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import useProperty from "../../context/useProperty";

function SearchProperties() {
  const [formValid, setFormValid] = useState<boolean>(false);

  const { query, dispatch, propertyType, setPropertyType } = useProperty();

  const navigate = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!query) {
      setFormValid(true);
      return;
    }

    navigate(`service/${propertyType}`);
  }

  return (
    <div className="search-properties">
      <h2>Find your next home!</h2>
      <h2>
        Discover premium homes,{" "}
        <span>commercial spaces and joint ventures opportunities</span> -
        curated for ambitious lifestyles and smart investments. Your next bold
        move starts here.
      </h2>
      <div className="search-content">
        <div className="target-btn">
          <button
            className={propertyType === "sale" ? "active" : ""}
            onClick={() => setPropertyType("sale")}
          >
            Sale
          </button>
          <button
            className={propertyType === "rent" ? "active" : ""}
            onClick={() => setPropertyType("rent")}
          >
            Rent
          </button>
          <button
            className={propertyType === "joint-ventures" ? "active" : ""}
            onClick={() => setPropertyType("joint-ventures")}
          >
            Joint Ventures
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input">
            <input
              className={formValid && !query ? "valid" : ""}
              type="text"
              placeholder="find property"
              value={query}
              onChange={(e) =>
                dispatch({ type: "searchProperties", payload: e.target.value })
              }
            />
            <p
              style={{ visibility: formValid && !query ? "visible" : "hidden" }}
            >
              please enter your desired location
            </p>
          </div>
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
}

export default SearchProperties;

// import { useEffect, useState } from "react";

// const slides = [
//   "large expanse of land",
//   "commercial property",
//   "joint ventures",
//   "mixed development",
//   "residential units",
// ];

// function SearchProperties() {
//   const [curIndex, setCurIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurIndex((prevIndex) => (prevIndex + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="search-properties">
//       <h2>
//         Discover premium homes,{" "}
//         <span>commercial spaces and joint ventures opportunities</span> -
//         curated for ambitious lifestyles and smart investments. Your next bold
//         move starts here.
//       </h2>

//       <div className="ticker-wrapper">
//         <div className="ticker-text">{slides[curIndex]}</div>
//         <p className="slogan">
//           1502 Properties — Built on Trust, Designed for Generations
//         </p>
//       </div>
//     </div>
//   );
// }

// export default SearchProperties;
