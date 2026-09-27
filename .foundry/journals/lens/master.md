# Visual Routing Constraints

**Pattern:** The `/assistant` route is currently missing or broken, displaying a generic error page during visual audits. A dedicated task (`task-000-001-fix-assistant-route-lens-audit.md`) has been created to track and resolve this issue. Future UI implementations should ensure that all base URL routing configurations (e.g., `/dexhelper/`) correctly map to their respective views.

---

---

# Visual Routing & Base Path Consistency Across Viewports

---

## Route Base Path Alignment
In Vite applications hosted on sub-paths (such as `/dexhelper/`), route navigation and visual audit scripts must strictly account for the base path prefix when inspecting routes like `/assistant`, `/storage`, `/dashboard`, `/dag`, `/safari-zone`, and `/box-analyzer`. Direct navigation to absolute paths without the base URL prefix results in 440/404 fallbacks or unrendered components during visual inspection.

---

## Responsive Layout & Tactical Hardware Aesthetic Safeguards
* **Monospaced Telemetry & Dashed Borders**: Component containers and status overlays across viewports (Desktop FullHD 1080p, 1440p, Mobile Pixel 9) require fixed min-widths on monospaced headers to prevent layout reflow when live data or save state toggles transition between Gen 1, Gen 2, and Gen 3 save states.
* **Strict Rounded-None Usage**: In accordance with ADR 008, sharp corners (`rounded-none`) must be preserved on tactical hardware cards and modal layovers. `rounded-full` is exclusively reserved for status indicator LEDs and reticle targets.

---

# Exploratory Visual Inspection & No-Stored-Screenshots Policy

---

## Elimination of Stored Screenshots
Static baseline pixel comparisons (`toHaveScreenshot()`) with stored PNGs in git created a false-positive trap: pre-existing layout and visual defects were frozen into baseline images, causing subsequent automated runs to pass with zero actionable feedback. All binary PNG snapshots in `tests/e2e/visual-audit.spec.ts-snapshots/` have been eliminated from git.

---

## Exploratory "Play with the App" Heuristics
Rather than passive screenshot diffs or rigid technical checklists, the Lens agent approaches the app through the eyes of an inquisitive human player. Technical rules (like bracket wrapping or overflow checks) are mere examples—a user perceives that something is wrong through broader categories of discomfort:
1. **Unfinished / Scaffolding Feel**: Large empty black voids, missing feedback, or text sounding like developer notes.
2. **Visual Discordance**: Crowded, squished elements, text clipping into borders, awkward whitespace, or unreadable contrast.
3. **Broken Interaction & Occlusion**: Fixed navigation bars burying the bottom of scrollable views, or floating overlays blocking interactive nodes.
4. **Data Inconsistency**: Desynchronized counters, `NaN`/`undefined` labels, or missing sprite assets.
5. **Mobile Hostility**: Claustrophobic navigation, microscopic tap targets, or horizontal page drift.

---

# Lens Journal — React 19 Suspense & Cross-Gen Save State Switching

---

## React 19 Lazy Loading Suspense Boundaries
In React 19, lazy-loaded route components (such as `DagWrapper` on `/dag`) throw an unhandled `use()` hook suspension warning (`This library called use() to suspend in a previous render but did not call use() when it finished`) if they suspend without an explicit `<Suspense>` boundary wrapping the component inside the route definition.
* **Resolution**: Replace `lazyRouteComponent` with `React.lazy()` and wrap lazy components in `<Suspense fallback={...}>`.

---

## Cross-Generation Save State Switching in Playwright
When running E2E visual tests that iterate through multiple save files (`yellow.sav`, `crystal.sav`, `emerald.sav`) within a test suite, `initializeWithSave` checks if `TRNR` text is already visible on the page. If a save state is already active, `initializeWithSave` skips overwriting IndexedDB.
* **Resolution**: Always invoke `clearStorage(page)` before calling `initializeWithSave` when switching save states.
* **Test Timeout Prevention**: Split multi-save assertion sequences into discrete `test()` blocks so that each save state initialization gets a fresh timeout budget.
