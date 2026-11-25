# Suggestions

Have an idea that would make this app better? This is the place for it.

## How to suggest

Write it in plain words:

- **What** — the change or new thing you want, in one or two lines.
- **Why** — what it helps with, or what problem it fixes.
- **Where** — which screen or part of the app it belongs to, if you know.

Short is fine. One idea per suggestion is best — a list of separate
ideas is read as separate suggestions, not one big one.

## What happens next

Suggestions are read and weighed. The best ones get built in a later
round; the rest stay on file — an idea that does not fit today may fit
later, and nothing filed here is thrown away.

A suggestion is a pitch, not an order. Nothing here promises a date,
and an idea is only in the app when a released version says it is.

## Who reads this

CashDublo reads every suggestion. To reach us directly:
CashDublo@gmail.com · BigOdom1984 on GitHub · @cashdublo on Instagram.


## SUG-2026-11-19-001 — Complete the web front-end catalogue

- **Author:** ChatGPT / AI-02, from the 2026-11-19 website/front-end consistency audit.
- **Status:** SUGGESTED / NOT APPROVED / NOT IMPLEMENTED.
- **What:** Add clear, factual catalogue entries for the six existing browser-based products not currently represented in the Web Front Ends section: Cash Portfolio Web, AI Cash Portfolio Web, Hit Record Web, Name That Flag Web, The Hack Web, and Kali Linux Training Course Web. Update the shared Front Ends navigation to match.
- **Why:** The current front-end page and shared navigation list five web front ends, while six additional web-app repositories describe browser-based product interfaces. The website module requires the front-end catalogue and navigation to remain aligned with verified products.
- **Where:** front-ends.html, assets/site-navigation.js, and public explanatory pages only if their content can be stated accurately from approved product information.
- **Guardrails:** Mark each item as development/planned unless a first build and live URL are verified. Do not invent features, versions, platform support, pricing, security claims, or availability. Do not expose repository URLs, source code, internal implementation details, or private repo names. Do not add download/purchase actions until verified destinations and approvals exist.
- **Evidence:** website-module README v1.1.0; repository README records for the six web products; 2026-11-19 source audit of front-ends.html and assets/site-navigation.js.
- **Next step:** MUSE review, then Founder decision. No website code change is authorized by this suggestion alone.


## Staging update — 2026-11-25 (ChatGPT / AI-02)

**Status:** PARTIAL CORRECTIONS STAGED / REVIEW PENDING / NOT MERGED.

A separate draft PR stages safe, evidence-backed updates:
- Cash Portfolio Web and AI Cash Portfolio Web labels now say TESTING / no live address, matching their current SPEC files.
- Name That Flag Web is labeled as a local-only prototype.
- Kali Linux Training Course Web is added as Player shell / Outline only / Not live; no lessons or production deployment are claimed.
- Repository/source links are removed from those four cards; public overview links are used where available.
- A focused regression test is added for status, link and navigation requirements.

Hit Record Web and HACKED / The Hack remain unchanged pending Founder confirmation of their product identities. The existing shared Web Apps navigation already points to the catalogue, so no navigation source change is needed. The PR is staged only; the test has not yet been run in a repository checkout, and no merge or production publication has occurred.

Detailed evidence and the related documentation-only audit are in the website readiness draft PR #31.
