import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { loadSource } from "./load-source.mjs";

const render = async () => renderToStaticMarkup(await loadSource("src/app/projects/[slug]/page.tsx").default({ params: Promise.resolve({ slug: "carla-observability-toolkit" }) }));

test("CARLA replaces its stacked gallery with named release views and original inspection", async () => {
  const html = await render();
  assert.match(html, /Application screenshots from v1\.0\.0/);
  assert.match(html, /aria-label="Application screenshot views"/);
  for (const label of ["Run Explorer", "Comparison Summary", "Telemetry Comparison"]) assert.match(html, new RegExp(`>${label}</button>`));
  assert.match(html, /What to notice/);
  assert.match(html, /View original screenshot/);
  assert.doesNotMatch(html, /View full-size screenshot|Recorded screenshot steps|Step 1 of/);
});

test("CARLA explains an independent artifact-validation branch, not a dashboard gate", async () => {
  const html = await render();
  assert.match(html, /data-source="saved-artifacts"/);
  assert.match(html, /Separate branch from saved files/);
  assert.match(html, /Validate saved artifacts/);
  assert.match(html, /not a prerequisite for dashboard analysis/);
  for (const file of ["metadata.json", "metrics.csv", "events.json"]) assert.ok(html.includes(file));
  assert.ok(html.indexOf('id="carla-pipeline-title"') < html.indexOf('id="carla-gallery-title"'));
  assert.match(html, /first valid telemetry timestamp/);
});
