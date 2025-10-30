import { Link } from "react-router-dom";
import useProperty from "../../context/useProperty";
import useSlider from "../../context/useSlider";

function HeaderTextSlider() {
  const { setSelectedType, setPropertyType, dispatch, topProperty } =
    useProperty();
  const { curIndex } = useSlider();

  // const curIndex = 0;

  return (
    <section className="header-text-slider">
      <div className="header-text-wrapper">
        {topProperty
          .filter((property) => [64, 62, 10].includes(+property.id))
          .map((slide, index) => (
            <div
              key={`${slide.type}-${index}`}
              className={`header-text ${index === curIndex ? "active" : ""}`}
              style={{
                pointerEvents: index === curIndex ? "auto" : "none", // Important
              }}
              aria-hidden={index !== curIndex}
            >
              <h2 className="desc-head">{slide?.title}</h2>
              <hr />
              <div>
                <h2 className="loc">{slide?.location}</h2>
                <h2>{slide?.price}</h2>
              </div>
            </div>
          ))}
      </div>
      <div className="header-text-wrapper">
        {topProperty.map((slide, index) => (
          <div
            key={`${slide.type}-${index}`}
            className={`header-text ${index === curIndex ? "active" : ""}`}
            style={{
              pointerEvents: index === curIndex ? "auto" : "none", // Important
            }}
            aria-hidden={index !== curIndex}
          >
            <h2 className="desc-head">
              “In real estate, your investment doesn’t just sit in a portfolio,
              it becomes a space you can call home, rest in, and still rise in
              value.”
            </h2>
            <hr />
            <Link
              to={`/service/${slide?.type}`}
              onClick={() => {
                setSelectedType(slide?.subtype || "");
                setPropertyType(slide?.type ?? "");
                dispatch({ type: "activeProperty", payload: slide.type });
              }}
              className="buy-now-btn"
            >
              {+slide?.id === 62 ? "Rent Now" : "Buy Now"}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HeaderTextSlider;
