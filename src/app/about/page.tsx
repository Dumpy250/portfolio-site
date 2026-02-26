export default function AboutPage() {
    return (
        <main className="max-w-3xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold">About</h1>
            <p className="mt-4 text-gray-300">
                I am Cameron Basham, a backend and cloud engineer focused on
                Java/Spring Boot, AWS (VPC, RDS, Cognito), and React/Next.js.
                Veteran mindset, clean APIs, testing, and simple deployments.
            </p>

            <div className="mt-8 space-y-4 text-gray-300">
                <p>
                    Recent work includes microservice auth with JWT/OAuth2, RDS
                    migrations, Dockerized local environments, and a PyTorch CNN
                    on GPU.
                </p>
                <p>
                    I am currently looking for roles where I can build reliable
                    services, own infrastructure, and keep leveling up with a
                    strong team.
                </p>
            </div>
        </main>
    );
}
