# Sculptor Journal

- Created `TacticalSegmentedControl` component to encapsulate repeated, complex, and unsemantic button-based segmented controls found across `SearchAndFilters`, `SettingsControls`, and `PokemonCatchProbability`.
- AI Readability Impact: Extracts dense, duplicated tailwind classes (with inline ternary operators) into a unified and reusable component. Simplifies JSX trees and standardizes semantic markup (`role="radiogroup"` / `role="radio"`) without needing linter disables.

- Created `TacticalMultiSelectControl` component to encapsulate repeated, complex, and unsemantic multi-select toggle button patterns found across `SearchAndFilters` and `DagFilterPanel`.
- AI Readability Impact: Extracts dense, duplicated tailwind classes (with manual active state toggling) into a unified and reusable component. Simplifies JSX trees and standardizes semantic markup without relying on `TacticalSegmentedControl` (which is strictly for single-select `role="radiogroup"` patterns). Resolves complex accessibility mismatches and manual TS casting loops.
