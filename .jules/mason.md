# Mason Journal

## TacticalInput Extraction

- **What**: Extracted the repeating tactical `<input>` element pattern (including wrappers, label, corner crosshairs, and clear button) into a reusable `TacticalInput` component.
- **Why**: Found multiple repeating patterns for text inputs, particularly in `SearchAndFilters`, which makes the code messy. Extracting it to a generic tactical component standardizes the styling and logic.
- **Key Learnings**:
  - React.forwardRef is essential when wrapping inputs to allow refs to pass through normally.
  - The tactical input design has an absolute label, so placing `group` on the parent container ensures `group-focus-within` triggers styles appropriately when the inner input is focused.
## 2026-05-22 - Agent Initialized
- Mason agent established to focus on component extraction and deduplication.

## 2024-11-XX - CornerCrosshairs Extraction
- Identified a repeated JSX pattern for rendering tactical "corner crosshairs" using 4 absolute positioned `div` elements.
- Pattern was duplicated across `TacticalCard`, `AssistantSuggestionCard`, `SearchAndFilters`, `SettingsControls`, `ClearStorageButton`, `SettingsModal`, and `PokemonDetails`.
- Created a `CornerCrosshairs` component to encapsulate the markup and CSS logic, accepting a `className` and `thickness` prop.
- Reduced DOM bloat in source files and ensured consistency across the application.
## TacticalButton Extraction
- Identified recurring standard button patterns with identical styling across SearchAndFilters and ClearStorageButton.
- Successfully extracted this into `src/components/TacticalButton.tsx` to manage standard, primary, and danger variants along with internal crosshairs logic.
- Faced Playwright issues with intercepting pointer events, requiring `force=True` on locator clicks due to transparent full-screen overlay/fade-in animations.
2024-05-18 - Extracted `glass-card` styling into reusable `<GlassCard>` component.
- Pattern: Many components used the same `glass-card` CSS class with varied tailwind colored background/border opacity patterns (e.g. `border-emerald-500/10 bg-emerald-500/5`).
- Challenge: Determining the base variants. Handled by passing a string prop mapping to the common tailwind combinations.
- Win: Centralized styling logic, eliminated redundant classes across multiple `PokemonDetails` subcomponents.
## TelemetryDecoration Extraction
- Identified a recurring JSX pattern for the "SYS.[SOMETHING]" or "LINK_ACTIVE" telemetry labels found at the edges of modals or nav bars.
- These labels use absolute positioning, standard dashed borders, custom padding, tracking, and an animated pulsing dot.
- Extracted `TelemetryDecoration` into `src/components/TelemetryDecoration.tsx` to encapsulate this logic.
- **Key Learnings**:
  - The `cn` utility is very effective for overriding base tailwind classes in reusable components. For instance, `BottomNav` flips the border rounding (`rounded-t` instead of `rounded-b`) and `VersionModal` alters the standard text colors using `className` and `dotClassName` props, showing the value of granular styling overrides in standard components.

## TacticalModal Extraction

- **Pattern:** Found `fixed inset-0` with standard dialog layout (`div > backdrop`, `div > content`) repeated in multiple modal components (`SettingsModal`, `VersionModal`, `PokemonDetails`).
- **Solution:** Extracted a reusable `TacticalModal` component that standardizes `role="dialog"`, `aria-modal="true"`, background blurs (`backdrop-blur-*`), animations (`fade-in`, `zoom-in`, `slide-in-from-bottom`), and positioning.
- **Why it matters:** Centralizing modal structures reduces boilerplate and ensures accessibility props and closing behaviors are applied consistently across the application, adhering to the project's styling and UI constraints.
- **What**: Extracted the repeated inline radial-gradient LCD grid background into a reusable `<LcdGrid>` component.\n- **Why**: Reduced duplicated JSX and styling logic across `TacticalPanel`, `PokedexCard`, `SyncProgress`, and `PokemonDetails`.\n- **Key Learnings**: \n  - When extracting styling wrappers, use `React.forwardRef` and allow extending standard HTML attributes (`React.HTMLAttributes<HTMLDivElement>`) so callers can still pass custom `className`, `style`, or `opacity` without breaking the base styling.\n  - The `cn` utility seamlessly handles overriding utility classes on the new component.
- **What**: Extracted repeated badge styling into a reusable `TacticalBadge` component.\n- **Why**: Consolidated redundant utility classes like `rounded-none border border-dashed px-2 py-1 font-black text-[8px] uppercase tracking-widest` into a single, clean component mapping variants to specific theme colors.\n- **Key Learnings**: \n  - When standardizing components across different contexts (tables, layouts, headers), accepting a `className` prop and merging it with `cn()` is vital for one-off overrides like padding tweaks or margins while preserving the core tactical design language.\n  - `React.forwardRef` combined with `React.HTMLAttributes<HTMLSpanElement>` ensures the badge can easily receive refs or aria tags.
## SettingsRow Extraction
- Identified a repeated JSX pattern in `SettingsControls.tsx` for rendering rows with a `CornerCrosshairs`, an icon block, a label, and children.
- Extracted `SettingsRow` into `src/components/SettingsRow.tsx` to encapsulate this logic.
- **Key Learnings**:
  - Encapsulating the repeating icon styles via `iconColorClass` and generic children allowed a massive reduction of duplicated tailwind string constants in form controls.
## TacticalButton Usage Extraction

- I observed that native `<button>` and `<a>` elements across the app (`AppHeader.tsx`, `SettingsModal.tsx`, `BottomNav.tsx`) were using long repetitive styling that essentially mapped to the existing `TacticalButton` variants.
- While the task mentions extracting *new* components, reusing existing components that already encapsulate the desired design system logic is a best practice. It reduces repetition and creates modularity.
- Extracted and replaced several HTML buttons with `TacticalButton` with the `sidebar` and `secondary` variants.

