import { FaAnglesRight } from "react-icons/fa6";
import { TbSlashes } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import SearchNotFound from "../Utilities/SearchNotFound";

import React, { useEffect } from "react";
import useProperty from "../context/useProperty";
import { propertySummaryProps, servicePageDet } from "../Data/propertyData";
import CustomDropdown from "../Utilities/CustomDropdwon";

function ServicePage() {
  const {
    query,
    dispatch,
    propertyType,
    setSummaryDetails,
    searchedLocations,
    activeCrumb,
    setPropertyType,
    selectedType,
    setSelectedType,
  } = useProperty();

  const navigate = useNavigate();

  const uniqueTypes = [
    ...new Set(searchedLocations.map((prop) => (prop.type ? prop.type : ""))),
  ];

  useEffect(() => {
    if (uniqueTypes.length <= 1) {
      setSelectedType("");
    }
  }, [uniqueTypes]);

  function handleClick(details: propertySummaryProps) {
    setSummaryDetails(details);
    navigate("/expandPropertyDetails");
  }

  function handleServicePage(details: string) {
    setPropertyType(details);
    navigate(`/service/${details}`);
    dispatch({ type: "activeProperty", payload: details });
    setSelectedType("");
  }

  function capitalizeTitle(title: string): string {
    return title.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  return (
    <div className="service-page">
      <div className="input">
        <h1>
          {capitalizeTitle(propertyType).split("-").join(" ")}{" "}
          {propertyType !== "buy" && propertyType !== "rent"
            ? ""
            : "Properties"}
        </h1>

        <input
          type="text"
          placeholder="search properties by location and title"
          value={query}
          onChange={(e) =>
            dispatch({ type: "searchProperties", payload: e.target.value })
          }
        />
      </div>
      <div className="bread-drop">
        <div className="property-type-breadcrumb">
          <ul>
            {servicePageDet.map((details, index) => (
              <React.Fragment key={index}>
                <li
                  style={{
                    fontWeight: "500",
                    color: activeCrumb === details.link ? "#213547" : "",
                  }}
                  onClick={() => handleServicePage(details.link)}
                >
                  {details.title}
                </li>
                {index < servicePageDet.length - 1 &&
                  (window.innerWidth >= 768 ? (
                    <FaAnglesRight className="icon" />
                  ) : (
                    <TbSlashes className="icon" />
                  ))}
              </React.Fragment>
            ))}
          </ul>
        </div>

        {uniqueTypes.length > 1 && <CustomDropdown uniqueTypes={uniqueTypes} />}
      </div>
      \
      {searchedLocations.filter(
        (sum) => !selectedType || sum.type === selectedType
      ).length > 0 ? (
        <div className="content">
          {searchedLocations
            .filter((sum) => !selectedType || sum.type === selectedType)
            .map((sum, index) => {
              if (!sum) return <div key={index}>coming soon</div>;
              return (
                <div
                  className="ft"
                  key={index}
                  onClick={() => handleClick(sum)}
                >
                  {sum.src[0].match(/\.(mp4|webm|ogg)$/i) ? (
                    <video
                      key={sum.src[0]}
                      autoPlay
                      muted
                      loop
                      playsInline
                      title={sum?.title}
                      width="100%"
                      height="100%"
                      style={{ objectFit: "cover" }}
                    >
                      <source src={sum?.src[0]} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={sum.src[0]}
                      alt="first featured apartment"
                      title={sum.title}
                      loading="lazy"
                      width="auto"
                      height="auto"
                    />
                  )}

                  <div className="ct">
                    <div className="check">
                      <div className="ck">
                        <h3>
                          {sum.title.split(/(distress)/i).map((part, index) =>
                            /distress/i.test(part) ? (
                              <span key={index} style={{ color: "#ec2121" }}>
                                {part.toUpperCase()}
                              </span>
                            ) : (
                              part.toUpperCase()
                            )
                          )}
                        </h3>

                        <p className="cal">{capitalizeTitle(sum.location)}</p>
                        <p className="title">
                          {sum.title} / Property FOR{" "}
                          {capitalizeTitle(propertyType)}
                        </p>
                        <p className="price">{sum.price}</p>
                      </div>
                      <hr />
                      <div className="img-det">
                        <div className="bath">
                          <div className="bt">
                            <span>
                              {sum.size ? "SIZE" : sum.room ? "BEDROOM" : ""}
                            </span>
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
                              {sum.bath && sum.bath}
                              {sum.tank && sum.tank}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="pric">{sum.price}</p>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <SearchNotFound />
      )}
    </div>
  );
}

export default ServicePage;
