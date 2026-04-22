"use client";
import Link from "next/link";
import { SERVICES } from "../../lib/services";

export default function ServicesPreview() {
  return (
    <section id="services-preview" data-testid="landing-services" className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="section-label">
              <span className="gold-line" />
              What We Do
            </span>
            <h2 className="display-heading text-primary mt-6"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 300, lineHeight: 1.1 }}>
              Complete, flexible
              <br />
              <em style={{ color: "var(--gold)", fontStyle: "italic" }}>solutions.</em>
            </h2>
          </div>
          <p className="text-secondary max-w-sm text-sm md:text-base leading-relaxed font-light">
            Whether you require full operational oversight or targeted support, our approach
            is built around you — designed to maximise the value, performance, and potential
            of your hospitality asset.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "var(--border)" }}>
          {SERVICES.map((s) => (
            <Link
              key={s.id}
              href={`/services?s=${s.id}`}
              data-testid={`preview-service-${s.id}`}
              className="group relative bg-primary p-10 flex flex-col gap-6 cursor-pointer transition-colors duration-500 hover:bg-[var(--bg-card-hover)]"
              style={{ textDecoration: "none", minHeight: "18rem" }}
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs tracking-widest" style={{ color: "var(--gold)", opacity: 0.55 }}>
                  {s.index}
                </span>
                <svg viewBox="0 0 24 24" fill="none" style={{ width: "22px", height: "22px", opacity: 0.55 }} className="group-hover:opacity-100 transition-opacity">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="var(--gold)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <h3 className="display-heading text-primary group-hover:text-[var(--gold)] transition-colors duration-500"
                style={{ fontSize: "clamp(1.25rem, 2vw, 1.7rem)", fontWeight: 300, lineHeight: 1.15 }}>
                {s.title}
              </h3>

              <p className="text-secondary text-sm leading-relaxed font-light flex-1">
                {s.subtext}
              </p>

              <div
                className="absolute bottom-0 left-0 h-px opacity-40 group-hover:opacity-100 group-hover:w-full transition-all duration-700"
                style={{
                  background: "linear-gradient(90deg, var(--gold), transparent)",
                  width: "2rem",
                }}
              />
            </Link>
          ))}
          {/* Empty tile for visual balance */}
          <div className="hidden lg:block bg-primary p-10 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.06]">
              <span className="display-heading" style={{ fontSize: "clamp(4rem, 8vw, 8rem)", color: "var(--gold)" }}>
                E
              </span>
            </div>
            <div className="relative z-10 flex flex-col h-full justify-end">
              <p className="font-mono text-[11px] tracking-widest uppercase mb-3" style={{ color: "var(--gold)", opacity: 0.6 }}>
                All services
              </p>
              <Link href="/services" className="btn-outline inline-flex w-fit" data-testid="preview-explore-all">
                Explore All
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
