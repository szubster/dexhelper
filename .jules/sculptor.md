# Sculptor Journal

- Created `TacticalSegmentedControl` component to encapsulate repeated, complex, and unsemantic button-based segmented controls found across `SearchAndFilters`, `SettingsControls`, and `PokemonCatchProbability`.
- AI Readability Impact: Extracts dense, duplicated tailwind classes (with inline ternary operators) into a unified and reusable component. Simplifies JSX trees and standardizes semantic markup (`role="radiogroup"` / `role="radio"`) without needing linter disables.
- Created `TacticalMultiSelectControl` component based off `TacticalSegmentedControl` to correctly handle multi-select toggle states (using sets) without hacking mutually exclusive components.
- AI Readability Impact: Avoids hacking single-select components with `selectedValue=""` which breaks ARIA accessibility and test IDs. Using an explicit multi-select control cleanly separates single vs multi-choice patterns in code logic and simplifies filter panel markup.
- Created `TacticalSelect` component to encapsulate native select dropdown styling and standardize aesthetic formatting across the application.
- AI Readability Impact: Extracts verbose tailwind classes and repetitive `select` structural styling into a single, cohesive component. Simplifies files using dropdowns (e.g. `SettingsControls`) by hiding the underlying HTML semantics and `ChevronDown` DOM node structure.
