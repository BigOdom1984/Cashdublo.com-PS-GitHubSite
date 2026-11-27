# The web store — how it fits together

The CashDublo App Store on the web. It is the web face of the
CashDublo App Store app: the same catalogue, the same shelves,
the same way of getting an app — browse, check the price terms,
and get the app through the store shelf on the CashDublo server.

## The pieces

- `../cashdublo-app-store.html` — the storefront. Its hero and
  shelves come first; the standing information about the platform
  (what it provides, product-specific pricing, security and
  customer protections, availability) stands consolidated at the
  bottom of the same page, complete.
- `app.html` — one app's store page. It reads the app's slug from
  its address (`app.html?app=<slug>`) and shows that app's name,
  version, status, platforms, description, price terms and its
  Get panel. Every listing on the storefront links here.
- `apps-data.js` — the store's data file. **Generated — do not
  edit by hand.** It carries one listing per App Catalog row that
  has a display name: slug, name, version, status, description,
  platforms, category, and the price terms (price model, price,
  trial length) exactly as the catalog states them.

## The one source

The App Catalog (`apps.json` in the catalog's own home) is the
single source for what the store carries. When the catalog
changes, rebuild the data file:

```
node scripts/build-store-data.mjs <path-to-apps.json>
```

The script stands in the site repo's `scripts/` folder and writes
`store/apps-data.js`. Prices are set in the catalog, never in the
store pages: where the catalog carries no price yet, the listing
says so plainly.

## How a purchase works — the honest state

Getting an app runs through the production server's store doors:

- `GET /api/store/catalog` — the shelf: every app the store can
  deliver, with versions, package sizes and recorded fingerprints.
- `GET /api/store/package?app=<id>&version=<v>&piece=<n>` — one
  piece of one package; downloads move in resumable pieces.
- `/api/store/ledger` — the delivery record: did a download land
  is a fact there, not a hope.

The server shelf currently stands **empty**: no app has landed on
it yet, and there is no checkout door. So today a Get button leads
to the shelf door and no purchase completes — the storefront says
so on its face, and each app's page says so in its Get panel. The
moment an app lands on the shelf, the same buttons complete the
purchase and the delivery, with no page change needed. Apps whose
catalog status is still in build (or design, or spec) show their
status in place of a Get button — no purchase is offered for them.

On iPhone, delivery stands within what Apple allows — TestFlight,
and in the European Union the alternative marketplaces, for server
editions. Listings for iOS carry that note on their page.
