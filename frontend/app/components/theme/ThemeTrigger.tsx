"use client";
import { useTheme } from "../../context/ThemeProvider";

export default function ThemeTrigger() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="theme-toggle"
      data-testid="theme-toggle"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="theme-toggle-knob" />
      {/* Sun — dark mode */}
      <span
        style={{
          position: "absolute",
          right: "6px",
          top: "50%",
          transform: "translateY(-50%)",
          opacity: isDark ? 0.85 : 0,
          transition: "opacity 0.3s ease",
          lineHeight: 1,
          display: "inline-flex",
        }}
      >
        <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
          <line x1="8" y1="1" x2="8" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="8" y1="13" x2="8" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="1" y1="8" x2="3" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="13" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="2.93" y1="2.93" x2="4.34" y2="4.34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="11.66" y1="11.66" x2="13.07" y2="13.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="2.93" y1="13.07" x2="4.34" y2="11.66" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="11.66" y1="4.34" x2="13.07" y2="2.93" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </span>
      {/* Moon — light mode */}
      <span
        style={{
          position: "absolute",
          left: "6px",
          top: "50%",
          transform: "translateY(-50%)",
          opacity: isDark ? 0 : 0.85,
          transition: "opacity 0.3s ease",
          lineHeight: 1,
          display: "inline-flex",
        }}
      >
        <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
          <path
            d="M13.5 10A6 6 0 016 2.5a.5.5 0 00-.6.65A6.5 6.5 0 1013.35 10.6a.5.5 0 00-.65-.6H13.5z"
            fill="currentColor"
          />
        </svg>
      </span>
    </button>
  );
}
