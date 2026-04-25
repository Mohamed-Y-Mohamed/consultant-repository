"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ThemeTrigger from "../theme/ThemeTrigger";
import { SERVICES } from "../../lib/services";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking elsewhere (use click phase, not mousedown — avoids race with button click)
  useEffect(() => {
    if (!servicesOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [servicesOpen]);

  // Close on Escape
  useEffect(() => {
    if (!servicesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setServicesOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [servicesOpen]);

  return (
    <header
      data-testid="main-navbar"
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled ? "var(--bg-nav)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--border)"
          : "1px solid transparent",
        transition: "background 0.5s ease, border-color 0.5s ease",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-3 sm:gap-4 md:gap-6">
        {/* Logo / wordmark */}
        <Link
          href="/"
          data-testid="nav-logo-link"
          className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0"
          style={{ textDecoration: "none" }}
        >
          <img
            src="/logo.png"
            alt="Evora Capital"
            style={{
              width: "3.5em",
              height: "3.5em",
              flexShrink: 0,
              objectFit: "contain",
            }}
          />

          <span
            className="font-display wordmark whitespace-nowrap"
            style={{
              color: "var(--text-primary)",
              fontWeight: 300,
              letterSpacing: "0.18em",
              fontSize: "0.72rem",
              textTransform: "uppercase",
            }}
          >
            Evora Capital
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
          <Link
            href="/"
            data-testid="nav-link-home"
            className="font-mono nav-link"
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Home
          </Link>
          <Link
            href="/about"
            data-testid="nav-link-about"
            className="font-mono nav-link"
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            About
          </Link>

          {/* Services — dropdown */}
          <div
            ref={wrapperRef}
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setServicesOpen((v) => !v)}
              data-testid="nav-services-trigger"
              className="font-mono nav-link inline-flex items-center gap-1.5"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "0.5rem 0",
                color: servicesOpen ? "var(--gold)" : "var(--text-secondary)",
              }}
              aria-expanded={servicesOpen}
              aria-haspopup="menu"
            >
              Services
              <svg
                width="15"
                height="15"
                viewBox="0 0 12 12"
                fill="none"
                style={{
                  transition: "transform 0.25s ease",
                  transform: servicesOpen ? "rotate(180deg)" : "rotate(0)",
                }}
              >
                <path
                  d="M2 4l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div
              className={`services-dropdown ${servicesOpen ? "open" : ""}`}
              role="menu"
              data-testid="services-dropdown"
            >
              <p
                className="font-mono px-3.5 pt-2 pb-3"
                style={{
                  fontSize: "0.58rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  opacity: 0.7,
                }}
              >
                — Our Services
              </p>
              {SERVICES.map((s) => (
                <Link
                  key={s.id}
                  href={`/services?s=${s.id}`}
                  className="services-dropdown-item"
                  data-testid={`services-dropdown-item-${s.id}`}
                  onClick={() => setServicesOpen(false)}
                >
                  <span className="ddi-title">{s.title}</span>
                  <span className="ddi-sub">{s.subtext}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
          <ThemeTrigger />
          <Link
            href="/contactus"
            data-testid="nav-contact-cta"
            className="btn-primary hidden md:inline-flex"
            style={{ fontSize: "0.7rem", padding: "10px 22px" }}
          >
            Contact
            <svg
              style={{ width: "12px", height: "12px" }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col items-center justify-center gap-[5px] p-1 bg-transparent border-0 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            data-testid="nav-mobile-hamburger"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: "20px",
                  height: "1px",
                  background: "var(--text-primary)",
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                  transform: menuOpen
                    ? i === 0
                      ? "rotate(45deg) translateY(6px)"
                      : i === 2
                        ? "rotate(-45deg) translateY(-6px)"
                        : "none"
                    : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        style={{
          maxHeight: menuOpen ? "calc(100vh - 4.5rem)" : "0",
          overflow: "hidden",
          transition: "max-height 0.5s ease",
        }}
      >
        <div
          style={{
            padding: "1rem 1.5rem 2rem",
            borderTop: "1px solid var(--border)",
            background: "var(--bg-nav)",
            backdropFilter: "blur(14px)",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            maxHeight: "calc(100vh - 4.5rem)",
            overflowY: "auto",
          }}
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="font-mono"
              data-testid={`mobile-nav-${l.label.toLowerCase()}`}
              style={{
                fontSize: "0.72rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--text-secondary)",
                textDecoration: "none",
              }}
            >
              {l.label}
            </Link>
          ))}

          {/* Mobile services accordion */}
          <div>
            <button
              type="button"
              onClick={() => setMobileServicesOpen((v) => !v)}
              data-testid="mobile-services-toggle"
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.72rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: mobileServicesOpen
                  ? "var(--gold)"
                  : "var(--text-secondary)",
              }}
            >
              Services
              <img
                src="/logo.png"
                alt="Evora Capital"
                style={{
                  width: "24px",
                  height: "24px",
                  flexShrink: 0,
                  objectFit: "contain",
                }}
              />
            </button>
            <div
              style={{
                maxHeight: mobileServicesOpen ? "800px" : "0",
                overflow: "hidden",
                transition: "max-height 0.4s ease",
                marginTop: mobileServicesOpen ? "12px" : "0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  paddingLeft: "4px",
                }}
              >
                {SERVICES.map((s) => (
                  <Link
                    key={s.id}
                    href={`/services?s=${s.id}`}
                    data-testid={`mobile-services-item-${s.id}`}
                    onClick={() => {
                      setMenuOpen(false);
                      setMobileServicesOpen(false);
                    }}
                    style={{
                      display: "block",
                      textDecoration: "none",
                      borderLeft: "1px solid var(--border)",
                      paddingLeft: "14px",
                    }}
                  >
                    <span
                      className="font-display"
                      style={{
                        color: "var(--text-primary)",
                        fontSize: "1rem",
                        lineHeight: 1.2,
                        display: "block",
                      }}
                    >
                      {s.title}
                    </span>
                    <span
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "0.75rem",
                        lineHeight: 1.4,
                        marginTop: "2px",
                        display: "block",
                      }}
                    >
                      {s.subtext}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/contactus"
            onClick={() => setMenuOpen(false)}
            data-testid="mobile-contact-cta"
            className="btn-primary"
            style={{
              alignSelf: "flex-start",
              fontSize: "0.7rem",
              marginTop: "0.5rem",
            }}
          >
            Contact Us
          </Link>
        </div>
      </div>

      <style>{`
        .wordmark { font-size: 0.68rem; letter-spacing: 0.14em; }
        @media (min-width: 380px) { .wordmark { font-size: 0.72rem; letter-spacing: 0.18em; } }
        @media (min-width: 768px) { .wordmark { font-size: 0.8rem; letter-spacing: 0.22em; } }
      `}</style>
    </header>
  );
}
