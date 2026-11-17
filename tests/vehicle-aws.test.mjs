import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { loadSource } from "./load-source.mjs";

const { default: CaseStudy } = loadSource("src/app/projects/[slug]/page.tsx");
test("car-rental case credits confirmed AWS infrastructure and distinguishes the recorded local workflow", async () => {
  const html = renderToStaticMarkup(await CaseStudy({ params: Promise.resolve({ slug: "car-rental-microservices" }) }));
  assert.match(html, /<h1>Car Rental Backend &amp; AWS Infrastructure<\/h1>/);
  assert.match(html, /AWS &amp; service architecture/);
  assert.match(html, /Configured Amazon EC2 and VPC infrastructure/);
  for (const name of ["Amazon EC2", "Amazon VPC", "Amazon RDS", "Amazon Cognito"]) assert.ok(html.includes(name), name);
  assert.match(html, /Logical component diagram/);
  assert.match(html, /disposable local database/);
  assert.match(html, /Recorded API workflow/);
});

test("vehicle Result leads with capability and keeps local fictional-data verification in a separate caption", async () => {
  const html = renderToStaticMarkup(await CaseStudy({ params: Promise.resolve({ slug: "car-rental-microservices" }) }));
  const result = html.match(/<dt>Result<\/dt><dd>([\s\S]*?)<\/dd>/)?.[1];
  assert.ok(result);
  assert.ok(result.startsWith("Register vehicles, associate them with users, and return them to available status, with each change saved to the database."));
  assert.match(result, /<p class="notice"[^>]*>Verified in a local demonstration with fictional data<\/p>/);
  assert.doesNotMatch(result, /unchanged|disposable|readbacks/);
});

test("logical diagram separates service integrations from EC2/VPC configuration", () => {
  const { default: Architecture } = loadSource("src/components/VehicleAwsArchitecture.tsx");
  const html = renderToStaticMarkup(Architecture());
  assert.match(html, /Gateway/);
  assert.match(html, /Vehicle service/);
  assert.match(html, /User service/);
  assert.match(html, /MySQL persistence/);
  assert.match(html, /User management/);
  assert.deepEqual([...html.matchAll(/data-cloud-component="([^"]+)"/g)].map(m => m[1]), ["rds", "cognito", "ec2", "vpc"]);
  const infrastructure = html.slice(html.indexOf('<div class="vehicle-aws-infrastructure">'));
  assert.match(infrastructure, /Infrastructure I configured/);
  assert.match(infrastructure, /Amazon EC2/);
  assert.match(infrastructure, /Amazon VPC/);
  assert.doesNotMatch(infrastructure, /data-cloud-component="(?:rds|cognito)"/);
  assert.match(html, /not a subnet layout or a live cloud capture/);
  assert.equal((html.match(/aria-hidden="true"/g) ?? []).length, 4);
  assert.doesNotMatch(html, /<img|<script|<iframe|<input|<button|security group|availability zone|multi-AZ|subnet-[a-z0-9]+/i);
});

test("each independent branch names its gateway origin in a stacked layout", () => {
  const { default: Architecture } = loadSource("src/components/VehicleAwsArchitecture.tsx");
  const html = renderToStaticMarkup(Architecture());
  assert.match(html, /Gateway → vehicle operations/);
  assert.match(html, /Gateway → user operations/);
});

test("wider cloud description does not export private resource identifiers or claim secured/deployed runtime", async () => {
  const html = renderToStaticMarkup(await CaseStudy({ params: Promise.resolve({ slug: "car-rental-microservices" }) }));
  assert.doesNotMatch(html, /(?:cognito-idp|rds)[.][a-z0-9.-]*amazonaws[.]com|AKIA[A-Z0-9]{16}|ASIA[A-Z0-9]{16}|aws_secret_access_key|BEGIN PRIVATE KEY|publicly deployed|production-ready|JWT-protected/i);
  assert.match(html, /not authenticated authorization/);
  assert.match(html, /linked repository covers the vehicle-service module/);
});

test("project metadata keeps the URL/source/recorded cover while crediting confirmed cloud work", async () => {
  const { projects } = loadSource("src/data/projects.ts");
  const project = projects.find(p => p.slug === "car-rental-microservices");
  for (const technology of ["EC2", "VPC", "RDS", "Cognito"]) assert.ok(project.tech.includes(technology));
  assert.match(project.caseStudy.role, /EC2\/VPC configuration/);
  assert.equal(project.thumbnail.src, "/projects/vehicle-service-workflow.svg");
  assert.equal(project.links.github, "https://github.com/Dumpy250/car-rental-service/tree/05c977857c41073a505584839d8e8028a05145e2");
  const route = loadSource("src/app/projects/[slug]/page.tsx");
  const metadata = await route.generateMetadata({ params: Promise.resolve({ slug: project.slug }) });
  assert.equal(metadata.title, project.title);
  assert.equal(metadata.openGraph.url, "/projects/car-rental-microservices");
  assert.equal(metadata.twitter.title, project.title);
});
