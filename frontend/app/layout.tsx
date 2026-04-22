import type { Metadata } from "next";
import { ThemeProvider } from "./context/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Evora Capital — Hospitality Investment & Hotel Management",
  description:
    "Independent, strategic and transformational hospitality investment and hotel management solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased" data-theme="dark" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-page text-primary">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