## ScanlineOverlay Extraction
- **What**: Extracted repeated `<div className="scanline-overlay pointer-events-none absolute inset-0 opacity-10" />` patterns into a reusable `<ScanlineOverlay>` component.
- **Why**: Reduced duplicated JSX across multiple components like `TacticalPanel`, `LocationSuggestions`, `PokedexCard`, etc.
- **Key Learnings**:
  - The `opacityClass` prop allows customization (like `opacity-20` instead of the default `opacity-10`) without overwriting the core positioning.

## HoverScanner Extraction
- **What**: Extracted complex `<div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[var(--theme-primary)]/20 to-transparent opacity-0 transition-opacity group-hover:animate-[scan_2s_linear_infinite] group-hover:opacity-100" />` patterns into a reusable `<HoverScanner>` component.
- **Why**: Drastically improved readability of `PokedexCard`, `PokemonDetails`, and `VersionModal`.
- **Key Learnings**:
  - Allowing `colorClass` to be passed as a prop allowed the modal to utilize the primary theme with 10% opacity instead of 20%, maintaining flexibility while standardizing the CSS animation.

## DataPoint Extraction
- **What**: Extracted repeated `flex flex-col` blocks that pair an uppercase label and a bold value into a reusable `<DataPoint>` component.
- **Why**: Reduced duplicated JSX across multiple components including `AppHeader`, `PokemonCaughtDetails`, and `PokemonCatchProbability`. Standardizes the UI layout for data presentation.
- **Key Learnings**:
  - Separating `labelClassName` and `valueClassName` allows for necessary typographic variations (like alignment or colors) while still leveraging the base structural pattern.
  - Always manually verify existing files using tools like `grep` before attempting substitutions, as files may have drifted from expected state.
## NavButton Extraction
- **What**: Extracted repeated navigation button structures inside `BottomNav` into a reusable `NavButton` component.
- **Why**: Reduced boilerplate and code duplication within the navigation bar. Simplified the implementation of different menu items by defining common styles and behaviors in one place.
- **Key Learnings**:
  - Encapsulating logic like `isActive` to handle both routing and generic click events (e.g., toggling the settings modal) provides a robust structure for complex navigational elements.

## DiagnosticCard Extraction
- **What**: Extracted repeated telemetry/diagnostic card layout into `<DiagnosticCard>` component.
- **Why**: Reduced duplicated JSX across `AssistantDebugView` which had 4 identical blocks. It can also be reused if other parts of the app need a telemetry card.
- **Key Learnings**:
  - The `valueClassName` prop is crucial when extracting text components, allowing customization like `truncate` or `uppercase` while maintaining identical base text styles.

## InlineLink Extraction
- **What**: Extracted repeated inline link button elements (standard `<button className="rounded-none underline..."></button>` with variant-specific colors) into an `InlineLink` reusable component.
- **Why**: Reduced duplicated JSX in `PokemonEvolutions.tsx`. Standardized interaction styles, underline offsets, and hover variants for typical navigation links without needing to pass down the large class string every time.
- **Key Learnings**:
  - Make sure to extend standard attributes (e.g. `React.ButtonHTMLAttributes<HTMLButtonElement>`) and forward refs (`React.forwardRef`) so accessibility properties like `aria-label` or raw `onClick` handlers pass down appropriately without breaking.

## SectionHeader Extraction
- **What**: Extracted the repeating `<h3>` element pattern (including flex layout, font-black, size, uppercase, and large tracking) into a reusable `SectionHeader` component.
- **Why**: Found multiple repeating patterns for section headers, particularly across all `PokemonDetails` subcomponents (`PokemonLocations`, `PokemonEvolutions`, `PokemonCatchProbability`, `PokemonCaughtDetails`) and `SettingsLegend`. Centralizing this makes global typography changes to section headers trivial.
- **Key Learnings**:
  - `React.HTMLAttributes<HTMLHeadingElement>` includes a built-in `title` prop typed as `string | undefined`, which conflicts if you want `title` to accept a `React.ReactNode` for rendering JSX elements inline. To fix this type clash when using TypeScript, use `Omit<React.HTMLAttributes<HTMLHeadingElement>, 'title'>` when extending the interface.

## Fix CI: Test has no assertions
- **What**: CI failed because three tests in `src/components/assistant/__tests__/AssistantSuggestionCard.test.tsx` had no assertions. I added `await expect.element(page.getByText(...)).toBeVisible()` to satisfy the `oxlint` `vitest(expect-expect)` rule.
- **Why**: The rule enforces that every test has at least one assertion.

## TacticalBadge Refactoring
- Identified repeated inline JSX patterns for standard badge styles (`rounded-none border border-... border-dashed bg-... px-... py-... font-black text-... uppercase tracking-widest`) scattered across multiple components (`PokemonLocations.tsx`, `PokemonCatchProbability.tsx`, `PokemonEvolutions.tsx`, `PokemonCaughtDetails.tsx`).
- Replaced these repetitive raw `div` and `span` blocks with the existing `TacticalBadge` reusable component, significantly cleaning up the markup.
- **Key Learnings**:
  - Reusing existing components like `TacticalBadge` is crucial for code modularity and adherence to the project's aesthetic constraints (e.g., sharp edges, dashed borders).
  - Always verify that the extracted component matches the exact styling variants (e.g., `emerald`, `red`, `zinc`, `primary`) needed by the specific contexts.
