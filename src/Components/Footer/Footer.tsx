import { FormEvent, useEffect, useState } from "react";
import facebook from "../../assets/socials/facebook.png";
import instagram from "../../assets/socials/instagram.png";
import linkedin from "../../assets/socials/linkedin.png";
import twitter from "../../assets/socials/twitter.png";
import emailjs from "@emailjs/browser";
import AlertBox from "../../Utilities/AlertBox";
import { Link } from "react-router-dom";

function Footer() {
  const [clientEmail, setClientEmail] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);

  useEffect(
    function () {
      if (emailSent) {
        const timeOut = setTimeout(() => {
          setEmailSent(false);
        }, 5000);

        return () => clearTimeout(timeOut);
      }
    },
    [emailSent]
  );

  const handleSubmit = async function (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const serviceId = "service_7uvbyms";
    const templateId = "template_n9yywq9";
    const publicKey = "NUCZEfqoTrlkgELZ4";

    const templateParams = {
      from_email: clientEmail,
      to_name: "ifeanyi",
    };

    try {
      setIsSending(true);
      if (!clientEmail) return;
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );
      if (response.status !== 200) throw new Error("Email not sent.");
      console.log("SUCCESS!", response.status, response.text);
      setClientEmail("");
      setEmailSent(true);
    } catch (error) {
      console.log(error as Error);
    } finally {
      setIsSending(false);
    }
  };
  return (
    <footer className="footer">
      {emailSent && <AlertBox />}
      <div className="container">
        <div className="row">
          <div className="information col">
            <h4>Information</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="service/buy">Our Properties</Link>
              </li>
              <li>
                <Link to="about">Our Services</Link>
              </li>
              <li>
                <Link to="contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="newsletter col">
            <h4>Newsletter</h4>

            <form className="form-inline" role="form" onSubmit={handleSubmit}>
              <label htmlFor="">
                Get notified about the latest properties in our marketplace.
              </label>
              <input
                type="text"
                placeholder="Enter your email address"
                className="form-control"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                disabled={isSending}
              />
              <button type="submit" disabled={isSending}>
                {isSending ? "Sending..." : "Notify Me!"}
              </button>
            </form>
          </div>

          <div className="follow-us col">
            <h4>Follow us</h4>
            <div>
              <Link to="#">
                <img src={facebook} alt="facebook" />
              </Link>
              <Link to="#">
                <img src={twitter} alt="twitter" />
              </Link>
              <Link to="#">
                <img src={linkedin} alt="linkedin" />
              </Link>
              <Link to="#">
                <img src={instagram} alt="instagram" />
              </Link>
            </div>
          </div>

          <div className="contact-us col">
            <h4>Contact us</h4>
            <div>
              <span>Phoenix Global Properties.</span>
              <span className="glyphicon glyphicon-map-marker">
                4th floor, Adeboyega Adeleke and co
              </span>{" "}
              <span>8 Strchan str off Igbosere road,</span>
              <span>Lagos-Island, Lagos</span>
              <span className="glyphicon glyphicon-envelope">
                info@1502properties.com
              </span>
              <span className="glyphicon glyphicon-earphone">
                +234 809 606 8042
              </span>
            </div>
          </div>
        </div>
        <p className="copyright"> © Phoenix Global Propertes - 2024. </p>
      </div>
    </footer>
  );
}

export default Footer;
