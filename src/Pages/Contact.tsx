import { Link } from "react-router-dom";
import facebook from "../assets/socials/facebook.png";
import linkedin from "../assets/socials/linkedin.png";
import twitter from "../assets/socials/twitter.png";
import { FormEvent, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import AlertBox from "../Utilities/AlertBox";
import PageHeader from "./PageHeader";

function Contact() {
  const [name, setName] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isMessageSending, setisMessagesending] = useState<boolean>(false);
  const [messageSent, setMessageSent] = useState<boolean>(false);

  useEffect(
    function () {
      if (messageSent) {
        const timeOut = setTimeout(() => {
          setMessageSent(false);
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
      setisMessagesending(true);
      if (!clientEmail && !message) return;
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );
      console.log(response);
      if (response.status !== 200) throw new Error("Email not sent!");
      setMessageSent(true);
      setName("");
      setClientEmail("");
      setMessage("");
    } catch (error) {
      console.log(error as Error);
    } finally {
      setisMessagesending(false);
    }
  };

  return (
    <div className="contact">
      {messageSent && <AlertBox />}

      <PageHeader>
        <h1>Contact Us</h1>
        <span>
          <Link to="/">Home</Link> / Contact Us
        </span>
      </PageHeader>

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
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>
                  <label htmlFor="email">
                    Email
                    <input
                      type="text"
                      id="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                    />
                  </label>
                </div>
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
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
                  <span>Address</span>
                  <br />
                  4321 California St,
                  <br /> San Francisco, CA 12345
                </p>
              </div>
              <div className="contact-item">
                <p>
                  <span>Phone</span>
                  <br /> +1 123 456 1234
                </p>
              </div>
              <div className="contact-item">
                <p>
                  <span>Email</span> <br />
                  info@company.com
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
