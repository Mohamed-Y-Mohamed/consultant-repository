"use client";

const signals = [
  { label: "Owner-aligned", value: "Partnership" },
  { label: "Global reach", value: "Investor network" },
  { label: "Full spectrum", value: "Hospitality" },
  { label: "Flexible", value: "Non-exclusive" },
];

const tenets = [
  {
    num: "I",
    heading: "Substance Over Scale",
    body: "We place people, partnerships, and long-term value at the centre of everything we do—never scale for its own sake.",
  },
  {
    num: "II",
    heading: "Owner-Aligned Philosophy",
    body: "Our structure provides full transparency and operational clarity. Your asset is managed with the same ambition as if it were our own.",
  },
  {
    num: "III",
    heading: "Institutional Discipline, Entrepreneurial Agility",
    body: "We combine the rigour of institutional capital with the speed and adaptability of a partner that understands hospitality from the inside.",
  },
];

export default function WhyEvora() {
  return (
    <section id="why" data-testid="landing-why" className="relative py-32 overflow-hidden bg-secondary">
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, var(--gold) 30%, var(--gold) 70%, transparent 100%)", opacity: 0.3 }} />
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, var(--gold) 30%, var(--gold) 70%, transparent 100%)", opacity: 0.3 }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="section-label">
            <span className="gold-line" />
            Why Evora Capital
          </span>
          <h2
            className="display-heading text-primary mt-6"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 300, lineHeight: 1.1 }}
          >
            Built on conviction.{" "}
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Proven by results.</em>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-steel/20 mb-20" style={{ background: "var(--border)" }}>
          {signals.map((s) => (
            <div key={s.label} className="bg-primary px-6 py-10 text-center transition-colors duration-500 hover:bg-[var(--bg-card-hover)]">
              <p className="display-heading text-gold mb-2" style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.3rem)", fontWeight: 300 }}>
                {s.value}
              </p>
              <p className="font-mono text-[11px] tracking-widest uppercase opacity-70" style={{ color: "var(--text-tertiary)" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {tenets.map((t, i) => (
            <div key={t.num} className="flex flex-col gap-4" style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="flex items-center gap-4 mb-2">
                <span className="font-display font-light" style={{ color: "var(--border-gold)", fontSize: "2.4rem", lineHeight: 1 }}>
                  {t.num}
                </span>
                <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, var(--gold), transparent)", opacity: 0.3 }} />
              </div>
              <h3 className="font-display text-primary" style={{ fontSize: "1.15rem", fontWeight: 400, letterSpacing: "0.01em" }}>
                {t.heading}
              </h3>
              <p className="text-secondary" style={{ fontSize: "0.92rem", lineHeight: 1.7, fontWeight: 300 }}>
                {t.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
