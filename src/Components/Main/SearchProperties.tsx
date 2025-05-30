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
        With over 1,000 properties available for{" "}
        <span>sale, rent, and short-term lease,</span> finding your perfect home
        has never been easier. Start your search today!
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
            className={propertyType === "off-plan" ? "active" : ""}
            onClick={() => setPropertyType("off-plan")}
          >
            Off Plan
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
