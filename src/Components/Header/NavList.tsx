import { NavLink, useNavigate } from "react-router-dom";
import { ServicePageDetProps } from "../../Data/propertyData";
import { Dispatch } from "react";
import { AppActionProps } from "../../App";

interface NavListProps {
  menu: boolean;
  servicePageDet: ServicePageDetProps[];
  setPropertyType: (type: string) => void;
  dispatch: Dispatch<AppActionProps>;
}

function NavList({
  menu,
  servicePageDet,
  setPropertyType,
  dispatch,
}: NavListProps) {
  const navigate = useNavigate();

  function closeMenu() {
    if (window.innerWidth <= 992) {
      dispatch({ type: "mobileView", payload: false });
    }
  }

  function handleServicePage(details: string) {
    setPropertyType(details);
    navigate(`service/${details}`);
  }

  return (
    <ul className={menu ? "nav-list" : "nav-list-collapse"}>
      <li>
        <NavLink to="/" onClick={closeMenu}>
          HOME
        </NavLink>
      </li>
      <li>
        <NavLink to="service/buy" onClick={closeMenu}>
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
        <NavLink to="ourservices" onClick={closeMenu}>
          OUR SERVICES
        </NavLink>
      </li>
      <li className="nav-item dropdown">
        <NavLink to="contact" onClick={closeMenu}>
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
