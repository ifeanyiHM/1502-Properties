import { useNavigate } from "react-router-dom";
import headerImage1 from "../../assets/carousel1.jpg";
import headerImage2 from "../../assets/carousel2.jpg";
import p1 from "../../assets/property-1.jpg";
import p2 from "../../assets/property-2.jpg";
import p3 from "../../assets/property-3.jpg";

const slides = [
  {
    src: headerImage1,
    title: "Buy",
    link: "buy",
    count: 50,
  },
  {
    src: headerImage2,
    title: "Rent",
    link: "rent",
    count: 120,
  },
  {
    src: p1,
    title: "Shortlet",
    link: "shortlet",
    count: 21,
  },
  {
    src: p2,
    title: "Long Lease",
    link: "long-lease",
    count: 35,
  },
  {
    src: p3,
    title: "Joint Ventures",
    link: "joint-ventures",
    count: 15,
  },
];

interface OurServicesProps {
  setPropertyType: (type: string) => void;
}

function OurServices({ setPropertyType }: OurServicesProps) {
  const navigate = useNavigate();

  function handleServicePage(link: string) {
    setPropertyType(link);
    navigate(`service/${link}`);
  }

  const slideSytles = {
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="services" id="service">
      <h2>Our Services</h2>
      <div className="grid-container">
        {slides.map(({ src, title, link, count }, index) => (
          <div
            key={index}
            style={{ ...slideSytles, backgroundImage: `url(${src})` }}
            onClick={() => handleServicePage(link)}
          >
            <div className="service-item">
              <h3>{title}</h3>
              <p>{count} Properties</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurServices;
