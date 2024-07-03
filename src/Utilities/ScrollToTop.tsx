import { useState, useEffect } from "react";
import { FaAnglesUp } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={handleScrollToTop}
      className="scroll-top"
      style={{ display: isVisible ? "inline" : "none" }}
    >
      <FaAnglesUp />
    </button>
  );
}

export function PrevTopPage() {
  const { pathname } = useLocation();

  useEffect(
    function () {
      window.scrollTo(0, 0);
    },
    [pathname]
  );

  return null;
}
