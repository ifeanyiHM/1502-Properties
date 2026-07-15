import { useState, type CSSProperties } from "react";

const effectiveDate = "10 July 2026";

interface PolicySection {
  id: string;
  title: string;
  intro?: string;
  listItems?: string[];
  outro?: string;
}

const sections: PolicySection[] = [
  {
    id: "information-we-collect",
    title: "1. Information We Collect",
    intro:
      "When you interact with our website, social media platforms, or submit an enquiry, we may collect the following information:",
    listItems: [
      "Full Name",
      "Email Address",
      "Phone Number",
      "Property preferences",
      "Investment requirements",
      "Budget information",
      "Any additional information you voluntarily provide",
    ],
    outro:
      "We may also collect technical information such as your IP address, browser type, device information, and website usage through cookies and analytics tools.",
  },
  {
    id: "how-we-use-your-information",
    title: "2. How We Use Your Information",
    intro: "We use your information to:",
    listItems: [
      "Respond to your enquiries.",
      "Recommend suitable properties based on your requirements.",
      "Arrange property inspections.",
      "Provide property information and investment briefs.",
      "Communicate with you regarding listings and services.",
      "Improve our website and customer experience.",
      "Comply with applicable legal and regulatory obligations.",
    ],
  },
  {
    id: "information-sharing",
    title: "3. Information Sharing",
    intro:
      "1502 Properties Limited does not sell or rent your personal information. Your information may only be shared:",
    listItems: [
      "With property owners or authorized representatives where necessary to facilitate a transaction.",
      "With trusted service providers assisting us in operating our business.",
      "Where required by law or regulatory authorities.",
    ],
    outro:
      "All third parties are expected to maintain appropriate confidentiality and security standards.",
  },
  {
    id: "data-security",
    title: "4. Data Security",
    intro:
      "We implement reasonable administrative, technical, and organizational measures to safeguard your personal information against unauthorized access, loss, misuse, or disclosure.",
    outro:
      "While we strive to protect your information, no method of internet transmission or electronic storage is completely secure.",
  },
  {
    id: "marketing-communications",
    title: "5. Marketing Communications",
    intro: "With your consent, we may send you:",
    listItems: [
      "New property listings",
      "Investment opportunities",
      "Market updates",
      "Company announcements",
      "Promotional offers",
    ],
    outro:
      "You may unsubscribe from these communications at any time by contacting us or following the unsubscribe instructions included in our communications.",
  },
  {
    id: "cookies",
    title: "6. Cookies",
    intro:
      "Our website may use cookies and similar technologies to improve functionality, analyze website traffic, and enhance your browsing experience.",
    outro:
      "You may choose to disable cookies through your browser settings; however, some website features may not function properly.",
  },
  {
    id: "third-party-links",
    title: "7. Third-Party Links",
    intro:
      "Our website may contain links to external websites. We are not responsible for the privacy practices or content of those third-party websites.",
  },
  {
    id: "your-rights",
    title: "8. Your Rights",
    intro: "Depending on applicable laws, you may have the right to:",
    listItems: [
      "Request access to your personal information.",
      "Correct inaccurate information.",
      "Request deletion of your data where permitted.",
      "Withdraw consent for marketing communications.",
      "Request information about how your data is processed.",
    ],
    outro:
      "To exercise these rights, please contact us using the details below.",
  },
  {
    id: "childrens-privacy",
    title: "9. Children's Privacy",
    intro:
      "Our services are intended for individuals aged 18 years and above. We do not knowingly collect personal information from children.",
  },
  {
    id: "changes-to-this-privacy-policy",
    title: "10. Changes to this Privacy Policy",
    intro:
      "We may update this Privacy Policy from time to time. Any changes will be published on this page together with the updated effective date.",
  },
  {
    id: "contact-us",
    title: "11. Contact Us",
    intro:
      "If you have any questions regarding this Privacy Policy or how we handle your personal information, please contact us using the details below.",
  },
];

const contactDetails = {
  company: "1502 Properties Limited",
  website: "www.1502properties.com",
  email: "info@1502properties.com",
  phone: "08096068042",
};

