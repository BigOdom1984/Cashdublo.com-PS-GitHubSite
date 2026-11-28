// Muse folder only — point the shared navigation's top links at this
// folder's black-and-gold versions (all websites/muse/gold/), so a
// visitor who follows any link from the top of the Muse page stays
// in black and gold. The original pages are untouched; external
// links and in-page anchors are left exactly as they are.
(function () {
  "use strict";
  var GOLD = {
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
  "privacy.html": "privacy.html"
};
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
