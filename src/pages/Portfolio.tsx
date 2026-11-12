import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";

const MAX_CARD_TAGS = 3;

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
        <div>
            <div className="mx-auto max-w-6xl px-4 py-10">
                <header className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>

                    {/* Tag filter */}
                    <div className="flex flex-wrap items-center gap-2">
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setActiveTag(tag)}
                                aria-pressed={activeTag === tag}
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
                    <p className="text-gray-400">No projects yet.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filtered.map((p) => {
                            const tags = p.tags ?? [];
                            const extraTags = tags.length - MAX_CARD_TAGS;
                            return (
                                <Link
                                    key={p.id}
                                    to={`/portfolio/${p.id}`}
                                    className="group flex flex-col bg-neutral-900/40 border border-neutral-800 rounded-xl overflow-hidden transition hover:border-neutral-600 hover:bg-neutral-900/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5dbcb]"
                                >
                                    {/* 4:3 cover */}
                                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
                                        {p.coverImage ? (
                                            <>
                                                <img
                                                    src={p.coverImage}
                                                    alt=""
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                                            </>
                                        ) : (
                                            <div className="w-full h-full grid place-items-center text-gray-500 text-sm">
                                                No image
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-1 flex-col p-4">
                                        <div className="text-xs text-gray-400">{p.dates}</div>
                                        <h2 className="mt-1 font-semibold text-gray-100 group-hover:text-[#e5dbcb] transition-colors">
                                            {p.title}
                                        </h2>

                                        {(p.tagline || p.summary) && (
                                            <p className="mt-2 text-sm text-gray-300 line-clamp-2">
                                                {p.tagline ?? p.summary}
                                            </p>
                                        )}

                                        {tags.length > 0 && (
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {tags.slice(0, MAX_CARD_TAGS).map((t) => (
                                                    <span
                                                        key={t}
                                                        className="px-2 py-0.5 rounded-full text-xs border border-neutral-700 text-gray-300"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                                {extraTags > 0 && (
                                                    <span className="px-2 py-0.5 text-xs text-gray-500">
                                                        +{extraTags}
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        <span className="mt-auto pt-4 text-sm text-[#e5dbcb]">
                                            View project{" "}
                                            <span
                                                aria-hidden="true"
                                                className="inline-block transition-transform group-hover:translate-x-1"
                                            >
                                                →
                                            </span>
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
