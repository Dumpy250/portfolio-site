import CarlaViews from "@/components/CarlaViews";
import CarlaVideo from "@/components/CarlaVideo";

export default function CarlaWalkthrough() {
  return (
    <>
      <section aria-labelledby="carla-pipeline-title">
        <p className="eyebrow">Capture once, inspect afterward</p>
        <h2 id="carla-pipeline-title">From simulation to saved analysis</h2>
        <div className="carla-pipeline" role="group" aria-label="Capture to analysis, with separate artifact validation">
          <ol className="carla-main-flow">
            <li><strong>Capture</strong><span>Collect simulation telemetry and events.</span></li>
            <li><strong>Saved run files</strong><span><code>metadata.json</code><br /><code>metrics.csv</code><br /><code>events.json</code></span></li>
            <li><strong>Explore / Compare</strong><span>Flask computes summaries; React presents saved runs.</span></li>
          </ol>
          <div className="carla-validation-branch" data-source="saved-artifacts">
            <p className="carla-branch-label">Separate branch from saved files</p>
            <h3>Validate saved artifacts</h3>
            <p>Check required files, expected fields, numeric values, timestamps, and consistency between related records.</p>
          </div>
        </div>
        <p className="notice">Validation checks artifact structure and consistency, not driving quality. It is not a prerequisite for dashboard analysis.</p>
      </section>
      <CarlaVideo />
      <section aria-labelledby="carla-gallery-title">
        <h2 id="carla-gallery-title" tabIndex={-1}>Explore the analysis interface</h2>
        <CarlaViews />
      </section>
    </>
  );
}
