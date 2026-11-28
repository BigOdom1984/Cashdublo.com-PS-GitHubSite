## 2026-11-28 — The app detail screen, everything at once

Clicking an app card now opens a detail screen that shows everything about the app on one screen: the full description, tagline, what's new, the standing price and Get doors, and the app's layouts as a carousel — one at a time on a phone, three side by side with arrow controls on larger screens. An app with no renderings shows no carousel. The carousel lights up fully as the store data file gains the renderings field.

## 2026-11-28 — Customer sign-in on the website: Google and Apple

Customer sign-in on the website (the President's order 2026-11-28: implement the Google and Apple sign-ins for the website — the site only, not the apps). The customer login page, `login.html`, already stood with its doors wired to the server's `/api/auth-config` configuration door and its honest dormant state; this round finishes the website side. The Google and Apple buttons are now drawn to each provider's published button rules — Google: a white button carrying the four-color G mark and the words "Continue with Google"; Apple: a black button carrying the Apple mark and the words "Continue with Apple" — each standing full width above the GitHub and Microsoft doors, which keep their standing shape. The buttons stay disabled until the configuration door answers switched on, and the page keeps its dormant wording while it does not: no fake sign-in, no simulated session, ever. The storefront (`cashdublo-app-store.html`) gains the account line in its hero: a Sign in link to the login page while signed out or dormant, and — once sign-in is switched on and a session stands — the signed-in name as the provider gave it, with a Sign out control. The storefront reads the same configuration door and loads the sign-in library only when that door answers configured, so a dormant storefront makes no new outside calls. `store/README.md` records the sign-in piece. On the server side (its own repo, same round) the configuration door learned the public website face's origin — a browser only lets a page read an answer from another address when the answer carries that page's own origin as a reading permission, and the standing list did not carry the public Cloudflare Pages face, so the login page on the public site could never have read its configuration there. No other page's behavior changes.

**Verification:** built against pinned site head `c9ce75c835408283d0d972250f87e64f5e094933`. Both edited pages' inline scripts pass `node --check`. A Node proof harness ran the storefront account script against stubbed configuration answers in three states: with the door answering not configured, the Sign in link stands and no sign-in library is loaded; with the door answering configured and a session standing, the account line shows the signed-in name and its Sign out control returns the line to the Sign in link; with the door answering configured and no session, the link stands. The login page's provider buttons were checked for the providers' marks, wordings, and starting disabled state, and its dormant wording path stands untouched. The site's own tests (`tests/navigation-contract.test.cjs`, `tests/responsive-layout.test.mjs`) pass. `CHANGES.sql` loads clean in sqlite with this round as its newest row. The server half was proven in its own repo: the whole suite passes (`npm test`, exit 0), including new door-level checks that the public face receives its reading permission and a stranger's origin receives none.

## 2026-11-27 — All applications as a card stack

All applications as a card stack (the President's order 2026-11-27 21:42): a new store page, `store/cards.html`, carries every one of the 155 catalogue listings as a card loaded one over the other in a single stack. It is built for the phone first — full-width cards in one scrolling stack, each card settling in front as you scroll, the cards already passed peeking at the top edge so the stack reads as a stack; on wide screens the same stack stands centered at card width, never a grid. Each card carries the same facts as its shelf card — name, version, description, platform marks, and the price terms or status exactly as the catalog states them — and tapping a card opens that app's store page, `store/app.html?app=<slug>`. The stack reads the store's one data file, `store/apps-data.js`; it carries no data of its own, so the catalog stays the single source. Two doors lead to the stack, so the click the President described lands there from either side: the storefront (`cashdublo-app-store.html`) gains a "Browse all as cards" link beside its listing count, and the All apps page (`apps.html`) gains a matching link in its hero. The stack page links back to the storefront shelf for anyone who wants the grid. The page keeps the standard navigation and the SUNLIGHT theme block, and `store/README.md` records the new piece. No other page's behavior changes.

**Verification:** built against pinned site head `abb7854c21ab6efe8bc147d0c8703b3ae52c1867`; read-back verification required.

## 2026-11-27 — The App Store page becomes the web store

The App Store page becomes the web store (the President's order 2026-11-27 21:30): cashdublo-app-store.html is rebuilt as the working web face of the CashDublo App Store — the store app's shelves carried to the web in the house theme. The storefront carries a search box, kind and platform browsing, and one listing card per App Catalog row with a display name — 155 listings — each card showing the name, version, description, platform marks, the price terms exactly as the catalog states them (a free trial, free with ads, or price TBA where the catalog sets none), and the app's status. Every listing links to its own store page, store/app.html?app=<slug>, with the full description and its Get panel. Listings are driven by store/apps-data.js, generated from the App Catalog export by the new scripts/build-store-data.mjs, so the catalog stays the single source; store/README.md records how the store fits together and how the data file is rebuilt. The purchase path is wired honestly to the production server's store doors (the shelf door /api/store/catalog, the package door, the ledger door): apps whose status is Builds and stable or Live carry a Get action to the shelf door, and both the storefront and each Get panel state plainly that the server shelf stands empty today, so no purchase completes until an app lands on the shelf; apps still in build, in design or at spec stage show their status instead of a Get action. iOS listings carry the store SPEC's honest-limits note (TestFlight and the EU alternative marketplaces for server editions). The old page's information stands consolidated complete at the bottom of the storefront: what the platform provides, product-specific pricing, security and customer protections, and availability — nothing it said is lost. The page keeps the standard navigation and the SUNLIGHT theme block.

**Verification:** built against pinned site head `3dcf429ae04bf62b9d32202aabce51b53d16f65f`, the store app's SPEC at cashdublo-app-store `e767ae4f`, and the production server's store handlers at `7527c501`; read-back verification required.

## 2026-11-24 — Repository inventory count corrected to latest fleet sweep

The repository overview now reports 146 repositories from the latest November 24 fleet sweep, replacing the older November 21 snapshot of 142. The App Catalog remains a separate count of 152 records. The page explicitly warns that repository totals can vary by inventory script and should retain their source and date.

**Verification:** Prepared against pinned site head `a865226f6e7b1f3ab2fdb28f530ed3ba3a572f7c`; read-back verification required.

## 2026-11-24 — App Catalog count separated; unsupported prices removed

The home and repository overview now distinguish the App Catalog's 152 records from the separately dated repository inventory count (142 at the November 21 snapshot). The repository figure remains explicitly identified as an inventory snapshot, not an app count. The memberships page no longer presents unsupported numerical prices or unapproved free-tier prices as offers; it labels pricing as unpublished. The website-design page removes all package and support price estimates pending catalog-backed approval. The course page's unsupported annual revenue amount was removed while preserving the surrounding lesson content. No checkout, subscription, or paid offer is activated. The canonical App Catalog currently contains no approved price values.

**Verification:** Changes prepared against pinned site head `b5b3022557a34a8f01f32df2fabfe53f97ebebe6`; read-back and commit verification required before delivery.

# Changes — the default website (root)

## 2026-11-22 — Site links now work from any address

Every page pointed at the server root for its styles, icons and other pages — addresses written as if the site always sits at the top of its host. On the GitHub Pages address, where the site lives under the repo's name, every one of those missed and the pages came up broken. The links in all 61 pages are now written relative to each page, so they land right whether the site is served from the root or under the repo name. The shared navigation script now works out the site's root from its own address and builds its links from that, so the menu, the footer links and the platform pages' app lists work from any address too. No link points at a different page or file than before — only the way the address is written changed.

## 2026-11-22 — Live site link moved to the preview address

On Cash's choice, the readme's live site link now points at the preview address — chatgpt-cashdublo-navigation.bigodom1984-github-io.pages.dev — the copy he checked and confirmed valid, and the line saying where the site is served names that address. The version links and the products link are unchanged: the version pages do not exist on the preview copy (they answer 404 there and 200 on GitHub Pages).

## 2026-11-22 — The live site link now points at the working site

On Cash's word, the working official website is the Cloudflare Pages copy at cashdublowebsite.pages.dev, so the readme's live site link now points there, and the line saying where the site is served names that address. The version links (ChatGPT, muse, Grok) and the products page link keep the full GitHub Pages address: checked live, those pages answer 404 on the Cloudflare copy and 200 on GitHub Pages.

## 2026-11-22 — Readme website links corrected again — the repo name belongs in the address

The fix in the entry below was still not right, and this entry corrects it. Since this repo was renamed, GitHub Pages serves the site under the repo's name, so the links also need Cashdublo.com-PS-GitHubSite in the address. Without it they land on a page that does not exist — checked live: the short address answers 404, the full address answers 200. The live site link, the ChatGPT, Onyx (muse) and Grok version links, and the products page link now carry the full address, and the line saying where GitHub Pages serves the site names the full address too.

## 2026-11-22 — Readme website links fixed

Four links in the readme were missing part of the web address and led nowhere: the live site link and the links to the ChatGPT, Onyx (muse) and Grok versions in the all websites folder. All four now carry the full bigodom1984.github.io address. Every other link in the readme was checked against the files in this repo and stands correct.

## 2026-11-22 — Repo links corrected to the repos' current names

Five links pointed at names the repos no longer carry. The course page now links to CashDublo...Online...Course, god...mode...training...course and kali...linux...training...course (the repos' real names, with three dots where the links had one). The Front Ends page and the all-websites viewer now link to Cashdublo.com-PS-GitHubSite instead of the old BigOdom1984.github.io name. One link was left as it stands: the Back Ends page points at cashdublo-server, a repo that no longer exists under that name — where the shared server's code lives now needs a ruling before that link can be corrected.


## 2026-11-22 — Card names on one line; platform abbreviations at the bottom of every All Apps card

**Before:** App names could wrap mid-word on narrow cards, and after the earlier card cleanup the All Apps cards carried no platform line at all.

**After:** Every app name now sits on one line under the icon at the far left — long names shrink to fit the card instead of wrapping. Every All Apps card ends with its platform abbreviations at the bottom (for example IOS · ANDROID, MAC · WIN), the same style the Featured cards already use. No card carries a "Platforms:" line in its middle. The same layout was applied to the apps page on the ai-02/chatgpt-apps-nav-match-2026-11-20 branch, which is what the chatgpt-cashdublo-navigation preview shows.


## 2026-11-22 — Featured cards show platform abbreviations at the bottom

The four Featured Apps cards on the home page now end with a short platform line in abbreviations: Marvin — IOS · ANDROID, PictureGlobe — ANDROID, Mixology — ANDROID, Hit Record — ANDROID · WEB. The All Apps cards stay as they are.


## 2026-11-22 — App cards rebuilt to one default layout

**Before:** On the All Apps page and the home page Featured Apps, each card stacked its version pill under the icon with the text locked to one line, so a long version line spilled outside its bubble. Most cards also carried two pricing blocks and a separate Platforms line at the bottom.

**After:** Every card now puts the icon and the version bubble side by side at the top — that is the default version location. The bubble has a clear outline and its text wraps to fit inside it. The app name sits under the icon at the far left. Cards keep one pricing block, the separate Platforms line is gone (platforms still stand on each app's own page), and every app that has screen renders on the site now shows them in a scrolling row with arrows: 12 apps on the All Apps page, and Mixology and Hit Record in Featured Apps. Apps without renders yet (Marvin, PictureGlobe, IG Watch, Galaxy Repeat, VoiceModel and the rest) join the scroller as their renders are made.


## 2026-11-19 — ChatGPT / AI-02 — Navigation standard v2 repair

**Before:** The home page had a separate inline header with hover-only dropdowns and no shared drawer. The other listed root pages loaded legacy navigation assets, and the Front Ends menu repeated Galaxy Repeat, Best Mac File Manager, Patent It!, Crash Catcher, and PodEdPro.

**After:** The home, All Apps, Courses, Source Code, Newsletter, Front Ends, Android, iPhone, Mac, Windows, Linux, and Command Tools pages now use the canonical assets/cashdublo-nav.css and assets/cashdublo-nav.js from NAVIGATION-STANDARD.md v2.0: a stationary green 72px header and slide-down drawer. Existing page content and routes outside the header were left in place. The shared drawer preserves the site's navigation destinations and lists each destination once. The shared site enhancer now leaves standard header markup intact instead of replacing it.

Keyboard opening moves focus into the drawer; Tab and Shift+Tab cycle through visible drawer controls; Escape closes and returns focus to the toggle; outside pointer interaction closes the drawer; and reduced-motion preference removes the slide and close delay. Responsive CSS retains four columns on desktop (1280px+), two on tablet (768–1024px), and one on phone (360–430px), with a bounded, scrollable drawer.

Regression tests and CI now check canonical integration across all 12 pages, unique drawer destinations, the responsive breakpoints, keyboard/pointer behavior hooks, reduced motion, and the existing hosting configuration. **Browser-based visual testing at the requested viewport sizes and screen-reader testing have not yet been performed.** SQL record was written first in CHANGES.sql, as required.


This log applies ONLY to the default
website in the root folder. Each AI's
version folder carries its own
independent change log.

## 2026-11-19 — ChatGPT / AI-02

Recorded a non-approved suggestion after comparing the front-end catalogue and shared navigation with the current web-app inventory: six browser-based product interfaces are not yet listed. The suggestion is in SUGGESTIONS.md. No website code, navigation, deployment, or product availability claim was changed. SQL record: CHANGES.sql. Suggestion commit: `609fe0b4b1dbdfed8d7cc6e17f5f8fb51a33ca48`.


## 2026-11-19 — CashDublo

The shared site navigation now uses a stationary CashDublo wordmark in a 72px green header. The entire bar is the menu hit surface; the drawer slides over the page without moving the logo or layout. The reusable component supports keyboard focus, Escape and outside-click close, reduced motion, and responsive desktop/tablet/phone layouts. Added the navigation standard and contract tests.


## 2026-11-19 — CashDublo

The shared drawer component now initializes itself after the page DOM is ready. Initialization is idempotent, so both standalone app sites and the main-site loader can use the same component safely.


## 2026-11-19 — CashDublo

Extended the shared drawer component to read its drawer ID from `aria-controls` and close on app-specific buttons marked `data-cd-close`. This supports account actions such as sign-out without duplicating drawer behavior.

## 2026-11-17 — Onyx (General), on the President's order

Autoplay, built properly, and the banner fits its view. The birthday song now runs through a single sound engine for the newsletter area — Spotify's player API, told to play the moment it loads, retried on the visitor's first touch anywhere for browsers that hold sound until a touch — so it starts on its own every time a browser allows sound, and any sound added to this area later uses the same door. The site also stamps its visitor's view (mobile, tablet, or desktop), and the birthday banner aligns with it: desktop lines up with the page's column; tablet and mobile fit their screens.

## 2026-11-17 — Onyx (General), on the President's order

The birthday song starts on its own, and the banner is dressed. The pop-up birthday card's player for "Just the Two of Us" now autoplays when the card opens; where a browser holds sound until the visitor first touches the page, that first touch anywhere starts it — closing the card still stops the song. On the banner strip (home and newsletter pages): balloons rise off the banner, and a present hops with excitement at the end of the line, clear of the words.

## 2026-11-17 — Onyx (General), on the President's order

The song joins the birthday banner. The newsletter pop-up's birthday card now carries "Just the Two of Us" — the original Grover Washington Jr. recording with Bill Withers — through Spotify's own player, for a week (through November 24). Closing the card stops the song. The recording plays through Spotify's player because it is not a recording the President owns the rights to host; his own rights-owned songs are what the production websites will host directly.

## 2026-11-17 — Onyx (General), on the President's order

A birthday banner for the President's father stands on the home page and the newsletter page, and the newsletter pop-up carries it as a special edition: Happy Birthday, Dad — thanks for giving me my first computer at 13. Look at me now. It stands through November 17 and takes itself down at the day's end. It is the only newsletter of this week; normal editions resume in a week.

## 2026-11-17 — Onyx (General), on the President's order

The Newsletter presentation refined: compact first, never grandiose. On the page, each item shows its first sentence with a little down caret that opens the fuller detail. In the pop-up card the photo is smaller, every story starts closed behind its caret, and the close button floats — in reach at any scroll point, with the same close standing at the bottom — so a reader can close at any time, even under an exhausting amount of news.

## 2026-11-17 — Onyx (General), on the President's order

The Newsletter stands on the site (Module #68). A new page, news.html, carries short plain-words editions about what is going on at CashDublo, backfilled from the beginning in dated editions and sorted by kind — Apps, The Website, Behind the Scenes, Travel and Life — with a filter so older editions can be read by kind alone. A newsletter card pops up once per visit on the site's pages: dismissible, back again next visit, with a photo and tappable stories. The Newsletter link stands in the navigation of the home, apps, front-ends, code, and privacy pages. The President's content law stands over it: no private information about him, and no app in a legal gray area is ever advertised in the newsletter.

## 2026-11-17 — Cohere (Grammar Lead), checked by Onyx (General)
- First grammar pass over the default website: no true grammar errors found; the pages stand. Style suggestions and a product-name flag were refused at the check (Apple Dextop is deliberate).

## 2026-11-17 — Onyx (General), on the President's order
- Status rule corrected across the site:
  DEVELOPMENT = the building process (no
  first build yet); BETA = a first build
  exists — most apps are Beta until
  version 1.0.0. Versioned cards and
  listings flipped accordingly.
- Per-AI version folders added: Gemini/,
  Cohere/, NVIDIA/, Workers-AI/ — each
  seat builds its own version there, with
  its own independent change log.
  (Written after the CHANGES.sql entries,
  per the law.)

## 2026-11-17 — Onyx (General)
- Accurate app versions, collected and automatic: versions.json (from the Version Register) + sync_versions.py now drive every version the site shows, applied during every website change. First corrections: Contracts card 0.4.0; PodEdPro and Galaxy Repeat front-ends entries 0.4.0. (Written after the CHANGES.sql entry — the last step, per the law.)

## 2026-11-17 — Onyx (General)
- New sub page: course.html — the Module Course (all 60 modules as course units for the teaching app) and the games created for the HACKED! console. Linked from Home and All Apps as "The Course & Games." (Written after the CHANGES.sql entry — the last step, per the law.)

## 2026-11-17 — Onyx (General)
- New sub page: code.html — The Code. Visitors see that code exists for the apps (plain file listings, text only); nothing opens a file and nothing can be modified past that screen. Linked from Home and All Apps. (Written after the CHANGES.sql entry — the last step, per the law.)

## 2026-11-17 — Onyx (General), on the President's order
- The animated founder GIF comes off the home page for now; the GO orb stands in the portrait spot again (the GIF file stays in the repo). The site code audit's fixes land in the same round: app icons lazy-load with set dimensions, the shared scripts moved into one cached site.js, and the privacy page's style blocks are merged. The audit (Gemini read, the General examined) found privacy CLEAN — no trackers, no third-party calls.


## 2026-11-20 — Onyx / AI-01 — Contact email replaced site-wide; website icon added

**Before:** The site's contact email read CashDublo@gmail.com, and the website had no icon of its own in the browser address bar.

**After:** On the President's order, every CashDublo@gmail.com on the site is now cash.dublo@gmail.com — the root pages, the app pages, the front-end pages, and the AI version folders. The website icon (the gold CashDublo mark) now stands at the root as favicon.ico, favicon-32.png, and apple-touch-icon.png, with a copy in every AI folder, and every page head carries the icon links so it loads in the address bar. SQL record was written first in CHANGES.sql, as required.


## 2026-11-20 — ChatGPT / AI-02 — Full green header opens the menu

**Before:** The transparent menu button covered the green header, but the CashDublo wordmark sat above it as a home link. Tapping the brand therefore navigated away instead of opening the menu.

**After:** The CashDublo wordmark now toggles the same shared drawer. The full green header—including the wordmark and blank green space—opens or closes the menu on touch and mouse. The wordmark remains stationary; Home is still available inside the drawer. The shared interaction remains keyboard-operable and keeps its existing Escape, focus-return, outside-pointer-close, and reduced-motion behavior. Added a regression assertion for brand activation. SQL record was written first in CHANGES.sql, as required.

**Verification limit:** Source-level regression assertion added; real phone/tablet/desktop touch and keyboard interaction still requires browser/device QA. No production deployment was made.

## 2026-11-20 — Onyx / AI-01 — The link hub and the production plan

**Before:** The Front Ends page listed the front ends and the apps, but the live doors were not gathered in one place, the web apps had no set-up entries of their own, and no record stated how the production site would be shaped.

**After:** The page opens with **The Doors — live links**: the CashDublo Server back end (live, linked) and this Showcase (live, both addresses), with the built App Store doors named plainly as switching on with the next server update. A new **Web Apps** section sets up every web app with its true state and its repository link — Travel Journal Web dormant until its deploy keys are set, the rest built with no live address yet; nothing is linked that is not live. **PRODUCTION-SITE-PLAN.md** added to the repo: the President's decision (2026-11-20) that production is cashdublo.com, built clean and segmented by job; this site stays the link hub and workshop; the server update and new layouts are the President's own round on his server; the hub and the nightly check stay on the General's desk.

**Verification limit:** Page source checked at build time; the new sections render in the page's existing card style. A live visual pass rides the next site check.

## 2026-11-20 — Onyx / AI-01 — The theme shelf

**Added:** The `themes/` folder. The standard (themes/README.md): a CashDublo theme ships as a compatible pair — `.wthm` for web faces, `.athm` for applications — one core of the 21 color jobs in each file, the `.wthm` adding the mapping onto the site's CSS variables. The shelf: the six house themes as pairs (Porcelain, Obsidian Gold, Midnight Slate, Goldbone, King, Queen), built from the theme module's own palette records, every role filled, nothing re-picked, with `index.json` listing them. The masters live here because the hub serves them directly — every web face can fetch its `.wthm` today, and the apps take their `.athm` through the server's update doors when the server round comes.

## 2026-11-20 — Onyx / AI-01 — The finished-server copy

**Added:** To PRODUCTION-SITE-PLAN.md, on the President's order — when the production server is finished, a copy of its website goes into a repository called **Current Production Server** (hyphen form on GitHub), the standing snapshot of the production site as it runs.

## 2026-11-20 — Onyx / AI-01 — The module package published on the website

**Added:** `api/modules.json` and `api/MODULE-DATA.md` — the 78-module API package, the same record the production server carries, published on the hub at the server's own paths as part of the finish-the-server round. One package, two doors: the website and the server now answer with the same module record.


## 2026-11-20 — ChatGPT / AI-02 — Website editions consolidated

The 17 AI website editions now live together under `all websites/`. The old root-level AI edition folder(s), the `website builds/` copy, and the `websites/` copies were removed in the final batched cleanup (**8fea7cb03887d27ea98c76d5fd6a4fca79363277**). The choosing page, `double click to view all websites.html`, now points into `all websites/`. The README's **Which website is the real one** section explains the website roles, and the `cashtheblow.com production servers/` folder was added (README/restructure commit **befa5c13**). The midnight website job was repointed to the consolidated paths. This entry records the restructure and the final cleanup together. SQL record was written first in `CHANGES.sql`, as required.


## 2026-11-24 — Cash Flow corporate umbrella website prototype

Added a separate `corporate/` website experience with a parent-company landing page and four linked business-division sites: CashDublo Digital, CashDublo Learning, CashDublo Studio, and Get Cash Platform. Added a shared responsive design system, mobile navigation, and an architecture/acceptance document. Existing root website pages were left unchanged.

**Legal presentation:** Cash Flow remains a proposed umbrella brand. The four areas are described as operating divisions/customer-facing brands, not formed subsidiaries. Entity registration, ownership, licensing and asset-transfer claims remain subject to primary-record verification.

**Status:** Feature branch prototype only. No merge, production deployment, pricing activation, checkout, or legal status change.


## 2026-11-25 — The website takes the theme (W19)

The site generator (`make_platform_pages.py`) now carries the **SUNLIGHT** block: the themes module's sunlight gradient (one house angle, 135°, light from the upper left, never moving), its stops derived from the site's own palette — highlight where the light catches, the base color, the falloff into shade — in place of flat color, with AA contrast checked across every stop for the text each surface carries. The generator injects the block into every page it builds or patches; privacy, whose palette is its own dark one, takes a dark variant derived from its own colors.

The standing pages were themed with the identical block in the same round: 62 pages — the generator family, the front-ends overview and its five pages, the remaining root pages on the house palette, and the 34 per-app pages under `apps/`. No page's content changed; each themed page differs from its pinned predecessor only by the added block.

**Named not-upgradable in this round:** the `corporate/` site (its own design system, external CSS), the per-AI folders under `all websites/` (each its own design), and the retired v2 navigation assets. SQL record was written first in `CHANGES.sql`, as required.

## 2026-11-28 — Onyx / AI-01 — The Muse folder carries the full registry

The Muse folder page (`all websites/muse/`) now carries the whole App Catalog registry: all 161 apps as cards generated from the catalog itself — icon, name, tagline, full description, category and subcategories, platforms and families, form factors, version, status, the price line exactly as the catalog states it, and a link to each app's store page. A search box and the two selector bars (Platform above Type) stand over the shelf, and the apps that carry layout renderings in the record show them on their cards; no other card shows any. The data is built by a new generator, `scripts/build-muse-data.mjs`, from the catalog export and its site-photos record, so the nightly registry refresh can rebuild the page's data the same way. The folder's own black-and-gold design, and its Featured and Marketplace sections, stand as they were.

## 2026-11-28 — AI-01 — The Muse page's top: black and gold, umbrella restored, gold link versions

On the President's orders (2026-11-28 18:33–18:34), the Muse folder page's top now matches its own black-and-gold design, and the gold umbrella stands at the top of the page again. The cause was in the shared navigation script (`assets/site-navigation.js`): on any page without its own marked header it removes the page's `body > header` element outright and injects the shared bars — so the Muse page's own header (umbrella, CASHDUBLO title, strapline, the "One builder, one umbrella" line) was being deleted from the page, and the bars that replaced it wore the main site's teal green and cream.

The fix is scoped to the Muse folder; no shared file was edited, and the other layout copies keep their own look. The page's header is now a hero block the shared script does not remove. A page-local stylesheet (`gold-top.css`) repaints the shared header bar, Log in and Menu buttons, the secondary nav, the quick bar and the Menu drawer in the page's own palette (black #050505, panel #0d0c09, gold #c9a227, bone #e9e5d9), and a page-local script (`gold-top.js`) points every link in those bars at the black-and-gold versions under `all websites/muse/gold/`.

Those versions — 21 pages, one per internal target of the header bar, the Log in link, the secondary nav (All apps, Featured apps, RSS Feeds, App Store) and every Menu drawer link — are built by the new generator `scripts/build-muse-gold.mjs`. Content pages (Home, Log in, App Store, RSS Feeds, Website Design, Memberships, Command Tools, the Server back end, Products, Courses, My Source Code, Newsletter, Privacy) keep their own content and data, rewrapped in black and gold with the shared navigation stripped and their links pointed at gold siblings. The generated lists (All Apps, Android, iPhone / iOS, Mac, Windows, Linux, Front Ends, Games) are drawn at view time from the same registry data the Muse page carries (`registry-data.js`), with the same cards and information. External links (the contact mailto) and in-page anchors (Comments) stay exactly as they are, and every original page stands untouched.

## 2026-11-28 — AI-01 — The Grok folder carries the full registry, in its own design

On the President's order (2026-11-28 18:42), the Grok folder page (`all websites/Grok/`) receives the same treatment the Muse folder page received, in the Grok folder's own design — near-black surfaces, cyan accent, its own header and card style. The page now carries the whole App Catalog registry: all 161 apps as cards generated from the catalog itself — icon, name, tagline, full description, category and subcategories, platforms and families, form factors, version, status, the price line exactly as the catalog states it, and a link to each app's store page. A search box and the two selector bars (Platform above Type) stand over the shelf, and the apps that carry layout renderings in the record show them on their cards; no other card shows any. The apple2player renderings set attaches to neither catalog row — the catalog carries that app as apple2player-mac and apple2player-win — the standing record gap, named here rather than guessed. The data is built by a new generator, `scripts/build-grok-data.mjs`, from the catalog export and its site-photos record, so the nightly registry refresh can rebuild the page's data the same way. The folder's own sections — hero, About, the editorial Featured apps, the Front Ends callout, the philosophy, the list — stand as they were.

The page's top needed no restyle, and the reason is recorded plainly: this page never loaded the shared site navigation, so the teal-green and cream bars that covered the Muse page's header never stand on this page at all — its own header already stands at its top in its own palette. No shared file was edited, and the other layout copies keep their own look. What the page's top links needed was the same second half of the Muse treatment: a page-local script (`grok-top.js`) points the links in the page's header bar, hero and footer row at Grok-design versions of their target pages under `all websites/Grok/edition/`, built by the new generator `scripts/build-grok-edition.mjs`. Home and Privacy keep their own content and data, rewrapped in this folder's design with the shared navigation stripped and their links pointed at edition siblings; All Apps and Front Ends are drawn at view time from the same registry data the Grok page carries (`registry-data.js`), with the same cards and information. External links and in-page anchors stay exactly as they are, and every original page stands untouched.
