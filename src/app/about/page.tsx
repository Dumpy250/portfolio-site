export default function AboutPage() {
    return (
        <main className="max-w-3xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold">About</h1>
            <p className="mt-4 text-gray-300">
                I’m Cameron Basham, a backend & cloud engineer focused on Java/Spring
                Boot, AWS (VPC, RDS, Cognito), and React/Next.js. Veteran mindset; love
                clean APIs, testing, and simple deployments.
            </p>

            <div className="mt-8 space-y-4 text-gray-300">
                <p>
                    Recent work: microservice auth with JWT/OAuth2, RDS migrations,
                    Dockerized local envs, and a PyTorch CNN on GPU.
                </p>
                <p>
                    I’m currently looking for roles where I can build reliable services,
                    own infra, and learn from a strong team.
                </p>
            </div>
        </main>
    );
}