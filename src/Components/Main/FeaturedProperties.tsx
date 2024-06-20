import { Link, useNavigate } from "react-router-dom";
import featured1 from "../../assets/feature1.webp";
import featured2 from "../../assets/feature2.webp";
import { propertySummaryProps } from "../../App";
import featured3 from "../../assets/feature3.webp";
// import { useState } from "react";

const propertySummary = [
  {
    src: [featured1, featured2, featured3],
    title: "luxury 4 bedroom detached duplex with bq",
    price: "₦ 120,000,000",
    location: "Ajah Lagos",
  },
  {
    src: [featured2, featured3, featured1],
    title: "luxury 4 bedroom detached duplex with bq",
    price: "₦ 120,000,000",
    location: "Ajah Lagos",
  },
  {
    src: [featured3, featured1, featured2],
    title: "luxury 4 bedroom detached duplex with bq",
    price: "₦ 120,000,000",
    location: "Ajah Lagos",
  },
];

interface FeaturedPropertiesProps {
  setSummaryDetails: (details: propertySummaryProps) => void;
}

function FeaturedProperties({ setSummaryDetails }: FeaturedPropertiesProps) {
  const navigate = useNavigate();

  function handleClick(details: propertySummaryProps) {
    setSummaryDetails(details);
    navigate("expandPropertyDetails");
  }

  return (
    <div className="featuredProperties">
      <div className="head">
        <h2>Featured Properties</h2>
        <Link to="featuredProperties">See more</Link>
      </div>
      <div className="content">
        {propertySummary.map((sum, index) => (
          <div className="ft" key={index} onClick={() => handleClick(sum)}>
            <img src={sum.src[0]} alt="first featured apartment" />
            <div className="line"></div>
            <p>{sum.title.toUpperCase()}</p>
            <h3>{sum.price}</h3>
            <p>{sum.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProperties;
