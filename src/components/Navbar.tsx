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

                <div className="flex items-center gap-3">
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

                    {/* External icons */}
                    <div className="hidden items-center gap-2 md:flex">
                        <a
                            aria-label="GitHub"
                            href="https://github.com/Dumpy250"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex rounded-md p-1.5 text-gray-300 ring-1 ring-white/10 transition-colors hover:bg-white/5 hover:text-white"
                        >
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                                <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.12.82-.26.82-.57v-2c-3.34.73-4.04-1.62-4.04-1.62a3.18 3.18 0 0 0-1.34-1.75c-1.1-.75.08-.74.08-.74a2.5 2.5 0 0 1 1.82 1.23 2.54 2.54 0 0 0 3.48 1 2.55 2.55 0 0 1 .76-1.6c-2.67-.3-5.47-1.34-5.47-5.95A4.66 4.66 0 0 1 5.58 8a4.33 4.33 0 0 1 .12-3.2s1-.33 3.3 1.25a11.39 11.39 0 0 1 6 0c2.3-1.58 3.3-1.25 3.3-1.25a4.33 4.33 0 0 1 .12 3.2 4.66 4.66 0 0 1 1.24 3.23c0 4.62-2.81 5.64-5.49 5.94a2.86 2.86 0 0 1 .82 2.22v3.29c0 .31.22.69.83.57A12 12 0 0 0 12 .5Z" />
                            </svg>
                        </a>
                        <a
                            aria-label="LinkedIn"
                            href="https://www.linkedin.com/in/cameron-basham-7555ba166"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex rounded-md p-1.5 text-gray-300 ring-1 ring-white/10 transition-colors hover:bg-white/5 hover:text-white"
                        >
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                                <path d="M4.98 3.5A2.48 2.48 0 1 0 5 8.46a2.48 2.48 0 0 0-.02-4.96ZM3 9h4v12H3V9Zm7 0h3.83v1.64h.05c.53-1.01 1.83-2.07 3.77-2.07 4.03 0 4.78 2.65 4.78 6.09V21h-4v-5.56c0-1.33-.02-3.05-1.86-3.05-1.87 0-2.16 1.46-2.16 2.96V21h-4V9Z" />
                            </svg>
                        </a>
                    </div>

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
                </div>
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
                <div className="flex items-center gap-2 px-6 pb-4">
                    <a
                        aria-label="GitHub"
                        href="https://github.com/Dumpy250"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={close}
                        className="inline-flex rounded-md p-1.5 text-gray-300 ring-1 ring-white/10 transition-colors hover:bg-white/5 hover:text-white"
                    >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                            <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.12.82-.26.82-.57v-2c-3.34.73-4.04-1.62-4.04-1.62a3.18 3.18 0 0 0-1.34-1.75c-1.1-.75.08-.74.08-.74a2.5 2.5 0 0 1 1.82 1.23 2.54 2.54 0 0 0 3.48 1 2.55 2.55 0 0 1 .76-1.6c-2.67-.3-5.47-1.34-5.47-5.95A4.66 4.66 0 0 1 5.58 8a4.33 4.33 0 0 1 .12-3.2s1-.33 3.3 1.25a11.39 11.39 0 0 1 6 0c2.3-1.58 3.3-1.25 3.3-1.25a4.33 4.33 0 0 1 .12 3.2 4.66 4.66 0 0 1 1.24 3.23c0 4.62-2.81 5.64-5.49 5.94a2.86 2.86 0 0 1 .82 2.22v3.29c0 .31.22.69.83.57A12 12 0 0 0 12 .5Z" />
                        </svg>
                    </a>
                    <a
                        aria-label="LinkedIn"
                        href="https://www.linkedin.com/in/cameron-basham-7555ba166"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={close}
                        className="inline-flex rounded-md p-1.5 text-gray-300 ring-1 ring-white/10 transition-colors hover:bg-white/5 hover:text-white"
                    >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                            <path d="M4.98 3.5A2.48 2.48 0 1 0 5 8.46a2.48 2.48 0 0 0-.02-4.96ZM3 9h4v12H3V9Zm7 0h3.83v1.64h.05c.53-1.01 1.83-2.07 3.77-2.07 4.03 0 4.78 2.65 4.78 6.09V21h-4v-5.56c0-1.33-.02-3.05-1.86-3.05-1.87 0-2.16 1.46-2.16 2.96V21h-4V9Z" />
                        </svg>
                    </a>
                </div>
            </div>
        </header>
    );
}

