import { Link } from "react-router-dom";
import useProperty from "../../context/useProperty";
import { slides } from "../../Data/propertyData";

function HeaderTextSlider() {
  const { setSelectedType, curIndex, setPropertyType, dispatch } =
    useProperty();

  return (
    <section className="header-text-slider">
      <div className="header-text-wrapper">
        {slides.map((slide, index) => (
          <div
            key={`${slide.link}-${index}`}
            className={`header-text ${index === curIndex ? "active" : ""}`}
            style={{
              pointerEvents: index === curIndex ? "auto" : "none", // Important
            }}
            aria-hidden={index !== curIndex}
          >
            <p
              style={{
                color: "#B22222",
                fontSize: "20px",
                textTransform: "uppercase",
              }}
            >
              {slide?.distress || ""}
            </p>
            <h1 className="desc-head">
              {slide?.title} <span>{slide?.highlight}</span> {slide?.location}
            </h1>
            <Link
              to={`/service/${slide?.link}`}
              onClick={() => {
                setSelectedType(slide?.type || "");
                setPropertyType(slide?.link);
                dispatch({ type: "activeProperty", payload: slide.link });
              }}
              className="buy-now-btn"
            >
              {slide?.buttonLabel}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HeaderTextSlider;
