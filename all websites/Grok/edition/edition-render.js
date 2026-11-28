// Grok-design list pages — registry cards from the same data the
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
  var parts = String(name || "").split(/\s+/).filter(function(w){ return w; });
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
    (a.whats_new ? '<p class="new"><b>What\'s new:</b> ' + esc(a.whats_new) + '</p>' : '') +
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
