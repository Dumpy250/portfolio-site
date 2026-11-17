import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { loadSource } from "./load-source.mjs";

const render = (path) => renderToStaticMarkup(loadSource(path).default());
test("home and About retain generic Unity development without a branded project teaser", () => {
  const home = render("src/app/page.tsx");
  const aboutModule = loadSource("src/app/about/page.tsx");
  const about = renderToStaticMarkup(aboutModule.default());
  for (const html of [home, about]) {
    assert.match(html, /developing a Unity game/);
    assert.match(html, /independently/);
  }
  assert.match(aboutModule.metadata.description, /independent Unity development/);
  assert.match(home, /Unity · Lua · Game modding · QA/);
  assert.doesNotMatch(home + about + JSON.stringify(aboutModule.metadata), /coming soon|secret project|id="current-projects"/i);
  assert.match(about, /Volunteer mod development/);
  assert.match(about, /Battlefield 3 Reality Mod/);
  assert.match(about, /Expected graduation: December 2026/);
});

test("homepage selects only two approved highlights with their existing images and nested headings", () => {
  const expected = ["carla-observability-toolkit", "pytorch-cnn-gpu"];
  const html = render("src/app/page.tsx");
  const cards = [...html.matchAll(/<article\b[^>]*class="project-card"[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/article>/g)];
  assert.deepEqual(cards.map(match => match[1]), expected);
  const { projects } = loadSource("src/data/projects.ts");
  for (const [, slug, card] of cards) {
    const project = projects.find(p => p.slug === slug);
    assert.match(card, /<h3>/);
    const image = card.match(/<img[^>]*src="([^"]+)"/)?.[1];
    assert.ok(image, `${slug}: image`);
    const url = new URL(image.replaceAll("&amp;", "&"), "http://localhost");
    assert.equal(url.searchParams.get("url") ?? url.pathname, project.thumbnail?.src ?? project.image);
    assert.match(card, new RegExp(`href="/projects/${slug}"`));
  }
  for (const technology of ["EC2", "VPC", "RDS", "Cognito"]) assert.ok(html.includes(technology));
  assert.match(html, /computer-vision prototypes/);
  assert.doesNotMatch(html, /class="pipeline"|internship-mark|work-pair/);
});
