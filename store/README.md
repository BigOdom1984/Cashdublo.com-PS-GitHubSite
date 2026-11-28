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
  Get panel. Every listing on the storefront links here. The
  page also carries the app's star rating (see Ratings below),
  its What's New with the catalog's updated date, a "You might
  also like" rail of similar apps, and a "Talk to the
  developer" panel that opens the reader's own mail app
  addressed to the public CashDublo address — the standing
  contact door, with no form endpoint behind it.
- `cards.html` — all applications as a card stack: every listing
  as a card loaded one over the other in a single stack, built
  for the phone first — scrolling moves through the stack one
  card at a time, each card settles in front, and tapping a card
  opens that app's store page. It reads the same `apps-data.js`
  and carries no data of its own. Two doors lead here: the
  storefront's "Browse all as cards" link and the All apps
  page's hero link. The stack page also links back to the
  storefront shelf for anyone who wants the grid instead.
- `../login.html` — the customer sign-in page. Its Google
  and Apple doors are drawn to each provider's published
  button rules ("Continue with Google" on white with the
  four-color G mark; "Continue with Apple" in white on
  black with the Apple mark), standing full width above
  the GitHub and Microsoft doors. The page reads its
  configuration at load from the server's `/api/auth-config`
  door and enables its doors only when that door answers
  configured; until then every door stands disabled under
  a plain line saying sign-in is not switched on yet —
  nothing is faked. The storefront's hero carries the
  account line that leads here: a Sign in link while
  signed out or dormant, and — once sign-in is switched
  on and a session stands — the signed-in name as the
  provider gave it, with a Sign out control. The
  storefront loads the sign-in library only when the
  configuration door answers configured, so a dormant
  storefront makes no new outside calls.
- `../account.html` — the account page: account settings,
  change password, membership access, and settings for your
  apps. It stands in the same dormant-honest pattern as the
  sign-in page: real surfaces, plainly marked as lighting up
  when accounts switch on, its forms disabled until then —
  nothing faked. The per-app settings surface is a stub that
  fills its picker from `apps-data.js`; the contract those
  settings will speak — and the ratings door's shape — stands
  in `account-contract.md`.
- `apps-data.js` — the store's data file. **Generated — do not
  edit by hand.** It carries one listing per App Catalog row that
  has a display name: slug, name, tagline, version, status,
  description, platforms (in the store's short forms), category
  and subcategories, form factors, get links, what's new, the
  catalog's last-code date, and the price terms (price model,
  price, trial length) exactly as the catalog states them. Two
  fields are shaped by the generator: `ratings` (below) and
  `similar` — up to six listings for the detail page's "You
  might also like" rail: same overall category first (most
  shared subcategories first, then name order), then listings
  sharing a subcategory across categories. Computed from the
  catalog's own declarations; no hand-picked lists.

## Ratings

A listing's `ratings` field is `{ average, count }` when the
catalog carries ratings for the app, and null while it does
not. No ratings stand in the catalog yet — the server's rating
door will collect them from signed-in users and the catalog
refresh will carry the aggregate in (the contract stands in
`account-contract.md`). Until a real number exists, every
surface says "No ratings yet": the shelves, the card stack,
and each app's page. A rating is never invented.

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
