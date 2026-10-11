# Visual Routing Constraints

**Pattern:** The `/assistant` route is currently missing or broken, displaying a generic error page during visual audits. A dedicated task (`task-000-001-fix-assistant-route-lens-audit.md`) has been created to track and resolve this issue. Future UI implementations should ensure that all base URL routing configurations (e.g., `/dexhelper/`) correctly map to their respective views.

---

# Visual Routing & Base Path Consistency Across Viewports

## Route Base Path Alignment
In Vite applications hosted on sub-paths (such as `/dexhelper/`), route navigation and visual audit scripts must strictly account for the base path prefix when inspecting routes like `/assistant`, `/storage`, `/dashboard`, `/dag`, `/safari-zone`, and `/box-analyzer`. Direct navigation to absolute paths without the base URL prefix results in 440/404 fallbacks or unrendered components during visual inspection.

## Responsive Layout & Tactical Hardware Aesthetic Safeguards
* **Monospaced Telemetry & Dashed Borders**: Component containers and status overlays across viewports (Desktop FullHD 1080p, 1440p, Mobile Pixel 9) require fixed min-widths on monospaced headers to prevent layout reflow when live data or save state toggles transition between Gen 1, Gen 2, and Gen 3 save states.
* **Strict Rounded-None Usage**: In accordance with ADR 008, sharp corners (`rounded-none`) must be preserved on tactical hardware cards and modal layovers. `rounded-full` is exclusively reserved for status indicator LEDs and reticle targets.

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

## Mobile Navigation Alignment & Generation Context Filter
* **Generation-Specific Tab Visibility**: Mobile navigation (`BottomNav`) must dynamically align with the active save generation context (mirroring `AppHeader.tsx`). Tabs for Gen 2 (`DASH`) and Gen 3 (`SFRI`, `G3DB`) are hidden when no save or a Gen 1 save is active, preventing layout clutter and dead navigation routes.
* **Horizontal Navigation Enclosure**: Mobile control arrays maintain horizontal scrolling (`overflow-x-auto custom-scrollbar`) and minimum touch targets (`min-w-[52px]`) to ensure ergonomic operation across device viewports.

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


---

# Mobile Navigation Alignment & Generation Context Filter

## Overview
During visual and layout audit across mobile viewports (Pixel 9: 393x852) and generation save states (Gen 1 `yellow.sav`, Gen 2 `crystal.sav`, Gen 3 `emerald-vithuang.sav`), we observed that `BottomNav` rendered Gen 2 (`DASH`) and Gen 3 (`SFRI`, `G3DB`) navigation tabs unconditionally for all save states (including Gen 1 and no-save state), causing horizontal cramming and dead-end navigation targets.

## Key Changes & Remediation
1. **Generation-Filtered Tabs**: `BottomNav` now reads `saveData` from `useStore` and conditionally renders:
   - `DASH` (`/dashboard`) only when Gen 2 or Gen 3 save data is active.
   - `SFRI` (`/safari-zone`) and `G3DB` (`/gen3-dashboard`) only when Gen 3 save data is active.
2. **Horizontal Scrolling Enclosure**: Added `overflow-x-auto custom-scrollbar` and `min-w-[52px]` to button containers within `BottomNav` to guarantee touch target accessibility on narrow screens.
3. **Unit Test Verification**: Updated `src/components/__tests__/BottomNav.test.tsx` using `vitest-browser-react` and `page` from `vitest/browser` to verify conditional tab rendering across Gen 1, Gen 2, and Gen 3 save states.

## Architectural & QA Takeaways
- Mobile navigation controls must align with the active save context (matching `AppHeader.tsx`), eliminating invalid or empty-state navigation tabs.

---

# Lens Visual QA Audit Journal — 2025-10-02

## Exploration & Discoveries
During live web application inspection on Desktop FullHD (1920x1080) and Mobile Pixel 9 (393x852) viewports across save files (`yellow.sav`, `crystal.sav`, `emerald.sav`), two primary visual layout issues were identified on the main Search & Filters panel (`SearchAndFilters.tsx`):
1. **Vertical Button Misalignment**: `ClearFiltersBadge` rendered at `h-10` while adjacent filter buttons in `TacticalMultiSelectControl` rendered at `h-14`, creating an awkward height mismatch on the hardware control array.
2. **Bracket Text Wrapping**: Parameter routing badges (`[ SECURED ]`, `[ MISSING ]`, `[ DEX_ONLY ]`) wrapped brackets onto separate lines due to tight container widths (`min-w-[80px]`) and padding inside `FilterBadge.tsx`.
3. **Clipped Header Labels**: The `EdgeLabel` for `TARGET_ACQUISITION_ARRAY` was vertically clipped by the parent container's `overflow-hidden` class.

