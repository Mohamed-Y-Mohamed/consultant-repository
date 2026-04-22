"use client";

export default function Welcome() {
  return (
    <section id="welcome" data-testid="landing-welcome" className="relative py-32 overflow-hidden bg-secondary">
      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "256px 256px",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, var(--gold) 30%, var(--gold) 70%, transparent 100%)", opacity: 0.4 }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-[auto_1fr] gap-12 md:gap-20 items-start">
        {/* Ghost numeral + label column */}
        <div className="flex flex-col items-start">
          <span className="section-label mb-4">
            <span className="gold-line" />
            Welcome
          </span>
          <div
            className="font-display select-none"
            style={{
              fontSize: "clamp(6rem, 12vw, 11rem)",
              color: "transparent",
              WebkitTextStroke: "1px var(--border-gold)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
            }}
            aria-hidden
          >
            01
          </div>
        </div>

        <div className="max-w-2xl">
          <h2
            className="display-heading text-primary mb-10"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)", lineHeight: 1.15, fontWeight: 300 }}
          >
            Investment should be{" "}
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>personal, purposeful, and powerful.</em>
          </h2>

          <div className="space-y-6 text-secondary leading-relaxed" style={{ fontSize: "1.02rem", fontWeight: 300 }}>
            <p>
              Founded with a vision to challenge the conventional, Evora Capital offers a distinctive
              alternative to traditional capital firms—combining strategic insight, global reach, and
              an unwavering commitment to individuality. Where others prioritise scale over substance,
              we place people, partnerships, and long-term value at the centre of everything we do.
            </p>
            <p>
              We work alongside ambitious businesses and visionary leaders, providing not just capital,
              but clarity, flexibility, and forward-thinking guidance. Our approach is owner-aligned
              and adaptive, empowering our partners to grow on their own terms while benefiting from
              institutional-level expertise, access, and influence.
            </p>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <a href="/about" className="btn-outline" data-testid="welcome-cta-about">
              Read Our Story
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
