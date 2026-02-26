import Image from "next/image";
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

            <section className="mt-14">
                <h2 className="text-2xl font-bold">Currently Building</h2>
                <div className="relative mt-5">
                    <div className="pointer-events-none absolute -top-3 left-8 z-10 h-6 w-36 rotate-[-7deg] rounded-sm border border-black/50 bg-[repeating-linear-gradient(45deg,#facc15_0_12px,#111827_12px_24px)] shadow-lg" />
                    <div className="pointer-events-none absolute -right-3 bottom-14 z-10 h-6 w-40 rotate-[9deg] rounded-sm border border-black/50 bg-[repeating-linear-gradient(45deg,#facc15_0_12px,#111827_12px_24px)] shadow-lg" />

                    <article className="relative rounded-2xl border border-yellow-300/40 bg-gradient-to-b from-yellow-500/10 to-white/5 p-5 shadow-[0_0_0_1px_rgba(250,204,21,0.15)]">
                        <div className="mb-3 inline-flex items-center rounded-full border border-yellow-300/40 bg-yellow-500/15 px-3 py-1 text-xs font-semibold tracking-wide text-yellow-200">
                            IN PROGRESS
                        </div>

                        <h3 className="text-xl font-semibold">
                            CARLA Observability and Metrics Toolkit (Capstone)
                        </h3>
                        <p className="mt-2 text-gray-300">
                            Active sprint plan for a 5-phase capstone focused on
                            telemetry collection, dashboarding, experiment
                            evaluation, and final validation.
                        </p>
                        <p className="mt-1 text-sm text-gray-400">
                            Current plan spans 90 total story points across phases.
                        </p>

                        <div className="mt-4 flex flex-wrap gap-4 text-sm">
                            <a
                                href="https://github.com/Dumpy250/carla-observability-toolkit"
                                target="_blank"
                                rel="noreferrer"
                                className="underline underline-offset-4"
                            >
                                Repository
                            </a>
                            <a
                                href="https://github.com/users/Dumpy250/projects/5"
                                target="_blank"
                                rel="noreferrer"
                                className="underline underline-offset-4"
                            >
                                Project Board
                            </a>
                        </div>

                        <div className="mt-5 overflow-hidden rounded-xl border border-yellow-200/20">
                            <Image
                                src="/projects/carla-sprint-plan.png"
                                alt="CARLA observability capstone sprint plan"
                                width={1981}
                                height={656}
                                className="h-auto w-full object-cover"
                                priority={false}
                            />
                        </div>
                    </article>
                </div>
            </section>
        </main>
    );
}
