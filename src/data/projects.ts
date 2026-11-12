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
    links?: LinkSet;
    tags?: string[];
};

export const projects: Project[] = projectsData as unknown as Project[];

export function getProject(id: string | undefined): Project | undefined {
    return projects.find((p) => p.id === id);
}
