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


## Review update — 2026-11-25 (ChatGPT / AI-02)

**Review status:** REVIEWED / PARTIALLY REPRESENTED / PUBLIC-CATALOGUE CHANGES HELD FOR PRODUCT-IDENTITY CONFIRMATION. The original suggestion remains a proposal; this review does not mark it approved or complete.

The current front-ends page already contains entries for Cash Portfolio Web, AI Cash Portfolio Web, Hit Record Web, Name That Flag Web, and HACKED! Web App. This means the original statement that all six are absent is no longer current. However, the entries do not yet match the six source repositories cleanly:

- **Cash Portfolio Web:** Existing card. Its SPEC says version 0.1.0 and status TESTING; package.json is a private 0.0.0 placeholder. Do not display 0.0.0 as a product version or claim a verified release.
- **AI Cash Portfolio Web:** Existing card. Its SPEC says version 0.1.1 and status TESTING; package.json is a private 0.0.0 placeholder. Do not display 0.0.0 as a product version or claim a verified release.
- **Hit Record Web:** Existing card, but it links to the separate hit_record mobile AI-DJ repository. The hit_record_web repository describes a computer-based collaboration ledger; its own CHANGES.md says no web code has been built and the web target is deferred. These are not safe to treat as the same product without an owner decision.
- **Name That Flag Web:** Existing card. Its README describes a local offline prototype with a five-country sample set. It is not a live deployment or verified release.
- **The Hack / HACKED! Web:** The existing HACKED! Web App card links to HACKED..web..app, whose README identifies its product as The Hack. The separate HACKED_web repository identifies itself as the web face of the HACKED! game and says it is in TESTING with nothing claimed built. Do not merge these identities or labels.
- **Kali Linux Training Course Web:** Missing from the current web-app list. Its SPEC says version 0.1.0, PLAYER SHELL / OUTLINE ONLY; it has a shell page but no lesson scripts/content and no production deployment. Any public listing must preserve that limited status.

**Navigation finding:** The shared navigation already links to the Web Apps section on front-ends.html. The webAppLinks array in assets/site-navigation.js is declared but is not used by the rendered drawer. Do not add individual links until real public destinations exist.

**Public-content guardrails retained:** No repository/source links, no inferred platform support, no 0.0.0 placeholder versions, no unsupported feature or availability claims, no pricing, and no download/purchase actions. The Hit Record and HACKED identity conflicts and the public listing wording for Kali require Founder confirmation before cards are added or relabeled.

Detailed source evidence is recorded in reports/WEBSITE-BUILD-READINESS-LEGWORK-20261125.md.
