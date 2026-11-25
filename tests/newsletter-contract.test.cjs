const assert = require("node:assert/strict");
const fs = require("node:fs");

const read = (path) => fs.readFileSync(path, "utf8");
const news = read("news.html");
const site = read("site.js");
const loader = read("assets/site-navigation.js");
const repositories = read("repositories.html");
const generator = read("make_platform_pages.py");
const suggestions = read("SUGGESTIONS.md");

for (const id of ["comments", "cd-form", "cd-name", "cd-comment", "cd-sent"]) {
  assert.ok(site.includes('id="' + id + '"'), "shared comments dialog is missing #" + id);
}
assert.ok(news.includes("data-cd-open"), "newsletter navigation has no comments opener");
assert.ok(news.includes('<script src="site.js"></script>'), "newsletter page does not load the shared comment handler");
assert.ok(site.includes('panel=document.createElement("div")'), "shared script does not create the missing comments dialog");
assert.ok(site.includes('data-cd-close="comments"'), "comments dialog has no close control");
assert.ok(site.includes("mailto:cash.dublo@gmail.com"), "comment mailto must use the approved contact address");
assert.ok(!site.includes("CashDublo@gmail.com"), "stale comment email remains in site.js");
assert.ok(site.includes("new MutationObserver"), "newsletter popup must observe overlay dismissal");
assert.ok(!site.includes("tries>25"), "newsletter popup must not bypass an active overlay after a timeout");
assert.ok(loader.includes("&&![...document.querySelectorAll('link[rel=\"stylesheet\"]')].find"), "shared navigation stylesheet loader must check for an existing stylesheet before injecting");
for (const [name, source] of [["repositories.html", repositories], ["make_platform_pages.py", generator], ["SUGGESTIONS.md", suggestions]]) {
  assert.ok(!source.includes("CashDublo@gmail.com"), "stale approved-contact address remains in " + name);
}
assert.ok(repositories.includes("mailto:cash.dublo@gmail.com"), "repository page comment form does not use the approved contact");
assert.ok(generator.includes("cash.dublo@gmail.com"), "page generator template does not use the approved contact");
assert.ok(suggestions.includes("cash.dublo@gmail.com"), "suggestions contact address is not aligned");

console.log("PASS: newsletter comments, truthful mailto notice, approved contact, overlay sequencing, and nav stylesheet deduplication.");
