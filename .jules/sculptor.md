# Sculptor Journal

- Created `TacticalSegmentedControl` component to encapsulate repeated, complex, and unsemantic button-based segmented controls found across `SearchAndFilters`, `SettingsControls`, and `PokemonCatchProbability`.
- AI Readability Impact: Extracts dense, duplicated tailwind classes (with inline ternary operators) into a unified and reusable component. Simplifies JSX trees and standardizes semantic markup (`role="radiogroup"` / `role="radio"`) without needing linter disables.
