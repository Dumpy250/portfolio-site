import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
export const metadata: Metadata = {
  title: "About",
  description:
    "About Cameron Basham: software engineering, independent Unity development, application and simulation projects, volunteer game modding, and life outside the keyboard.",
};
export default function AboutPage() {
  return (
    <>
      <header className="shell page-head">
        <p className="eyebrow">About / Cameron Basham</p>
        <h1>
          Software, games,
          <br />
          and a bit more.
        </h1>
        <p>
          I’m Cameron, a software engineering student in Michigan. My work
          includes applications, simulation tools, and games.
        </p>
      </header>
      <section className="shell about-layout">
        <div>
          <Image
            className="portrait"
            src="/cameron-basham.jpg"
            alt="Cameron Basham"
            width={400}
            height={400}
            sizes="(max-width: 800px) 260px, 400px"
            priority
          />
          <p className="notice">Michigan / Software & games</p>
          <a className="text-link" href="/resume.pdf">
            Read my résumé ↗
          </a>
        </div>
        <div className="about-body">
          <h2>What I’ve been working on.</h2>
          <p>
            I’m completing my bachelor’s degree in Digital Media Software
            Engineering at Ferris State University. Expected graduation: December 2026.
          </p>
          <p>
            My work spans Java/Spring Boot and React applications, C# / ASP.NET
            Core MVC, a TypeScript/Next.js portfolio, Python simulation tooling,
            and a GPU-enabled computer-vision prototype.
          </p>
          <p>
            I’m interested in software engineering opportunities where I can
            contribute across a project and keep deepening my technical skills.
          </p>
          <div className="timeline">
            <div id="unity-work">
              <p className="eyebrow">Current work / Independent development</p>
              <h3>Solo Unity game developer</h3>
              <p>
                I’m developing a Unity game independently, taking it from gameplay
                design through implementation and hands-on playtesting. I set the
                development priorities and refine the experience as I build.
              </p>
            </div>
            <div>
              <p className="eyebrow">Education / Expected graduation: December 2026</p>
              <h3>Ferris State University</h3>
              <p>
                Digital Media Software Engineering. My capstone, CARLA
                Observability Toolkit, connects telemetry capture to saved-run
                validation, a Flask API, and a React dashboard.
              </p>
            </div>
            <div>
              <p className="eyebrow">Software development internship / 2025</p>
              <h3>Digital Media department</h3>
              <p>
                Team-built equipment rental software for media-production
                workflows. My involvement centered on CSV imports, project-board
                tracking, and QA, with contributions across the frontend and
                backend.
              </p>
            </div>
            <div>
              <p className="eyebrow">Volunteer mod development / 2021–2024</p>
              <h3>Battlefield 3 Reality Mod</h3>
              <p>
                I volunteered as a project manager and developer, contributing
                Lua features and coordinating issues and work across distributed
                contributors. I also worked on QA and build verification for
                development and production releases.
              </p>
            </div>
            <div>
              <p className="eyebrow">Collaborative modding</p>
              <h3>Saber Studios / Farming Simulator 25</h3>
              <p>
                Collaborated with a friend on a custom Farming Simulator 25 vehicle pack,
                making dashboard tweaks for several vehicles in the FS25 editor
                and configuring a custom stream playable through the in-game radio.
              </p>
              <a
                className="text-link"
                href="https://github.com/Saber-Studios"
                target="_blank"
                rel="noreferrer"
              >
                Saber Studios on GitHub ↗
              </a>
            </div>
            <div>
              <p className="eyebrow">U.S. Army / 2012–2019</p>
              <h3>Cavalry Scout, E-5</h3>
              <p>
                Small-team leadership, mission planning, and equipment
                accountability.
              </p>
            </div>
          </div>
          <Link className="text-link" href="/projects">
            Explore the work ↗
          </Link>
        </div>
      </section>
      <section
        className="section shell about-teaser"
        id="interests"
        aria-labelledby="interests-title"
      >
        <div>
          <p className="eyebrow">Away from the keyboard</p>
          <h2 id="interests-title">
            Outside
            <br />
            of software.
          </h2>
        </div>
        <div>
          <p className="large-copy">
            Music, games, and the outdoors.
          </p>
          <p>
            Music is a big part of my life, and I play drums. I’m also into
            tactical, survival, strategy, and role-playing games. Away from the
            screen, I like hiking, working in the yard, spending time near the
            water, and getting outside with my dogs.
          </p>
        </div>
      </section>
    </>
  );
}
