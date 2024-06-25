import { Link, useNavigate } from "react-router-dom";
import { propertySummaryProps } from "../../App";
import PageHeader from "../PageHeader";
import SearchNotFound from "../../Utilities/SearchNotFound";

interface ShortletProps {
  query: string;
  setQuery: (type: string) => void;
  setSummaryDetails: (details: propertySummaryProps) => void;
  searchedLocations: propertySummaryProps[];
}

function Shortlet({
  query,
  setQuery,
  setSummaryDetails,
  searchedLocations,
}: ShortletProps) {
  const navigate = useNavigate();

  function handleClick(details: propertySummaryProps) {
    setSummaryDetails(details);
    navigate("/expandPropertyDetails");
  }

  return (
    <div className="shortlet">
      <PageHeader>
        <h1>Short Let</h1>

        <input
          type="text"
          placeholder="search properties by area"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span>
          <Link to="/">Home</Link> / Buy properties
        </span>
      </PageHeader>

      <div className="input">
        <input
          type="text"
          placeholder="search properties by area"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {searchedLocations.length > 0 ? (
        <div className="content">
          {searchedLocations.map((sum, index) => (
            <div className="ft" key={index} onClick={() => handleClick(sum)}>
              <img src={sum.src[0]} alt="first featured apartment" />
              <div className="line"></div>
              <p>{sum.title.toUpperCase()}</p>
              <h3>{sum.price}</h3>
              <p>{sum.location}</p>
            </div>
          ))}
        </div>
      ) : (
        <SearchNotFound />
      )}
    </div>
  );
}

export default Shortlet;
