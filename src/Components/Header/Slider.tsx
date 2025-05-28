function Slider() {
  return (
    <section aria-label="Image Carousel">
      <a href="#slider-controls" className="skip-link">
        Skip Image Slider Controls
      </a>
      <div className="header-image">
        <video
          autoPlay
          muted
          loop
          playsInline
          title="Header background video"
          style={{
            width: "100%",
            height: "90vh",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <source src="/landacre.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}

export default Slider;

// import { useEffect, useState } from "react";

// import tw1 from "../../assets/greystone_tower/tw1.jpg";
// import tw5 from "../../assets/greystone_tower/tw5.jpg";
// import yt1 from "../../assets/yabatech/yt1.jpg";
// import ygr1 from "../../assets/yellow-gate-residence/ygr1.jpg";
// import ygr2 from "../../assets/yellow-gate-residence/ygr2.jpg";

// const slides = [
//   {
//     src: ygr1,
//     alt: "header carousel",
//   },
//   {
//     src: yt1,
//     alt: "header carousel",
//   },
//   {
//     src: tw1,
//     alt: "header carousel",
//   },
//   {
//     src: tw5,
//     alt: "header carousel",
//   },
//   {
//     src: ygr2,
//     alt: "header carousel",
//   },
// ];

// function Slider() {
//   const [curIndex, setCurIndex] = useState<number>(0);

//   function handlePrev() {
//     const isFirstSlide = curIndex === 0 ? slides.length - 1 : curIndex - 1;
//     setCurIndex(isFirstSlide);
//   }
//   function handleNext() {
//     const isFirstSlide = curIndex === slides.length - 1 ? 0 : curIndex + 1;
//     setCurIndex(isFirstSlide);
//   }

//   function handleSlide(index: number) {
//     setCurIndex(index);
//   }

//   useEffect(function () {
//     const interval = setInterval(() => {
//       setCurIndex((prevIndex) => (prevIndex + 1) % slides.length);
//     }, 8000);
//     return () => clearInterval(interval);
//   }, []);

//   const slideSytles = {
//     translate: `${-100 * curIndex}%`,
//   };

//   return (
//     <section aria-label="Image Carousel">
//       <a href="#slider-controls" className="skip-link">
//         Skip Image Slider Controls
//       </a>
//       <div className="header-image">
//         {slides.map((slide, index) => (
//           <img
//             key={index}
//             src={slide.src}
//             alt={slide.alt}
//             style={slideSytles}
//             aria-hidden={curIndex !== index}
//             title="Header display image"
//             loading={index < 5 ? "eager" : "lazy"}
//             width="100%"
//             height="100%"
//           />
//         ))}

//         <span></span>
//       </div>
//       <div className="slider-index">
//         {slides.map((_, index) => (
//           <button
//             aria-label={`View Image ${index + 1}`}
//             key={index}
//             onClick={() => handleSlide(index)}
//             style={{ background: curIndex === index ? "#b6b63c" : "" }}
//           ></button>
//         ))}
//       </div>
//       <div className="slider-btn">
//         <button aria-label="View Previous Image" onClick={handlePrev}>
//           &#x2039;
//         </button>
//         <button aria-label="View Next Image" onClick={handleNext}>
//           &#x203A;
//         </button>
//       </div>
//       <div id="slider-controls" />
//     </section>
//   );
// }

// export default Slider;
