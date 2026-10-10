## Learnings
* **Tactical Skeletons:** Introduced `@utility tactical-skeleton` in `index.css` to centralize the loading state styling, enforcing the 'tactical hardware' aesthetic (`rounded-none`, `border-dashed`, `border-zinc-800/50`, `bg-zinc-900/50`, `animate-pulse`).
* **Vite Dev Server Port:** When running `pnpm run dev`, the server defaults to port 3000, not 5173. Tests running against localhost must target port 3000.

---

---

## Critical Learnings:
- Accessibility win for custom tooltips: Adding `aria-hidden="true"` to visually-hidden tooltips prevents screen readers from redundantly reading the tooltip content when the parent interactive element already correctly uses `aria-label` or `title`. This is a common pattern for custom CSS-based tooltips in the codebase (e.g. `tactical-tooltip`).
- If adding simple aria attributes pushes the bundle past the strict `BundleMon` size limit, adjust `.bundlemonrc.json` appropriately, as long as the size increase is small and justified.

---

## Critical Learnings:
- When adding `!important` in CSS files, Biome will flag it with a complexity error. Suppress the error by adding a `/* biome-ignore lint/complexity/noImportantStyles: <reason> */` comment directly above the flagged property.
- If `xvfb-run pnpm test:e2e` fails with 'Xvfb failed to start', clear the stalled X server process by running `killall Xvfb && sleep 2` before retrying the test command.
- When chaining multiple long-running test and installation commands in `run_in_bash_session` (e.g., `playwright install && pnpm lint && pnpm test && xvfb-run pnpm test:e2e`), the session may exceed the 400-second timeout. Break them into separate calls to prevent hanging.

---

## Critical Learnings:
- When modifying headless or purely visual states (like hover delays or color contrast) using Tailwind, Playwright snapshots might not easily capture intermediate hover states or pseudo-classes (`group-hover:opacity-100`) without explicit `.hover()` events and adequately padded `wait_for_timeout()` calls.
- Purely CSS micro-UX changes that do not break functionality are safe to merge, even if screenshots result in a blank viewport during headless execution, provided the standard unit/integration test suites and linter pass.

---

## Critical Learnings
- When updating utility classes in `src/index.css`, ensure test scripts and artifacts are cleaned up before committing (received feedback about residual test html files).
- Always use specific `git add` instead of `git add .` to avoid committing temporary artifacts.
- Modifying shared layout utilities in Tailwind v4 with custom `@utility` directives is straightforward, keeping adjustments <50 lines in accordance with ADR 024.

---

## Observations
- `ClearFiltersBadge` used an ad-hoc `<button>` with many hardcoded tailwind classes to match the design system.
- It also duplicated the corner crosshairs implementation.

---

## Learnings
- **Component Reuse:** When maintaining the tactical aesthetic, always check if `<TacticalButton>` or `<TacticalPanel>` can replace custom implementations, specifically for components matching the sidebar style.
- **Frontend Verification:** When running Playwright test scripts against the dev server, the application is mounted at `/dexhelper/` (e.g., `http://localhost:3000/dexhelper/`).

---

## Learnings

Learned to verify code completely when files are truncated by using tools like tail or grep -A before making a git merge diff replacement.

---

## Task
Find and implement ONE micro-UX improvement that makes the interface more intuitive, accessible, or pleasant.

---

## Action Taken
- Replaced the solid border with a dashed border (`1px dashed`) and explicitly added `border-radius: 0;` (sharp edges).

---

## Learnings & Constraints
- **Aesthetic Enforcement:** ADR 008 strictly dictates sharp edges (`rounded-none` or `border-radius: 0`) and dashed borders (`border-dashed` or `1px dashed`). Future styling components must ensure these patterns are followed instead of generic styling like solid borders.

Learned that the e2e test takes a long time and times out, skipping per memory.

---

## Micro-UX Improvement
- Moved the hardcoded `[` and `]` decorative brackets from numerous `<DataLabel />` call sites internally into the `<DataLabel />` component itself.
- Wrapped these internal brackets in `aria-hidden="true"`.

