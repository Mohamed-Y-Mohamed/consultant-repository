import type { Metadata } from "next";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import ContactHero from "../components/contact/ContactHero";
import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";

export const metadata: Metadata = {
  title: "Contact — Evora Capital",
  description:
    "Speak to Evora Capital. Enquiries handled with complete discretion — typical response within three business days.",
};

export default function ContactPage() {
  return (
    <div className="bg-page min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <ContactHero />
        <section className="relative py-24 overflow-hidden bg-page">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-[1.35fr_1fr] gap-12 lg:gap-20 items-start">
              <div style={{ border: "1px solid var(--border)", padding: "clamp(1.5rem, 4vw, 3rem)", background: "var(--bg-secondary)" }}>
                <div className="mb-8 flex items-start justify-between gap-6">
                  <div>
                    <span className="section-label mb-3 inline-block">
                      <span className="gold-line" />
                      Enquiry Form
                    </span>
                    <h2 className="display-heading text-primary mt-2" style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.3rem)", fontWeight: 300, lineHeight: 1.15 }}>
                      Share a few details.
                    </h2>
                  </div>
                  <span className="font-mono" style={{ fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)", opacity: 0.6, whiteSpace: "nowrap" }}>
                    — 01 / 01
                  </span>
                </div>
                <ContactForm />
              </div>
              <ContactInfo />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
