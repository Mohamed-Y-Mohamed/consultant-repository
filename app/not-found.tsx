import Link from "next/link";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";

export default function NotFound() {
  return (
    <div className="bg-page min-h-screen flex flex-col">
      <Navbar />

      <main
        className="flex-1"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1.5rem",
          textAlign: "center",
        }}
      >
        <p
          className="font-mono"
          style={{
            fontSize: "0.62rem",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "var(--gold)",
            opacity: 0.85,
            marginBottom: "1.5rem",
          }}
        >
          — 404
        </p>

        <h1
          className="font-display"
          style={{
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            fontWeight: 300,
            lineHeight: 1.1,
            color: "var(--text-primary)",
            marginBottom: "1.25rem",
          }}
        >
          Page not found.
        </h1>

        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1rem",
            lineHeight: 1.8,
            fontWeight: 300,
            maxWidth: "26rem",
            marginBottom: "2.5rem",
          }}
        >
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link href="/" className="btn-primary" style={{ fontSize: "0.7rem" }}>
          Back to Home
          <svg
            style={{ width: "12px", height: "12px" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </main>

      <Footer />
    </div>
  );
}
