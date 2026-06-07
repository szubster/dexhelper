# Sculptor Journal

- Created `TacticalSegmentedControl` component to encapsulate repeated, complex, and unsemantic button-based segmented controls found across `SearchAndFilters`, `SettingsControls`, and `PokemonCatchProbability`.
- AI Readability Impact: Extracts dense, duplicated tailwind classes (with inline ternary operators) into a unified and reusable component. Simplifies JSX trees and standardizes semantic markup (`role="radiogroup"` / `role="radio"`) without needing linter disables.
- Created `TacticalMultiSelectControl` component based off `TacticalSegmentedControl` to correctly handle multi-select toggle states (using sets) without hacking mutually exclusive components.
- AI Readability Impact: Avoids hacking single-select components with `selectedValue=""` which breaks ARIA accessibility and test IDs. Using an explicit multi-select control cleanly separates single vs multi-choice patterns in code logic and simplifies filter panel markup.
Created `PokemonStatusBadge` component to encapsulate and replace deeply nested, duplicated ternary logic for rendering SECURED/DEX_ONLY/SEEN/UNKNOWN badges in `PokedexCard.tsx`.
AI Readability Impact: Extracts multi-layered inline `cn()` conditional rendering into an isolated component with explicit early returns. Simplifies the main card JSX and improves structural separation for AI reasoning, making state-to-UI mappings obvious.
