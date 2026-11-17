import { projects } from "@/data/projects";

export const projectOrder = [
  "carla-observability-toolkit",
  "pytorch-cnn-gpu",
  "car-rental-microservices",
  "equipment-reservation-tool",
  "job-posting-mvc",
] as const;

export const selectedProjects = projectOrder.map((slug) => {
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) throw new Error(`Missing selected project: ${slug}`);
  return project;
});
