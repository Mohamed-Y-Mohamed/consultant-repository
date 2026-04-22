import type { Metadata } from "next";
import { ThemeProvider } from "./context/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Evora Capital — Hospitality Investment & Hotel Management",
  description:
    "Independent, strategic and transformational hospitality investment and hotel management solutions.",
};

// Inline script to set data-theme from localStorage BEFORE React hydrates — prevents FOUC and stuck theme.
const themeInitScript = `
(function() {
  try {
    var t = localStorage.getItem('theme');
    if (t !== 'light' && t !== 'dark') { t = 'dark'; }
    document.documentElement.setAttribute('data-theme', t);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-page text-primary">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
