export type ProjectCaseStudy = {
    walkthrough?: "warehouse-pipeline" | "vehicle-lifecycle" | "reservation-import" | "carla-views" | "job-captures";
    galleryTitle?: string;
    role?: string;
    result?: string;
    resultCaption?: string;
    sourceNote?: string;
    screenshots?: {
        src: string;
        alt: string;
        width: number;
        height: number;
        caption: string;
        fullSizeLabel?: string;
    }[];
    overview: string;
    highlights: string[];
    architecture: string[];
    learnings: string[];
    references?: {
        label: string;
        href: string;
    }[];
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
    thumbnail?: {
        src: string;
        alt: string;
        width: number;
        height: number;
        caption: string;
    };
    badgeText?: string;
    caseStudy?: ProjectCaseStudy;
    links?: {
        github?: string;
        demo?: string;
    };
};
