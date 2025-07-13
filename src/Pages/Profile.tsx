import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { IoAddCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import useAuth from "../context/useAuth";
import useProperty from "../context/useProperty";
import supabase from "../services/supabase";
import PropertyCard from "../ui/PropertyCard";

export default function Profile() {
  const [userEmail, setUserEmail] = useState("");
  const [fullName, setFullName] = useState("User");
  const [userType, setUserType] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [userid, setUserid] = useState("");

  const { propertyData, propertyType } = useProperty();
  const { refreshUser } = useAuth();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const userName = user.user_metadata?.fullName;
        const type = user.user_metadata?.userType || "";
        const email = user.email || "";
        const avatar = user.user_metadata.avatar;
        const id = user.id || "";
        setFullName(userName);
        setUserType(type);
        setProfilePhoto(avatar);
        setUserEmail(email);
        setUserid(id);
      }
    };

    getUser();
  }, [refreshUser]);

  function capitalizeTitle(title: string): string {
    return title?.replace(/\b\w/g, (char) => char?.toUpperCase());
  }

  const myProperties = propertyData.filter(
    (property) => property.agentid === userid
  );

  return (
    <div className="profile-page service-page">
      <div className="profile-wrapper">
        {/* Banner */}
        <div className="banner" />

        {/* Profile Info */}
        <div className="profile-info">
          <div className="avatar">
            <img
              src={
                profilePhoto ||
                "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
              }
            />
          </div>
          <div className="info">
            <h2>{capitalizeTitle(fullName)}</h2>
            <p className="role">{userEmail}</p>
            <div className="meta">
              <span>
                <FaUser /> {capitalizeTitle(userType)}
              </span>
              <span>
                <HiOutlineBuildingOffice /> ({myProperties.length})
              </span>
              <Link to="/propertyForm">
                <span>
                  <IoAddCircleSharp /> Add property
                </span>
              </Link>
              <Link to="/setting">
                <span>
                  <FiSettings /> Settings
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <h3 className="profile-title">
        {myProperties.length === 0
          ? "You haven't uploaded any property yet."
          : `Your Uploaded Properties (${myProperties.length})`}
      </h3>
      <div className="content">
        {myProperties.map((sum, index) => (
          <PropertyCard
            key={index}
            sum={sum}
            index={index}
            capitalizeTitle={capitalizeTitle}
            propertyType={propertyType}
          />
        ))}
      </div>
    </div>
  );
}
