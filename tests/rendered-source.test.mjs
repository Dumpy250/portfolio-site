import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { loadSource } from "./load-source.mjs";
const render = async (path, slug) => renderToStaticMarkup(
  await loadSource(path).default({ params: Promise.resolve({ slug }) }),
);

test("current source renders confirmed About/contact facts and the narrowed catalog", async () => {
  const about = await render("src/app/about/page.tsx");
  assert.match(about, /href="https:\/\/github.com\/Saber-Studios"/);
  assert.match(about, /Collaborated with a friend/);
  assert.match(about, /in-game radio/);
  assert.match(about, /Expected graduation: December 2026/);
  assert.doesNotMatch(about, /department did not continue/);
  assert.doesNotMatch(about, /final class|linear algebra|azurecast|azuracast/i);
  assert.equal((about.match(/U\.S\. Army/g) || []).length, 1);
  const contact = await render("src/app/contact/page.tsx");
  assert.match(contact, /href="https:\/\/www.linkedin.com\/in\/cameron-basham"/);
  assert.match(contact, /download="Cameron-Basham-General-Software-Resume.pdf"/);
  assert.doesNotMatch(contact, /Local review copy|remains a draft|pending final factual|DRAFT-v\d/);
  assert.doesNotMatch(contact, /résumé v\d|It predates|corrections now shown/);
  const catalog = await render("src/app/projects/page.tsx");
  assert.match(catalog, /Car Rental Backend &amp; AWS Infrastructure/);
  assert.doesNotMatch(catalog, /paid internship|aws-vpc-rds-migration|Car Rental Microservices/i);
  const home = await render("src/app/page.tsx");
  assert.match(home, /Software &amp;/);
  assert.match(home, /PyTorch with CUDA acceleration/);
  assert.match(home, /AWS · Docker/);
});

test("catalog follows the approved interest order and aligns its existing jump links", async () => {
  const expected = ["carla-observability-toolkit", "pytorch-cnn-gpu", "car-rental-microservices", "equipment-reservation-tool", "job-posting-mvc"];
  const html = await render("src/app/projects/page.tsx");
  const cards = [...html.matchAll(/<article\b[^>]*class="project-card"[^>]*id="([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual(cards, expected);
  const navigation = html.match(/<nav class="project-index-nav"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
  assert.ok(navigation);
  assert.deepEqual([...navigation.matchAll(/href="#([^"]+)"/g)].map(match => match[1]), expected.slice(0, 4));
});

test("current case source renders role/result, named CARLA views, and a non-claiming legacy page", async () => {
  const path = "src/app/projects/[slug]/page.tsx";
  const carla = await render(path, "carla-observability-toolkit");
  assert.match(carla, /<dt>My role<\/dt>/);
  assert.ok(carla.indexOf("<dt>Result</dt>") < carla.indexOf("Context &amp; problem"));
  assert.equal((carla.match(/<figure\b/g) || []).length, 2);
  assert.match(carla, /Application screenshots from v1\.0\.0/);
  assert.match(carla, /Comparison Summary/);
  assert.match(carla, /Telemetry Comparison/);
  assert.match(carla, /View original screenshot/);
  assert.doesNotMatch(carla, /View full-size screenshot/);
  assert.match(carla, /30 listed cases are not 30 automated integration tests/);
  const rental = await render(path, "equipment-reservation-tool");
  assert.match(rental, /student import adds valid records, reports invalid emails and skips existing student IDs on reimport/);
  assert.doesNotMatch(rental, /department did not continue/);
  assert.match(rental, /Reservation logic was mainly written by a colleague/);
  const vehicle = await render(path, "car-rental-microservices");
  assert.match(vehicle, /vehicle-to-user associations/);
  assert.match(vehicle, /Configured Amazon EC2 and VPC infrastructure/);
  assert.match(vehicle, /Amazon RDS/);
  assert.match(vehicle, /Amazon Cognito/);
  assert.doesNotMatch(vehicle, /\b(?:Docker|OAuth2|JWT)\b/);
  const archive = await render(path, "aws-vpc-rds-migration");
  assert.match(archive, /supporting evidence has not been resolved/);
  assert.doesNotMatch(archive, /Designed VPC|Migrated schema|Local DB stack migrated/);
  const meta = await loadSource(path).generateMetadata({ params: Promise.resolve({ slug: "aws-vpc-rds-migration" }) });
  assert.equal(meta.robots.index, false);
  const params = loadSource(path).generateStaticParams();
  assert.ok(params.some((entry) => entry.slug === "aws-vpc-rds-migration"));
  const sitemap = loadSource("src/app/sitemap.ts").default();
  assert.ok(sitemap.every((entry) => !entry.url.includes("aws-vpc-rds-migration")));
});
