import notFound from "../assets/notFound.png";

function SearchNotFound() {
  return (
    <div className="search-not-found">
      <img src={notFound} alt="result not found" />
      <h1>No Property found</h1>
      <p>
        We couldn't find any properties that match your search criteria in this
        area. filters. <br /> Please try a different location....
      </p>
    </div>
  );
}

export default SearchNotFound;
