import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/home/Hero";
import Welcome from "./components/home/Welcome";
import WhatWeDo from "./components/home/WhatWeDo";
import ServicesPreview from "./components/home/ServicesPreview";
import WhyEvora from "./components/home/WhyEvora";
import CtaStrip from "./components/home/CtaStrip";

export default function HomePage() {
  return (
    <div className="bg-page min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Welcome />
        <WhatWeDo />
        <ServicesPreview />
        <WhyEvora />
        <CtaStrip />
      </main>
      <Footer />
    </div>
  );
}
