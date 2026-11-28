// build-muse-gold.mjs — the Muse folder's black-and-gold top, and the
// black-and-gold versions of every page the Muse page's top links to.
//
// The Muse folder page (all websites/muse/index.html) carries the
// shared site navigation, whose script removes the page's own <header>
// (the gold umbrella block) and paints its bars in the main site's
// teal green and cream. This script fixes that inside the Muse folder
// only — no shared file is touched:
//
//   1. The Muse page's own header becomes a <div class="muse-hero">,
//      which the shared script does not remove, so the gold umbrella,
//      the CASHDUBLO title, the strapline and the "One builder, one
//      umbrella" line stand at the top of the page body again.
//   2. gold-top.css restyles the shared navigation's bars, buttons,
//      drawer and quick bar in the folder's black and gold, on this
//      page only.
//   3. gold-top.js points every link in those top bars — header,
//      secondary nav, Log in, the Menu drawer, the footer legal row —
//      at the black-and-gold versions under all websites/muse/gold/.
//   4. The gold versions themselves: one HTML file per target page
//      inside this website. Pages that are generated app lists (All
//      Apps, the platform pages, Front Ends, Games) are generated
//      from the same registry data the Muse page carries
//      (registry-data.js). Every other page keeps its own content,
//      rewrapped in the folder's black-and-gold design. The original
//      pages are never edited; external links stay as they are.
//
// Use (from a checkout of this repo):
//   node scripts/build-muse-gold.mjs [--root <repoRoot>] [--out <dir>]
// Defaults: root and out are both the repo root (two folders up from
// this script). CHANGES records are written by hand, never by this
// script.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
function argVal(name, fallback) {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
}
const scriptDir = dirname(fileURLToPath(import.meta.url));
const ROOT = argVal("--root", join(scriptDir, ".."));
const OUT = argVal("--out", ROOT);
const MUSE = join("all websites", "muse");
const GOLD = join(MUSE, "gold");

// Site path (from the repo root) -> black-and-gold file (from gold/).
const GOLD_MAP = {
  "index.html": "index.html",
  "login.html": "login.html",
  "apps.html": "apps.html",
  "cashdublo-app-store.html": "cashdublo-app-store.html",
  "rss.html": "rss.html",
  "website-design.html": "website-design.html",
  "memberships.html": "memberships.html",
  "android.html": "android.html",
  "iphone.html": "iphone.html",
  "mac.html": "mac.html",
  "windows.html": "windows.html",
  "linux.html": "linux.html",
  "terminal.html": "terminal.html",
  "front-ends.html": "front-ends.html",
  "front-ends/server.html": "front-ends/server.html",
  "products.html": "products.html",
  "games.html": "games.html",
  "course.html": "course.html",
  "code.html": "code.html",
  "news.html": "news.html",
  "privacy.html": "privacy.html",
};

// Pages whose gold version keeps the original page's own content.
const CONTENT_PAGES = [
  "index.html", "login.html", "cashdublo-app-store.html", "rss.html",
  "website-design.html", "memberships.html", "terminal.html",
  "front-ends/server.html", "products.html", "course.html",
  "code.html", "news.html", "privacy.html",
];

// The Front Ends drawer group, exactly as the shared navigation
// writes it (label, anchor slug on front-ends.html).
const APP_FRONTS = [
  ["AI2AISync", "ai2aisync"], ["VoiceModel", "voice-model"],
  ["Marvin", "marvin"], ["PictureGlobe", "pictureglobe"],
  ["Mixology", "mixology"], ["Hit Record", "hit-record"],
  ["Testra Accuracy", "testra-accuracy"], ["Dear Idea", "dear-idea"],
  ["GO", "go"], ["Travel Journal", "travel-journal"], ["SAY", "say"],
  ["TTS Widget", "tts-widget"], ["Player", "player"],
  ["AI Cash Portfolio", "ai-cash-portfolio"],
  ["Cash Portfolio", "cash-portfolio"], ["Apple2Player", "apple2player"],
  ["Dear Idea Desktop", "dear-idea-desktop"], ["GitHub HQ", "github-hq"],
  ["Script-Run", "script-installer"],
  ["Change App Icons", "change-app-icons"],
  ["CashDublo Coder", "cashdublo-coder"],
  ["App Translator", "app-translator"], ["Build Manager", "build-manager"],
  ["Rebuild-All", "rebuild-all"], ["PodEdPro", "podedpro"],
  ["Galaxy Repeat", "galaxy-repeat"],
  ["Best Mac File Manager", "best-mac-file-manager"],
  ["Patent It!", "patent-it"], ["Crash Catcher", "crash-catcher"],
  ["Wi-Fi Tether", "wifi-tether"], ["AI Teacher", "ai-teacher"],
  ["Apple Dextop", "apple-dextop"], ["Contracts", "contracts"],
  ["Secure Mac Remote Terminal", "secure-terminal"],
];

// The Menu drawer, link for link as the shared navigation builds it.
// Entry shapes: ["a", label, goldHref] or ["g", label, [[label, goldHref], ...]]
// or ["sep", text] inside a group.
const DRAWER = [
  ["a", "Home", "index.html"],
  ["a", "Website Design", "website-design.html"],
  ["a", "Memberships", "memberships.html"],
  ["a", "App Store", "cashdublo-app-store.html"],
  ["a", "All Apps", "apps.html"],
  ["g", "Platforms", [
    ["Android", "android.html"], ["iPhone / iOS", "iphone.html"],
    ["Mac", "mac.html"], ["Windows", "windows.html"],
    ["Linux", "linux.html"], ["Command Tools", "terminal.html"],
  ]],
  ["a", "Web Apps", "front-ends.html#web-frontends"],
  ["g", "Front Ends", [["All front ends — full catalog", "front-ends.html"]]
    .concat(APP_FRONTS.map((x) => [x[0], "front-ends.html#app-" + x[1]]))],
  ["g", "Back Ends", [["CashDublo Server", "front-ends/server.html"]]],
  ["a", "Products", "products.html"],
  ["g", "Games", [
    ["Story", "games.html#story"], ["Engine", "games.html#storyline-engine"],
    ["Storyline Studio", "games.html#storyline-studios"],
    ["Storyline Console", "games.html#storyline-console"],
    ["Storyline HACKED", "games.html#hacked"],
    ["sep", "Other games · add as released"],
    ["Name That Flag", "games.html#name-that-flag"],
  ]],
  ["a", "Courses", "course.html"],
  ["a", "My Source Code", "code.html"],
  ["a", "Newsletter", "news.html"],
  ["a", "RSS Feeds", "rss.html"],
  ["a", "Privacy", "privacy.html"],
  ["a", "Contact Us", "mailto:cash.dublo@gmail.com"],
  ["a", "Comments", "#comments"],
  ["a", "About Us", "index.html#about"],
];

