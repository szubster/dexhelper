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
