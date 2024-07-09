import { Link } from "react-router-dom";
import facebook from "../assets/socials/facebook.png";
import linkedin from "../assets/socials/linkedin.png";
import twitter from "../assets/socials/twitter.png";
import { FormEvent, useEffect, useReducer } from "react";
import emailjs from "@emailjs/browser";
import AlertBox from "../Utilities/AlertBox";
// import PageHeader from "./PageHeader";

interface StateProps {
  name: string;
  clientEmail: string;
  message: string;
  isMessageSending: boolean;
  messageSent: boolean;
}

interface ActionProps {
  type: string;
  payload?: string | boolean;
}

const initialState = {
  name: "",
  clientEmail: "",
  message: "",
  isMessageSending: false,
  messageSent: false,
};

function reducer(state: StateProps, action: ActionProps) {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload as string };
    case "email":
      return { ...state, clientEmail: action.payload as string };
    case "message":
      return { ...state, message: action.payload as string };
    case "sent":
      return { ...state, messageSent: action.payload as boolean };
    case "sending":
      return { ...state, isMessageSending: action.payload as boolean };
    case "reset":
      return initialState;
    default:
      throw new Error("unknown action");
  }
}

function Contact() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { name, clientEmail, message, isMessageSending, messageSent } = state;

  useEffect(
    function () {
      if (messageSent) {
        const timeOut = setTimeout(() => {
          dispatch({ type: "sent", payload: false });
        }, 5000);

        return () => clearTimeout(timeOut);
      }
    },
    [messageSent]
  );

  const handleSubmit = async function (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const serviceId = "service_7uvbyms";
    const templateId = "template_lei4j7a";
    const publicKey = "NUCZEfqoTrlkgELZ4";

    const templateParams = {
      from_name: name,
      from_email: clientEmail,
      message,
      to_name: "Ifeanyi",
    };

    try {
      dispatch({ type: "sending", payload: true });
      if (!clientEmail && !message) return;
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );
      console.log(response);
      if (response.status !== 200) throw new Error("Email not sent!");
      dispatch({ type: "sent", payload: true });
    } catch (error) {
      console.log(error as Error);
    } finally {
      dispatch({ type: "sending", payload: false });
    }
  };

  return (
    <div className="contact">
      {messageSent && <AlertBox />}

      {/* <PageHeader>
        <h1>Contact Us</h1>
        <span>
          <Link to="/">Home</Link> / Contact Us
        </span>
      </PageHeader> */}

      <div className="form-container">
        <div className="background-container">
          <div className="ct">
            <div className="form">
              <h2>Get In Touch</h2>
              <p className="form-desc">
                Please fill out the form below to send us an email and we will
                get back to you as soon as possible.
              </p>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name">
                    Name
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) =>
                        dispatch({ type: "name", payload: e.target.value })
                      }
                    />
                  </label>
                  <label htmlFor="email">
                    Email
                    <input
                      type="text"
                      id="email"
                      value={clientEmail}
                      onChange={(e) =>
                        dispatch({ type: "email", payload: e.target.value })
                      }
                    />
                  </label>
                </div>
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  id="message"
                  value={message}
                  onChange={(e) =>
                    dispatch({ type: "message", payload: e.target.value })
                  }
                ></textarea>
                <button
                  type="submit"
                  disabled={isMessageSending}
                  className={isMessageSending ? "isSending" : ""}
                >
                  {isMessageSending ? "SENDING..." : "SEND MESSAGE"}
                  <span></span>
                </button>
              </form>
            </div>

            <div className="contact-info">
              <h4>Contact Info</h4>
              <div className="contact-item">
                <p>
                  <span className="glyphicon glyphicon-map-marker">
                    Account building,
                  </span>
                  <br />
                  <span>Nigerian Railway Coporation HQ</span>
                  <br />
                  <span>Ebute-Metta, Lagos</span>
                </p>
              </div>
              <div className="contact-item">
                <p>
                  <span>Phone</span>
                  <br /> +234 809 606 8042
                </p>
              </div>
              <div className="contact-item">
                <p>
                  <span>Email</span> <br />
                  info@1502properties.com
                </p>
              </div>
            </div>
          </div>
          <ul>
            <li>
              <Link to="#">
                <img src={facebook} alt="facebook" />
              </Link>
            </li>
            <li>
              <Link to="#">
                <img src={twitter} alt="twitter" />
              </Link>
            </li>
            <li>
              <Link to="#">
                <img src={linkedin} alt="linkedin" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Contact;
