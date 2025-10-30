import React from "react";

type LoaderProps = {
    visible: boolean;
};

export default function Loader({ visible }: LoaderProps) {
    if (!visible) return null;

    return (
        <div
            className="fixed inset-0 z-[100] grid place-items-center bg-neutral-950"
            role="status"
            aria-live="polite"
            aria-busy="true"
        >
            {/* Spinning logo */}
            <img
                src="/logo/amandahelga_logo.PNG"
                alt="Loading"
                className="h-16 w-16 animate-spin-slow"
            />
            <span className="sr-only">Loading…</span>
        </div>
    );
}
