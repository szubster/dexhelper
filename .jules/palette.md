# Palette — UX & Accessibility Journal

## Core Directives
- **Empty PR Policy:** If you determine there is no actionable work to be done during this run, simply state that in your PR and complete your session. An empty PR diff is acceptable and will be closed automatically.
- **Environment Troubleshooting:** Do NOT try to fix environment issues like TypeScript errors in files you didn't touch, broken `pnpm install`, or failing unrelated tests. Simply proceed with the task as best you can and submit the PR.
- **Playwright Frontend Verification:** When writing Playwright scripts to verify frontend changes locally against the development server (`npm run dev`), use `http://localhost:3000` instead of Vite's default port 5173, as specified in `package.json`.
- **Scheduled Node Creation:** Scheduled or foundry agents can dynamically create new `IDEA`, `TASK`, `RESEARCH`, or `ADR` nodes in the `.foundry/` directory to document technical debt, architectural changes, or gaps in context. Appropriate `owner_persona` must be set for new nodes (e.g., `researcher` for RESEARCH, `architect` for ADRs).

## 2026-05-19 - Added ARIA attributes to DAG filter buttons
**Learning:** Filter buttons that act as toggle groups visually indicate state through color changes, but screen readers are unaware. Adding `aria-pressed={isActive}` to individual buttons and wrapping the group in `role="group"` with `aria-label` effectively communicates this interactivity.
**Action:** Replaced `src/components/dag/DagFilterPanel.tsx` to add `aria-pressed` properties to type and status filter buttons, and wrapped the filter areas with `role="group"` and descriptive `aria-label` attributes.
- Added `aria-label` and `title` to dynamic filter buttons in `DagFilterPanel.tsx` for improved accessibility and tooltip support.

## 2026-05-20 - Adding ARIA attributes dynamically to dialog elements
**Learning:** The 'Palette' persona must strictly isolate its work to accessibility and micro-UX enhancements (ARIA attributes, keyboard navigation, focus states). It must NEVER modify structural CSS, design system properties (e.g., altering `rounded` classes for aesthetics), or overlap with the 'Canvas' persona's responsibilities, as this causes UI regressions like breaking loading spinners. Also, when passing ARIA properties like `aria-label` to dynamic elements (e.g., `<div role={role}>`), use `// biome-ignore lint/a11y/useAriaPropsSupportedByRole: We will fix this in future` and `{/* oxlint-disable jsx-a11y/role-supports-aria-props */}` to suppress static analysis errors if the linter cannot infer the role at compile time.
**Action:** Added `aria-label`, `aria-labelledby`, and `aria-describedby` props to `TacticalModal` to improve screen reader descriptions, updated usages in `VersionModal`, `PokemonDetails`, and `SettingsModal` to pass these attributes, and correctly suppressed linter rules to allow these dynamic roles.

- Added `aria-current="page"` to active links in navigation for screen reader accessibility.
- Used `aria-expanded` on interactive buttons controlling menus/modals (e.g. settings button).
- **Playwright Frontend Verification:** When writing Playwright scripts to verify frontend changes locally against the development server (`npm run dev`), use `http://localhost:3000` instead of Vite's default port 5173, as specified in `package.json`.
- **Scheduled Node Creation:** Scheduled or foundry agents can dynamically create new `IDEA`, `TASK`, `RESEARCH`, or `ADR` nodes in the `.foundry/` directory to document technical debt, architectural changes, or gaps in context. Appropriate `owner_persona` must be set for new nodes (e.g., `researcher` for RESEARCH, `architect` for ADRs).

## 2026-05-19 - Added ARIA attributes to DAG filter buttons
**Learning:** Filter buttons that act as toggle groups visually indicate state through color changes, but screen readers are unaware. Adding `aria-pressed={isActive}` to individual buttons and wrapping the group in `role="group"` with `aria-label` effectively communicates this interactivity.
**Action:** Replaced `src/components/dag/DagFilterPanel.tsx` to add `aria-pressed` properties to type and status filter buttons, and wrapped the filter areas with `role="group"` and descriptive `aria-label` attributes.
- Added `aria-label` and `title` to dynamic filter buttons in `DagFilterPanel.tsx` for improved accessibility and tooltip support.

## 2026-06-15 - ARIA Labels and Titles for Interactive Progress Segments
**Learning:** Custom interactive elements that act as a scale or progress bar (e.g., HP setting segments) lack meaning for screen readers and sighted users without proper tooltips and ARIA states, especially if they are visually icon-only or generic geometric shapes.
**Action:** Always provide a descriptive `title` alongside `aria-label` for these segment buttons. Additionally, include `aria-pressed={isActive}` to programmatically expose which segments are active to assistive technologies.

