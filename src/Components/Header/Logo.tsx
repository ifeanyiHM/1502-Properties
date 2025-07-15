import { Link } from "react-router-dom";

import useProperty from "../../context/useProperty";
import Avatar from "../../ui/Avatar";

function Logo() {
  const {
    menu,
    dispatch,
    propertyType,
    isPageHeaderShown,
    setIsPageHeaderShown,
  } = useProperty();
  function toggleMenu() {
    dispatch({ type: "toggleMobileView" });
  }

  function capitalizeTitle(title: string): string {
    return title.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  return (
    <div className="logo">
      <Link to="/" onClick={() => setIsPageHeaderShown(false)}>
        <img
          src="/website_logo.svg"
          alt="company's logo"
          title="1502 Property Logo"
          loading="lazy"
          // width="112"
          // height="45.28"
        />
      </Link>
      <div className="propertyType">
        <Avatar />
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
            {/* {propertyType !== "buy" && propertyType !== "rent"
              ? ""
              : "Properties"} */}
          </h1>
        )}
      </div>
    </div>
  );
}

export default Logo;