const PRIMARY = [
  ["All apps", "apps.html"], ["Featured apps", "index.html#featured"],
  ["RSS Feeds", "rss.html"], ["App Store", "cashdublo-app-store.html"],
];

// ---------------------------------------------------------------------
// gold-top.css — page-local overrides: the shared navigation in the
// Muse folder's black and gold. Palette is the page's own:
// --bg #050505, --panel #0d0c09, --gold #c9a227, --gold-dim #8c7051,
// --bone #e9e5d9, --mute #9a937f, --line #262216.
// ---------------------------------------------------------------------
const GOLD_TOP_CSS = `/* Muse folder only — the shared site navigation in black and gold.
   Loaded by all websites/muse/index.html after the shared navigation
   stylesheet; every rule here is scoped to the navigation's own
   classes, so no other page and no other layout copy is affected.
   Palette: the Muse page's own — black #050505, panel #0d0c09,
   gold #c9a227, gold-dim #8c7051, bone #e9e5d9, line #262216. */
.cd-site-header{background:#050505 !important;color:#e9e5d9 !important;border-bottom:2px solid #c9a227 !important}
.cd-site-brand{color:#e9e5d9 !important}
.cd-site-brand span{color:#c9a227 !important}
.cd-site-tagline{color:#8c7051 !important}
.cd-login-link{background:#0d0c09 !important;border-color:#c9a227 !important;color:#c9a227 !important}
.cd-login-link:hover,.cd-login-link:focus-visible{background:#262216 !important;outline-color:#c9a227 !important}
.cd-header-hit{color:#e9e5d9 !important}
.cd-header-hit span{background:#0d0c09 !important;border-color:#c9a227 !important;color:#c9a227 !important}
.cd-header-hit:hover span,.cd-header-hit:focus-visible span{background:#262216 !important}
.cd-header-hit:focus-visible{outline-color:#c9a227 !important}
.cd-site-drawer{background:#050505 !important;color:#e9e5d9 !important;border-bottom:3px solid #c9a227 !important;scrollbar-color:#8c7051 #050505}
.cd-drawer-inner>a,.cd-drawer-group{background:#0d0c09 !important;border-color:#8c7051 !important;color:#e9e5d9 !important}
.cd-drawer-inner>a:hover,.cd-drawer-inner>a:focus-visible{background:#262216 !important;outline-color:#c9a227 !important}
.cd-drawer-group summary{color:#e9e5d9 !important}
.cd-drawer-group summary::after{color:#c9a227 !important}
.cd-drawer-links a{color:#e9e5d9 !important}
.cd-drawer-links a:hover,.cd-drawer-links a:focus-visible{background:#262216 !important;outline-color:#c9a227 !important}
.cd-drawer-links .cd-nav-sep{color:#8c7051 !important;border-top-color:#262216 !important}
.cd-nav-type{color:#9a937f !important}
.cd-primary-nav{background:#050505 !important;color:#e9e5d9 !important;border-bottom:1px solid #c9a227 !important;scrollbar-color:#8c7051 #050505}
.cd-primary-nav a{color:#e9e5d9 !important}
.cd-primary-nav a:hover,.cd-primary-nav a:focus-visible{color:#c9a227 !important;border-bottom-color:#c9a227 !important}
.cd-primary-nav a[aria-current="page"]{color:#c9a227 !important;border-bottom-color:#c9a227 !important}
.cd-quick-nav{background:#050505 !important;border-bottom:1px solid #262216 !important}
.cd-quick-nav a{color:#e9e5d9 !important}
.cd-quick-nav a:hover,.cd-quick-nav a:focus-visible{background:#262216 !important;color:#c9a227 !important;outline-color:#c9a227 !important}
.cd-quick-nav a.cd-quick-empty{border-color:#8c7051 !important;background:#0d0c09 !important;color:#9a937f !important}
.cd-quick-manage{background:#0d0c09 !important;border-color:#8c7051 !important;color:#c9a227 !important}
.cd-quick-manage[aria-expanded="true"]{background:#262216 !important;border-color:#c9a227 !important}
.cd-quick-manage-panel{background:#0d0c09 !important;border-color:#262216 !important;color:#e9e5d9 !important}
.cd-quick-picker{background:#0d0c09 !important;color:#e9e5d9 !important;border-color:#262216 !important}
.cd-quick-picker p{color:#9a937f !important}
.cd-quick-picker-head button{background:#262216 !important;color:#c9a227 !important}
.cd-quick-picker-list a,.cd-quick-picker-list button{background:#050505 !important;color:#e9e5d9 !important;border:1px solid #262216 !important}
.cd-footer-legal{border-top-color:#262216 !important}
`;

