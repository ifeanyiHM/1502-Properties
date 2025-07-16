import { FaAnglesRight } from "react-icons/fa6";
import { TbSlashes } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import SearchNotFound from "../Utilities/SearchNotFound";

import React, { useEffect } from "react";
import useProperty from "../context/useProperty";
import PropertyCard from "../ui/PropertyCard";
import CustomDropdown from "../Utilities/CustomDropdwon";
import { Spinner } from "../Utilities/Spinner";

function ServicePage() {
  const {
    query,
    dispatch,
    propertyType,
    propertyData,
    searchedLocations,
    // activeCrumb,
    setPropertyType,
    selectedType,
    setSelectedType,
    loadingProperties,
  } = useProperty();

  const navigate = useNavigate();

  const uniqueTypes = [
    ...new Set(
      searchedLocations.map((prop) => (prop.subtype ? prop.subtype : ""))
    ),
  ];

  useEffect(() => {
    if (uniqueTypes.length <= 1) {
      setSelectedType("");
    }
  }, [uniqueTypes]);

  function handleServicePage(details: string) {
    setPropertyType(details);
    navigate(`/service/${details}`);
    dispatch({ type: "activeProperty", payload: details });
    setSelectedType("");
  }

  function capitalizeTitle(title: string): string {
    return title?.replace(/\b\w/g, (char) => char?.toUpperCase());
  }

  const propertyDataTypes = [...new Set(propertyData.map((item) => item.type))];

  if (loadingProperties) {
    return <Spinner />;
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
            {propertyDataTypes?.map((type, index) => (
              <React.Fragment key={index}>
                {type && (
                  <li
                    style={{
                      fontWeight: "500",
                      color: propertyType === type ? "#213547" : "",
                    }}
                    onClick={() => handleServicePage(type)}
                  >
                    {type}
                  </li>
                )}

                {index < propertyDataTypes?.length - 1 &&
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

      {searchedLocations.filter(
        (sum) => !selectedType || sum.subtype === selectedType
      ).length > 0 ? (
        <div className="content">
          {searchedLocations
            .filter((sum) => !selectedType || sum.subtype === selectedType)
            .map((sum, index) => {
              if (!sum) return <div key={index}>coming soon</div>;
              return (
                <PropertyCard
                  key={index}
                  sum={sum}
                  index={index}
                  capitalizeTitle={capitalizeTitle}
                  propertyType={propertyType}
                />
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
