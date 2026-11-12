import projectsData from "./projects.json";

export type LinkSet = { repo?: string | null; demo?: string | null; doc?: string | null };

export type Project = {
    id: string;
    title: string;
    dates: string;
    stack: string[];
    /** One short sentence shown on the portfolio card. */
    tagline?: string;
    /** Longer description shown on the project page. */
    summary?: string;
    bullets?: string[];
    coverImage?: string;
    /** Optional 4:3 image for the portfolio card when the cover is a different shape. */
    cardImage?: string;
    /** Optional caption shown under the cover on the project page. */
    coverCaption?: string;
    links?: LinkSet;
    tags?: string[];
    /** Optional long-form content for the project page. */
    stats?: { value: string; label: string }[];
    sections?: { heading: string; paragraphs?: string[]; bullets?: string[] }[];
    paper?: { title: string; authors: string; note?: string; status: string; url?: string | null };
};

export const projects: Project[] = projectsData as unknown as Project[];

export function getProject(id: string | undefined): Project | undefined {
    return projects.find((p) => p.id === id);
}
