import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
    const base = "https://cameron-basham.com";
    const lastModified = new Date();

    const staticRoutes: MetadataRoute.Sitemap = [
        { url: `${base}/`, lastModified },
        { url: `${base}/projects`, lastModified },
        { url: `${base}/about`, lastModified },
        { url: `${base}/contact`, lastModified },
    ];

    const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
        url: `${base}/projects/${project.slug}`,
        lastModified,
    }));

    return [
        ...staticRoutes,
        ...projectRoutes,
    ];
}
