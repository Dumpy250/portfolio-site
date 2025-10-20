export default function ContactPage() {
    return (
        <main className="max-w-3xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold">Contact</h1>
            <p className="mt-4 text-gray-300">
                Best way to reach me is email. I respond quickly.
            </p>

            <div className="mt-6 flex flex-col gap-3">
                <a
                    className="inline-block w-fit rounded-lg border border-white/15 px-4 py-2 hover:bg-white/5"
                    href="mailto:cameron250taylor@gmail.com?subject=Hello%20Cameron"
                >
                    Email me
                </a>
                <a
                    className="inline-block w-fit rounded-lg border border-white/15 px-4 py-2 hover:bg-white/5"
                    href="https://github.com/Dumpy250"
                    target="_blank"
                    rel="noreferrer"
                >
                    GitHub
                </a>
                {/* Add LinkedIn when ready */}
                {/* <a ... href="https://www.linkedin.com/in/your-handle">LinkedIn</a> */}
            </div>
        </main>
    );
}