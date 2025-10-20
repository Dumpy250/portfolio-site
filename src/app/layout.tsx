import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    display: "swap",
});
const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    // shown in tab titles; child pages can set `title` to use the template
    title: {
        default: "Cameron Basham — Portfolio",
        template: "%s — Cameron Basham",
    },
    description:
        "Backend & Cloud software engineer. Java/Spring Boot, AWS (VPC, RDS, Cognito), React/Next.js, Docker. Veteran; ML-curious.",
    metadataBase: new URL("https://cameron-basham.com"),
    openGraph: {
        title: "Cameron Basham — Portfolio",
        description:
            "Backend & Cloud software engineer. Java/Spring Boot, AWS, React/Next.js.",
        url: "/",
        siteName: "Cameron Basham",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Cameron Basham — Portfolio",
        description:
            "Backend & Cloud software engineer. Java/Spring Boot, AWS, React/Next.js.",
    },
    icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className="h-full">
        <body
            className={`${geistSans.variable} ${geistMono.variable} bg-black text-white antialiased min-h-screen`}
        >
        <Navbar />
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        <footer className="border-t border-white/10 py-6 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} Cameron Basham
        </footer>
        </body>
        </html>
    );
}

