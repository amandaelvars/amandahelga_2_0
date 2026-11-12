import ThemeImage from "./ThemeImage";
import React from "react";

type LoaderProps = {
    visible: boolean;
};

export default function Loader({ visible }: LoaderProps) {
    if (!visible) return null;

    return (
        <div
            className="fixed inset-0 z-[100] grid place-items-center bg-page"
            role="status"
            aria-live="polite"
            aria-busy="true"
        >
            {/* Spinning logo */}
            <ThemeImage
                dark="/logo/amandahelga_logo.png"
                light="/logo/amandahelga_logo-light.png"
                alt="Loading"
                className="h-16 w-16 animate-spin-slow"
                fit="contain"
            />
            <span className="sr-only">Loading…</span>
        </div>
    );
}
