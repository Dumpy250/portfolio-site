import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
const base = process.env.PORTFOLIO_TEST_URL || "http://127.0.0.1:3210";
test("homepage presents the selected capstone and warehouse team project", async () => {
  const response = await fetch(base);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /href="\/projects\/carla-observability-toolkit"/);
  assert.match(html, /Warehouse Item Recognition/);
  assert.match(html, /href="\/projects\/pytorch-cnn-gpu"/);
});

test("shared layout provides a single main landmark, skip link, and native mobile navigation", async () => {
  const html = (await (await fetch(base)).text()).replace(
    /<script\b[^>]*>[\s\S]*?<\/script>/g,
    "",
  );
  assert.equal((html.match(/<main\b/g) || []).length, 1, "one main landmark");
  assert.ok(html.includes('href="#content"'), "keyboard skip link");
  assert.ok(
    /<summary[^>]*>Menu/.test(html),
    "native keyboard-operable mobile menu",
  );
});

test("compiled styles include the project-first layout and palette", async () => {
  const html = await (await fetch(base)).text();
  const urls = [
    ...html.matchAll(/<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"/g),
  ].map((match) => match[1]);
  const styles = (
    await Promise.all(
      urls.map(async (url) => (await fetch(new URL(url, base))).text()),
    )
  ).join("\n");
  assert.ok(styles.includes("--paper"), "updated palette compiled");
  assert.ok(styles.includes(".hero"), "responsive hero compiled");
});

test("case studies distinguish personal contributions from team capabilities", async () => {
  const rental = await (
    await fetch(`${base}/projects/equipment-reservation-tool`)
  ).text();
  const vision = await (await fetch(`${base}/projects/pytorch-cnn-gpu`)).text();
  assert.ok(
    rental.includes("Software development internship"),
    "internship context without emphasizing pay",
  );
  assert.ok(
    rental.includes("Reservation logic was mainly written by a colleague"),
    "accurate reservation attribution",
  );
  assert.ok(
    vision.includes("Warehouse Item Recognition"),
    "practical project identity",
  );
  assert.ok(!vision.includes("Top-1: 81%"), "no unqualified accuracy badge");
});

test("the .NET coursework project has a reachable case study and catalog entry", async () => {
  const response = await fetch(`${base}/projects/job-posting-mvc`);
  assert.equal(response.status, 200, ".NET case study route");
  assert.ok(
    (await response.text()).includes("Entity Framework Core"),
    ".NET stack described",
  );
  const catalog = await (await fetch(`${base}/projects`)).text();
  assert.ok(
    catalog.includes('href="/projects/job-posting-mvc"'),
    "catalog links to .NET work",
  );
});

test("about and contact reflect the broader background without an invented response-time promise", async () => {
  const about = await (await fetch(`${base}/about`)).text();
  const contact = await (await fetch(`${base}/contact`)).text();
  assert.ok(
    about.includes("Expected graduation: December 2026"),
    "expected, not completed degree",
  );
  assert.ok(about.includes("CSV imports"), "personal internship contribution");
  assert.ok(about.includes("C#"), "broader language background");
  assert.ok(contact.includes("mailto:"), "working email action");
  assert.ok(
    !contact.includes("respond within 24 hours"),
    "no unconfirmed response-time commitment",
  );
});

test("resume download serves the bundled PDF unchanged", async () => {
  const expected = createHash("sha256")
    .update(await readFile(new URL("../public/resume.pdf", import.meta.url)))
    .digest("hex");
  const response = await fetch(`${base}/resume.pdf`);
  assert.equal(response.status, 200);
  assert.ok(response.headers.get("content-type").includes("application/pdf"));
  const actual = Buffer.from(await response.arrayBuffer());
  assert.equal(
    createHash("sha256").update(actual).digest("hex"),
    expected,
    "download bytes match the bundled resume PDF",
  );
});

test("all portfolio pages keep one main landmark and missing pages offer recovery", async () => {
  const routes = [
    "/",
    "/projects",
    "/about",
    "/contact",
    "/projects/carla-observability-toolkit",
    "/projects/pytorch-cnn-gpu",
    "/projects/equipment-reservation-tool",
    "/projects/job-posting-mvc",
    "/projects/car-rental-microservices",
    "/projects/aws-vpc-rds-migration",
  ];
  for (const route of routes) {
    const response = await fetch(base + route);
    assert.equal(response.status, 200, route);
    const html = (await response.text()).replace(
      /<script\b[^>]*>[\s\S]*?<\/script>/g,
      "",
    );
    assert.equal(
      (html.match(/<main\b/g) || []).length,
      1,
      `${route}: one main landmark`,
    );
    assert.equal(
      (html.match(/<h1\b/g) || []).length,
      1,
      `${route}: one page heading`,
    );
  }
  const response = await fetch(base + "/this-page-does-not-exist");
  assert.equal(response.status, 404);
  const html = (await response.text()).replace(
    /<script\b[^>]*>[\s\S]*?<\/script>/g,
    "",
  );
  assert.equal(
    (html.match(/<main\b/g) || []).length,
    1,
    "404: one main landmark",
  );
  assert.ok(html.includes("Back to the work"), "404 recovery link");
});

test("discovery metadata uses the public domain and includes the new project", async () => {
  const response = await fetch(base + "/sitemap.xml");
  assert.equal(response.status, 200);
  const sitemap = await response.text();
  assert.ok(
    sitemap.includes("https://www.cameron-basham.com/projects/job-posting-mvc"),
    "canonical .NET case-study URL",
  );
  assert.ok(
    (await (await fetch(base + "/robots.txt")).text()).includes(
      "https://www.cameron-basham.com/sitemap.xml",
    ),
    "matching sitemap discovery",
  );
  assert.equal(
    (await fetch(base + "/icon.svg")).status,
    200,
    "personal brand icon",
  );
});

test("accent text and interactive states meet normal-text contrast thresholds", async () => {
  const html = await (await fetch(base)).text();
  const urls = [
    ...html.matchAll(/<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"/g),
  ].map((match) => match[1]);
  const css = (
    await Promise.all(
      urls.map(async (url) => (await fetch(new URL(url, base))).text()),
    )
  ).join("\n");
  const palette = Object.fromEntries(
    [...css.matchAll(/--([a-z-]+):\s*(#[a-f\d]{6})/gi)].map((match) => [
      match[1],
      match[2],
    ]),
  );
  assert.ok(
    palette["orange-ink"],
    "separate high-contrast accent for normal text",
  );
  assert.ok(palette["orange-light"], "separate accent for dark backgrounds");
  const luminance = (hex) => {
    const c = [1, 3, 5]
      .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
      .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return c[0] * 0.2126 + c[1] * 0.7152 + c[2] * 0.0722;
  };
  const ratio = (a, b) => {
    const [low, high] = [luminance(a), luminance(b)].sort((a, b) => a - b);
    return (high + 0.05) / (low + 0.05);
  };
  for (const background of [palette.paper, "#e0e4dc", "#e9ddd0"]) {
    assert.ok(
      ratio(palette["orange-ink"], background) >= 4.5,
      "accent text on light project surfaces",
    );
  }
  assert.ok(
    ratio(palette["orange-light"], palette.dark) >= 4.5,
    "hover text on dark project panel",
  );
  assert.ok(
    ratio("#fff9ef", palette["orange-ink"]) >= 4.5,
    "small contact-band text",
  );
  assert.ok(
    ratio(palette.paper, palette["orange-ink"]) >= 4.5,
    "button hover text",
  );
});