// ---------------------------------------------------------------------
// Styles — clamp() and flex-wrap handle responsiveness without media queries
// ---------------------------------------------------------------------
const styles: Record<string, CSSProperties> = {
  page: {
    color: "var(--primary-text-color)",
  },
  header: {
    textAlign: "center",
    padding: "clamp(3rem, 8vw, 5rem) 1.5rem clamp(2rem, 5vw, 3rem)",
  },
  eyebrow: {
    display: "inline-block",
    fontSize: "0.75rem",
    fontWeight: 600,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--secondary-text-color)",
    marginBottom: "0.9rem",
  },
  title: {
    fontFamily: "var(--font-headings)",
    fontSize: "clamp(2rem, 5vw, 2.75rem)",
    fontWeight: 600,
    margin: 0,
  },
  effectiveBar: {
    textAlign: "center",
    padding: "1rem 1.5rem",
    backgroundColor: "var(--dark-background-color)",
    color: "var(--light-color)",
    fontSize: "0.85rem",
    fontWeight: 600,
    letterSpacing: "0.02em",
  },
  intro: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "clamp(2rem, 5vw, 3rem) clamp(1.5rem, 6vw, 3rem) 0",
    textAlign: "center",
  },
  introText: {
    fontSize: "0.95rem",
    lineHeight: 1.8,
    color: "#4a4d4d",
  },

  layout: {
    display: "flex",
    flexWrap: "wrap",
    gap: "3rem",
    maxWidth: 1100,
    margin: "0 auto",
    padding:
      "clamp(2.5rem, 6vw, 4rem) clamp(1.5rem, 6vw, 3rem) clamp(4rem, 8vw, 6rem)",
  },

  toc: {
    flex: "1 1 220px",
    minWidth: 220,
  },
  tocSticky: {
    position: "sticky",
    top: "6rem",
  },
  tocTitle: {
    fontFamily: "var(--font-headings)",
    fontSize: "0.95rem",
    fontWeight: 600,
    marginBottom: "1rem",
    paddingBottom: "0.6rem",
    borderBottom: "2px solid var(--secondary-text-color)",
    display: "inline-block",
  },
  tocList: {
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: "0.7rem",
    padding: 0,
    margin: 0,
  },
  tocLink: {
    fontSize: "0.85rem",
    color: "#6b6f6f",
    textDecoration: "none",
    cursor: "pointer",
    transition: "color 0.2s ease",
  },
  tocLinkHover: {
    color: "var(--secondary-text-color)",
  },

  content: {
    flex: "999 1 460px",
    minWidth: 0,
  },
  section: {
    marginBottom: "2.75rem",
    scrollMarginTop: "6rem",
  },
  h2: {
    fontFamily: "var(--font-headings)",
    fontSize: "1.3rem",
    fontWeight: 600,
    paddingBottom: "0.6rem",
    marginBottom: "1rem",
    borderBottom: "2px solid var(--secondary-text-color)",
    display: "inline-block",
  },
  p: {
    fontSize: "0.92rem",
    lineHeight: 1.8,
    color: "#4a4d4d",
    margin: "0 0 1rem",
  },
  pLast: {
    marginBottom: 0,
  },
  ul: {
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
    padding: 0,
    margin: "0 0 1rem",
  },
  li: {
    position: "relative",
    paddingLeft: "1.1rem",
    fontSize: "0.9rem",
    lineHeight: 1.65,
    color: "#4a4d4d",
  },
  liDot: {
    position: "absolute",
    left: 0,
    top: "0.6em",
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "var(--secondary-text-color)",
  },

  contactCard: {
    background: "var(--secondary-background-color)",
    borderRadius: 12,
    padding: "1.75rem",
  },
  contactCompany: {
    fontFamily: "var(--font-headings)",
    fontSize: "1.05rem",
    fontWeight: 600,
    marginBottom: "1rem",
  },
  contactList: {
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
    padding: 0,
    margin: 0,
  },
  contactItem: {
    fontSize: "0.9rem",
    color: "#4a4d4d",
  },
  contactLabel: {
    fontWeight: 600,
    color: "var(--primary-text-color)",
  },
};

const PrivacyPolicyPage = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <span style={styles.eyebrow}>Legal</span>
        <h1 style={styles.title}>Privacy Policy</h1>
      </header>

      <div style={styles.effectiveBar}>Effective Date: {effectiveDate}</div>

      <div style={styles.intro}>
        <p style={styles.introText}>
          Welcome to 1502 Properties Limited ("1502 Properties", "we", "our", or
          "us"). We are committed to protecting your privacy and ensuring that
          your personal information is handled securely and responsibly.
        </p>
      </div>

      <div style={styles.layout}>
        <nav style={styles.toc} aria-label="Privacy policy sections">
          <div style={styles.tocSticky}>
            <span style={styles.tocTitle}>On this page</span>
            <ul style={styles.tocList}>
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(section.id);
                    }}
                    onMouseEnter={() => setHoveredLink(section.id)}
                    onMouseLeave={() => setHoveredLink(null)}
                    style={{
                      ...styles.tocLink,
                      ...(hoveredLink === section.id
                        ? styles.tocLinkHover
                        : {}),
                    }}
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div style={styles.content}>
          {sections.map((section) => {
            const isContactSection = section.id === "contact-us";

            return (
              <section id={section.id} style={styles.section} key={section.id}>
                <h2 style={styles.h2}>{section.title}</h2>

                {section.intro && <p style={styles.p}>{section.intro}</p>}

                {section.listItems && (
                  <ul style={styles.ul}>
                    {section.listItems.map((item) => (
                      <li style={styles.li} key={item}>
                        <span style={styles.liDot} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {section.outro && (
                  <p style={{ ...styles.p, ...styles.pLast }}>
                    {section.outro}
                  </p>
                )}

                {isContactSection && (
                  <div style={styles.contactCard}>
                    <p style={styles.contactCompany}>
                      {contactDetails.company}
                    </p>
                    <ul style={styles.contactList}>
                      <li style={styles.contactItem}>
                        <span style={styles.contactLabel}>Website: </span>
                        {contactDetails.website}
                      </li>
                      <li style={styles.contactItem}>
                        <span style={styles.contactLabel}>Email: </span>
                        {contactDetails.email}
                      </li>
                      <li style={styles.contactItem}>
                        <span style={styles.contactLabel}>Phone: </span>
                        {contactDetails.phone}
                      </li>
                    </ul>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
