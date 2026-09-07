import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

type CaseStudyPageProps = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
    params,
}: CaseStudyPageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = projects.find((entry) => entry.slug === slug);

    if (!project) {
        return {
            title: "Project Not Found",
            description: "The requested project case study could not be found.",
        };
    }

    return {
        title: project.title,
        description: project.summary,
        openGraph: {
            title: project.title,
            description: project.summary,
            url: `/projects/${project.slug}`,
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title: project.title,
            description: project.summary,
        },
    };
}

export default async function CaseStudy({ params }: CaseStudyPageProps) {
    const { slug } = await params;
    const project = projects.find((entry) => entry.slug === slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="max-w-3xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            <p className="text-gray-300 mb-8">{project.summary}</p>

            <div className="flex flex-wrap gap-2 mb-10">
                {project.tech.map((item) => (
                    <span
                        key={item}
                        className="rounded-full border border-white/15 px-3 py-1 text-xs text-gray-200"
                    >
                        {item}
                    </span>
                ))}
            </div>

            {project.caseStudy ? (
                <div className="space-y-10 text-gray-200 leading-relaxed">
                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">
                            Overview
                        </h2>
                        <p className="text-gray-300">{project.caseStudy.overview}</p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">
                            Highlights
                        </h2>
                        <ul className="list-disc list-inside space-y-1 text-gray-300">
                            {project.caseStudy.highlights.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">
                            Architecture
                        </h2>
                        <ul className="list-disc list-inside space-y-1 text-gray-300">
                            {project.caseStudy.architecture.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">
                            Key Learnings
                        </h2>
                        <ul className="list-disc list-inside space-y-1 text-gray-300">
                            {project.caseStudy.learnings.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </section>

                    {project.caseStudy.metrics && project.caseStudy.metrics.length > 0 ? (
                        <section>
                            <h2 className="text-lg font-semibold text-white mb-3">
                                Outcomes
                            </h2>
                            <ul className="space-y-2 text-gray-300">
                                {project.caseStudy.metrics.map((metric) => (
                                    <li key={`${metric.label}-${metric.value}`}>
                                        <span className="font-medium text-white">
                                            {metric.label}:
                                        </span>{" "}
                                        {metric.value}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ) : null}
                    {project.caseStudy.references && project.caseStudy.references.length > 0 ? (
                        <section>
                            <h2 className="text-lg font-semibold text-white mb-3">Release &amp; Documentation</h2>
                            <ul className="space-y-2">
                                {project.caseStudy.references.map((reference) => (
                                    <li key={reference.href}>
                                        <a href={reference.href} target="_blank" rel="noreferrer" className="text-sm underline underline-offset-4 hover:text-white">
                                            {reference.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ) : null}
                </div>
            ) : (
                <section className="space-y-3 text-gray-300 leading-relaxed">
                    <h2 className="text-lg font-semibold text-white">Project Snapshot</h2>
                    <p>{project.summary}</p>
                    <div className="flex flex-wrap gap-3 pt-1">
                        {project.links?.demo ? (
                            <a
                                href={project.links.demo}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm underline underline-offset-4"
                            >
                                Live Demo
                            </a>
                        ) : null}
                        {project.links?.github ? (
                            <a
                                href={project.links.github}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm underline underline-offset-4"
                            >
                                GitHub
                            </a>
                        ) : null}
                    </div>
                </section>
            )}
        </main>
    );
}
