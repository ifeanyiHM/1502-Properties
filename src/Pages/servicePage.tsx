import { Link, useNavigate } from "react-router-dom";
import { propertySummaryProps } from "../Data/propertyData";
import PageHeader from "./PageHeader";
import SearchNotFound from "../Utilities/SearchNotFound";
import { AppActionProps } from "../App";
import { Dispatch } from "react";

interface ServicePageProps {
  query: string;
  dispatch: Dispatch<AppActionProps>;
  propertyType: string;
  setSummaryDetails: (details: propertySummaryProps) => void;
  searchedLocations: propertySummaryProps[];
}

function ServicePage({
  query,
  dispatch,
  propertyType,
  setSummaryDetails,
  searchedLocations,
}: ServicePageProps) {
  const navigate = useNavigate();

  function handleClick(details: propertySummaryProps) {
    setSummaryDetails(details);
    navigate("/expandPropertyDetails");
  }

  function capitalizeTitle(title: string): string {
    return title.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  return (
    <div className="service-page">
      <PageHeader>
        <h1>
          {capitalizeTitle(propertyType)}{" "}
          {propertyType !== "buy" && propertyType !== "rent"
            ? ""
            : "Properties"}
        </h1>

        <input
          type="text"
          placeholder="search properties by area"
          value={query}
          onChange={(e) =>
            dispatch({ type: "searchProperties", payload: e.target.value })
          }
        />
        <span>
          <Link to="/">Home</Link> / {capitalizeTitle(propertyType)}{" "}
          {propertyType !== "buy" && propertyType !== "rent"
            ? ""
            : "Properties"}
        </span>
      </PageHeader>

      <div className="input">
        <input
          type="text"
          placeholder="search properties by area"
          value={query}
          onChange={(e) =>
            dispatch({ type: "searchProperties", payload: e.target.value })
          }
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
              <p>{capitalizeTitle(sum.location)}</p>
            </div>
          ))}
        </div>
      ) : (
        <SearchNotFound />
      )}
    </div>
  );
}

export default ServicePage;
