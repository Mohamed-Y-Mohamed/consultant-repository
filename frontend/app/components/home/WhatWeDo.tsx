"use client";
import Link from "next/link";

export default function WhatWeDo() {
  return (
    <section id="what-we-do" data-testid="landing-what" className="relative py-32 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(var(--gold) 1px, transparent 1px), linear-gradient(90deg, var(--gold) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute left-0 top-0 bottom-0 w-px opacity-20"
        style={{ background: "linear-gradient(180deg, transparent, var(--gold) 30%, var(--gold) 70%, transparent)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-16 items-center">
          <div>
            <span className="section-label mb-6 inline-block">
              <span className="gold-line" />
              What is Evora Capital?
            </span>
            <h2
              className="display-heading text-primary mb-8"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1.08, fontWeight: 300 }}
            >
              Independent.
              <br />
              Strategic.
              <br />
              <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Transformational.</em>
            </h2>
            <p className="text-secondary leading-relaxed" style={{ fontSize: "1rem", fontWeight: 300, maxWidth: "32rem" }}>
              Evora Capital is more than an investment firm—it is a statement of intent. We partner
              with ambitious owners and operators through an approach rooted in originality, integrity,
              and long-term value.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/services" className="btn-primary" data-testid="what-cta-services">
                Our Services
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/about" className="btn-outline">
                About Us
              </Link>
            </div>
          </div>

          {/* Right principles panel */}
          <div className="relative" style={{ border: "1px solid var(--border)", padding: "2.5rem" }}>
            <span className="font-display select-none pointer-events-none" aria-hidden
              style={{
                position: "absolute", top: "-2.2rem", right: "-0.5rem",
                fontSize: "clamp(5rem, 10vw, 9rem)", color: "transparent",
                WebkitTextStroke: "1px var(--border-gold)", opacity: 0.6, lineHeight: 1,
              }}>
              ii
            </span>
            <ul className="space-y-8 relative z-10">
              {[
                { k: "Originality", v: "Every partnership reflects the unique identity and potential of the people behind it." },
                { k: "Integrity", v: "Honest counsel, transparent structures, and alignment with owner outcomes — always." },
                { k: "Ambition", v: "A modern alternative to traditional funding: flexibility without compromise, access without limitation." },
              ].map((p, i) => (
                <li key={p.k} className="flex gap-5 items-start">
                  <span
                    className="font-mono"
                    style={{
                      color: "var(--gold)",
                      opacity: 0.6,
                      fontSize: "0.7rem",
                      letterSpacing: "0.2em",
                      paddingTop: "4px",
                      minWidth: "28px",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-primary mb-1.5" style={{ fontSize: "1.15rem", fontWeight: 400, letterSpacing: "0.02em" }}>
                      {p.k}
                    </h3>
                    <p className="text-secondary" style={{ fontSize: "0.9rem", lineHeight: 1.65, fontWeight: 300 }}>
                      {p.v}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
