import { ReactNode, useEffect, useState } from "react";
import useProperty from "../../context/useProperty";

interface NavProps {
  children: ReactNode;
}

function PageNav({ children }: NavProps) {
  const [scrolled, setScrolled] = useState(false);

  const { isHeader } = useProperty();

  useEffect(() => {
    const handleScroll = () => {
      // Change background when user scrolls more than 50px
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`nav ${scrolled ? "scrolled" : ""}  ${isHeader ? "" : "is-header"}`}
      aria-label="Navigation List"
    >
      {children}
    </nav>
  );
}

export default PageNav;
