import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/project";
export default function ProjectCard({ p, headingLevel = 2 }: { p: Project; headingLevel?: 2 | 3 }) {
  const hasScreenshot = p.image?.endsWith(".png");
  const Heading = headingLevel === 3 ? "h3" : "h2";
  return (
    <article className="project-card" id={p.slug}>
      <p className="project-category">
        {p.badgeText || "Project / Software engineering"}
      </p>
      {p.thumbnail ? (
        <figure className="project-thumbnail">
          <Link href={`/projects/${p.slug}`}>
            <Image
              className="card-image"
              src={p.thumbnail.src}
              alt={p.thumbnail.alt}
              width={p.thumbnail.width}
              height={p.thumbnail.height}
              sizes="(max-width: 800px) 90vw, 45vw"
            />
          </Link>
          <figcaption className="notice">{p.thumbnail.caption}</figcaption>
        </figure>
      ) : hasScreenshot && p.image ? (
        <Link href={`/projects/${p.slug}`}>
          <Image
            className="card-image"
            src={p.image}
            alt={`${p.title} application screenshot`}
            width={1357}
            height={1262}
            sizes="(max-width: 800px) 90vw, 45vw"
          />
        </Link>
      ) : null}
      <Heading>{p.title}</Heading>
      <p>{p.summary}</p>
      <div className="tags">
        {p.tech.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
      <div className="card-links">
        <Link className="text-link" href={`/projects/${p.slug}`}>
          Case study ↗
        </Link>
        {p.links?.github ? (
          <a
            className="text-link"
            href={p.links.github}
            target="_blank"
            rel="noreferrer"
          >
            Source ↗
          </a>
        ) : null}
      </div>
    </article>
  );
}
