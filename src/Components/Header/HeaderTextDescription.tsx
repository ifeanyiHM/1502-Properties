import { Link } from "react-router-dom";
import useProperty from "../../context/useProperty";

function HeaderTextDescription() {
  const { setSelectedType } = useProperty();
  return (
    <div className="header-text" aria-label="Header Description">
      <p>DISTRESS SALE OFFER</p>
      <h1>
        A 3 Stories <span> Commercial Property</span> at Apapa
      </h1>
      <Link
        to="service/buy"
        onClick={() => setSelectedType("cfs")}
        className="buy-now-btn"
      >
        Buy Now
      </Link>
      {/* <Link
        to="https://wa.me/2347086080992"
        target="_blank"
        rel="noopener noreferrer"
        className="buy-now-btn-whatsapp"
      >
        Whatsapp
      </Link> */}
    </div>
    // <div className="header-text" aria-label="Header Description">
    //   <p>PHOENIX GLOBAL PROPERTIES</p>
    //   <h1>
    //     Find <span>Apartments</span> for Sale: Your Dream <span>Home </span>
    //     Awaits!
    //   </h1>
    // </div>
  );
}

export default HeaderTextDescription;
