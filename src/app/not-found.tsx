import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "65vh",
        display: "grid",
        placeItems: "center",
        padding: "4rem 1.5rem",
        textAlign: "center",
        background: "#fff7ed",
        color: "#073e2b",
      }}
    >
      <div>
        <p style={{ color: "#ad7a2b", letterSpacing: ".2em" }}>404</p>
        <h1 style={{ fontSize: "clamp(2rem, 6vw, 4rem)", margin: "1rem 0" }}>
          This page is not on the menu
        </h1>
        <p style={{ marginBottom: "1.5rem" }}>
          The page you requested could not be found.
        </p>
        <Link href="/" style={{ color: "#073e2b", textDecoration: "underline" }}>
          Return to The Rouché Café
        </Link>
      </div>
    </main>
  );
}
