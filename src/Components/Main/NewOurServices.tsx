import { BiSolidLandmark } from "react-icons/bi";
import { FaBath, FaHouseChimney, FaWarehouse } from "react-icons/fa6";
import { MdLandscape } from "react-icons/md";
import useProperty from "../../context/useProperty";
import { useNavigate } from "react-router-dom";

const NewOurServices = () => {
  const { setPropertyType, setIsPageHeaderShown, dispatch } = useProperty();

  const navigate = useNavigate();

  const services = [
    {
      title: "Sale",
      description: "sourcing and high-value acquisitions",
      icon: <MdLandscape />,
    },
    {
      title: "Leasing/Rent",
      description:
        "Managing the leasing/renting of exclusive luxury residences and corporate spaces for optimal returns",
      icon: <FaHouseChimney />,
    },
    {
      title: "Joint-Ventures",
      description:
        "Identifying and structuring high-yield joint ventures with verified developers for maximum returns",
      icon: <BiSolidLandmark />,
    },
    {
      title: "Shortlet",
      description: "Curated services for short-term rental in prime locations",
      icon: <FaBath />,
    },
    {
      title: "Off-Plan",
      description:
        "off-market opportunities in future developments for significant pre-launch capital appreciation",
      icon: <FaWarehouse />,
    },
  ];

  function handleServicePage(link: string) {
    setPropertyType(link);
    navigate(`service/${link}`);
    setIsPageHeaderShown(true);
    dispatch({ type: "activeProperty", payload: link });
  }

  return (
    <div className="bespoke-services">
      <h2 className="bespoke-services__title">Our Bespoke Services</h2>
      <div className="bespoke-services__grid">
        {services.map((service, index) => (
          <div
            key={index}
            className="service-card"
            onClick={() =>
              handleServicePage(
                service.title === "Leasing/Rent"
                  ? "rent"
                  : service.title.toLowerCase()
              )
            }
          >
            <div className="service-card__icon">{service.icon}</div>
            <h3 className="service-card__title">
              {service.title.replace(/-/g, " ")}
            </h3>
            <p className="service-card__description">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewOurServices;
