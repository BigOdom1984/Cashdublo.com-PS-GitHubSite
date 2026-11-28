// build-muse-data.mjs — builds the Muse folder page's registry
// data file from the App Catalog export.
//
// The App Catalog is the one source for what CashDublo carries:
// every app, game, tool and record, with its name, tagline,
// description, category and subcategories, platforms and families,
// form factors, version, status and price terms. This script reads
// a catalog export and writes the Muse folder's data file,
// all websites/muse/registry-data.js, which the folder's page
// (all websites/muse/index.html) reads to draw the full registry
// as cards — the same information the store carries, in the same
// words.
//
// The layout renderings an app carries stand in the catalog's
// site-photos record (slug -> the photo paths, written from the
// site root). Pass that file as the second argument and the 12
// apps that carry renderings get them on their cards; every other
// app gets none — no placeholders are ever invented.
//
// Use:
//   node scripts/build-muse-data.mjs <path-to-apps.json> [path-to-site-photos.json]
//
// Rows without a display name are skipped; every other row becomes
// one registry card. Prices and price terms are carried exactly as
// the catalog states them — the catalog is where a price is set,
// never this script.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const source = process.argv[2];
if (!source) {
  console.error("Use: node scripts/build-muse-data.mjs <path-to-apps.json> [path-to-site-photos.json]");
  process.exit(1);
}

const rows = JSON.parse(readFileSync(source, "utf8"));
const list = Array.isArray(rows) ? rows : rows.apps;
if (!Array.isArray(list)) {
  console.error("The catalog export does not hold a list of rows.");
  process.exit(1);
}

let photos = {};
if (process.argv[3]) {
  photos = JSON.parse(readFileSync(process.argv[3], "utf8"));
}

const FIELDS = [
  "slug", "display_name", "tagline", "description",
  "category", "subcategories", "platforms", "families", "form_factors",
  "version", "status", "price_model", "price", "trial_length",
  "whats_new", "icon", "get_links",
];

const apps = list
  .filter((r) => r && r.display_name)
  .map((r) => {
    const out = {};
    for (const f of FIELDS) out[f] = r[f] === undefined ? null : r[f];
    out.screenshots = Array.isArray(photos[r.slug]) ? photos[r.slug] : [];
    return out;
  })
  .sort((a, b) => a.display_name.localeCompare(b.display_name));

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "..", "all websites", "muse");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "registry-data.js");

const header =
  "// The Muse folder page's registry data — generated, do not edit by hand.\n" +
  "// Source: the App Catalog export (apps.json), the one source for\n" +
  "// what CashDublo carries, with the renderings from the catalog's\n" +
  "// site-photos record. Rebuild with:\n" +
  "//   node scripts/build-muse-data.mjs <path-to-apps.json> <path-to-site-photos.json>\n";

writeFileSync(outPath, header + "window.CD_MUSE_APPS = " + JSON.stringify(apps, null, 1) + ";\n", "utf8");
console.log("Wrote " + outPath + " with " + apps.length + " listings.");
