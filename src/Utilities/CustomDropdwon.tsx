import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import useProperty from "../context/useProperty";
import { useNavigate } from "react-router-dom";

interface CustomDropdownProps {
  uniqueTypes: string[];
}

const typeLabelMap: Record<string, string> = {
  lfs: "Land for Sale",
  cfs: "Commercial Property for Sale",
  afs: "Apartment for Sale",
  hfs: "House for Sale",
  lfl: "Land for Lease",
  cfl: "Commercial Property for Lease",
  afl: "Apartment for Lease",
  hfl: "House for Lease",
  ls: "Long Lease",
};

const CustomDropdown: React.FC<CustomDropdownProps> = ({ uniqueTypes }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { selectedType, setSelectedType, propertyType } = useProperty();

  const navigate = useNavigate();

  const handleSelect = (type: string) => {
    setSelectedType(type);
    setIsOpen(false);
    navigate(`/service/${propertyType}/${type ? type : ""}`);
  };

  return (
    <div className="custom-drop" style={{ position: "relative" }}>
      <div
        className="btn"
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          color: "#f5f5f5",
          background: "#1e2228",
          borderRadius: "4px",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {typeLabelMap[selectedType] || "Filter by property type"}
        <span>{isOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
      </div>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            width: "100%",
            marginTop: "0.3rem",
            border: "1px solid #b6b63c",
            backgroundColor: "#fff",
            borderRadius: "4px",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 10,
          }}
        >
          {uniqueTypes.map((type) => (
            <div
              key={type}
              onClick={() => handleSelect(type)}
              style={{
                padding: "0.5rem",
                cursor: "pointer",
                backgroundColor: selectedType === type ? "#eee" : "transparent",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLDivElement).style.background = "#eee";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLDivElement).style.background =
                  selectedType === type ? "#eee" : "transparent";
              }}
            >
              {typeLabelMap[type] || type}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
