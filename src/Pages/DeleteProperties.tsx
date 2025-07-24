import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import useProperty from "../context/useProperty";
import { deleteProperty } from "../services/apiAdmin";
import PropertyCard from "../ui/PropertyCard";

function DeleteProperty() {
  const [query, setQuery] = useState("");
  const [approvingId, setApprovingId] = useState<string | null>(null);

  const { propertyType, propertyData, fetchProperties } = useProperty();

  const searchedProperties = propertyData.filter((item) =>
    `${item.title} ${item.location} ${item.code}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this property?"
    );
    if (!confirm) return;

    try {
      setApprovingId(id);
      await deleteProperty(id);

      toast.success("Property deleted successfully.");

      fetchProperties();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        toast.error("Failed to delete property: " + err.message);
      } else {
        console.error("Unknown error:", err);
        toast.error("An unknown error occurred.");
      }
    } finally {
      setApprovingId(null);
    }
  };

  function capitalizeTitle(title: string): string {
    return title?.replace(/\b\w/g, (char) => char?.toUpperCase());
  }

  return (
    <>
      <ToastContainer />
      <div className="service-page">
        <div className="input">
          <h1>Total Number of Properties ({searchedProperties.length})</h1>

          <input
            type="text"
            placeholder="search properties by location and title"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="content">
          {searchedProperties.map((property, index) => {
            if (!property) return <div key={index}>coming soon</div>;
            return (
              <div key={index} className="cont-cont">
                <PropertyCard
                  key={index}
                  sum={property}
                  index={index}
                  capitalizeTitle={capitalizeTitle}
                  propertyType={propertyType}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(property.id);
                  }}
                  className="delete-btn"
                  disabled={approvingId === property.id}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default DeleteProperty;
