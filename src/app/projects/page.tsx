import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { selectedProjects } from "@/data/selected-projects";
export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work in simulation telemetry, full-stack applications, computer vision, and C#/.NET.",
};
export default function ProjectsPage() {
  const selected = selectedProjects;
  return (
    <>
      <header className="shell page-head">
        <p className="eyebrow">Work / Selected projects</p>
        <h1>
          From a problem
          <br />
          to a working system.
        </h1>
        <p>
          Capstone, software development internship, team projects, and coursework.
          Each case study explains the context, the implementation, and the
          boundaries.
        </p>
        <nav className="project-index-nav" aria-label="Jump to a project">
          {selected.slice(0, 4).map((project) => (
            <a href={`#${project.slug}`} key={project.slug}>
              {project.title} ↓
            </a>
          ))}
        </nav>
      </header>
      <section className="shell catalog" aria-label="Project catalog">
        {selected.map((project) => (
          <ProjectCard key={project.slug} p={project} />
        ))}
      </section>
    </>
  );
}
