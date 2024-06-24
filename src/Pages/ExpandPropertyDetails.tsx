import { useEffect, useState } from "react";
import { propertySummaryProps } from "../App";
import { useNavigate } from "react-router-dom";

interface ExpandPropertyDetailsProps {
  summaryDetails: propertySummaryProps | null;
}

function ExpandPropertyDetails({ summaryDetails }: ExpandPropertyDetailsProps) {
  const [curIndex, setCurIndex] = useState<number>(0);

  const navigate = useNavigate();

  function handlePrevious() {
    if (summaryDetails) {
      const isFirstSlide =
        curIndex === 0 ? summaryDetails.src.length - 1 : curIndex - 1;
      setCurIndex(isFirstSlide);
    }
  }
  function handleNext() {
    if (summaryDetails) {
      const isFirstSlide =
        curIndex === summaryDetails.src.length - 1 ? 0 : curIndex + 1;
      setCurIndex(isFirstSlide);
    }
  }

  function capitalizeTitle(title: string): string {
    return title.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  useEffect(
    function () {
      if (!summaryDetails) navigate("/");
    },
    [summaryDetails, navigate]
  );

  if (!summaryDetails) {
    return (
      <div>Click a property in the service page to get a full detail.</div>
    );
  }

  return (
    <div className="expand-property-details">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <span>&larr;</span> Back
      </button>
      <h2>{capitalizeTitle(summaryDetails.title)}</h2>
      <div className="container">
        <div className="grid-cont1">
          <div className="img-exp">
            <img
              src={summaryDetails.src[curIndex]}
              alt={summaryDetails.title}
            />
            <button onClick={handlePrevious}>&#x2039;</button>
            <button onClick={handleNext}>&#x203A;</button>
          </div>
          <div className="img-det">
            <h3>{summaryDetails.price}</h3>
            <div className="bath">
              <div className="bt">
                <span>BEDROOMS</span>
                <span>5</span>
              </div>
              <div className="bt">
                <span>BATHROOM</span>
                <span>4 </span>
              </div>
            </div>
          </div>
          <div className="adr">
            <h4>Property Address</h4>
            <p>
              <span>&#x2625;</span> {capitalizeTitle(summaryDetails.location)}
            </p>
          </div>
        </div>
        <div className="grid-cont">{/* <h1>cont</h1> */}</div>
      </div>
    </div>
  );
}

export default ExpandPropertyDetails;
