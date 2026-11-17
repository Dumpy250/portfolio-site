import WarehousePipeline from "@/components/WarehousePipeline";
import VehicleApiWalkthrough from "@/components/VehicleApiWalkthrough";
import VehicleAwsArchitecture from "@/components/VehicleAwsArchitecture";
import ReservationWalkthrough from "@/components/ReservationWalkthrough";
import CarlaWalkthrough from "@/components/CarlaWalkthrough";
import JobPostingWalkthrough from "@/components/JobPostingWalkthrough";
import type { ProjectCaseStudy } from "@/types/project";

export default function CaseStudyWalkthrough({ kind, contributions }: { kind: ProjectCaseStudy["walkthrough"]; contributions?: readonly string[] }) {
  if (kind === "carla-views") return <CarlaWalkthrough />;
  if (kind === "job-captures") return <JobPostingWalkthrough />;
  if (kind === "reservation-import") return <ReservationWalkthrough contributions={contributions} />;
  if (kind === "vehicle-lifecycle") return <><VehicleAwsArchitecture /><VehicleApiWalkthrough /></>;
  if (kind !== "warehouse-pipeline") return null;
  return (
    <section aria-labelledby="warehouse-walkthrough-title">
      <p className="eyebrow">Explanatory model of inspected source</p>
      <h2 id="warehouse-walkthrough-title">My contribution: image to ranked categories</h2>
      <p>Locate a region, then classify its contents. These controls explain the code; they do not run inference or display a recorded prediction.</p>
      <WarehousePipeline />
    </section>
  );
}
