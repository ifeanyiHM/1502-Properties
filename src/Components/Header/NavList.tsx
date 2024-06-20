import { NavLink } from "react-router-dom";

interface NavListProps {
  menu: boolean;
}

function NavList({ menu }: NavListProps) {
  return (
    <ul className={menu ? "nav-list" : "nav-list-collapse"}>
      <li>
        <NavLink to="/">HOME</NavLink>
      </li>
      <li>
        <NavLink to="service">SERVICE</NavLink>
      </li>
      <li className="nav-item dropdown">
        <NavLink to="about">ABOUT</NavLink>
      </li>
      <li className="nav-item dropdown">
        <NavLink to="contact">CONTACT</NavLink>
      </li>
      <li>
        <NavLink to="properties">UK Properties</NavLink>
      </li>
    </ul>
  );
}

export default NavList;
