export type ProjectCaseStudy = {
    overview: string;
    highlights: string[];
    architecture: string[];
    learnings: string[];
    metrics?: {
        label: string;
        value: string;
    }[];
};

export type Project = {
    slug: string; // for /projects/[slug]
    title: string;
    summary: string;
    tech: string[]; // tags
    image?: string; // /projects/<file>.(png|svg) (optional)
    badgeText?: string;
    caseStudy?: ProjectCaseStudy;
    links?: {
        github?: string;
        demo?: string;
    };
};
