import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { loadSource } from "./load-source.mjs";

const email = "Cameron250taylor@outlook.com";

test("Contact provides Copy email and the approved résumé without draft-review copy", () => {
  const html = renderToStaticMarkup(loadSource("src/app/contact/page.tsx").default());
  assert.match(html, /<button\b[^>]*aria-label="Copy email address"[^>]*>Copy email<\/button>/);
  assert.match(html, /role="status"/);
  assert.match(html, /aria-live="polite"/);
  assert.ok(html.includes(`mailto:${email}?subject=Software%20engineering%20opportunity`));
  assert.ok(html.includes(`${email} ↗`));
  assert.doesNotMatch(html, /Local review copy|remains a draft|pending final factual/);
  assert.match(html, /download="Cameron-Basham-General-Software-Resume.pdf"/);
});

const writeEmail = (...args) => loadSource("src/components/CopyEmailButton.tsx").writeEmailToClipboard(...args);

test("copy writes the exact public address once and succeeds after the writer resolves", async () => {
  const writes = [];
  const result = await writeEmail(email, { writeText: async value => { writes.push(value); } });
  assert.equal(result, "copied");
  assert.deepEqual(writes, [email]);
});

test("copy does not report success while the clipboard promise is pending", async () => {
  let release;
  let settled = false;
  const promise = writeEmail(email, { writeText: () => new Promise(resolve => { release = resolve; }) })
    .then(value => { settled = true; return value; });
  await Promise.resolve();
  assert.equal(settled, false);
  release();
  assert.equal(await promise, "copied");
});

test("clipboard rejection returns an error rather than claiming a copy", async () => {
  assert.equal(await writeEmail(email, { writeText: async () => { throw new Error("test permission rejection"); } }), "error");
});

test("missing clipboard support is reported as unavailable", async () => {
  assert.equal(await writeEmail(email, undefined), "unavailable");
  assert.equal(await writeEmail(email, {}), "unavailable");
});
