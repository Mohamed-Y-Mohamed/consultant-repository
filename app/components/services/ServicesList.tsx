"use client";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { SERVICES } from "../../lib/services";

export default function ServicesList() {
  const params = useSearchParams();
  const selected = params.get("s");
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    if (!selected) return;
    const el = refs.current[selected];
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    }
  }, [selected]);

  return (
    <section data-testid="services-list" className="relative py-24 overflow-hidden bg-page">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-[200px_1fr] gap-10 md:gap-16">
        {/* Side index */}
        <aside className="hidden md:block">
          <div className="sticky top-28">
            <p className="font-mono mb-6" style={{ fontSize: "0.6rem", letterSpacing: "0.24em", color: "var(--gold)", textTransform: "uppercase", opacity: 0.85 }}>
              Index
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {SERVICES.map((s) => {
                const active = selected === s.id;
                return (
                  <li key={s.id}>
                    <a
                      href={`/services?s=${s.id}`}
                      data-testid={`side-index-${s.id}`}
                      className="nav-link"
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "10px",
                        textDecoration: "none",
                        color: active ? "var(--gold)" : "var(--text-secondary)",
                        fontSize: "0.82rem",
                        fontFamily: "'Outfit', sans-serif",
                        transition: "color 0.3s ease",
                      }}
                    >
                      <span className="font-mono" style={{ fontSize: "0.6rem", letterSpacing: "0.18em", opacity: 0.7 }}>{s.index}</span>
                      <span>{s.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        {/* Cards */}
        <div className="flex flex-col gap-10">
          {SERVICES.map((s) => {
            const active = selected === s.id;
            return (
              <article
                key={s.id}
                id={`service-${s.id}`}
                ref={(el) => { refs.current[s.id] = el; }}
                data-testid={`service-card-${s.id}`}
                className={`service-card ${active ? "active" : ""}`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
                  <div className="flex items-baseline gap-5">
                    <span className="font-mono" style={{ color: "var(--gold)", opacity: 0.6, fontSize: "0.7rem", letterSpacing: "0.2em" }}>
                      {s.index}
                    </span>
                    <h3 className="display-heading text-primary" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 300, lineHeight: 1.15 }}>
                      {s.title}
                    </h3>
                  </div>
                  {active && (
                    <span className="font-mono" style={{ color: "var(--gold)", fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase" }}>
                      ● Selected
                    </span>
                  )}
                </div>

                <p className="font-display" style={{ color: "var(--gold)", fontStyle: "italic", fontSize: "clamp(1.1rem, 2vw, 1.4rem)", fontWeight: 300, marginBottom: "1.5rem", lineHeight: 1.4 }}>
                  {s.tagline}
                </p>

                <div className="space-y-5 text-secondary leading-relaxed" style={{ fontSize: "0.98rem", fontWeight: 300, maxWidth: "46rem" }}>
                  {s.description.split("\n\n").map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {s.tags && s.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-8 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
                    {s.tags.map((t) => (
                      <span key={t} className="font-mono" style={{
                        fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase",
                        color: "var(--gold)", border: "1px solid var(--border-gold)", padding: "6px 10px",
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {s.extra && s.extra.length > 0 && (
                  <div className="mt-8">
                    <p className="font-mono mb-4" style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)", opacity: 0.85 }}>
                      — Departments we staff
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {s.extra.map((d) => (
                        <li key={d} className="flex items-start gap-3 text-primary" style={{ fontSize: "0.95rem", fontWeight: 300 }}>
                          <span style={{ color: "var(--gold)", fontSize: "0.8rem", lineHeight: 1.5 }}>◇</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
