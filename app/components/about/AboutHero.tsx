"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function AboutHero() {
  const lineRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const t = setTimeout(() => {
      if (lineRef.current) lineRef.current.style.width = "100%";
    }, 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <section data-testid="about-hero" style={{ position: "relative", overflow: "hidden", background: "var(--bg-page)", paddingTop: "7rem" }}>
      {/* Left vertical rule */}
      <div style={{
        position: "absolute", left: "1.5rem", top: 0, bottom: 0, width: "1px",
        background: "linear-gradient(180deg, transparent 0%, var(--gold) 40%, var(--gold) 80%, transparent 100%)",
        opacity: 0.14,
      }} />

      {/* Ghost numeral */}
      <div aria-hidden style={{
        position: "absolute", top: "50%", right: "-1rem", transform: "translateY(-50%)",
        fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(8rem, 22vw, 26rem)",
        fontWeight: 300, lineHeight: 1, color: "transparent",
        WebkitTextStroke: "1px var(--gold)", opacity: 0.05,
        userSelect: "none", pointerEvents: "none", letterSpacing: "-0.05em",
      }}>01</div>

      {/* Corner */}
      <div style={{
        position: "absolute", top: "6rem", right: "1.5rem", width: "3rem", height: "3rem",
        borderRight: "1px solid var(--border-gold)", borderTop: "1px solid var(--border-gold)", opacity: 0.35,
      }} />

      <div style={{ position: "relative", zIndex: 10, maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "2.5rem", animation: "fadeUp 0.5s ease 0.1s both" }}>
          <Link href="/" className="font-mono" style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
          <span style={{ color: "var(--gold)", opacity: 0.5, fontSize: "0.6rem" }}>—</span>
          <span className="font-mono" style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)" }}>About</span>
        </div>

        <div style={{ marginBottom: "1.75rem", animation: "fadeUp 0.6s ease 0.2s both" }}>
          <span className="section-label">
            <span className="gold-line" />
            Who We Are
          </span>
        </div>

        <div className="about-hero-grid">
          <h1 className="font-display about-hero-h1" style={{ fontWeight: 300, lineHeight: 1.05, color: "var(--text-primary)", animation: "fadeUp 0.7s ease 0.35s both" }}>
            Personal.
            <br />
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Purposeful.</em>
            <br />
            Powerful.
          </h1>
          <div style={{ animation: "fadeUp 0.7s ease 0.5s both" }}>
            <div ref={lineRef} style={{
              height: "1px", width: "0%",
              background: "linear-gradient(90deg, var(--gold), transparent)",
              transition: "width 1.2s ease 0.6s", marginBottom: "1.75rem",
            }} />
            <p className="font-body" style={{ color: "var(--text-secondary)", fontSize: "clamp(0.95rem, 1.6vw, 1.08rem)", lineHeight: 1.85, fontWeight: 300 }}>
              Evora Capital was founded with a vision to challenge the conventional — offering
              a distinctive alternative to traditional capital firms by combining strategic insight,
              global reach, and an unwavering commitment to individuality.
            </p>
            <div style={{ display: "flex", gap: "2rem", marginTop: "2.25rem", flexWrap: "wrap" }}>
              {[
                ["Focus", "Hospitality"],
                ["HQ", "London"],
                ["Approach", "Owner-aligned"],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="font-mono" style={{ fontSize: "0.55rem", letterSpacing: "0.2em", color: "var(--gold)", opacity: 0.65, textTransform: "uppercase", marginBottom: "4px" }}>
                    {k}
                  </p>
                  <p className="font-display" style={{ fontSize: "clamp(1.1rem, 2.4vw, 1.5rem)", fontWeight: 300, color: "var(--text-primary)" }}>
                    {v}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rule-gold" style={{ marginTop: "4rem" }} />

      <style>{`
        .about-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: flex-end;
          padding-bottom: 4rem;
        }
        .about-hero-h1 { font-size: clamp(2.8rem, 7vw, 6.5rem); }
        @media (max-width: 768px) {
          .about-hero-grid { grid-template-columns: 1fr; gap: 2rem; padding-bottom: 3rem; }
          .about-hero-h1 { font-size: clamp(2.3rem, 10vw, 4rem); }
        }
      `}</style>
    </section>
  );
}
