# Visual Routing Constraints

**Pattern:** The `/assistant` route is currently missing or broken, displaying a generic error page during visual audits. A dedicated task (`task-000-001-fix-assistant-route-lens-audit.md`) has been created to track and resolve this issue. Future UI implementations should ensure that all base URL routing configurations (e.g., `/dexhelper/`) correctly map to their respective views.

---

# Visual Routing & Base Path Consistency Across Viewports

## Route Base Path Alignment
In Vite applications hosted on sub-paths (such as `/dexhelper/`), route navigation and visual audit scripts must strictly account for the base path prefix when inspecting routes like `/assistant`, `/storage`, `/dashboard`, `/dag`, `/safari-zone`, and `/box-analyzer`. Direct navigation to absolute paths without the base URL prefix results in 440/404 fallbacks or unrendered components during visual inspection.

## Responsive Layout & Tactical Hardware Aesthetic Safeguards
* **Monospaced Telemetry & Dashed Borders**: Component containers and status overlays across viewports (Desktop FullHD 1080p, 1440p, Mobile Pixel 9) require fixed min-widths on monospaced headers to prevent layout reflow when live data or save state toggles transition between Gen 1, Gen 2, and Gen 3 save states.
* **Strict Rounded-None Usage**: In accordance with ADR 008, sharp corners (`rounded-none`) must be preserved on tactical hardware cards and modal layovers. `rounded-full` is exclusively reserved for status indicator LEDs and reticle targets.
* **Mobile Control Array Clearance**: Content-heavy grid and list views (such as `StorageGrid`) must explicitly provide bottom margin/padding (`pb-20` / `pb-24`) on mobile viewports to prevent fixed bottom control arrays (`SYS.CONTROL_ARRAY` / `BottomNav`) from covering card content and interactive actions.
* **Actionable Empty States**: Empty telemetry states must provide actionable user guidance (e.g., instructing the user to upload save data via `[ UPLOAD.SYS ]`) rather than displaying ambiguous raw offline warnings.

---

# Exploratory Visual Inspection & No-Stored-Screenshots Policy

## Elimination of Stored Screenshots
Static baseline pixel comparisons (`toHaveScreenshot()`) with stored PNGs in git created a false-positive trap: pre-existing layout and visual defects were frozen into baseline images, causing subsequent automated runs to pass with zero actionable feedback. All binary PNG snapshots in `tests/e2e/visual-audit.spec.ts-snapshots/` have been eliminated from git.

## Exploratory "Play with the App" Heuristics
Rather than passive screenshot diffs or rigid technical checklists, the Lens agent approaches the app through the eyes of an inquisitive human player. Technical rules (like bracket wrapping or overflow checks) are mere examples—a user perceives that something is wrong through broader categories of discomfort:
1. **Unfinished / Scaffolding Feel**: Large empty black voids, missing feedback, or text sounding like developer notes.
2. **Visual Discordance**: Crowded, squished elements, text clipping into borders, awkward whitespace, or unreadable contrast.
3. **Broken Interaction & Occlusion**: Fixed navigation bars burying the bottom of scrollable views, or floating overlays blocking interactive nodes.
4. **Data Inconsistency**: Desynchronized counters, `NaN`/`undefined` labels, or missing sprite assets.
5. **Mobile Hostility**: Claustrophobic navigation, microscopic tap targets, or horizontal page drift.

---

# Ephemeral Scratch Exploration & Direct Remediation Policy

## Lessons from PR #8852 (The "Journal-Only" Trap)
In PR #8852, the agent conducted an audit, noticed real risks (e.g. mobile bottom bar occlusion requiring padding), but failed to fix the code or file a task. Instead, it submitted a PR containing only a journal stating that everything was verified and passed. This pattern defeats the purpose of the agent.

