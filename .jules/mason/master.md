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

## InlineDataPoint Extraction
- **What**: Extracted a repeated JSX pattern in `AppHeader.tsx` consisting of a side-by-side uppercase tracking label and a bold value into an `InlineDataPoint` reusable component.
- **Why**: Reduced duplication of the verbose tactical utility classes `font-black font-mono text-[8px] text-zinc-500 uppercase tracking-widest` and allowed for standard horizontal metrics presentation.
- **Key Learnings**:
  - Distinguishing between vertical representations (like the existing `DataPoint` component) and horizontal ones (`InlineDataPoint`) is necessary since the layout structures (`flex-col` vs `items-center`) dictate the context of the data.
  - Using `valueClassName` and `labelClassName` gives flexibility for minor styling tweaks like making values bold or specific colors (like `text-zinc-300`) without breaking the core pattern.

## TacticalIconButton Extraction
- **What**: Extracted repeated icon-only button patterns (often containing a single Lucide `X` icon, absolute positioning, hover effects, and strict accessibility tags) into a reusable `<TacticalIconButton>` component.
- **Why**: Consolidated complex, duplicated `focus-visible` Tailwind classes and transition behaviors into a standardized component. This pattern was found across `LocationSuggestions.tsx`, `TacticalInput.tsx`, and `PokemonDetails.tsx`.
- **Key Learnings**:
  - Always extend standard HTML attributes (e.g. `React.ButtonHTMLAttributes<HTMLButtonElement>`) and forward refs (`React.forwardRef`) to ensure callers can supply strict accessibility properties (`aria-label`, `title`) without redefining them on the props interface.
  - Set a default `type="button"` on the inner element to prevent accidental form submissions when the component is eventually utilized inside a `fieldset` or `form`.
  - Ensure the internal `className` explicitly allows for overriding absolute positioning and padding since icon-only buttons often serve as absolute-positioned decorators (like close buttons or input clear buttons).

## AppHeader Refactoring - VerticalDivider and NavigationTab
- **What**: Extracted repeated vertical dashed divider elements (`<div className="w-[1px] border-zinc-800 border-r border-dashed bg-zinc-800" />`) into a reusable `<VerticalDivider>` component.
- **What**: Extracted repeated navigation link setups inside the main header (incorporating active/inactive tailwind states, corner crosshairs, and monospaced text) into `<NavigationTab>`.
- **Why**: Cleaned up the heavily dense `AppHeader.tsx`. Consolidating `NavigationTab` ensures we do not have to copy-paste the extremely verbose Tailwind class list and `CornerCrosshairs` setup every time we add a new primary navigational route to the app.
- **Key Learnings**:
  - Utilizing `Omit<LinkProps, 'activeProps' | 'inactiveProps' | 'className'>` ensures the parent `<NavigationTab>` strictly governs the styling and routing state styles, preventing accidental overrides from callers while still allowing them to pass standard Tanstack `to` attributes.
  - Exposing `className` on tiny, structural components like `<VerticalDivider>` using `cn()` is incredibly powerful, because we can trivially apply specific height classes (`className="h-8"`) contextually without rebuilding the component.
  - To automatically fix formatting errors identified by the Biome linter, execute `pnpm biome check --write .`.
## PanelWatermark Extraction
- **What**: Extracted a repeated watermark-style background icon pattern (`<div className="absolute top-0 right-0 p-4 opacity-5 transition-transform...">`) found across various tactical panels into a reusable `<PanelWatermark>` component.
- **Why**: Reduced duplicated JSX across `PokemonEvolutions.tsx` and `PokemonCatchProbability.tsx` and enforced consistent positioning, opacity, and transition durations for background embellishments.
- **Key Learnings**:
  - The extraction allows callers to pass specific hover transforms (like `group-hover:scale-110` or `group-hover:rotate-12`) via the `className` prop while the internal component handles the shared absolute positioning and opacity.

## CapacitySegmentedBar Extraction
- **What**: Extracted the repeated capacity segmented progress bar in `StorageGrid.tsx` into a reusable `CapacitySegmentedBar` component.
- **Why**: Reduced duplicated JSX across the storage grid views. The component encapsulates the complex logic of rendering multiple segments based on a ratio of current vs max capacity, and applying color thresholds (emerald, amber, red).
- **Key Learnings**:
  - The extraction allows `CapacitySegmentedBar` to be easily dropped into other panels that require a tactical capacity readout (e.g. PC storage, memory limits, team size).
  - Passing `current` and `max` directly rather than the full `PokemonInstance[]` array decouples the component from domain-specific data models.
