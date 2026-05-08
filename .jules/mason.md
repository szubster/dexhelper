# Mason Journal - React Refactoring

Record critical learnings from React refactoring sessions.

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
