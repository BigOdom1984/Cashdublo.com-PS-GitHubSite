// Grok folder only — point this page's top links at this folder's
// Grok-design versions (all websites/Grok/edition/), so a visitor who
// follows a link from the top of the Grok page stays in this page's
// own design. The original pages are untouched; external links and
// in-page anchors are left exactly as they are. The scope is the
// page's top — its header bar, its hero, and its footer row — the
// same discipline as the Muse folder's gold-top.js.
(function () {
  "use strict";
  var EDITION = {
  "index.html": "index.html",
  "apps.html": "apps.html",
  "front-ends.html": "front-ends.html",
  "privacy.html": "privacy.html"
};
  var KEYS = Object.keys(EDITION).sort(function (a, b) { return b.length - a.length; });
  function editionHref(raw) {
    if (!raw) return null;
    if (/^(mailto:|tel:|#)/i.test(raw)) return null;
    var url;
    try { url = new URL(raw, window.location.href); } catch (e) { return null; }
    if (url.origin !== window.location.origin) return null;
    var path = url.pathname;
    for (var i = 0; i < KEYS.length; i++) {
      var key = "/" + KEYS[i];
      if (path === key || path.endsWith(key)) {
        return "edition/" + EDITION[KEYS[i]] + (url.hash || "");
      }
    }
    return null;
  }
  function rewrite() {
    var links = document.querySelectorAll(
      "header a[href], .hero a[href], footer a[href]");
    links.forEach(function (a) {
      if (a.dataset.cdEdition) return;
      var g = editionHref(a.getAttribute("href"));
      if (g) { a.setAttribute("href", g); a.dataset.cdEdition = "1"; }
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", rewrite);
  } else { rewrite(); }
  var mo = new MutationObserver(rewrite);
  mo.observe(document.documentElement, { childList: true, subtree: true });
  setTimeout(function () { mo.disconnect(); }, 15000);
})();
