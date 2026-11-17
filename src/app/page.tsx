import Image from "next/image";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { selectedProjects } from "@/data/selected-projects";

const tools = [
  {
    title: "Games & modding",
    items: "Unity · Lua · Game modding · QA · Build verification",
    detail:
      "Current Unity work includes gameplay design, development planning, and hands-on playtesting. Volunteer work on Battlefield 3 Reality Mod included Lua features, contributor coordination, QA, and build verification. Collaborative Farming Simulator 25 modding included vehicle-dashboard tweaks and in-game radio configuration.",
  },
  {
    title: "Languages",
    items: "Python · Java · C# · JavaScript · TypeScript · SQL · Lua",
    detail:
      "Java and Spring Boot services, a C# MVC application, a TypeScript portfolio, Python tooling, and Lua development.",
  },
  {
    title: "Web & backend",
    items: "React · Next.js · Spring Boot · Flask · ASP.NET Core MVC",
    detail:
      "API design, relational data, user management, component-based interfaces, and connecting frontend workflows to backend services.",
  },
  {
    title: "Data, cloud & validation",
    items: "AWS · Docker · EC2 / VPC · RDS / Cognito · PyTorch with CUDA acceleration · pytest",
    detail:
      "Configured EC2 and VPC infrastructure for a car-rental backend using RDS for MySQL persistence and Cognito for user management. Other work includes GPU-enabled classification, data imports, and repeatable validation.",
  },
];
export default function Home() {
  return (
    <>
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> Software engineer / Michigan
          </p>
          <h1 id="hero-title">
            Software &
            <br />
            <em>systems.</em>
          </h1>
          <p className="hero-intro">
            I’m Cameron Basham, a software engineering student in Michigan
            building full-stack applications, simulation tools, and
            computer-vision prototypes.
          </p>
          <p className="hero-sub">
            Recent work: CARLA telemetry, YOLO/CNN item recognition,
            Java/Spring Boot services, and AWS infrastructure. I’m also
            independently developing a Unity game.
          </p>
          <div className="actions">
            <Link className="button button-dark" href="#selected-work">
              Explore my work <span aria-hidden="true">↘</span>
            </Link>
            <a className="text-link" href="/resume.pdf">
              Résumé <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <Link
          className="hero-feature"
          href="/projects/carla-observability-toolkit"
          aria-label="Explore CARLA Observability Toolkit case study"
        >
          <div className="feature-caption">
            <span className="eyebrow">Inside the capstone</span>
            <span className="feature-arrow" aria-hidden="true">
              ↗
            </span>
          </div>
          <div className="screen-window">
            <div className="window-bar">
              <i />
              <i />
              <i />
              <span>CARLA / Compare runs</span>
            </div>
            <Image
              src="/projects/carla-compare.png"
              alt="Actual CARLA Compare Runs dashboard showing two saved-run summaries and their metric deltas"
              width={1381}
              height={952}
              priority
              sizes="(max-width: 800px) 90vw, 48vw"
              className="dashboard-image"
            />
          </div>
          <div className="hero-feature-bottom">
            <strong>
              Compare saved
              <br />
              simulation runs.
            </strong>
            <span>
              Python / Flask / React
              <br />
              Released v1.0.0
            </span>
          </div>
        </Link>
      </section>
      <div className="identity-strip">
        <div className="shell">
          <span>Full-stack · Simulation · Computer vision</span>
          <span aria-hidden="true">✳</span>
          <span>Ferris State University</span>
          <span aria-hidden="true">✳</span>
          <span>Expected graduation / Dec 2026</span>
        </div>
      </div>
      <section
        className="section shell"
        id="selected-work"
        aria-labelledby="work-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / Selected work</p>
            <h2 id="work-title">
              Selected
              <br />
              <span className="muted">project work.</span>
            </h2>
          </div>
          <Link className="text-link" href="/projects">
            All projects ↗
          </Link>
        </div>
        <p className="home-project-intro">
          Two highlights from simulation and computer vision. Find backend
          services, AWS infrastructure, and web applications on the full work page.
        </p>
        <div className="catalog home-project-grid">
          {selectedProjects.slice(0, 2).map((project) => (
            <ProjectCard key={project.slug} p={project} headingLevel={3} />
          ))}
        </div>
      </section>

      <section className="toolbox-band">
        <div className="shell toolbox">
          <div>
            <p className="eyebrow">02 / The toolbox</p>
            <h2>
              Languages &
              <br />
              tools.
            </h2>
          </div>
          <div className="tool-list">
            {tools.map((tool, index) => (
              <details key={tool.title} className="tool-detail">
                <summary>
                  <span className="mono">0{index + 1}</span>
                  <span>
                    <strong>{tool.title}</strong>
                    <small>{tool.items}</small>
                  </span>
                  <span className="expand-mark" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p>{tool.detail}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="section shell about-teaser">
        <div>
          <p className="eyebrow">03 / A little context</p>
          <h2>
            Internship &
            <br />
            volunteer work.
          </h2>
        </div>
        <div>
          <p className="large-copy">
            Applications, simulation tools, and game modding.
          </p>
          <p>
            I’ve worked on university projects and equipment-rental software,
            and volunteered on Battlefield 3 Reality Mod. That work includes Lua
            development, coordinating changes, and testing what we build.
          </p>
          <Link className="text-link" href="/about">
            More about me ↗
          </Link>
        </div>
      </section>
      <section className="contact-band">
        <div className="shell contact-callout">
          <div>
            <p className="eyebrow">Next / A conversation</p>
            <h2>
              Have a role
              <br />
              in mind?
            </h2>
          </div>
          <Link
            href="/contact"
            className="contact-circle"
            aria-label="Contact Cameron"
          >
            <span aria-hidden="true">↗</span>
            <small>Let’s talk</small>
          </Link>
        </div>
      </section>
    </>
  );
}
