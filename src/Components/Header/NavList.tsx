import { NavLink, useNavigate } from "react-router-dom";
import { ServicePageDetProps } from "../../Data/propertyData";

interface NavListProps {
  menu: boolean;
  servicePageDet: ServicePageDetProps[];
  setPropertyType: (type: string) => void;
}

function NavList({ menu, servicePageDet, setPropertyType }: NavListProps) {
  const navigate = useNavigate();

  function handleServicePage(details: string) {
    setPropertyType(details);
    navigate(`service/${details}`);
  }

  return (
    <ul className={menu ? "nav-list" : "nav-list-collapse"}>
      <li>
        <NavLink to="/">HOME</NavLink>
      </li>
      <li>
        <NavLink to="service/buy">OUR PROPERTIES</NavLink>

        <div>
          {servicePageDet.map((details, index) => (
            <span key={index} onClick={() => handleServicePage(details.link)}>
              {details.title}
            </span>
          ))}
        </div>
      </li>
      <li className="nav-item dropdown">
        <NavLink to="ourservices">OUR SERVICES</NavLink>
      </li>
      <li className="nav-item dropdown">
        <NavLink to="contact">CONTACT</NavLink>
      </li>
      <li>
        <NavLink to="ukproperties">UK Properties</NavLink>
      </li>
    </ul>
  );
}

export default NavList;
