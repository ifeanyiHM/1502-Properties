interface PropertyRequest {
  transactionType: string;
  propertyType: string;
  location: string;
  budgetMin: string;
  budgetMax: string;
  bedrooms: string;
  preferences: string;
  additionalInfo: string;
  clientType: string;
}

const mockData: PropertyRequest[] = [
  {
    transactionType: "Buy",
    propertyType: "House",
    location: "Lekki, Lagos",
    budgetMin: "50000000",
    budgetMax: "100000000",
    bedrooms: "4",
    preferences: "Furnished, swimming pool",
    additionalInfo: "Prefer a gated estate",
    clientType: "Client",
  },
  {
    transactionType: "Rent",
    propertyType: "Flat/Apartment",
    location: "Abuja",
    budgetMin: "2000000",
    budgetMax: "3500000",
    bedrooms: "2",
    preferences: "Serviced, with generator",
    additionalInfo: "",
    clientType: "Agent",
  },
  {
    transactionType: "Rent",
    propertyType: "Flat/Apartment",
    location: "Abuja",
    budgetMin: "2000000",
    budgetMax: "3500000",
    bedrooms: "2",
    preferences: "Serviced, with generator",
    additionalInfo: "",
    clientType: "Agent",
  },
  {
    transactionType: "Rent",
    propertyType: "Flat/Apartment",
    location: "Abuja",
    budgetMin: "2000000",
    budgetMax: "3500000",
    bedrooms: "2",
    preferences: "Serviced, with generator",
    additionalInfo: "",
    clientType: "Agent",
  },
  {
    transactionType: "Rent",
    propertyType: "Flat/Apartment",
    location: "Abuja",
    budgetMin: "2000000",
    budgetMax: "3500000",
    bedrooms: "2",
    preferences: "Serviced, with generator",
    additionalInfo: "",
    clientType: "Agent",
  },
];

const ViewPropertyRequest = () => {
  if (mockData.length === 0)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          placeContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        <h2>There is not property requested by any customer.</h2>
      </div>
    );

  return (
    <div className="view-requests">
      <h2>Submitted Property Requests</h2>
      <div className="requests-grid">
        {mockData.map((item, index) => (
          <div key={index} className="request-card">
            <h3>
              {item.transactionType} a {item.propertyType}
            </h3>
            <p>
              <strong>Location:</strong> {item.location}
            </p>
            <p>
              <strong>Bedrooms:</strong> {item.bedrooms}
            </p>
            <p>
              <strong>Budget:</strong> ₦{item.budgetMin} - ₦{item.budgetMax}
            </p>
            {item.preferences && (
              <p>
                <strong>Preferences:</strong> {item.preferences}
              </p>
            )}
            {item.additionalInfo && (
              <p>
                <strong>Extra Info:</strong> {item.additionalInfo}
              </p>
            )}
            <p>
              <strong>Client Type:</strong> {item.clientType}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewPropertyRequest;