## Core Operational Workflow
1. **No Permanent Committed Test**: There is no permanent E2E test suite for visual audit (`visual-audit.spec.ts` has been deleted).
2. **AI Exploring the Live App**: Lens runs the dev server (`pnpm dev`) and dynamically browses the application. If Lens uses browser scripts, it writes temporary scratch scripts and takes ephemeral screenshots that are analyzed and discarded.
3. **Direct Remediation Mandate**: When an anomaly, visual defect, or layout awkwardness is discovered, Lens must **fix the code directly in `src/`** and verify the fix, or create a Foundry `TASK` node if the fix requires larger architectural work.
4. **No "Everything is Fine" PRs**: Every Lens session must result in real code improvements or concrete Foundry defect nodes.

---

# React 19 Suspense & Cross-Gen Save State Switching

## React 19 Lazy Loading Suspense Boundaries
In React 19, lazy-loaded route components (such as `DagWrapper` on `/dag`) throw an unhandled `use()` hook suspension warning (`This library called use() to suspend in a previous render but did not call use() when it finished`) if they suspend without an explicit `<Suspense>` boundary wrapping the component inside the route definition.
* **Resolution**: Replace `lazyRouteComponent` with `React.lazy()` and wrap lazy components in `<Suspense fallback={...}>`.

---

# Exploratory Layout Audit Findings

## Mobile Viewport Bottom Nav Margin Requirements
* **Fixed Bottom Bar Occlusion Risk**: On mobile viewports (Pixel 9: 393x852), fixed bottom navigation arrays (`BottomNav`) span y-coords 752-852px (~100px fixed height). Scrollable route containers must consistently maintain bottom padding (`pb-24` / `pb-28`) to prevent interactive card footers from being hidden beneath the fixed control array.
* **Horizontal Overflow**: Verified that `scrollWidth <= clientWidth + 2` holds across all application routes during exploratory interaction tests and save state toggles.


---

# Lens Exploratory Visual & Layout Audit Journal — 2025-09-28

## Exploration & Journey Overview
In accordance with the Skeptical Player Mindset and the Exploratory Visual QA directives, an exploratory visual layout audit was conducted across 9 application routes (`/`, `/dashboard`, `/storage`, `/assistant`, `/dag`, `/safari-zone`, `/box-analyzer`, `/emulator`, `/gen3-dashboard`) and 3 primary viewports (Mobile Pixel 9: 393x852, Desktop FullHD: 1920x1080, Desktop 1440p: 2560x1440).

## Findings & Categories of Discomfort

### 1. Mobile Navigation & Viewport Responsiveness (Pixel 9 Viewport)
* **User Intent**: A trainer operating DexHelper on a handheld device (Pixel 9 viewport) navigating across main application views.
* **Observed Behavior**: The fixed bottom navigation bar (`SYS.CONTROL_ARRAY` / `BottomNav`) consumes approximately 100px at the bottom of the viewport (`y: 752` to `852`).
* **Visual & Ergonomic Impact**: While document scroll height equals viewport height on non-scrollable root routes (`852px`), content-heavy views rely on proper bottom padding (`pb-24` or `pb-28`) to prevent interactive elements at the bottom of cards from being occluded by the fixed control bar.
* **Remediation & Safeguards**: Ensure all route views maintain container bottom padding matching or exceeding the bottom navigation height (min `padding-bottom: 6rem`).

### 2. Cross-Generation State Stability
* **User Intent**: Switching between Gen 1 (`yellow.sav`), Gen 2 (`crystal.sav`), and Gen 3 (`emerald.sav`) save files to inspect telemetry.
* **Observed Behavior**: Tactical monospaced telemetry headers (`GEN I`, `GEN II`, `GEN III`) render stably without causing horizontal overflow or document line wrapping.
* **No-Stored-Screenshots Policy**: The test suite (`tests/e2e/visual-audit.spec.ts`) verified that DOM-aware assertions (checking horizontal overflow `scrollWidth <= clientWidth + 2` and checking for isolated bracket wrapping) pass across all routes without relying on brittle stored PNG snapshots.

### 3. Tactical Hardware Aesthetic Compliance
* **Sharp Edges & Monospaced Fonts**: Tactical hardware panels strictly adhere to `rounded-none` borders and `font-mono` styling across viewports, satisfying ADR 008.
* **Bracket Wrapping**: No isolated tactical ASCII brackets (`[` or `]`) were found split onto separate lines.
