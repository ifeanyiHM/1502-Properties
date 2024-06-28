import { PiMaskSadLight } from "react-icons/pi";

function SearchNotFound() {
  return (
    <div className="search-not-found">
      <PiMaskSadLight className="icon" />
      <h1>No Property found</h1>
      <p>
        We couldn't find any properties that match your search criteria. <br />{" "}
        Please try a different location....
      </p>
    </div>
  );
}

export default SearchNotFound;
