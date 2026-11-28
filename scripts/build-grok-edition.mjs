// build-grok-edition.mjs — the Grok-design versions of the pages
// the Grok folder page's top links to.
//
// The Grok folder page (all websites/Grok/index.html) stands in its
// own design — near-black, cyan accent — and its top links (its
// header bar, its hero, its footer row) point at pages on the main
// site that wear the main site's design. This script builds a
// Grok-design version of each of those pages inside the Grok folder
// (all websites/Grok/edition/), and the page-local grok-top.js
// points the Grok page's top links at them, so a visitor who
// follows a link from the top of the Grok page stays in this
// folder's design. It is the Grok twin of
// scripts/build-muse-gold.mjs, in the same discipline:
//
//   - Pages that are generated app lists (All Apps, Front Ends) are
//     generated from the same registry data the Grok page carries
//     (../registry-data.js).
//   - Every other page keeps its own content, rewrapped in the
//     Grok folder's design, with the shared navigation stripped.
//   - The original pages are never edited; external links and
//     in-page anchors stay exactly as they are.
//   - The Grok page itself never loaded the shared site navigation,
//     so there are no shared bars on it to restyle — its own header
//     stands at its top in its own palette. Nothing shared is
//     touched by this script.
//
// Use (from a checkout of this repo):
//   node scripts/build-grok-edition.mjs [--root <repoRoot>] [--out <dir>]
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
const GROK = join("all websites", "Grok");
const EDITION = join(GROK, "edition");

// Site path (from the repo root) -> Grok-design file (from edition/).
// The set is exactly the in-website targets of the Grok page's top:
// its header brand and nav, its hero buttons, its footer row.
const EDITION_MAP = {
  "index.html": "index.html",
  "apps.html": "apps.html",
  "front-ends.html": "front-ends.html",
  "privacy.html": "privacy.html",
};

// Pages whose Grok-design version keeps the original page's content.
const CONTENT_PAGES = ["index.html", "privacy.html"];

// The Front Ends anchor group, exactly as the shared navigation
// writes it (label, anchor slug on front-ends.html). The generated
// Front Ends page gives every registry card its own app anchor and
// alias spans for these spellings, as the Muse folder's does.
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

