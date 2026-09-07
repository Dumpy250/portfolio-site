import { Project } from "@/types/project";

export const projects: Project[] = [
    {
        slug: "carla-observability-toolkit",
        title: "CARLA Observability Toolkit v1.0.0",
        summary:
            "A complete workflow for capturing CARLA simulation telemetry, validating run artifacts, and comparing experiments through a Flask API and React dashboard.",
        tech: ["Python", "CARLA", "Flask", "React", "Vite", "Recharts", "pytest"],
        image: "/projects/carla-observability-toolkit.svg",
        badgeText: "v1.0.0 Released",
        links: {
            github: "https://github.com/Dumpy250/carla-observability-toolkit",
        },
        caseStudy: {
            overview:
                "CARLA simulations produce vehicle behavior that is difficult to evaluate from a live driving session alone. I built the CARLA Observability Toolkit to turn those sessions into saved datasets that can be inspected and compared after capture. Released on May 8, 2026 as my Spring 2026 capstone submission, v1.0.0 connects Python telemetry collection, artifact validation, a Flask API, and a React dashboard in one workflow. Its scope is a local demonstration and research proof of concept.",
            highlights: [
                "Implemented start, stop, abort, and manual tagging controls for simulation runs, with guards against invalid lifecycle actions.",
                "Captured speed, acceleration, steering, throttle, brake, position, and heading alongside lifecycle and collision events.",
                "Built Run Explorer and Compare Runs views with summary statistics, event timelines, metric toggles, and side-by-side speed and control charts.",
                "Added validation for individual runs and batches, plus experiment reports derived from saved telemetry.",
            ],
            architecture: [
                "CARLA adapters and modular collectors publish telemetry and events through a metric bus, separating data collection from persistence.",
                "Each run has its own metadata.json, metrics.csv, and events.json files. These artifacts are shared inputs for validation, summaries, and dashboard analysis.",
                "Flask exposes run-list and run-detail endpoints, loading artifacts and computing statistics such as average speed, duration, and collision count.",
                "React, Vite, and Recharts provide exploration and comparison views. In demo mode, Flask also serves the built frontend from a single local server.",
            ],
            learnings: [
                "Separating capture from analysis lets saved runs be revisited without restarting CARLA; it does not require a live dashboard connection during collection.",
                "Normalizing each run's simulation time to t=0 makes comparison charts meaningful even when captures begin at different CARLA world times.",
                "Using the same artifacts for API responses, validation, and reports keeps raw data and derived results traceable.",
                "Validation evidence needs to distinguish executed checks, code-inspected behavior, and scenarios blocked by missing dependencies or an inactive simulator.",
            ],
            metrics: [
                { label: "Release", value: "v1.0.0 published May 8, 2026; final Spring 2026 capstone submission" },
                { label: "Delivered", value: "Telemetry capture, run artifacts, Flask API, React dashboard, run comparison, validation, and reporting" },
                { label: "Recorded validation", value: "The May 8 test plan reports 5 pytest tests passed, 3 of 3 recent runs validated, and a successful frontend build." },
                { label: "Verification scope", value: "The test plan includes code-inspected behavior and blocked live checks; its 30 listed cases are not 30 automated integration tests." },
            ],
            references: [
                { label: "v1.0.0 release notes", href: "https://github.com/Dumpy250/carla-observability-toolkit/releases/tag/v1.0.0" },
                { label: "Setup and dashboard previews", href: "https://github.com/Dumpy250/carla-observability-toolkit/blob/v1.0.0/README.md" },
                { label: "API documentation", href: "https://github.com/Dumpy250/carla-observability-toolkit/blob/v1.0.0/docs/API.md" },
                { label: "Test plan and validation evidence", href: "https://github.com/Dumpy250/carla-observability-toolkit/blob/v1.0.0/docs/TestPlan.md" },
            ],
        },
    },
    {
        slug: "car-rental-microservices",
        title: "Car Rental Microservices",
        summary:
            "Spring Boot services with JWT/OAuth2 (Cognito), role-based access, MariaDB to AWS RDS, and Dockerized local development.",
        tech: ["Java", "Spring Boot", "JWT", "OAuth2", "Cognito", "RDS", "Docker"],
        image: "/projects/car-rental-microservices.svg",
        caseStudy: {
            overview:
                "I built this project to practice production-style backend architecture instead of a single monolith. The system handles core rental workflows and enforces role-based access for customer and admin operations. A major goal was proving I could move a local database setup into AWS RDS while keeping development setup simple for day-to-day work.",
            highlights: [
                "Split business capabilities into focused Spring Boot services with clear REST contracts.",
                "Implemented JWT authentication with Cognito-backed OAuth2 flows for secure access.",
                "Added role checks to protect admin-only actions such as fleet management and pricing updates.",
                "Containerized local development so services and dependencies spin up consistently.",
            ],
            architecture: [
                "API layer routes requests to service-specific handlers with validation at the boundary.",
                "Each service owns its persistence concerns and communicates through HTTP APIs.",
                "Auth flow uses Cognito-issued tokens that are verified in backend middleware.",
                "Application secrets and environment values are externalized for local and cloud parity.",
            ],
            learnings: [
                "Service boundaries are easier to maintain when contracts are defined early.",
                "Token lifecycle handling is a common source of bugs and needs explicit testing.",
                "Migration to managed databases is smoother when schema changes are automated.",
                "Dockerized workflows reduce setup friction and onboarding time.",
            ],
            metrics: [
                { label: "Services", value: "3 domain services plus auth integration" },
                { label: "Deployment target", value: "AWS RDS-backed environment" },
            ],
        },
    },
    {
        slug: "aws-vpc-rds-migration",
        title: "AWS VPC + RDS Migration",
        summary:
            "Custom VPC, subnets, and security groups with app database migration to RDS using managed secrets and controlled connectivity.",
        tech: ["AWS", "VPC", "RDS", "Networking"],
        image: "/projects/aws-vpc-rds-migration.svg",
        caseStudy: {
            overview:
                "This project focused on taking a database that worked locally and making it production-appropriate in AWS. I designed a custom VPC layout with subnet boundaries and security groups to control access paths. The end result was an application environment connected to RDS through explicit network rules and managed configuration.",
            highlights: [
                "Designed VPC networking with separated subnets for cleaner traffic control.",
                "Configured security groups to allow only required app-to-database paths.",
                "Migrated schema and data into RDS with environment-specific credentials.",
                "Validated connectivity and failure cases before treating the setup as stable.",
            ],
            architecture: [
                "Application tier runs inside VPC and reaches RDS through scoped security groups.",
                "Private database subnet isolates RDS from direct public internet exposure.",
                "Environment variables and secret values are separated by deployment target.",
                "Operational checks cover startup connectivity, migration success, and rollback path.",
            ],
            learnings: [
                "Network diagrams prevent misconfiguration when projects grow beyond one service.",
                "Least-privilege security group rules make debugging slower at first but safer long term.",
                "Database migrations need rehearsal in staging to avoid downtime surprises.",
                "Cloud infrastructure work benefits from repeatable checklists as much as code does.",
            ],
            metrics: [
                { label: "Cloud scope", value: "VPC, subnets, security groups, and RDS" },
                { label: "Outcome", value: "Local DB stack migrated to managed AWS database" },
            ],
        },
    },
    {
        slug: "pytorch-cnn-gpu",
        title: "GPU-Accelerated CNN Training",
        summary:
            "Designed and trained a CUDA-enabled convolutional neural network with manual training loops, metric tracking, and Top-1/Top-5 evaluation to analyze model performance and convergence behavior.",
        tech: ["Python", "PyTorch", "CUDA", "Deep Learning"],
        image: "/projects/pytorch-cnn-gpu.svg",
        badgeText: "Top-1: 81% | Top-5: 87%",
        caseStudy: {
            overview:
                "I built this project to gain hands-on experience with GPU-accelerated deep learning and make training behavior easier to inspect. The focus was on writing a reliable manual training loop, tracking core metrics, and evaluating Top-1 and Top-5 accuracy for clearer model diagnostics. I also verified CUDA 12.x setup end to end so experiments were reproducible across runs.",
            highlights: [
                "Built CUDA-enabled preprocessing and DataLoader batching for consistent GPU throughput.",
                "Implemented manual train and eval loops with epoch-level loss and accuracy tracking.",
                "Added Top-1 and Top-5 evaluation to compare prediction quality beyond a single metric.",
                "Ran controlled optimization experiments to analyze convergence behavior.",
            ],
            architecture: [
                "Python pipeline loads data, applies transforms, and prepares batched tensors.",
                "PyTorch CNN model trains through explicit forward, backward, and optimizer steps.",
                "Device checks route execution to CUDA when available with CPU fallback support.",
                "Metric logging stores loss, Top-1, and Top-5 values per epoch for analysis.",
            ],
            learnings: [
                "Manual loops expose failure points that high-level trainers can hide.",
                "Top-1 plus Top-5 gives a better signal for model progress on harder classes.",
                "Optimization changes are easier to trust when metric tracking is standardized.",
                "Run-to-run reproducibility depends on capturing config and seed values every time.",
            ],
            metrics: [
                { label: "Compute stack", value: "CUDA 12.x with PyTorch training pipeline" },
                { label: "Evaluation", value: "Top-1 and Top-5 metrics tracked across epochs" },
            ],
        },
    },
    {
        slug: "equipment-reservation-tool",
        title: "Student Equipment Reservation Tool",
        summary:
            "Java backend and React frontend with admin CSV import for bulk records, validation, and role-based reservation flows.",
        tech: ["Java", "Spring", "React", "JWT", "MariaDB"],
        image: "/projects/equipment-reservation-tool.svg",
        caseStudy: {
            overview:
                "This app solves a practical scheduling problem for student organizations sharing limited gear. I focused on making checkout and return actions straightforward for users while giving administrators stronger controls for inventory and data quality. The main engineering challenge was handling bulk record imports safely without corrupting existing reservations.",
            highlights: [
                "Created reservation workflows with guardrails for availability and conflicting bookings.",
                "Built an admin CSV import path with field validation and row-level error feedback.",
                "Implemented role-based flows for student users versus administrative staff.",
                "Connected React UI states to backend validation responses for faster correction.",
            ],
            architecture: [
                "Spring API layer handles reservation rules, status transitions, and persistence.",
                "React frontend uses form-driven pages for reservation creation and management.",
                "JWT-secured endpoints enforce role checks at both route and service layers.",
                "MariaDB stores reservations, equipment inventory, and user-role associations.",
            ],
            learnings: [
                "CSV ingestion pipelines need clear validation ordering and actionable errors.",
                "Availability logic is easier to trust when modeled as explicit state transitions.",
                "Good admin UX matters as much as end-user UX in operations-heavy systems.",
                "Shared contract types reduce frontend-backend mismatch defects.",
            ],
            metrics: [
                { label: "Primary users", value: "Students and department admins" },
                { label: "Bulk ingest", value: "CSV import with per-row validation feedback" },
            ],
        },
    },
];
