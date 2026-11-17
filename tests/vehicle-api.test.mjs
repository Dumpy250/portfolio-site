import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { loadSource } from "./load-source.mjs";
import { createElement } from "react";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";

const { default: CaseStudy } = loadSource("src/app/projects/[slug]/page.tsx");
test("vehicle route presents recorded request, response and separate saved-state evidence", async () => {
  const html = renderToStaticMarkup(await CaseStudy({ params: Promise.resolve({ slug: "car-rental-microservices" }) }));
  assert.match(html, /Recorded API workflow/);
  assert.match(html, /Local demonstration with fictional data/);
  assert.match(html, /Vehicle registered and available/);
  for (const label of ["Request", "Response", "Saved state"]) assert.match(html, new RegExp(`<h4[^>]*>${label}</h4>`));
  assert.match(html, /Subsequent GET/);
  assert.match(html, /DEMO-001/);
  assert.doesNotMatch(html, /Associate \(illustration\)|symbolic time|runtime behavior was not re-tested/);
});

const unescape = (text) => text.replace(/<[^>]*>/g, "").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const { vehicleRecording, vehicleSteps, formattedBody, recordedPath } = loadSource("src/lib/vehicle-api-recording.ts");
const { default: Viewer } = loadSource("src/components/VehicleApiWalkthrough.tsx");

test("original fictional HTTP export is byte-identical and the viewer uses those same 14 records", () => {
  const bytes = readFileSync(new URL("../public/projects/vehicle-service-recording/requests.json", import.meta.url));
  assert.equal(createHash("sha256").update(bytes).digest("hex"), "31a913922651553dc0013af3de4882c758dd6847d68dd476b366cafe4cf088a2");
  assert.equal(vehicleRecording.length, 14);
  assert.equal(JSON.stringify(vehicleRecording), JSON.stringify(JSON.parse(bytes)));
  assert.equal(formattedBody(""), "");
});
for (const [id, expectedStatus, state] of [["create", 200, "AVAILABLE"], ["associate", 201, "ASSOCIATED"], ["release", 200, "AVAILABLE"]]) {
  test(`${id}: actual response stays distinct from the subsequent saved GET`, () => {
    const view = vehicleSteps.find((item) => item.id === id);
    const html = renderToStaticMarkup(createElement(Viewer, { initialStep: id }));
    const actionPanel = html.match(new RegExp(`<section[^>]*data-action-response="${id}"[\\s\\S]*?</section>`))[0];
    const savedPanel = html.match(new RegExp(`<section[^>]*data-saved-state="${id}"[\\s\\S]*?</section>`))[0];
    const code = savedPanel.match(/<pre[^>]*aria-label="[^"]*saved-state JSON"[^>]*>([\s\S]*?)<\/pre>/)[1];
    assert.equal(view.action.response.status, expectedStatus);
    assert.match(actionPanel, new RegExp(`HTTP ${expectedStatus}`));
    assert.match(savedPanel, /Subsequent GET · HTTP 200/);
    assert.deepEqual(JSON.parse(unescape(code)), JSON.parse(view.saved.response.body));
    const saved = JSON.parse(view.saved.response.body);
    assert.equal(saved.status, state);
    assert.equal(saved.id, "1a7f0fc1-76b9-42be-9177-48ab933dcf03");
    assert.equal((html.match(/aria-pressed="true"/g) ?? []).length, 1);
    if (id !== "create") {
      assert.equal(view.action.response.body, "");
      assert.match(actionPanel, /Empty response body/);
      assert.doesNotMatch(actionPanel, /demo-user-001|association_date/);
    }
    if (id === "release") {
      assert.ok(!Object.hasOwn(saved, "owner"));
      assert.ok(!Object.hasOwn(saved, "association_date"));
      assert.doesNotMatch(unescape(code), /"owner"|"association_date"/);
    }
    assert.ok(recordedPath(view.action).startsWith("/vehicles"));
    const raw = html.match(/<details class="vehicle-api-original"[\s\S]*?<\/details>/)[0];
    assert.doesNotMatch(raw.match(/^<details[^>]*>/)[0], /\bopen=/);
    assert.match(raw, /original action record/);
    assert.match(html, /href="\/projects\/vehicle-service-recording\/requests.json"/);
  });
}

test("optional guards expose real rejected requests without an authentication claim", async () => {
  const html = renderToStaticMarkup(await CaseStudy({ params: Promise.resolve({ slug: "car-rental-microservices" }) }));
  assert.match(html, /<summary>Validation and state guards<\/summary>/);
  for (const label of ["Blank licence", "Repeated association", "Wrong-owner release"]) assert.match(html, new RegExp(label));
  assert.match(html, /database remained empty/);
  assert.match(html, /not authenticated authorization/);
});

test("vehicle discovery card has a qualified explanatory workflow cover", () => {
  const { projects } = loadSource("src/data/projects.ts");
  const { default: ProjectCard } = loadSource("src/components/ProjectCard.tsx");
  const p = projects.find((entry) => entry.slug === "car-rental-microservices");
  const html = renderToStaticMarkup(createElement(ProjectCard, { p }));
  assert.ok(html.match(/<img\b[^>]*>/), "vehicle card should display its new cover");
  assert.match(html, /vehicle-service-workflow\.svg/);
  assert.match(html, /Recorded API workflow/);
  assert.match(html, /explanatory diagram/);
  const svg = readFileSync(new URL("../public/projects/vehicle-service-workflow.svg", import.meta.url), "utf8");
  assert.match(svg, /viewBox="0 0 1200 440"/);
  assert.match(svg, /AVAILABLE/);
  assert.match(svg, /ASSOCIATED/);
  assert.doesNotMatch(svg, /AWS|screenshot|<image|(?:href|src)=/i);
});