// ---------------------------------------------------------------------
// edition.css — the Grok folder's design for the edition pages: the
// page's own header as a static top, a palette restyle for
// carried-over page content, and the registry card styles the
// generated list pages share with the Grok page itself. Palette is
// the Grok page's own: --bg #070708, --surface #111113,
// --surface-2 #18181b, --border #27272a, --text #fafafa,
// --muted #a1a1aa, --accent #22d3ee (cyan), --accent-2 #a78bfa,
// --deep #0c0c0e.
// ---------------------------------------------------------------------
const EDITION_CSS = `/* Grok-design versions — Grok folder. Palette is the Grok page's
   own: bg #070708, surface #111113, surface-2 #18181b,
   border #27272a, text #fafafa, muted #a1a1aa, accent #22d3ee,
   accent-2 #a78bfa, deep #0c0c0e. */
:root{
  --bg:#070708; --surface:#111113; --surface-2:#18181b;
  --border:#27272a; --text:#fafafa; --muted:#a1a1aa;
  --accent:#22d3ee; --accent-2:#a78bfa; --deep:#0c0c0e;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);
  font:16px/1.55 Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;
  -webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
a:hover{color:var(--accent)}
.wrap{max-width:1140px;margin:0 auto;padding:0 24px}

/* The static top — the Grok page's own header, standing on every
   edition page: brand left, the page's nav right. */
.edition-top{position:sticky;top:0;z-index:50;background:rgba(7,7,8,0.85);
  backdrop-filter:blur(12px);border-bottom:1px solid var(--border);
  padding:14px 5vw;display:flex;justify-content:space-between;
  align-items:center;gap:20px}
.edition-brand{font-weight:900;font-size:1.35rem;letter-spacing:-0.04em;color:var(--text)}
.edition-brand span{color:var(--accent)}
.edition-nav{display:flex;gap:22px;flex-wrap:wrap}
.edition-nav a{font-weight:600;font-size:0.9rem;opacity:0.9;color:var(--text)}
.edition-nav a:hover{opacity:1;color:var(--accent)}
@media(max-width:800px){
  .edition-top{flex-direction:column;align-items:flex-start}
  .edition-nav{gap:14px}
}

/* Page heading block on the generated list pages. */
.edition-head{padding:70px 0 8px}
.section-kicker{font-size:0.72rem;font-weight:800;letter-spacing:0.16em;
  text-transform:uppercase;color:var(--accent-2);margin-bottom:10px}
.edition-head h1{font-size:clamp(2.4rem,6vw,4.2rem);line-height:0.98;
  letter-spacing:-0.05em;font-weight:900;margin-bottom:16px}
.edition-head .intro{color:var(--muted);max-width:640px;font-size:1.08rem}
.edition-section{padding:30px 0 6px}
.edition-section h2{font-size:clamp(1.9rem,4.5vw,3.2rem);letter-spacing:-0.04em;
  line-height:1.1;margin-bottom:16px}

/* Carried-over content: the palette restyle. The original pages keep
   their own layout styles; these rules repaint the surfaces, words
   and controls in the Grok folder's design. */
.grok-content{max-width:1140px;margin:0 auto;padding:28px 24px 8px;background:var(--bg);color:var(--text)}
.grok-content h1,.grok-content h2,.grok-content h3{color:var(--text) !important}
.grok-content a{color:var(--accent)}
.grok-content section,.grok-content .hero,.grok-content .band,.grok-content .section-band,
.grok-content .featured,.grok-content .belief,.grok-content .ticker,.grok-content .full-bleed{
  background:var(--bg) !important;color:var(--text) !important}
.grok-content .card,.grok-content article,.grok-content .panel,.grok-content .tile,
.grok-content .box,.grok-content .item{
  background:var(--surface) !important;color:var(--text) !important;border-color:var(--border) !important}
.grok-content p,.grok-content li,.grok-content td,.grok-content span{color:inherit}
.grok-content table{border-color:var(--border)}
.grok-content th,.grok-content td{border-color:var(--border)}
.grok-content input,.grok-content select,.grok-content textarea{
  background:var(--surface);color:var(--text);border:1px solid var(--border);border-radius:8px}
.grok-content button,.grok-content .btn{
  background:var(--surface);color:var(--accent);border:1px solid var(--border);border-radius:999px}
.grok-content img{max-width:100%}

/* Registry cards — the Grok page's own card vocabulary. */
.reg-controls{display:flex;flex-wrap:wrap;gap:12px;align-items:flex-end;margin-top:28px}
.reg-controls .grow{flex:1 1 260px}
.reg-controls label{display:block;font-size:0.68rem;font-weight:800;
  letter-spacing:0.16em;text-transform:uppercase;color:var(--accent-2);margin-bottom:6px}
.reg-controls input,.reg-controls select{width:100%;background:var(--surface);color:var(--text);
  border:1px solid var(--border);border-radius:12px;padding:11px 14px;font:inherit;font-size:0.95rem}
.reg-controls input:focus,.reg-controls select:focus{outline:none;border-color:var(--accent)}
.reg-count{color:var(--muted);font-size:0.8rem;font-weight:700;
  letter-spacing:0.1em;text-transform:uppercase;margin-top:18px}
.reg-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px;margin-top:16px}
.card{background:var(--surface);border:1px solid var(--border);border-radius:18px;
  padding:22px;display:flex;flex-direction:column;transition:border-color 0.15s,transform 0.15s}
.card:hover{border-color:var(--accent);transform:translateY(-3px)}
.card h3{font-size:1.2rem;letter-spacing:-0.03em;margin:14px 0 8px}
.card p{color:var(--muted);font-size:0.92rem;flex:1}
.reg-card .head{display:flex;align-items:center;gap:12px}
.reg-card .tile{position:relative;flex:0 0 54px;width:54px;height:54px;
  border:1px solid var(--border);border-radius:14px;display:flex;align-items:center;
  justify-content:center;overflow:hidden;background:var(--surface-2);
  font-weight:900;font-size:1.05rem;letter-spacing:-0.03em;color:var(--accent)}
.reg-card .tile img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.reg-card h3{margin:0}
.reg-card .tagline{color:var(--accent-2);font-size:0.88rem;margin-top:12px;flex:none}
.reg-card .desc{color:var(--muted);font-size:0.92rem;margin-top:6px}
.chips{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 10px}
.chip{font-size:0.65rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;
  padding:4px 9px;border-radius:99px;border:1px solid var(--border);color:var(--muted)}
.chip.main{background:var(--accent);border-color:var(--accent);color:#0a0a0a}
.plat{font-size:0.72rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--accent)}
.reg-card .meta{color:var(--muted);font-size:0.8rem;margin-top:4px}
.reg-card .new{color:var(--text);font-size:0.88rem;margin-top:10px;flex:none}
.reg-card .new b{color:var(--accent)}
.shots{display:flex;gap:8px;overflow-x:auto;margin:12px 0 2px;padding-bottom:6px}
.shots img{height:118px;border:1px solid var(--border);border-radius:10px;flex:0 0 auto}
.price-line{font-weight:700;margin-top:auto;padding-top:14px}
.price-line small{display:block;font-weight:400;color:var(--muted);font-size:0.82rem}
.btn{display:inline-flex;align-items:center;gap:6px;padding:13px 22px;border-radius:999px;
  font-weight:700;font-size:0.95rem;transition:all 0.15s;margin-top:14px;align-self:flex-start}
.btn-ghost{background:transparent;border:1px solid var(--border);color:var(--text)}
.btn-ghost:hover{border-color:var(--accent);color:var(--accent)}
.reg-empty{color:var(--muted);font-size:0.98rem;border:1px dashed var(--border);
  border-radius:18px;padding:22px;text-align:center;margin-top:16px}
.grok-anchor{display:block;height:0;overflow:hidden}

.edition-foot{background:var(--deep);border-top:1px solid var(--border);
  padding:48px 24px;text-align:center;color:var(--muted);margin-top:56px}
.edition-foot a{color:var(--accent)}
.edition-foot strong{color:var(--text)}
.edition-note{max-width:1140px;margin:0 auto;padding:0 24px 30px;color:var(--muted);
  font-size:0.8rem;text-align:center}
`;

