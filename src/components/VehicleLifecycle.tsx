"use client";

import { useState } from "react";
import { initialVehicleModel, transitionVehicle, type IllustrativeUser, type VehicleAction } from "@/lib/vehicle-lifecycle";

export default function VehicleLifecycle() {
  const [model, setModel] = useState(() => initialVehicleModel());
  const [userId, setUserId] = useState<IllustrativeUser>("example-user-a");
  function apply(action: VehicleAction) {
    setModel((current) => transitionVehicle(current, action, userId));
  }
  function reset() {
    setModel(initialVehicleModel());
    setUserId("example-user-a");
  }
  return (
    <div className="source-explorer">
      <p className="eyebrow">Lifecycle explorer · fictional identifiers / symbolic time</p>
      <div className="explorer-controls" role="group" aria-label="Illustrative vehicle lookup">
        <button type="button" aria-pressed={model.vehicle !== null} aria-controls="vehicle-model-detail" onClick={() => setModel(initialVehicleModel())}>Existing vehicle (reset state)</button>
        <button type="button" aria-pressed={model.vehicle === null} aria-controls="vehicle-model-detail" onClick={() => setModel(initialVehicleModel(false))}>Missing vehicle</button>
      </div>
      <div className="explorer-controls" role="group" aria-label="Illustrative userId">
        <button type="button" aria-pressed={userId === "example-user-a"} onClick={() => setUserId("example-user-a")}>Example user A</button>
        <button type="button" aria-pressed={userId === "example-user-b"} onClick={() => setUserId("example-user-b")}>Example user B</button>
      </div>
      <p className="explorer-selection">Selected userId: {userId}. To inspect a mismatch, associate as A, select B, then remove.</p>
      <div className="explorer-controls" role="group" aria-label="Illustrative association actions">
        <button type="button" aria-pressed={model.lastAction === "associate"} aria-controls="vehicle-model-detail" onClick={() => apply("associate")}>Associate (illustration)</button>
        <button type="button" aria-pressed={model.lastAction === "remove"} aria-controls="vehicle-model-detail" onClick={() => apply("remove")}>Remove association (illustration)</button>
        <button type="button" onClick={reset}>Reset illustration</button>
      </div>
      <div id="vehicle-model-detail" className="explorer-detail">
        <h3>Illustrative state — not a response payload</h3>
        {model.vehicle ? (
          <dl className="explorer-fields">
            <div><dt>status</dt><dd>{model.vehicle.status}</dd></div>
            <div><dt>owner</dt><dd>{model.vehicle.owner ?? "null"}</dd></div>
            <div><dt>association_date</dt><dd>{model.vehicle.association_date ?? "null"}</dd></div>
          </dl>
        ) : <p>Illustrative lookup: vehicle absent; no record fields to display.</p>}
        <p className="explorer-feedback" role="status" aria-live="polite" aria-atomic="true">{model.feedback}</p>
      </div>
    </div>
  );
}