// ---------------------------------------------------------------------
// gold-top.js — page-local link rewriter for the Muse page.
// ---------------------------------------------------------------------
const GOLD_TOP_JS = `// Muse folder only — point the shared navigation's top links at this
// folder's black-and-gold versions (all websites/muse/gold/), so a
// visitor who follows any link from the top of the Muse page stays
// in black and gold. The original pages are untouched; external
// links and in-page anchors are left exactly as they are.
(function () {
  "use strict";
  var GOLD = ${JSON.stringify(GOLD_MAP, null, 2)};
  var KEYS = Object.keys(GOLD).sort(function (a, b) { return b.length - a.length; });
  function goldHref(raw) {
    if (!raw) return null;
    if (/^(mailto:|tel:|#)/i.test(raw)) return null;
    var url;
    try { url = new URL(raw, window.location.href); } catch (e) { return null; }
    if (url.origin !== window.location.origin) return null;
    var path = url.pathname;
    for (var i = 0; i < KEYS.length; i++) {
      var key = "/" + KEYS[i];
      if (path === key || path.endsWith(key)) {
        return "gold/" + GOLD[KEYS[i]] + (url.hash || "");
      }
    }
    return null;
  }
  function rewrite() {
    var links = document.querySelectorAll(
      ".cd-site-header a[href], .cd-site-drawer a[href], " +
      ".cd-primary-nav a[href], .cd-quick-nav a[href], " +
      ".cd-quick-picker a[href], .cd-footer-legal a[href]");
    links.forEach(function (a) {
      if (a.dataset.cdGold) return;
      var g = goldHref(a.getAttribute("href"));
      if (g) { a.setAttribute("href", g); a.dataset.cdGold = "1"; }
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", rewrite);
  } else { rewrite(); }
  var mo = new MutationObserver(rewrite);
  mo.observe(document.documentElement, { childList: true, subtree: true });
  setTimeout(function () { mo.disconnect(); }, 15000);
})();
`;

