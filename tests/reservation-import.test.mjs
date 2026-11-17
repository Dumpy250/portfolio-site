import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { loadSource } from "./load-source.mjs";

const renderCase = async () => renderToStaticMarkup(
  await loadSource("src/app/projects/[slug]/page.tsx").default({
    params: Promise.resolve({ slug: "equipment-reservation-tool" }),
  }),
);

test("reservation case exposes a genuine static overview and complete workflow before clicks", async () => {
  const html = await renderCase();
  assert.match(html, /Local demonstration with fictional data/);
  assert.match(html, /src="\/projects\/reservation-capture\/originals\/inventory-top.png"/);
  for (const summary of [
    "partial student import",
    "skips existing student IDs on reimport",
  ]) assert.ok(html.includes(summary), summary);
  const text = html.replace(/<[^>]+>/g, "");
  assert.match(text, /taylor.sample-at-example.invalid/);
  assert.match(text, /taylor.sample@example.invalid/);
  assert.match(html, /Only one CSV field changed/);
  assert.match(html, /Source code is private/);
  assert.match(html, /href="\/projects\/reservation-capture\/originals\/native-03-partial-import-record.png"[^>]*>View supporting full screenshot/);
  assert.match(html, /Reservation logic was mainly written by a colleague/);
  assert.match(html, /project-board tracking, QA/);
  assert.doesNotMatch(html, /confirmation modal|private-config|33308|reservation_capture|HANDOFF.md/);
});

test("recorded walkthrough starts at the CSV control with manual navigation and one original-image action", async () => {
  const html = await renderCase();
  assert.match(html, /aria-label="Recorded screenshot steps"/);
  assert.match(html, /aria-current="step"[^>]*>1\. Choose the CSV<\/button>/);
  assert.match(html, /<button[^>]*disabled=""[^>]*>Previous<\/button>/);
  assert.match(html, /<button[^>]*>Next<\/button>/);
  assert.match(html, />View full screenshot<\/button>/);
  assert.doesNotMatch(html, /Open detail crop/);
  assert.match(html, /<dialog[^>]*aria-labelledby="reservation-full-title"/);
  assert.match(html, /Original capture at actual size/);
  assert.match(html, /Scroll horizontally and vertically/);
  assert.match(html, /Close full screenshot/);
  assert.doesNotMatch(html, /autoplay|aria-roledescription="carousel"/i);
});

test("reservation interaction follows the overview before CSV and supporting explanation", async () => {
  const html = await renderCase();
  const overview = html.indexOf('class="case-image reservation-overview"');
  const interaction = html.indexOf('aria-label="Recorded screenshot steps"');
  const csv = html.indexOf('class="reservation-csv-change"');
  const supporting = html.indexOf("Supporting capture: the first imported record");
  assert.ok(overview >= 0 && overview < interaction && interaction < csv && csv < supporting,
    "Expected overview → interactive steps → CSV comparison → supporting capture");
  assert.doesNotMatch(html, /<ol[^>]*aria-label="Recorded CSV import workflow"/);
});

test("shared reservation step data preserves capture order and bounded transitions", () => {
  const { reservationSteps, moveReservationStep, getReservationStep } = loadSource("src/lib/reservation-import.ts");
  assert.deepEqual(Array.from(reservationSteps, (s) => s.id), [1, 2, 4, 5]);
  assert.deepEqual(Array.from(reservationSteps, (s) => s.label), ["Choose the CSV", "Read validation feedback", "Correct and reimport", "Inspect the result"]);
  assert.equal(moveReservationStep(1, "previous"), 1);
  assert.equal(moveReservationStep(1, "next"), 2);
  assert.equal(moveReservationStep(2, "next"), 4);
  assert.equal(moveReservationStep(4, "previous"), 2);
  assert.equal(moveReservationStep(4, "next"), 5);
  assert.equal(moveReservationStep(5, "next"), 5);
  assert.equal(moveReservationStep(5, "previous"), 4);
  assert.equal(getReservationStep(1).original, "/projects/reservation-capture/originals/native-01-import-control.png");
  assert.equal(getReservationStep(2).height, 299);
  assert.equal(getReservationStep(4).width, 462);
  assert.equal(getReservationStep(5).crop, "/projects/reservation-capture/derived/05-final-records.png");
});

test("each rendered step uses its own real original, labeled crop, and current-step semantics", () => {
  const { reservationSteps } = loadSource("src/lib/reservation-import.ts");
  const View = loadSource("src/components/ReservationImport.tsx").default;
  for (const step of reservationSteps) {
    const html = renderToStaticMarkup(createElement(View, { initialStep: step.id }));
    assert.match(html, new RegExp(`aria-current="step"[^>]*>${step.id === 4 ? 3 : step.id === 5 ? 4 : step.id}\\. ${step.label}</button>`));
    assert.ok(html.includes(step.caption));
    assert.ok(html.includes(`src="${step.original}"`));
    assert.ok(html.includes(`src="${step.crop}"`));
    assert.ok(html.includes(`href="${step.original}"`));
    assert.match(html, /Detail crop/);
    assert.match(html, /Local demonstration with fictional data/);
    assert.match(html, /width="1456" height="986"/);
    assert.equal((html.match(/aria-current="step"/g) || []).length, 1);
    assert.equal(/<button[^>]*disabled=""[^>]*>Previous<\/button>/.test(html), step.id === 1);
    assert.equal(/<button[^>]*disabled=""[^>]*>Next<\/button>/.test(html), step.id === 5);
    if ([2, 4].includes(step.id)) {
      assert.match(html, /preceding table state/);
      assert.doesNotMatch(html, /src="[^"]*05-final-records/);
    }
    assert.doesNotMatch(html, /native-03|03-partial/);
  }
});

test("parent-provided original and crop assets exist at the actual data paths with declared PNG dimensions", () => {
  const { reservationSteps } = loadSource("src/lib/reservation-import.ts");
  for (const step of reservationSteps) {
    for (const [src, width, height] of [[step.original, 1456, 986], [step.crop, step.width, step.height]]) {
      const png = readFileSync(new URL(`../public${src}`, import.meta.url));
      assert.equal(png.subarray(0, 8).toString("hex"), "89504e470d0a1a0a", src);
      assert.equal(png.readUInt32BE(16), width, src);
      assert.equal(png.readUInt32BE(20), height, src);
    }
  }
});

test("downloaded fictional CSV fixtures differ only in the displayed email field", () => {
  const { reservationCsvFiles, reservationEmailChange } = loadSource("src/lib/reservation-import.ts");
  // These supplied fixtures contain no quoted fields; this is not an application CSV parser.
  const rows = (src) => readFileSync(new URL(`../public${src}`, import.meta.url), "utf8").trim().split(/\r?\n/).map((row) => row.split(","));
  const before = rows(reservationCsvFiles.before);
  const after = rows(reservationCsvFiles.corrected);
  assert.equal(before.length, 3);
  assert.equal(after.length, before.length);
  assert.deepEqual(after[0], before[0]);
  const changes = [];
  before.forEach((row, rowIndex) => row.forEach((value, fieldIndex) => {
    assert.equal(after[rowIndex].length, row.length);
    if (value !== after[rowIndex][fieldIndex]) changes.push({
      studentId: row[0], field: before[0][fieldIndex], before: value, after: after[rowIndex][fieldIndex],
    });
  }));
  assert.deepEqual(changes, [{ studentId: reservationEmailChange.studentId, field: "email", before: reservationEmailChange.before, after: reservationEmailChange.after }]);
  for (const row of after.slice(1)) assert.match(row[3], /@example\.invalid$/);
});
