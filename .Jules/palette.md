## 2026-04-03 - Missing ARIA Labels on Icon-Only Buttons
**Learning:** Discovered that several icon-only buttons throughout the app (search clear, modal closes, settings) lacked `aria-label` attributes. This is a common pattern in modern UI development where icons are visually obvious but completely invisible to screen readers, creating significant accessibility barriers.
**Action:** Always verify that buttons containing only icons (like from `lucide-react`) have descriptive `aria-label` attributes to ensure screen reader compatibility.
## 2026-04-05 - Switch Role and ARIA Attributes
**Learning:** When implementing custom toggle buttons using basic HTML elements (like `<button>` or `<div>`), they must have `role="switch"`, `aria-checked={boolean}`, and a descriptive `aria-label` to be properly understood by screen readers as toggles rather than generic buttons.
**Action:** Always verify that custom switch/toggle components include the correct ARIA attributes for state and labeling.
