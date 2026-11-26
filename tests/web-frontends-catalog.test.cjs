const assert = require("node:assert/strict");
const fs = require("node:fs");

const html = fs.readFileSync("front-ends.html", "utf8");
const nav = fs.readFileSync("assets/site-navigation.js", "utf8");
const start = html.indexOf('<h2 class="fe-h">The web apps.</h2>');
const end = html.indexOf('<h2 class="fe-h" id="desktop-frontends">', start);
assert.ok(start >= 0 && end > start, "web-app section boundaries must exist");
const web = html.slice(start, end);

function cardFor(title) {
  const titleAt = web.indexOf("<h2>" + title + "</h2>");
  assert.ok(titleAt >= 0, "missing web app card: " + title);
  const cardStart = web.lastIndexOf('<article class="card"', titleAt);
  const cardEnd = web.indexOf("</article>", titleAt);
  assert.ok(cardStart >= 0 && cardEnd > titleAt, "card boundaries missing: " + title);
  return web.slice(cardStart, cardEnd + "</article>".length);
}

const cash = cardFor("Cash Portfolio Web");
assert.match(cash, /TESTING · No live address yet/);
assert.match(cash, /apps\/cash-portfolio\.html/);
assert.doesNotMatch(cash, /github\.com/);

const aiCash = cardFor("AI Cash Portfolio Web");
assert.match(aiCash, /TESTING · No live address yet/);
assert.match(aiCash, /apps\/ai-cash-portfolio\.html/);
assert.doesNotMatch(aiCash, /github\.com/);

const flag = cardFor("Name That Flag Web");
assert.match(flag, /Prototype · Local only/);
assert.match(flag, /games\.html#name-that-flag/);
assert.doesNotMatch(flag, /github\.com/);

const kali = cardFor("Kali Linux Training Course Web");
assert.match(kali, /Player shell · Outline only · Not live/);
assert.match(kali, /course\.html#kali-linux/);
assert.match(kali, /Lesson content is not written yet/);
assert.doesNotMatch(kali, /github\.com/);

assert.match(nav, /\['Web Apps','\/front-ends\.html#web-frontends'\]/,
  "shared navigation must retain its Web Apps route to the catalogue");
console.log("PASS: web-front-end status, public-link, outline-only and shared-navigation contracts.");
