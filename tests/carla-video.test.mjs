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

test("CARLA offers the final presentation and screenshot bypass without preloading YouTube", async () => {
  const html = await render();
  assert.match(html, /Final presentation demo/);
  assert.match(html, /href="#carla-final-presentation"[^>]*>Watch final presentation<\/a>/);
  assert.match(html, /href="#carla-gallery-title"[^>]*>Inspect dashboard screenshots<\/a>/);
  assert.ok(html.indexOf('id="carla-final-presentation"') < html.indexOf('id="carla-gallery-title"'));
  assert.match(html, /Load video player/);
  assert.match(html, /Open on YouTube/);
  assert.match(html, /https:\/\/www\.youtube\.com\/watch\?v=wsCNO4Om8qI/);
  assert.match(html, /\/projects\/carla-views\/final-presentation-thumbnail\.jpg/);
  assert.doesNotMatch(html, /xD3zZXMfMdQ|Sprint 4|sprint-4-video-thumbnail|Earlier development recording|1:17|2:02|5:37/);
  assert.doesNotMatch(html, /carla-video-chapters|Video chapters on YouTube/);
  assert.doesNotMatch(html, /<iframe\b|<script[^>]*src="[^\"]*(?:youtube|googlevideo)|rel="(?:preconnect|dns-prefetch)"[^>]*youtube/);
  assert.match(html, /dashboard screenshots below are from v1\.0\.0/);
});
