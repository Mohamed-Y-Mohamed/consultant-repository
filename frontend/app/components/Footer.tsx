"use client";
import Link from "next/link";
import { SERVICES } from "../lib/services";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      data-testid="site-footer"
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--bg-secondary)",
        marginTop: "80px",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "48px",
            marginBottom: "48px",
          }}
        >
          {/* Brand */}
          <div style={{ gridColumn: "span 1" }}>
            <Link
              href="/"
              style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}
            >
              <svg viewBox="0 0 32 32" fill="none" style={{ width: "22px", height: "22px" }}>
                <rect x="1" y="1" width="13" height="13" stroke="var(--gold)" strokeWidth="1" />
                <rect x="18" y="18" width="13" height="13" stroke="var(--gold)" strokeWidth="1" />
                <rect x="9" y="9" width="14" height="14" stroke="var(--gold)" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.45" />
              </svg>
              <span
                className="font-display"
                style={{
                  color: "var(--text-primary)",
                  fontWeight: 300,
                  letterSpacing: "0.22em",
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                }}
              >
                Evora Capital
              </span>
            </Link>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.78rem", lineHeight: 1.7, maxWidth: "18rem" }}>
              Independent. Strategic. Transformational. Hospitality investment and hotel management for visionary owners.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-mono" style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)", opacity: 0.8, marginBottom: "18px" }}>
              Navigate
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/services", label: "Services" },
                { href: "/contactus", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="nav-link" style={{ fontSize: "0.85rem" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="font-mono" style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)", opacity: 0.8, marginBottom: "18px" }}>
              Services
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link href={`/services?s=${s.id}`} className="nav-link" style={{ fontSize: "0.85rem" }}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-mono" style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)", opacity: 0.8, marginBottom: "18px" }}>
              Contact
            </p>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.7 }}>
              London, GMT<br />+44 20 7946 0800
            </p>
            <Link href="/contactus" className="btn-primary" style={{ fontSize: "0.68rem", padding: "9px 18px", marginTop: "18px" }}>
              Get in Touch
            </Link>
          </div>
        </div>

        <div className="rule-gold" style={{ opacity: 0.2, marginBottom: "20px" }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <p style={{ fontSize: "0.72rem", color: "var(--text-tertiary)", opacity: 0.7 }}>
            © {year} Evora Capital. All rights reserved.
          </p>
          <p className="font-mono" style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-muted)", opacity: 0.6 }}>
            Independent · Strategic · Transformational
          </p>
        </div>
      </div>
    </footer>
  );
}
