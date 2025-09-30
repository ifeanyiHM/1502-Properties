import { IoIosHome } from "react-icons/io";

function SearchNotFound() {
  return (
    <div className="search-not-found">
      <IoIosHome className="icon" />
      <h1>No Property found</h1>
      <p>
        We couldn't find any properties that match your search criteria. <br />{" "}
        Please try a different location....
      </p>
    </div>
  );
}

export default SearchNotFound;
