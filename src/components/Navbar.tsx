"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    // close the mobile menu when a link is clicked
    const close = () => setOpen(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
                <Link href="/" className="font-semibold text-lg tracking-tight">CB</Link>

                {/* Desktop links */}
                <ul className="hidden gap-6 md:flex">
                    {links.map((l) => {
                        const active = pathname === l.href;
                        return (
                            <li key={l.href}>
                                <Link
                                    href={l.href}
                                    className={`text-sm transition-colors hover:underline underline-offset-4 ${
                                        active ? "text-white" : "text-gray-300"
                                    }`}
                                >
                                    {l.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Hamburger */}
                <button
                    aria-label="Toggle menu"
                    className="inline-flex items-center justify-center rounded-md p-2 ring-1 ring-white/10 md:hidden"
                    onClick={() => setOpen((v) => !v)}
                >
                    {/* Icon swaps based on state */}
                    {open ? (
                        // X icon
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    ) : (
                        // Hamburger icon
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    )}
                </button>
            </nav>

            {/* Mobile menu */}
            <div
                className={`md:hidden overflow-hidden border-t border-white/10 transition-[max-height] duration-300 ${
                    open ? "max-h-64" : "max-h-0"
                }`}
            >
                <ul className="flex flex-col px-6 py-3 gap-3">
                    {links.map((l) => {
                        const active = pathname === l.href;
                        return (
                            <li key={l.href}>
                                <Link
                                    href={l.href}
                                    onClick={close}
                                    className={`block rounded-lg px-3 py-2 text-sm transition hover:bg-white/5 ${
                                        active ? "text-white" : "text-gray-300"
                                    }`}
                                >
                                    {l.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </header>
    );
}

