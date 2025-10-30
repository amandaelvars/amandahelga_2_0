import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type NavLink =
  | { label: string; href: string; type: "anchor" }
  | { label: string; to: string; type: "route" };

const links: NavLink[] = [
  { label: "Home", to: "/", type: "route" },
  { label: "About Me", href: "/#about", type: "anchor" },
  { label: "Portfolio", to: "/portfolio", type: "route" },
  { label: "Resume", to: "/resume", type: "route" },
  { label: "Contact", to: "/contact", type: "route" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-neutral-950">
      <div
        className={`mx-auto max-w-6xl px-4 h-14 flex items-center justify-between transition-colors ${scrolled ? "border-b border-neutral-800" : "border-b-0"
          }`}
      >
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 text-white hover:text-brand font-semibold tracking-wide transition"
        >
          <img
            src="/logo/amandahelga_logo.PNG"
            alt="amandahelga logo"
            className="h-8 w-8 object-contain"
          />
          amandahelga
        </Link>

        {/* Desktop nav */}
        <ul className="hidden sm:flex items-center gap-6">
          {links.map((l) => (
            <li key={l.label}>
              {l.type === "route" ? (
                <Link
                  to={l.to}
                  className="text-gray-300 hover:text-brand transition"
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  href={l.href}
                  className="text-gray-300 hover:text-brand transition"
                >
                  {l.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile placeholder */}
        <button
          className="sm:hidden text-gray-300 hover:text-brand"
          aria-label="Open menu"
        >
          ☰
        </button>
      </div>
    </nav>
  );
}
