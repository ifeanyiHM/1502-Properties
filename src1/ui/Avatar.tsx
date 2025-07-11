import { useEffect, useRef, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { MdOutlinePhonelinkRing } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import useProperty from "../context/useProperty";
import supabase from "../services/supabase";
import Logout from "./Logout";

const Avatar = () => {
  const [fullName, setFullName] = useState("User");
  const [userType, setUserType] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { refreshUser } = useProperty();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const userName = user.user_metadata?.fullName || user.email;
        const type = user.user_metadata?.userType || user.email;
        const avatar = user.user_metadata.avatar;
        setFullName(userName);
        setUserType(type);
        setProfilePhoto(avatar);
      }
    };

    getUser();
  }, [refreshUser]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setShowCard(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="avatar-wrapper" ref={cardRef}>
      <div className="avatar">
        <img
          src={
            profilePhoto ||
            "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
          }
          alt="avatar"
          onClick={() => setShowCard((prev) => !prev)}
          className="avatar-img"
        />
        <span className="username">{fullName}</span>
      </div>

      {showCard && (
        <div className="profile-card">
          <div className="top-section">
            <img
              src={
                profilePhoto ||
                "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
              }
              alt="avatar"
              className="avatar-large"
            />
            <div>
              <h4>{fullName}</h4>
              <span className="subtitle">{userType}</span>
            </div>
          </div>

          <div className="status">
            <span>Online</span>
            <span className="online-dot" />
          </div>

          <ul className="card-options">
            <li>
              <span className="icon">
                <FaRegUserCircle />
              </span>{" "}
              <span> Your profile</span>
            </li>
            <li onClick={() => navigate("/settings")}>
              <span className="icon">
                <FiSettings />
              </span>{" "}
              <span> Account settings</span>
            </li>
            <li>
              <span className="icon">
                <MdOutlinePhonelinkRing />
              </span>{" "}
              <span> Contact us</span>
            </li>
          </ul>
          <div className="logout-area">
            <span className="icon">
              <TbLogout2 />
            </span>{" "}
            <Logout />
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;
