import test from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { loadSource } from "./load-source.mjs";
import { readFileSync } from "node:fs";

const { default: CaseStudy } = loadSource("src/app/projects/[slug]/page.tsx");

test("Job Posting route presents a genuine fictional-data employer-to-job walkthrough", async () => {
  const html = renderToStaticMarkup(await CaseStudy({ params: Promise.resolve({ slug: "job-posting-mvc" }) }));
  assert.match(html, /Local demonstration with fictional data/);
  assert.match(html, /From employer to saved jobs/);
  assert.match(html, /05-jobs-list\.png/);
  assert.match(html, /01-create-employer\.png/);
  assert.match(html, /Enter a fictional employer/);
  assert.match(html, /filled form before submission/);
  assert.match(html, /Application walkthrough/);
  assert.match(html, /Explore the employer and job-management workflow through screenshots of this working ASP.NET Core MVC project/);
  assert.doesNotMatch(html, /Screenshots, not a live application|Applicants are separate records|Applicants \(separate\)/);
  assert.match(html, /join entity models a many-to-many relationship in the schema/);
  assert.match(html, /does not implement an Apply-to-Job workflow/);
  assert.match(html, /View original screenshot/);
  assert.match(html, /Previous step/);
  assert.match(html, /Next step/);
  assert.doesNotMatch(html, /04-saved-job-association|Application submitted successfully|Apply now/i);
});

test("Job Posting card has the qualified Jobs-list cover linking to its case study", () => {
  const { projects } = loadSource("src/data/projects.ts");
  const { default: ProjectCard } = loadSource("src/components/ProjectCard.tsx");
  const project = projects.find((item) => item.slug === "job-posting-mvc");
  const html = renderToStaticMarkup(createElement(ProjectCard, { p: project }));
  const image = html.match(/<img\b[^>]*>/)?.[0];
  assert.ok(image, "Jobs-list cover must render through the existing card");
  const encoded = image.match(/src="([^"]+)"/)[1].replace(/&amp;/g, "&");
  const url = new URL(encoded, "http://localhost");
  assert.equal(url.searchParams.get("url") ?? url.pathname, "/projects/job-posting-capture/details/05-jobs-list.png");
  assert.match(image, /width="1440"/);
  assert.match(image, /height="410"/);
  assert.match(html, /Local demonstration with fictional data/);
  assert.match(html, /href="\/projects\/job-posting-mvc"/);
});

test("capture metadata matches real PNG dimensions, with only frames 1,3,5 in the main sequence", () => {
  const { jobFrames, jobMainFrames } = loadSource("src/lib/job-posting-captures.ts");
  assert.deepEqual(Array.from(jobMainFrames, (frame) => frame.id), ["01-create-employer", "03-create-job", "05-jobs-list"]);
  for (const frame of Object.values(jobFrames)) {
    for (const [kind, expected] of [["details", [frame.width, frame.height]], ["originals", [1440, 1000]]]) {
      const bytes = readFileSync(new URL(`../public/projects/job-posting-capture/${kind}/${frame.id}.png`, import.meta.url));
      assert.equal(bytes.subarray(1, 4).toString(), "PNG");
      assert.deepEqual([bytes.readUInt32BE(16), bytes.readUInt32BE(20)], expected, frame.id);
    }
  }
});

for (const [view, step, expectedId] of [
  ["walkthrough", 0, "01-create-employer"],
  ["walkthrough", 1, "03-create-job"],
  ["walkthrough", 2, "05-jobs-list"],
  ["employers", 0, "02-employers-saved"],
  ["applicants", 0, "06-applicants-list"],
]) {
  test(`${view}/${step} renders the selected capture, qualification and correct original`, () => {
    const { default: Walkthrough } = loadSource("src/components/JobPostingWalkthrough.tsx");
    const html = renderToStaticMarkup(createElement(Walkthrough, { initialView: view, initialStep: step }));
    const selected = html.match(/class="job-selected-capture"[\s\S]*?<\/figure>/)[0];
    assert.match(selected, new RegExp(`details/${expectedId}\\.png`));
    assert.match(selected, /Local demonstration with fictional data/);
    if (view === "applicants") {
      assert.match(selected, /<h3>Manage applicant records<\/h3>/);
      assert.doesNotMatch(selected, /does not demonstrate|no applicant-job links|not evidence of|separate from the job walkthrough/);
    }
    assert.match(html, new RegExp(`originals/${expectedId}\\.png`));
    assert.match(html, /class="job-capture-scroll" tabindex="0" role="region"/);
    const dialog = html.match(/<dialog[\s\S]*?<\/dialog>/)[0];
    assert.doesNotMatch(dialog.match(/^<dialog[^>]*>/)[0], /\bopen=/);
    assert.match(dialog, /aria-labelledby="[^"]+" aria-describedby="[^"]+"/);
    assert.match(dialog, /width="1440" height="1000"/);
    assert.match(dialog, /Close original screenshot/);
    assert.match(dialog, /Open original image in a new tab/);
    if (view === "walkthrough") {
      const previous = html.match(/<button[^>]*>Previous step<\/button>/)[0];
      const next = html.match(/<button[^>]*>Next step<\/button>/)[0];
      assert.equal(previous.includes('disabled=""'), step === 0);
      assert.equal(next.includes('disabled=""'), step === 2);
      assert.equal((html.match(/aria-pressed="true"/g) ?? []).length, 2);
    } else {
      assert.doesNotMatch(html, /Previous step|Next step|Step \d of/);
      assert.equal((html.match(/aria-pressed="true"/g) ?? []).length, 1);
    }
  });
}
