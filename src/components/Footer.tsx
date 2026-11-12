import React from "react";

export default function Footer() {
  return (
    <footer className="bg-page text-muted border-t border-line mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left side: Brand */}
        <a href="#home" className="flex items-center gap-2 text-ink font-semibold tracking-wide">
          <img
            src="/logo/amandahelga_logo.png"
            alt="amandahelga logo"
            className="h-6 w-6 object-contain"
          />
          amandahelga
        </a>


        {/* Right side: Copyright */}
        <p className="text-xs text-faint sm:text-sm">
          © {new Date().getFullYear()} amandahelga. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
