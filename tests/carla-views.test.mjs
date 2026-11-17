import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { loadSource } from "./load-source.mjs";

// These render the actual client component, not a parallel test-only presentation.
const { default: CarlaViews } = loadSource("src/components/CarlaViews.tsx");
const { carlaViews, getCarlaView } = loadSource("src/lib/carla-views.ts");
const render = (props) => renderToStaticMarkup(createElement(CarlaViews, props));
const text = (html) => html.replace(/<[^>]+>/g, " ").replace(/&#x27;/g, "'").replace(/&amp;/g, "&").replace(/\s+/g, " ");
const expected = [
  {
    id: "explorer", label: "Run Explorer", title: "Inspect a saved session",
    caption: "Review a saved run’s summary, telemetry, and recorded events.",
    original: "/projects/carla-explorer.png", size: [1357, 1262],
    details: [
      ["Summary", "/projects/carla-views/details/explorer-summary.png", 651, 234],
      ["Event Timeline", "/projects/carla-views/details/explorer-events.png", 1320, 208],
    ],
  },
  {
    id: "comparison", label: "Comparison Summary", title: "Compare the headline metrics",
    caption: "Compare summary metrics from two saved runs, including speed, duration, and event counts.",
    original: "/projects/carla-compare.png", size: [1381, 952],
    details: [["Summary Delta", "/projects/carla-views/details/comparison-delta.png", 1320, 351]],
  },
  {
    id: "telemetry", label: "Telemetry Comparison", title: "See how the runs differ over time",
    caption: "Overlay speed and control-input traces against elapsed run time.",
    original: "/projects/carla-views/originals/telemetry-comparison.png", size: [1354, 1100],
    details: [
      ["Speed Comparison", "/projects/carla-views/details/speed-comparison.png", 1320, 501],
      ["Control Inputs Comparison", "/projects/carla-views/details/control-comparison.png", 1320, 551],
    ],
  },
];

function assertImage(html, path, width, height) {
  const image = [...html.matchAll(/<img\b[^>]*>/g)].map(([tag]) => tag).find((tag) => tag.includes(`src="${path}"`));
  assert.ok(image, `Rendered original, unoptimized image: ${path}`);
  assert.match(image, new RegExp(`\\bwidth="${width}"`));
  assert.match(image, new RegExp(`\\bheight="${height}"`));
  assert.match(image, /alt="[^"]+"/);
  assert.doesNotMatch(image, /srcSet=/);
}

test("default is the saved Run Explorer, with named manual view buttons before images", () => {
  const html = render();
  assert.match(html, /class="carla-views"/);
  assert.match(html, /Application screenshots from v1\.0\.0\./);
  assert.match(text(html), /recorded views/i);
  assert.match(text(html), /not a live application/i);
  assert.match(text(html), /not a continuous captured sequence/i);
  const group = html.match(/<div\b[^>]*role="group"[^>]*>[\s\S]*?<\/div>/)?.[0];
  assert.ok(group);
  assert.match(group, /aria-label="Application screenshot views"/);
  const buttons = [...group.matchAll(/<button\b([^>]*)>([^<]+)<\/button>/g)];
  assert.equal(buttons.length, 3);
  assert.deepEqual(buttons.map(([, , label]) => label), expected.map(({ label }) => label));
  for (const [, attrs, label] of buttons) {
    assert.match(attrs, /type="button"/);
    assert.match(attrs, /aria-controls="carla-view-detail"/);
    assert.match(attrs, new RegExp(`aria-pressed="${label === "Run Explorer"}"`));
  }
  assert.ok(html.indexOf(group) < html.indexOf('<img'));
  assert.match(html, /<h3[^>]*>Inspect a saved session<\/h3>/);
  assert.doesNotMatch(text(html), /Step \d|Next step|Previous step|autoplay|live telemetry|performance score:|better run|worse run/i);
});

for (const view of expected) {
  test(`${view.id} initialView renders its actual title, crops, qualification, and current original`, () => {
    const html = render({ initialView: view.id });
    const visibleText = text(html);
    assert.match(html, new RegExp(`<h3[^>]*>${view.title}</h3>`));
    assert.ok(visibleText.includes(view.caption));
    assert.match(html, /id="carla-view-detail"/);
    assert.match(html, /What to notice/);
    assert.equal((html.match(/aria-pressed="true"/g) ?? []).length, 1);
    const active = [...html.matchAll(/<button\b([^>]*)>([^<]+)<\/button>/g)].find(([, attrs]) => attrs.includes('aria-pressed="true"'));
    assert.equal(active?.[2], view.label);
    assert.equal((html.match(/class="carla-detail"/g) ?? []).length, view.details.length);
    for (const [label, path, width, height] of view.details) {
      assert.ok(visibleText.includes(label));
      assertImage(html, path, width, height);
    }
    const scrollers = [...html.matchAll(/<div\b[^>]*class="carla-detail-scroll"[^>]*>/g)];
    assert.equal(scrollers.length, view.details.length);
    for (const [region] of scrollers) {
      assert.match(region, /tabindex="0"/);
      assert.match(region, /role="region"/);
      assert.match(region, /aria-label="[^"]+"/);
    }
    assert.equal((html.match(/class="carla-detail-image"/g) ?? []).length, view.details.length);
    assert.match(html, /class="carla-scroll-help"/);
    assert.match(visibleText, /scroll horizontally/i);
    const dialog = html.match(/<dialog\b[\s\S]*?<\/dialog>/)?.[0];
    assert.ok(dialog);
    assert.match(dialog, /class="carla-original-dialog"/);
    assert.doesNotMatch(dialog.match(/^<dialog[^>]*>/)[0], /\bopen(?:=|\s|>)/);
    const labelledby = dialog.match(/aria-labelledby="([^"]+)"/)?.[1];
    assert.ok(labelledby?.startsWith("carla-original-title"));
    assert.ok(dialog.includes(`id="${labelledby}"`));
    assert.match(dialog, /aria-describedby="[^"]+"/);
    assert.match(dialog, /<button[^>]*autofocus=""[^>]*>Close original screenshot<\/button>/);
    assert.match(dialog, /class="carla-original-scroll"[^>]*tabindex="0"[^>]*role="region"[^>]*aria-label="[^"]+"/);
    assertImage(dialog, view.original, ...view.size);
    assert.ok(dialog.includes(`href="${view.original}"`));
    assert.match(html, /<button[^>]*>View original screenshot<\/button>/);
    assert.ok(html.includes(`<noscript><a href="${view.original}"`));
    for (const other of expected.filter(({ id }) => id !== view.id)) {
      assert.ok(!html.includes(`src="${other.original}"`));
      for (const [, path] of other.details) assert.ok(!html.includes(`src="${path}"`));
    }
    if (view.id === "explorer") {
      assert.match(visibleText, /summary and recorded entries can be inspected together/i);
      assert.match(visibleText, /N\/A simulation timestamps/);
    } else if (view.id === "comparison") {
      assert.match(visibleText, /Run B − Run A/);
      assert.match(visibleText, /difference, not a performance score/);
    } else {
      assert.match(visibleText, /first valid telemetry timestamp/);
      assert.match(visibleText, /not replay or event synchronization/);
    }
  });
}

