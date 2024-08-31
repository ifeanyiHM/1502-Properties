import React, { Dispatch } from "react";
import { useNavigate } from "react-router-dom";
import SearchNotFound from "../Utilities/SearchNotFound";
import { AppActionProps } from "../App";
import { TbSlashes } from "react-icons/tb";
import { FaAnglesRight } from "react-icons/fa6";

import {
  propertySummaryProps,
  ServicePageDetProps,
} from "../Data/propertyData";

interface ServicePageProps {
  query: string;
  dispatch: Dispatch<AppActionProps>;
  propertyType: string;
  setSummaryDetails: (details: propertySummaryProps) => void;
  searchedLocations: propertySummaryProps[];
  servicePageDet: ServicePageDetProps[];
  activeCrumb: string;
  setActiveCrumb: (details: string) => void;
  setPropertyType: (type: string) => void;
}

function ServicePage({
  query,
  dispatch,
  propertyType,
  setSummaryDetails,
  searchedLocations,
  servicePageDet,
  activeCrumb,
  setActiveCrumb,
  setPropertyType,
}: ServicePageProps) {
  const navigate = useNavigate();

  function handleClick(details: propertySummaryProps) {
    setSummaryDetails(details);
    navigate("/expandPropertyDetails");
  }

  function handleServicePage(details: string) {
    setPropertyType(details);
    navigate(`/service/${details}`);
    setActiveCrumb(details);
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

      {searchedLocations.length > 0 ? (
        <div className="content">
          {searchedLocations.map((sum, index) => {
            if (!sum) return <div>coming soon</div>;
            return (
              <div className="ft" key={index} onClick={() => handleClick(sum)}>
                <img
                  src={sum.src[0]}
                  alt="first featured apartment"
                  title={sum.title}
                  loading="lazy"
                  width="auto"
                  height="auto"
                />

                <div className="ct">
                  <div className="check">
                    <div className="ck">
                      <h3>{sum.title.toUpperCase()}</h3>
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
                  <p
                    style={{
                      marginTop:
                        sum.location.length > 30
                          ? "2.5rem"
                          : sum.title.length < 50
                          ? "5rem"
                          : "",
                    }}
                    className="pric"
                  >
                    {sum.price}
                  </p>
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
