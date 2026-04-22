export type ServiceItem = {
  id: string;
  index: string;
  title: string;
  subtext: string;
  tagline: string;
  description: string;
  tags?: string[];
  extra?: string[];
};

export const SERVICES: ServiceItem[] = [
  {
    id: "1",
    index: "01",
    title: "Management Contracts",
    subtext: "Complete operational oversight with owner confidence",
    tagline: "Complete peace of mind. Total performance.",
    description:
      "Our management contracts are designed for owners who want a truly hands-off experience without compromising results. We take full responsibility for your property—overseeing operations, revenue management, marketing, Food & Beverage, procurement, and compliance.\n\nFrom the day-to-day running of your hotel to long-term strategic growth, we manage every detail with precision and accountability. Our goal is simple: to optimise performance while allowing you to step back with complete confidence that your asset is in expert hands.",
    tags: ["Operations", "F&B", "Procurement", "Compliance"],
  },
  {
    id: "2",
    index: "02",
    title: "Revenue Management",
    subtext: "Data-led pricing, forecasting and stronger returns",
    tagline: "Smarter strategy. Stronger returns.",
    description:
      "For owners with an existing team in place, we offer a dedicated remote revenue management service. We work alongside your on-site staff to drive performance through data-led pricing, demand forecasting, and distribution strategy.\n\nOur focus is on maximising occupancy, increasing average daily rates, and unlocking untapped revenue opportunities—while you retain full operational control of your property.",
    tags: ["Pricing", "Forecasting", "Distribution", "ADR"],
  },
  {
    id: "3",
    index: "03",
    title: "Property Sales",
    subtext: "Global investor reach with flexible representation",
    tagline: "Global reach. Flexible approach.",
    description:
      "We connect your property to a global network of qualified investors, positioning it for maximum visibility and value. Our sales strategy is tailored, discreet, and results-driven.\n\nUnlike traditional brokers, we do not require exclusivity. We believe flexibility accelerates success, giving you the freedom to explore multiple avenues while benefiting from our international reach and expertise.",
    tags: ["Global Network", "Non-Exclusive", "Discreet", "Investor-ready"],
  },
  {
    id: "4",
    index: "04",
    title: "Digital Marketing",
    subtext: "Targeted visibility, campaigns and brand positioning",
    tagline: "Visibility that drives results.",
    description:
      "We elevate your brand through targeted digital campaigns and strategic positioning across key platforms. From social media and online travel channels to premium placements and influencer collaborations, we ensure your property stands out in a competitive market.\n\nOur network also enables celebrity and high-profile endorsements, creating powerful brand associations that enhance credibility, awareness, and demand.",
    tags: ["Social", "OTA", "Influencer", "Brand"],
  },
  {
    id: "5",
    index: "05",
    title: "Staffing Solutions",
    subtext: "Reliable hospitality talent across key departments",
    tagline: "The right people, exactly when you need them.",
    description:
      "We provide reliable, high-quality staffing solutions tailored to the needs of your business. Whether you require a full-time team member or last-minute cover, we deliver quickly and efficiently.",
    tags: ["Permanent", "Contract", "On-demand"],
    extra: [
      "Administration",
      "Front Desk & Guest Services",
      "Maintenance",
      "Kitchen & Culinary Teams",
      "Operations Management",
      "Bar & Restaurant Staff",
    ],
  },
];