## 2026-06-25 - Proper Segmented Control Semantics
**Learning:** For custom segmented controls that act as mutually exclusive options (like "Version", "Living Dex", or "Ball Style"), using `<div role="group">` and `<button aria-pressed="true/false">` is incorrect semantics. Screen readers need these to be identified as radio button groups.
**Action:** When implementing custom segmented controls with buttons, wrap them in `<div role="radiogroup" aria-label="...">` and use `<button role="radio" aria-checked={isActive}>`. Also, since the project enforces semantic HTML over ARIA roles where possible, add suppression comments (`/* oxlint-disable jsx-a11y/prefer-tag-over-role */` and `/* biome-ignore lint/a11y/useSemanticElements: segmented control needs proper styling */`) if styling constraints prevent using native `<input type="radio">` tags.

## 2026-06-25 - Proper Segmented Control Semantics
**Learning:** For custom segmented controls that act as mutually exclusive options (like "Version", "Living Dex", or "Ball Style"), using `<div role="group">` and `<button aria-pressed="true/false">` is incorrect semantics. Screen readers need these to be identified as radio button groups.
**Action:** When implementing custom segmented controls with buttons, wrap them in `<div role="radiogroup" aria-label="...">` and use `<button role="radio" aria-checked={isActive}>`. Also, since the project enforces semantic HTML over ARIA roles where possible, add suppression comments (`/* oxlint-disable jsx-a11y/prefer-tag-over-role */` and `/* biome-ignore lint/a11y/useSemanticElements: segmented control needs proper styling */`) if styling constraints prevent using native `<input type="radio">` tags.

## 2026-06-25 - Missing aria-label on <select> inputs
**Learning:** Native `<select>` inputs used for configuration options (like selecting a graveyard box) often lack a visible `<label>`. Screen readers cannot determine the purpose of the dropdown without an accessible name.
**Action:** Always provide an `aria-label` to native `<select>` elements if they are not explicitly linked to a `<label>` element with a `for`/`id` pair. Ensure the label clearly describes the action or configuration being changed.
## 2026-06-25 - ARIA Roles for Global Error Messages
**Learning:** When rendering dynamic global error messages or panels (e.g., `GlobalError.tsx`), screen readers are not inherently aware of the new DOM elements appearing on the screen. Users might miss critical system errors.
**Action:** Ensure the container for these global error messages uses `role="alert"` and `aria-live="assertive"`. This guarantees that screen readers will immediately interrupt the current announcement to read the error message, ensuring equal access to system feedback.
## 2026-06-25 - Redundant aria-label on <fieldset> contents
**Learning:** When improving accessibility for grouped controls, do not add `role="group"` or `aria-label` to a generic container (like a `div`) if it is directly nested inside a `<fieldset>` with a `<legend>`. The `<fieldset>` implicitly provides the group role and accessible name, and duplicating them causes redundant announcements for screen reader users.
**Action:** Always rely on native semantic HTML `<fieldset>` and `<legend>` for grouping form controls instead of manually re-applying redundant ARIA roles to inner child wrappers.

## 2026-06-25 - Overriding aria-label on interactive elements
**Learning:** Setting `aria-label` on an element with text content (like `<button aria-label="Name">Name [Count]</button>`) completely overrides and suppresses the text content of its children for screen readers. This hides critical information, such as counts or secondary data, from assistive technology users.
**Action:** Do not use `aria-label` if it omits visible content. Either omit the `aria-label` and let the screen reader calculate the accessible name from the child text nodes, or ensure the `aria-label` accurately represents the full visible text (e.g., `aria-label={`${name}, ${count} detected`}`).

## 2026-06-25 - ARIA Labels and Title tooltips for text buttons
**Learning:** To prevent WCAG 2.5.3 (Label in Name) violations, do not apply `aria-label` to buttons that already have clear, visible text (like "ALL", "SECURED", "MISSING") if the `aria-label` overwrites and omits the visible text. This breaks voice dictation. Furthermore, if a button already has a semantic `aria-pressed` state handling screen reader announcements, explicitly adding "Toggle" to its `aria-label` or `title` causes redundant verbosity for assistive tech (e.g., "Toggle fire filter, toggle button, pressed").
**Action:** When adding tooltip hover context to visible text buttons, prefer using the `title` attribute alone without `aria-label`. Ensure the `title` description is concise and omits redundant system states like "Toggle".

## 2026-06-25 - WCAG 2.5.3 (Label in Name) violations with `aria-label`
**Learning:** To avoid WCAG 2.5.3 (Label in Name) violations on UI components with visible text, prefer using `title` attributes for tooltips instead of `aria-label`. Using `aria-label` completely overwrites the accessible name and can break voice control software if the spoken text diverges from the aria-label.
**Action:** Replaced `aria-label` with `title` on the "Clear Filters", "Abort", and "Initiate system purge" text buttons.

## 2026-07-01 - Missing native indicators for custom select inputs
**Learning:** When using `appearance-none` on native `<select>` elements to remove default browser styling (e.g., the dropdown arrow), developers must explicitly provide an alternative visual indicator (like a custom chevron icon) so users recognize the element as a dropdown menu. Simply styling it as a text box or button without an indicator reduces discoverability.
**Action:** Wrapped the custom `<select>` component in a `relative` container and positioned a `ChevronDown` icon from the design system's icon library absolutely on the right to restore the dropdown affordance. Handled disabled states appropriately with `disabled:opacity-50 disabled:cursor-not-allowed`.
