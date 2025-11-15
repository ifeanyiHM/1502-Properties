import React from "react";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import { propertySummaryProps } from "../Data/propertyData";
import BlurImage from "../Utilities/BlurImage";
import { RxDividerVertical } from "react-icons/rx";

interface PropertyCardProps {
  sum: propertySummaryProps;
  index?: number;
  capitalizeTitle: (text: string) => string;
  propertyType: string;
}

const NewPropertyCard: React.FC<PropertyCardProps> = ({ sum, index }) => {
  const navigate = useNavigate();

  function handleClick(details: propertySummaryProps) {
    const titleSlug = slugify(details.title);
    navigate(`/expandPropertyDetails/${titleSlug}`);
  }

  const isVideo = sum.src[0].match(/\.(mp4|webm|ogg)$/i);

  return (
    <>
      <div
        className="new-property-card"
        key={index}
        onClick={() => handleClick(sum)}
      >
        <div className="new-property-card__image">
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
        </div>

        <div className="new-property-card__content">
          <h3 className="new-property-card__title">
            {sum?.title?.length > 27
              ? `${sum.title.slice(0, 27)}...`
              : sum.title}
          </h3>
          <p className="new-property-card__price">
            {sum.price.startsWith("₦") || sum.price.startsWith("Contact")
              ? ""
              : "₦ "}
            {sum.price}{" "}
            <span
              style={{ fontWeight: 400, fontSize: "0.75rem", color: "#2b2d2d" }}
            >
              {sum.type === "shortlet" ? "Per Night" : ""}
            </span>
          </p>

          <div className="new-property-card__details">
            <div>
              <span>{sum.size ? "SIZE" : sum.room ? "BEDROOM" : ""}</span>

              <span>•</span>

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
            </div>
            {(sum.bath || sum.tank) && (
              <>
                <RxDividerVertical className="icon" />
                <div className="bt">
                  <span>
                    {sum.bath && "BATHROOM"}
                    {sum.tank && sum.bath && " & "}
                    {sum.tank && "TANK"}
                  </span>
                  <span>•</span>
                  <span>
                    {sum.bath || ""}
                    {sum.bath && sum.tank && " | "}
                    {sum.tank || ""}
                  </span>
                </div>
              </>
            )}
          </div>

          <p className="new-property-card__location">
            {" "}
            {sum?.location?.length > 35
              ? `${sum.location.slice(0, 35)}...`
              : sum.location}
          </p>
        </div>
      </div>
    </>
  );
};

export default NewPropertyCard;
