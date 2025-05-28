import { NavLink, useNavigate } from "react-router-dom";

import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import useProperty from "../../context/useProperty";
import { servicePageDet } from "../../Data/propertyData";

function NavList() {
  const {
    menu,
    setPropertyType,
    dispatch,
    setIsPageHeaderShown,
    propertyType,
    setSelectedType,
  } = useProperty();

  const [showSaleProp, setShowSaleProp] = useState(false);
  const [showRentProp, setShowRentProp] = useState(false);

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
  }

  function handleServicePage(details: string) {
    setPropertyType(details);
    navigate(`service/${details}`);
    dispatch({ type: "activeProperty", payload: details });
  }

  return (
    <ul className={menu ? "nav-list" : "nav-list-collapse"}>
      <li>
        <NavLink to="/" onClick={closePageHeader}>
          HOME
        </NavLink>
      </li>
      <li
        onPointerLeave={() => {
          setShowSaleProp(false);
          setShowRentProp(false);
        }}
      >
        <NavLink to={`service/${propertyType}`} onClick={openPageHeader}>
          OUR PROPERTIES
        </NavLink>

        <div className="property-details">
          {servicePageDet.map((details, index) => (
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
                  handleServicePage(details.link);
                  setSelectedType("");
                  setShowRentProp(false);
                  setShowRentProp(false);
                }
              }}
            >
              <>{details.title}</>
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
                  handleServicePage("buy");
                  setSelectedType("lfs");
                }}
              >
                Land for Sale
              </span>
              <span
                onClick={() => {
                  handleServicePage("buy");
                  setSelectedType("afs");
                }}
              >
                Apartment for Sale
              </span>
              <span
                onClick={() => {
                  handleServicePage("buy");
                  setSelectedType("hfs");
                }}
              >
                House for Sale
              </span>
              <span
                onClick={() => {
                  handleServicePage("buy");
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
                  setSelectedType("lfs");
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
          ABOUT US
        </NavLink>
      </li>
      <li className="nav-item dropdown">
        <NavLink to="ukproperties" onClick={closePageHeader}>
          REQUEST PROPERTIES
        </NavLink>
      </li>
      <li>
        <NavLink to="contact" onClick={closeMenu}>
          CONTACT
        </NavLink>
      </li>
    </ul>
  );
}

export default NavList;
