import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { loadSource } from "./load-source.mjs";
const { projects } = loadSource("src/data/projects.ts");
const Card = loadSource("src/components/ProjectCard.tsx").default;

test("Warehouse card has a linked, qualified schematic thumbnail rather than an accuracy chart", () => {
  const project = projects.find(p => p.slug === "pytorch-cnn-gpu");
  const html = renderToStaticMarkup(createElement(Card, { p: project }));
  assert.match(html, /<img/);
  assert.match(html, /warehouse-pipeline-thumbnail\.svg/);
  assert.match(html, /Explanatory schematic — not a recorded prediction/);
  assert.match(html, /href="\/projects\/pytorch-cnn-gpu"/);
  assert.doesNotMatch(html, /warehouse-yolo-summary\.png/);
});

test("the authored thumbnail matches its metadata and contains no embedded evidence or scripts", () => {
  const { thumbnail } = projects.find(p => p.slug === "pytorch-cnn-gpu");
  const svg = readFileSync(new URL(`../public${thumbnail.src}`, import.meta.url), "utf8");
  assert.match(svg, new RegExp(`width="${thumbnail.width}" height="${thumbnail.height}"`));
  assert.match(svg, /Largest by area/);
  assert.match(svg, /Custom CNN/);
  assert.match(svg, /Ranked/);
  assert.match(svg, /NO REGIONS\? USE THE WHOLE IMAGE THROUGH THE SAME CLASSIFIER/);
  assert.doesNotMatch(svg, /<(?:script|image|foreignObject)\b|\bon\w+=|\d+%|Overall Accuracy/i);
});
