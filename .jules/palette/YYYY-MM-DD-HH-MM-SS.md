## Critical Learnings:
- Similar to `FilterBadge`, when a decorative pseudo-element or symbol is part of a button or badge's label (e.g. `[ ALL ]` inside `ClearFiltersBadge`), wrap the decorative elements (e.g., `[ ` and ` ]`) in `<span aria-hidden="true">` to prevent screen readers from redundantly announcing the brackets.
