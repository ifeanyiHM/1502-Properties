import { NavLink, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import useProperty from "../../context/useProperty";
import supabase from "../../services/supabase";
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

  const [showSaleProp, setShowSaleProp] = useState(false);
  const [showRentProp, setShowRentProp] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsAuthenticated(!!session?.user);
    };

    checkUser();

    // Optional: Listen to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsAuthenticated(!!session?.user);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

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
  }

  function handleServicePage(details: string) {
    setPropertyType(details);
    navigate(`service/${details}`);
    dispatch({ type: "activeProperty", payload: details });
  }

  const propertyDataTypes = [...new Set(propertyData.map((item) => item.type))];

  return (
    <ul className={menu ? "nav-list" : "nav-list-collapse"}>
      {isAuthenticated && <li style={{ visibility: "hidden" }}>Logout</li>}
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
          View properties
        </NavLink>

        <div className="property-details">
          {propertyDataTypes?.map((type, index) => (
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
              {type && <>{type}</>}
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
      <li className="nav-item dropdown">
        <NavLink to="ukproperties" onClick={closePageHeader}>
          Request properties
        </NavLink>
      </li>
      {/* <li>
        <NavLink to="contact" onClick={closeMenu}>
          Contact us
        </NavLink>
      </li> */}

      {!isAuthenticated && (
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
      )}
      {isAuthenticated && (
        <li className="avatar">
          <Avatar />
        </li>
      )}
    </ul>
  );
}

export default NavList;
