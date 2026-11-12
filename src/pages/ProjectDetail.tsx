import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getProject, projects } from "../data/projects";

export default function ProjectDetail() {
    const { id } = useParams();
    const project = getProject(id);

    // Start at the top of the page and give the tab a useful title.
    useEffect(() => {
        window.scrollTo(0, 0);
        const previous = document.title;
        if (project) document.title = `${project.title} · amandahelga`;
        return () => {
            document.title = previous;
        };
    }, [project]);

    if (!project) {
        return (
            <div className="mx-auto max-w-4xl px-4 py-16">
                <h1 className="text-3xl font-bold tracking-tight">Project not found</h1>
                <p className="mt-4 text-gray-300">That project doesn't exist or has moved.</p>
                <Link to="/portfolio" className="mt-6 inline-block text-[#e5dbcb] hover:underline">
                    ← All projects
                </Link>
            </div>
        );
    }

    const index = projects.findIndex((p) => p.id === project.id);
    const prev = index > 0 ? projects[index - 1] : undefined;
    const next = index < projects.length - 1 ? projects[index + 1] : undefined;

    const { demo, repo, doc } = project.links ?? {};
    const secondaryLinks = [
        repo && { label: "Repository", href: repo },
        doc && { label: "Documentation", href: doc },
    ].filter(Boolean) as { label: string; href: string }[];

    return (
        <article className="mx-auto max-w-4xl px-4 py-10">
            <Link to="/portfolio" className="text-sm text-gray-400 hover:text-[#e5dbcb]">
                ← All projects
            </Link>

            {/* Header */}
            <header className="mt-6">
                <div className="text-sm text-gray-400">{project.dates}</div>
                <h1 className="mt-1 text-3xl md:text-4xl font-bold tracking-tight text-[#e5dbcb]">
                    {project.title}
                </h1>
                {!!project.tags?.length && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {project.tags.map((t) => (
                            <span
                                key={t}
                                className="px-2.5 py-0.5 rounded-full text-xs border border-neutral-700 text-gray-300"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                )}
            </header>

            {/* Cover */}
            {project.coverImage && (
                <div className="mt-8 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
                    <img src={project.coverImage} alt={`${project.title} screenshot`} className="w-full h-auto" />
                </div>
            )}

            {/* Links */}
            {(demo || secondaryLinks.length > 0) && (
                <div className="mt-6 flex flex-wrap gap-3">
                    {demo && (
                        <a
                            href={demo}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-[#e5dbcb] text-neutral-950 px-5 py-2.5 rounded-md font-semibold hover:bg-[#d6cdb8] transition"
                        >
                            View live site <span aria-hidden="true">↗</span>
                            <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                    )}
                    {secondaryLinks.map((l) => (
                        <a
                            key={l.label}
                            href={l.href}
                            target="_blank"
                            rel="noreferrer"
                            className="border border-neutral-700 text-gray-200 px-5 py-2.5 rounded-md font-semibold hover:border-[#e5dbcb] hover:text-[#e5dbcb] transition"
                        >
                            {l.label} <span aria-hidden="true">↗</span>
                            <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                    ))}
                </div>
            )}

            {/* Overview */}
            {project.summary && (
                <section className="mt-10">
                    <h2 className="text-lg font-semibold tracking-wide text-gray-200">Overview</h2>
                    <p className="mt-3 text-lg leading-relaxed text-gray-300">{project.summary}</p>
                </section>
            )}

            {/* Highlights */}
            {!!project.bullets?.length && (
                <section className="mt-10">
                    <h2 className="text-lg font-semibold tracking-wide text-gray-200">Highlights</h2>
                    <ul className="mt-3 list-disc pl-5 space-y-2 leading-relaxed text-gray-300">
                        {project.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Stack */}
            {!!project.stack?.length && (
                <section className="mt-10">
                    <h2 className="text-lg font-semibold tracking-wide text-gray-200">Tools &amp; stack</h2>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {project.stack.map((s) => (
                            <span
                                key={s}
                                className="px-3 py-1 rounded-md text-sm bg-neutral-900 border border-neutral-800 text-gray-200"
                            >
                                {s}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Previous / next */}
            <nav
                aria-label="More projects"
                className="mt-14 pt-6 border-t border-neutral-800 grid grid-cols-2 gap-4 text-sm"
            >
                <div>
                    {prev && (
                        <Link to={`/portfolio/${prev.id}`} className="group block">
                            <span className="text-gray-500">← Previous</span>
                            <span className="mt-1 block text-gray-200 group-hover:text-[#e5dbcb]">{prev.title}</span>
                        </Link>
                    )}
                </div>
                <div className="text-right">
                    {next && (
                        <Link to={`/portfolio/${next.id}`} className="group block">
                            <span className="text-gray-500">Next →</span>
                            <span className="mt-1 block text-gray-200 group-hover:text-[#e5dbcb]">{next.title}</span>
                        </Link>
                    )}
                </div>
            </nav>
        </article>
    );
}
