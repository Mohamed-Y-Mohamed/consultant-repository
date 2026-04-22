"use client";
import Link from "next/link";

export default function CtaStrip() {
  return (
    <section id="cta" data-testid="landing-cta" className="relative py-28 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, #100E0B 0%, #1A1510 50%, #100E0B 100%)" }}
      />
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--gold) 20%, var(--gold) 80%, transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--gold) 20%, var(--gold) 80%, transparent)" }} />

      {/* Ghost text */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden" aria-hidden>
        <span
          className="display-heading font-light whitespace-nowrap"
          style={{
            fontSize: "clamp(5rem, 17vw, 18rem)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(201,169,110,0.06)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          Evora
        </span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <span className="section-label mb-8 inline-block">
          <span className="gold-line" />
          Ready to Begin?
        </span>
        <h2 className="display-heading mb-6" style={{ fontSize: "clamp(2rem, 5.5vw, 4.5rem)", fontWeight: 300, lineHeight: 1.1, color: "#F5F0E8" }}>
          Your next chapter starts
          <br />
          with a{" "}
          <em style={{ color: "var(--gold)", fontStyle: "italic" }}>conversation.</em>
        </h2>
        <p className="mx-auto leading-relaxed font-light mb-12" style={{ color: "#A8A09A", maxWidth: "34rem", fontSize: "1rem" }}>
          Whether you are exploring a management contract, a property sale, or targeted
          support for an existing team — we are ready to partner with you.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contactus" className="btn-primary" data-testid="cta-strip-contact">
            Contact Us
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link href="/services" className="btn-outline" style={{ borderColor: "rgba(245,240,232,0.18)", color: "#F5F0E8" }} data-testid="cta-strip-services">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
