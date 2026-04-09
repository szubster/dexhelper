## 2025-04-06 - Accessible Custom Toggles
**Learning:** Custom UI components designed to look like interactive switches lack inherent meaning for screen readers. Using just `<button>` with visual styles leaves assistive tech users unable to determine the current state (on/off) or the element's interactive nature as a toggle.
**Action:** Always verify that components visually functioning as switches use `role="switch"`, dynamically update `aria-checked`, provide a descriptive `aria-label`, and include distinct `:focus-visible` styles for clear keyboard navigation.

## 2025-04-06 - Accessible Custom Radio Groups
**Learning:** Segmented controls built with generic `<button>` elements do not convey mutual exclusivity or selected state to screen readers, acting merely as independent buttons without context.
**Action:** When implementing custom radio groups (segmented controls), wrap the buttons in a container with `role="radiogroup"` and a descriptive `aria-label`. Ensure individual buttons use `role="radio"` and `aria-checked={boolean}`, along with clear `:focus-visible` styles for keyboard navigation.
