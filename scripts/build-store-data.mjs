// build-store-data.mjs — builds the web store's data file from the
// App Catalog export.
//
// The App Catalog is the one source for what CashDublo carries:
// every app, game, tool and record, with its name, version, status,
// description, platforms, category and price terms. This script
// reads a catalog export and writes the store's data file,
// store/apps-data.js, which both store pages read:
//
//   - cashdublo-app-store.html  (the storefront shelves)
//   - store/app.html            (one app's store page)
//
// Use:
//   node scripts/build-store-data.mjs <path-to-apps.json>
//
// The path is the App Catalog export (apps.json). The output is
// written next to this repo's store folder. Rows without a display
// name are skipped; every other row becomes one store listing.
// Prices and price terms are carried exactly as the catalog states
// them — the catalog is where a price is set, never this script.

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
  "slug", "display_name", "version", "status", "description",
  "platforms", "category", "price_model", "price", "trial_length",
];

const apps = list
  .filter((r) => r && r.display_name)
  .map((r) => {
    const out = {};
    for (const f of FIELDS) out[f] = r[f] === undefined ? null : r[f];
    return out;
  })
  .sort((a, b) => a.display_name.localeCompare(b.display_name));

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
