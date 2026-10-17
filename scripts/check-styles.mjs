import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";

const root = fileURLToPath(new URL("../", import.meta.url));
const entry = path.join(root, "app/globals.css");
const source = await readFile(entry, "utf8");
const result = await postcss([tailwind({ base: root, optimize: false })]).process(source, {
  from: entry,
  map: false,
});

const selectors = new Set();
result.root.walkRules((rule) => selectors.add(rule.selector));
for (const selector of [".flex", ".grid", ".bg-white", ".text-sm", ".rounded-lg"]) {
  assert.ok(selectors.has(selector), `Missing compiled utility: ${selector}`);
}
let boxSizingReset = false;
result.root.walkDecls("box-sizing", (declaration) => {
  if (declaration.value === "border-box") boxSizingReset = true;
});
assert.ok(boxSizingReset, "Tailwind preflight reset is missing");
result.root.walkAtRules((rule) => {
  assert.ok(!["tailwind", "theme", "apply", "source", "custom-variant"].includes(rule.name),
    `Uncompiled Tailwind directive: @${rule.name}`);
});

const layout = await readFile(path.join(root, "app/layout.tsx"), "utf8");
assert.match(layout, /import\s+["']\.\/globals\.css["']/,
  "The root layout must import the global stylesheet");
console.log(`Styles OK: ${selectors.size} compiled selectors, preflight, and root CSS import verified.`);
