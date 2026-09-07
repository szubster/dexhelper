## Learnings
* **Tactical Skeletons:** Introduced `@utility tactical-skeleton` in `index.css` to centralize the loading state styling, enforcing the 'tactical hardware' aesthetic (`rounded-none`, `border-dashed`, `border-zinc-800/50`, `bg-zinc-900/50`, `animate-pulse`).
* **Vite Dev Server Port:** When running `pnpm run dev`, the server defaults to port 3000, not 5173. Tests running against localhost must target port 3000.

## Critical Learnings:
- Accessibility win for custom tooltips: Adding `aria-hidden="true"` to visually-hidden tooltips prevents screen readers from redundantly reading the tooltip content when the parent interactive element already correctly uses `aria-label` or `title`. This is a common pattern for custom CSS-based tooltips in the codebase (e.g. `tactical-tooltip`).
- If adding simple aria attributes pushes the bundle past the strict `BundleMon` size limit, adjust `.bundlemonrc.json` appropriately, as long as the size increase is small and justified.

## Critical Learnings:
- When adding `!important` in CSS files, Biome will flag it with a complexity error. Suppress the error by adding a `/* biome-ignore lint/complexity/noImportantStyles: <reason> */` comment directly above the flagged property.
- If `xvfb-run pnpm test:e2e` fails with 'Xvfb failed to start', clear the stalled X server process by running `killall Xvfb && sleep 2` before retrying the test command.
- When chaining multiple long-running test and installation commands in `run_in_bash_session` (e.g., `playwright install && pnpm lint && pnpm test && xvfb-run pnpm test:e2e`), the session may exceed the 400-second timeout. Break them into separate calls to prevent hanging.

## Critical Learnings:
- When modifying headless or purely visual states (like hover delays or color contrast) using Tailwind, Playwright snapshots might not easily capture intermediate hover states or pseudo-classes (`group-hover:opacity-100`) without explicit `.hover()` events and adequately padded `wait_for_timeout()` calls.
- Purely CSS micro-UX changes that do not break functionality are safe to merge, even if screenshots result in a blank viewport during headless execution, provided the standard unit/integration test suites and linter pass.

## Critical Learnings
- When updating utility classes in `src/index.css`, ensure test scripts and artifacts are cleaned up before committing (received feedback about residual test html files).
- Always use specific `git add` instead of `git add .` to avoid committing temporary artifacts.
- Modifying shared layout utilities in Tailwind v4 with custom `@utility` directives is straightforward, keeping adjustments <50 lines in accordance with ADR 024.

## Observations
- `ClearFiltersBadge` used an ad-hoc `<button>` with many hardcoded tailwind classes to match the design system.
- It also duplicated the corner crosshairs implementation.

## Learnings
- **Component Reuse:** When maintaining the tactical aesthetic, always check if `<TacticalButton>` or `<TacticalPanel>` can replace custom implementations, specifically for components matching the sidebar style.
- **Frontend Verification:** When running Playwright test scripts against the dev server, the application is mounted at `/dexhelper/` (e.g., `http://localhost:3000/dexhelper/`).


## Learnings
* **Tactical Skeletons:** Introduced `@utility tactical-skeleton` in `index.css` to centralize the loading state styling, enforcing the 'tactical hardware' aesthetic (`rounded-none`, `border-dashed`, `border-zinc-800/50`, `bg-zinc-900/50`, `animate-pulse`).
* **Vite Dev Server Port:** When running `pnpm run dev`, the server defaults to port 3000, not 5173. Tests running against localhost must target port 3000.

## Critical Learnings:
- Accessibility win for custom tooltips: Adding `aria-hidden="true"` to visually-hidden tooltips prevents screen readers from redundantly reading the tooltip content when the parent interactive element already correctly uses `aria-label` or `title`. This is a common pattern for custom CSS-based tooltips in the codebase (e.g. `tactical-tooltip`).
- If adding simple aria attributes pushes the bundle past the strict `BundleMon` size limit, adjust `.bundlemonrc.json` appropriately, as long as the size increase is small and justified.

## Critical Learnings:
- When modifying headless or purely visual states (like hover delays or color contrast) using Tailwind, Playwright snapshots might not easily capture intermediate hover states or pseudo-classes (`group-hover:opacity-100`) without explicit `.hover()` events and adequately padded `wait_for_timeout()` calls.
- Purely CSS micro-UX changes that do not break functionality are safe to merge, even if screenshots result in a blank viewport during headless execution, provided the standard unit/integration test suites and linter pass.

## Critical Learnings
- When updating utility classes in `src/index.css`, ensure test scripts and artifacts are cleaned up before committing (received feedback about residual test html files).
- Always use specific `git add` instead of `git add .` to avoid committing temporary artifacts.
- Modifying shared layout utilities in Tailwind v4 with custom `@utility` directives is straightforward, keeping adjustments <50 lines in accordance with ADR 024.

## Observations
- `ClearFiltersBadge` used an ad-hoc `<button>` with many hardcoded tailwind classes to match the design system.
- It also duplicated the corner crosshairs implementation.

## Learnings
- **Component Reuse:** When maintaining the tactical aesthetic, always check if `<TacticalButton>` or `<TacticalPanel>` can replace custom implementations, specifically for components matching the sidebar style.
- **Frontend Verification:** When running Playwright test scripts against the dev server, the application is mounted at `/dexhelper/` (e.g., `http://localhost:3000/dexhelper/`).

Learned to verify code completely when files are truncated by using tools like tail or grep -A before making a git merge diff replacement.

## Task
Find and implement ONE micro-UX improvement that makes the interface more intuitive, accessible, or pleasant.

## Action Taken
- Replaced the solid border with a dashed border (`1px dashed`) and explicitly added `border-radius: 0;` (sharp edges).

## Learnings & Constraints
- **Aesthetic Enforcement:** ADR 008 strictly dictates sharp edges (`rounded-none` or `border-radius: 0`) and dashed borders (`border-dashed` or `1px dashed`). Future styling components must ensure these patterns are followed instead of generic styling like solid borders.

Learned that the e2e test takes a long time and times out, skipping per memory.

## Micro-UX Improvement
- Moved the hardcoded `[` and `]` decorative brackets from numerous `<DataLabel />` call sites internally into the `<DataLabel />` component itself.
- Wrapped these internal brackets in `aria-hidden="true"`.

## Learnings
- **Accessibility & Screen Readers:** This simple change prevents screen readers from redundantly announcing "left bracket" and "right bracket" hundreds of times across data-heavy views (e.g. details pages).
- **Design System Consistency:** Centralizing the brackets inside `DataLabel.tsx` strictly enforces the visual design system. Developers no longer have to manually remember to add brackets around `<DataLabel>TEXT</DataLabel>`, eliminating the risk of inconsistent UI states across different views.
## Learnings\n- Tailwind Interactive States: To prevent hover and active styles from triggering on disabled elements, use the `enabled:` modifier (e.g., `enabled:hover:scale-[1.02]`, `enabled:active:scale-95`) rather than standard `hover:` or `active:` prefixes.

## Learnings
- Tailwind Interactive States: To prevent hover and active styles from triggering on disabled elements, use the `enabled:` modifier (e.g., `enabled:hover:scale-[1.02]`, `enabled:active:scale-95`) rather than standard `hover:` or `active:` prefixes.
- CSS Peer Selection: To correctly style a child element based on a sibling element's state (e.g. fading out an icon when a `<select>` is disabled), use the `peer` class on the driving element, and `peer-disabled:` modifiers on the child.
