import test from "node:test";
import assert from "node:assert/strict";
import { loadSource } from "./load-source.mjs";

const { default: config } = loadSource("next.config.ts");
const disposition = 'inline; filename="Cameron-Basham-General-Software-Resume.pdf"';

test("resume response supplies its descriptive filename while allowing inline viewing", async () => {
  const rules = config.headers ? await config.headers() : [];
  const resume = rules.find((rule) => rule.source === "/resume.pdf");
  const header = resume?.headers.find((item) => item.key.toLowerCase() === "content-disposition");
  assert.equal(header?.value, disposition);
});

test("download naming changes apply only to the resume response", async () => {
  const rules = config.headers ? await config.headers() : [];
  const named = rules.filter((rule) => rule.headers.some((item) => item.key.toLowerCase() === "content-disposition"));
  assert.equal(named.length, 1);
  assert.equal(named[0].source, "/resume.pdf");
});
