"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const links = [
  { href: "/projects", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <nav className="shell nav-layout" aria-label="Primary navigation">
        <Link href="/" className="brand" aria-label="Cameron Basham, home">
          <span className="brand-mark">cb.</span>
          <span>
            Cameron
            <br />
            Basham
          </span>
        </Link>
        <div className="desktop-nav">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <a className="nav-resume" href="/resume.pdf">
            Résumé ↗
          </a>
        </div>
        <details key={pathname} className="mobile-nav">
          <summary>
            Menu <span aria-hidden="true">+</span>
          </summary>
          <div>
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
            <a href="/resume.pdf">Résumé ↗</a>
          </div>
        </details>
      </nav>
    </header>
  );
}