// ---------------------------------------------------------------------
// gold.css — the black-and-gold design for the gold pages: a static
// top in the Muse folder's design (no shared navigation script),
// plus a palette restyle for carried-over page content, plus the
// registry card styles the generated list pages share with the
// Muse page itself.
// ---------------------------------------------------------------------
const GOLD_CSS = `/* Black-and-gold versions — Muse folder. Palette is the Muse page's
   own: black #050505, panel #0d0c09, gold #c9a227, gold-dim #8c7051,
   bone #e9e5d9, mute #9a937f, line #262216. */
:root{
  --bg:#050505; --panel:#0d0c09; --gold:#c9a227; --gold-dim:#8c7051;
  --bone:#e9e5d9; --mute:#9a937f; --line:#262216;
}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--bg);color:var(--bone);font-family:Inter,system-ui,sans-serif;line-height:1.55}
a{color:var(--gold);text-decoration:none}
.wrap{max-width:1080px;margin:0 auto;padding:0 20px}

/* The static top — header bar, Menu drawer, secondary nav. */
.gold-top{position:sticky;top:0;z-index:1000;display:grid;grid-template-columns:1fr auto 1fr;
  align-items:center;gap:12px;min-height:72px;padding:8px clamp(14px,3vw,42px);
  background:var(--bg);border-bottom:2px solid var(--gold)}
.gold-login{justify-self:start;display:inline-flex;align-items:center;min-height:40px;
  padding:7px 14px;border:1px solid var(--gold);border-radius:999px;background:var(--panel);
  color:var(--gold) !important;font-size:.88rem;font-weight:600;white-space:nowrap}
.gold-login:hover{background:#262216}
.gold-brand{justify-self:center;color:var(--bone) !important;font-size:clamp(1.25rem,2vw,1.65rem);
  font-weight:900;letter-spacing:-.045em;white-space:nowrap}
.gold-brand span{color:var(--gold)}
.gold-menu{justify-self:end;position:relative}
.gold-menu>summary{display:inline-flex;align-items:center;min-height:48px;padding:8px 14px;
  border:1px solid var(--gold);border-radius:999px;background:var(--panel);color:var(--gold);
  font-weight:600;cursor:pointer;list-style:none;white-space:nowrap}
.gold-menu>summary::-webkit-details-marker{display:none}
.gold-menu>summary:hover{background:#262216}
.gold-drawer{position:fixed;top:72px;left:0;right:0;z-index:999;max-height:min(72vh,680px);
  overflow:auto;background:var(--bg);border-bottom:3px solid var(--gold);
  box-shadow:0 18px 38px rgba(0,0,0,.5)}
.gold-drawer-inner{max-width:1240px;margin:0 auto;padding:18px clamp(14px,3vw,42px) 24px;
  display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;align-items:start}
.gold-drawer a.tile,.gold-group{min-width:0;border:1px solid var(--gold-dim);border-radius:11px;
  background:var(--panel);color:var(--bone)}
.gold-drawer a.tile{display:flex;align-items:center;min-height:52px;padding:12px 15px;font-weight:600}
.gold-drawer a.tile:hover{background:#262216}
.gold-group{overflow:hidden}
.gold-group>summary{display:flex;align-items:center;min-height:52px;padding:12px 15px;
  cursor:pointer;list-style:none;font-weight:600}
.gold-group>summary::-webkit-details-marker{display:none}
.gold-group>summary::after{content:"+";margin-left:auto;color:var(--gold);font-weight:900}
.gold-group[open ]>summary::after{content:"-"}
.gold-group-links{display:grid;gap:3px;padding:0 7px 8px}
.gold-group-links a{display:flex;align-items:center;min-height:44px;padding:8px 10px;
  border-radius:8px;color:var(--bone) !important;font-size:.9rem}
.gold-group-links a:hover{background:#262216}
.gold-group-links .sep{padding:8px 10px 2px;border-top:1px solid var(--line);
  color:var(--gold-dim);font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase}
.gold-primary{position:sticky;top:72px;z-index:998;display:flex;align-items:center;justify-content:center;
  gap:clamp(14px,3vw,36px);min-height:54px;padding:8px clamp(14px,3vw,42px);
  background:var(--bg);border-bottom:1px solid var(--gold);overflow-x:auto;white-space:nowrap}
.gold-primary a{color:var(--bone) !important;font-size:.92rem;font-weight:600;padding:7px 2px;
  border-bottom:3px solid transparent}
.gold-primary a:hover{color:var(--gold) !important;border-bottom-color:var(--gold)}
@media(max-width:1024px){.gold-drawer-inner{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:700px){
  .gold-drawer-inner{grid-template-columns:minmax(0,1fr)}
  .gold-primary{justify-content:flex-start}
}

/* Page heading block on the generated list pages. */
.gold-head{padding:52px 0 10px;text-align:center}
.gold-head .umbrella{font-size:44px;color:var(--gold);line-height:1}
.gold-head h1{font-family:Anton,sans-serif;font-size:44px;letter-spacing:.04em;color:var(--bone);margin-top:8px}
.gold-head h1 span{color:var(--gold)}
.gold-head .sub{color:var(--mute);max-width:620px;margin:12px auto 0;font-size:15px}

/* Carried-over content: the palette restyle. The original pages keep
   their own layout styles; these rules repaint the surfaces, words
   and controls in black and gold. */
.gold-content{max-width:1080px;margin:0 auto;padding:28px 20px 8px;background:var(--bg);color:var(--bone)}
.gold-content h1,.gold-content h2,.gold-content h3{color:var(--gold) !important}
.gold-content a{color:var(--gold)}
.gold-content section,.gold-content .hero,.gold-content .band,.gold-content .section-band,
.gold-content .featured,.gold-content .belief,.gold-content .ticker,.gold-content .full-bleed{
  background:var(--bg) !important;color:var(--bone) !important}
.gold-content .card,.gold-content article,.gold-content .panel,.gold-content .tile,
.gold-content .box,.gold-content .item{
  background:var(--panel) !important;color:var(--bone) !important;border-color:var(--line) !important}
.gold-content p,.gold-content li,.gold-content td,.gold-content span{color:inherit}
.gold-content table{border-color:var(--line)}
.gold-content th,.gold-content td{border-color:var(--line)}
.gold-content input,.gold-content select,.gold-content textarea{
  background:var(--panel);color:var(--bone);border:1px solid var(--line);border-radius:8px}
.gold-content button,.gold-content .btn{
  background:var(--panel);color:var(--gold);border:1px solid var(--gold);border-radius:999px}
.gold-content img{max-width:100%}

/* Registry cards — the Muse page's own card vocabulary. */
.reg-intro{color:var(--mute);font-size:15px;max-width:680px;margin:0 auto 18px;text-align:center}
.reg-controls{display:flex;flex-wrap:wrap;gap:12px;align-items:flex-end;margin-bottom:14px}
.reg-controls .grow{flex:1 1 260px}
.reg-controls label{display:block;font-size:11px;letter-spacing:.18em;color:var(--gold-dim);
  text-transform:uppercase;margin-bottom:6px}
.reg-controls input,.reg-controls select{width:100%;background:var(--panel);color:var(--bone);
  border:1px solid var(--line);border-radius:10px;padding:10px 12px;font:inherit;font-size:14px}
.reg-controls input:focus,.reg-controls select:focus{outline:none;border-color:var(--gold)}
.reg-count{color:var(--gold-dim);font-size:13px;letter-spacing:.1em;margin-bottom:16px;text-transform:uppercase}
.reg-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px}
.card{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:20px}
.card h3{font-family:Anton,sans-serif;font-size:21px;letter-spacing:.03em;color:var(--bone)}
.card p{color:var(--mute);font-size:14px;margin:8px 0 12px}
.reg-card{display:flex;flex-direction:column}
.reg-card .head{display:flex;align-items:center;gap:12px}
.reg-card .tile{position:relative;flex:0 0 54px;width:54px;height:54px;border:1px solid var(--gold-dim);
  border-radius:12px;display:flex;align-items:center;justify-content:center;overflow:hidden;
  font-family:Anton,sans-serif;font-size:19px;color:var(--gold);background:#12100a}
.reg-card .tile img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.reg-card h3{font-size:22px}
.reg-card .tagline{color:var(--gold-dim);font-size:13.5px;margin:10px 0 0;min-height:0}
.reg-card .desc{color:var(--mute);font-size:14px;margin:8px 0 12px;min-height:0}
.chips{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 10px}
.chip{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);
  border:1px solid var(--gold-dim);border-radius:999px;padding:2px 9px}
.chip.main{color:#050505;background:var(--gold);border-color:var(--gold);font-weight:600}
.plat{font-size:12px;letter-spacing:.12em;color:var(--gold);text-transform:uppercase}
.reg-card .meta{font-size:12.5px;color:var(--mute);margin-top:2px}
.reg-card .new{font-size:13px;color:var(--bone);margin:10px 0 0;min-height:0}
.reg-card .new b{color:var(--gold);font-weight:600}
.shots{display:flex;gap:8px;overflow-x:auto;margin:12px 0 2px;padding-bottom:6px}
.shots img{height:118px;border:1px solid var(--line);border-radius:8px;flex:0 0 auto}
.price-line{font-weight:600;color:var(--bone);margin-top:auto;padding-top:12px}
.price-line small{display:block;font-weight:400;color:var(--mute);font-size:12.5px}
.btn{display:inline-block;margin-top:12px;border:1px solid var(--gold);color:var(--gold);
  padding:7px 14px;border-radius:999px;font-size:13px;letter-spacing:.06em}
.reg-empty{color:var(--mute);font-size:15px;border:1px dashed var(--gold-dim);border-radius:14px;
  padding:22px;text-align:center}
.gold-anchor{display:block;height:0;overflow:hidden}
.gold-section{padding:30px 0 6px}
.gold-section h2{font-family:"Bebas Neue",sans-serif;font-size:30px;letter-spacing:.18em;
  color:var(--gold);border-bottom:1px solid var(--line);padding-bottom:8px;margin-bottom:20px}

.gold-foot{max-width:1080px;margin:40px auto 0;padding:24px 20px 40px;border-top:1px solid var(--line);
  color:var(--mute);font-size:14px;display:flex;flex-wrap:wrap;gap:14px 28px;justify-content:space-between}
.gold-note{max-width:1080px;margin:0 auto;padding:0 20px 30px;color:var(--gold-dim);
  font-size:12px;letter-spacing:.06em}
`;

