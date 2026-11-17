import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { loadSource } from "./load-source.mjs";
import { readFileSync } from "node:fs";

test("CARLA quick routes use immediate scrolling without changing other project pages", () => {
  const css = readFileSync(new URL("../src/app/globals.css", import.meta.url), "utf8");
  assert.match(css, /html:has\(\.carla-entry-links\)\s*\{\s*scroll-behavior:\s*auto;\s*\}/);
});

const render = async (slug = "carla-observability-toolkit") => renderToStaticMarkup(await loadSource("src/app/projects/[slug]/page.tsx").default({ params: Promise.resolve({ slug }) }));

test("CARLA offers optional Sprint 4 video and a direct screenshot route without preloading YouTube", async () => {
  const html = await render();
  assert.match(html, /Sprint 4 development demo/);
  assert.match(html, /href="#carla-development-demo"[^>]*>Watch development demo<\/a>/);
  assert.match(html, /href="#carla-gallery-title"[^>]*>Inspect dashboard screenshots<\/a>/);
  assert.ok(html.indexOf('id="carla-development-demo"') < html.indexOf('id="carla-gallery-title"'));
  assert.match(html, /Load video player/);
  assert.match(html, /Open on YouTube/);
  assert.match(html, /https:\/\/youtu.be\/xD3zZXMfMdQ\?si=8U0xFu7OVxcllqCS/);
  for (const seconds of [77, 122, 337]) assert.ok(html.includes(`https://www.youtube.com/watch?v=xD3zZXMfMdQ&amp;t=${seconds}s`));
  assert.match(html, /1:17/);assert.match(html, /2:02/);assert.match(html, /5:37/);
  assert.doesNotMatch(html, /<iframe\b|<script[^>]*src="[^\"]*(?:youtube|googlevideo)|rel="(?:preconnect|dns-prefetch)"[^>]*youtube/);
  assert.match(html, /Earlier development recording/);
  assert.match(html, /Application screenshots from v1\.0\.0/);
});
