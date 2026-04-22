import type { Metadata } from "next";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import AboutHero from "../components/about/AboutHero";
import AboutContent from "../components/about/AboutContent";
import CtaStrip from "../components/home/CtaStrip";

export const metadata: Metadata = {
  title: "About — Evora Capital",
  description:
    "Independent. Strategic. Transformational. Learn the philosophy behind Evora Capital's approach to hospitality investment and hotel management.",
};

export default function AboutPage() {
  return (
    <div className="bg-page min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <AboutHero />
        <AboutContent />
        <CtaStrip />
      </main>
      <Footer />
    </div>
  );
}
