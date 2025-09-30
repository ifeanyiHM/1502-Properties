import { useNavigate } from "react-router-dom";
import useProperty from "../../context/useProperty";

function OurServices() {
  const { setPropertyType, setIsPageHeaderShown, dispatch, propertyData } =
    useProperty();

  const navigate = useNavigate();

  const propertyDataCount = Array.from(
    propertyData.reduce((map, item) => {
      if (!item.type) return map;
      map.set(item.type, (map.get(item.type) || 0) + 1);
      return map;
    }, new Map<string, number>())
  ).map(([type, count]) => ({ type, count }));

  const expectedTypes = [
    "sale",
    "rent",
    "joint-ventures",
    "shortlet",
    "off-plan",
  ];

  const normalizedPropertyDataCount = expectedTypes.map((expectedType) => {
    const found = propertyDataCount.find((item) => item.type === expectedType);
    return found || { type: expectedType, count: 0 };
  });

  function handleServicePage(link: string) {
    setPropertyType(link);
    navigate(`service/${link}`);
    setIsPageHeaderShown(true);
    dispatch({ type: "activeProperty", payload: link });
  }

  const slideSytles = {
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    cursor: "pointer",
  };

  return (
    <div className="services" id="service">
      <h2>Our Services</h2>
      <div className="grid-container">
        {normalizedPropertyDataCount.map(({ type, count }, index) => (
          <div
            key={index}
            style={{
              ...slideSytles,
              backgroundImage: `url(/carousel${index + 1}.jpg)`,
            }}
            onClick={() => handleServicePage(type)}
          >
            <div className="service-item">
              <h3>{type?.toUpperCase()}</h3>
              <p style={{ margin: 0 }}>{count} Properties</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurServices;
