import { Link, useNavigate } from "react-router-dom";

import { propertySummaryProps } from "../../App";

interface FeaturedPropertiesProps {
  randomProperties: propertySummaryProps[];
  setSummaryDetails: (details: propertySummaryProps) => void;
}

function FeaturedProperties({
  setSummaryDetails,
  randomProperties,
}: FeaturedPropertiesProps) {
  const navigate = useNavigate();

  function handleClick(details: propertySummaryProps) {
    setSummaryDetails(details);
    navigate("expandPropertyDetails");
  }

  function capitalize(title: string): string {
    return title.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  return (
    <div className="featuredProperties">
      <div className="head">
        <h2>Featured Properties</h2>
        <Link to="service/buy">See more</Link>
      </div>
      <div className="content">
        {randomProperties.slice(0, 3).map((sum, index) => (
          <div className="ft" key={index} onClick={() => handleClick(sum)}>
            <div className="effect">
              <img src={sum.src[0]} alt="first featured apartment" />
              <div className="det">
                <p>{sum.title.toUpperCase()}</p>
                <h3>{sum.price}</h3>
                <p>{capitalize(sum.location)}</p>
              </div>
            </div>
            <div className="details">
              <div className="line"></div>
              <p>{sum.title.toUpperCase()}</p>
              <h3>{sum.price}</h3>
              <p>{capitalize(sum.location)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProperties;
