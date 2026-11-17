import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import vm from "node:vm";
import { renderToStaticMarkup } from "react-dom/server";
import { loadSource } from "./load-source.mjs";
import ts from "typescript";

test("About gives concrete solo Unity ownership and includes music and drumming", () => {
  const html = renderToStaticMarkup(loadSource("src/app/about/page.tsx").default());
  const unity = html.match(/<div id="unity-work">[\s\S]*?<\/div>/)?.[0];
  const interests = html.match(/<section\b[^>]*id="interests"[\s\S]*?<\/section>/)?.[0];
  assert.ok(unity && interests, "existing About sections render");
  assert.match(unity, /Solo Unity game developer/);
  assert.match(unity, /taking it from gameplay design through implementation and hands-on playtesting/);
  assert.match(unity, /I set the development priorities and refine the experience as I build/);
  assert.match(unity, /development priorities/);
  assert.match(unity, /hands-on playtesting/);
  assert.match(interests, /Music, games, and the outdoors/);
  assert.match(interests, /Music is a big part of my life, and I play drums/);
  for (const interest of ["tactical", "hiking", "yard", "water", "dogs"]) assert.ok(interests.includes(interest));
  assert.doesNotMatch(interests, /Games are a big part of my downtime/);
});

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
// Execute the actual project data without requiring a Next build or live preview.
const compiled = ts.transpileModule(read("src/data/projects.ts"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
const data = { exports: {} };
vm.runInNewContext(compiled, { exports: data.exports, require: createRequire(import.meta.url) });
const projects = data.exports.projects;
const project = (slug) => projects.find((entry) => entry.slug === slug);

test("car rental keeps its legacy URL and includes the confirmed wider AWS project scope", () => {
  const rental = project("car-rental-microservices");
  assert.equal(rental.title, "Car Rental Backend & AWS Infrastructure");
  assert.match(rental.summary, /REST endpoints/);
  assert.match(rental.summary, /validation/);
  assert.match(rental.summary, /persistence/);
  assert.match(JSON.stringify(rental), /vehicle-to-user associations/);
  assert.equal(rental.links.github, "https://github.com/Dumpy250/car-rental-service/tree/05c977857c41073a505584839d8e8028a05145e2");
  const visibleRental = Object.fromEntries(
    Object.entries(rental).filter(([key]) => !["slug", "image"].includes(key)),
  );
  for (const name of ["EC2", "VPC", "RDS", "Cognito"]) assert.match(JSON.stringify(visibleRental), new RegExp(name));
  assert.doesNotMatch(JSON.stringify(visibleRental), /\b(?:OAuth2|JWT|Docker)\b|3 domain services|three.service|microservice/i);
  assert.match(rental.caseStudy.result, /Register vehicles, associate them with users, and return them to available status/);
  assert.equal(rental.caseStudy.resultCaption, "Verified in a local demonstration with fictional data");
  const image = read(`public${rental.image}`);
  assert.match(image, /Car Rental Vehicle Service/);
  assert.doesNotMatch(image, /Cognito|AWS|Docker|Microservices/i);
});

test("unresolved AWS migration is absent from catalog data and served assets, with a non-claiming legacy route", () => {
  assert.equal(project("aws-vpc-rds-migration"), undefined);
  assert.doesNotMatch(read("src/app/projects/page.tsx"), /aws-vpc-rds-migration/);
  assert.equal(existsSync(new URL("../public/projects/aws-vpc-rds-migration.svg", import.meta.url)), false);
  const route = read("src/app/projects/[slug]/page.tsx");
  assert.match(route, /aws-vpc-rds-migration/);
  assert.match(route, /supporting evidence has not been resolved/);
  assert.match(route, /index: false/);
  assert.doesNotMatch(read("src/data/projects.ts"), /Designed VPC|Migrated schema|migration success|Local DB stack migrated/);
});

test("case-study tops summarize role and result without changing CARLA validation or team attribution", () => {
  for (const entry of projects) {
    assert.ok(entry.caseStudy.role, `${entry.slug}: role`);
    assert.ok(entry.caseStudy.result, `${entry.slug}: result`);
  }
  const internship = project("equipment-reservation-tool").caseStudy;
  assert.match(internship.result, /student import adds valid records, reports invalid emails and skips existing student IDs on reimport/);
  assert.doesNotMatch(internship.result, /department did not continue/);
  assert.match(JSON.stringify(internship), /Reservation logic was mainly written by a colleague/);
  assert.doesNotMatch(JSON.stringify(internship), /sevella|deployed|adopted|production use/i);
  assert.doesNotMatch(internship.learnings.join(" "), /case study|personally worked|portfolio/i);
  assert.match(internship.learnings.join(" "), /Partial imports need feedback that distinguishes invalid rows from existing records/);
  const vision = project("pytorch-cnn-gpu");
  assert.ok(vision.tech.includes("PyTorch with CUDA acceleration"));
  assert.ok(!vision.tech.includes("CUDA"));
  assert.match(vision.caseStudy.result, /unseen-data performance/i);
  const carla = project("carla-observability-toolkit").caseStudy;
  assert.equal(carla.metrics.find((m) => m.label === "Recorded validation").value,
    "The May 8 test plan reports 5 pytest tests passed, 3 of 3 recent runs validated, and a successful frontend build.");
  assert.equal(carla.metrics.find((m) => m.label === "Verification scope").value,
    "The test plan includes code-inspected behavior and blocked live checks; its 30 listed cases are not 30 automated integration tests.");
  assert.equal(carla.walkthrough, "carla-views");
  assert.equal(carla.screenshots, undefined, "stacked generic gallery replaced by recorded named views");
  assert.equal(project("carla-observability-toolkit").links.github, "https://github.com/Dumpy250/carla-observability-toolkit/tree/v1.0.0");
  assert.match(carla.highlights.join(" "), /side-by-side summaries, and overlaid speed and control-input traces/);
  const route = read("src/app/projects/[slug]/page.tsx");
  assert.match(route, /<dt>My role<\/dt>/);
  assert.match(route, /<dt>Result<\/dt>/);
  assert.ok(route.indexOf("<dt>My role</dt>") < route.indexOf("<article "));
  assert.match(route, /study\.screenshots\.map/);
  assert.match(route, /View full-size screenshot/);
  assert.match(read("src/app/about/page.tsx"), /Expected graduation: December 2026/);
  assert.doesNotMatch(read("src/app/about/page.tsx"), /department did not continue/);
});

// These source-content contracts complement HTTP tests; they do not certify rendering.
test("public copy uses the confirmed LinkedIn, specific hierarchy, and collaborative FS25 scope", () => {
  const home = read("src/app/page.tsx");
  const about = read("src/app/about/page.tsx");
  const catalog = read("src/app/projects/page.tsx");
  const contact = read("src/app/contact/page.tsx");
  assert.match(contact, /href="https:\/\/www\.linkedin\.com\/in\/cameron-basham"/);
  assert.doesNotMatch(home + about + catalog, /paid (development )?internship|final class|linear algebra/i);
  assert.doesNotMatch(home, /Built with|Same curiosity|More than|Not the other way around/);
  assert.match(home, /Software &/);
  assert.match(about, /https:\/\/github\.com\/Saber-Studios/);
  assert.match(about, /Collaborated with a friend/);
  assert.match(about, /Farming Simulator 25 vehicle pack/);
  assert.match(about, /dashboard tweaks/);
  assert.match(about, /FS25 editor/);
  assert.match(about, /in-game radio/);
  assert.doesNotMatch(about, /azurecast|azuracast/i);
  assert.equal((about.match(/U\.S\. Army/g) || []).length, 1);
  assert.match(about, /Volunteer mod development/);
  for (const category of ["Games & modding", "Languages", "Web & backend", "Data, cloud & validation"]) {
    assert.ok(home.includes(`title: "${category}"`), category);
  }
  assert.match(home, /AWS · Docker/);
  assert.match(home, /PyTorch with CUDA acceleration/);
});
