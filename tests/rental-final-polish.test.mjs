import test from "node:test";
import assert from "node:assert/strict";
import { loadSource } from "./load-source.mjs";
import { renderToStaticMarkup } from "react-dom/server";

const rental = async () => renderToStaticMarkup(await loadSource("src/app/projects/[slug]/page.tsx").default({ params: Promise.resolve({ slug: "equipment-reservation-tool" }) }));
const text = (html) => html.replace(/<[^>]+>/g, "");

test("approved rental flow uses Inventory once before the contribution walkthrough", async () => {
  const html = await rental();
  const inventory = html.indexOf('src="/projects/reservation-capture/originals/inventory-top.png"');
  const contribution = html.indexOf("My contribution: CSV imports");
  const controls = html.indexOf('aria-label="Recorded screenshot steps"');
  const behavior = html.indexOf("Partial-import behavior");
  const sourceNote = html.indexOf("Source code is private; demonstrations use fictional data.");
  assert.ok(inventory >= 0 && inventory < contribution && contribution < controls && controls < behavior && behavior < sourceNote);
  assert.equal((html.match(/src="\/projects\/reservation-capture\/originals\/inventory-top.png"/g) || []).length, 1);
  assert.doesNotMatch(html, /src="\/projects\/reservation-capture\/derived\/05-final-records.png"/);
  assert.match(html, /Reservation logic was mainly written by a colleague/);
  assert.doesNotMatch(html, /Outcome &amp; boundaries|capture [1245](?:<|\.|\s)|Open detail crop/);
});

test("email annotations preserve both complete strings and highlight only the changed token", async () => {
  const html = await rental();
  const comparison = html.slice(html.indexOf('class="reservation-csv-change"'), html.indexOf("Supporting capture:"));
  const codes = [...comparison.matchAll(/<dd><code>([\s\S]*?)<\/code><\/dd>/g)].map((m) => m[1]);
  assert.deepEqual(codes.map(text), ["taylor.sample-at-example.invalid", "taylor.sample@example.invalid"]);
  assert.deepEqual(codes.map((s) => s.match(/<mark>(.*?)<\/mark>/)?.[1]), ["-at-", "@"]);
  assert.match(comparison, /Before/);
  assert.match(comparison, /After/);
});

test("rental copy explains partial imports and confines duplicate claims to existing student IDs", async () => {
  const html = await rental();
  assert.match(html, /submits valid records individually to the Spring Boot API/);
  assert.match(html, /skips existing student IDs on reimport/);
  assert.match(html, /Partial imports need feedback that distinguishes invalid rows from existing records/);
  assert.doesNotMatch(html, /all duplicates|concurrent imports|department did not continue/);
  assert.match(html, /Ferris State University/);
});
