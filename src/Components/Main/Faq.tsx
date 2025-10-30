import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { TfiMinus } from "react-icons/tfi";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "What types of properties does 1502 Properties offer?",
    answer:
      "We offer a wide range of real estate options including residential homes, short lets, commercial properties, land parcels (including distressed land), and joint-venture investment opportunities.",
  },
  {
    question: "Where are your properties located?",
    answer:
      "Our offerings are focused in Lagos, Nigeria—especially high-growth areas like Victoria Island, Lagos Island, and surrounding communities.",
  },
  {
    question: "What is a distressed land sale?",
    answer:
      "A distressed land sale refers to plots offered at below-market prices, typically to enable quick transactions—ideal for commercial developers or long-term investors.",
  },
  {
    question: "Can I invest through a joint venture with 1502 Properties?",
    answer:
      "Yes! We facilitate joint-venture opportunities, allowing investors to partner with us on select projects like short lets, rentals, or commercial apartments.",
  },
  {
    question: "Do you provide property management or short-let services?",
    answer:
      "Yes, we offer short-let (rent) solutions and can manage your property, handling everything from tenant placement to ongoing maintenance.",
  },
  {
    question: "How can I view listings or do an advanced search?",
    answer:
      "You can use our online advanced search tool on the website to filter by property type, location, price range, or size.",
  },
  {
    question: "How do I get in touch to schedule a visit or ask questions?",
    answer:
      "You can contact us via email (info@1502properties.com), call +234 809 606 8042, or visit our office at 8 Strachan Street, Lagos Island.",
  },
  {
    question: "Are your listings verified?",
    answer:
      "Absolutely—every listing is verified to ensure you’re getting genuine, quality opportunities whether buying, renting or investing.",
  },
  // {
  //   question: "How quickly can I close on a distressed land deal?",
  //   answer:
  //     "Our distressed land deals are structured to move fast—once agreement terms are finalized, transactions can close within days, depending on due diligence.",
  // },
  // {
  //   question: "Do you charge commission or management fees?",
  //   answer:
  //     "Our fee structure depends on the service—whether it’s property sales, rentals, or JV management. Contact us directly for full details.",
  // },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(1); // open the second one by default

  const toggleFAQ = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="faq">
      <h2>
        FAQ{" "}
        <span style={{ fontSize: "0.875rem" }}>
          (Frquently asked questions)
        </span>
      </h2>
      <div className="faq-list">
        {faqs.map((item, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
          >
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <span className="question">{item.question}</span>
              <span className="faq-icon">
                {activeIndex === index ? <TfiMinus /> : <IoIosAdd />}
              </span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">
                {item.answer.split("\n").map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <button className="ask-btn">
        <Link to="/contact">ASK A QUESTION</Link>
      </button>

      <div className="sat-cont">
        <div className="satisfied">
          <p>
            We are trusted partners for 200+ major property owners. They rely on
            1502 Properties for discreet, expert management and we maximize
            returns from their high-value real estate investments.
          </p>{" "}
          <button className="ask-btn">
            <Link to="/signup">GET STARTED</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
