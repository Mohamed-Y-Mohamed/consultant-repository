"use client";

type Section = {
  id: string;
  num: string;
  label: string;
  heading: string;
  headingItalic?: string;
  headingTrailing?: string;
  paragraphs: string[];
};

const sections: Section[] = [
  {
    id: "intro",
    num: "01",
    label: "Welcome",
    heading: "Investment should be",
    headingItalic: "personal, purposeful, and powerful.",
    paragraphs: [
      "At Evora Capital, we believe investment should be personal, purposeful, and powerful. Founded with a vision to challenge the conventional, we offer a distinctive alternative to traditional capital firms—combining strategic insight, global reach, and an unwavering commitment to individuality.",
      "Where others prioritise scale over substance, we place people, partnerships, and long-term value at the centre of everything we do. We work alongside ambitious businesses and visionary leaders, providing not just capital, but clarity, flexibility, and forward-thinking guidance. Our approach is owner-aligned and adaptive, empowering our partners to grow on their own terms while benefiting from institutional-level expertise, access, and influence.",
    ],
  },
  {
    id: "what",
    num: "02",
    label: "What is Evora Capital?",
    heading: "Independent. Strategic.",
    headingItalic: "Transformational.",
    paragraphs: [
      "Evora Capital is more than an investment firm—it is a statement of intent. To partner with Evora is to embrace a philosophy rooted in originality, integrity, and ambition.",
      "We recognise that no two ventures are alike, which is why our approach is never standardised. Every partnership reflects the unique identity, goals, and potential of the people behind it.",
      "Driven by experienced investors and operators with a deep understanding of sustainable growth, innovation, and impact, Evora Capital represents a new generation of capital—one that values purpose as much as performance.",
      "We provide a modern alternative to traditional funding models: offering flexibility without compromise, support without control, and access without limitation. Through our global network and advanced market capabilities, we enable our partners to compete, scale, and succeed—while preserving the independence that defines them.",
    ],
  },
  {
    id: "hotel",
    num: "03",
    label: "Hotel Management",
    heading: "Custodians of performance,",
    headingItalic: "experience, and reputation.",
    paragraphs: [
      "At Evora Capital, our commitment extends beyond investment—we become custodians of performance, experience, and reputation.",
      "Our hotel management platform is a natural evolution of our philosophy: to empower owners while elevating every aspect of their asset. Through our comprehensive management contracts, we assume full operational responsibility, delivering excellence across the entire hospitality ecosystem with precision, accountability, and passion.",
      "From day-to-day operations to long-term strategic positioning, we act as trusted partners—aligning our expertise with each owner's vision to unlock the full potential of their property.",
    ],
  },
  {
    id: "operations",
    num: "04",
    label: "End-to-End Operational Excellence",
    heading: "Holistic, integrated,",
    headingItalic: "results-driven.",
    paragraphs: [
      "We oversee every dimension of hotel performance, including operations, Food & Beverage, revenue management, procurement, and Health & Safety, ensuring each function operates at the highest possible standard. Every decision is informed by data, guided by experience, and executed with discipline.",
      "In Food & Beverage, we create concepts that are not only commercially successful but also culturally relevant and experience-led—designed to enhance guest satisfaction while maximising profitability.",
      "Our revenue management strategies leverage advanced analytics, market intelligence, and global distribution capabilities to optimise performance, drive occupancy, and sustain long-term growth.",
      "Through strategic procurement, we deliver cost efficiencies without compromising quality—utilising our network and buying power to secure value, consistency, and reliability.",
      "Health & Safety remains fundamental to our operational philosophy. We uphold rigorous compliance standards, ensuring that every property operates with integrity, security, and complete peace of mind for owners, guests, and teams alike.",
    ],
  },
  {
    id: "partnership",
    num: "05",
    label: "A Partnership Built on Trust",
    heading: "Institutional discipline.",
    headingItalic: "Entrepreneurial agility.",
    paragraphs: [
      "What sets Evora Capital apart is our ability to combine institutional discipline with entrepreneurial agility.",
      "We do not impose a one-size-fits-all model. Instead, we tailor our management approach to reflect the individuality of each hotel—protecting its identity while enhancing its commercial strength.",
      "Our structure provides owners with full transparency, operational clarity, and the confidence that their asset is being managed with the same care and ambition as if it were our own.",
      "With Evora Capital, hotel management is not simply about oversight—it is about transformation. We create environments where operational excellence meets inspired guest experiences, and where financial performance is driven by thoughtful, strategic execution.",
    ],
  },
];

export default function AboutContent() {
  return (
    <div data-testid="about-content">
      {sections.map((s, idx) => (
        <section
          key={s.id}
          id={s.id}
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "5rem 0",
            background: idx % 2 === 1 ? "var(--bg-secondary)" : "var(--bg-page)",
          }}
        >
          {/* Ghost numeral */}
          <div aria-hidden style={{
            position: "absolute",
            top: "50%", left: idx % 2 === 0 ? "-1rem" : "auto",
            right: idx % 2 === 0 ? "auto" : "-1rem",
            transform: "translateY(-50%)",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(7rem, 20vw, 22rem)",
            fontWeight: 300, lineHeight: 1, color: "transparent",
            WebkitTextStroke: "1px var(--gold)", opacity: 0.035,
            userSelect: "none", pointerEvents: "none", letterSpacing: "-0.05em",
          }}>
            {s.num}
          </div>

          <div style={{ position: "relative", zIndex: 10, maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: "2.5rem" }} className="about-section-grid">
                {/* Left meta */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
                    <span className="font-mono" style={{ fontSize: "0.62rem", letterSpacing: "0.24em", color: "var(--gold)", textTransform: "uppercase", opacity: 0.85 }}>
                      — {s.num}
                    </span>
                    <div style={{ height: "1px", flex: 1, maxWidth: "140px", background: "linear-gradient(90deg, var(--gold), transparent)", opacity: 0.45 }} />
                  </div>
                  <p className="font-mono" style={{ fontSize: "0.62rem", letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase", opacity: 0.9, marginBottom: "20px" }}>
                    {s.label}
                  </p>
                  <h2 className="display-heading" style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)", fontWeight: 300, lineHeight: 1.12, color: "var(--text-primary)" }}>
                    {s.heading}
                    {s.headingItalic && (
                      <>
                        <br />
                        <em style={{ color: "var(--gold)", fontStyle: "italic" }}>{s.headingItalic}</em>
                      </>
                    )}
                    {s.headingTrailing && <> {s.headingTrailing}</>}
                  </h2>
                </div>

                {/* Right paragraphs */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: "38rem" }}>
                  {s.paragraphs.map((p, i) => (
                    <p key={i} style={{ color: "var(--text-secondary)", fontSize: "clamp(0.95rem, 1.6vw, 1.02rem)", lineHeight: 1.85, fontWeight: 300 }}>
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <style>{`
            .about-section-grid { grid-template-columns: minmax(0, 1fr); }
            @media (min-width: 900px) {
              .about-section-grid {
                grid-template-columns: 1fr 1.2fr;
                gap: 5rem;
                align-items: flex-start;
              }
            }
          `}</style>
        </section>
      ))}
    </div>
  );
}
