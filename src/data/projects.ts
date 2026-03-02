import { Project } from "@/types/project";

export const projects: Project[] = [
    {
        slug: "carla-observability-toolkit",
        title: "CARLA Observability Toolkit (In Progress)",
        summary:
            "Simulation telemetry and metrics toolkit for CARLA with sprint-based delivery, dashboard planning, and experiment validation workflows.",
        tech: ["Python", "CARLA", "Observability", "Telemetry", "Dashboards"],
        image: "/projects/carla-observability-toolkit.svg",
        links: {
            github: "https://github.com/Dumpy250/carla-observability-toolkit",
        },
        caseStudy: {
            overview:
                "This capstone is focused on building a practical observability layer for CARLA simulation workflows. The project emphasizes structured telemetry collection, measurable experiment evaluation, and clear reporting so model and scenario behavior can be analyzed with less guesswork. It is being delivered in phased sprints with explicit acceptance criteria.",
            highlights: [
                "Defined a 5-phase sprint plan to ship telemetry, dashboards, and validation in increments.",
                "Mapped key simulation and experiment metrics for consistent observability.",
                "Established repository and project-board workflows to keep execution visible.",
                "Added validation checkpoints to assess metric quality and experiment outcomes.",
            ],
            architecture: [
                "Telemetry collectors capture simulation events and performance signals.",
                "Metrics are normalized into analysis-ready structures for downstream dashboards.",
                "Dashboard and reporting layers present experiment behavior over time.",
                "Sprint execution is tracked through scoped stories and acceptance criteria.",
            ],
            learnings: [
                "Strong observability design is as important as model logic in simulation work.",
                "Incremental delivery reduces risk for multi-phase capstone projects.",
                "Useful metrics need clear definitions before collection starts.",
                "A visible sprint board improves accountability and planning decisions.",
            ],
            metrics: [
                { label: "Delivery plan", value: "5 phases and 90 total story points" },
                { label: "Current focus", value: "Telemetry, dashboards, and experiment validation" },
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
