# Cash Flow Corporate Website — Initial Architecture

**Status:** Prototype implementation on a review branch; not merged or deployed.
**Repository:** BigOdom1984/Cashdublo.com-PS-GitHubSite
**Path:** corporate/
**Purpose:** Present the Cash Flow umbrella vision as one parent company experience with four distinct customer-facing business division websites.

## Structure

- `index.html` — parent-company overview and division selector.
- `digital/index.html` — CashDublo Digital: apps, desktop software and store.
- `learning/index.html` — CashDublo Learning: courses and practical education.
- `studio/index.html` — CashDublo Studio: games, music and creative software.
- `get-cash/index.html` — Get Cash: developer workspace, APIs and website/digital services.
- `assets/corporate.css` — shared responsive visual system.
- `assets/corporate.js` — accessible mobile navigation behavior.

## Brand and legal presentation

Cash Flow is the proposed umbrella brand from the planning documents. The site treats the four areas as operating divisions/customer-facing brands, not four registered subsidiaries. It does not state that Cash Flow LLC or CashDublo LLC is formed, does not assert ownership transfers, and does not characterize Cash to Flow as a current affiliate. The historical Cash to Flow business identity remains subject to licence and entity verification.

The four divisions group the recorded business model as follows:
1. CashDublo Apps and Store → CashDublo Digital.
2. CashDublo Learning → CashDublo Learning.
3. CashDublo Studio / Engine → CashDublo Studio.
4. Get Cash, CashDublo API and Website Design → Get Cash Platform.

These are website information-architecture groupings, not legal-entity determinations. A future corporate/legal review may rename, split or combine the divisions.

## Design principles

- Parent brand is calm, confident and corporate; divisions have distinct color treatments but share typography, navigation behavior and spacing.
- Desktop-first editorial hero with a responsive card grid; usable on phones and tablets.
- Semantic HTML, keyboard-operable navigation, visible focus, reduced-motion support, and no external JavaScript dependencies.
- Product status, pricing, availability and platform claims remain evidence-based.
- No fabricated testimonials, customer counts, revenue, certifications, offices, subsidiary status or service availability.
- Existing root website, catalogue and other pages remain unchanged in this prototype.

## QA / acceptance

- [x] All five pages use the shared corporate stylesheet and navigation script.
- [x] All four divisions link back to the parent.
- [x] Parent page links to each division.
- [x] Relative links to existing catalogue, course, games and website-design pages are used.
- [x] Legal/brand caveat is visible on parent and division pages.
- [ ] Run HTML validation and link checker.
- [ ] Browser test at phone, tablet and desktop widths.
- [ ] Keyboard and screen-reader review.
- [ ] General/ONYX independent review and pinned verification.
- [ ] President review before merge or production deployment.

## Rollback

Revert the single corporate-site prototype commit or remove the `corporate/` directory from the feature branch. No existing root page or production service is changed by this prototype.
