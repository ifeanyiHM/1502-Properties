import { ToastContainer } from "react-toastify";
import PropertyFormComponent from "../ui/PropertyFormComponent";

function PropertyForm() {
  return (
    <>
      <ToastContainer />
      <div className="property-form-container">
        <div className="backimg"></div>
        <PropertyFormComponent title="Add Property" />
      </div>
    </>
  );
}

export default PropertyForm;
