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
                <p className="mt-4 text-body">That project doesn't exist or has moved.</p>
                <Link to="/portfolio" className="mt-6 inline-block text-accent hover:underline">
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
            <Link to="/portfolio" className="text-sm text-muted hover:text-accent">
                ← All projects
            </Link>

            {/* Header */}
            <header className="mt-6">
                <div className="text-sm text-muted">{project.dates}</div>
                <h1 className="mt-1 text-3xl md:text-4xl font-bold tracking-tight text-accent">
                    {project.title}
                </h1>
                {!!project.tags?.length && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {project.tags.map((t) => (
                            <span
                                key={t}
                                className="px-2.5 py-0.5 rounded-full text-xs border border-line-strong text-body"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                )}
            </header>

            {/* Cover */}
            {project.coverImage && (
                <div className="mt-8 overflow-hidden rounded-xl border border-line bg-surface">
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
                            className="bg-accent text-on-accent px-5 py-2.5 rounded-md font-semibold hover:bg-accent-hover transition"
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
                            className="border border-line-strong text-ink-2 px-5 py-2.5 rounded-md font-semibold hover:border-accent hover:text-accent transition"
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
                    <h2 className="text-lg font-semibold tracking-wide text-ink-2">Overview</h2>
                    <p className="mt-3 text-lg leading-relaxed text-body">{project.summary}</p>
                </section>
            )}

            {/* Key numbers */}
            {!!project.stats?.length && (
                <dl className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
                    {project.stats.map((s) => (
                        <div key={s.label} className="rounded-xl border border-line bg-surface/50 p-4">
                            <dt className="sr-only">{s.label}</dt>
                            <dd className="text-2xl font-bold text-accent">{s.value}</dd>
                            <dd className="mt-1 text-sm leading-snug text-muted">{s.label}</dd>
                        </div>
                    ))}
                </dl>
            )}

            {/* Long-form sections */}
            {project.sections?.map((s) => (
                <section key={s.heading} className="mt-10">
                    <h2 className="text-lg font-semibold tracking-wide text-ink-2">{s.heading}</h2>
                    {s.paragraphs?.map((para, i) => (
                        <p key={i} className="mt-3 leading-relaxed text-body">
                            {para}
                        </p>
                    ))}
                    {!!s.bullets?.length && (
                        <ul className="mt-3 list-disc pl-5 space-y-2 leading-relaxed text-body">
                            {s.bullets.map((b, i) => (
                                <li key={i}>{b}</li>
                            ))}
                        </ul>
                    )}
                </section>
            ))}

            {/* Highlights */}
            {!!project.bullets?.length && (
                <section className="mt-10">
                    <h2 className="text-lg font-semibold tracking-wide text-ink-2">Highlights</h2>
                    <ul className="mt-3 list-disc pl-5 space-y-2 leading-relaxed text-body">
                        {project.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Stack */}
            {!!project.stack?.length && (
                <section className="mt-10">
                    <h2 className="text-lg font-semibold tracking-wide text-ink-2">Tools &amp; stack</h2>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {project.stack.map((s) => (
                            <span
                                key={s}
                                className="px-3 py-1 rounded-md text-sm bg-surface border border-line text-ink-2"
                            >
                                {s}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Paper */}
            {project.paper && (
                <section className="mt-10">
                    <h2 className="text-lg font-semibold tracking-wide text-ink-2">Paper</h2>
                    <div className="mt-3 rounded-xl border border-line bg-surface/50 p-5">
                        <p className="font-semibold text-ink">{project.paper.title}</p>
                        <p className="mt-2 text-sm text-body">
                            {/* Highlight Amanda's name in the author list */}
                            {project.paper.authors.split(/(Amanda Elvarsdóttir\*?)/).map((part, i) =>
                                part.startsWith("Amanda Elvarsdóttir") ? (
                                    <strong key={i} className="font-semibold text-accent">
                                        {part}
                                    </strong>
                                ) : (
                                    part
                                )
                            )}
                        </p>
                        {project.paper.note && (
                            <p className="mt-1 text-xs text-faint">{project.paper.note}</p>
                        )}
                        <p className="mt-1 text-sm italic text-muted">{project.paper.status}</p>
                        {project.paper.url && (
                            <a
                                href={project.paper.url}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-4 inline-block rounded-md border border-line-strong px-4 py-2 text-sm font-semibold text-ink-2 transition hover:border-accent hover:text-accent"
                            >
                                Read the paper (PDF) <span aria-hidden="true">↗</span>
                                <span className="sr-only"> (opens in a new tab)</span>
                            </a>
                        )}
                    </div>
                </section>
            )}

            {/* Previous / next */}
            <nav
                aria-label="More projects"
                className="mt-14 pt-6 border-t border-line grid grid-cols-2 gap-4 text-sm"
            >
                <div>
                    {prev && (
                        <Link to={`/portfolio/${prev.id}`} className="group block">
                            <span className="text-faint">← Previous</span>
                            <span className="mt-1 block text-ink-2 group-hover:text-accent">{prev.title}</span>
                        </Link>
                    )}
                </div>
                <div className="text-right">
                    {next && (
                        <Link to={`/portfolio/${next.id}`} className="group block">
                            <span className="text-faint">Next →</span>
                            <span className="mt-1 block text-ink-2 group-hover:text-accent">{next.title}</span>
                        </Link>
                    )}
                </div>
            </nav>
        </article>
    );
}
