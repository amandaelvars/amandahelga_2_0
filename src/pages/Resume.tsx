import { useMemo, useState, type CSSProperties } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
    resume,
    SKILL_COLOR,
    SKILLS,
    technicalSkills,
    VIEWS,
    type Entry,
    type Skill,
    type ViewId,
} from "../data/resume";

/** A thin stripe of all the skill colors, like a palette from the home page art. */
const paletteStripe = `linear-gradient(90deg, ${SKILLS.map(
    (s, i) => `${SKILL_COLOR[s]} ${(i / SKILLS.length) * 100}% ${((i + 1) / SKILLS.length) * 100}%`,
).join(", ")})`;

const bulletMatches = (skills: Skill[] | undefined, skill: Skill | null) =>
    !!skill && !!skills?.includes(skill);

const entryMatches = (e: Entry, skill: Skill | null) =>
    !!skill && (bulletMatches(e.skills, skill) || !!e.bullets?.some((b) => bulletMatches(b.skills, skill)));

/** How many bullets (or bullet-less entries) show a skill. */
function countFor(skill: Skill) {
    let n = 0;
    for (const section of resume) {
        for (const e of section.entries) {
            if (e.bullets?.length) n += e.bullets.filter((b) => b.skills?.includes(skill)).length;
            else if (e.skills?.includes(skill)) n += 1;
        }
    }
    return n;
}

