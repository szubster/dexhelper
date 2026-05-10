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
