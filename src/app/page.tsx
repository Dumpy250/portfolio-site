import Link from "next/link";
import { projects } from "@/data/projects";

const featuredProject = projects.find((project) => project.slug === "carla-observability-toolkit")!;

export default function Home() {
    return (
        <main className="min-h-screen px-6 py-16 sm:px-10">
            <section className="max-w-5xl mx-auto py-20">
                <p className="text-sm tracking-widest text-gray-400">BACKEND | CLOUD | OBSERVABILITY</p>
                <h1 className="mt-3 text-4xl sm:text-6xl font-bold">
                    Cameron Basham - Software Engineer
                </h1>
                <p className="mt-6 text-lg text-gray-300 max-w-3xl">
                    Backend & Cloud Engineer focused on secure service architecture and AWS infrastructure (Spring Boot, JWT/OAuth2, RDS/VPC). Released CARLA Observability Toolkit v1.0.0 for simulation telemetry and experiment comparison. Other work includes CUDA-accelerated CNN training in PyTorch.
                </p>

                <div className="mt-8 flex gap-3">
                    <Link
                        href="/projects"
                        className="rounded-xl px-5 py-3 bg-white text-black font-medium"
                    >
                        View Projects
                    </Link>
                    <a
                        className="rounded-xl border border-white/15 px-5 py-3 hover:bg-white/5"
                        href="/resume.pdf"
                        download
                    >
                        Download Resume
                    </a>
                </div>
            </section>

            <section className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-4">
                {[
                    { t: "Backend Systems", d: "Building secure service APIs with Java and Spring Boot.", s: "Java, REST APIs, JWT/OAuth2, RBAC, microservices" },
                    { t: "Cloud & Infrastructure", d: "Deploying backend services with practical AWS infrastructure workflows.", s: "AWS (VPC, RDS, Cognito), Docker, Git/GitHub" },
                    { t: "Observability & Performance", d: "Designing simulation telemetry and validation workflows with AI/ML context.", s: "PyTorch, CUDA, CNN pipelines, Top-1/Top-5 evaluation" },
                ].map((card) => (
                    <div
                        key={card.t}
                        className="rounded-2xl border border-white/10 p-5 bg-white/5"
                    >
                        <h3 className="font-semibold">{card.t}</h3>
                        <p className="text-sm text-gray-300 mt-1">{card.d}</p>
                        <p className="mt-1 text-xs text-gray-400">{card.s}</p>
                    </div>
                ))}
            </section>

            <section className="max-w-5xl mx-auto mt-8">
                <h2 className="text-2xl font-semibold">Featured Project</h2>
                <div className="mt-4 rounded-2xl border border-white/15 bg-white/5 p-6 sm:p-7">
                    <h3 className="text-xl font-semibold">{featuredProject.title}</h3>
                    <p className="mt-2 text-gray-300 max-w-3xl">
                        {featuredProject.summary}
                    </p>
                    <p className="mt-2 text-sm text-gray-400">
                        Key Tech: {featuredProject.tech.join(", ")}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                            href="/projects/carla-observability-toolkit"
                            className="rounded-xl border border-white/15 px-5 py-2.5 text-sm hover:bg-white/5"
                        >
                            View Case Study &rarr;
                        </Link>
                        <a
                            href="https://github.com/Dumpy250/carla-observability-toolkit"
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-xl border border-white/15 px-5 py-2.5 text-sm text-gray-200 hover:bg-white/5"
                        >
                            GitHub &rarr;
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
