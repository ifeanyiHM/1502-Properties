import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import useProperty from "../context/useProperty";
import { propertySummaryProps } from "../Data/propertyData";
import {
  approveProperty,
  getPendingProperties,
  rejectProperty,
} from "../services/apiAdmin";
import PropertyFormComponent from "../ui/PropertyFormComponent";
import { Spinner } from "../Utilities/Spinner";

export default function ApproveProperties() {
  const [pending, setPending] = useState<propertySummaryProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] =
    useState<propertySummaryProps | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { fetchProperties } = useProperty();

  const fetchPendingProperties = async () => {
    setLoading(true);
    try {
      const data = await getPendingProperties();
      setPending(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        toast.error("Failed to fetch pending property: " + err.message);
      } else {
        console.error("An unknown error occurred:", err);
        toast.error("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingProperties();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      setApprovingId(id);
      await approveProperty(id);
      setPending((prev) => prev.filter((item) => item.id !== id));
      toast.success("Property approved successfully!");
      fetchProperties();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        toast.error("Failed to approve property: " + err.message);
      } else {
        console.error("An unknown error occurred:", err);
        toast.error("An unknown error occurred.");
      }
    } finally {
      setApprovingId(null);
    }
  };

  const handleReject = async (id: string) => {
    const confirm = window.confirm(
      "Are you sure you want to reject and delete this property?"
    );
    if (!confirm) return;

    try {
      setRejectingId(id);
      await rejectProperty(id);
      setPending((prev) => prev.filter((item) => item.id !== id));
      toast.success("Property rejected and removed.");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        toast.error("Failed to reject property: " + err.message);
      } else {
        console.error("Unknown error:", err);
        toast.error("An unknown error occurred.");
      }
    } finally {
      setRejectingId(null);
    }
  };

  const closeModal = () => {
    setSelectedProperty(null);
    setCarouselIndex(0);
  };

  const handlePrev = () => {
    if (!selectedProperty) return;
    setCarouselIndex((prev) =>
      prev === 0 ? selectedProperty.src.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    if (!selectedProperty) return;
    setCarouselIndex((prev) =>
      prev === selectedProperty.src.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
      {" "}
      <ToastContainer />
      <div className="approve-properties">
        <h1>
          Pending Properties for Approval{" "}
          <span style={{ fontWeight: "normal", fontSize: "1rem" }}>
            (Click the tab for more details on the property)
          </span>
        </h1>

        <p>
          {pending.length} properties {pending.length > 1 ? "are" : "is"}{" "}
          awaiting admin's approval.
        </p>

        {loading ? (
          <Spinner />
        ) : pending.length === 0 ? (
          <p className="empty">No pending properties.</p>
        ) : (
          <ul className="property-list">
            {pending.map((property) => {
              // console.log(property);
              return (
                <li key={property.id}>
                  <div
                    key={property.id}
                    className="property-item"
                    onClick={() => setSelectedProperty(property)}
                  >
                    <div className="details">
                      <h2>
                        {property.title.toUpperCase()} (
                        {property.code?.toUpperCase()})
                      </h2>
                      <p>{property.location}</p>
                      <p>{property.price}</p>
                    </div>
                    <div style={{ margin: 0 }}>
                      <button
                        className="reject-btn"
                        style={{ backgroundColor: "#333333" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingId((prev) =>
                            prev === property.id ? null : property.id
                          );
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReject(property.id);
                        }}
                        className="reject-btn"
                        disabled={rejectingId === property.id}
                      >
                        {rejectingId === property.id
                          ? "Rejecting..."
                          : "Reject"}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // prevent modal open
                          handleApprove(property.id);
                        }}
                        className="approve-btn"
                        disabled={approvingId === property.id}
                      >
                        {approvingId === property.id
                          ? "Approving..."
                          : "Approve"}
                      </button>
                    </div>
                  </div>
                  {editingId === property.id && (
                    <PropertyFormComponent
                      title="Edit Property"
                      fetchPendingProperties={fetchPendingProperties}
                      setEditingId={setEditingId}
                      propertyToEdit={{
                        ...property,
                        src: property.src, // keep or convert to FileList if needed
                        subtitle: property.subtitle?.join(", ") ?? "",
                        suitability: property.suitability?.join(", ") ?? "",
                        details: property.details?.join(", ") ?? "",
                      }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        )}

        {selectedProperty && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={closeModal}>
                ✕
              </button>
              <h2>{selectedProperty.title}</h2>

              <div className="carousel">
                {selectedProperty.src[carouselIndex].match(
                  /\.(mp4|webm|ogg)$/i
                ) ? (
                  <video
                    src={selectedProperty.src[carouselIndex]}
                    controls
                    autoPlay
                    loop
                  />
                ) : (
                  <img
                    src={selectedProperty.src[carouselIndex]}
                    alt={`property-${carouselIndex}`}
                  />
                )}
                {selectedProperty.src.length > 1 && (
                  <div className="carousel-controls">
                    <button onClick={handlePrev}>‹</button>
                    <span>
                      {carouselIndex + 1} / {selectedProperty.src.length}
                    </span>
                    <button onClick={handleNext}>›</button>
                  </div>
                )}
              </div>

              <div className="property-info">
                <p>
                  <strong>Code:</strong> {selectedProperty.code?.toUpperCase()}
                </p>
                <p>
                  <strong>Type:</strong> {selectedProperty.type}
                </p>
                {selectedProperty.subtype && (
                  <p>
                    <strong>Category:</strong> {selectedProperty.subtype}
                  </p>
                )}
                <p>
                  <strong>More info:</strong>{" "}
                  {selectedProperty.subtitle?.join(", ")}
                </p>
                <p>
                  <strong>Location:</strong> {selectedProperty.location}
                </p>
                <p>
                  <strong>Price:</strong> {selectedProperty.price}
                </p>
                <p>
                  <strong>Suitability:</strong>{" "}
                  {selectedProperty.suitability?.join(", ")}
                </p>
                <p>
                  <strong>Details:</strong>{" "}
                  {selectedProperty.details?.join(", ")}
                </p>
                {/* <p>
                <strong>User Email:</strong>{" "}
                {selectedProperty?.user_email || "N/A"}
          
              </p>
              <p>
                <strong>User Name:</strong>{" "}
                {selectedProperty?.user_name || "N/A"}
              
              </p> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
