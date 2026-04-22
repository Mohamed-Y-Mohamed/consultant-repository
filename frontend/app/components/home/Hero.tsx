"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Hero() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      if (lineRef.current) lineRef.current.style.width = "100%";
    }, 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      data-testid="landing-hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--gold) 1px, transparent 1px), linear-gradient(90deg, var(--gold) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.07]"
        style={{
          width: "55rem",
          height: "55rem",
          background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)",
        }}
      />
      {/* Corner marks */}
      <div className="absolute top-32 left-8 w-20 h-20" style={{ borderLeft: "1px solid var(--border-gold)", borderTop: "1px solid var(--border-gold)" }} />
      <div className="absolute bottom-24 right-8 w-20 h-20" style={{ borderRight: "1px solid var(--border-gold)", borderBottom: "1px solid var(--border-gold)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center pt-24">
        <div className="inline-flex items-center gap-3 mb-10" style={{ animation: "fadeUp 0.6s ease 0.2s both" }}>
          <span className="section-label">
            <span className="gold-line" />
            Hospitality Investment &amp; Hotel Management
            <span style={{ display: "inline-block", width: "40px", height: "1px", background: "linear-gradient(270deg, var(--gold), transparent)", marginLeft: "12px" }} />
          </span>
        </div>

        <h1
          className="display-heading text-primary mb-8"
          style={{
            fontSize: "clamp(2.8rem, 8vw, 7rem)",
            lineHeight: "1.04",
            fontWeight: 300,
            animation: "fadeUp 0.7s ease 0.35s both",
            letterSpacing: "-0.01em",
          }}
        >
          Personal. Purposeful.
          <br />
          <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Powerful.</em>
        </h1>

        <div className="flex justify-center mb-10" style={{ animation: "fadeIn 0.5s ease 0.7s both" }}>
          <div
            ref={lineRef}
            style={{
              width: "0%",
              maxWidth: "420px",
              height: "1px",
              background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
              transition: "width 1.2s ease 0.8s",
            }}
          />
        </div>

        <p
          className="text-secondary mx-auto leading-relaxed mb-12"
          style={{
            fontWeight: 300,
            fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
            maxWidth: "44rem",
            animation: "fadeUp 0.7s ease 0.55s both",
          }}
        >
          A distinctive alternative to traditional capital firms—combining strategic
          insight, global reach, and an unwavering commitment to individuality. We
          partner with ambitious owners and operators to unlock long-term value.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4" style={{ animation: "fadeUp 0.7s ease 0.75s both" }}>
          <Link href="/services" className="btn-primary" data-testid="hero-cta-services">
            Explore Services
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link href="/contactus" className="btn-outline" data-testid="hero-cta-contact">
            Contact Us
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ animation: "fadeIn 1s ease 1.5s both" }}>
          <div className="w-px h-10" style={{ background: "linear-gradient(180deg, var(--border-gold), transparent)" }} />
        </div>
      </div>

      {/* Stats band */}
      <div
        className="absolute bottom-0 left-0 right-0 backdrop-blur-sm"
        style={{
          borderTop: "1px solid var(--border)",
          background: "linear-gradient(0deg, var(--bg-secondary), transparent)",
          animation: "fadeUp 0.6s ease 1s both",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-3 gap-6">
          {[
            { n: "Owner-Aligned", label: "Philosophy" },
            { n: "Global", label: "Reach" },
            { n: "Bespoke", label: "Engagements" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-gold text-xl md:text-2xl font-light">{s.n}</p>
              <p className="font-mono text-[10px] md:text-xs text-tertiary tracking-widest uppercase mt-1 opacity-70">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
