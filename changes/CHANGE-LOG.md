# Website Change Log

**Repository:** `BigOdom1984/BigOdom1984.github.io`
**Scope:** This website only.
**System-wide master record:** [AI2AISync Master Change Log](https://github.com/BigOdom1984/ai2ai_sync/blob/main/docs/MASTER-CHANGE-LOG.md)
**Policy:** Append entries; do not erase or silently rewrite historical records.

## Status vocabulary

`PROPOSED` · `ASSIGNED` · `IN_PROGRESS` · `STAGED` · `IN_REVIEW` · `APPROVED` · `COMMITTED` · `PUBLISHED` · `VERIFIED` · `BLOCKED` · `REJECTED` · `ROLLED_BACK`

Use only statuses supported by evidence. `COMMITTED` does not imply `PUBLISHED`; `PUBLISHED` does not imply `VERIFIED`.

## Entries

### WEB-CHG-2026-11-19-001 — Record front-end catalogue gap suggestion

- **Status:** COMMITTED — suggestion recorded; implementation NOT APPROVED / NOT STARTED.
- **Scope:** Read-only comparison of the website's Web Front Ends catalogue/navigation against existing browser-based product repository descriptions; record the resulting proposal only.
- **Author:** ChatGPT / AI-02.
- **Reviewer:** NOT ASSIGNED.
- **Founder approval:** The Founder authorized the broader reverse-chronological backlog and the MCL directs suggestions arising from this work into their owning repository. This authorizes recording the suggestion, not implementing it.
- **Files added/updated:** Root SUGGESTIONS.md; root CHANGES.sql; root CHANGES.md; this website-specific change log.
- **Reason and intended outcome:** Six browser-based product interfaces described by existing repository READMEs are absent from the current five-item web-front-end catalogue and navigation. The proposal asks for accurate, development-status entries without implying release, availability, or verified features.
- **Summary of changes:** Added SUG-2026-11-19-001 to SUGGESTIONS.md. No HTML, CSS, JavaScript, navigation, or product data was changed.
- **Risk / impact:** Low; public documentation-only suggestion. Avoids exposing private repository URLs or internal implementation details.
- **Reviewer and review outcome:** NOT REVIEWED.
- **Founder approval reference:** No approval for implementation recorded.
- **Commit SHAs:** SUGGESTIONS.md `609fe0b4b1dbdfed8d7cc6e17f5f8fb51a33ca48`; CHANGES.sql `1c7439ac505e8a3963f76d498cc3ed1fb77197ab`; CHANGES.md `be1c0f83901240af6edc501429dc84d3cb5b37a9`.
- **Publication status:** Git commits made to the public repository; no separate website deployment was initiated or verified.
- **Verification:** PASS for source comparison and file re-fetch; NOT RUN for browser/visual runtime.
- **Checks performed and evidence:** Counted five web-front-end cards and the matching five shared navigation entries. Verified six additional repositories identify their products as browser-based web apps. Read website module v1.1.0; no live browser test was performed.
- **Known limitations / follow-up:** MUSE review and Founder decision required before adding cards/pages. Confirm each web app's actual build state, approved public description, version, route, and live URL first.
- **Rollback plan or reference:** Remove or revise the suggestion only through a dated superseding record; no product code change to roll back.

### WEB-CHG-2026-11-17-001 — Establish website-specific change accountability

- **Status:** COMMITTED — documentation created; workflow adoption not yet independently verified.
- **Scope:** Establish a dedicated `changes/` section for website-only change history and multi-AI accountability.
- **Author:** ChatGPT (AI2AISync coordinator for this task).
- **Reviewer:** NOT ASSIGNED.
- **Founder approval:** Founder explicitly requested this website-specific change section and accountability rules in conversation on 2026-11-17.
- **Files added:** `changes/README.md`, `changes/CHANGE-LOG.md`, `changes/AI-ACCOUNTABILITY.md`, `changes/TEMPLATE.md`.
- **Files updated:** Root `README.md` to link the change-control section.
- **Commit evidence:** See the GitHub commit history for this repository and the exact file paths above. Individual commit SHA is recorded in the AI2AISync master log after the operation.
- **Tests:** Documentation/path review only. No HTML/CSS/JavaScript application code was changed; no website runtime or visual test was run.
- **Deployment:** No manual deployment action performed. GitHub Pages publication behavior is controlled by the repository's existing configuration.
- **Next action:** All AIs contributing to this website must follow `AI-ACCOUNTABILITY.md` and append a record for each material change.


### WEB-CHG-2026-11-19-002 — Establish ChatGPT website edition version baseline

- **Status:** COMMITTED — candidate website folder updated; runtime publication and visual verification NOT RUN.
- **Scope:** ChatGPT-owned website folder only: `ChatGPT/`.
- **Author:** ChatGPT (GPT-6).
- **Reviewer:** Pending independent review by other available AI agents, coordinated through AI2AISync Issue #72.
- **Founder direction:** Founder explicitly changed the workflow: ChatGPT performs implementation; other AIs independently audit the implementation and identify improvements/lessons. This supersedes the earlier MUSE-first implementation routing for this task.
- **Files added:** `ChatGPT/version.json`, `ChatGPT/README.md`, `ChatGPT/CHANGELOG.md`.
- **File updated:** `ChatGPT/index.html` (visible website version label in footer).
- **Website version:** Initial tracked baseline `0.1.0`; status CANDIDATE. This is not the ChatGPT agent version, provider/model version, or official root website version.
- **Commit SHAs:** index.html `95f13a1a85af062610dacc275975701d8d70de3f`; version.json `2daedb1b1215514517d3fd937db5e4cba58e54b9`; README.md `4c1aff0629c813026e5259b4518f13a10380b7af`; CHANGELOG.md `efd76e6de8488127fdf189ef8387494d2fa3ccf4`.
- **Tests:** Source inspection and responsive CSS breakpoint review only. Browser runtime, mobile/tablet/desktop visual checks, live link checks, and accessibility interaction tests are NOT RUN.
- **Publication:** Commits were made to the repository default branch; GitHub Pages publication was not independently checked.
- **Next action:** Other AIs perform independent read-only audits of the ChatGPT folder and submit findings, severity, evidence, and suggested fixes. ChatGPT evaluates and implements accepted improvements, then requests a second audit.


### WEB-CHG-2026-11-24-001 — Synchronize CashDublo app catalogue versions and platform records

- **Status:** STAGED — draft PR #28 is open; independent review pending.
- **Date/time (UTC):** 2026-11-24.
- **Task owner:** Founder.
- **Contributor AI/human:** ChatGPT / AI-02 / GPT-6.
- **AI2AISync task/master-log reference:** [Issue #106](https://github.com/BigOdom1984/ai2ai_sync/issues/106).
- **Branch / pull request:** `chatgpt/app-catalog-source-sync-20261124` · [PR #28](https://github.com/BigOdom1984/Cashdublo.com-PS-GitHubSite/pull/28).
- **Files affected:** `apps.html`, `index.html`, `front-ends.html`, `android.html`, `iphone.html`, `mac.html`, `windows.html`, `linux.html`; app detail pages for AI Cash Portfolio, AI2AISync, App Translator, Apple2Player, Build Manager, Cash Portfolio, CashDublo Coder, Change App Icons, Contracts, Dear Idea Desktop, Galaxy Repeat, GitHub HQ, Hit Record, Mixology, PictureGlobe, Player, PodEdPro, Rebuild-All, Script-Run, Testra Accuracy, TTS Widget, and Wi-Fi Tether.
- **Reason and intended outcome:** The public catalogue had stale source versions, inconsistent platform claims across the All Apps, Front Ends, platform, and app-detail pages, and some release labels that were not supported by current repository evidence.
- **Summary of changes:** Reviewed the 34-entry application catalog from the Cross-Platform Intelligence module, then cross-checked app identity/platform declarations against source repositories and versions against package/app manifests, version constants, READMEs, or platform-specific specifications. Updated source versions and per-platform version splits; corrected app/platform membership across the Android, iOS, Mac, Windows, Linux and Front Ends pages; added the Hit Record Web target with no live-deployment claim; marked untagged web versions as untagged; corrected Cash Portfolio wording to avoid promising unverified live market data/alerts; and clarified source-version versus release status.
- **Risk / impact:** Public-facing catalogue accuracy. No app source, build scripts, backend, store listing, credentials, pricing, or deployment configuration changed.
- **Reviewer and review outcome:** MUSE independent review requested in AI2AISync issue #106; PENDING.
- **Founder approval reference:** Founder explicitly requested the website app/version corrections in this conversation on 2026-11-24.
- **Implementation head SHA before this log entry:** `dfef6c2e5dba89921a34a4586a12c795db63b676`.
- **Publication status:** PR only; not merged. No production deployment or publication is claimed.
- **Verification:** PASS for static source checks; NOT RUN for browser/device/assistive-technology QA.
- **Checks performed and evidence:** All Apps has 34 unique app cards. Platform catalogue counts: Android 23, iOS 13, Mac 12, Windows 5, Linux 2. Front Ends card IDs are unique; the unsupported desktop PodEdPro entry is removed; Hit Record Web is listed. Representative detail pages were re-fetched and checked for corrected version/platform metadata.
- **Known limitations / follow-up:** The Cross-Platform Intelligence module is EXPERIMENTAL, its catalog was generated 2026-11-20, and its records do not include app versions. Its Dear Idea record currently lists Mac/Windows, while the Dear Idea app repository README says iOS/Android; this website follows the app repository evidence and the module record needs reconciliation. Cash Portfolio README says 0.4.1 while package.json/app.json both say 0.4.2. CashDublo Coder source constant is 0.1.0 while its build script stamps 1.0.0 into Info.plist. Separate Cash Portfolio Web and AI Cash Portfolio Web repositories have no tagged version. Browser/device/assistive-technology QA remains outstanding.
- **Rollback plan or reference:** Revert PR #28 or its individual commits before merge; no production files were changed.


### WEB-CHG-2026-11-24-002 — Standardize the All Apps card layout

- **Status:** STAGED — draft pull request pending review and publication.
- **Date:** 2026-11-24.
- **Task owner:** Founder.
- **Contributor:** ChatGPT / GPT-6.
- **Branch:** `chatgpt/all-app-cards-layout-20261124`.
- **File changed:** `apps.html` only.
- **Scope:** The All Apps card section only; platform landing pages and individual app detail pages are not part of this layout change.
- **Card order:** App icon at left and version/release status at right on the same row; app name; app category; app description; Google Play and Apple App Store search links on one row; centered CashDublo app-page link; platform abbreviations on the final row.
- **Platform labels:** WIN, LIN, MAC, AND, iOS, WEB. Android-targeted cards also show DUO/FOLD compatibility as NOT VERIFIED until tested on representative foldable/dual-screen devices.
- **Store-link accuracy:** Existing generic store-search URLs are retained and explicitly labelled as searches, not verified direct app listings. Unsupported platforms display “not listed.” The centered website link opens the app's CashDublo detail page; it is not represented as a direct APK download unless a real download is available on that page.
- **Categories:** Added a concise category label to each of the 34 app cards based on the current public app descriptions.
- **Removed from card layout:** Proposed pricing blocks and screenshot carousels, to keep the requested information hierarchy consistent.
- **Static verification:** 34 cards found; all 34 have icon, version/status, name, category, description, store-link row, centered CashDublo page link, and platform line. No pricing blocks or screenshot carousels remain in the All Apps cards. 23 Android-targeted cards carry the explicit DUO/FOLD NOT VERIFIED marker. Browser/device/accessibility QA NOT RUN.
- **Limitations:** Fold/dual-screen compatibility is not certified. No direct Google Play or Apple App Store listing was verified by this change. The website page link is an app information page, not proof of an available download.
- **Publication:** Not merged; no production deployment claimed.
- **Rollback:** Revert this PR's merge commit on `main`; preserve the audit trail and verify the previous All Apps layout is restored.


### WEB-CHG-2026-11-25-002 — Stage safe web-front-end catalogue corrections

- **Status:** STAGED — draft PR; not merged or published.
- **Date:** 2026-11-25.
- **Contributor:** ChatGPT / AI-02 / GPT-6.
- **Base:** 77a3df64b25e930fa8f20ded9cd3c45aecf1ebbe.
- **Branch:** chatgpt/web-frontends-safe-corrections-20261125.
- **Scope:** The web-app cards in front-ends.html and a focused regression test.
- **Changes:** Cash Portfolio Web and AI Cash Portfolio Web status labels now say TESTING / no live address, consistent with their SPEC files. Name That Flag Web is labeled as a local-only prototype. Kali Linux Training Course Web is listed as Player shell / Outline only / Not live, with the public course overview link. Source repository links were removed from these four cards; existing public overview links are used where available.
- **Held items:** Hit Record Web and HACKED / The Hack were not changed because the current source repositories describe different product identities. Founder confirmation is required before relabeling or adding a second entry.
- **Navigation:** No shared navigation code change was needed; the existing Web Apps route already points to /front-ends.html#web-frontends.
- **Files changed:** front-ends.html; tests/web-frontends-catalog.test.cjs; CHANGES.sql; CHANGES.md; changes/CHANGE-LOG.md; SUGGESTIONS.md.
- **Verification:** Static source-string checks performed during staging; focused Node test added but not run in a repository checkout. No browser/device/accessibility QA, merge, or production deployment.
- **Reviewer:** NOT ASSIGNED; MUSE acknowledgement pending.
- **Rollback:** Revert the staging PR or its commit before merge; main remains unchanged.
