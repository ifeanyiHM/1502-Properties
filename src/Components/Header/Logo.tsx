import { Link } from "react-router-dom";

import useProperty from "../../context/useProperty";

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
          src="/Logo.svg"
          alt="company's logo"
          title="Phoenix Global Logo"
          loading="lazy"
          // width="112"
          // height="45.28"
        />
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
