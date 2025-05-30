import { useEffect, useState } from "react";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import tw1 from "../../assets/greystone_tower/tw1.jpg";
import tw5 from "../../assets/greystone_tower/tw5.jpg";
import yt1 from "../../assets/yabatech/yt1.jpg";
import ygr1 from "../../assets/yellow-gate-residence/ygr1.jpg";
import ygr2 from "../../assets/yellow-gate-residence/ygr2.jpg";

const slides = [
  {
    src: ygr1,
    alt: "header carousel",
  },
  {
    src: yt1,
    alt: "header carousel",
  },
  {
    src: tw1,
    alt: "header carousel",
  },
  {
    src: tw5,
    alt: "header carousel",
  },
  {
    src: ygr2,
    alt: "header carousel",
  },
];

function Slider() {
  const [curIndex, setCurIndex] = useState<number>(0);

  function handlePrev() {
    const isFirstSlide = curIndex === 0 ? slides.length - 1 : curIndex - 1;
    setCurIndex(isFirstSlide);
  }
  function handleNext() {
    const isFirstSlide = curIndex === slides.length - 1 ? 0 : curIndex + 1;
    setCurIndex(isFirstSlide);
  }

  function handleSlide(index: number) {
    setCurIndex(index);
  }

  useEffect(function () {
    const interval = setInterval(() => {
      setCurIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const slideSytles = {
    translate: `${-100 * curIndex}%`,
  };

  return (
    <section aria-label="Image Carousel">
      <a href="#slider-controls" className="skip-link">
        Skip Image Slider Controls
      </a>
      <div className="header-image">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide.src}
            alt={slide.alt}
            style={slideSytles}
            aria-hidden={curIndex !== index}
            title="Header display image"
            loading={index < 5 ? "eager" : "lazy"}
            width="100%"
            height="100%"
          />
        ))}

        {/* {slides.map((slide, index) => (
          <div key={index} style={slideSytles}>
            <img
              src={slide.src}
              alt={slide.alt}
              aria-hidden={curIndex !== index}
              title="Header display image"
              loading={index < 5 ? "eager" : "lazy"}
              width="100%"
              height="100%"
            />
            <span>{slide.alt}</span>
          </div>
        ))} */}

        <span></span>
      </div>
      <div className="slider-index">
        {slides.map((_, index) => (
          <button
            aria-label={`View Image ${index + 1}`}
            key={index}
            onClick={() => handleSlide(index)}
            style={{ background: curIndex === index ? "#213547" : "" }}
          ></button>
        ))}
      </div>
      <div className="slider-btn">
        <div className="circle-container" onClick={handlePrev}>
          <button className="circle-button" aria-label="View Previous Image">
            <IoIosArrowBack />
          </button>
        </div>
        <div className="circle-container" onClick={handleNext}>
          <button className="circle-button" aria-label="View Next Image">
            <IoIosArrowForward />
          </button>
        </div>
      </div>
      <div id="slider-controls" />
    </section>
  );
}

export default Slider;
