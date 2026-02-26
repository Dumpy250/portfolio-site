import { Project } from "@/types/project";

export const projects: Project[] = [
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
    {
        slug: "pytorch-cnn-gpu",
        title: "PyTorch CNN on GPU",
        summary:
            "CUDA 12.1 training pipeline with accuracy tracking across 5 or more epochs and prediction visualization.",
        tech: ["Python", "PyTorch", "CUDA", "ML"],
        image: "/projects/pytorch-cnn-gpu.svg",
        caseStudy: {
            overview:
                "I built this project to get hands-on experience with GPU-based deep learning workflows. The focus was less on squeezing out benchmark numbers and more on building a reliable training loop, repeatable experiment setup, and clear model diagnostics. I also wanted to verify that the full CUDA toolchain was configured correctly end to end.",
            highlights: [
                "Set up data preprocessing and batching compatible with GPU acceleration.",
                "Implemented training and evaluation loops with epoch-level metric tracking.",
                "Recorded model performance over multiple runs to compare hyperparameter choices.",
                "Generated prediction visualizations to inspect where the classifier fails.",
            ],
            architecture: [
                "Python pipeline loads dataset, applies transforms, and builds DataLoader batches.",
                "CNN model is defined in PyTorch with forward pass and loss optimization steps.",
                "CUDA device detection controls whether training runs on GPU or CPU fallback.",
                "Metrics and sample predictions are exported for quick post-run analysis.",
            ],
            learnings: [
                "Input pipeline efficiency can bottleneck model throughput before compute does.",
                "Tracking both loss and accuracy reveals overfitting earlier than one metric alone.",
                "GPU memory errors are easier to debug with smaller baseline batch sizes first.",
                "Reproducibility improves when seeds and config values are logged every run.",
            ],
            metrics: [
                { label: "Training runtime", value: "GPU-accelerated via CUDA 12.1" },
                { label: "Experiment length", value: "5 plus epochs per baseline run" },
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
];
