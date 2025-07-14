// components/PropertyCard.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import { propertySummaryProps } from "../Data/propertyData";
import BlurImage from "../Utilities/BlurImage";

interface PropertyCardProps {
  sum: propertySummaryProps;
  index?: number;
  capitalizeTitle: (text: string) => string;
  propertyType: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  sum,
  index,
  capitalizeTitle,
  propertyType,
}) => {
  const navigate = useNavigate();

  function handleClick(details: propertySummaryProps) {
    const titleSlug = slugify(details.title);
    navigate(`/expandPropertyDetails/${titleSlug}`);
  }

  const isVideo = sum.src[0].match(/\.(mp4|webm|ogg)$/i);

  return (
    <div className="ft" key={index} onClick={() => handleClick(sum)}>
      {isVideo ? (
        <video
          key={sum.src[0]}
          autoPlay
          muted
          loop
          playsInline
          title={sum.title}
          width="100%"
          height="100%"
          style={{ objectFit: "cover" }}
        >
          <source src={sum.src[0]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <BlurImage
          key={sum.src[0]}
          src={sum.src[0]}
          alt={sum.title}
          title={sum.title}
          loading="lazy"
        />
      )}

      <div className="ct">
        <div className="check">
          <div className="ck">
            <h3>
              {sum.title.split(/(distress)/i).map((part, i) =>
                /distress/i.test(part) ? (
                  <span key={i} style={{ color: "#ec2121" }}>
                    {part.toUpperCase()}
                  </span>
                ) : (
                  part.toUpperCase()
                )
              )}
            </h3>

            <p className="cal">{capitalizeTitle(sum.location)}</p>

            <p className="title" style={{ marginTop: 0, marginBottom: 0 }}>
              {sum.subtitle
                ? sum.subtitle[0].length > 120
                  ? sum.subtitle[0].slice(0, 120)
                  : sum.subtitle[0]
                : sum.title}
              {sum.subtitle && sum.subtitle[0].length > 120 ? (
                <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                  ...
                </span>
              ) : (
                <>
                  / Property FOR {capitalizeTitle(propertyType)}{" "}
                  <span style={{ fontWeight: "bold" }}>
                    ({sum.code?.toUpperCase()})
                  </span>
                </>
              )}
            </p>

            <p className="price">{sum.price}</p>
          </div>
          <hr />
          <div className="img-det">
            <div className="bath">
              <div className="bt">
                <span>{sum.size ? "SIZE" : sum.room ? "BEDROOM" : ""}</span>
                <span>
                  {sum.size || sum.room}
                  <abbr
                    className="sq"
                    title={
                      sum.measurement === "sqm"
                        ? "Square Meters"
                        : sum.measurement === "m"
                        ? "Meters"
                        : sum.measurement === "L"
                        ? "Liters"
                        : "Metric Tons"
                    }
                  >
                    {sum.measurement}
                  </abbr>
                </span>
              </div>
              <div className="bt">
                <span>
                  {sum.bath && "BATHROOM"}
                  {sum.tank && "TANK"}
                </span>
                <span>
                  {sum.bath || ""}
                  {sum.tank || ""}
                </span>
              </div>
            </div>
          </div>
        </div>
        <p className="pric" style={{ marginTop: 0, marginBottom: 0 }}>
          {sum.price}
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;
