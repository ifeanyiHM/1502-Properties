import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { AppActionProps } from "../../App";

interface LogoProps {
  pLogo: string;
  menu: boolean;
  dispatch: Dispatch<AppActionProps>;
  propertyType: string;
  isPageHeaderShown: boolean;
  setIsPageHeaderShown: Dispatch<SetStateAction<boolean>>;
}

function Logo({
  pLogo,
  menu,
  dispatch,
  propertyType,
  isPageHeaderShown,
  setIsPageHeaderShown,
}: LogoProps) {
  function toggleMenu() {
    dispatch({ type: "toggleMobileView" });
  }

  function capitalizeTitle(title: string): string {
    return title.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  return (
    <div className="logo">
      <Link to="/" onClick={() => setIsPageHeaderShown(false)}>
        <img src={pLogo} alt="company's logo" />
      </Link>
      <div className="propertyType">
        <div className="mt" tabIndex={0}>
          <div
            className={menu ? "menu-collapse" : "menu"}
            aria-label="toggle menu icon"
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {isPageHeaderShown && window.innerWidth < 992 && (
          <h1>
            {capitalizeTitle(propertyType).split("-").join(" ")}{" "}
            {propertyType !== "buy" && propertyType !== "rent"
              ? ""
              : "Properties"}
          </h1>
        )}
      </div>
    </div>
  );
}

export default Logo;