## EmptyState Extraction
- **What**: Extracted a repeated JSX pattern for empty states into a reusable `EmptyState` component.
- **Why**: Reduced duplication of the verbose tactical utility classes `relative col-span-full flex flex-col items-center justify-center rounded-none border border-zinc-800/50 border-dashed bg-zinc-950/20 p-6 text-center` and standardizes the empty state presentation.
- **Key Learnings**:
  - Separating `className` and `labelClassName` gives flexibility for minor styling tweaks like making values bold or specific text sizes without breaking the core pattern.
## ScanlineOverlay Refactoring
- **What**: Replaced instances of `<div className="scanline-overlay pointer-events-none absolute inset-0 opacity-10" />` with `<ScanlineOverlay opacityClass="opacity-10" />`.
- **Why**: Standardizes the usage of the scanline overlay and ensures it's consistent across the application.
- **Key Learnings**:
  - The `ScanlineOverlay` component already includes `pointer-events-none` and `absolute inset-0` classes, so we can replace raw `div` elements with it directly.
## EdgeLabel Extraction
- **What**: Extracted a repeated JSX pattern for absolute-positioned edge labels into a reusable `EdgeLabel` component.
- **Why**: Reduced duplication of the verbose tactical utility classes `tactical-text absolute bg-zinc-950 px-1 text-[9px] text-zinc-500` across multiple components (`TacticalInput`, `SearchAndFilters`, `AssistantPanel`, `SyncProgress`).
- **Key Learnings**:
  - The extraction allows callers to pass specific positioning (like `-top-2.5 left-4`) or specific color overrides (like `text-[var(--theme-primary)]`) via the `className` prop while the internal component handles the shared tactical typography and background.

## TacticalNode Extraction
- **What**: Extracted repeated complex tactical UI wrapper elements (LCD grid background, hover scanner effect, absolute-positioned active LED side-pipe, and pulsing LED light) into a reusable `TacticalNode` component.
- **Why**: Reduced duplicated JSX across multiple distinct components (`DiagnosticCard.tsx`, `PokemonLocations.tsx`, and `PokemonEvolutions.tsx`). This standardizes a critical and highly-verbose aesthetic element of the design system.
- **Key Learnings**:
  - `tailwind-merge` (`cn()`) is vital for components that act as large wrappers. It allowed the extracted `TacticalNode` to supply a default `bg-black/40` and default hover state, while allowing `DiagnosticCard` to cleanly override those styles with `bg-zinc-950/80` via standard class appending.
  - Using a `variant` prop (`primary`, `red`, `purple`, `blue`, `pink`) was necessary because the CSS classes used across these borders and shadow effects rely heavily on arbitrary values (e.g., `shadow-[0_0_8px_rgba(239,68,68,0.5)]`). Attempting to control complex multi-color opacity hover states with pure standard Tailwind classes across such an intricate DOM structure is brittle; centralizing the exact strings in a switch statement ensures rendering stability.
  - When visually verifying UI components via Playwright that are deeply nested or require specific complex state, temporarily create a dedicated test route/page (e.g., `src/routes/test.tsx`) to render the component directly, capture the screenshot, and carefully remove the temporary files (`git reset HEAD ... && rm ...`) before committing.
When reusing standard React components, use getByRole for finding interactive elements in tests
## DataLabel Extraction
- **What**: Extracted the repeating `<span>` pattern (`className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest"`) into a generic `<DataLabel>` component.
- **Why**: Consolidated standard styling for basic data labels, which was widely duplicated across multiple components like `PokemonEvolutions`, `PokemonLocations`, `PokemonCaughtDetails`, and `ContestRibbonBadge`.
- **Key Learnings**:
  - Always implement `React.forwardRef` and extend standard interfaces like `React.HTMLAttributes<HTMLSpanElement>` to ensure that utility components drop into layouts effortlessly without breaking standard HTML behaviors.
  - Utilize a custom node script utilizing `regex` for reliable and safe batch replacement of specific and lengthy multi-line inline JSX structures across the codebase before using tools like `biome` to clean up the formatting.

## TacticalBlockHeader Extraction
- **What**: Extracted a repeated JSX pattern in `PokemonEvolutions.tsx` and `PokemonLocations.tsx` consisting of a side-by-side tracking label and bold title with an optional trailing icon box.
- **Why**: Reduced duplication of verbose tactical utility classes and standardized the header presentation across variants (primary, red, purple, blue, pink, amber).
- **Key Learnings**:
  - We can use `React.cloneElement` on the `trailingIcon` to inject specific color and hover classes without needing the caller to specify them.

