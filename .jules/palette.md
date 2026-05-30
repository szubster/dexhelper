# Palette UX/A11y Learnings

## 2024-04-11 - Focus Visible Styles for Interactive Elements
**Learning:** Custom UI elements, mapped list buttons, standard HTML elements acting as buttons/links, inline text buttons, modal action buttons, and grid items often lack proper focus indicators when custom styling is applied. This heavily breaks keyboard navigation visibility across the application.
**Action:** Always ensure all interactive elements explicitly include the standard focus visible utilities (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950`). Use context-appropriate colors (like `ring-red-500` for destructive actions) when necessary.

## 2024-04-12 - Custom Segmented Control ARIA Roles
**Learning:** When creating custom segmented controls with mutually exclusive options, using `role="switch"` is incorrect as switches imply an on/off state. `role="group"` is also too generic. A segmented control is conceptually a set of radio buttons.
**Action:** Use `role="radiogroup"` for the container and `role="radio"` for the individual buttons, along with `aria-checked={boolean}` and proper `aria-label`s on the container, to ensure screen readers correctly interpret the mutually exclusive selection pattern.

## 2024-04-13 - Added aria-label to icon-only buttons
**Learning:** For accessibility, ensure all icon-only interactive elements (like buttons) include an `aria-label` attribute, as relying solely on the `title` attribute is insufficient for screen readers. Icon-only buttons (e.g. close buttons, clear input buttons) can also be visually ambiguous.
**Action:** Always provide a `title` attribute for sighted users alongside `aria-label` for screen readers to icon-only buttons and interactive card elements that act as links or triggers, ensuring the label clearly describes the action or destination.

## 2024-05-18 - File Upload Input Accessibility
**Learning:** Using `className="hidden"` on `<input type="file">` elements within a `<label>` hides them completely from the accessibility tree, making it impossible for screen reader users to understand or interact with the file input properly, and preventing keyboard focus.
**Action:** Instead of `className="hidden"`, use Tailwind's `className="sr-only"` combined with `tabIndex={-1}`. `sr-only` keeps the element accessible to screen readers but visually hidden. `tabIndex={-1}` ensures the input itself doesn't receive redundant keyboard focus.

## 2025-04-06 - Accessible Custom Toggles
**Learning:** Custom UI components designed to look like interactive switches lack inherent meaning for screen readers. Using just `<button>` with visual styles leaves assistive tech users unable to determine the current state (on/off) or the element's interactive nature as a toggle.
**Action:** Always verify that components visually functioning as switches use `role="switch"`, dynamically update `aria-checked`, provide a descriptive `aria-label`, and include distinct `:focus-visible` styles for clear keyboard navigation.

## 2026-04-07 - Inline Confirmation for Destructive Actions
**Learning:** Destructive actions inside easily dismissible modals are prone to accidental clicks. Adding an inline confirmation step prevents data loss without forcing the user out of their current context.
**Action:** Always implement a two-step inline confirmation (e.g., 'Delete' -> 'Cancel' / 'Confirm') for data-clearing actions within dialogs.

## 2026-04-09 - Accessible Search Inputs
**Learning:** Standard text inputs used for searching often lack intuitive keyboard navigation and immediate visual feedback when clearing text. Without focus returning to the input after clearing, users must manually re-focus the input to start a new search, disrupting the workflow.
**Action:** Always add keyboard shortcuts (like `Escape`) to clear search inputs. When a clear button is used, ensure it has visible focus styles and that its `onClick` handler programmatically returns focus back to the search input.

## 2026-04-10 - Empty States for Search and Filters
**Learning:** Data grids and lists that can be heavily filtered or searched often lack empty states. When a user applies a combination of filters that yields no results, presenting an empty UI implies a bug or broken data load.
**Action:** Always implement a distinct empty state for filtered lists. Use appropriate icons, clear messaging ("No results found"), and actionable advice (e.g., "Try adjusting your filters") to maintain context and guide the user.

## 2026-04-23 - Role Group for Checkbox-like Filters
**Learning:** Collections of buttons that act like a set of checkboxes (where multiple can be active simultaneously, indicated by `aria-pressed`) need a container role to group them semantically for screen readers.
**Action:** When creating a row or container of toggle buttons (like multi-select filters), wrap them in a container with `role="group"` and an `aria-label` describing the filter's purpose (e.g., "Filter Pokémon").

## 2026-04-20 - Clear Filters Button in Empty States
**Learning:** Empty states caused by active search or filter parameters should provide a single-click action to reset the state. Relying on users to manually clear text inputs or deselect filters across the UI creates unnecessary friction.
**Action:** When an empty state is triggered by a combination of filters, include a prominent "Clear Filters" button that programmatically resets all relevant filter/search states and returns the user to the default populated view.

## 2024-05-19 - File Upload Input Keyboard Navigation
**Learning:** Using `tabIndex={-1}` on a hidden `<input type="file">` prevents it from receiving keyboard focus. If the input is wrapped in a `<label>` to act as a custom upload button, the `<label>` itself does not natively receive focus, breaking keyboard navigation entirely.
**Action:** When creating custom file upload buttons with hidden inputs, do not use a `<label>` wrapper. Instead, use a semantic `<button type="button">` with `focus-visible` styles, and use an `onClick` handler to programmatically trigger the click on the sibling `<input type="file">` via its ID or a React ref.

- Added title tooltips to BottomNav elements corresponding to their aria-labels to improve usability for non-screenreader users.

## 2024-05-20 - Missing ARIA roles on segmented controls
**Learning:** When using `role="radiogroup"` on a container, the interactive child elements representing the mutually exclusive options must have `role="radio"` and `aria-checked` attributes, not generic `button` behaviors with `aria-pressed`. Otherwise, screen readers will interpret them as independent toggle buttons instead of a single choice group.
**Action:** Ensure custom segmented controls have `role="radio"` and `aria-checked` on the buttons, and that they use the correct tag, such as `<button>` with `oxlint-disable jsx-a11y/prefer-tag-over-role` and `biome-ignore lint/a11y/useSemanticElements` if styling constraints forbid native radio inputs.

## 2024-05-21 - Added tooltips to interactive card elements
**Learning:** For accessibility and micro-UX, interactive card elements that act as links or triggers must provide a `title` attribute for sighted users alongside the `aria-label` for screen readers.
**Action:** When creating or modifying card components that handle click events (e.g. `TacticalCard`), ensure they accept and render a `title` prop matching their `aria-label`.
- Added ARIA listbox roles to LocationSuggestions component to ensure screen reader compatibility, overriding generic div role and mapping individual suggestion buttons to options. Learned that Vite server starts on port 3000 here.

## 2024-05-22 - Modal Accessibility & UX
**Learning:** Modals that do not trap or lock body scrolling allow users to inadvertently scroll the page behind the modal, breaking the visual context. Additionally, missing Escape key listeners prevents users, especially those using keyboards, from easily dismissing the modal.
**Action:** Always ensure custom modals implement an `Escape` keydown listener to close the modal, and temporarily set `document.body.style.overflow = 'hidden'` while the modal is open (remembering to restore the original overflow when it closes).

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
