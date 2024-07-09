import { IoIosHome } from "react-icons/io";
// import PageHeader from "./PageHeader";
// import { Link } from "react-router-dom";

function Properties() {
  return (
    <div className="properties">
      {/* <PageHeader>
        <h1>UK Properties</h1>
        <span>
          <Link to="/">Home</Link> / UK Properties
        </span>
      </PageHeader> */}

      <div className="container">
        <span>
          <IoIosHome />
        </span>
        <h1>UK Properties Coming Soon...</h1>
      </div>
    </div>
  );
}

export default Properties;
