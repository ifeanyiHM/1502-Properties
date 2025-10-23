import { NavLink, useNavigate } from "react-router-dom";

import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import useAuth from "../../context/useAuth";
import useProperty from "../../context/useProperty";
import Avatar from "../../ui/Avatar";

function NavList() {
  const {
    menu,
    setPropertyType,
    dispatch,
    setIsPageHeaderShown,
    propertyType,
    setSelectedType,
    propertyData,
  } = useProperty();

  const { isAuthenticated } = useAuth();

  const [showSaleProp, setShowSaleProp] = useState(false);
  const [showRentProp, setShowRentProp] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState({
    title: "Request Properties",
    link: "ukproperties",
  });
  const [isActive, setIsActive] = useState(false);

  const toggleDropdown = () => {
    setIsActive((prev) => !prev);
  };

  const handleSelect = (title: string, link: string) => {
    setSelectedLabel({ title: title, link: link });
    closePageHeader(); // Optional if needed
  };

  const navigate = useNavigate();

  function closeMenu() {
    if (window.innerWidth < 992) {
      dispatch({ type: "mobileView", payload: false });
    }
  }

  function openPageHeader() {
    closeMenu();
    setIsPageHeaderShown(true);
    dispatch({ type: "activeProperty", payload: propertyType });
  }

  function closePageHeader() {
    closeMenu();
    setIsPageHeaderShown(false);
    setSelectedType("");
    setIsActive(false);
  }

  function handleServicePage(details: string) {
    setPropertyType(details);
    navigate(`service/${details}`);
    dispatch({ type: "activeProperty", payload: details });
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

  function capitalizeTitle(title: string): string {
    return title?.replace(/\b\w/g, (char) => char?.toUpperCase());
  }

  return (
    <ul className={menu ? "nav-list" : "nav-list-collapse"}>
      {isAuthenticated && window.innerWidth >= 1024 && (
        <li style={{ visibility: "hidden" }}>Logout</li>
      )}
      <li>
        <NavLink to="/" onClick={closePageHeader}>
          Home
        </NavLink>
      </li>
      <li
        className="view-prop"
        onPointerLeave={() => {
          setShowSaleProp(false);
          setShowRentProp(false);
        }}
      >
        <NavLink to={`service/${propertyType}`} onClick={openPageHeader}>
          View Properties
        </NavLink>

        <div className="property-details">
          {normalizedPropertyDataCount?.map((type, index) => (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
              key={index}
              onClick={() => {
                if (index === 0) {
                  setShowSaleProp((prev) => !prev);
                  setShowRentProp(false);
                }
                if (index === 1) {
                  setShowRentProp((prev) => !prev);
                  setShowSaleProp(false);
                }
                if (index !== 0 && index !== 1) {
                  handleServicePage(type ? type : "");
                  setSelectedType("");
                  setShowRentProp(false);
                  setShowRentProp(false);
                }
              }}
            >
              {type && <>{capitalizeTitle(type)}</>}
              <>
                {(index === 0 || index === 1) &&
                  ((index === 0 &&
                    (showSaleProp ? <FaAngleUp /> : <FaAngleDown />)) ||
                    (index === 1 &&
                      (showRentProp ? <FaAngleUp /> : <FaAngleDown />)))}
              </>
            </span>
          ))}

          {showSaleProp && (
            <div className="sale-prop">
              <span
                onClick={() => {
                  handleServicePage("sale");
                  setSelectedType("lfs");
                }}
              >
                Land for Sale
              </span>
              <span
                onClick={() => {
                  handleServicePage("sale");
                  setSelectedType("afs");
                }}
              >
                Apartment for Sale
              </span>
              <span
                onClick={() => {
                  handleServicePage("sale");
                  setSelectedType("hfs");
                }}
              >
                House for Sale
              </span>
              <span
                onClick={() => {
                  handleServicePage("sale");
                  setSelectedType("cfs");
                }}
              >
                Commercial property for Sale
              </span>
            </div>
          )}
          {showRentProp && (
            <div className="sale-prop">
              <span
                onClick={() => {
                  handleServicePage("rent");
                  setSelectedType("lfl");
                }}
              >
                Land for Lease
              </span>
              <span
                onClick={() => {
                  handleServicePage("rent");
                  setSelectedType("ls");
                }}
              >
                Long Lease
              </span>
              <span
                onClick={() => {
                  handleServicePage("rent");
                  setSelectedType("afl");
                }}
              >
                Apartment for Lease
              </span>
              <span
                onClick={() => {
                  handleServicePage("rent");
                  setSelectedType("hfl");
                }}
              >
                House for Lease
              </span>
              <span
                onClick={() => {
                  handleServicePage("rent");
                  setSelectedType("cfl");
                }}
              >
                Commercial property for Lease
              </span>
            </div>
          )}
        </div>
      </li>

      <li className="nav-item dropdown">
        <NavLink to="ourservices" onClick={closePageHeader}>
          About us
        </NavLink>
      </li>
      <li
        className={`nav-item dropdown request-prop ${isActive ? "active" : ""}`}
      >
        <span onClick={toggleDropdown} className="mobile">
          {selectedLabel.title}
        </span>
        <NavLink
          to={selectedLabel.link}
          onClick={closePageHeader}
          className="desktop"
        >
          {selectedLabel.title}
        </NavLink>
        <div className="request-property-details">
          <NavLink to="ukproperties" onClick={() => setIsActive(false)}>
            {" "}
            <span
              onClick={() => handleSelect("Request Properties", "ukproperties")}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              Request Properties
            </span>
          </NavLink>
          <NavLink
            to="view-property-request"
            onClick={() => setIsActive(false)}
          >
            {" "}
            <span
              onClick={() =>
                handleSelect("View Request", "view-property-request")
              }
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              View Request
            </span>
          </NavLink>
        </div>
      </li>
      <li>
        <NavLink to="blogs" onClick={closeMenu}>
          Blog
        </NavLink>
      </li>

      {!isAuthenticated && (
        <li>
          <NavLink to="contact" onClick={closeMenu}>
            Contact us
          </NavLink>
        </li>
      )}

      {/* {!isAuthenticated && (
        <li>
          <NavLink to="login" onClick={closeMenu}>
            Log in
          </NavLink>
        </li>
      )}
      {!isAuthenticated && (
        <li>
          <NavLink to="signup" onClick={closeMenu}>
            Sign up
          </NavLink>
        </li>
      )} */}
      {isAuthenticated && (
        <li className="avatar">
          <Avatar />
        </li>
      )}
    </ul>
  );
}

export default NavList;
