import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function currentTheme(): Theme {
    // index.html sets this before the page paints
    return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

export default function ThemeToggle({ className = "" }: { className?: string }) {
    const [theme, setTheme] = useState<Theme>(currentTheme);

    // Follow the system setting until the visitor picks a theme themselves
    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: light)");
        const onChange = (e: MediaQueryListEvent) => {
            let saved: string | null = null;
            try {
                saved = localStorage.getItem("theme");
            } catch {
                /* storage unavailable */
            }
            if (saved) return;
            const next: Theme = e.matches ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", next);
            setTheme(next);
        };
        media.addEventListener("change", onChange);
        return () => media.removeEventListener("change", onChange);
    }, []);

    const toggle = () => {
        const next: Theme = theme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        try {
            localStorage.setItem("theme", next);
        } catch {
            /* storage unavailable: the choice just won't be remembered */
        }
        setTheme(next);
    };

    const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={label}
            title={label}
            className={`grid h-9 w-9 place-items-center rounded-full border border-line text-body transition hover:border-line-strong hover:text-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${className}`}
        >
            {theme === "dark" ? (
                // Sun: shown in dark mode, switches to light
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
            ) : (
                // Moon: shown in light mode, switches to dark
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
            )}
        </button>
    );
}
