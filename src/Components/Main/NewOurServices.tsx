import { BiSolidLandmark } from "react-icons/bi";
import { FaBath, FaHouseChimney, FaWarehouse } from "react-icons/fa6";
import { MdLandscape } from "react-icons/md";

const NewOurServices = () => {
  const services = [
    {
      title: "Sale",
      description: "Expert guidance for property sales",
      icon: <MdLandscape />,
    },
    {
      title: "Rent",
      description: "Comprehensive rental solutions",
      icon: <FaHouseChimney />,
    },
    {
      title: "Joint Ventures",
      description: "Strategic partnership opportunities",
      icon: <BiSolidLandmark />,
    },
    {
      title: "Shortlet",
      description: "Flexible short-term arrangements",
      icon: <FaBath />,
    },
    {
      title: "Off-Plan",
      description: "Investment in future developments",
      icon: <FaWarehouse />,
    },
  ];

  return (
    <div className="bespoke-services">
      <h2 className="bespoke-services__title">Our Bespoke Services</h2>
      <div className="bespoke-services__grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-card__icon">{service.icon}</div>
            <h3 className="service-card__title">{service.title}</h3>
            <p className="service-card__description">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewOurServices;
