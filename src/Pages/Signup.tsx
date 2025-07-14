import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { handleGoogleLogin, signup } from "../services/apiAuth";
import EmailConfirmModal from "../ui/EmailConfirmModal";
import { SpinnerMini } from "../Utilities/Spinner";

interface FormFields {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  // confirmPassword: string;
  userType: string;
  profilePhoto: string;
}

interface FormErrors {
  [key: string]: string;
}

const Signup = () => {
  const [form, setForm] = useState<FormFields>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    // confirmPassword: "",
    userType: "",
    profilePhoto: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear field error as user types
  };

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Email is invalid";

    if (!form.phone) newErrors.phone = "Phone number is required";
    else if (!/^\d{10,15}$/.test(form.phone))
      newErrors.phone = "Phone number is invalid";

    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 8 characters";

    // if (!form.confirmPassword)
    //   newErrors.confirmPassword = "Please confirm your password";
    // else if (form.password !== form.confirmPassword)
    //   newErrors.confirmPassword = "Passwords do not match";

    if (!form.userType) newErrors.userType = "Please select your role";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const { data, error } = await signup({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        userType: form.userType,
        password: form.password,
        profilePhoto: "",
      });

      if (error) throw error;

      console.log("Signed up:", data);
      if (!data.session) {
        setShowConfirmModal(true);
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrors({ general: error.message });
      } else {
        setErrors({ general: "An unexpected error occurred" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {" "}
      {showConfirmModal && <EmailConfirmModal />}
      <div className="signup-container">
        <div className="backimg">
          {" "}
          <div className="logo">
            <Link to="/">
              <img
                src="/website_logo.svg"
                alt="company's logo"
                title="1502 Property Logo"
                loading="lazy"
                // width="112"
                // height="45.28"
              />
            </Link>
          </div>
        </div>
        <div className="define">
          <div className="signup">
            <form className="login-form" onSubmit={handleSubmit}>
              <h2>Create Account</h2>

              {errors.general && (
                <p
                  className="error"
                  style={{
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  {errors.general}
                </p>
              )}

              <div className="form-group">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={form.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && <p className="error">{errors.fullName}</p>}
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                />
                {errors.phone && <p className="error">{errors.phone}</p>}
              </div>

              <div className="form-group">
                <div className="password">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password (8 characters or more)"
                    value={form.password}
                    onChange={handleChange}
                  />
                  <span onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </span>
                </div>
                {errors.password && <p className="error">{errors.password}</p>}
              </div>

              {/* <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="error">{errors.confirmPassword}</p>
              )}
            </div> */}

              {/* <div className="form-group">
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="userType"
                      value="agent"
                      checked={form.userType === "agent"}
                      onChange={handleChange}
                    />
                    Agent
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="userType"
                      value="client"
                      checked={form.userType === "client"}
                      onChange={handleChange}
                    />
                    Client
                  </label>{" "}
                </div>

                {errors.userType && <p className="error">{errors.userType}</p>}
              </div> */}

              <button className="login-button" type="submit" disabled={loading}>
                Sign Up{" "}
                {loading && (
                  <span className="loading">
                    <SpinnerMini />
                  </span>
                )}
              </button>
            </form>

            <div className="or">
              <hr />
              <span>or</span>
              <hr />
            </div>

            <button className="google-btn" onClick={handleGoogleLogin}>
              <FcGoogle className="google-icon" />
              <span>Continue with Google</span>
            </button>

            <p>
              Already have an account? <Link to="/login">Log In</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