## Refactoring Actions
- Extracted duplicated `<input type="file" className="sr-only" tabIndex={-1} accept=".sav" />` pattern from `OfflineControls.tsx` and `SystemControls.tsx` into a reusable `TacticalFileInput` component.
- Leveraged `React.forwardRef` and `React.InputHTMLAttributes` to provide full standard input capabilities (like `onChange`, `id`, `aria-label`) while keeping defaults clean and DRY.

## Learnings
- Repeated HTML elements that only differ by `id`, `aria-label`, and event handlers are prime targets for extraction, especially when they share functional constraints like being hidden (`sr-only`) and having specific tab indexing and accept attributes.
- Replacing standard HTML elements with typed `Tactical*` components maintains codebase consistency with the overarching ADR 008 styling/tactical theme, even for invisible elements like file inputs.


# Tactical Checklist Item Extraction

Identified a recurring pattern for checklist items used across:
- `Gen2NpcTrades.tsx`
- `Gen3NpcTrades.tsx`
- `Gen2Checklist.tsx`
- `HiddenItemsChecklist.tsx`
- `VisitedRoutesChecklist.tsx`

The repeated JSX is a div representing an acquired/unacquired state:
```jsx
<div
  className={cn(
    'group relative flex items-center gap-3 rounded-none border border-dashed p-3 transition-colors',
    acquired ? 'border-emerald-900/50 bg-emerald-950/10' : 'border-zinc-800 bg-zinc-950/50',
  )}
>
  {acquired ? <Check className="h-4 w-4 shrink-0 text-emerald-500" /> : <CircleDot className="h-4 w-4 shrink-0 text-zinc-600" />}
  <div className="flex min-w-0 flex-col">
    <span className={cn('truncate font-bold font-mono text-xs uppercase tracking-wider', acquired ? 'text-zinc-500 line-through' : 'text-zinc-300')}>
      {label}
    </span>
  </div>
</div>
```

Created `TacticalChecklistItem` to extract this pattern and applied it to the 5 component files. This enhances component modularity and centralizes styling, conforming perfectly with the tactical theme in ADR 008.

**Learnings**:
Extracting standard dashboard indicator item/checklist item combinations is an effective way to simplify dashboard components. Adding options like `showCrosshairs`, `subtitle` and `interactive` handles the slight variations required across different checklist types (e.g., Hidden Items with sub-labels, vs simple flag checks).




---

# TacticalLed Component Extraction

Identified a recurring pattern for decorative "Data Pipe / LED" indicators used heavily across components like `TacticalNode` and `LocationRow`. These elements consisted of a left-aligned dashed border "pipe" and an overlapping, pulsating square "LED", manually implemented with complex Tailwind classes and switch statements for variants.

Created a centralized `TacticalLed` component to abstract this visual structure.
- **Modularity:** Removes duplicate JSX structures.
- **Consistency:** Standardizes the specific colors and animations used for `red`, `purple`, `blue`, `pink`, `amber`, `emerald`, `zinc`, and `primary` LED variants, adhering to ADR 008 tactical aesthetics.
- **Flexibility:** Accepts a `position` prop (e.g., `top-1/2` or `top-3`) and a `pipe` boolean to accommodate slight variations across different consumer contexts.

Removed redundant dead code (like the `ledOuter` and `ledInner` styles from `TacticalNode`'s local styles object) after abstracting them into the new component.

## HardwareScrews Extraction
- **What**: Extracted a repeated JSX pattern of four absolute-positioned `.h-1.w-1.rounded-full` elements that visually act as "hardware structural screws" on tactical components.
- **Why**: Reduced duplication across `TacticalSegmentedControl` and `TacticalMultiSelectControl`.
- **Key Learnings**:
  - The extraction allows a single component `<HardwareScrews />` to render all four decorative elements.
  - Since Vite uses the modern JSX transform (`react/jsx-runtime`), we can export the `HardwareScrews` component as a React Fragment `<>...</>` without needing an explicit `import React` in the extracted component.

## CornerCrosshairs Refactoring
- **What**: Replaced instances of `<div className="absolute top-0 left-0 h-4 w-4 border-white border-t-2 border-l-2" />` (and similar structures for all four corners) with the reusable `<CornerCrosshairs className="h-4 w-4 border-white" thickness={2} />`.
- **Why**: Standardizes the usage of the tactical corner brackets overlay and ensures it's consistent across the application. Reduces repetitive code in `RetroBackground.tsx`, `SearchAndFilters.tsx`, and `PokemonCaughtDetails.tsx`.
- **Key Learnings**:
  - The `CornerCrosshairs` component encapsulates the `absolute top-0 left-0` (and other corners) positioning logic along with the `border-t-2 border-l-2` style borders.
  - Using a single `CornerCrosshairs` component cleans up four distinct div tags used previously into a single component call, which handles displaying all four corners by default unless restricted by a `corners` array.
