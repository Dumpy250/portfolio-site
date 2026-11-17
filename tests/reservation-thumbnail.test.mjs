import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { loadSource } from "./load-source.mjs";

const { projects } = loadSource("src/data/projects.ts");
const Card = loadSource("src/components/ProjectCard.tsx").default;
const imageSource = (html) => {
  const match = html.match(/<img[^>]*src="([^"]+)"/);
  assert.ok(match, "The card renders an image");
  const url = new URL(match[1].replaceAll("&amp;", "&"), "http://localhost");
  return url.pathname === "/_next/image" ? url.searchParams.get("url") : url.pathname;
};

test("reservation catalog card uses the populated Inventory page with fictional-data context", () => {
  const project = projects.find((p) => p.slug === "equipment-reservation-tool");
  const html = renderToStaticMarkup(createElement(Card, { p: project }));
  assert.equal(imageSource(html), "/projects/reservation-capture/originals/inventory-top.png");
  assert.match(html, /width="1346" height="905"/);
  assert.match(html, /Inventory page populated with 20 fictional media-equipment items/);
  assert.match(html, /<figcaption[^>]*>Local demonstration with fictional data/);
  assert.match(html, /href="\/projects\/equipment-reservation-tool"/);
});

test("reservation thumbnail dimensions match the retained real PNG", () => {
  const project = projects.find((p) => p.slug === "equipment-reservation-tool");
  assert.ok(project.thumbnail, "A dedicated thumbnail is configured");
  const image = readFileSync(new URL(`../public${project.thumbnail.src}`, import.meta.url));
  assert.equal(image.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
  assert.equal(image.readUInt32BE(16), project.thumbnail.width);
  assert.equal(image.readUInt32BE(20), project.thumbnail.height);
});

test("existing screenshot cards keep their current image without a demo caption", () => {
  const project = projects.find((p) => p.slug === "carla-observability-toolkit");
  const html = renderToStaticMarkup(createElement(Card, { p: project }));
  assert.equal(imageSource(html), project.image);
  assert.doesNotMatch(html, /Local demonstration with fictional data/);
});
