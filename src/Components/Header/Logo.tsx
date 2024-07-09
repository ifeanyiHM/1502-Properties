import { Dispatch } from "react";
import { Link } from "react-router-dom";
import { AppActionProps } from "../../App";

interface LogoProps {
  pLogo: string;
  menu: boolean;
  dispatch: Dispatch<AppActionProps>;
}

function Logo({ pLogo, menu, dispatch }: LogoProps) {
  function toggleMenu() {
    dispatch({ type: "toggleMobileView" });
  }

  return (
    <div className="logo">
      <Link to="/">
        <img src={pLogo} alt="company's logo" />
      </Link>
      <button
        className={menu ? "menu-collapse" : "menu"}
        aria-label="toggle menu icon"
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  );
}

export default Logo;
