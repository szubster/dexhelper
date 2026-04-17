## 2025-04-06 - Accessible Custom Toggles
**Learning:** Custom UI components designed to look like interactive switches lack inherent meaning for screen readers. Using just `<button>` with visual styles leaves assistive tech users unable to determine the current state (on/off) or the element's interactive nature as a toggle.
**Action:** Always verify that components visually functioning as switches use `role="switch"`, dynamically update `aria-checked`, provide a descriptive `aria-label`, and include distinct `:focus-visible` styles for clear keyboard navigation.

## 2025-04-06 - Accessible Custom Radio Groups
**Learning:** Segmented controls built with generic `<button>` elements do not convey mutual exclusivity or selected state to screen readers, acting merely as independent buttons without context.
**Action:** When implementing custom radio groups (segmented controls), wrap the buttons in a container with `role="radiogroup"` and a descriptive `aria-label`. Ensure individual buttons use `role="radio"` and `aria-checked={boolean}`, along with clear `:focus-visible` styles for keyboard navigation.

## 2026-04-03 - Missing ARIA Labels on Icon-Only Buttons
**Learning:** Discovered that several icon-only buttons throughout the app (search clear, modal closes, settings) lacked `aria-label` attributes. This is a common pattern in modern UI development where icons are visually obvious but completely invisible to screen readers, creating significant accessibility barriers.
**Action:** Always verify that buttons containing only icons (like from `lucide-react`) have descriptive `aria-label` attributes to ensure screen reader compatibility.
## 2026-04-05 - Switch Role and ARIA Attributes
**Learning:** When implementing custom toggle buttons using basic HTML elements (like `<button>` or `<div>`), they must have `role="switch"`, `aria-checked={boolean}`, and a descriptive `aria-label` to be properly understood by screen readers as toggles rather than generic buttons.
**Action:** Always verify that custom switch/toggle components include the correct ARIA attributes for state and labeling.
## 2026-04-07 - Inline Confirmation for Destructive Actions
**Learning:** Destructive actions inside easily dismissible modals are prone to accidental clicks. Adding an inline confirmation step prevents data loss without forcing the user out of their current context.
**Action:** Always implement a two-step inline confirmation (e.g., 'Delete' -> 'Cancel' / 'Confirm') for data-clearing actions within dialogs.

## 2024-05-18 - [File Upload Input Accessibility]
**Learning:** Using `className="hidden"` on `<input type="file">` elements within a `<label>` hides them completely from the accessibility tree, making it impossible for screen reader users to understand or interact with the file input properly, and preventing keyboard focus.
**Action:** Instead of `className="hidden"`, use Tailwind's `className="sr-only"` combined with `tabIndex={-1}`. `sr-only` keeps the element accessible to screen readers but visually hidden. `tabIndex={-1}` ensures the input itself doesn't receive redundant keyboard focus (since its wrapping `<label>` is naturally focusable or can be made focusable, often using `focus-within:ring-*` to show visual feedback when the hidden input receives internal focus).
## 2024-04-11 - Focus Visible Styles for Retro Buttons
**Learning:** The custom retro-button class and other interactive elements in this design system do not have default keyboard focus indicators. Tabbing through the interface without them makes the app inaccessible to keyboard users.
**Action:** Always add `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950` to interactive elements to ensure a consistent, themed focus state.
## 2024-04-12 - Custom Segmented Control ARIA Roles
**Learning:** When creating custom segmented controls with mutually exclusive options, using `role="switch"` is incorrect as switches imply an on/off state. `role="group"` is also too generic. A segmented control is conceptually a set of radio buttons.
**Action:** Use `role="radiogroup"` for the container and `role="radio"` for the individual buttons, along with `aria-checked={boolean}` and proper `aria-label`s on the container, to ensure screen readers correctly interpret the mutually exclusive selection pattern.
## 2026-04-09 - Accessible Search Inputs
**Learning:** Standard text inputs used for searching often lack intuitive keyboard navigation and immediate visual feedback when clearing text. Without focus returning to the input after clearing, users must manually re-focus the input to start a new search, disrupting the workflow.
**Action:** Always add keyboard shortcuts (like `Escape`) to clear search inputs. When a clear button is used, ensure it has visible focus styles and that its `onClick` handler programmatically returns focus back to the search input.
