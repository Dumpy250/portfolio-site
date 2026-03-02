export default function ContactPage() {
    return (
        <main className="max-w-3xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold">Contact</h1>
            <p className="mt-4 max-w-2xl text-gray-300 leading-relaxed">
                Best way to reach me is email. I usually respond within 24 hours
                for hiring, collaboration, or project-related conversations.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                    className="inline-flex w-40 items-center justify-center rounded-lg border border-white/15 px-4 py-2 transition-colors hover:bg-white/5"
                    href="mailto:cameron250taylor@outlook.com?subject=Hello%20Cameron"
                >
                    Email me
                </a>
                <a
                    className="inline-flex w-40 items-center justify-center rounded-lg border border-white/15 px-4 py-2 transition-colors hover:bg-white/5"
                    href="https://github.com/Dumpy250"
                    target="_blank"
                    rel="noreferrer"
                >
                    GitHub
                </a>
                <a
                    className="inline-flex w-40 items-center justify-center rounded-lg border border-white/15 px-4 py-2 transition-colors hover:bg-white/5"
                    href="https://www.linkedin.com/in/cameron-basham-7555ba166"
                    target="_blank"
                    rel="noreferrer"
                >
                    LinkedIn
                </a>
                <a
                    className="inline-flex w-40 items-center justify-center rounded-lg border border-white/15 px-4 py-2 transition-colors hover:bg-white/5"
                    href="/resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                >
                    Resume
                </a>
            </div>

            <p className="mt-8 text-gray-300">
                Open to backend, cloud, and platform engineering opportunities.
            </p>
        </main>
    );
}
