import { NavLink, useNavigate } from "react-router-dom";

import useProperty from "../../context/useProperty";
import { servicePageDet } from "../../Data/propertyData";

function NavList() {
  const {
    menu,
    setPropertyType,
    dispatch,
    setIsPageHeaderShown,
    propertyType,
  } = useProperty();

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
      <li>
        <NavLink to={`service/${propertyType}`} onClick={openPageHeader}>
          OUR PROPERTIES
        </NavLink>

        <div>
          {servicePageDet.map((details, index) => (
            <span key={index} onClick={() => handleServicePage(details.link)}>
              {details.title}
            </span>
          ))}
        </div>
      </li>
      <li className="nav-item dropdown">
        <NavLink to="ourservices" onClick={closePageHeader}>
          OUR SERVICES
        </NavLink>
      </li>
      <li className="nav-item dropdown">
        <NavLink to="contact" onClick={closePageHeader}>
          CONTACT
        </NavLink>
      </li>
      <li>
        <NavLink to="ukproperties" onClick={closeMenu}>
          UK Properties
        </NavLink>
      </li>
    </ul>
  );
}

export default NavList;
