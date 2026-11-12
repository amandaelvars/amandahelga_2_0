/**
 * Shows one image in dark mode and another in light mode.
 *
 * Both images are loaded up front and stacked; CSS fades between them when the
 * theme changes (see .dark-only / .light-only in index.css). That way switching
 * themes never waits for a download, and the picture changes at the same moment
 * as the page colors.
 *
 * The wrapper needs a size: pass it in className (e.g. "h-8 w-8" or "h-full w-full").
 */
export default function ThemeImage({
    dark,
    light,
    alt,
    className = "",
    fit = "cover",
    loading,
}: {
    dark: string;
    light: string;
    alt: string;
    className?: string;
    fit?: "cover" | "contain";
    loading?: "lazy" | "eager";
}) {
    const imgClass = `dark-only absolute inset-0 h-full w-full ${fit === "cover" ? "object-cover" : "object-contain"}`;
    return (
        <span className={`relative block ${className}`}>
            <img src={dark} alt={alt} className={imgClass} loading={loading} />
            <img
                src={light}
                alt=""
                aria-hidden="true"
                className={imgClass.replace("dark-only", "light-only")}
                loading={loading}
            />
        </span>
    );
}
