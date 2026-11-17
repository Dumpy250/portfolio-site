import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "carla-observability-toolkit",
    title: "CARLA Observability Toolkit",
    summary:
      "Record simulated driving sessions, inspect telemetry and events, and compare saved runs without rerunning the simulator.",
    tech: ["Python", "CARLA", "Flask", "React", "Vite", "Recharts", "pytest"],
    image: "/projects/carla-explorer.png",
    badgeText: "v1.0.0 Released",
    links: {
      github: "https://github.com/Dumpy250/carla-observability-toolkit/tree/v1.0.0",
    },
    caseStudy: {
      role: "Spring 2026 capstone developer: telemetry capture, validation, Flask API, and React dashboard.",
      result: "Released a local demonstration and research proof of concept, with capture and analysis separated.",
      walkthrough: "carla-views",
      overview:
        "Watching a simulated drive alone makes it hard to inspect what happened or compare experiments. I built this toolkit to preserve telemetry and events as saved run files, then explore them through a separate analysis dashboard.",
      highlights: [
        "Implemented start, stop, abort, and manual tagging controls for simulation runs, with guards against invalid lifecycle actions.",
        "Captured speed, acceleration, steering, throttle, brake, position, and heading alongside lifecycle and collision events.",
        "Built Run Explorer and Compare Runs with event timelines, metric toggles, side-by-side summaries, and overlaid speed and control-input traces.",
        "Added validation for individual runs and batches, plus experiment reports derived from saved telemetry.",
      ],
      architecture: [
        "CARLA adapters and modular collectors publish telemetry and events through a metric bus, separating data collection from persistence.",
        "The same saved artifacts feed standalone validation, API summaries, and experiment reports.",
        "Flask exposes run-list and run-detail endpoints, loading artifacts and computing statistics such as average speed, duration, and collision count.",
        "React, Vite, and Recharts provide exploration and comparison views. In demo mode, Flask also serves the built frontend from a single local server.",
      ],
      learnings: [
        "Separating capture from analysis lets saved runs be revisited without restarting CARLA; it does not require a live dashboard connection during collection.",
        "Align each run's telemetry to elapsed time from its first valid telemetry timestamp, so traces can be compared despite different simulator start times. This is time alignment, not replay or event-by-event synchronization.",
        "Using the same artifacts for API responses, validation, and reports keeps raw data and derived results traceable.",

      ],
      metrics: [
        {
          label: "Release",
          value:
            "v1.0.0 published May 8, 2026; final Spring 2026 capstone submission",
        },

        {
          label: "Recorded validation",
          value:
            "The May 8 test plan reports 5 pytest tests passed, 3 of 3 recent runs validated, and a successful frontend build.",
        },
        {
          label: "Verification scope",
          value:
            "The test plan includes code-inspected behavior and blocked live checks; its 30 listed cases are not 30 automated integration tests.",
        },
      ],
      references: [
        {
          label: "v1.0.0 release notes",
          href: "https://github.com/Dumpy250/carla-observability-toolkit/releases/tag/v1.0.0",
        },
        {
          label: "Setup and dashboard previews",
          href: "https://github.com/Dumpy250/carla-observability-toolkit/blob/v1.0.0/README.md",
        },
        {
          label: "API documentation",
          href: "https://github.com/Dumpy250/carla-observability-toolkit/blob/v1.0.0/docs/API.md",
        },
        {
          label: "Test plan and validation evidence",
          href: "https://github.com/Dumpy250/carla-observability-toolkit/blob/v1.0.0/docs/TestPlan.md",
        },
      ],
    },
  },
  {
    slug: "car-rental-microservices",
    title: "Car Rental Backend & AWS Infrastructure",
    summary:
      "Java/Spring Boot services for vehicle-to-user associations, with REST endpoints, validation, persistence, and AWS EC2, VPC, RDS and Cognito.",
    tech: ["Java", "Spring Boot", "REST", "Validation", "Persistence", "EC2", "VPC", "RDS", "Cognito"],
    image: "/projects/car-rental-microservices.svg",
    thumbnail: {
      src: "/projects/vehicle-service-workflow.svg",
      alt: "Recorded API workflow: AVAILABLE to ASSOCIATED to AVAILABLE; explanatory diagram based on a local run",
      width: 1200,
      height: 440,
      caption: "Recorded API workflow · explanatory diagram · Local demonstration with fictional data",
    },
    links: {
      github: "https://github.com/Dumpy250/car-rental-service/tree/05c977857c41073a505584839d8e8028a05145e2",
    },
    caseStudy: {
      role: "Backend project work and AWS EC2/VPC configuration.",
      walkthrough: "vehicle-lifecycle",
      result: "Register vehicles, associate them with users, and return them to available status, with each change saved to the database.",
      resultCaption: "Verified in a local demonstration with fictional data",
      overview:
        "The project separates gateway, vehicle and user responsibilities across Java/Spring Boot services. The vehicle service manages records and vehicle-to-user associations, while the companion user service integrates with Amazon Cognito. AWS work included Amazon RDS for MySQL persistence and EC2/VPC infrastructure configuration.",
      highlights: [
        "Vehicle creation, retrieval and listing through Spring Boot REST endpoints.",
        "Nonblank-field validation before persistence, including the recorded blank-licence rejection.",
        "AVAILABLE and ASSOCIATED lifecycle rules, with user and timestamp persistence and matching-owner release.",
        "Configured EC2 and VPC infrastructure for the wider backend project, alongside RDS persistence and Cognito user management.",
      ],
      architecture: [
        "Spring Boot REST controllers handle requests for vehicle operations.",
        "Service logic checks lifecycle state and compares the supplied user identifier with the stored owner; this comparison is not authenticated authorization.",
        "A persistence layer stores vehicle records. Saved GET responses were matched against the isolated database readbacks.",
        "Association returns HTTP 201 with an empty body; release returns HTTP 200 with an empty body. The separate GETs show the resulting state. Cleared owner/date fields are omitted from JSON and stored as NULL in the database.",
      ],
      learnings: [
        "Separating request handling from service and persistence logic makes backend responsibilities easier to follow.",
        "Validation and explicit associations are important when linked records change.",
      ],
      references: [
        {
          label: "Reviewed vehicle-service source revision",
          href: "https://github.com/Dumpy250/car-rental-service/tree/05c977857c41073a505584839d8e8028a05145e2",
        },
      ],
    },
  },
  {
    slug: "pytorch-cnn-gpu",
    title: "Warehouse Item Recognition",
    thumbnail: {
      src: "/projects/warehouse-pipeline-thumbnail.svg",
      alt: "Explanatory diagram of candidate regions, largest-area crop selection and custom CNN category ranking",
      width: 1200,
      height: 440,
      caption: "Explanatory schematic — not a recorded prediction.",
    },
    summary:
      "My contribution to this team project combined a pretrained object detector with a custom classifier to produce ranked item categories.",
    tech: ["Python", "PyTorch with CUDA acceleration", "YOLOv8"],
    badgeText: "Team project",
    caseStudy: {
      role: "Team contributor: YOLO_test detection/classification prototype and evaluation workflow.",
      walkthrough: "warehouse-pipeline",
      result: "A detector-to-classifier prototype with ranked predictions and CPU fallback; unseen-data performance remains unestablished.",
      overview:
        "The project explored using image recognition to identify unfamiliar warehouse tools and materials. The motivation was to help people recognize potentially useful items rather than discard them simply because their identity or purpose was unclear.",
      highlights: [
        "Developed the YOLO_test detector-to-classifier prototype and evaluation workflow as my contribution to the team project.",
        "Implemented a PyTorch CNN training loop with GPU support, mixed precision, early stopping, and best-model checkpoint saving.",
        "Added CPU fallback and Top-1/Top-5 evaluation reporting.",
      ],
      architecture: [
        "YOLOv8 locates candidate regions. The largest detected region by area—not the highest-confidence detection—is selected for classification.",
        "The selected crop or whole-image fallback is resized and passed to the same custom CNN, whose scores produce up to five ranked categories.",
        "A separate evaluation script compares predictions with directory-based class labels and saves a report and chart.",
      ],
      learnings: [
        "Detection and classification are different tasks; using a pretrained detector does not mean training that detector from scratch.",
        "Selecting one largest region keeps the pipeline simple, but assumes that region contains the item we want to classify.",
        "A saved accuracy report must be tied to its evaluation population. The script traverses the configured image directory rather than explicitly selecting an independent held-out test set.",
        "Related team experiments should not be merged into the same accuracy claim or attributed entirely to one contributor.",
      ],
      metrics: [
        { label: "Scope", value: "Team project / YOLO_test contribution" },
        {
          label: "Evaluation boundary",
          value:
            "Historical report available; unseen-data performance has not been established by the reviewed evaluation script.",
        },
      ],
    },
  },
  {
    slug: "equipment-reservation-tool",
    title: "Equipment Rental Software",
    thumbnail: {
      src: "/projects/reservation-capture/originals/inventory-top.png",
      alt: "Inventory page populated with 20 fictional media-equipment items",
      width: 1346,
      height: 905,
      caption: "Local demonstration with fictional data",
    },
    summary:
      "A team-built React and Spring Boot application for managing media-equipment rentals.",
    tech: ["Java", "Spring Boot", "React", "MariaDB", "CSV validation", "QA"],
    badgeText: "Ferris State University / Software development internship / 2025",
    caseStudy: {
      role: "CSV imports, project-board tracking, QA, and additional frontend/backend contributions in a team project.",
      walkthrough: "reservation-import",
      result: "The demonstrated student import adds valid records, reports invalid emails and skips existing student IDs on reimport.",
      overview:
        "The application was developed for Ferris State University’s Digital Media department to manage equipment used by crews recording and broadcasting sporting events.",
      highlights: [
        "Contributed to student and inventory CSV imports, including validation and actionable skipped-row feedback.",
        "Supported project-board tracking and QA, with additional frontend and backend contributions.",
        "Reservation logic was mainly written by a colleague.",
      ],
      architecture: [
        "The React client checks CSV headers and row values, submits valid records individually to the Spring Boot API, and reports added records alongside skipped-row reasons.",
      ],
      learnings: [
        "Partial imports need feedback that distinguishes invalid rows from existing records, so users know what to correct and retry.",
      ],
      sourceNote: "Source code is private; demonstrations use fictional data.",
    },
  },
  {
    slug: "job-posting-mvc",
    title: "Job Posting MVC",
    thumbnail: {
      src: "/projects/job-posting-capture/details/05-jobs-list.png",
      alt: "Recorded Jobs list with three fictional positions and their employer names",
      width: 1440,
      height: 410,
      caption: "Local demonstration with fictional data",
    },
    summary:
      "A C# / ASP.NET Core MVC coursework application for employers, job listings, and applicants, with relational modeling through Entity Framework Core.",
    tech: [
      "C#",
      ".NET 8",
      "ASP.NET Core MVC",
      "Entity Framework Core",
      "MySQL",
    ],
    badgeText: "Coursework / Web application",
    links: { github: "https://github.com/Dumpy250/JobPosting" },
    caseStudy: {
      role: "Coursework development using ASP.NET Core MVC and Entity Framework Core.",
      walkthrough: "job-captures",
      result: "An employer, job, and applicant management application with relational data modeling.",
      overview:
        "This coursework application manages employer, job and applicant records using C# and ASP.NET Core MVC. Each job belongs to an employer; the local demonstration follows that relationship through the application's real forms and saved lists.",
      highlights: [
        "Worked with MVC controllers and Razor views for employer, job, and applicant CRUD workflows.",
        "Used Entity Framework Core and a MySQL provider for relational persistence.",
        "Modeled employer-to-job and applicant-to-job relationships.",
      ],
      architecture: [
        "ASP.NET Core MVC separates routing and controller logic from models and Razor views.",
        "Controllers use dependency-injected database context access and asynchronous Entity Framework queries.",
        "An employer can have multiple jobs. The job form selects an existing employer, and the saved Jobs list displays its name.",
        "An applicant/job join entity models a many-to-many relationship in the schema; the demonstrated interface does not implement an Apply-to-Job workflow.",
      ],
      learnings: [
        "MVC separates rendering, request handling, and application data concerns.",
        "Relational constraints and validation help keep linked records consistent.",
        "Database credentials belong in local environment configuration, not committed application settings.",
      ],
      metrics: [
        {
          label: "Context",
          value: "Coursework, not a production hiring platform",
        },
        {
          label: "Stack",
          value: "C#, .NET 8, ASP.NET Core MVC, Entity Framework Core, MySQL",
        },
      ],
    },
  },
];
