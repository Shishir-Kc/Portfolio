// Refresh the real GitHub numbers the page shows (the commit ridge, counts and
// "right now" push dates). Public data only, no token needed.
//
//   node scripts/refresh-github.mjs
//
// Writes src/lib/data/github.json. Commit the result; the page never fetches
// GitHub at runtime.
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";

const USER = "Shishir-Kc";
const FROM_YEAR = 2025; // the account was created in January 2025
const OUT = new URL("../src/lib/data/github.json", import.meta.url);

async function text(url) {
  const r = await fetch(url, { headers: { "User-Agent": "portfolio-refresh" } });
  if (!r.ok) throw new Error(`${url}: ${r.status}`);
  return r.text();
}

// Daily counts from the public contribution calendar.
const days = new Map();
const thisYear = new Date().getFullYear();
for (let y = FROM_YEAR; y <= thisYear; y++) {
  const html = await text(`https://github.com/users/${USER}/contributions?from=${y}-01-01&to=${y}-12-31`);
  const ids = new Map();
  for (const m of html.matchAll(/data-date="(\d{4}-\d{2}-\d{2})"[^>]*id="([^"]+)"/g)) ids.set(m[2], m[1]);
  for (const m of html.matchAll(/<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    const date = ids.get(m[1]);
    if (!date) continue;
    const n = /^(\d+) contribution/.exec(m[2]);
    days.set(date, n ? Number(n[1]) : 0);
  }
}

const today = new Date().toISOString().slice(0, 10);
const dates = [...days.keys()].filter((d) => d <= today).sort();
if (!dates.length) throw new Error("no contribution data parsed");

// Weekly buckets (Monday-start), oldest first.
const weeks = [];
for (const d of dates) {
  const t = new Date(d + "T00:00:00Z");
  const monday = new Date(t);
  monday.setUTCDate(t.getUTCDate() - ((t.getUTCDay() + 6) % 7));
  const key = monday.toISOString().slice(0, 10);
  if (!weeks.length || weeks[weeks.length - 1].week !== key) weeks.push({ week: key, count: 0 });
  weeks[weeks.length - 1].count += days.get(d);
}

const repos = JSON.parse(await text(`https://api.github.com/users/${USER}/repos?per_page=100`));
const pushed = Object.fromEntries(repos.map((r) => [r.name, r.pushed_at.slice(0, 10)]));

// The repos shown on the "right now" cards: language, link, and weekly commit
// counts for the last 26 weeks. Counted from the git history itself (a
// metadata-only clone), which is exact and doesn't spend GitHub API quota.
const FEATURED = ["Aris", "IndexDB", "A.R.I.A"];
const WEEKS = 26;
const mondayOf = (d) => {
  const t = new Date(d + "T00:00:00Z");
  t.setUTCDate(t.getUTCDate() - ((t.getUTCDay() + 6) % 7));
  return t.getTime();
};
const thisMonday = mondayOf(today);
const featured = {};
for (const name of FEATURED) {
  const r = repos.find((x) => x.name === name);
  if (!r) continue;
  const dir = await mkdtemp(join(tmpdir(), "repo-"));
  try {
    execFileSync("git", ["clone", "--quiet", "--bare", "--filter=blob:none", "--single-branch", "--no-tags", r.clone_url, dir]);
    const dates = execFileSync("git", ["-C", dir, "log", `--since=${WEEKS} weeks ago`, "--format=%cs"], { encoding: "utf8" })
      .split("\n").filter(Boolean);
    const weeks = Array(WEEKS).fill(0);
    for (const d of dates) {
      const i = WEEKS - 1 - Math.round((thisMonday - mondayOf(d)) / (7 * 864e5));
      if (i >= 0 && i < WEEKS) weeks[i]++;
    }
    featured[name] = { url: r.html_url, language: r.language, pushed: r.pushed_at.slice(0, 10), weeks };
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

const data = {
  user: USER,
  asOf: today,
  from: dates[0],
  totalContributions: [...days.entries()].filter(([d]) => d <= today).reduce((s, [, n]) => s + n, 0),
  publicRepos: repos.length,
  weeks,
  pushed,
  featured,
};
await writeFile(OUT, JSON.stringify(data, null, 1) + "\n");
console.log(`github.json: ${data.totalContributions} contributions, ${weeks.length} weeks, ${data.publicRepos} repos, as of ${today}`);