test("view data has exactly the reviewed IDs, original paths, and crop dimensions", () => {
  assert.deepEqual(Array.from(carlaViews, ({ id }) => id), expected.map(({ id }) => id));
  for (const fixture of expected) {
    const view = getCarlaView(fixture.id);
    assert.equal(view.label, fixture.label);
    assert.equal(view.original.src, fixture.original);
    assert.deepEqual([view.original.width, view.original.height], fixture.size);
    assert.deepEqual(Array.from(view.details, ({ title, src, width, height }) => [title, src, width, height]), fixture.details);
  }
  assert.equal(getCarlaView(), carlaViews[0]);
  assert.equal(getCarlaView("not-a-view"), carlaViews[0]);
  assert.match(render({ initialView: "not-a-view" }), /<h3[^>]*>Inspect a saved session<\/h3>/);
});

test("all referenced evidence images have dimensions matching the actual PNG headers", () => {
  for (const view of carlaViews) {
    for (const image of [view.original, ...view.details]) {
      const png = readFileSync(new URL(`../public${image.src}`, import.meta.url));
      assert.equal(png.subarray(1, 4).toString(), "PNG", image.src);
      assert.deepEqual([png.readUInt32BE(16), png.readUInt32BE(20)], [image.width, image.height], image.src);
    }
  }
});
