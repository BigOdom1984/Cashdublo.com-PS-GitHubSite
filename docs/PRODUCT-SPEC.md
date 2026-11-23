# CashDublo Showcase Website — Product Specification

- Status: EXISTING SITE — audit and enhancement in progress; not a greenfield build
- Canonical repository: https://github.com/BigOdom1984/Cashdublo.com-PS-GitHubSite
- Canonical production source: repository root (not the experimental `all websites/` variants)
- Mission: “Change the World One App at a Time.”
- Brand: Apps by Cash to Blow / CashDublo

## Purpose
Present the CashDublo application ecosystem clearly, explain what each app does and why it is useful, and provide trustworthy links to available demos, downloads, privacy information, and product details.

## Scope and requirements
1. Responsive home/showcase with CashDublo identity, mission statement, app cards, app descriptions, value explanations, icons, and clear availability states.
2. App download buttons must distinguish released/demo downloads from planned products; never imply an unavailable build exists.
3. Where the current release-discovery mechanism is retained, resolve releases from the correct app/release source and handle missing, prerelease, or unavailable assets honestly.
4. Privacy policy page, 404 page, product catalogue, repository overview, and app/tool navigation.
5. Keep public information separate from private source code, confidential evidence, credentials, and internal planning.
6. Fast loading, mobile-first responsive layout, tablet support, accessible navigation, readable contrast, keyboard support, and reduced-motion support.
7. No trackers or third-party fonts/scripts unless explicitly approved and documented.
8. Multilingual-ready content structure; do not publish machine translations as reviewed translations without review.
9. Consistent CashDublo theme tokens and reusable UI patterns, without flattening each app's distinct identity.

## Architecture
- Static website in this repository's root.
- Existing key pages/files documented in the repository README: `index.html`, `privacy.html`, `404.html`, `repositories.html`, `products.html`, shared `assets/` and `img/`.
- Existing hosting targets and output configuration are documented in `HOSTING.md`.
- Experimental AI-specific designs under `all websites/` are not production sources; promote selected changes deliberately into root.
- Production API services remain separate from static hosting.

## Dependencies and integrations
- Prefer static assets and native browser capabilities.
- Any GitHub release lookup must be resilient to API errors, rate limits, missing releases, and missing assets.
- Do not expose private repository names or confidential data on public pages.

## Supported platforms
Modern desktop and mobile browsers; responsive tablet layouts. Static deployment targets are those declared in HOSTING.md. Do not claim native app targets for this website.

## Security and privacy
No secrets in client code. Minimize external requests. Validate and encode untrusted release metadata before rendering. Privacy claims must match actual telemetry and data flows. No analytics/tracking by default.

## UI/UX
Clear hierarchy: mission → app catalogue → what it does / why it is useful → honest availability/download state. Mobile navigation must not overflow. App cards and buttons must be accessible and usable on phone, tablet, and desktop.

## Testing and acceptance
- Build/deployment succeeds for each configured host.
- Test current desktop, narrow mobile, and tablet viewports.
- No horizontal overflow, broken navigation, missing assets, or dead links.
- Verify download links point to real, current release assets.
- Verify planned apps show a planned/coming-soon state.
- Validate privacy and product claims against implementation.
- Keyboard and screen-reader checks for navigation and app cards.
- Verify no credentials or private repository metadata leak into generated pages.

## Build and release
Follow the repository's HOSTING.md and existing deployment configuration. Test locally before deployment; do not replace the live site until acceptance checks pass.

## Current status / next work
The repository README identifies a live official website and a root-level canonical implementation. First audit the root source and live deployment, then implement incremental improvements. This specification does not claim a new deployment or completed audit.
