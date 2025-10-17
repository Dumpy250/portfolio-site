import { Project } from "@/types/project";

export const projects: Project[] = [
    {
        slug: "car-rental-microservices",
        title: "Car Rental Microservices",
        summary:
            "Spring Boot services with JWT/OAuth2 (Cognito), role-based access, MariaDB → AWS RDS, Dockerized local dev.",
        tech: ["Java", "Spring Boot", "JWT", "OAuth2", "Cognito", "RDS", "Docker"],
        links: {
            github: "https://github.com/your-user/your-car-rental-monorepo",
        },
        image: "/projects/car-rental.png",
    },
    {
        slug: "equipment-reservation-tool",
        title: "Student Equipment Reservation Tool",
        summary:
            "Java backend + React frontend; Admin CSV import for bulk records, validation, and role-based flows.",
        tech: ["Java", "Spring", "React", "JWT", "MariaDB"],
        links: {
            github: "https://github.com/your-user/equipment-reservation",
        },
        image: "/projects/reservations.png",
    },
    {
        slug: "pytorch-cnn-gpu",
        title: "PyTorch CNN on GPU",
        summary:
            "CUDA 12.1 training pipeline, accuracy tracking across 5+ epochs, visualization of predictions.",
        tech: ["Python", "PyTorch", "CUDA", "ML"],
        links: {
            github: "https://github.com/your-user/pytorch-cnn",
        },
        image: "/projects/pytorch.png",
    },
    {
        slug: "aws-vpc-rds-migration",
        title: "AWS VPC + RDS Migration",
        summary:
            "Custom VPC + subnets + security groups; migrate app DB to RDS with environment secrets and connectivity.",
        tech: ["AWS", "VPC", "RDS", "Networking"],
        image: "/projects/aws.png",
    },
];