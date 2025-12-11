import { useNavigate } from "react-router-dom";
import SearchNotFound from "../Utilities/SearchNotFound";

import React, { useEffect, useState } from "react";
import useProperty from "../context/useProperty";
import CustomDropdown from "../Utilities/CustomDropdwon";
import { Spinner } from "../Utilities/Spinner";
import NewPropertyCard from "../ui/NewPropertyCard";

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

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth < 768 ? 10 : 20);
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

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

  useEffect(() => {
    if (selectedType) {
      navigate(`/service/${propertyType}/${selectedType ? selectedType : ""}`);
    }
  }, [selectedType]);

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

  const expectedTypes = [
    "sale",
    "rent",
    "joint-ventures",
    "shortlet",
    "off-plan",
  ];

  const normalizedPropertyDataCount = expectedTypes.map((expectedType) => {
    const found = propertyDataTypes.find((item) => item === expectedType);
    return found || expectedType;
  });

  if (loadingProperties) {
    return <Spinner />;
  }

  const filteredData = searchedLocations.filter(
    (sum) => !selectedType || sum.subtype === selectedType
  );

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // ✅ Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const maxButtons = 4;

    if (totalPages <= maxButtons) {
      // Show all pages if total is 4 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 2) {
        // Near the beginning: 1, 2, 3, ...
        pages.push(2, 3);
        pages.push("...");
      } else if (currentPage >= totalPages - 1) {
        // Near the end: 1, ..., n-2, n-1, n
        pages.push("...");
        pages.push(totalPages - 2, totalPages - 1);
      } else {
        // In the middle: 1, ..., current, ...
        pages.push("...");
        pages.push(currentPage);
        pages.push("...");
      }

      // Always show last page
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="service-page">
      <div className="input">
        <h1>
          Exclusive Portfolio (
          {capitalizeTitle(propertyType).split("-").join(" ")}
          {propertyType !== "buy" && propertyType !== "rent"
            ? ""
            : "Properties"}
          )
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
            {normalizedPropertyDataCount?.map((type, index) => (
              <React.Fragment key={index}>
                {type && (
                  <li
                    style={{
                      fontWeight: "500",
                      color: propertyType === type ? "#2b2d2d" : "",
                      borderColor: propertyType === type ? "#2b2d2d" : "",
                    }}
                    onClick={() => handleServicePage(type)}
                  >
                    {capitalizeTitle(type)}
                  </li>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>
        <input
          type="text"
          placeholder="search properties by location and title"
          value={query}
          onChange={(e) =>
            dispatch({ type: "searchProperties", payload: e.target.value })
          }
        />

        {uniqueTypes.length > 1 && <CustomDropdown uniqueTypes={uniqueTypes} />}
      </div>

      {filteredData.length > 0 ? (
        <>
          <div className="content">
            {currentData.map((sum, index) => (
              <NewPropertyCard
                key={index}
                sum={sum}
                index={index}
                capitalizeTitle={capitalizeTitle}
                propertyType={propertyType}
              />
            ))}
          </div>

          {filteredData.length > itemsPerPage && (
            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Prev
              </button>

              {getPageNumbers().map((page, index) =>
                page === "..." ? (
                  <span
                    key={`ellipsis-${index}`}
                    className="pagination-ellipsis"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    className={currentPage === page ? "active" : ""}
                    onClick={() => setCurrentPage(page as number)}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <SearchNotFound />
      )}
    </div>
  );
}

export default ServicePage;
