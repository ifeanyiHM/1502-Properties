import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";

interface LogoProps {
  pLogo: string;
  menu: boolean;
  setMenu: Dispatch<SetStateAction<boolean>>;
}

function Logo({ pLogo, menu, setMenu }: LogoProps) {
  return (
    <div className="logo">
      <Link to="#">
        <img src={pLogo} alt="company's logo" />
        PGP
      </Link>
      <button
        className={menu ? "menu-collapse" : "menu"}
        aria-label="toggle menu icon"
        onClick={() => setMenu((btn) => !btn)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  );
}

export default Logo;
