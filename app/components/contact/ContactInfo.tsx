"use client";

const emails = [
  { label: "General Enquiries", value: "hello@evoracapital.com" },
  { label: "New Business", value: "advisory@evoracapital.com" },
  { label: "Careers", value: "talent@evoracapital.com" },
  { label: "Press & Media", value: "press@evoracapital.com" },
];

const offices = [
  { city: "London", tz: "GMT", phone: "+44 20 7946 0800" },
];

export default function ContactInfo() {
  return (
    <div data-testid="contact-info" style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      {/* Direct emails */}
      <div>
        <p className="font-mono mb-5" style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)", opacity: 0.85 }}>
          — Direct Lines
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column" }}>
          {emails.map((e, i) => (
            <li key={e.value} style={{ padding: "1rem 0", borderBottom: i < emails.length - 1 ? "1px solid var(--border)" : "none" }}>
              <p className="font-mono" style={{ fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "4px" }}>
                {e.label}
              </p>
              <a href={`mailto:${e.value}`} className="nav-link" style={{ fontSize: "0.95rem", color: "var(--text-primary)" }}>
                {e.value}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Offices */}
      <div>
        <p className="font-mono mb-5" style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)", opacity: 0.85 }}>
          — Offices
        </p>
        <div style={{ display: "grid", gap: "1rem" }}>
          {offices.map((o) => (
            <div key={o.city} style={{ border: "1px solid var(--border)", padding: "1.25rem 1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
                <h4 className="font-display" style={{ color: "var(--text-primary)", fontSize: "1.3rem", fontWeight: 300, letterSpacing: "0.02em" }}>
                  {o.city}
                </h4>
                <span className="font-mono" style={{ color: "var(--gold)", opacity: 0.7, fontSize: "0.58rem", letterSpacing: "0.22em" }}>
                  {o.tz}
                </span>
              </div>
              <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="nav-link" style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                {o.phone}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Response commitment */}
      <div style={{ borderLeft: "1px solid var(--border-gold)", padding: "0.5rem 0 0.5rem 1.25rem" }}>
        <p className="font-mono mb-2" style={{ fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)", opacity: 0.85 }}>
          Response Commitment
        </p>
        <p className="text-secondary" style={{ fontSize: "0.9rem", lineHeight: 1.75, fontWeight: 300 }}>
          We respond to all enquiries within three business days. For urgent matters,
          please call your nearest office directly.
        </p>
      </div>

      {/* Discretion */}
      <div style={{ borderLeft: "1px solid var(--border)", padding: "0.5rem 0 0.5rem 1.25rem" }}>
        <p className="font-mono mb-2" style={{ fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-muted)" }}>
          Discretion
        </p>
        <p className="text-tertiary" style={{ fontSize: "0.85rem", lineHeight: 1.75, fontWeight: 300 }}>
          All communications are treated with complete discretion. We do not share enquiry
          details with third parties under any circumstances.
        </p>
      </div>
    </div>
  );
}
