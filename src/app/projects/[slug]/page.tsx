import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

export default function CaseStudy({
                                      params,
                                  }: {
    params: { slug: string };
}) {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) return notFound();

    return (
        <main className="max-w-3xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            <p className="text-gray-300 mb-8">{project.summary}</p>

            <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map((t) => (
                    <span
                        key={t}
                        className="rounded-full border border-white/15 px-3 py-1 text-xs text-gray-200"
                    >
            {t}
          </span>
                ))}
            </div>

            <div className="space-y-6 text-gray-300 leading-relaxed">
                <section>
                    <h2 className="text-lg font-semibold text-white mb-2">
                        Project Overview
                    </h2>
                    <p>
                        Placeholder text about what this project does, who it was built
                        for, and the problem it solves. Later you can write a few paragraphs
                        describing your goals, the requirements, and any constraints.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-white mb-2">
                        Architecture
                    </h2>
                    <p>
                        Placeholder for a short description of the system design, database
                        schema, authentication flow, or any architecture diagram you want to
                        include later.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-white mb-2">
                        Key Learnings
                    </h2>
                    <ul className="list-disc list-inside text-gray-400">
                        <li>Placeholder bullet point #1</li>
                        <li>Placeholder bullet point #2</li>
                        <li>Placeholder bullet point #3</li>
                    </ul>
                </section>
            </div>

            <div className="mt-12 border-t border-white/10 pt-6 text-sm text-gray-500">
                <p>
                    This page is a placeholder case study for <b>{project.title}</b>.
                    You’ll replace these sections with real content later.
                </p>
            </div>
        </main>
    );
}