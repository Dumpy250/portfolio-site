export default function Home() {
  return (
      <main className="min-h-screen px-6 py-16 sm:px-10">
        {/* Hero */}
        <section className="max-w-5xl mx-auto py-20">
          <p className="text-sm tracking-widest text-gray-400">PORTFOLIO</p>
          <h1 className="mt-3 text-4xl sm:text-6xl font-bold">
            Cameron Basham — Software Engineer
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-3xl">
            Backend & Cloud developer focused on Java/Spring Boot, AWS, and React.
            Veterans mindset. Curious about ML/AI.
          </p>

          <div className="mt-8 flex gap-3">
            <a
                href="/projects"
                className="rounded-xl px-5 py-3 bg-white text-black font-medium"
            >
              View Projects
            </a>
            <a
                href="/resume.pdf"
                className="rounded-xl px-5 py-3 border border-white/20"
            >
              Download Resume
            </a>
          </div>
        </section>

        {/* Highlights */}
        <section className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-4">
          {[
            { t: "Java + Spring Boot", d: "JWT/OAuth2, REST, MySQL/MariaDB" },
            { t: "AWS", d: "VPC, RDS, Cognito, Docker" },
            { t: "Frontend", d: "Next.js, React, Tailwind" },
          ].map((c) => (
              <div
                  key={c.t}
                  className="rounded-2xl border border-white/10 p-5 bg-white/5"
              >
                <h3 className="font-semibold">{c.t}</h3>
                <p className="text-sm text-gray-300 mt-1">{c.d}</p>
              </div>
          ))}
        </section>
      </main>
  );
}
