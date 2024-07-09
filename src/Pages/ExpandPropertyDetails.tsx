import { useEffect, useState } from "react";
import { propertySummaryProps } from "../Data/propertyData";
import { Link, useNavigate } from "react-router-dom";
import { IoCall } from "react-icons/io5";
import { BsWhatsapp } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { BsStars } from "react-icons/bs";
import { IoCheckmarkDone } from "react-icons/io5";

// import PageHeader from "./PageHeader";
import whatsappQR from "../assets/whatsappqrcode.png";

interface ExpandPropertyDetailsProps {
  summaryDetails: propertySummaryProps | null;
  propertyType: string;
}

function ExpandPropertyDetails({
  summaryDetails,
}: // propertyType,
ExpandPropertyDetailsProps) {
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
    return title.replace(/\b\w/g, (char, index) =>
      title[index - 1] === "'" ? char.toLowerCase() : char.toUpperCase()
    );
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
    <>
      {/* <PageHeader>
        <h1>
          {capitalizeTitle(propertyType)}{" "}
          {propertyType !== "buy" && propertyType !== "rent"
            ? ""
            : "Properties"}
        </h1>

        <span>
          <Link to="/">Home</Link> / {capitalizeTitle(propertyType)}{" "}
          {propertyType !== "buy" && propertyType !== "rent"
            ? ""
            : "Properties"}
        </span>
      </PageHeader> */}

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
                  <span>
                    {summaryDetails.size
                      ? "SIZE"
                      : summaryDetails.room
                      ? "BEDROOM"
                      : ""}
                  </span>
                  <span>
                    {summaryDetails.size || summaryDetails.room}

                    <abbr
                      className="sq"
                      title={
                        summaryDetails.measurement === "sqm"
                          ? "Square Meters"
                          : summaryDetails.measurement === "m"
                          ? "Meters"
                          : summaryDetails.measurement === "L"
                          ? "Liters"
                          : "Metric Tons"
                      }
                    >
                      {summaryDetails.measurement}
                    </abbr>
                  </span>
                </div>
                <div className="bt">
                  <span>
                    {summaryDetails.bath && "BATHROOM"}
                    {summaryDetails.tank && "TANK"}
                  </span>
                  <span>
                    {summaryDetails.bath && summaryDetails.bath}
                    {summaryDetails.tank && summaryDetails.tank}
                  </span>
                </div>
              </div>
            </div>
            <div className="adr">
              <h4>Property Address</h4>
              <p>
                <span>
                  <FaLocationDot />
                </span>{" "}
                {capitalizeTitle(summaryDetails.location)}
              </p>
            </div>
            {summaryDetails.details && (
              <div className="suit">
                <p>Other details:</p>
                <ul>
                  {summaryDetails.details?.map((li: string, index: number) => (
                    <li key={index}>
                      <IoCheckmarkDone /> <span>{li}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="grid-cont">
            <div className="contact-agent">
              <h3>Contact Agent</h3>
              <img src={whatsappQR} alt="whatsapp qr code" />
              <div className="contact">
                <Link to="tel:08096068042">
                  <IoCall /> <span>Call</span>
                </Link>
                <Link to="https://wa.link/7kyciy" target="_blank">
                  <BsWhatsapp />
                  <span> Whatsapp</span>
                </Link>
              </div>
            </div>

            {summaryDetails.suitability && (
              <div className="suit">
                <p>The property is suitable for:</p>
                <ul>
                  {summaryDetails.suitability?.map(
                    (li: string, index: number) => (
                      <li key={index}>
                        <BsStars className="icon" /> <span>{li}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ExpandPropertyDetails;
