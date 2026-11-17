"use client";

import { useState, type KeyboardEvent } from "react";
import { formattedBody, originalVehicleRecords, recordedPath, vehicleSteps, vehicleGuards, type VehicleEvidenceView, type VehicleStepId } from "@/lib/vehicle-api-recording";

function inspectCodeWithKeyboard(event: KeyboardEvent<HTMLElement>) {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
  event.preventDefault();
  event.currentTarget.scrollBy({ left: event.key === "ArrowRight" ? 48 : -48, behavior: "instant" });
}

function RecordedBody({ body, label, highlight = false }: { body: string; label: string; highlight?: boolean }) {
  if (body === "") return <p className="vehicle-api-empty">Empty response body <span>0 bytes</span></p>;
  return (
    <pre className="vehicle-api-code" tabIndex={0} role="region" aria-label={label} onKeyDown={inspectCodeWithKeyboard}>
      <code>{formattedBody(body).split("\n").map((line, index) => (
        <span key={index} className={highlight && /^\s*"(status|owner|association_date)":/.test(line) ? "vehicle-api-field" : undefined}>{line}{"\n"}</span>
      ))}</code>
    </pre>
  );
}

export function EvidencePanels({ view }: { view: VehicleEvidenceView }) {
  const action = view.action;
  return (
    <>
      <div className="vehicle-api-panels">
        <section className="vehicle-api-panel">
          <h4>Request</h4>
          <pre className="vehicle-api-path" tabIndex={0} role="region" aria-label={`${view.label} request path`} onKeyDown={inspectCodeWithKeyboard}><code><strong>{action.request.method}</strong>{" "}{recordedPath(action)}</code></pre>
          {action.request.body === null ? <p className="vehicle-api-empty">No request body</p> : <RecordedBody body={action.request.body} label={`${view.label} request JSON`} />}
        </section>
        <section className="vehicle-api-panel" data-action-response={view.id}>
          <h4>Response</h4>
          <p className="vehicle-api-http"><span>HTTP {action.response.status}</span><span>{action.response.content_type ?? "No content type"}</span></p>
          <RecordedBody body={action.response.body} label={`${view.label} action response JSON`} />
        </section>
        {view.saved ? (
          <section className="vehicle-api-panel vehicle-api-panel--saved" data-saved-state={view.id}>
            <h4>Saved state</h4>
            <p className="vehicle-api-http"><span>Subsequent GET · HTTP {view.saved.response.status}</span><span>Recorded readback</span></p>
            <pre className="vehicle-api-path" tabIndex={0} role="region" aria-label={`${view.label} saved-state request path`} onKeyDown={inspectCodeWithKeyboard}><code>GET {recordedPath(view.saved)}</code></pre>
            <RecordedBody body={view.saved.response.body} label={`${view.label} saved-state JSON`} highlight />
            <p className="notice">Bold, marked lines identify state fields. Scroll horizontally, or focus a code block and use Left/Right.</p>
          </section>
        ) : null}
      </div>
      <details className="vehicle-api-original">
        <summary>Inspect original recorded payloads</summary>
        <p className="notice">Original record objects retain the exact response body strings and local request URLs.</p>
        <h4>Action record</h4>
        <pre className="vehicle-api-code" tabIndex={0} role="region" aria-label={`${view.label} original action record`} onKeyDown={inspectCodeWithKeyboard}><code>{JSON.stringify(action, null, 2)}</code></pre>
        {view.saved ? <><h4>Subsequent GET record</h4><pre className="vehicle-api-code" tabIndex={0} role="region" aria-label={`${view.label} original saved-state record`} onKeyDown={inspectCodeWithKeyboard}><code>{JSON.stringify(view.saved, null, 2)}</code></pre></> : null}
      </details>
    </>
  );
}

export default function VehicleApiWalkthrough({ initialStep = "create" }: { initialStep?: VehicleStepId }) {
  const [step, setStep] = useState<VehicleStepId>(initialStep);
  const selected = vehicleSteps.find((item) => item.id === step) ?? vehicleSteps[0];
  const vehicle = JSON.parse(selected.saved!.response.body) as { id: string; status: string; owner?: string; association_date?: string };
  return (
    <section className="vehicle-api" aria-labelledby="vehicle-walkthrough-title">
      <p className="eyebrow">Recorded API workflow</p>
      <h2 id="vehicle-walkthrough-title">Create, associate, release.</h2>
      <p>Follow one vehicle through this Spring Boot service: register its details, associate it with a user, then release it for reuse.</p>
      <p className="notice">Local demonstration with fictional data · These controls inspect recorded requests; they do not send API calls.</p>
      <div className="vehicle-api-tabs" role="group" aria-label="Recorded workflow views">
        {vehicleSteps.map((item) => <button key={item.id} type="button" aria-pressed={step === item.id} aria-controls="vehicle-api-selected" onClick={() => setStep(item.id as VehicleStepId)}>{item.label}</button>)}
      </div>
      <article className="vehicle-api-selected" id="vehicle-api-selected" key={selected.id} aria-labelledby={`vehicle-api-${selected.id}-title`}>
        <p className="eyebrow">{selected.label} / recorded result</p>
        <h3 id={`vehicle-api-${selected.id}-title`}>{selected.title}</h3>
        <p>{selected.note}</p>
        <dl className="vehicle-api-state" aria-label="Recorded vehicle state">
          <div><dt>Status</dt><dd>{vehicle.status}</dd></div>
          <div><dt>Associated user</dt><dd>{vehicle.owner ?? "No association returned"}</dd></div>
          <div><dt>Association timestamp</dt><dd>{vehicle.association_date ?? "Not returned"}</dd></div>
        </dl>
        <p className="vehicle-api-identity">Same vehicle throughout: <code>{vehicle.id}</code></p>
        <EvidencePanels view={selected} />
      </article>
      <details className="vehicle-api-guards">
        <summary>Validation and state guards</summary>
        <p>Inspect the rejected requests and their recorded results. The owner-string comparison is not authenticated authorization.</p>
        {vehicleGuards.map((guard) => (
          <details className="vehicle-api-guard" key={guard.id}>
            <summary>{guard.label}<span>HTTP {guard.action.response.status}</span></summary>
            <h3>{guard.title}</h3>
            <p>{guard.note}</p>
            <EvidencePanels view={guard} />
          </details>
        ))}
      </details>
      <a className="text-link" href={originalVehicleRecords} target="_blank" rel="noreferrer">Inspect all original HTTP records ↗</a>
    </section>
  );
}
