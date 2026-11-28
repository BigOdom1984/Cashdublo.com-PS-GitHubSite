# The account doors — the contract the sync round builds to

Written 2026-11-28 with the store's Play-Store-class round. This
note is the spec the server's sync round implements against: the
account page (`../account.html`) already carries the surfaces;
this contract is the shape of the data behind them. Nothing here
is live yet — accounts switch on at the switch-on sitting, and
these doors open with the sync round after it.

## Ratings — how a number reaches a store page

- A signed-in user rates an app they have: one rating per
  account per app, 1–5 stars, changeable. The rating door on the
  server takes `{ app: <slug>, stars: 1..5 }` from the session —
  never from the page's word alone.
- The server keeps the individual ratings (the shelf's own
  store, beside the delivery ledger) and the aggregate:
  `{ average, count }` per app.
- The nightly catalog refresh carries the aggregate into the
  App Catalog as the app's `ratings` field, in exactly that
  shape. `scripts/build-store-data.mjs` passes it through to
  `store/apps-data.js`; the store pages render stars, average
  and count from it — and render "No ratings yet" while it
  stands absent. No page and no script ever invents a rating.

## Per-app settings — an app's settings, held by the account

Some apps carry settings that belong to the user, not to one
device. Those settings are changeable from the website's
account page and read by the app through the server.

### Who declares what

- Each app declares its account settings in its own record:
  the setting keys, their kinds (switch, choice, text, number),
  their plain-words labels, and their defaults. The website
  offers exactly the settings an app has declared — never a
  setting invented for it — and the app validates every value
  against its own declaration before applying it.
- A setting an app marks **premium** in its declaration is
  offered only to accounts holding that app's entitlement
  (its membership or purchase, per the app's own terms). The
  entitlement check is the server's, from the receipts it
  validates itself — the same door as the store's licensing.

### The document

One settings document per account per app, held by the server:

```json
{
  "app": "<slug>",
  "version": 1,
  "updated_at": "<ISO timestamp>",
  "values": { "<setting key>": "<value, per the app's declaration>" }
}
```

### The doors

- `GET /api/account/app-settings?app=<slug>` — the signed-in
  account's document for that app (an empty document at the
  app's declared defaults when none stands yet).
- `PUT /api/account/app-settings?app=<slug>` — replace values;
  the server stamps `updated_at` and bumps `version`. Writes
  come from the account page and from the app itself, through
  the same door, under the account's own session.
- The app reads its document when it starts signed-in and when
  it next checks in; it applies the values over its local
  defaults. Off-line, the app works from its last-read copy —
  a settings door being closed never stops an app working.

### Conflicts

Last write wins, per setting key, by the server's `updated_at`
— the document is small, the settings are the user's own, and
no merge machinery is warranted. A value a newer app version
no longer declares is kept in the document (data is never
destroyed) and simply not applied.

## Membership standing

The account page shows memberships from the same entitlement
record the store's licensing reads: app, what it opens, its
standing, its renewal date where the billing module states
one. A membership taken out inside an app (through the app
stores' billing on those copies, or the house licensing on
direct copies) is recorded against the same account, so the
premium side it opens is honored on every surface the account
signs into.
