import { Link } from "react-router-dom";
import useProperty from "../../context/useProperty";

function NewHeader() {
  const { propertyType } = useProperty();
  return (
    <header className="new-header">
      <div className="new-header__overlay">
        <div className="new-header__content">
          <h1>Unrivaled Estates for the Discerning Investor</h1>
          <p>Discover Nigeria’s Most Exclusive Properties</p>
          <Link to={`service/${propertyType}`}>Explore Our Portfolio</Link>
        </div>
      </div>
    </header>
  );
}

export default NewHeader;
