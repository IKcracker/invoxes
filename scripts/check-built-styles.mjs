import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as sleep } from "node:timers/promises";
import postcss from "postcss";

const root = fileURLToPath(new URL("../", import.meta.url));
const port = Number(process.env.STYLE_TEST_PORT || 3107);
assert.ok(Number.isInteger(port) && port >= 1024 && port <= 65535);
const origin = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, [
  path.join(root, "node_modules/next/dist/bin/next"), "start",
  "--hostname", "127.0.0.1", "--port", String(port),
], {
  cwd: root,
  env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
  stdio: ["ignore", "pipe", "pipe"],
});
let output = "";
let spawnError;
server.on("error", (error) => { spawnError = error; });
for (const stream of [server.stdout, server.stderr]) {
  stream.on("data", (chunk) => { output = (output + chunk).slice(-4000); });
}

async function get(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
  assert.ok(response.ok, `HTTP ${response.status}: ${url}`);
  return response;
}

try {
  const deadline = Date.now() + 60000;
  let ready = false;
  while (Date.now() < deadline) {
    if (spawnError) throw spawnError;
    if (server.exitCode !== null) throw new Error(`Next.js exited: ${output}`);
    try {
      await get(origin);
      ready = true;
      break;
    } catch {
      await sleep(250);
    }
  }
  assert.ok(ready, `Next.js did not become ready: ${output}`);
  const cssCache = new Map();
  for (const route of ["/", "/services", "/calculator", "/apply", "/crm"]) {
    const html = await (await get(origin + route)).text();
    const links = [...html.matchAll(/<link\b[^>]*>/gi)]
      .map(([tag]) => /\brel=["']stylesheet["']/i.test(tag)
        ? tag.match(/\bhref=["']([^"']+)["']/i)?.[1]
        : undefined)
      .filter(Boolean);
    assert.ok(links.length, `No stylesheet links on ${route}`);
    let css = "";
    for (const href of new Set(links)) {
      const url = new URL(href.replaceAll("&amp;", "&"), origin);
      assert.equal(url.origin, origin, "Expected self-hosted stylesheet assets");
      if (!cssCache.has(url.href)) {
        const response = await get(url);
        assert.match(response.headers.get("content-type") || "", /text\/css/);
        cssCache.set(url.href, await response.text());
      }
      css += cssCache.get(url.href) + "\n";
    }
    const tree = postcss.parse(css);
    const selectors = new Set();
    tree.walkRules((rule) => rule.selector.split(",").forEach((selector) => selectors.add(selector.trim())));
    for (const selector of [".grid", ".flex", ".text-sm", ".bg-white"]) {
      assert.ok(selectors.has(selector), `${route} is missing ${selector}`);
    }
    tree.walkAtRules((rule) => assert.ok(
      !["tailwind", "theme", "apply", "source", "custom-variant"].includes(rule.name),
      `${route} returned uncompiled @${rule.name}`,
    ));
    console.log(`${route}: HTTP 200; ${new Set(links).size} CSS assets loaded; compiled utility styles present.`);
  }
} finally {
  if (server.exitCode === null && !spawnError) {
    const stopped = once(server, "exit");
    server.kill("SIGTERM");
    const timer = setTimeout(() => server.kill("SIGKILL"), 5000);
    timer.unref();
    await stopped;
    clearTimeout(timer);
  }
}