// ---------------------------------------------------------------------
// gold-render.js — registry card renderer for the generated gold list
// pages. Same cards and information as the Muse page's Full Shelf,
// drawn from the same registry data (../registry-data.js).
// ---------------------------------------------------------------------
const GOLD_RENDER_JS = `// Black-and-gold list pages — registry cards from the same data the
// Muse page carries (../registry-data.js). Page setup arrives as
// window.GOLD_PAGE = { mode: "apps" | "platform" | "frontends" | "games",
// platform: "Android" (platform mode), anchors: ... }.
var PLAT_LABELS = {"Android":"Android", "iOS":"iOS", "Mac":"Mac", "Windows":"Windows", "Linux":"Linux", "web":"Web", "desktop":"Desktop"};
var PLAT_ORDER = ["Android", "iOS", "Mac", "Windows", "Linux", "web", "desktop"];
var CAT_LABELS = {app:"App", game:"Game", tool:"Tool", course:"Course", model:"AI model", server:"Server", website:"Website", store:"Store", module:"Module", record:"Record"};
var CAT_ORDER = ["app", "game", "tool", "course", "model", "server", "website", "store", "module", "record"];
var IMG_ROOT = "../../../";

function esc(s){
  return String(s === null || s === undefined ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function initials(name){
  var parts = String(name || "").split(/\\s+/).filter(function(w){ return w; });
  if (!parts.length) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
}
function priceLine(a){
  if (a.price !== null && a.price !== undefined && a.price !== "") {
    return { main: "$" + a.price, sub: a.price_model ? String(a.price_model) : "" };
  }
  if (a.price_model === "trial") return { main: "Free trial", sub: a.trial_length ? String(a.trial_length) : "" };
  if (a.price_model === "freemium") return { main: "Free with ads", sub: "" };
  if (a.price_model) return { main: String(a.price_model), sub: "" };
  return { main: "Price TBA", sub: "" };
}
function museFilterApps(apps, q, plat, cat){
  q = String(q || "").trim().toLowerCase();
  return apps.filter(function(a){
    if (plat && (a.platforms || []).indexOf(plat) === -1) return false;
    if (cat && a.category !== cat) return false;
    if (q) {
      var hay = [a.display_name, a.tagline, a.description, CAT_LABELS[a.category] || a.category]
        .concat(a.subcategories || []).join(" ").toLowerCase();
      if (hay.indexOf(q) === -1) return false;
    }
    return true;
  });
}
function cardHtml(a){
  var p = priceLine(a);
  var plats = (a.platforms || []).map(function(x){ return PLAT_LABELS[x] || x; }).join(" · ");
  var chips = "";
  if (a.category) chips += '<span class="chip main">' + esc(CAT_LABELS[a.category] || a.category) + '</span>';
  (a.subcategories || []).forEach(function(s){ chips += '<span class="chip">' + esc(s) + '</span>'; });
  var ffs = (a.form_factors || []).join(" · ");
  var meta = [];
  if (a.version) meta.push("Version " + a.version);
  if (a.status) meta.push(a.status);
  var shots = (a.screenshots || []).filter(function(x){ return x; });
  var shotsHtml = "";
  if (shots.length) {
    shotsHtml = '<div class="shots">' + shots.map(function(src, i){
      return '<img src="' + IMG_ROOT + esc(src) + '" alt="' + esc(a.display_name) + ' — layout ' + (i + 1) + ' of ' + shots.length + '" loading="lazy" onerror="this.remove()">';
    }).join("") + '</div>';
  }
  var link = (a.get_links && a.get_links.web_store) ||
    "https://bigodom1984-github-io.pages.dev/store/app.html?app=" + encodeURIComponent(a.slug);
  return '<article class="card reg-card">' +
    '<div class="head"><span class="tile">' + esc(initials(a.display_name)) +
      '<img src="' + IMG_ROOT + 'img/icon-' + esc(a.slug) + '.png" alt="" loading="lazy" onerror="this.remove()"></span>' +
      '<h3>' + esc(a.display_name) + '</h3></div>' +
    (a.tagline ? '<p class="tagline">' + esc(a.tagline) + '</p>' : '') +
    '<p class="desc">' + esc(a.description || "") + '</p>' +
    (chips ? '<div class="chips">' + chips + '</div>' : '') +
    (plats ? '<div class="plat">' + esc(plats) + '</div>' : '') +
    (ffs ? '<div class="meta">' + esc(ffs) + '</div>' : '') +
    (meta.length ? '<div class="meta">' + esc(meta.join(" · ")) + '</div>' : '') +
    (a.whats_new ? '<p class="new"><b>What\\'s new:</b> ' + esc(a.whats_new) + '</p>' : '') +
    shotsHtml +
    '<div class="price-line">' + esc(p.main) + (p.sub ? '<small>' + esc(p.sub) + '</small>' : '') + '</div>' +
    '<a class="btn" href="' + esc(link) + '">View in the store</a>' +
    '</article>';
}

if (typeof document !== "undefined" && document.getElementById("reg-grid")) {
  (function(){
    var CFG = window.GOLD_PAGE || { mode: "apps" };
    var APPS = window.CD_MUSE_APPS || [];
    var grid = document.getElementById("reg-grid");
    var count = document.getElementById("reg-count");
    var empty = document.getElementById("reg-empty");
    var searchBox = document.getElementById("reg-search");
    var platSel = document.getElementById("reg-platform");
    var catSel = document.getElementById("reg-category");

    function pool(){
      if (CFG.mode === "platform") return APPS.filter(function(a){ return (a.platforms || []).indexOf(CFG.platform) !== -1; });
      if (CFG.mode === "games") return APPS.filter(function(a){ return a.category === "game" || a.slug === "cashdublo-game-engine"; });
      return APPS;
    }
    var POOL = pool();

    if (platSel) {
      var pseen = {};
      POOL.forEach(function(a){ (a.platforms || []).forEach(function(p){ pseen[p] = true; }); });
      var popts = '<option value="">All platforms</option>';
      PLAT_ORDER.forEach(function(p){ if (pseen[p]) popts += '<option value="' + esc(p) + '">' + esc(PLAT_LABELS[p] || p) + '</option>'; });
      Object.keys(pseen).forEach(function(p){ if (PLAT_ORDER.indexOf(p) === -1) popts += '<option value="' + esc(p) + '">' + esc(p) + '</option>'; });
      platSel.innerHTML = popts;
    }
    if (catSel) {
      var cseen = {};
      POOL.forEach(function(a){ if (a.category) cseen[a.category] = true; });
      var copts = '<option value="">All types</option>';
      CAT_ORDER.forEach(function(c){ if (cseen[c]) copts += '<option value="' + esc(c) + '">' + esc(CAT_LABELS[c] || c) + '</option>'; });
      Object.keys(cseen).forEach(function(c){ if (CAT_ORDER.indexOf(c) === -1) copts += '<option value="' + esc(c) + '">' + esc(c) + '</option>'; });
      catSel.innerHTML = copts;
    }

    // Anchor map: anchor id -> registry slug it should sit on (null =
    // the top of the list). Front Ends also gives every card its own
    // app-<slug> id, plus alias spans for the drawer's spellings.
    function norm(s){ return String(s || "").toLowerCase().replace(/[^a-z0-9]/g, ""); }
    var byNorm = {};
    APPS.forEach(function(a){ byNorm[norm(a.slug)] = a.slug; });
    var anchorFor = {}; // slug -> [anchorIds]
    var topAnchors = [];
    if (CFG.mode === "frontends" && CFG.anchors) {
      CFG.anchors.forEach(function(dslug){
        var rslug = byNorm[norm(dslug)];
        if (rslug && rslug !== dslug) {
          (anchorFor[rslug] = anchorFor[rslug] || []).push("app-" + dslug);
        }
      });
    }
    if (CFG.mode === "games" && CFG.anchors) {
      Object.keys(CFG.anchors).forEach(function(aid){
        var rslug = CFG.anchors[aid];
        if (rslug && POOL.some(function(a){ return a.slug === rslug; })) {
          (anchorFor[rslug] = anchorFor[rslug] || []).push(aid);
        } else { topAnchors.push(aid); }
      });
    }

    function render(){
      var list = museFilterApps(POOL, searchBox ? searchBox.value : "",
        platSel ? platSel.value : "", catSel ? catSel.value : "");
      var html = topAnchors.map(function(aid){ return '<span class="gold-anchor" id="' + esc(aid) + '"></span>'; }).join("");
      html += list.map(function(a){
        var pre = (anchorFor[a.slug] || []).map(function(aid){
          return '<span class="gold-anchor" id="' + esc(aid) + '"></span>';
        }).join("");
        var card = cardHtml(a);
        if (CFG.mode === "frontends") {
          card = card.replace('<article class="card reg-card">',
            '<article class="card reg-card" id="app-' + esc(a.slug) + '">');
        }
        return pre + card;
      }).join("");
      grid.innerHTML = html;
      if (count) count.textContent = "Showing " + list.length + " of " + POOL.length;
      if (empty) empty.hidden = list.length !== 0;

      var webGrid = document.getElementById("web-grid");
      if (webGrid) {
        var webs = museFilterApps(APPS.filter(function(a){ return (a.platforms || []).indexOf("web") !== -1; }),
          searchBox ? searchBox.value : "", "", "");
        webGrid.innerHTML = webs.map(cardHtml).join("");
        var wc = document.getElementById("web-count");
        if (wc) wc.textContent = "Showing " + webs.length + " web apps";
      }
    }
    if (searchBox) searchBox.addEventListener("input", render);
    if (platSel) platSel.addEventListener("change", render);
    if (catSel) catSel.addEventListener("change", render);
    render();
  })();
}
`;

