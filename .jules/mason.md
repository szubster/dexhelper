# Mason Journal - React Refactoring

Record critical learnings from React refactoring sessions.

## 2026-05-22 - Agent Initialized
- Mason agent established to focus on component extraction and deduplication.

## 2024-11-XX - CornerCrosshairs Extraction
- Identified a repeated JSX pattern for rendering tactical "corner crosshairs" using 4 absolute positioned `div` elements.
- Pattern was duplicated across `TacticalCard`, `AssistantSuggestionCard`, `SearchAndFilters`, `SettingsControls`, `ClearStorageButton`, `SettingsModal`, and `PokemonDetails`.
- Created a `CornerCrosshairs` component to encapsulate the markup and CSS logic, accepting a `className` and `thickness` prop.
- Reduced DOM bloat in source files and ensured consistency across the application.
