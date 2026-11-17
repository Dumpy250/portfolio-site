import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { loadSource } from "./load-source.mjs";
import { existsSync } from "node:fs";
const render = async () => renderToStaticMarkup(await loadSource("src/app/projects/[slug]/page.tsx").default({ params: Promise.resolve({ slug: "pytorch-cnn-gpu" }) }));

test("the actual diagram model and component preserve all stage/branch combinations", () => {
  const { default: Pipeline } = loadSource("src/components/WarehousePipeline.tsx");
  const { warehouseDiagramState, illustrativeWarehouseRegions } = loadSource("src/lib/warehouse-walkthrough.ts");
  assert.equal(illustrativeWarehouseRegions.length, 3);
  const largest = Array.from(illustrativeWarehouseRegions).sort((a, b) => b.width*b.height-a.width*a.height)[0];
  for (const branch of ["detected", "fallback"]) {
    for (const step of ["input", "detector", "region", "ranking"]) {
      const state = warehouseDiagramState(step, branch);
      const selecting = step === "region" || step === "ranking";
      assert.equal(state.regions.length, branch === "detected" && step !== "input" ? 3 : 0);
      assert.equal(state.selectedId, branch === "detected" && selecting ? largest.id : null);
      assert.equal(state.fullImageSelected, branch === "fallback" && selecting);
      assert.equal(state.inputLabel, branch === "detected" ? "Largest crop" : "Whole image");
      const html = renderToStaticMarkup(createElement(Pipeline, { initialStep: step, initialBranch: branch }));
      assert.equal((html.match(/class="warehouse-candidate"/g)||[]).length, state.regions.length);
      assert.equal((html.match(/class="warehouse-candidate"[^>]*data-selected="true"/g)||[]).length, state.selectedId ? 1 : 0);
      assert.match(html, new RegExp(`data-stage="${step}" data-branch="${branch}"`));
      assert.match(html, /Schematic only/);
      assert.match(html, /Up to five; no predictions shown/);
      assert.doesNotMatch(html, /\d+(?:\.\d+)?%|confidence:\s*\d|Prediction:\s*\w/i);
    }
  }
});


test("Warehouse explains region selection visually without fabricating a prediction", async () => {
  const html = await render();
  assert.match(html, /aria-label="Explanatory detector-to-classifier schematic"/);
  assert.match(html, /<svg/);
  assert.match(html, /Schematic only — no inference or recorded prediction/);
  assert.match(html, /Custom CNN/);
  assert.match(html, /Ranked categories/);
  assert.doesNotMatch(html, /confidence:\s*\d|Prediction:\s*\w/i);
});

test("Warehouse preserves the contribution and schematic without publishing the excluded chart", async () => {
  const html = await render();
  assert.match(html, /My contribution to this team project combined a pretrained object detector with a custom classifier/);
  assert.doesNotMatch(html, /Saved evaluation output|warehouse-yolo-summary\.png|View full-size chart/);
  const { projects } = loadSource("src/data/projects.ts");
  const warehouse = projects.find(project => project.slug === "pytorch-cnn-gpu");
  assert.equal(warehouse.caseStudy.screenshots?.length ?? 0, 0);
  assert.equal(existsSync(new URL("../public/projects/warehouse-yolo-summary.png", import.meta.url)), false, "excluded image must not remain directly publishable");
  assert.match(html, /case-study--warehouse/);
  assert.doesNotMatch(html, /class="source-overview"/);
  assert.match(html, /Selecting one largest region keeps the pipeline simple/);
  assert.match(html, /Added CPU fallback and Top-1\/Top-5 evaluation reporting/);
  assert.match(html, /rather than explicitly selecting an independent held-out test set/);
  assert.match(html, /unseen-data performance remains unestablished/);
});

test("Warehouse explains the shared problem before Cam's own contribution without importing his friend's work", async () => {
  const html = await render();
  assert.match(html, /<h2>The problem<\/h2>/);
  assert.match(html, /The project explored using image recognition to identify unfamiliar warehouse tools and materials/);
  assert.match(html, /The motivation was to help people recognize potentially useful items rather than discard them/);
  assert.ok(html.indexOf("The problem") < html.indexOf("My contribution: image to ranked categories"));
  assert.match(html, /YOLO_test detection\/classification prototype/);
  assert.match(html, /custom classifier to produce ranked item categories/);
  assert.doesNotMatch(html, /TensorFlow|MobileNet|88\.57%|96\.30%|million products|reduced waste by/i);
});