// ---------------------------------------------------------------------
// The gold chrome — the static black-and-gold top every gold page
// carries: header bar (Log in / brand / Menu), the Menu drawer with
// every link the shared navigation's drawer carries, and the
// secondary nav bar. All links point at gold siblings.
// ---------------------------------------------------------------------
function drawerHtml(prefix) {
  const href = (h) => (/^(mailto:|#)/.test(h) ? h : prefix + h);
  const parts = DRAWER.map((e) => {
    if (e[0] === "a") {
      return '<a class="tile" href="' + href(e[2]) + '">' + e[1] + "</a>";
    }
    const links = e[2].map((l) => {
      if (l[0] === "sep") return '<div class="sep">' + l[1] + "</div>";
      return '<a href="' + href(l[1]) + '">' + l[0] + "</a>";
    }).join("");
    return '<details class="gold-group"><summary>' + e[1] +
      '</summary><div class="gold-group-links">' + links + "</div></details>";
  }).join("");
  return '<div class="gold-drawer-inner">' + parts + "</div>";
}

function chrome(prefix, title, headExtra, mainInner) {
  return "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n" +
    "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
    "<title>" + title + "</title>\n" +
    "<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n" +
    "<link href=\"https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Inter:wght@400;600&display=swap\" rel=\"stylesheet\">\n" +
    (headExtra ? headExtra + "\n" : "") +
    "<link rel=\"stylesheet\" href=\"" + prefix + "gold.css\">\n</head>\n<body>\n" +
    "<header class=\"gold-top\">\n" +
    "  <a class=\"gold-login\" href=\"" + prefix + "login.html\">Log in</a>\n" +
    "  <a class=\"gold-brand\" href=\"" + prefix + "index.html\">CASH<span>DUBLO</span></a>\n" +
    "  <details class=\"gold-menu\"><summary>Menu ☰</summary>\n" +
    "    <nav class=\"gold-drawer\" aria-label=\"Site navigation\">" + drawerHtml(prefix) + "</nav>\n" +
    "  </details>\n</header>\n" +
    "<nav class=\"gold-primary\" aria-label=\"Primary navigation\">" +
    PRIMARY.map((p) => '<a href="' + prefix + p[1] + '">' + p[0] + "</a>").join("") +
    "</nav>\n" +
    mainInner + "\n" +
    "<footer class=\"gold-foot\">\n" +
    "  <div>CashDublo LLC<br>CashDublo@gmail.com</div>\n" +
    "  <div><a href=\"" + prefix + "privacy.html\">Privacy</a> · <a href=\"mailto:cash.dublo@gmail.com\">Contact Us</a> · <a href=\"" + prefix + "index.html#about\">About Us</a></div>\n" +
    "  <div>Sole developer of record:<br>Cash (Greg Odom)</div>\n</footer>\n" +
    "<p class=\"gold-note\">The black-and-gold version of this page, kept in the Muse folder. The original page stands untouched on the main site.</p>\n" +
    "</body>\n</html>\n";
}

// ---------------------------------------------------------------------
// Content pages: keep the original page's own styles and body
// content; drop the shared navigation (its script, stylesheets and
// any static copy of its bars); rewrite links and asset paths —
// gold-set pages to gold siblings, everything else to root-absolute
// so it resolves from inside the Muse folder.
// ---------------------------------------------------------------------
function resolveRel(rel, srcDir) {
  const parts = (srcDir ? srcDir.split("/") : []).concat(rel.split("/"));
  const out = [];
  for (const p of parts) {
    if (p === "" || p === ".") continue;
    if (p === "..") { out.pop(); continue; }
    out.push(p);
  }
  return out.join("/");
}

function mapUrl(raw, srcDir, prefix) {
  if (!raw) return raw;
  if (/^(https?:)?\/\//i.test(raw) || /^(mailto:|tel:|data:|#)/i.test(raw)) return raw;
  let rest = raw, hash = "", query = "";
  const hi = rest.indexOf("#");
  if (hi >= 0) { hash = rest.slice(hi); rest = rest.slice(0, hi); }
  const qi = rest.indexOf("?");
  if (qi >= 0) { query = rest.slice(qi); rest = rest.slice(0, qi); }
  if (rest === "") return raw;
  const sitePath = rest.startsWith("/") ? rest.slice(1) : resolveRel(rest, srcDir);
  if (Object.prototype.hasOwnProperty.call(GOLD_MAP, sitePath)) {
    return prefix + GOLD_MAP[sitePath] + query + hash;
  }
  return "/" + sitePath + query + hash;
}

function rewriteAttrs(html, srcDir, prefix) {
  return html
    .replace(/(href|src)="([^"]*)"/g, (m, a, u) => a + '="' + mapUrl(u, srcDir, prefix) + '"')
    .replace(/(href|src)='([^']*)'/g, (m, a, u) => a + "='" + mapUrl(u, srcDir, prefix) + "'");
}

function transformPage(html, srcDir, prefix) {
  const titleM = html.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleM ? titleM[1].trim() : "CashDublo";
  const headM = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  const head = headM ? headM[1] : "";
  const styles = [];
  const styleRe = /<style[^>]*>[\s\S]*?<\/style>/gi;
  let m;
  while ((m = styleRe.exec(html)) !== null) styles.push(m[0]);
  const ownCss = [];
  const linkRe = /<link[^>]*>/gi;
  while ((m = linkRe.exec(head)) !== null) {
    const tag = m[0];
    if (!/rel="stylesheet"/.test(tag)) continue;
    if (/site-navigation|cashdublo-nav/.test(tag)) continue;
    const hm = tag.match(/href="([^"]*)"/);
    if (hm) ownCss.push('<link rel="stylesheet" href="' + mapUrl(hm[1], srcDir, prefix) + '">');
  }
  const bodyM = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let body = bodyM ? bodyM[1] : "";
  body = body.replace(/<header[^>]*class="cd-site-header"[^>]*>[\s\S]*?<\/header>/gi, "");
  body = body.replace(/<nav[^>]*id="cd-site-drawer"[^>]*>[\s\S]*?<\/nav>/gi, "");
  body = body.replace(/<nav[^>]*class="cd-primary-nav"[^>]*>[\s\S]*?<\/nav>/gi, "");
  body = body.replace(/<nav[^>]*class="cd-quick-nav"[^>]*>[\s\S]*?<\/nav>/gi, "");
  body = body.replace(/<div[^>]*data-cd-primary-nav-spacer[^>]*>\s*<\/div>/gi, "");
  body = body.replace(/<script[^>]*src="[^"]*(site-navigation|cashdublo-nav)[^"]*"[^>]*>\s*<\/script>/gi, "");
  body = rewriteAttrs(body, srcDir, prefix);
  return { title, headExtra: ownCss.concat(styles).join("\n"), body };
}