## Remediation Applied
* **Height Uniformity**: Adjusted `ClearFiltersBadge.tsx` button container height to `h-14` matching `TacticalMultiSelectControl`.
* **Inline Label Formatting**: Added `whitespace-nowrap inline-flex` to `FilterBadge.tsx` and widened `TacticalMultiSelectControl` button width to `min-w-[95px] xl:min-w-[105px]`, ensuring `[ SECURED ]`, `[ MISSING ]`, and `[ DEX_ONLY ]` render cleanly on a single line.
* **Unclipped Edge Labels**: Removed `overflow-hidden` from the left pane container in `SearchAndFilters.tsx` so edge label text renders unclipped above the border.

## Verification
* Executed local Playwright visual verification script (`verify_filters.py`), confirming unclipped headers, level button alignment, and zero bracket line wrapping in recorded screenshot and video.
* All 1947 unit/browser tests passed cleanly (`pnpm test`), and project-wide linting (`pnpm lint`) passed with 0 errors.

---

# Tactical Badge Non-Wrapping Guarantee — 2025-10-03

## Overview
During visual inspection of badge components across mobile and desktop viewports, `TacticalBadge` variant definitions were updated with `whitespace-nowrap` to enforce single-line text and bracket alignment.

## Key Changes & Remediation
* **Whitespace Preservation**: Updated `badgeVariants` in `src/components/TacticalBadge.tsx` to include `whitespace-nowrap`. This prevents badge labels or tactical brackets (`[ ]`) from splitting or wrapping vertically under constrained container widths.

---

# Lens Visual QA Audit Journal — 2025-10-03

## Exploration & Discoveries
During visual inspection and component class audit across `TacticalBadge` and tactical primitives, we identified potential line wrapping vulnerabilities on `TacticalBadge`:
* **Vertical Bracket & Label Wrapping**: While `.tactical-badge` in `@utility` defines flex layout, `badgeVariants` lacked `whitespace-nowrap`. Under tight flex container or grid boundaries, badge text labels or tactical brackets (`[ ]`) could wrap onto separate lines.

## Remediation Applied
* **Text Non-Wrapping**: Added `whitespace-nowrap` directly into `badgeVariants` in `src/components/TacticalBadge.tsx`.

## Verification & Key Learnings
* Verified `TacticalBadge.test.tsx` passes cleanly.
* `whitespace-nowrap` on badge variants prevents accidental multi-line text wrapping across narrow viewports and constrained flex containers.

---

# Lens Visual & Performance Audit Journal — 2026-10-06

## Visual & Virtualization Structure Audit
During live exploratory web page inspection and component structure analysis across routes (`/`, `/storage`, `/assistant`, `/box-analyzer`, `/dag`), we evaluated layout integrity and scrolling behavior across viewports (Mobile Pixel 9 and Desktop FullHD).

### Virtualized Grid Element Measurement Anomalies in `PokedexGrid`
* **Defect Identified**: `PokedexGrid` previously rendered a single absolute-positioned wrapper div around all virtual rows, while assigning `ref={virtualizer.measureElement}` and `data-index={virtualRow.index}` to every individual card container inside a single nested CSS grid.
* **Impact**: Registering `measureElement` on multiple card elements per row resulted in conflicting element height measurements for TanStack Virtual and caused vertical row positioning thrashing and potential row overlap during virtualized scrolling.
* **Remediation**: Refactored `PokedexGrid.tsx` to render each virtual row as its own discrete absolute-positioned element (`transform: translateY(${virtualRow.start}px)`), attaching `ref={virtualizer.measureElement}` and `data-index={virtualRow.index}` directly to the row container. Inside each row, a CSS grid renders the `columns` cards cleanly.

## Key Learnings & Architectural Rules
1. **Virtual Row Container Integrity**: When virtualizing grid items with TanStack Virtual, `measureElement` MUST be attached to the row container rather than child column items to ensure accurate row height calculations and prevent visual grid overlap or jitter.
2. **Tactical Aesthetic Adherence**: Verified that all tactical cards, status indicators, monospaced fonts, and dashed borders preserve sharp edges (`rounded-none`) across all viewports in compliance with ADR 008.

---

# Lens Visual QA Observation: TacticalInput EdgeLabel Spacing Constraint

## Insight & Design Constraint
When `TacticalInput` components utilize the `label` prop, `TacticalInput` renders an absolute-positioned `<EdgeLabel>` positioned at `-top-2 left-4`.
In tightly-spaced grid layouts or forms where inputs lack top padding on their parent container, the negative top offset (`-top-2`) causes the floating label boundary and ASCII brackets (`[ Label ]`) to overlap directly with the upper border of the input container.

## Rule for Future UI Development
Whenever `TacticalInput` is used with a `label` prop inside compact grid rows or forms without explicit top margin/padding, ensure `containerClassName="pt-2"` (or equivalent top margin/padding) is provided to ensure clean visual separation between the upper dashed input border and the floating tactical edge label.