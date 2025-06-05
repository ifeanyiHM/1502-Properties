import { Link } from "react-router-dom";
import useProperty from "../../context/useProperty";
import { slides } from "../../Data/propertyData";

function HeaderTextSlider() {
  const { setSelectedType, curIndex } = useProperty();

  return (
    <section className="header-text-slider">
      <div className="header-text-wrapper">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`header-text ${
              index === curIndex ? "active" : "inactive"
            }`}
            aria-hidden={curIndex !== index}
          >
            <p
              style={{
                color: "red",
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
              to={slide?.link}
              onClick={() => setSelectedType(slide?.type)}
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
