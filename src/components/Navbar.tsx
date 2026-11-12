import ThemeImage from "./ThemeImage";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

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
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false); // close mobile menu when a link is clicked
  };

  const renderLink = (l: NavLink, extraClasses = "") => {
    const baseClasses = `text-body hover:text-brand transition ${extraClasses}`;
    if (l.type === "route") {
      return (
        <Link to={l.to} className={baseClasses} onClick={handleLinkClick}>
          {l.label}
        </Link>
      );
    }
    return (
      <a href={l.href} className={baseClasses} onClick={handleLinkClick}>
        {l.label}
      </a>
    );
  };

  return (
    <nav className="sticky top-0 z-50 bg-page">
      <div
        className={`mx-auto max-w-6xl px-4 h-14 flex items-center justify-between transition-colors ${
          scrolled ? "border-b border-line" : "border-b-0"
        }`}
      >
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 text-ink hover:text-brand font-semibold tracking-wide transition"
          onClick={handleLinkClick}
        >
          <ThemeImage
            dark="/logo/amandahelga_logo.png"
            light="/logo/amandahelga_logo-light.png"
            alt="amandahelga logo"
            className="h-8 w-8"
            fit="contain"
          />
          amandahelga
        </Link>

        <div className="flex items-center gap-3 sm:gap-6">
          {/* Desktop nav */}
          <ul className="hidden sm:flex items-center gap-6">
            {links.map((l) => (
              <li key={l.label}>{renderLink(l)}</li>
            ))}
          </ul>

          {/* Light / dark switch (desktop and mobile) */}
          <ThemeToggle />

          {/* Mobile hamburger */}
          <button
            className="sm:hidden text-body hover:text-brand focus:outline-none focus:ring-2 focus:ring-brand rounded-md p-1"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="text-2xl leading-none">
              {isOpen ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile dropdown overlay (does NOT push content down) */}
      <div
        id="mobile-menu"
        className={`
          sm:hidden 
          fixed inset-x-0 top-14 z-40
          bg-page/95 border-b border-line
          transition-[transform,opacity] duration-200
          ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0 pointer-events-none"}
        `}
      >
        <ul className="flex flex-col gap-2 px-4 py-3">
          {links.map((l) => (
            <li key={l.label}>{renderLink(l, "block py-1")}</li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
