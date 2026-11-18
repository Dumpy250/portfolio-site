import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import "./globals.css";
const sans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});
const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});
const description =
  "Cameron Basham — software engineering student working on applications, simulation tools, computer vision, and games. Expected graduation December 2026.";
export const metadata: Metadata = {
  title: {
    default: "Cameron Basham — Software Engineer",
    template: "%s — Cameron Basham",
  },
  description,
  metadataBase: new URL("https://www.cameron-basham.com"),
  openGraph: {
    title: "Cameron Basham — Software Engineer",
    description,
    url: "/",
    siteName: "Cameron Basham",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cameron Basham — Software Engineer",
    description,
  },
  icons: { icon: "/icon.svg" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${mono.variable}`}>
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <Navbar />
        <main id="content" tabIndex={-1}>
          {children}
        </main>
        <footer className="site-footer">
          <div className="shell">
            <span>© {new Date().getFullYear()} Cameron Basham</span>
            <span>Software, with purpose.</span>
            <Link href="/contact">Get in touch ↗</Link>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
