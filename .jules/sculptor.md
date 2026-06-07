# Sculptor Journal

- Created `TacticalSegmentedControl` component to encapsulate repeated, complex, and unsemantic button-based segmented controls found across `SearchAndFilters`, `SettingsControls`, and `PokemonCatchProbability`.
- AI Readability Impact: Extracts dense, duplicated tailwind classes (with inline ternary operators) into a unified and reusable component. Simplifies JSX trees and standardizes semantic markup (`role="radiogroup"` / `role="radio"`) without needing linter disables.
- Created `TacticalMultiSelectControl` component based off `TacticalSegmentedControl` to correctly handle multi-select toggle states (using sets) without hacking mutually exclusive components.
- AI Readability Impact: Avoids hacking single-select components with `selectedValue=""` which breaks ARIA accessibility and test IDs. Using an explicit multi-select control cleanly separates single vs multi-choice patterns in code logic and simplifies filter panel markup.
- Extracted `TacticalNavLink` to encapsulate complex Tailwind logic used for router links, making navigation components cleaner and easier for an AI to parse without getting lost in string manipulation.
