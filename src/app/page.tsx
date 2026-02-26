import Link from "next/link";

export default function Home() {
    return (
        <main className="min-h-screen px-6 py-16 sm:px-10">
            <section className="max-w-5xl mx-auto py-20">
                <p className="text-sm tracking-widest text-gray-400">PORTFOLIO</p>
                <h1 className="mt-3 text-4xl sm:text-6xl font-bold">
                    Cameron Basham - Software Engineer
                </h1>
                <p className="mt-6 text-lg text-gray-300 max-w-3xl">
                    Backend and cloud developer focused on Java/Spring Boot, AWS,
                    and React. Veteran mindset. Curious about ML/AI.
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
                    { t: "Java + Spring Boot", d: "JWT/OAuth2, REST, MySQL/MariaDB" },
                    { t: "AWS", d: "VPC, RDS, Cognito, Docker" },
                    { t: "Frontend", d: "Next.js, React, Tailwind" },
                ].map((card) => (
                    <div
                        key={card.t}
                        className="rounded-2xl border border-white/10 p-5 bg-white/5"
                    >
                        <h3 className="font-semibold">{card.t}</h3>
                        <p className="text-sm text-gray-300 mt-1">{card.d}</p>
                    </div>
                ))}
            </section>
        </main>
    );
}
