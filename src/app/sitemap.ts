import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const base = "https://cameron-basham.com";
    return [
        { url: `${base}/`, lastModified: new Date() },
        { url: `${base}/projects`, lastModified: new Date() },
        { url: `${base}/about`, lastModified: new Date() },
        { url: `${base}/contact`, lastModified: new Date() },
    ];
}