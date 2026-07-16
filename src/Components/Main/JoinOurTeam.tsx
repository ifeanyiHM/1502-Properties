// src/components/JoinOurTeam/JoinOurTeam.tsx
//
// VARIANT 1 —  background
// Uses var(--secondary-background-color) (#f0e8e8), already in your
// palette. Warm, calm separation from the white/gray sections around it.
// Dark navy CTA button (matches .featured-articles__button).

import { useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";

const styles: Record<string, CSSProperties> = {
  section: {
    padding: "clamp(3rem, 8vw, 5rem) 1.5rem",
    backgroundColor: "var(--secondary-background-color)",
    textAlign: "center",
  },
  inner: {
    maxWidth: 620,
    margin: "0 auto",
  },
  eyebrow: {
    display: "inline-block",
    fontSize: "0.75rem",
    fontWeight: 600,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--secondary-text-color)",
    marginBottom: "1rem",
  },
  title: {
    fontFamily: "var(--font-headings)",
    fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
    fontWeight: 500,
    lineHeight: 1.25,
    color: "var(--primary-text-color)",
    marginBottom: "1rem",
  },
  text: {
    fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)",
    lineHeight: 1.7,
    color: "#4b5563",
    marginBottom: "2rem",
  },
  cta: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "1rem 2rem",
    backgroundColor: "var(--dark-background-color)",
    color: "#ffffff",
    textDecoration: "none",
    borderRadius: "0.2rem",
    fontSize: "1rem",
    fontWeight: 500,
    transition: "all 0.3s ease",
  },
  ctaHover: {
    backgroundColor: "#1a1d2e",
    transform: "translateY(-2px)",
  },
  ctaArrow: {
    transition: "transform 0.3s ease",
  },
  ctaArrowHover: {
    transform: "translateX(4px)",
  },
};

const JoinOurTeam = () => {
  const [ctaHovered, setCtaHovered] = useState(false);

  return (
    <section style={styles.section}>
      <div style={styles.inner}>
        <span style={styles.eyebrow}>We're Hiring</span>
        <h2 style={styles.title}>
          Come build the future of real estate with us
        </h2>
        <p style={styles.text}>
          We're a fast-growing team looking for people who care about doing
          great work. Explore our open roles and see where you'd fit in.
        </p>
        <Link
          to="/careers"
          style={{ ...styles.cta, ...(ctaHovered ? styles.ctaHover : {}) }}
          onMouseEnter={() => setCtaHovered(true)}
          onMouseLeave={() => setCtaHovered(false)}
        >
          View Open Roles
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{
              ...styles.ctaArrow,
              ...(ctaHovered ? styles.ctaArrowHover : {}),
            }}
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default JoinOurTeam;
