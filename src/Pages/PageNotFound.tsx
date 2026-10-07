import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <>
      <main className="page-not-found">
        <div className="page-not-found-content">
          <span className="page-not-found-code">404</span>

          <h1>Page not found</h1>

          <p>
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It
            may have been moved, removed, or the URL may be incorrect.
          </p>

          <div className="page-not-found-actions">
            <Link to="/" className="primary-button">
              Back to home
            </Link>

            <button
              type="button"
              className="secondary-button"
              onClick={() => window.history.back()}
            >
              Go back
            </button>
          </div>
        </div>
      </main>

      <style>{`
        .page-not-found {
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 24px;
          text-align: center;
        }

        .page-not-found-content {
          width: 100%;
          max-width: 650px;
        }

        .page-not-found-code {
          display: block;
          margin-bottom: 10px;
          color: #eeeeee;
          font-size: clamp(100px, 18vw, 180px);
          font-weight: 600;
          line-height: 0.9;
          letter-spacing: -0.07em;
        }

        h1 {
          margin: 0;
          color: #171717;
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 500;
          line-height: 1.1;
          letter-spacing: -0.03em;
        }

        p {
          max-width: 520px;
          margin: 20px auto 0;
          color: #666;
          font-size: 16px;
          line-height: 1.7;
        }

        .page-not-found-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-top: 36px;
        }

        .primary-button,
        .secondary-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 140px;
          padding: 14px 24px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 500;
          font-family: inherit;
          text-decoration: none;
          cursor: pointer;
          transition:
            background-color 0.25s ease,
            color 0.25s ease,
            border-color 0.25s ease;
        }

        .primary-button {
          border: 1px solid #171717;
          background: #171717;
          color: #fff;
        }

        .primary-button:hover {
          border-color: #333;
          background: #333;
        }

        .secondary-button {
          border: 1px solid #d9d9d9;
          background: #fff;
          color: #171717;
        }

        .secondary-button:hover {
          border-color: #171717;
        }

        @media (max-width: 600px) {
          .page-not-found {
            min-height: 65vh;
            padding: 60px 20px;
          }

          p {
            font-size: 15px;
          }

          .page-not-found-actions {
            flex-direction: column;
            width: 100%;
          }

          .primary-button,
          .secondary-button {
            width: 100%;
            max-width: 280px;
          }
        }
      `}</style>
    </>
  );
}

export default PageNotFound;
