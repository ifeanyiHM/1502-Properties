import { Link } from "react-router-dom";

function BlogNotFound() {
  return (
    <main
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 24px",
        backgroundColor: "#fff",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "clamp(80px, 15vw, 180px)",
            fontWeight: 500,
            lineHeight: 0.9,
            letterSpacing: "-0.06em",
            color: "#e8e8e8",
            marginBottom: "30px",
          }}
        >
          404
        </div>

        <p
          style={{
            margin: "0 0 16px",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#777",
          }}
        >
          Page not found
        </p>

        <h1
          style={{
            margin: 0,
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "#171717",
          }}
        >
          We can&apos;t find that story.
        </h1>

        <p
          style={{
            maxWidth: "560px",
            margin: "24px auto 0",
            fontSize: "16px",
            lineHeight: 1.7,
            color: "#666",
          }}
        >
          The blog post you&apos;re looking for may have been moved, removed, or
          the link may no longer be available.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
            marginTop: "40px",
          }}
        >
          <Link
            to="/blogs"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "150px",
              padding: "14px 24px",
              borderRadius: "999px",
              backgroundColor: "#171717",
              color: "#fff",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
              transition: "background-color 0.2s ease",
            }}
          >
            Explore our blog
          </Link>

          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "150px",
              padding: "14px 24px",
              borderRadius: "999px",
              border: "1px solid #d6d6d6",
              backgroundColor: "#fff",
              color: "#171717",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default BlogNotFound;
