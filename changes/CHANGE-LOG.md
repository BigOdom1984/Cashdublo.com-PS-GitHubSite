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


### WEB-CHG-2026-11-25-001 — Repair newsletter comments and contact accuracy

- **Status:** STAGED — isolated draft branch; independent review and CI pending.
- **Date/time (UTC):** 2026-11-25.
- **Task owner:** Founder.
- **Contributor AI/human:** ChatGPT / GPT-6.
- **AI2AISync task/master-log reference:** Founder-directed website audit corrections; follow-up to AI2AISync issue #110.
- **Branch / pull request:** `chatgpt/newsletter-audit-fixes-20261125` · [Draft PR #33](https://github.com/BigOdom1984/Cashdublo.com-PS-GitHubSite/pull/33).
- **Files affected:** `site.js`, `assets/site-navigation.js`, `repositories.html`, `SUGGESTIONS.md`, `make_platform_pages.py`, `tests/newsletter-contract.test.cjs`, `.github/workflows/site-validation.yml`, `CHANGES.sql`, `CHANGES.md`, this file. `news.html` was restored byte-for-byte to the base branch and is not part of the final diff.
- **Reason and intended outcome:** Correct confirmed newsletter comments dead-end, stale active contact address, duplicate stylesheet injection, and popup overlay timeout behavior without changing unresolved user-facing policy or competing with existing website PRs.
- **Summary of changes:** The shared `site.js` now creates an accessible comments dialog when a page has a comments opener but lacks a panel, returns focus after closing, and uses the approved email. The popup waits for age/welcome overlays to dismiss using MutationObserver, with a polling fallback that does not force-open after a fixed timeout. `assets/site-navigation.js` now checks both its marker and existing stylesheet before injecting CSS. Remaining active root contact references and the generator template were aligned with the approved address. Added a Node contract test and CI step.
- **Risk / impact:** Low-to-moderate; public-facing comments workflow and shared navigation/popup behavior. The form remains mailto-based; it does not collect or send data server-side.
- **Reviewer and review outcome:** MUSE / independent reviewer NOT YET RECEIVED. MUSE profile currently records `PROFILE_CREATED_NOT_CONNECTED`; do not treat this handoff as reviewed.
- **Founder approval reference:** Founder instructed ChatGPT to proceed with the website audit corrections in conversation on 2026-11-25. Scope is limited to the defects above; no production publication or merge authorized.
- **Commit SHAs:** SQL-first record `cfbde8794abd6b7fe8ecc2cc1383c9db79bb3655`; site script `c2370a23b5f9057cf28ac2168df337d9ea835ead` and follow-up dialog `20447d917750403eeba92be82f2f0f5478d3e0bb`; stylesheet loader `42c57a3d7af8999794b8e615703129fb96b969be`; repository contact `da2b14b5ebf05260b2429eec2bcf871789a266b1`; suggestions contact `32569f4b4422ac449933188d15d7b55084b4cb34`; generator template `01b949460ac2a2c7adf060c9bcc2cbb77265527e`; regression test `073aa49a6ca508eb90091f8cc7ca11d6effe0f8e` and update `1ed76a41320e71552c55a42681f3674f6cb3ea09`; CI `684805d17c2a4a6d6c768afeeb5668b6d6068376`; scope restoration `c742aa264cd027d0d0ffd593437f6a80814d5d68`.
- **Publication status:** Branch only; no merge or deployment.
- **Verification:** NOT RUN for CI at log creation; source read-back completed. Browser/device/screen-reader QA NOT RUN. Generator NOT EXECUTED.
- **Checks performed and evidence:** Re-fetched the changed source files from the isolated branch; confirmed `news.html` content matches main and the dynamic comments panel is created by `site.js`. Added static assertions for modal, mailto, overlay, and stylesheet behavior. CI result pending.
- **Known limitations / follow-up:** Check the draft PR's CI result and have an independent reviewer inspect the diff. Keep birthday copy/date, Spotify behavior/privacy, age-gate policy, app catalogue claims, pricing, and product identity decisions separate. The existing PR #11 overlaps historical website files; the final patch avoids a net `news.html` change, but change-log files may still require reconciliation with other open PRs. The generator template was edited but not run because the Founder build-readiness directive holds generator execution until its safety gates pass.
- **Rollback plan or reference:** Revert the isolated branch/PR commits; no main-branch or production change has occurred.


#### Verification follow-up — WEB-CHG-2026-11-25-001

- **GitHub Actions:** [Run 45613943172](https://github.com/BigOdom1984/Cashdublo.com-PS-GitHubSite/actions/runs/45613943172) — JavaScript syntax checks PASS; `navigation-contract.test.cjs` PASS; new `newsletter-contract.test.cjs` PASS.
- **Existing suite failure:** `responsive-layout.test.mjs` FAILS because unchanged `index.html` does not use the standard green header required by the test. `index.html` is not part of PR #33; the separate existing PR #11 is the navigation/header workstream. This is recorded as a baseline blocker, not attributed to the newsletter patch.
- **Cloudflare Pages check:** completed successfully for the PR check.
- **Overall CI:** FAIL due to the existing responsive-layout contract failure. No tests were bypassed or removed.
- **Browser/device/screen-reader QA:** NOT RUN.