// ---------------------------------------------------------------------
// Generated list pages — static shells that draw their cards from
// the registry data at view time, like the Muse page itself.
// ---------------------------------------------------------------------
const GENERATED = [
  { file: "apps.html", title: "All Apps — CashDublo", h1: "ALL <span>APPS</span>",
    intro: "Every app, game, tool and record in the CashDublo registry — the same cards and information the store carries, drawn from the registry itself. Search the list, or narrow it by platform and type.",
    cfg: { mode: "apps" }, controls: "full" },
  { file: "android.html", title: "Android — CashDublo", h1: "<span>ANDROID</span>",
    intro: "The registry's Android apps — phones and tablets — as cards drawn from the registry itself.",
    cfg: { mode: "platform", platform: "Android" }, controls: "cat" },
  { file: "iphone.html", title: "iPhone / iOS — CashDublo", h1: "IPHONE <span>/ IOS</span>",
    intro: "The registry's iOS apps — iPhone, iPad and iPod — as cards drawn from the registry itself.",
    cfg: { mode: "platform", platform: "iOS" }, controls: "cat" },
  { file: "mac.html", title: "Mac — CashDublo", h1: "<span>MAC</span>",
    intro: "The registry's Mac apps, as cards drawn from the registry itself.",
    cfg: { mode: "platform", platform: "Mac" }, controls: "cat" },
  { file: "windows.html", title: "Windows — CashDublo", h1: "<span>WINDOWS</span>",
    intro: "The registry's Windows apps, as cards drawn from the registry itself.",
    cfg: { mode: "platform", platform: "Windows" }, controls: "cat" },
  { file: "linux.html", title: "Linux — CashDublo", h1: "<span>LINUX</span>",
    intro: "The registry's Linux apps, as cards drawn from the registry itself.",
    cfg: { mode: "platform", platform: "Linux" }, controls: "cat" },
  { file: "front-ends.html", title: "Front Ends — CashDublo", h1: "FRONT <span>ENDS</span>",
    intro: "Every front end in the registry — the web apps first, then the full catalog, each card under its own app anchor, drawn from the registry itself.",
    cfg: { mode: "frontends", anchors: APP_FRONTS.map((x) => x[1]) }, controls: "search", web: true },
  { file: "games.html", title: "Games — CashDublo", h1: "<span>GAMES</span>",
    intro: "The registry's games, and the CashDublo Game Engine they are built around — cards drawn from the registry itself.",
    cfg: { mode: "games", anchors: {
      "story": null, "storyline-engine": "storyline-engine",
      "storyline-studios": "storyline-studio", "storyline-console": null,
      "hacked": "hacked", "name-that-flag": "name-that-flag",
    } }, controls: "search" },
];

