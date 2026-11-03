import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const PORT = Number(process.env.SMOKE_PORT || 43961);
const base = "http://127.0.0.1:" + PORT;
const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", String(PORT)], {
  stdio: ["ignore", "pipe", "pipe"],
  env: { ...process.env, NODE_ENV: "production", NEXT_TELEMETRY_DISABLED: "1" },
});
let logs = "";
server.stdout.on("data", (chunk) => { logs += String(chunk).slice(-1500); });
server.stderr.on("data", (chunk) => { logs += String(chunk).slice(-1500); });

async function ready() {
  for (let attempts = 0; attempts < 120; attempts++) {
    if (server.exitCode !== null) throw Error("Next.js server exited: " + logs);
    try {
      const res = await fetch(base + "/", { signal: AbortSignal.timeout(2000) });
      if (res.status === 200) return;
    } catch {}
    await sleep(250);
  }
  throw Error("Next.js server did not start: " + logs);
}

async function check(path, status, fragments = []) {
  const res = await fetch(base + path, { signal: AbortSignal.timeout(12000) });
  const body = await res.text();
  assert.equal(res.status, status, path + " returned " + res.status);
  for (const expected of fragments) {
    assert.ok(body.includes(expected), path + " missing text: " + expected);
  }
  console.log("PASS " + path + " (" + status + ")");
  return { body, headers: res.headers };
}

try {
  await ready();
  const routes = ["/", "/about", "/menu", "/reservation", "/gallery", "/blog", "/contact", "/cart", "/checkout"];
  for (const path of routes) {
    await check(path, 200, ['<h1', "Rouché"]);
  }
  await check("/does-not-exist", 404, ["This page is not on the menu"]);
  await check("/about/extra", 404);
  await check("/robots.txt", 200, ["Disallow: /"]);
  const sitemap = await check("/sitemap.xml", 200);
  assert.ok(!sitemap.body.includes("localhost"), "Sitemap must never publish localhost URLs");
  const homepage = await check("/", 200, ["application/ld+json", "maps.app.goo.gl"]);
  assert.ok(homepage.body.includes("noindex"), "Without a real production URL, the site should be noindex");
  await check("/cart", 200, ["noindex"]);
  await check("/checkout", 200, ["noindex"]);
  console.log("All production route, SEO and noindex smoke tests passed.");
} finally {
  server.kill("SIGTERM");
  await sleep(350);
  if (server.exitCode === null) server.kill("SIGKILL");
}
