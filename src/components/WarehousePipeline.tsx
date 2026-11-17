"use client";

import { useState } from "react";
import { warehouseDiagramState, warehouseStepDetail, warehouseSteps, type WarehouseBranch, type WarehouseStep } from "@/lib/warehouse-walkthrough";

export default function WarehousePipeline({ initialStep = "input", initialBranch = "detected" }: { initialStep?: WarehouseStep; initialBranch?: WarehouseBranch } = {}) {
  const [step, setStep] = useState<WarehouseStep>(initialStep);
  const [branch, setBranch] = useState<WarehouseBranch>(initialBranch);
  const detail = warehouseStepDetail(step, branch);
  const diagram = warehouseDiagramState(step, branch);
  function selectBranch(next: WarehouseBranch) {
    setBranch(next);
    setStep("region");
  }
  return (
    <div className="source-explorer warehouse-explorer">
      <p className="eyebrow">Schematic only — no inference or recorded prediction</p>
      <div className="explorer-controls" role="group" aria-label="Pipeline steps">
        {warehouseSteps.map((item) => (
          <button key={item.id} type="button" aria-pressed={step === item.id} aria-controls="warehouse-step-detail" onClick={() => setStep(item.id)}>{item.label}</button>
        ))}
      </div>
      <div className="explorer-controls" role="group" aria-label="Illustrative detector branch">
        <button type="button" aria-pressed={branch === "detected"} aria-controls="warehouse-step-detail" onClick={() => selectBranch("detected")}>Detected regions: largest crop</button>
        <button type="button" aria-pressed={branch === "fallback"} aria-controls="warehouse-step-detail" onClick={() => selectBranch("fallback")}>No detected regions: full image</button>
      </div>
      <div className="warehouse-schematic" role="group" aria-label="Explanatory detector-to-classifier schematic" data-stage={step} data-branch={branch} data-selection={diagram.fullImageSelected ? "whole-image" : diagram.selectedId ? "largest-crop" : "not-selected"}>
        <div className="warehouse-canvas">
          <svg viewBox="0 0 320 210" role="img" aria-labelledby="warehouse-canvas-title warehouse-canvas-desc">
            <title id="warehouse-canvas-title">{step === "input" ? "Input image schematic" : diagram.fullImageSelected ? "Whole image selected: no detections" : diagram.selectedId ? "Largest candidate selected by area" : branch === "detected" ? "Illustrative candidate regions" : "No candidate regions returned"}</title>
            <desc id="warehouse-canvas-desc">Neutral rectangles explain the code, not real image detections. Only one largest-area region is classified when boxes exist; without boxes, the entire image is used.</desc>
            <rect x="8" y="8" width="304" height="194" rx="4" className="warehouse-image-boundary" data-selected={diagram.fullImageSelected} />
            {diagram.regions.map((region) => (
              <rect key={region.id} x={region.x} y={region.y} width={region.width} height={region.height} className="warehouse-candidate" data-candidate={region.id} data-selected={region.id === diagram.selectedId} />
            ))}
            <text x="18" y="193" className="warehouse-canvas-label">{step === "input" ? "Image geometry only" : diagram.fullImageSelected ? "Whole image selected" : diagram.selectedId ? "Largest area selected" : branch === "detected" ? "Candidate regions" : "No detections"}</text>
          </svg>
          <p className="notice">{branch === "detected" ? "One region, chosen by area—not confidence." : "No boxes returned: use the whole image, not an error fallback."}</p>
        </div>
        <ol className="warehouse-path" aria-label="Selected source-code path">
          <li data-active={step === "region"}><strong>{diagram.inputLabel}</strong><span>{branch === "detected" ? "One selected region" : "Full RGB image"}</span></li>
          <li data-active={step === "ranking"}><strong>Resize</strong><span>Prepare classifier input</span></li>
          <li data-active={step === "ranking"}><strong>Custom CNN</strong><span>Score categories</span></li>
          <li data-active={step === "ranking"}><strong>Ranked categories</strong><span>Up to five; no predictions shown</span></li>
        </ol>
      </div>
      <div id="warehouse-step-detail" className="explorer-detail" role="status" aria-live="polite" aria-atomic="true">
        <p className="explorer-selection">Selected branch: {branch === "detected" ? "detected regions" : "no detected regions"}</p>
        <h3>{detail.title}</h3>
        <p>{detail.body}</p>
        <p className="explorer-source">Inspected source: {detail.source}</p>
      </div>
    </div>
  );
}