// ---------------------------------------------------------------------
// edition-render.js — registry card renderer for the generated
// edition list pages. Same cards and information as the Grok page's
// Full Shelf, drawn from the same registry data
// (../registry-data.js).
// ---------------------------------------------------------------------
const EDITION_RENDER_JS = `// Grok-design list pages — registry cards from the same data the
// Grok page carries (../registry-data.js). Page setup arrives as
// window.EDITION_PAGE = { mode: "apps" | "frontends", anchors: ... }.
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
function grokFilterApps(apps, q, plat, cat){
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
    '<a class="btn btn-ghost" href="' + esc(link) + '">View in the store</a>' +
    '</article>';
}

if (typeof document !== "undefined" && document.getElementById("reg-grid")) {
  (function(){
    var CFG = window.EDITION_PAGE || { mode: "apps" };
    var APPS = window.CD_GROK_APPS || [];
    var grid = document.getElementById("reg-grid");
    var count = document.getElementById("reg-count");
    var empty = document.getElementById("reg-empty");
    var searchBox = document.getElementById("reg-search");
    var platSel = document.getElementById("reg-platform");
    var catSel = document.getElementById("reg-category");

    var POOL = APPS;

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

    // Anchor map: the Front Ends page gives every card its own
    // app-<slug> id, plus alias spans for the navigation's spellings.
    function norm(s){ return String(s || "").toLowerCase().replace(/[^a-z0-9]/g, ""); }
    var byNorm = {};
    APPS.forEach(function(a){ byNorm[norm(a.slug)] = a.slug; });
    var anchorFor = {}; // slug -> [anchorIds]
    if (CFG.mode === "frontends" && CFG.anchors) {
      CFG.anchors.forEach(function(dslug){
        var rslug = byNorm[norm(dslug)];
        if (rslug && rslug !== dslug) {
          (anchorFor[rslug] = anchorFor[rslug] || []).push("app-" + dslug);
        }
      });
    }

    function render(){
      var list = grokFilterApps(POOL, searchBox ? searchBox.value : "",
        platSel ? platSel.value : "", catSel ? catSel.value : "");
      var html = list.map(function(a){
        var pre = (anchorFor[a.slug] || []).map(function(aid){
          return '<span class="grok-anchor" id="' + esc(aid) + '"></span>';
        }).join("");
        var card = cardHtml(a);
        if (CFG.mode === "frontends") {
          card = card.replace('<article class="card reg-card">',
            '<article class="card reg-card" id="app-' + esc(a.slug) + '">');
        }
        return pre + card;
      }).join("");
      grid.innerHTML = html;
      if (count) count.textContent = "Showing " + list.length + " of " + POOL.length + " in the registry";
      if (empty) empty.hidden = list.length !== 0;

      var webGrid = document.getElementById("web-grid");
      if (webGrid) {
        var webs = grokFilterApps(APPS.filter(function(a){ return (a.platforms || []).indexOf("web") !== -1; }),
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
// The edition chrome — the static top every edition page carries:
// the Grok page's own header (brand + its nav), in the Grok folder's
// design. Nav links point at edition siblings, and at the Grok
// page's own anchors for About and Apps.
// ---------------------------------------------------------------------
function chrome(prefix, title, headExtra, mainInner) {
  return "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n" +
    "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, viewport-fit=cover\">\n" +
    "<title>" + title + "</title>\n" +
    (headExtra ? headExtra + "\n" : "") +
    "<link rel=\"stylesheet\" href=\"" + prefix + "edition.css\">\n</head>\n<body>\n" +
    "<header class=\"edition-top\">\n" +
    "  <a class=\"edition-brand\" href=\"" + prefix + "index.html\">CASH<span>DUBLO</span></a>\n" +
    "  <nav class=\"edition-nav\">\n" +
    "    <a href=\"../index.html#about\">About</a>\n" +
    "    <a href=\"../index.html#featured\">Apps</a>\n" +
    "    <a href=\"" + prefix + "apps.html\">All Apps</a>\n" +
    "    <a href=\"" + prefix + "front-ends.html\">Front Ends</a>\n" +
    "    <a href=\"" + prefix + "privacy.html\">Privacy</a>\n" +
    "  </nav>\n</header>\n" +
    mainInner + "\n" +
    "<footer class=\"edition-foot\">\n" +
    "  <strong>CashDublo · Apps by Greg Odom</strong>\n" +
    "  <p style=\"margin:12px 0\">Independent software. Built with purpose. Made with care.</p>\n" +
    "  <p>\n    <a href=\"" + prefix + "apps.html\">All apps</a> ·\n" +
    "    <a href=\"" + prefix + "privacy.html\">Privacy</a> ·\n" +
    "    <a href=\"https://github.com/BigOdom1984\">GitHub</a>\n  </p>\n" +
    "  <p style=\"margin-top:20px; font-size:0.8rem\">\n" +
    "    © 2026 CashDublo. Product status should be verified against current releases.<br>\n" +
    "    <span style=\"color:var(--accent)\">Grok website edition</span> · Built by Grok · xAI\n  </p>\n" +
    "</footer>\n" +
    "<p class=\"edition-note\">The Grok-design version of this page, kept in the Grok folder. The original page stands untouched on the main site.</p>\n" +
    "</body>\n</html>\n";
}

// ---------------------------------------------------------------------
// Content pages: keep the original page's own styles and body
// content; drop the shared navigation (its script, stylesheets and
// any static copy of its bars); rewrite links and asset paths —
// edition-set pages to edition siblings, everything else to
// root-absolute so it resolves from inside the Grok folder.
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
  if (Object.prototype.hasOwnProperty.call(EDITION_MAP, sitePath)) {
    return prefix + EDITION_MAP[sitePath] + query + hash;
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
// the registry data at view time, like the Grok page itself.
// ---------------------------------------------------------------------
const GENERATED = [
  { file: "apps.html", title: "All Apps — CashDublo", h1: "All Apps",
    kicker: "The whole collection",
    intro: "Every app, game, tool and record in the CashDublo registry — the same cards and information the store carries, drawn from the registry itself. Search the list, or narrow it by platform and type.",
    cfg: { mode: "apps" }, controls: "full" },
  { file: "front-ends.html", title: "Front Ends — CashDublo", h1: "Front Ends",
    kicker: "One main door",
    intro: "Every front end in the registry — the web apps first, then the full catalog, each card under its own app anchor, drawn from the registry itself.",
    cfg: { mode: "frontends", anchors: APP_FRONTS.map((x) => x[1]) }, controls: "search", web: true },
];

function generatedPage(g) {
  const controls =
    '<div class="reg-controls">' +
    '<div class="grow"><label for="reg-search">Search</label>' +
    '<input id="reg-search" type="search" placeholder="Search — a name, a word, a kind…"></div>' +
    (g.controls === "full"
      ? '<div><label for="reg-platform">Platform</label><select id="reg-platform"></select></div>' +
        '<div><label for="reg-category">Type</label><select id="reg-category"></select></div>' : "") +
    "</div>";
  const webSection = g.web
    ? '<section class="edition-section" id="web-frontends"><h2>Web Apps</h2>' +
      '<p class="reg-count" id="web-count"></p><div class="reg-grid" id="web-grid"></div></section>'
    : "";
  const main =
    '<div class="wrap">\n' +
    '  <div class="edition-head"><div class="section-kicker">' + g.kicker + '</div><h1>' + g.h1 + "</h1>" +
    '<p class="intro">' + g.intro + "</p></div>\n" +
    webSection +
    '  <section class="edition-section">' + controls +
    '<p class="reg-count" id="reg-count"></p>' +
    '<div class="reg-grid" id="reg-grid"></div>' +
    '<p class="reg-empty" id="reg-empty" hidden>Nothing in the registry matches that — clear the search, or pick another platform or type.</p>' +
    "</section>\n</div>\n" +
    "<script>window.EDITION_PAGE = " + JSON.stringify(g.cfg) + ";</script>\n" +
    '<script src="../registry-data.js"></script>\n' +
    '<script src="edition-render.js"></script>';
  return chrome("", g.title, "", main);
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
  write(join(EDITION, "edition.css"), EDITION_CSS);
  write(join(EDITION, "edition-render.js"), EDITION_RENDER_JS);
  for (const page of CONTENT_PAGES) {
    const inEdition = EDITION_MAP[page];
    const t = transformPage(read(page), "", "");
    write(join(EDITION, inEdition),
      chrome("", t.title, t.headExtra, '<main class="grok-content">\n' + t.body + "\n</main>"));
  }
  for (const g of GENERATED) {
    write(join(EDITION, g.file), generatedPage(g));
  }
  console.log("Done — " + (CONTENT_PAGES.length + GENERATED.length) +
    " Grok-design pages written, with edition.css and edition-render.js.");
}
main();
