import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { loadSource } from "./load-source.mjs";

const renderCase = async (slug) => renderToStaticMarkup(
  await loadSource("src/app/projects/[slug]/page.tsx").default({ params: Promise.resolve({ slug }) }),
);

test("vehicle shared model guards initial removal, duplicate association, wrong owner, and missing records", () => {
  const { initialVehicleModel, transitionVehicle } = loadSource("src/lib/vehicle-lifecycle.ts");
  const initial = initialVehicleModel();
  assert.equal(initial.vehicle.status, "AVAILABLE");
  assert.equal(initial.vehicle.owner, null);
  assert.equal(initial.vehicle.association_date, null);
  const invalidRemoval = transitionVehicle(initial, "remove", "example-user-a");
  assert.equal(invalidRemoval.vehicle, initial.vehicle);
  assert.match(invalidRemoval.feedback, /requires ASSOCIATED/);
  const associated = transitionVehicle(initial, "associate", "example-user-a");
  assert.equal(associated.vehicle.status, "ASSOCIATED");
  assert.equal(associated.vehicle.owner, "example-user-a");
  assert.equal(associated.vehicle.association_date, "illustrative association time");
  assert.equal(initial.vehicle.status, "AVAILABLE", "input state is not mutated");
  const duplicate = transitionVehicle(associated, "associate", "example-user-b");
  assert.equal(duplicate.vehicle, associated.vehicle);
  assert.match(duplicate.feedback, /requires AVAILABLE/);
  const wrongOwner = transitionVehicle(associated, "remove", "example-user-b");
  assert.equal(wrongOwner.vehicle, associated.vehicle);
  assert.match(wrongOwner.feedback, /owner must match userId/);
  const removed = transitionVehicle(associated, "remove", "example-user-a");
  assert.equal(removed.vehicle.status, "AVAILABLE");
  assert.equal(removed.vehicle.owner, null);
  assert.equal(removed.vehicle.association_date, null);
  const missing = initialVehicleModel(false);
  for (const action of ["associate", "remove"]) {
    const rejected = transitionVehicle(missing, action, "example-user-a");
    assert.equal(rejected.vehicle, null);
    assert.match(rejected.feedback, /vehicle must exist/);
    assert.match(rejected.feedback, /^Illustration only:/);
    assert.doesNotMatch(rejected.feedback, /HTTP|\b[245]\d\d\b/);
  }
  assert.equal(initialVehicleModel().lastAction, null);
});

test("vehicle recorded workflow preserves source scope and state-guard qualifications", async () => {
  const html = await renderCase("car-rental-microservices");
  assert.match(html, /Recorded API workflow/);
  assert.match(html, /Create, associate, release/);
  assert.match(html, /controls inspect recorded requests; they do not send API calls/);
  assert.match(html, /model.*brand.*licence_number/s);
  assert.match(html, /association_date/);
  assert.match(html, /not authenticated authorization/);
  assert.match(html, /omitted from JSON and stored as NULL/);
  assert.match(html, /aria-pressed="false"[^>]*>Associate<\/button>/);
  assert.match(html, /aria-pressed="false"[^>]*>Release<\/button>/);
  assert.match(html, /aria-pressed="true"[^>]*>Create<\/button>/);
  assert.match(html, /Validation and state guards/);
  assert.match(html, /05c977857c41073a505584839d8e8028a05145e2/);
  assert.match(html, /Logical component diagram/);
  assert.doesNotMatch(html, /symbolic time|Reset illustration|\b(?:Docker|OAuth2|JWT)\b/);
});

test("warehouse shared detail logic switches the region and ranking explanations without predictions", () => {
  const { warehouseStepDetail } = loadSource("src/lib/warehouse-walkthrough.ts");
  assert.match(warehouseStepDetail("region", "detected").body, /largest bounding-box area/);
  assert.match(warehouseStepDetail("region", "fallback").body, /whole RGB image/);
  assert.match(warehouseStepDetail("ranking", "detected").body, /selected crop/);
  assert.match(warehouseStepDetail("ranking", "fallback").body, /full image/);
  for (const branch of ["detected", "fallback"]) {
    for (const step of ["input", "detector", "region", "ranking"]) {
      const detail = warehouseStepDetail(step, branch);
      assert.ok(detail.title && detail.body && detail.source);
      assert.doesNotMatch(detail.body, /\d+(?:\.\d+)?%|confidence:\s*\d/i);
    }
  }
});

test("warehouse explanation is server-rendered without the excluded historical chart", async () => {
  const html = await renderCase("pytorch-cnn-gpu");
  assert.match(html, /Explanatory model of inspected source/);
  assert.match(html, /largest detected region/);
  assert.match(html, /whole-image fallback/);
  assert.match(html, /do not run inference or display a recorded prediction/);
  assert.match(html, /unseen-data performance remains unestablished/);
  assert.match(html, /aria-pressed="true"[^>]*>.*?1\. Input/s);
  assert.match(html, /aria-controls="warehouse-step-detail"/);
  assert.match(html, /role="status"/);
  assert.match(html, />Detected regions: largest crop<\/button>/);
  assert.match(html, />No detected regions: full image<\/button>/);
  assert.doesNotMatch(html, /warehouse-yolo-summary\.png|View full-size chart/);
  const figures = [...html.matchAll(/<figure\b[^>]*>([\s\S]*?)<\/figure>/g)];
  assert.equal(figures.length, 0, "no excluded chart or fabricated replacement images");
});
