import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "./context/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Evora Capital — Hospitality Investment & Hotel Management",
  description:
    "Independent, strategic and transformational hospitality investment and hotel management solutions",

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon32.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/favicon48.ico", sizes: "48x48", type: "image/x-icon" },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

// Prevent theme flash
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
    <html
      lang="en"
      className="h-full antialiased"
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />

        {/* Windows tile */}
        <meta name="msapplication-TileImage" content="/mstile-150x150.png" />
        <meta name="msapplication-TileColor" content="#000000" />
      </head>

      <body className="min-h-full flex flex-col bg-page text-primary">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