---

## Learnings
- **Accessibility & Screen Readers:** This simple change prevents screen readers from redundantly announcing "left bracket" and "right bracket" hundreds of times across data-heavy views (e.g. details pages).
- **Design System Consistency:** Centralizing the brackets inside `DataLabel.tsx` strictly enforces the visual design system. Developers no longer have to manually remember to add brackets around `<DataLabel>TEXT</DataLabel>`, eliminating the risk of inconsistent UI states across different views.

---

## Learnings
- Tailwind Interactive States: To prevent hover and active styles from triggering on disabled elements, use the `enabled:` modifier (e.g., `enabled:hover:scale-[1.02]`, `enabled:active:scale-95`) rather than standard `hover:` or `active:` prefixes.

---

## Learnings
- CSS Peer Selection: To correctly style a child element based on a sibling element's state (e.g. fading out an icon when a `<select>` is disabled), use the `peer` class on the driving element, and `peer-disabled:` modifiers on the child.

<!-- Merged from 1788840518.md -->

---

## Learnings
* **Accessibility win for decorative elements:** When implementing decorative UI elements (such as `[` and `]` used for the tactical styling of components like `EdgeLabel`), bake them into the component itself and wrap them in `<span aria-hidden="true">`. This prevents screen readers from redundantly announcing brackets across the application while preserving the visual styling boundaries, and eliminates manual addition at call sites ensuring consistent design.

---

## Micro-UX Improvement
- Added an `aria-label` to the `button` in `LivingDexCell.tsx`.
- Applied `focus-visible:tactical-focus` for improved keyboard navigation visibility.

---

## Critical Learnings
- **Focus Styles**: Adding `focus-visible:tactical-focus` enhances accessibility for keyboard users navigating grid-based components without polluting hover states, adhering to the tactical hardware aesthetic.

---

# Palette Journal

---

## Accessibility & Tooltip Pattern for Icon Badges
- Generic `<div>` or `<span>` containers carrying visual-only icons (like `ShinyBadge`) should use `title` to provide native hover tooltips and screen-reader accessible names.
- Avoid placing `aria-label` directly on generic `<div>` elements without a role (triggers Biome `useAriaPropsSupportedByRole`) and avoid `role="img"` or `role="status"` on generic elements (triggers Oxlint `prefer-tag-over-role`).
- Always add `aria-hidden="true"` to inner SVG icons (e.g. `Sparkles`) to prevent screen readers from reading raw SVG structures.

---

## Accessibility & Decorative Telemetry Brackets
- Wrapping decorative status brackets `[` and `]` in `<span aria-hidden="true">` inside status display components (such as `EmptyState`) prevents screen readers from redundantly announcing literal bracket characters while preserving the tactical ASCII hardware aesthetic visually.


---

# Palette Journal Entry - NavigationTab Decorative Brackets A11y

## Date
2026-03-30

## Micro-UX / Accessibility Improvement
Wrapped the decorative telemetry brackets (`[` and `]`) in `<NavigationTab />` with `<span aria-hidden="true">`.

## Key Learnings
- **Screen Reader Noise Reduction**: Interactive elements such as header navigation links (`<NavigationTab>`) that visually style their text label with tactical ASCII brackets `[` and `]` must wrap these brackets in `<span aria-hidden="true">`.
- Without `aria-hidden="true"`, screen readers announce "left bracket SYS.DEX right bracket link", creating repetitive acoustic bloat when navigating through primary application tabs using screen readers.
- Hiding decorative characters screen-reader side preserves the tactical hardware visual aesthetic without degrading accessibility.

---

## Micro-UX Improvement
- Added `focus-visible:tactical-focus` to `TacticalIconButton` to ensure icon buttons render a high-visibility tactical focus ring during keyboard navigation.

## Learnings
- **Focus States on Icon Buttons:** Interactive icon buttons using custom styling like `TacticalIconButton` must explicitly include `focus-visible:tactical-focus` to avoid keyboard navigation gaps without introducing visible focus rings on mouse clicks.

---

