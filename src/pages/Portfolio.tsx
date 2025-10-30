import React, { useMemo, useState } from "react";
// Ensure tsconfig.app.json has: "resolveJsonModule": true, "allowSyntheticDefaultImports": true
import projectsData from "../data/projects.json";
console.log("Raw projectsData import:", projectsData);

type LinkSet = { repo?: string | null; demo?: string | null; doc?: string | null };

type Project = {
    id: string;
    title: string;
    dates: string;
    stack: string[];
    summary?: string;
    bullets?: string[];
    coverImage?: string;
    links?: LinkSet;
    tags?: string[];
};

// --- Normalize JSON import to Project[] (handles array or {default: array}) ---
function toProjects(raw: unknown): Project[] {
    if (Array.isArray(raw)) return raw as Project[];
    if (raw && typeof raw === "object" && Array.isArray((raw as any).default)) {
        return (raw as any).default as Project[];
    }
    return [];
}

const projects: Project[] = toProjects(projectsData);

export default function Portfolio() {
    const [activeTag, setActiveTag] = useState<string>("All");

    const allTags = useMemo(() => {
        const s = new Set<string>();
        projects.forEach((p) => (p.tags ?? []).forEach((t) => s.add(t)));
        return ["All", ...Array.from(s).sort()];
    }, []);

    const filtered = useMemo(() => {
        if (activeTag === "All") return projects;
        return projects.filter((p) => (p.tags ?? []).includes(activeTag));
    }, [activeTag]);

    return (
        <main className="bg-neutral-950 text-gray-100">
            {/* spacer for sticky navbar */}
            <div className="h-14" />

            <div className="mx-auto max-w-6xl px-4 py-10">
                <header className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>

                    {/* Tag filter */}
                    <div className="flex flex-wrap items-center gap-2">
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setActiveTag(tag)}
                                className={[
                                    "px-3 py-1 rounded-full text-sm border transition",
                                    activeTag === tag
                                        ? "border-[#e5dbcb] text-[#e5dbcb] bg-neutral-900"
                                        : "border-neutral-800 text-gray-300 hover:border-neutral-700",
                                ].join(" ")}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </header>

                <hr className="my-6 border-neutral-800" />

                {projects.length === 0 ? (
                    <p className="text-gray-400">
                        No projects found. Make sure <code>src/data/projects.json</code> is an array and
                        restart the dev server after changing <code>tsconfig</code>.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {filtered.map((p) => (
                            <article
                                key={p.id}
                                className="bg-neutral-900/40 border border-neutral-800 rounded-xl overflow-hidden"
                            >
                                {/* 4:3 cover with overlay */}
                                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900 group">
                                    {p.coverImage ? (
                                        <>
                                            <img
                                                src={p.coverImage}
                                                alt={p.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                                loading="lazy"
                                            />
                                            {/* Dark overlay */}
                                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                                        </>
                                    ) : (
                                        <div className="w-full h-full grid place-items-center text-gray-500 text-sm">
                                            No image
                                        </div>
                                    )}
                                </div>



                                {/* Content */}
                                <div className="p-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <h3 className="font-semibold text-gray-100">{p.title}</h3>
                                        <div className="text-xs text-gray-400 whitespace-nowrap">{p.dates}</div>
                                    </div>

                                    {!!p.stack?.length && (
                                        <div className="mt-1 text-sm text-gray-300">
                                            <span className="italic text-gray-400">Stack:</span> {p.stack.join(", ")}
                                        </div>
                                    )}

                                    {p.summary && <p className="mt-2 text-gray-300">{p.summary}</p>}

                                    {!!p.bullets?.length && (
                                        <ul className="mt-3 list-disc pl-5 space-y-1 text-gray-300">
                                            {p.bullets.map((b, i) => (
                                                <li key={i}>{b}</li>
                                            ))}
                                        </ul>
                                    )}

                                    {!!p.tags?.length && (
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {p.tags.map((t) => (
                                                <span
                                                    key={t}
                                                    className="px-2 py-0.5 rounded-full text-xs border border-neutral-700 text-gray-300"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {(p.links?.demo || p.links?.repo || p.links?.doc) && (
                                        <div className="mt-4 flex flex-wrap gap-3">
                                            {p.links?.demo && (
                                                <a
                                                    href={p.links.demo}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-sm text-[#e5dbcb] hover:underline"
                                                >
                                                    Live
                                                </a>
                                            )}
                                            {p.links?.repo && (
                                                <a
                                                    href={p.links.repo}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-sm text-[#e5dbcb] hover:underline"
                                                >
                                                    Repo
                                                </a>
                                            )}
                                            {p.links?.doc && (
                                                <a
                                                    href={p.links.doc}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-sm text-[#e5dbcb] hover:underline"
                                                >
                                                    Docs
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
