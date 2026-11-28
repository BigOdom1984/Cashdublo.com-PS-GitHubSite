// build-store-data.mjs — builds the web store's data file from the
// App Catalog export.
//
// The App Catalog is the one source for what CashDublo carries:
// every app, game, tool and record, with its name, version, status,
// description, platforms, category and price terms. This script
// reads a catalog export and writes the store's data file,
// store/apps-data.js, which the store pages read:
//
//   - cashdublo-app-store.html  (the storefront shelves)
//   - store/cards.html          (the card stack)
//   - store/app.html            (one app's store page)
//   - account.html              (the account page's app picker)
//
// Use:
//   node scripts/build-store-data.mjs <path-to-apps.json>
//
// The path is the App Catalog export (apps.json). The output is
// written next to this repo's store folder. Rows without a display
// name are skipped; every other row becomes one store listing.
// Prices and price terms are carried exactly as the catalog states
// them — the catalog is where a price is set, never this script.
//
// Two fields are shaped here, not copied:
//
//   - ratings: the catalog's ratings for the app, as
//     { average, count }, when the catalog carries them. No
//     ratings stand in the catalog yet — the store server's
//     rating door will collect them and the catalog refresh will
//     carry them here — so today every listing's ratings stand
//     null and the pages say "No ratings yet". Nothing is ever
//     invented in this script: a number appears only when the
//     catalog states it.
//   - similar: up to six other listings a reader of this app
//     might also like — the store's cross-promotion rail. Same
//     overall category first (most shared subcategories first,
//     then name order), then listings that share a subcategory
//     across categories, in name order. Computed from the
//     catalog's own declarations; no hand-picked lists.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const source = process.argv[2];
if (!source) {
  console.error("Use: node scripts/build-store-data.mjs <path-to-apps.json>");
  process.exit(1);
}

const rows = JSON.parse(readFileSync(source, "utf8"));
const list = Array.isArray(rows) ? rows : rows.apps;
if (!Array.isArray(list)) {
  console.error("The catalog export does not hold a list of rows.");
  process.exit(1);
}

const FIELDS = [
  "slug", "display_name", "tagline", "version", "status", "description",
  "platforms", "category", "subcategories", "form_factors", "get_links",
  "whats_new", "last_code_at",
  "price_model", "price", "trial_length",
];

// The store pages name platforms in their own short forms; the
// catalog's platform names are mapped to those forms here so the
// shelves, the filters and the labels all agree.
const PLATFORM_MAP = {
  "android": "android",
  "ios": "ios",
  "mac": "macos",
  "macos": "macos",
  "windows": "windows",
  "linux": "linux",
  "web": "web",
  "desktop": "desktop",
  "samsung one ui": "samsung-one-ui",
  "launcher": "launcher",
};

function mapPlatforms(platforms) {
  if (!Array.isArray(platforms)) return platforms === undefined ? null : platforms;
  return platforms.map((p) => {
    const key = String(p).toLowerCase();
    return PLATFORM_MAP[key] || key;
  });
}

function ratingsOf(r) {
  const raw = r.ratings !== undefined ? r.ratings : r.rating;
  if (!raw || typeof raw !== "object") return null;
  const average = Number(raw.average);
  const count = Number(raw.count);
  if (!Number.isFinite(average) || !Number.isFinite(count) || count <= 0) return null;
  return { average: average, count: Math.floor(count) };
}

const apps = list
  .filter((r) => r && r.display_name)
  .map((r) => {
    const out = {};
    for (const f of FIELDS) out[f] = r[f] === undefined ? null : r[f];
    out.platforms = mapPlatforms(r.platforms);
    out.ratings = ratingsOf(r);
    out.similar = [];
    return out;
  })
  .sort((a, b) => a.display_name.localeCompare(b.display_name));

function sharedSubcats(a, b) {
  const mine = new Set(a.subcategories || []);
  return (b.subcategories || []).filter((s) => mine.has(s)).length;
}

for (const a of apps) {
  const sameCategory = apps
    .filter((b) => b.slug !== a.slug && a.category && b.category === a.category)
    .sort((x, y) => (sharedSubcats(a, y) - sharedSubcats(a, x)) || x.display_name.localeCompare(y.display_name));
  const crossCategory = apps
    .filter((b) => b.slug !== a.slug && b.category !== a.category && sharedSubcats(a, b) > 0)
    .sort((x, y) => x.display_name.localeCompare(y.display_name));
  a.similar = sameCategory.concat(crossCategory).slice(0, 6).map((b) => b.slug);
}

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "..", "store");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "apps-data.js");

const header =
  "// The web store's data file — generated, do not edit by hand.\n" +
  "// Source: the App Catalog export (apps.json), the one source for\n" +
  "// what CashDublo carries. Rebuild with:\n" +
  "//   node scripts/build-store-data.mjs <path-to-apps.json>\n" +
  "// See store/README.md for how the store fits together.\n";

writeFileSync(outPath, header + "window.CD_STORE_APPS = " + JSON.stringify(apps, null, 1) + ";\n", "utf8");
console.log("Wrote " + outPath + " with " + apps.length + " listings.");
