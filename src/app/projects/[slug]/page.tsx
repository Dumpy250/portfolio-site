import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import CaseStudyWalkthrough from "@/components/CaseStudyWalkthrough";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

const legacyMigrationSlug = "aws-vpc-rds-migration";

export function generateStaticParams() {
  return [
    ...projects.map((project) => ({ slug: project.slug })),
    { slug: legacyMigrationSlug },
  ];
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug === legacyMigrationSlug) {
    return {
      title: "Archived project",
      description: "This earlier case study is not currently included in the project catalog.",
      robots: { index: false, follow: true },
    };
  }
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
  if (slug === legacyMigrationSlug) {
    return (
      <header className="shell page-head">
        <p className="eyebrow">Project archive</p>
        <h1>Case study on hold.</h1>
        <p>
          This earlier case study is not currently included in the project catalog
          because supporting evidence has not been resolved.
        </p>
        <Link className="text-link" href="/projects">
          Explore current projects ↗
        </Link>
      </header>
    );
  }
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) notFound();
  const study = project.caseStudy;
  const isRental = study?.walkthrough === "reservation-import";
  const isCarla = study?.walkthrough === "carla-views";
  const isWarehouse = study?.walkthrough === "warehouse-pipeline";
  return (
    <>
      <header className={`shell page-head${isRental ? " page-head--rental" : ""}`}>
        <Link className="text-link" href="/projects">
          ↖ All projects
        </Link>
        <p className="eyebrow" style={{ marginTop: 30 }}>
          {project.badgeText || "Project / Case study"}
        </p>
        <h1>{project.title}</h1>
        <p>{project.summary}</p>
        {study?.role && study.result ? (
          <dl className="case-summary">
            <div>
              <dt>My role</dt>
              <dd>{study.role}</dd>
            </div>
            <div>
              <dt>Result</dt>
              <dd>
                {study.result}
                {study.resultCaption ? <p className="notice" style={{ marginTop: 10 }}>{study.resultCaption}</p> : null}
              </dd>
            </div>
          </dl>
        ) : null}
        <div className="tags">
          {project.tech.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="case-nav">
          {project.links?.github ? (
            <a
              className="text-link"
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
            >
              View source ↗
            </a>
          ) : null}
          {project.links?.demo ? (
            <a
              className="text-link"
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
            >
              Live demo ↗
            </a>
          ) : null}
        </div>
        {isCarla ? (
          <nav className="carla-entry-links" aria-label="Explore this project">
            <a className="text-link" href="#carla-development-demo">Watch development demo</a>
            <a className="text-link" href="#carla-gallery-title">Inspect dashboard screenshots</a>
          </nav>
        ) : null}
      </header>
      <article className={`shell case-study${isRental ? " case-study--rental" : isCarla ? " case-study--carla" : isWarehouse ? " case-study--warehouse" : ""}`}>
        {study ? (
          <>
            <section>
              <h2>{isWarehouse ? "The problem" : "Context & problem"}</h2>
              <p>{study.overview}</p>
            </section>
            {study.walkthrough ? <CaseStudyWalkthrough kind={study.walkthrough} contributions={study.highlights} /> : null}
            {study.screenshots?.length ? (
              <section aria-labelledby="dashboard-detail-title">
                <h2 id="dashboard-detail-title">{study.galleryTitle || "Dashboard detail"}</h2>
                {isWarehouse ? <p className="warehouse-evaluation-note">Top-1 means the first-ranked category matches the image’s parent-folder label. Top-5 means that label appears anywhere in the returned list. This is agreement with directory labels, not demonstrated performance on unseen images and not a per-item prediction trace.</p> : null}
                {study.screenshots.map((image) => (
                  <figure className="case-image" key={image.src}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      sizes="(max-width: 850px) 95vw, 850px"
                    />
                    <figcaption className="notice">
                      {image.caption}{" "}
                      <a
                        className="text-link"
                        href={image.src}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {image.fullSizeLabel || "View full-size screenshot"} ↗
                      </a>
                    </figcaption>
                  </figure>
                ))}
              </section>
            ) : null}
            {[
              ...(isRental ? [] : [{ title: "Contribution & scope", items: study.highlights }]),
              { title: isRental ? "Partial-import behavior" : "How it fits together", items: study.architecture },
              { title: "What I learned", items: study.learnings },
            ].map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
            {study.metrics?.length ? (
              <section>
                <h2>{isCarla ? "Validation & scope" : "Outcome & boundaries"}</h2>
                <ul>
                  {study.metrics.map((metric) => (
                    <li key={metric.label}>
                      <strong>{metric.label}:</strong> {metric.value}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
            {study.references?.length ? (
              <section>
                <h2>Evidence & documentation</h2>
                <ul>
                  {study.references.map((reference) => (
                    <li key={reference.href}>
                      <a
                        className="text-link"
                        href={reference.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {reference.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
            {study.sourceNote ? <p className="notice case-source-note">{study.sourceNote}</p> : null}
          </>
        ) : null}
        <section>
          <Link className="text-link" href="/contact">
            Talk about this project ↗
          </Link>
        </section>
      </article>
    </>
  );
}