function generatedPage(g) {
  const controls =
    '<div class="reg-controls">' +
    '<div class="grow"><label for="reg-search">Search</label>' +
    '<input id="reg-search" type="search" placeholder="Search — a name, a word, a kind…"></div>' +
    (g.controls === "full"
      ? '<div><label for="reg-platform">Platform</label><select id="reg-platform"></select></div>' : "") +
    (g.controls === "full" || g.controls === "cat"
      ? '<div><label for="reg-category">Type</label><select id="reg-category"></select></div>' : "") +
    "</div>";
  const webSection = g.web
    ? '<section class="gold-section" id="web-frontends"><h2>Web Apps</h2>' +
      '<p class="reg-count" id="web-count"></p><div class="reg-grid" id="web-grid"></div></section>'
    : "";
  const main =
    '<div class="wrap">\n' +
    '  <div class="gold-head"><div class="umbrella">☂</div><h1>' + g.h1 + "</h1>" +
    '<p class="sub">' + g.intro + "</p></div>\n" +
    webSection +
    '  <section class="gold-section">' + controls +
    '<p class="reg-count" id="reg-count"></p>' +
    '<div class="reg-grid" id="reg-grid"></div>' +
    '<p class="reg-empty" id="reg-empty" hidden>Nothing in the registry matches that — clear the search, or pick another type.</p>' +
    "</section>\n</div>\n" +
    "<script>window.GOLD_PAGE = " + JSON.stringify(g.cfg) + ";</script>\n" +
    '<script src="../registry-data.js"></script>\n' +
    '<script src="gold-render.js"></script>';
  return chrome("", g.title, "", main);
}

// ---------------------------------------------------------------------
// The Muse page itself: its own header becomes a hero div the shared
// navigation script does not remove, and it gains the two page-local
// assets (black-and-gold overrides + the gold link rewriter).
// ---------------------------------------------------------------------
function editMuseIndex(html) {
  let out = html;
  out = out.replace("  header{padding:64px 0 30px;", "  .muse-hero{padding:64px 0 30px;");
  out = out.replace("<header>\n  <div class=\"wrap\">", "<div class=\"muse-hero\">\n  <div class=\"wrap\">");
  out = out.replace("</header>", "</div>");
  if (!out.includes("gold-top.css")) {
    out = out.replace(
      '<link rel="stylesheet" href="/assets/site-navigation.css"></head>',
      '<link rel="stylesheet" href="/assets/site-navigation.css">\n<link rel="stylesheet" href="gold-top.css"></head>');
  }
  if (!out.includes("gold-top.js")) {
    out = out.replace(
      '<script src="/assets/site-navigation.js" defer></script></body>',
      '<script src="/assets/site-navigation.js" defer></script>\n<script src="gold-top.js" defer></script></body>');
  }
  if (out.includes("<header>") || !out.includes('class="muse-hero"')) {
    throw new Error("Muse index edit did not take — the page shape changed; refusing to write.");
  }
  return out;
}

// ---------------------------------------------------------------------
function write(rel, content) {
  const p = join(OUT, rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, content);
  console.log("wrote", rel, content.length);
}
function read(rel) {
  const p = join(ROOT, rel);
  if (!existsSync(p)) throw new Error("Missing source page: " + rel);
  return readFileSync(p, "utf8");
}

function main() {
  write(join(MUSE, "index.html"), editMuseIndex(read(join(MUSE, "index.html"))));
  write(join(MUSE, "gold-top.css"), GOLD_TOP_CSS);
  write(join(MUSE, "gold-top.js"), GOLD_TOP_JS);
  write(join(GOLD, "gold.css"), GOLD_CSS);
  write(join(GOLD, "gold-render.js"), GOLD_RENDER_JS);
  for (const page of CONTENT_PAGES) {
    const inGold = GOLD_MAP[page];
    const prefix = inGold.includes("/") ? "../" : "";
    const srcDir = page.includes("/") ? page.slice(0, page.lastIndexOf("/") + 1) : "";
    const t = transformPage(read(page), srcDir, prefix);
    write(join(GOLD, inGold),
      chrome(prefix, t.title, t.headExtra, '<main class="gold-content">\n' + t.body + "\n</main>"));
  }
  for (const g of GENERATED) {
    write(join(GOLD, g.file), generatedPage(g));
  }
  console.log("Done — Muse page top fixed, and " +
    (CONTENT_PAGES.length + GENERATED.length) + " black-and-gold pages written.");
}
main();
