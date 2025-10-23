import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { IoAddCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../context/useAuth";
import useProperty from "../context/useProperty";
import { propertySummaryProps } from "../Data/propertyData";
import { deleteProperties } from "../services/apiProperties";
import supabase from "../services/supabase";
import { Spinner } from "../Utilities/Spinner";
import NewPropertyCard from "../ui/NewPropertyCard";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function Profile() {
  const [userEmail, setUserEmail] = useState("");
  const [fullName, setFullName] = useState("User");
  const [userType, setUserType] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [userid, setUserid] = useState("");
  const [displayDetails, setDisplayDetails] = useState(false);
  const [myProperties, setMyProperties] = useState<propertySummaryProps[]>([]);
  const [approvingId, setApprovingId] = useState<number | null>(null);

  const { propertyData, propertyType, loadingProperties, fetchProperties } =
    useProperty();
  const { refreshUser } = useAuth();

  useEffect(function () {
    const mq = window.matchMedia("(min-width: 768px)");
    if (mq.matches) {
      setDisplayDetails(true);
    }
  }, []);

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
  }, []);

  function capitalizeTitle(title: string): string {
    return title?.replace(/\b\w/g, (char) => char?.toUpperCase());
  }

  useEffect(() => {
    const properties = propertyData.filter(
      (property) => property.agentid === userid
    );
    setMyProperties(properties);
  }, [propertyData, userid, refreshUser]);

  const handleDelete = async (id: number) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this property?"
    );
    if (!confirm) return;

    try {
      setApprovingId(id);
      await deleteProperties(id);

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

  if (loadingProperties) {
    return <Spinner />;
  }

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
            {displayDetails && (
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
            )}
          </div>
          <div
            className="more"
            onClick={() => setDisplayDetails((prev) => !prev)}
          >
            <button>•••</button>
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
          // <PropertyCard
          //   key={index}
          //   sum={sum}
          //   index={index}
          //   capitalizeTitle={capitalizeTitle}
          //   propertyType={propertyType}
          // />
          <div key={index} className="cont-cont">
            <NewPropertyCard
              key={index}
              sum={sum}
              index={index}
              capitalizeTitle={capitalizeTitle}
              propertyType={propertyType}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(+sum.id);
              }}
              className="delete-btn"
              disabled={approvingId === +sum.id}
            >
              <RiDeleteBin6Line />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