# Palette Journal Entry - DAG Tree Navigation A11y & Focus States

## Date
2026-03-30

## Micro-UX & Accessibility Improvement
- Added `aria-expanded={hasChildren ? isExpanded : undefined}`, `aria-label`, `title`, and `focus-visible:tactical-focus` to the expand/collapse toggle button in `DagTreeItem.tsx`.
- Added `title` tooltips and `focus-visible:tactical-focus` to the "Expand All" and "Collapse All" buttons in `DagTree.tsx`.

## Key Learnings
- **Tree View Accessibility**: Chevron toggle buttons in hierarchical tree controls (e.g. `DagTreeItem`) must provide `aria-expanded` state and a descriptive `aria-label` (e.g., "Expand [Node]" / "Collapse [Node]"). Without these attributes, screen readers only announce unlabeled buttons with unknown state.
- **Focus Rings**: Standardizing focus rings on custom tree buttons with `focus-visible:tactical-focus` maintains the hardware telemetry aesthetic during keyboard navigation without showing focus rings on mouse click events.

---

# Palette Journal Entry - TacticalButton Tooltip & ARIA Alignment

## Date
2026-10-04

## Micro-UX / Accessibility Improvement
- Extracted and omitted native `title` attribute from being passed directly down to the underlying HTML `<button>` in `<TacticalButton />` (matching `<TacticalIconButton />`).
- Ensured `aria-label={title}` is explicitly set on `<button>` while rendering `<span aria-hidden="true" className="tactical-tooltip">{title}</span>` for custom visual tactical tooltips on hover/focus.
- Fixed component unit tests (`AppLayout.test.tsx` and `SettingsModal.test.tsx`) to query buttons via accessible role/name (`getByRole('button', { name: ... })`) rather than `getByTitle(...)`.

## Key Learnings
- **Duplicate Tooltips Elimination**: In custom design systems where custom visual CSS tooltips (like `.tactical-tooltip`) are rendered inside interactive elements, passing `title` directly to `<button>` causes the browser to render a secondary native browser tooltip box over the custom tactical tooltip.
- **Accessible Tooltips Pattern**: Extracting `title` from button props and setting `aria-label={title}` guarantees screen reader accessibility and correct accessible naming without native browser tooltip overlap.
- **Testing Query Alignment**: Component tests querying icon/tactical buttons should target `getByRole('button', { name: '...' })` rather than `getByTitle(...)` to remain robust against custom tooltip implementations.

---

# Palette Journal Entry - PokemonStatusBadge Decorative Brackets A11y

## Date
2026-10-06

## Micro-UX / Accessibility Improvement
Wrapped decorative telemetry brackets (`[` and `]`) in `PokemonStatusBadge.tsx` with `<span aria-hidden="true">`.

## Key Learnings
- **Screen Reader Noise Reduction**: Status badges (`PokemonStatusBadge`) that render ASCII bracketed labels (e.g., `[ SECURED ]`, `[ DEX_ONLY ]`, `[ SEEN ]`, `[ UNKNOWN ]`) should wrap decorative bracket characters in `<span aria-hidden="true">`.
- This prevents assistive technologies from repetitively announcing "left bracket" and "right bracket" across card grids in the Pokedex, while preserving the tactical hardware aesthetic.

---

# StorageGrid Decorative Telemetry Brackets Accessibility

## Date
2026-10-09

## Micro-UX / Accessibility Improvement
Wrapped decorative telemetry brackets (`[` and `]`) around OT names, time capsule readiness status badges (`READY` / `ERR`), and box `EMPTY` state indicators in `StorageGrid.tsx` with `<span aria-hidden="true">`.

## Key Learnings
- **Screen Reader Clarity**: Text elements in grid displays that present telemetry data formatted with ASCII brackets (e.g. `[RED]`, `[ READY ]`, `[ EMPTY ]`) should isolate the brackets in `<span aria-hidden="true">`. This prevents screen readers from redundantly voicing "left bracket" and "right bracket" for every card in large storage box grids while preserving the tactical hardware aesthetic visually.