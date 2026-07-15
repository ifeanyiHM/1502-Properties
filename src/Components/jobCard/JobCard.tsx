import { useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import type { JobVacancy } from "../../Data/careers.data";

interface JobCardProps {
  job: JobVacancy;
}

const styles: Record<string, CSSProperties> = {
  card: {
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
    background: "var(--primary-background-color)",
    borderRadius: 15,
    padding: "1.75rem 1.5rem",
    border: "1px solid rgba(43, 45, 45, 0.08)",
    boxShadow: "0 4px 16px rgba(11, 17, 52, 0.08)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  cardHover: {
    transform: "translateY(-4px)",
    boxShadow: "0 12px 28px rgba(11, 17, 52, 0.14)",
  },
  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.4rem",
  },
  type: {
    display: "inline-block",
    fontSize: "0.7rem",
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    background: "rgba(167, 156, 73, 0.12)",
    padding: "0.3rem 0.7rem",
    borderRadius: 100,
  },
  closing: {
    fontSize: "0.72rem",
    color: "#8a8f8f",
  },
  title: {
    fontFamily: "var(--font-headings)",
    fontSize: "1.25rem",
    fontWeight: 600,
    color: "var(--primary-text-color)",
    lineHeight: 1.3,
    margin: 0,
  },
  location: {
    display: "flex",
    alignItems: "center",
    gap: "0.35rem",
    fontSize: "0.85rem",
    color: "#6b6f6f",
    margin: 0,
  },
  locationIcon: {
    color: "var(--secondary-text-color)",
    flexShrink: 0,
  },
  summary: {
    fontSize: "0.9rem",
    lineHeight: 1.6,
    color: "#55595a",
    margin: "0.2rem 0 0.8rem",
    flexGrow: 1,
  },
  link: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    alignSelf: "flex-start",
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "var(--primary-text-color)",
    textDecoration: "none",
    paddingBottom: "0.15rem",
    borderBottom: "1px solid var(--primary-text-color)",
    transition: "color 0.25s ease, border-color 0.25s ease",
  },
  linkHover: {
    color: "var(--secondary-text-color)",
    borderColor: "var(--secondary-text-color)",
  },
  arrow: {
    transition: "transform 0.25s ease",
  },
  arrowHover: {
    transform: "translateX(3px)",
  },
};

const JobCard = ({ job }: JobCardProps) => {
  const [cardHovered, setCardHovered] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  return (
    <>
      <article
        style={{ ...styles.card, ...(cardHovered ? styles.cardHover : {}) }}
        onMouseEnter={() => setCardHovered(true)}
        onMouseLeave={() => setCardHovered(false)}
      >
        <div style={styles.top}>
          <span style={styles.type}>{job.employmentType}</span>
          <span className="closing" style={styles.closing}>
            {job.closingDate}
          </span>
        </div>

        <h3 style={styles.title}>{job.title}</h3>

        <p style={styles.location}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={styles.locationIcon}
            aria-hidden="true"
          >
            <path d="M21 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 0 1 18 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {job.location}
        </p>

        <p style={styles.summary}>{job.summary}</p>

        <Link
          to={`/careers/${job.slug}`}
          style={{ ...styles.link, ...(linkHovered ? styles.linkHover : {}) }}
          onMouseEnter={() => setLinkHovered(true)}
          onMouseLeave={() => setLinkHovered(false)}
        >
          View Job Description
          <span
            aria-hidden="true"
            style={{
              ...styles.arrow,
              ...(linkHovered ? styles.arrowHover : {}),
            }}
          >
            &rarr;
          </span>
        </Link>
      </article>

      <style>
        {`
    @media (max-width: 1000px) {
      .closing {
        display: none;
      }
    }
  `}
      </style>
    </>
  );
};

export default JobCard;
