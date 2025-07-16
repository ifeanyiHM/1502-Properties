import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { TfiMinus } from "react-icons/tfi";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "Can I use EmailJS for free?",
    answer: "",
  },
  {
    question: "Can't I use services like Sendgrid or Mandrill directly?",
    answer: `All email services require some sort of authentication to send the emails on your behalf. That makes it a really bad idea to use them directly from client-side – revealing your password or your secret keys will allow anyone to send emails on your behalf.

EmailJS keeps your authentication details on the server-side, and the client-side code just triggers a predefined email template, similarly to how any client-server application is working.`,
  },
  {
    question: "Does EmailJS expose my account to spam?",
    answer: "",
  },
  {
    question: "Can I send HTML emails?",
    answer: "",
  },
  {
    question: "What about plain text emails?",
    answer: "",
  },
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
    </div>
  );
};

export default FAQ;
