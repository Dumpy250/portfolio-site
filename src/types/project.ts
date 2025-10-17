export type Project = {
    slug: string;               // for /projects/[slug]
    title: string;
    summary: string;
    tech: string[];             // tags
    image?: string;             // /projects/<file>.png (optional)
    links?: {
        github?: string;
        demo?: string;
    };
};