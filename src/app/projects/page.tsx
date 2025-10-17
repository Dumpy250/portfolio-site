import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
    return (
        <main className="max-w-6xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold">Projects</h1>
            <p className="mt-2 text-gray-300">
                A selection of recent work across microservices, AWS, and ML.
            </p>

            <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {projects.map((p) => (
                    <ProjectCard key={p.slug} p={p} />
                ))}
            </section>
        </main>
    );
}