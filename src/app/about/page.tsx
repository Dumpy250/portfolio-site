export default function AboutPage() {
    return (
        <main className="max-w-3xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold">About</h1>
            <div className="mt-4 space-y-6 text-gray-300">
                <p>
                    I build backend systems and cloud infrastructure focused on
                    secure APIs, observability, and measurable performance.
                    <br />
                    Recent work spans Spring Boot services, AWS networking and
                    managed databases, simulation telemetry, and GPU-accelerated ML.
                </p>

                <section>
                    <h2 className="text-lg font-semibold text-white mb-3">
                        What I am Strong At
                    </h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Backend API development with Java/Spring Boot (REST, JWT/OAuth2, RBAC)</li>
                        <li>AWS cloud setup and migration workflows (VPC, RDS, Cognito)</li>
                        <li>Telemetry and observability workflows for CARLA simulation analysis</li>
                        <li>GPU-based model training and validation (PyTorch, CUDA, metric tracking)</li>
                    </ul>
                </section>

                <p>
                    I am looking for backend, cloud, or platform engineering roles
                    where I can build reliable services and keep growing technical depth.
                </p>

                <p>
                    I value practical engineering discipline: clear service boundaries,
                    repeatable validation, and data-informed iteration.
                </p>
            </div>
        </main>
    );
}
