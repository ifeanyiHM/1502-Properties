import { useEffect, useState } from "react";
import { FaAnglesUp, FaWhatsapp } from "react-icons/fa6";
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

  const handleWhatsAppClick = () => {
    const phoneNumber = "2347049943393";
    const message = "Hello, I’m interested in your services!";
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <button
        onClick={handleScrollToTop}
        className="scroll-top"
        style={{ display: isVisible ? "inline" : "none" }}
      >
        <FaAnglesUp />
      </button>

      <div className="whatsapp">
        <span
          style={{
            display: isVisible ? "inline" : "none",
          }}
        >
          Need help? Chat with us
        </span>
        <button
          onClick={handleWhatsAppClick}
          className="whatsapp-button"
          style={{
            display: isVisible ? "inline" : "none",
          }}
        >
          <FaWhatsapp />
        </button>
      </div>
    </>
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
