# TacticalLed Component Extraction

Identified a recurring pattern for decorative "Data Pipe / LED" indicators used heavily across components like `TacticalNode` and `LocationRow`. These elements consisted of a left-aligned dashed border "pipe" and an overlapping, pulsating square "LED", manually implemented with complex Tailwind classes and switch statements for variants.

Created a centralized `TacticalLed` component to abstract this visual structure.
- **Modularity:** Removes duplicate JSX structures.
- **Consistency:** Standardizes the specific colors and animations used for `red`, `purple`, `blue`, `pink`, `amber`, `emerald`, `zinc`, and `primary` LED variants, adhering to ADR 008 tactical aesthetics.
- **Flexibility:** Accepts a `position` prop (e.g., `top-1/2` or `top-3`) and a `pipe` boolean to accommodate slight variations across different consumer contexts.

Removed redundant dead code (like the `ledOuter` and `ledInner` styles from `TacticalNode`'s local styles object) after abstracting them into the new component.

# HardwareScrews Component Extraction

Identified a recurring pattern for "hardware structural screws" UI detailing (four absolutely positioned elements in the corners of a container) present in:
- `TacticalSegmentedControl`
- `TacticalMultiSelectControl`

Extracted this pattern into a reusable `HardwareScrews` component (`src/components/HardwareScrews.tsx`) that renders the four screws wrapped in a React Fragment (`<>...</>`).
- **Modularity:** Removes duplicate JSX for identical visual elements.
- **Consistency:** Ensures corner details are identical.
- **Safety:** Wrapping them in a React Fragment avoids introducing unnecessary DOM layers and ensures the `absolute` positioning targets the original relative parent correctly.
