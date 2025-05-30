import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { slides } from "../../Data/propertyData";
import useProperty from "../../context/useProperty";

function Slider() {
  const { curIndex, setCurIndex } = useProperty();

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