export default function Resume() {
    const [active, setActive] = useState<Skill | null>(null);
    const counts = useMemo(() => Object.fromEntries(SKILLS.map((s) => [s, countFor(s)])) as Record<Skill, number>, []);

    const filterProps = { active, setActive, counts };

    // Industry or Research view, kept in the address (?view=research) so it can be linked to
    const [params, setParams] = useSearchParams();
    const view: ViewId = params.get("view") === "research" ? "research" : "industry";
    const setView = (v: ViewId) => setParams(v === "industry" ? {} : { view: v }, { replace: true });
    const sections = VIEWS[view].order.map((id) => resume.find((s) => s.id === id)!);

    return (
        // --hl is the selected skill's color; highlights below read it
        <div style={{ "--hl": active ? SKILL_COLOR[active] : "transparent" } as CSSProperties}>
            <div className="mx-auto max-w-4xl px-4 py-10 lg:grid lg:max-w-6xl lg:grid-cols-[minmax(0,1fr)_16.5rem] lg:gap-10">
              {/* Resume column */}
              <div className="min-w-0">
                {/* Header */}
                <header>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <h1 className="text-3xl font-bold tracking-tight">Resume</h1>

                        {/* Industry / Research view switch */}
                        <div
                            role="radiogroup"
                            aria-label="Resume view"
                            className="tone-dusk inline-flex rounded-full border border-line bg-surface/60 p-1"
                        >
                            {(Object.keys(VIEWS) as ViewId[]).map((v) => {
                                const on = view === v;
                                return (
                                    <button
                                        key={v}
                                        type="button"
                                        role="radio"
                                        aria-checked={on}
                                        onClick={() => setView(v)}
                                        className={[
                                            "rounded-full px-4 py-1.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                                            on ? "bg-accent text-on-accent shadow-sm" : "text-body hover:text-ink",
                                        ].join(" ")}
                                    >
                                        {VIEWS[v].label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <p className="mt-2 text-sm text-muted">{VIEWS[view].description}</p>
                </header>

                {/* Skill filter above the resume on small screens */}
                <div className="mt-6 lg:hidden">
                    <SkillFilter {...filterProps} layout="inline" />
                </div>

                {/* Sections */}
                {sections.map((section) => (
                    <div key={section.id}>
                        <hr className="my-6 border-line" />
                        <section className="space-y-5">
                            <h2 className="text-lg font-semibold tracking-wide text-ink-2">{section.title}</h2>
                            {section.entries.map((e) => (
                                <Item key={e.org + e.dates} entry={e} active={active} />
                            ))}
                        </section>
                    </div>
                ))}

                <hr className="my-6 border-line" />

                {/* Technical Skills */}
                <section className={`space-y-2 transition-opacity ${active ? "opacity-45" : ""}`}>
                    <h2 className="text-lg font-semibold tracking-wide text-ink-2">Technical Skills</h2>
                    <div className="grid gap-2 text-body">
                        {technicalSkills.map((t) => (
                            <div key={t.label}>
                                <span className="font-medium text-ink-2">{t.label}: </span>
                                {t.value}
                            </div>
                        ))}
                    </div>
                </section>

                <div className="mt-10">
                    <Link to="/" className="text-sm text-muted hover:text-brand">
                        ← Back to Home
                    </Link>
                </div>
              </div>

              {/* Skill filter in a sticky sidebar on wide screens */}
              <aside className="hidden lg:block" aria-label="Skill filter">
                  <div className="sticky top-20">
                      <SkillFilter {...filterProps} layout="sidebar" />
                  </div>
              </aside>
            </div>
        </div>
    );
}

/* ---------- Skill filter (sidebar on wide screens, panel on small ones) ---------- */

/** Scroll to the next highlighted line below the middle of the screen, wrapping to the first. */
function goToNextMatch() {
    const matches = [...document.querySelectorAll<HTMLElement>("[data-match]")].filter((el) => el.offsetParent);
    if (!matches.length) return;
    const middle = window.innerHeight / 2 + 4;
    const next = matches.find((el) => el.getBoundingClientRect().top > middle) ?? matches[0];
    next.scrollIntoView({ behavior: "smooth", block: "center" });
}

function SkillFilter({
    active,
    setActive,
    counts,
    layout,
}: {
    active: Skill | null;
    setActive: (s: Skill | null) => void;
    counts: Record<Skill, number>;
    layout: "sidebar" | "inline";
}) {
    const sidebar = layout === "sidebar";
    const labelId = `skill-filter-label-${layout}`;

    return (
        <div className="relative overflow-hidden rounded-xl border border-line bg-surface/60 p-4 pt-5">
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1" style={{ background: paletteStripe }} />

            <p id={labelId} className="text-sm font-medium text-ink-2">
                Highlight experience by skill
            </p>

            <div
                role="group"
                aria-labelledby={labelId}
                className={sidebar ? "mt-3 flex flex-col gap-1.5" : "mt-3 flex flex-wrap gap-2"}
            >
                {SKILLS.map((skill) => {
                    const on = active === skill;
                    return (
                        <button
                            key={skill}
                            type="button"
                            aria-pressed={on}
                            onClick={() => setActive(on ? null : skill)}
                            style={{ "--c": SKILL_COLOR[skill] } as CSSProperties}
                            className={[
                                "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-(--c) focus-visible:ring-offset-2 focus-visible:ring-offset-page",
                                sidebar ? "w-full text-left" : "",
                                on
                                    ? "border-(--c) bg-(--c) font-medium text-(--skill-ink)"
                                    : "border-line-strong text-body hover:border-(--c) hover:bg-(--c)/15 hover:text-ink",
                            ].join(" ")}
                        >
                            <span
                                aria-hidden="true"
                                className={`h-2 w-2 shrink-0 rounded-full ${on ? "bg-(--skill-ink)/60" : "bg-(--c)"}`}
                            />
                            <span className={sidebar ? "flex-1" : ""}>{skill}</span>
                            <span className={on ? "text-(--skill-ink)/70" : "text-faint"}>{counts[skill]}</span>
                        </button>
                    );
                })}
            </div>

            {/* Status: announced to screen readers when it changes */}
            <div className={`text-sm text-muted ${sidebar ? "mt-4 border-t border-line pt-3" : "mt-3"}`} aria-live="polite">
                {active ? (
                    <>
                        <p>
                            {counts[active]} {counts[active] === 1 ? "match" : "matches"} for{" "}
                            <span className="font-medium text-ink">{active}</span>
                        </p>
                        <p className="mt-1">
                            <button
                                type="button"
                                onClick={goToNextMatch}
                                className="underline underline-offset-2 hover:text-accent"
                            >
                                Next match ↓
                            </button>
                            {" · "}
                            <button
                                type="button"
                                onClick={() => setActive(null)}
                                className="underline underline-offset-2 hover:text-accent"
                            >
                                Clear
                            </button>
                        </p>
                    </>
                ) : (
                    <p>Select a skill to see where I've used it.</p>
                )}
            </div>
        </div>
    );
}

/* ---------- One resume entry ---------- */

function Item({ entry, active }: { entry: Entry; active: Skill | null }) {
    const { org, location, role, dates, bullets, link } = entry;
    const matched = entryMatches(entry, active);
    const dimEntry = !!active && !matched;
    const wholeEntryHighlighted = matched && !bullets?.length;

    return (
        <article
            data-match={wholeEntryHighlighted || undefined}
            className={[
                "space-y-1 rounded-lg transition-[opacity,background-color]",
                dimEntry ? "opacity-45" : "",
                wholeEntryHighlighted ? "-mx-3 bg-(--hl)/20 px-3 py-2 shadow-[inset_3px_0_0_var(--hl)]" : "",
            ].join(" ")}
        >
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="font-semibold text-ink-2">
                    {org}
                    {location && <span className="font-normal text-muted"> — {location}</span>}
                </h3>
                <div className="shrink-0 text-sm text-muted">{dates}</div>
            </div>
            <div className="italic text-body">
                {role}
                {link && (
                    <Link to={link} className="ml-2 not-italic text-sm text-accent hover:underline">
                        View project →
                    </Link>
                )}
            </div>
            {!!bullets?.length && (
                <ul className="mt-2 space-y-1">
                    {bullets.map((b, i) => {
                        const hit = bulletMatches(b.skills, active);
                        return (
                            <li
                                key={i}
                                data-match={hit || undefined}
                                className={[
                                    "relative rounded-md py-0.5 pl-5 pr-2 transition-[opacity,background-color]",
                                    "before:absolute before:left-1.5 before:top-[0.7em] before:h-1.5 before:w-1.5 before:rounded-full",
                                    hit
                                        ? "bg-(--hl)/20 text-ink shadow-[inset_3px_0_0_var(--hl)] before:bg-(--hl)"
                                        : "text-body before:bg-current",
                                    active && !hit && !dimEntry ? "opacity-45" : "",
                                ].join(" ")}
                            >
                                {b.text}
                            </li>
                        );
                    })}
                </ul>
            )}
        </article>
    );
}
