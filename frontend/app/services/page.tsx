import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import ServicesHero from "../components/services/ServicesHero";
import ServicesList from "../components/services/ServicesList";
import CtaStrip from "../components/home/CtaStrip";

export const metadata: Metadata = {
  title: "Services — Evora Capital",
  description:
    "Management Contracts, Revenue Management, Property Sales, Digital Marketing, and Staffing Solutions for hospitality owners and operators.",
};

export default function ServicesPage() {
  return (
    <div className="bg-page min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <ServicesHero />
        <Suspense fallback={<div className="min-h-[40vh]" />}>
          <ServicesList />
        </Suspense>
        <CtaStrip />
      </main>
      <Footer />
    </div>
  );
}
